import React, { useState } from 'react';
import { CheckCircle2, AlertCircle, PlusCircle, Search, Sparkles, Copy, Check } from 'lucide-react';

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
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'missing' | 'matched'>('all');
  const [copiedMissing, setCopiedMissing] = useState(false);

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

  const handleCopyAllMissing = () => {
    if (missingCrucialKeywords.length === 0) return;
    navigator.clipboard.writeText(missingCrucialKeywords.join(', '));
    setCopiedMissing(true);
    setTimeout(() => setCopiedMissing(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Overview Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-indigo-400 mb-1">
            <Sparkles className="w-4 h-4" />
            <span>ATS Semantic & Exact Keyword Matrix</span>
          </div>
          <h3 className="text-xl font-bold text-white">
            Target Job & Industry Keyword Alignment
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-xl">
            Applicant Tracking Systems score resumes by matching exact technical nouns, certifications, and domain methodologies against the target job description.
          </p>
        </div>

        {/* Match Percentage Display */}
        <div className="flex items-center gap-4 bg-slate-950 p-4 rounded-xl border border-slate-800 shrink-0">
          <div className="text-right">
            <span className="block text-2xl font-black text-white font-mono tabular-nums">
              {jobDescriptionMatchPercentage}%
            </span>
            <span className="text-xs text-slate-400 font-medium">
              Keyword Match
            </span>
          </div>
          <div className="w-11 h-11 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Filter keywords..."
            className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
          />
        </div>

        <div className="flex items-center gap-1 p-1 bg-slate-900 border border-slate-800 rounded-lg self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setActiveFilter('all')}
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              activeFilter === 'all'
                ? 'bg-indigo-600 text-white'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            All ({matchedKeywords.length + missingCrucialKeywords.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveFilter('missing')}
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              activeFilter === 'missing'
                ? 'bg-rose-600 text-white'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Missing ({missingCrucialKeywords.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveFilter('matched')}
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              activeFilter === 'matched'
                ? 'bg-emerald-600 text-white'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Matched ({matchedKeywords.length})
          </button>
        </div>
      </div>

      {/* Missing Keywords Table / Grid */}
      {(activeFilter === 'all' || activeFilter === 'missing') && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h4 className="text-sm font-bold text-amber-400">
                Crucial Missing Keywords ({filteredMissing.length})
              </h4>
              <p className="text-xs text-slate-400 mt-0.5">
                Incorporate these naturally into your Skills or Work Experience bullets.
              </p>
            </div>
            {missingCrucialKeywords.length > 0 && (
              <button
                type="button"
                onClick={handleCopyAllMissing}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-950 hover:bg-slate-800 border border-slate-700 text-xs font-medium text-slate-200 self-start sm:self-auto cursor-pointer"
              >
                {copiedMissing ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Copied Missing List</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-amber-400" />
                    <span>Copy All Missing Keywords</span>
                  </>
                )}
              </button>
            )}
          </div>

          {filteredMissing.length === 0 ? (
            <p className="text-xs text-slate-400 italic">No missing keywords found for this filter.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5 pt-1">
              {filteredMissing.map((kw, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between px-3.5 py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-xs"
                >
                  <div className="flex items-center gap-2 font-medium text-slate-200 truncate">
                    <AlertCircle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span className="truncate">{kw}</span>
                  </div>
                  <span className="text-[11px] text-amber-400 font-mono shrink-0 ml-2">
                    Missing
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Matched Keywords Grid */}
      {(activeFilter === 'all' || activeFilter === 'matched') && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-bold text-emerald-400">
              Verified Matched Keywords ({filteredMatched.length})
            </h4>
            <span className="text-xs text-slate-400">
              Detected in your resume
            </span>
          </div>

          {filteredMatched.length === 0 ? (
            <p className="text-xs text-slate-400 italic">No matched keywords found for this filter.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 pt-1">
              {filteredMatched.map((kw, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 px-3.5 py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-emerald-300 text-xs font-medium truncate"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span className="truncate">{kw}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Recommended Additions */}
      {recommendedAdditions.length > 0 && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-3">
          <div className="flex items-center gap-2">
            <PlusCircle className="w-4 h-4 text-cyan-400" />
            <h4 className="text-sm font-bold text-white">
              Recommended Tools, Methodologies & Certifications
            </h4>
          </div>
          <p className="text-xs text-slate-400">
            Adding relevant items from this list strengthens domain authority for senior screening:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2.5 pt-1">
            {recommendedAdditions.map((tool, i) => (
              <div
                key={i}
                className="px-3.5 py-2 rounded-lg bg-slate-950 text-slate-300 border border-slate-800 text-xs font-mono truncate"
              >
                + {tool}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
