import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import crypto from 'crypto';
import { fileURLToPath } from 'url';
import mammoth from 'mammoth';
import { GoogleGenAI, ThinkingLevel } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = Number(process.env.PORT) || 3000;

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Shared Gemini client with required User-Agent
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

// Fast in-memory LRU cache for instant repeat scans
const analysisCache = new Map<string, any>();
const MAX_CACHE_ENTRIES = 50;

function getCacheKey(payload: Record<string, any>): string {
  const hash = crypto.createHash('sha256');
  hash.update(
    JSON.stringify({
      t: payload.resumeText || '',
      b: payload.resumeBase64 ? payload.resumeBase64.slice(0, 4096) + payload.resumeBase64.length : '',
      j: payload.jobTitle || '',
      d: payload.jobDescription || '',
      l: payload.targetLevel || '',
    })
  );
  return hash.digest('hex');
}

// Helper to normalize MIME type or extract text from DOCX / RTF / HTML / TXT binary buffers
async function prepareDocumentInput(
  resumeText?: string,
  resumeBase64?: string,
  resumeMimeType?: string,
  fileName?: string
): Promise<{
  extractedText?: string;
  inlinePart?: { inlineData: { data: string; mimeType: string } };
  detectedFormat: string;
}> {
  const ext = (fileName?.split('.').pop() || '').toLowerCase();
  const mime = (resumeMimeType || '').toLowerCase();

  // If plain text is already provided directly
  if (resumeText && resumeText.trim().length > 0 && !resumeBase64) {
    return {
      extractedText: resumeText.trim().slice(0, 35000),
      detectedFormat: fileName ? `Text Document (${ext.toUpperCase() || 'TXT'})` : 'Direct Text Input',
    };
  }

  if (resumeBase64) {
    const buffer = Buffer.from(resumeBase64, 'base64');

    // 1. DOCX Word Document -> Fast server-side extraction via Mammoth
    if (
      ext === 'docx' ||
      mime.includes('officedocument.wordprocessingml.document')
    ) {
      try {
        const result = await mammoth.extractRawText({ buffer });
        if (result.value && result.value.trim().length > 20) {
          return {
            extractedText: result.value.trim().slice(0, 35000),
            detectedFormat: 'Word Document (DOCX)',
          };
        }
      } catch (err) {
        console.warn('Mammoth DOCX extraction fallback:', err);
      }
    }

    // 2. Text-based file extensions uploaded as binary (TXT, MD, RTF, HTML, JSON, CSV, TEX, XML, DOC)
    if (
      ['txt', 'md', 'markdown', 'rtf', 'html', 'htm', 'json', 'csv', 'tex', 'xml', 'doc'].includes(ext) ||
      mime.startsWith('text/') ||
      mime.includes('rtf') ||
      mime.includes('json') ||
      mime.includes('csv')
    ) {
      const rawStr = buffer.toString('utf-8');
      const cleaned = rawStr
        .replace(/<[^>]+>/g, ' ')
        .replace(/\\par[d]?/g, '\n')
        .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F]+/g, ' ')
        .replace(/[ \t]{2,}/g, ' ')
        .replace(/\n{3,}/g, '\n\n')
        .trim();

      if (cleaned.length > 20) {
        return {
          extractedText: cleaned.slice(0, 35000),
          detectedFormat: `Document (${ext.toUpperCase() || 'TEXT'})`,
        };
      }
    }

    // 3. Images / Photos (PNG, JPG, JPEG, WEBP, GIF, HEIC, BMP, TIFF)
    if (
      mime.startsWith('image/') ||
      ['png', 'jpg', 'jpeg', 'webp', 'gif', 'heic', 'heif', 'bmp', 'tiff', 'tif'].includes(ext)
    ) {
      const validImageMime =
        mime.startsWith('image/') && !mime.includes('svg')
          ? mime
          : ext === 'png'
          ? 'image/png'
          : ext === 'webp'
          ? 'image/webp'
          : ext === 'gif'
          ? 'image/gif'
          : 'image/jpeg';

      return {
        extractedText: resumeText?.trim() || undefined,
        inlinePart: {
          inlineData: {
            data: resumeBase64,
            mimeType: validImageMime,
          },
        },
        detectedFormat: `Photo / Visual Scan (${ext.toUpperCase() || validImageMime.split('/')[1].toUpperCase()})`,
      };
    }

    // 4. PDF Documents
    if (mime === 'application/pdf' || ext === 'pdf') {
      return {
        extractedText: resumeText?.trim() || undefined,
        inlinePart: {
          inlineData: {
            data: resumeBase64,
            mimeType: 'application/pdf',
          },
        },
        detectedFormat: 'PDF Document',
      };
    }

    // 5. Universal Fallback: attempt UTF-8 readable extraction first, else send as PDF/inline
    const fallbackText = buffer
      .toString('utf-8')
      .replace(/[^\x20-\x7E\n\r\t]/g, ' ')
      .replace(/\s{2,}/g, ' ')
      .trim();

    if (fallbackText.length > 50) {
      return {
        extractedText: fallbackText.slice(0, 35000),
        detectedFormat: `Extracted Text (${ext.toUpperCase() || 'File'})`,
      };
    }

    return {
      inlinePart: {
        inlineData: {
          data: resumeBase64,
          mimeType: mime || 'application/pdf',
        },
      },
      detectedFormat: `Binary Document (${ext.toUpperCase() || 'File'})`,
    };
  }

  return {
    extractedText: (resumeText || '').trim(),
    detectedFormat: 'Text Input',
  };
}

