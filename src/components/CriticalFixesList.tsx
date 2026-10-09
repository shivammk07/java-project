import React, { useState } from 'react';
import { CriticalFix } from '../types/resume';
import { AlertOctagon, CheckCircle2, ChevronRight, ShieldAlert } from 'lucide-react';

interface CriticalFixesListProps {
  fixes: CriticalFix[];
  strengths: string[];
  weaknesses: string[];
}

export const CriticalFixesList: React.FC<CriticalFixesListProps> = ({
  fixes,
  strengths,
  weaknesses,
}) => {
  const [resolvedFixes, setResolvedFixes] = useState<Record<number, boolean>>({});

  const toggleResolved = (index: number) => {
    setResolvedFixes((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const getPriorityTheme = (priority: string) => {
    switch (priority?.toLowerCase()) {
      case 'high':
        return {
          badge: 'bg-rose-500/15 text-rose-400 border-rose-500/30',
          indicator: 'bg-rose-500',
          label: 'High Priority',
        };
      case 'medium':
        return {
          badge: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
          indicator: 'bg-amber-500',
          label: 'Medium Priority',
        };
      default:
        return {
          badge: 'bg-blue-500/15 text-blue-400 border-blue-500/30',
          indicator: 'bg-blue-500',
          label: 'Low Priority / Quick Win',
        };
    }
  };

  const resolvedCount = Object.values(resolvedFixes).filter(Boolean).length;

  return (
    <div className="space-y-8">
      {/* Actionable Fixes Checklist */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <AlertOctagon className="w-5 h-5 text-rose-400" />
              Prioritized Action Items for Immediate Fix
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Address these items first to prevent automatic ATS rejection and recruiter drop-off.
            </p>
          </div>
          {fixes.length > 0 && (
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-900 border border-slate-800 text-slate-300 self-start sm:self-auto">
              Resolved: {resolvedCount} / {fixes.length}
            </span>
          )}
        </div>

        <div className="grid grid-cols-1 gap-3.5">
          {fixes.map((fix, idx) => {
            const isResolved = !!resolvedFixes[idx];
            const pTheme = getPriorityTheme(fix.priority);

            return (
              <div
                key={idx}
                className={`p-5 rounded-2xl border transition-all ${
                  isResolved
                    ? 'bg-slate-950/40 border-slate-800/60 opacity-60'
                    : 'bg-slate-900/90 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <button
                      type="button"
                      onClick={() => toggleResolved(idx)}
                      className={`mt-0.5 w-5 h-5 rounded-md border flex items-center justify-center transition-colors ${
                        isResolved
                          ? 'bg-emerald-600 border-emerald-500 text-white'
                          : 'border-slate-600 hover:border-indigo-400 bg-slate-950'
                      }`}
                      title={isResolved ? 'Mark as pending' : 'Mark as resolved'}
                    >
                      {isResolved && <CheckCircle2 className="w-4 h-4 text-white" />}
                    </button>

                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <span
                          className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${pTheme.badge}`}
                        >
                          {pTheme.label}
                        </span>
                        <span className="text-xs font-medium text-slate-400">
                          Section: <span className="text-slate-200">{fix.section}</span>
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

                <div className="mt-3 pl-8 space-y-2">
                  <div className="text-xs text-rose-300/90 bg-rose-950/20 p-2.5 rounded-lg border border-rose-900/30">
                    <span className="font-semibold text-rose-400">Issue: </span>
                    {fix.issue}
                  </div>
                  <div className="text-xs text-emerald-300/90 bg-emerald-950/20 p-2.5 rounded-lg border border-emerald-900/30 flex items-start gap-1.5">
                    <ChevronRight className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-emerald-400">Recommendation: </span>
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
        {/* Strengths */}
        <div className="bg-slate-900/90 border border-emerald-950/50 rounded-2xl p-5 space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
            <h4 className="text-sm font-bold text-emerald-400 uppercase tracking-wider">
              Key Strengths (Keep & Highlight)
            </h4>
          </div>
          <ul className="space-y-2">
            {strengths.map((str, i) => (
              <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>{str}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Vulnerabilities */}
        <div className="bg-slate-900/90 border border-rose-950/50 rounded-2xl p-5 space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-rose-400" />
            <h4 className="text-sm font-bold text-rose-400 uppercase tracking-wider">
              Profile Vulnerabilities & Red Flags
            </h4>
          </div>
          <ul className="space-y-2">
            {weaknesses.map((w, i) => (
              <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-slate-300">
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
