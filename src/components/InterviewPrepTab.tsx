import React, { useState } from 'react';
import { HelpCircle, Sparkles, RefreshCw, ChevronDown, ChevronUp, ShieldAlert, Award } from 'lucide-react';
import { ResumeAnalysis } from '../types/resume';

interface InterviewPrepTabProps {
  analysis: ResumeAnalysis;
  jobTitle?: string;
}

interface InterviewQuestion {
  question: string;
  category: string;
  interviewerIntent: string;
  suggestedFramework: string;
}

export const InterviewPrepTab: React.FC<InterviewPrepTabProps> = ({
  analysis,
  jobTitle,
}) => {
  const [questions, setQuestions] = useState<InterviewQuestion[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  const handleFetchQuestions = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/generate-interview-questions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          targetRole: jobTitle || analysis.detectedRole || 'Target Role',
          resumeHighlights: analysis.strengths.join('; '),
          detectedWeaknesses: analysis.weaknesses,
        }),
      });

      if (!res.ok) {
        throw new Error('Failed to generate interview questions');
      }

      const data = await res.json();
      setQuestions(data.questions || []);
    } catch (err: any) {
      setError(err.message || 'Error generating questions');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Intro Box */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6">
        <div className="flex items-center gap-2 text-xs font-semibold text-indigo-400 uppercase tracking-wider mb-1">
          <HelpCircle className="w-4 h-4" />
          Proactive Interview Defense & Preparation
        </div>
        <h3 className="text-xl font-bold text-white">
          Predict High-Probability Interview Questions
        </h3>
        <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
          Interviewers scrutinize resume gaps, unquantified achievements, and transitions. Prepare STAR framework defenses tailored to this exact candidate profile.
        </p>

        {!questions && (
          <div className="mt-5">
            <button
              type="button"
              onClick={handleFetchQuestions}
              disabled={isLoading}
              className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer shadow-lg shadow-indigo-600/20 disabled:bg-slate-800"
            >
              {isLoading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Synthesizing Interview Defense...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Generate Interview Questions</span>
                </>
              )}
            </button>
          </div>
        )}

        {error && <p className="text-xs text-rose-400 mt-2">{error}</p>}
      </div>

      {/* Question Cards */}
      {questions && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-bold text-white">
              Top 5 Interview Probes for {jobTitle || analysis.detectedRole}
            </h4>
            <button
              type="button"
              onClick={handleFetchQuestions}
              disabled={isLoading}
              className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
              Regenerate
            </button>
          </div>

          <div className="grid grid-cols-1 gap-3">
            {questions.map((q, idx) => {
              const isExpanded = expandedIndex === idx;

              return (
                <div
                  key={idx}
                  className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden transition-all"
                >
                  <button
                    type="button"
                    onClick={() => setExpandedIndex(isExpanded ? null : idx)}
                    className="w-full p-5 text-left flex items-start justify-between gap-4 hover:bg-slate-800/40 transition-colors"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-indigo-500/15 text-indigo-300 border border-indigo-500/30">
                          {q.category || 'Behavioral'}
                        </span>
                        <span className="text-xs text-slate-400">Question {idx + 1}</span>
                      </div>
                      <h5 className="text-sm font-semibold text-white leading-snug pt-1">
                        "{q.question}"
                      </h5>
                    </div>

                    <div className="p-1 rounded-lg bg-slate-800 text-slate-400 shrink-0 mt-1">
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </div>
                  </button>

                  {isExpanded && (
                    <div className="p-5 pt-0 border-t border-slate-800/80 space-y-3 mt-2 text-xs">
                      {/* Interviewer Intent */}
                      <div className="p-3 rounded-xl bg-amber-950/20 border border-amber-900/40 text-amber-200">
                        <div className="flex items-center gap-1.5 font-bold text-amber-400 uppercase tracking-wider text-[10px] mb-1">
                          <ShieldAlert className="w-3.5 h-3.5" />
                          Interviewer Underlying Motive & Red Flags
                        </div>
                        <p className="text-slate-300 leading-relaxed">
                          {q.interviewerIntent}
                        </p>
                      </div>

                      {/* STAR Strategy */}
                      <div className="p-3 rounded-xl bg-emerald-950/20 border border-emerald-900/40 text-emerald-200">
                        <div className="flex items-center gap-1.5 font-bold text-emerald-400 uppercase tracking-wider text-[10px] mb-1">
                          <Award className="w-3.5 h-3.5" />
                          Recommended STAR Structure & Key Talking Points
                        </div>
                        <p className="text-slate-300 leading-relaxed">
                          {q.suggestedFramework}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