// Health check
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Endpoint: Fast Resume Analysis (<10s via ThinkingLevel.LOW + Multimodal Optimization)
app.post('/api/analyze-resume', async (req, res) => {
  const startTime = Date.now();
  try {
    const {
      resumeText,
      resumeBase64,
      resumeMimeType,
      fileName,
      jobTitle,
      jobDescription,
      targetLevel,
      forceRefresh,
    } = req.body;

    if (!resumeText && !resumeBase64) {
      return res.status(400).json({ error: 'Either resume text or a document/photo file is required.' });
    }

    // Check cache first unless forceRefresh is set
    const cacheKey = getCacheKey(req.body);
    if (!forceRefresh && analysisCache.has(cacheKey)) {
      const cachedResult = analysisCache.get(cacheKey);
      return res.json({
        ...cachedResult,
        analysisTimeMs: Date.now() - startTime,
        cached: true,
      });
    }

    const prepared = await prepareDocumentInput(resumeText, resumeBase64, resumeMimeType, fileName);

    const jobContext =
      jobTitle || jobDescription
        ? `TARGET JOB:
- Title: ${jobTitle || 'Not specified'}
- Seniority: ${targetLevel || 'Mid-Senior'}
- Requirements:
"""
${(jobDescription || 'Not provided').slice(0, 8000)}
"""`
        : `No target job description provided. Evaluate against industry standards for the candidate's primary profession (${targetLevel || 'Mid-Senior'} level).`;

    const systemInstruction = `You are an elite Executive Tech Recruiter and Certified Professional Resume Writer (CPRW).
Perform a fast, rigorous, actionable ATS and hiring manager audit of the candidate's resume (whether text, PDF, DOCX, or camera photo scan).
Assess:
1. ATS Parsability & Machine Readability
2. Quantifiable Impact & Metrics (Google XYZ formula)
3. Strong Action Verbs vs Passive Phrasing
4. Keyword & Skill Alignment
5. Formatting, Brevity & Readability
Return valid JSON matching the requested structure.`;

    const promptText = `Analyze this resume and return a concise, high-precision JSON audit.

${jobContext}

Document Format Detected: ${prepared.detectedFormat}
${prepared.extractedText ? `\nRESUME CONTENT:\n"""\n${prepared.extractedText}\n"""` : '\nAnalyze the attached resume document/photo scan via OCR and layout inspection.'}

Return strict JSON with this exact schema:
{
  "candidateName": "Full name or 'Applicant'",
  "detectedRole": "Primary profession/title detected",
  "targetRoleMatch": "Brief 1-sentence alignment summary with match %",
  "overallScore": 78,
  "scoreLabel": "Competitive",
  "executiveSummary": "Concise 2-sentence recruiter 6-second scan impression.",
  "categoryScores": {
    "atsParsability": { "score": 85, "feedback": "1-sentence diagnostic", "status": "good" },
    "quantifiableImpact": { "score": 65, "feedback": "1-sentence diagnostic", "status": "warning" },
    "actionVerbs": { "score": 75, "feedback": "1-sentence diagnostic", "status": "good" },
    "keywordMatch": { "score": 70, "feedback": "1-sentence diagnostic", "status": "warning" },
    "formattingReadability": { "score": 80, "feedback": "1-sentence diagnostic", "status": "good" }
  },
  "strengths": ["3 to 4 standout strengths"],
  "weaknesses": ["3 to 4 notable gaps or vulnerabilities"],
  "criticalFixes": [
    {
      "title": "Short action title",
      "section": "Experience / Summary / Skills / Header",
      "issue": "Specific problem found",
      "recommendation": "Exact fix to apply",
      "priority": "high"
    }
  ],
  "bulletEnhancements": [
    {
      "original": "Actual weak bullet from the resume",
      "improved": "Google XYZ rewrite: Accomplished [X], measured by [Y], by doing [Z]",
      "explanation": "1-sentence reason why this converts better",
      "impactCategory": "Metrics & Scale"
    }
  ],
  "keywordAnalysis": {
    "matchedKeywords": ["6 to 12 matched skills/keywords"],
    "missingCrucialKeywords": ["4 to 8 missing important keywords"],
    "recommendedAdditions": ["3 to 5 tools/certifications to add"],
    "jobDescriptionMatchPercentage": 78
  },
  "sectionEvaluations": [
    {
      "sectionName": "Header & Contact Details",
      "rating": "excellent",
      "positiveNotes": "Brief positive note",
      "improvements": "Brief improvement"
    },
    {
      "sectionName": "Professional Summary",
      "rating": "adequate",
      "positiveNotes": "Brief positive note",
      "improvements": "Brief improvement"
    },
    {
      "sectionName": "Work Experience & Achievements",
      "rating": "needs_work",
      "positiveNotes": "Brief positive note",
      "improvements": "Brief improvement"
    },
    {
      "sectionName": "Skills & Technologies",
      "rating": "excellent",
      "positiveNotes": "Brief positive note",
      "improvements": "Brief improvement"
    },
    {
      "sectionName": "Education & Credentials",
      "rating": "excellent",
      "positiveNotes": "Brief positive note",
      "improvements": "Brief improvement"
    }
  ],
  "atsComplianceChecklist": [
    { "item": "Clean standard fonts & single-column flow", "passed": true, "details": "Brief explanation" },
    { "item": "Contact information completeness (Email, Phone, LinkedIn)", "passed": true, "details": "Brief explanation" },
    { "item": "Recognized standard section headings", "passed": true, "details": "Brief explanation" },
    { "item": "No text embedded inside complex images or tables", "passed": true, "details": "Brief explanation" },
    { "item": "Consistent employment date formats (Month Year - Month Year)", "passed": true, "details": "Brief explanation" }
  ],
  "estimatedYoe": "e.g., 5 years",
  "topSkillsIdentified": ["6 to 8 primary skills"]
}`;

    const parts: any[] = [];
    if (prepared.inlinePart) {
      parts.push(prepared.inlinePart);
    }
    parts.push({ text: promptText });

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: { parts },
      config: {
        systemInstruction,
        responseMimeType: 'application/json',
        temperature: 0.2,
        thinkingConfig: { thinkingLevel: ThinkingLevel.LOW },
      },
    });

    const rawText = response.text || '{}';
    let parsedData: any;
    try {
      parsedData = JSON.parse(rawText);
    } catch {
      const cleaned = rawText.replace(/```(?:json)?/g, '').replace(/```/g, '').trim();
      parsedData = JSON.parse(cleaned);
    }

    const finalPayload = {
      ...parsedData,
      analysisTimeMs: Date.now() - startTime,
      detectedFormat: prepared.detectedFormat,
      cached: false,
    };

    if (analysisCache.size >= MAX_CACHE_ENTRIES) {
      const oldestKey = analysisCache.keys().next().value;
      if (oldestKey) analysisCache.delete(oldestKey);
    }
    analysisCache.set(cacheKey, finalPayload);

    res.json(finalPayload);
  } catch (err: any) {
    console.error('Error in /api/analyze-resume:', err);
    res.status(500).json({
      error: 'Failed to analyze resume.',
      message: err.message || 'Unknown error occurred during Gemini analysis.',
    });
  }
});

