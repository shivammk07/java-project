import React, { useState } from 'react';
import { CriticalFix } from '../types/resume';
import { AlertOctagon, CheckCircle2, ChevronRight, ShieldAlert, TrendingUp } from 'lucide-react';

interface CriticalFixesListProps {
  fixes: CriticalFix[];
  strengths: string[];
  weaknesses: string[];
  baseScore?: number;
}

export const CriticalFixesList: React.FC<CriticalFixesListProps> = ({
  fixes,
  strengths,
  weaknesses,
  baseScore = 75,
}) => {
  const [resolvedFixes, setResolvedFixes] = useState<Record<number, boolean>>({});

  const toggleResolved = (index: number) => {
    setResolvedFixes((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const getPriorityDetails = (priority: string) => {
    switch (priority?.toLowerCase()) {
      case 'high':
        return {
          text: 'text-rose-400',
          label: 'High Priority',
          pts: 5,
        };
      case 'medium':
        return {
          text: 'text-amber-400',
          label: 'Medium Priority',
          pts: 3,
        };
      default:
        return {
          text: 'text-cyan-400',
          label: 'Quick Win',
          pts: 2,
        };
    }
  };

  const resolvedCount = Object.values(resolvedFixes).filter(Boolean).length;
  const bonusPoints = fixes.reduce((acc, fix, idx) => {
    if (!resolvedFixes[idx]) return acc;
    return acc + getPriorityDetails(fix.priority).pts;
  }, 0);
  const projectedScore = Math.min(99, baseScore + bonusPoints);

  return (
    <div className="space-y-8">
      {/* Actionable Fixes Checklist */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-900 border border-slate-800 rounded-xl p-4">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <AlertOctagon className="w-4 h-4 text-rose-400" />
              <span>Prioritized Action Plan ({fixes.length} Items)</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Check off items as you update your resume to simulate your projected ATS score gain.
            </p>
          </div>

          {fixes.length > 0 && (
            <div className="flex items-center gap-4 text-xs font-mono tabular-nums bg-slate-950 px-3.5 py-2 rounded-lg border border-slate-800 self-start sm:self-auto">
              <span className="text-slate-300">
                Resolved: <strong className="text-white">{resolvedCount}/{fixes.length}</strong>
              </span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span className="flex items-center gap-1 text-emerald-400 font-semibold">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>Projected Score: {projectedScore}/100 (+{bonusPoints} pts)</span>
              </span>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 gap-3.5">
          {fixes.map((fix, idx) => {
            const isResolved = !!resolvedFixes[idx];
            const pInfo = getPriorityDetails(fix.priority);

            return (
              <div
                key={idx}
                className={`p-5 rounded-xl border transition-all ${
                  isResolved
                    ? 'bg-slate-950/50 border-slate-800/60 opacity-65'
                    : 'bg-slate-900 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <button
                      type="button"
                      onClick={() => toggleResolved(idx)}
                      className={`mt-0.5 w-5 h-5 rounded-md border flex items-center justify-center transition-colors cursor-pointer shrink-0 ${
                        isResolved
                          ? 'bg-emerald-600 border-emerald-500 text-white'
                          : 'border-slate-600 hover:border-indigo-400 bg-slate-950'
                      }`}
                      title={isResolved ? 'Mark as pending' : 'Mark as resolved'}
                    >
                      {isResolved && <CheckCircle2 className="w-3.5 h-3.5 text-white" />}
                    </button>

                    <div>
                      {/* Clean unboxed metadata */}
                      <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400 mb-1">
                        <span className={`font-semibold ${pInfo.text}`}>
                          {pInfo.label}
                        </span>
                        <span aria-hidden="true">·</span>
                        <span>
                          Section: <strong className="text-slate-200">{fix.section}</strong>
                        </span>
                        <span aria-hidden="true">·</span>
                        <span className="font-mono tabular-nums text-emerald-400">
                          +{pInfo.pts} ATS pts
                        </span>
                      </div>
                      <h4
                        className={`text-sm font-bold text-white ${
                          isResolved ? 'line-through text-slate-400' : ''
                        }`}
                      >
                        {fix.title}
                      </h4>
                    </div>
                  </div>
                </div>

                <div className="mt-3 pl-8 grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="text-xs text-slate-300 bg-slate-950 p-3 rounded-lg border border-slate-800">
                    <span className="font-semibold text-rose-400 block mb-1">
                      Detected Issue
                    </span>
                    {fix.issue}
                  </div>
                  <div className="text-xs text-slate-200 bg-slate-950 p-3 rounded-lg border border-slate-800 flex items-start gap-1.5">
                    <ChevronRight className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-emerald-400 block mb-1">
                        Actionable Fix
                      </span>
                      {fix.recommendation}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Strengths & Weaknesses 2-Column Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-800">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-3">
          <h4 className="text-sm font-bold text-emerald-400">
            Verified Profile Strengths ({strengths.length})
          </h4>
          <ul className="space-y-2.5">
            {strengths.map((str, i) => (
              <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>{str}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-3">
          <h4 className="text-sm font-bold text-rose-400">
            Profile Vulnerabilities & Screening Risks ({weaknesses.length})
          </h4>
          <ul className="space-y-2.5">
            {weaknesses.map((w, i) => (
              <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                <ShieldAlert className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <span>{w}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
