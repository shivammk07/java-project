import React, { useState } from 'react';
import { Mail, Sparkles, Copy, Check, RefreshCw, Send, FileText } from 'lucide-react';
import { ResumeAnalysis } from '../types/resume';

interface CoverLetterGeneratorProps {
  analysis: ResumeAnalysis;
  jobTitle?: string;
  jobDescription?: string;
}

export const CoverLetterGenerator: React.FC<CoverLetterGeneratorProps> = ({
  analysis,
  jobTitle,
  jobDescription,
}) => {
  const [companyName, setCompanyName] = useState('');
  const [roleTitle, setRoleTitle] = useState(jobTitle || analysis.detectedRole || 'Target Role');
  const [tone, setTone] = useState('Executive & Confident');
  const [isGenerating, setIsGenerating] = useState(false);
  const [coverLetter, setCoverLetter] = useState<{
    subjectLine: string;
    salutation: string;
    paragraphs: string[];
    fullText: string;
  } | null>(null);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);
    setError(null);

    try {
      const res = await fetch('/api/generate-cover-letter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          resumeSummary: `Candidate: ${analysis.candidateName || 'Applicant'}. Detected Role: ${analysis.detectedRole}. Top skills: ${analysis.topSkillsIdentified.join(', ')}. Strengths: ${analysis.strengths.join('; ')}`,
          jobTitle: roleTitle,
          companyName: companyName || 'Hiring Team',
          jobDescription: jobDescription || 'Standard industry role requirements',
          tone,
        }),
      });

      if (!res.ok) {
        throw new Error('Failed to generate cover letter');
      }

      const data = await res.json();
      setCoverLetter(data);
    } catch (err: any) {
      setError(err.message || 'Error creating cover letter');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = () => {
    if (!coverLetter) return;
    const textToCopy = `${coverLetter.subjectLine}\n\n${coverLetter.salutation}\n\n${coverLetter.paragraphs.join('\n\n')}\n\nSincerely,\n${analysis.candidateName || 'Applicant'}`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Intro */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6">
        <div className="flex items-center gap-2 text-xs font-semibold text-indigo-400 uppercase tracking-wider mb-1">
          <Mail className="w-4 h-4" />
          AI Tailored Cover Letter Generator
        </div>
        <h3 className="text-xl font-bold text-white">
          Generate an Executive Pitch Tailored to this Target Role
        </h3>
        <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
          Recruiters ignore generic templates. This generator weaves your verified resume achievements directly into a compelling narrative aligned with hiring goals.
        </p>

        {/* Input Parameters */}
        <form onSubmit={handleGenerate} className="mt-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Target Company Name
              </label>
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="e.g. Stripe / Figma / Acme Corp"
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs sm:text-sm text-slate-200 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Role Title
              </label>
              <input
                type="text"
                value={roleTitle}
                onChange={(e) => setRoleTitle(e.target.value)}
                placeholder="e.g. Senior Software Engineer"
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs sm:text-sm text-slate-200 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Tone of Voice
              </label>
              <select
                value={tone}
                onChange={(e) => setTone(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs sm:text-sm text-slate-200 focus:outline-none focus:border-indigo-500"
              >
                <option value="Executive & Confident">Executive & Confident</option>
                <option value="Direct & High-Impact">Direct & High-Impact</option>
                <option value="Collaborative & Authentic">Collaborative & Authentic</option>
                <option value="Technical & Analytical">Technical & Analytical</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            disabled={isGenerating}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg shadow-indigo-600/20 disabled:bg-slate-800"
          >
            {isGenerating ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Crafting Custom Cover Letter...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Generate Tailored Cover Letter</span>
              </>
            )}
          </button>
        </form>

        {error && <p className="text-xs text-rose-400 mt-2">{error}</p>}
      </div>

      {/* Generated Letter Preview */}
      {coverLetter && (
        <div className="bg-slate-900 border border-indigo-500/30 rounded-2xl p-6 sm:p-8 space-y-4 shadow-xl">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div>
              <span className="text-[11px] font-mono text-indigo-400 uppercase tracking-wider block">
                {coverLetter.subjectLine}
              </span>
              <span className="text-sm font-semibold text-white mt-1 block">
                {coverLetter.salutation}
              </span>
            </div>

            <button
              type="button"
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-indigo-600/20 text-indigo-300 hover:bg-indigo-600/30 border border-indigo-500/30 transition-all"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Copied to Clipboard!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Cover Letter</span>
                </>
              )}
            </button>
          </div>

          <div className="space-y-4 font-sans text-xs sm:text-sm text-slate-300 leading-relaxed max-w-3xl">
            {coverLetter.paragraphs.map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}
            <div className="pt-2 text-slate-400">
              <p>Sincerely,</p>
              <p className="font-semibold text-white mt-1">
                {analysis.candidateName || 'Applicant'}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