// Endpoint: Instant Bullet Point Rewriter (<4s via ThinkingLevel.LOW)
app.post('/api/rewrite-bullet', async (req, res) => {
  try {
    const { bullet, targetRole, industry } = req.body;
    if (!bullet || !bullet.trim()) {
      return res.status(400).json({ error: 'Bullet point text is required.' });
    }

    const prompt = `Rewrite this resume bullet point into 3 distinct, high-impact variations for a ${targetRole || 'professional'} in ${industry || 'Tech / Business'}.
Original bullet: "${bullet}"

Use:
Option 1: Metrics & ROI focus (quantified results using Google's XYZ formula)
Option 2: Executive Leadership & Initiative focus
Option 3: Technical & Strategic execution focus

Return JSON format:
{
  "original": "${bullet}",
  "options": [
    {
      "type": "Metrics & ROI Focused",
      "rewritten": "...",
      "whyItWorks": "..."
    },
    {
      "type": "Leadership & Initiative Focused",
      "rewritten": "...",
      "whyItWorks": "..."
    },
    {
      "type": "Technical & Strategy Focused",
      "rewritten": "...",
      "whyItWorks": "..."
    }
  ]
}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        temperature: 0.3,
        thinkingConfig: { thinkingLevel: ThinkingLevel.LOW },
      },
    });

    const parsed = JSON.parse(response.text || '{}');
    res.json(parsed);
  } catch (err: any) {
    console.error('Error in /api/rewrite-bullet:', err);
    res.status(500).json({ error: 'Failed to rewrite bullet', message: err.message });
  }
});

// Endpoint: Generate Tailored Cover Letter (<5s via ThinkingLevel.LOW)
app.post('/api/generate-cover-letter', async (req, res) => {
  try {
    const { resumeSummary, jobTitle, companyName, jobDescription, tone } = req.body;

    const prompt = `Write a compelling, modern 3-4 paragraph cover letter for:
Candidate Profile Summary / Key Achievements:
"""
${resumeSummary}
"""

Target Position: ${jobTitle || 'Target Role'}
Company Name: ${companyName || 'Target Company'}
Target Job Description:
"""
${jobDescription || 'Standard industry role'}
"""
Tone: ${tone || 'Confident, professional, and authentic'}

Avoid archaic openings like "I am writing to express my eager interest...".
Make it punchy, hook the hiring manager in the first 2 sentences with an impactful relevant win, connect candidate strengths directly to company objectives, and finish with a crisp call to action.

Return JSON format:
{
  "subjectLine": "Application for [Role] - [Candidate Name / Value Proposition]",
  "salutation": "Dear Hiring Team at [Company],",
  "paragraphs": [
    "Paragraph 1 - The Hook & Value Proposition",
    "Paragraph 2 - Concrete Impact & Alignment",
    "Paragraph 3 - Cultural Fit & Forward Vision",
    "Paragraph 4 - Call to Action"
  ],
  "fullText": "Full formatted cover letter text"
}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        temperature: 0.4,
        thinkingConfig: { thinkingLevel: ThinkingLevel.LOW },
      },
    });

    const parsed = JSON.parse(response.text || '{}');
    res.json(parsed);
  } catch (err: any) {
    console.error('Error in /api/generate-cover-letter:', err);
    res.status(500).json({ error: 'Failed to generate cover letter', message: err.message });
  }
});

