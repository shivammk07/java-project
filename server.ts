import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

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

// Health check
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Endpoint: Analyze Resume
app.post('/api/analyze-resume', async (req, res) => {
  try {
    const {
      resumeText,
      resumeBase64,
      resumeMimeType,
      jobTitle,
      jobDescription,
      targetLevel,
    } = req.body;

    if (!resumeText && !resumeBase64) {
      return res.status(400).json({ error: 'Either resume text or a document file is required.' });
    }

    const jobContext = jobTitle || jobDescription
      ? `
TARGET JOB DETAILS:
- Target Job Title: ${jobTitle || 'Not specified'}
- Seniority Level: ${targetLevel || 'Mid-Senior'}
- Target Job Description / Requirements:
"""
${jobDescription || 'Not provided'}
"""
`
      : 'No target job description was provided. Evaluate against modern industry best practices for the candidate\'s detected primary profession.';

    const systemInstruction = `You are a world-class Executive Tech Recruiter, Head of Talent Acquisition, and Certified Professional Resume Writer (CPRW).
Your mission is to perform a rigorous, actionable, high-precision ATS (Applicant Tracking System) and hiring manager audit of the candidate's resume.

Assess the resume on these dimensions:
1. ATS Parsability & Machine Readability: Complex tables, non-standard headings, header/footer traps, contact info clarity, section order.
2. Quantifiable Impact & Metrics: Presence of numbers, percentages, dollar values, scale ($M, user counts, latency reductions) vs vague responsibilities.
3. Strong Action Verbs: Active leadership voice ("Spearheaded", "Architected", "Optimized") vs weak passive phrasing ("Responsible for", "Worked on", "Helped with").
4. Keyword & Competency Alignment: Matching essential hard skills, tech stacks, and domain knowledge (especially against the target job if provided).
5. Brevity, Formatting & Readability: Bullet point length (ideal 1-2 lines), filler phrases, consistency, presentation.

Return valid JSON adhering strictly to the JSON schema specified.`;

    const promptText = `Please analyze this resume thoroughly.

${jobContext}

${resumeText ? `RESUME CONTENT:\n"""\n${resumeText}\n"""` : 'Please analyze the attached resume document.'}

Provide your evaluation as a strict JSON object with the following structure:
{
  "candidateName": "Candidate's full name if found, or 'Applicant'",
  "detectedRole": "Primary profession/title detected (e.g., Senior Full-Stack Engineer)",
  "targetRoleMatch": "Brief 1-sentence assessment of alignment with target role",
  "overallScore": 78, // Integer 0 to 100
  "scoreLabel": "Competitive", // One of: "Exceptional" (88-100), "Competitive" (75-87), "Needs Optimization" (55-74), "Critical Attention" (0-54)
  "executiveSummary": "A concise 2-3 sentence executive recap of the resume's caliber from a recruiter's eyes.",
  "categoryScores": {
    "atsParsability": {
      "score": 85, // 0-100
      "feedback": "Specific diagnostic feedback on formatting, section titles, contact details, layout parsing.",
      "status": "good" // "good", "warning", or "critical"
    },
    "quantifiableImpact": {
      "score": 65, // 0-100
      "feedback": "Feedback on metric presence, measurable ROI, percentages, scale.",
      "status": "warning"
    },
    "actionVerbs": {
      "score": 75, // 0-100
      "feedback": "Feedback on verb strength, avoiding passive voice.",
      "status": "good"
    },
    "keywordMatch": {
      "score": 70, // 0-100
      "feedback": "Feedback on skills match and relevant industry/job keywords.",
      "status": "warning"
    },
    "formattingReadability": {
      "score": 80, // 0-100
      "feedback": "Feedback on length, bullet consistency, skimmability.",
      "status": "good"
    }
  },
  "strengths": [
    "3 to 5 standout strong points in the resume"
  ],
  "weaknesses": [
    "3 to 5 notable gaps or weaknesses"
  ],
  "criticalFixes": [
    {
      "title": "Short title of fix",
      "section": "Experience / Summary / Skills / Header",
      "issue": "What is wrong right now",
      "recommendation": "Exact step to correct it",
      "priority": "high" // "high", "medium", "low"
    }
  ],
  "bulletEnhancements": [
    {
      "original": "Actual weak or mediocre bullet point found in the resume",
      "improved": "High-impact rewrite following Google's XYZ formula: Accomplished [X], measured by [Y], by doing [Z]",
      "explanation": "Why this revision works better",
      "impactCategory": "Metrics & Scale" // or "Leadership", "Technical Precision", "Efficiency"
    }
  ],
  "keywordAnalysis": {
    "matchedKeywords": ["Key skills / terms present in resume that are valuable"],
    "missingCrucialKeywords": ["Important keywords or skills missing (especially from job description or standard for this role)"],
    "recommendedAdditions": ["Recommended tools, methodologies, or certifications to incorporate"],
    "jobDescriptionMatchPercentage": 75 // Estimated percentage 0-100
  },
  "sectionEvaluations": [
    {
      "sectionName": "Header & Contact Details",
      "rating": "excellent", // "excellent", "adequate", or "needs_work"
      "positiveNotes": "What is good",
      "improvements": "What could be enhanced"
    },
    {
      "sectionName": "Professional Summary",
      "rating": "needs_work",
      "positiveNotes": "What is good",
      "improvements": "What could be enhanced"
    },
    {
      "sectionName": "Work Experience & Achievements",
      "rating": "adequate",
      "positiveNotes": "What is good",
      "improvements": "What could be enhanced"
    },
    {
      "sectionName": "Skills & Technologies",
      "rating": "excellent",
      "positiveNotes": "What is good",
      "improvements": "What could be enhanced"
    },
    {
      "sectionName": "Education & Credentials",
      "rating": "adequate",
      "positiveNotes": "What is good",
      "improvements": "What could be enhanced"
    }
  ],
  "atsComplianceChecklist": [
    {
      "item": "Clean standard fonts & single-column flow",
      "passed": true,
      "details": "Explanation"
    },
    {
      "item": "Contact information completeness (Email, Phone, LinkedIn)",
      "passed": true,
      "details": "Explanation"
    },
    {
      "item": "Recognized standard section headings",
      "passed": true,
      "details": "Explanation"
    },
    {
      "item": "No text embedded inside complex images or tables",
      "passed": true,
      "details": "Explanation"
    },
    {
      "item": "Consistent employment date formats (Month Year - Month Year)",
      "passed": false,
      "details": "Explanation"
    }
  ],
  "estimatedYoe": "e.g., 5-7 years",
  "topSkillsIdentified": ["List of 6-10 primary technical or professional skills detected"]
}`;

    const parts: any[] = [];
    if (resumeBase64 && resumeMimeType) {
      parts.push({
        inlineData: {
          data: resumeBase64,
          mimeType: resumeMimeType,
        },
      });
    }
    parts.push({ text: promptText });

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: { parts },
      config: {
        systemInstruction,
        responseMimeType: 'application/json',
        temperature: 0.2,
      },
    });

    const rawText = response.text || '{}';
    let parsedData;
    try {
      parsedData = JSON.parse(rawText);
    } catch {
      // Clean up markdown code blocks if present
      const cleaned = rawText.replace(/```(?:json)?/g, '').replace(/```/g, '').trim();
      parsedData = JSON.parse(cleaned);
    }

    res.json(parsedData);
  } catch (err: any) {
    console.error('Error in /api/analyze-resume:', err);
    res.status(500).json({
      error: 'Failed to analyze resume.',
      message: err.message || 'Unknown error occurred during Gemini analysis.',
    });
  }
});

// Endpoint: Instant Bullet Point Rewriter
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
      },
    });

    const parsed = JSON.parse(response.text || '{}');
    res.json(parsed);
  } catch (err: any) {
    console.error('Error in /api/rewrite-bullet:', err);
    res.status(500).json({ error: 'Failed to rewrite bullet', message: err.message });
  }
});

// Endpoint: Generate Tailored Cover Letter
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
      },
    });

    const parsed = JSON.parse(response.text || '{}');
    res.json(parsed);
  } catch (err: any) {
    console.error('Error in /api/generate-cover-letter:', err);
    res.status(500).json({ error: 'Failed to generate cover letter', message: err.message });
  }
});

// Endpoint: Targeted Interview Prep Questions
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
      "category": "Behavioral" // or "Technical Deep-Dive", "Gap Probing", "System Design / Strategy", "Leadership"
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
