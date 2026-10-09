import React, { useState } from 'react';
import { CheckCircle2, AlertCircle, PlusCircle, Search, Sparkles, Filter } from 'lucide-react';

interface KeywordGapViewerProps {
  keywordAnalysis: {
    matchedKeywords: string[];
    missingCrucialKeywords: string[];
    recommendedAdditions: string[];
    jobDescriptionMatchPercentage?: number;
  };
  topSkillsIdentified?: string[];
}

export const KeywordGapViewer: React.FC<KeywordGapViewerProps> = ({
  keywordAnalysis,
  topSkillsIdentified = [],
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'missing' | 'matched'>('all');

  const {
    matchedKeywords = [],
    missingCrucialKeywords = [],
    recommendedAdditions = [],
    jobDescriptionMatchPercentage = 75,
  } = keywordAnalysis || {};

  const filteredMatched = matchedKeywords.filter((k) =>
    k.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const filteredMissing = missingCrucialKeywords.filter((k) =>
    k.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Overview Banner */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-indigo-400 uppercase tracking-wider mb-1">
            <Sparkles className="w-4 h-4" />
            ATS Keyword Coverage Analysis
          </div>
          <h3 className="text-xl font-bold text-white">
            Target Job & Industry Keyword Match
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-xl">
            Applicant Tracking Systems match resumes against job descriptions based on semantic terms, exact acronyms, and technical libraries.
          </p>
        </div>

        {/* Match Percentage Display */}
        <div className="flex items-center gap-4 bg-slate-950 p-4 rounded-xl border border-slate-800 shrink-0">
          <div className="text-right">
            <span className="block text-2xl font-black text-white">
              {jobDescriptionMatchPercentage}%
            </span>
            <span className="text-[11px] text-slate-400 uppercase font-semibold">
              Keyword Overlap
            </span>
          </div>
          <div className="w-12 h-12 rounded-full border-4 border-slate-800 border-t-indigo-500 border-r-emerald-500 flex items-center justify-center">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search keywords..."
            className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-200 placeholder-slate-400 focus:outline-none focus:border-indigo-500"
          />
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setActiveFilter('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeFilter === 'all'
                ? 'bg-indigo-600 text-white'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            All Keywords
          </button>
          <button
            type="button"
            onClick={() => setActiveFilter('missing')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeFilter === 'missing'
                ? 'bg-rose-600 text-white'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            Missing ({missingCrucialKeywords.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveFilter('matched')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeFilter === 'matched'
                ? 'bg-emerald-600 text-white'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            Matched ({matchedKeywords.length})
          </button>
        </div>
      </div>

      {/* Missing Keywords Box */}
      {(activeFilter === 'all' || activeFilter === 'missing') && (
        <div className="bg-slate-900/90 border border-amber-900/40 rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
              <h4 className="text-sm font-bold text-amber-300 uppercase tracking-wider">
                Crucial Missing Keywords ({filteredMissing.length})
              </h4>
            </div>
            <span className="text-xs text-slate-400">
              Add these naturally into your Experience or Skills section
            </span>
          </div>

          {filteredMissing.length === 0 ? (
            <p className="text-xs text-slate-400 italic">No missing keywords found for this search.</p>
          ) : (
            <div className="flex flex-wrap gap-2 pt-1">
              {filteredMissing.map((kw, i) => (
                <div
                  key={i}
                  className="group flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-950/40 hover:bg-amber-900/50 border border-amber-700/50 text-amber-200 text-xs font-medium transition-all"
                >
                  <AlertCircle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>{kw}</span>
                  <span className="text-[10px] text-amber-400 font-semibold uppercase tracking-wider">
                    Missing
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Matched Keywords Box */}
      {(activeFilter === 'all' || activeFilter === 'matched') && (
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
              <h4 className="text-sm font-bold text-emerald-400 uppercase tracking-wider">
                Successfully Matched Keywords ({filteredMatched.length})
              </h4>
            </div>
            <span className="text-xs text-slate-400">
              Detected in your resume
            </span>
          </div>

          {filteredMatched.length === 0 ? (
            <p className="text-xs text-slate-400 italic">No matched keywords found for this search.</p>
          ) : (
            <div className="flex flex-wrap gap-2 pt-1">
              {filteredMatched.map((kw, i) => (
                <div
                  key={i}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-950/30 border border-emerald-800/40 text-emerald-300 text-xs font-medium"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>{kw}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Recommended Additions & Certifications */}
      {recommendedAdditions.length > 0 && (
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-3">
          <div className="flex items-center gap-2">
            <PlusCircle className="w-4 h-4 text-cyan-400" />
            <h4 className="text-sm font-bold text-white">
              Recommended Tools, Methodologies & Certifications to Consider
            </h4>
          </div>
          <p className="text-xs text-slate-400">
            Including these demonstrates industry relevance and executive domain depth:
          </p>
          <div className="flex flex-wrap gap-2 pt-1">
            {recommendedAdditions.map((tool, i) => (
              <span
                key={i}
                className="px-3 py-1 rounded-md bg-slate-950 text-slate-300 border border-slate-700 text-xs font-mono"
              >
                + {tool}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