// Endpoint: Targeted Interview Prep Questions (<5s via ThinkingLevel.LOW)
app.post('/api/generate-interview-questions', async (req, res) => {
  try {
    const { resumeHighlights, targetRole, detectedWeaknesses } = req.body;

    const prompt = `Based on this candidate's resume profile and target role:
Target Role: ${targetRole || 'Professional'}
Resume Highlights: ${resumeHighlights || 'General background'}
Detected Gaps / Vulnerabilities in Resume: ${JSON.stringify(detectedWeaknesses || [])}

Generate 5 high-probability interview questions that hiring managers and technical leads will ask this candidate to probe their experience and verify any gaps.

Return JSON format:
{
  "questions": [
    {
      "question": "Question text",
      "category": "Behavioral",
      "interviewerIntent": "Why the interviewer is asking this and what red flags they are watching for",
      "suggestedFramework": "How the candidate should structure their answer using STAR (Situation, Task, Action, Result) with specific talking points"
    }
  ]
}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        temperature: 0.3,
        thinkingConfig: { thinkingLevel: ThinkingLevel.LOW },
      },
    });

    const parsed = JSON.parse(response.text || '{}');
    res.json(parsed);
  } catch (err: any) {
    console.error('Error in /api/generate-interview-questions:', err);
    res.status(500).json({ error: 'Failed to generate interview questions', message: err.message });
  }
});

// Vite middleware or static serving
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(port, '0.0.0.0', () => {
    console.log(`CareerPulse Server running on http://0.0.0.0:${port}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
});
