import React from 'react';
import { SectionEvaluation, AtsChecklistItem } from '../types/resume';
import { CheckCircle2, AlertTriangle, XCircle, FileCheck, Layers } from 'lucide-react';

interface SectionAuditProps {
  sectionEvaluations: SectionEvaluation[];
  atsComplianceChecklist: AtsChecklistItem[];
}

export const SectionAudit: React.FC<SectionAuditProps> = ({
  sectionEvaluations,
  atsComplianceChecklist,
}) => {
  const getRatingBadge = (rating: string) => {
    switch (rating) {
      case 'excellent':
        return {
          icon: <CheckCircle2 className="w-4 h-4 text-emerald-400" />,
          label: 'Strong',
          badge: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
        };
      case 'adequate':
        return {
          icon: <AlertTriangle className="w-4 h-4 text-amber-400" />,
          label: 'Adequate',
          badge: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
        };
      default:
        return {
          icon: <XCircle className="w-4 h-4 text-rose-400" />,
          label: 'Needs Work',
          badge: 'bg-rose-500/10 text-rose-400 border-rose-500/30',
        };
    }
  };

  return (
    <div className="space-y-8">
      {/* ATS Compliance Checklist */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6">
        <div className="flex items-center gap-2 mb-4">
          <FileCheck className="w-5 h-5 text-indigo-400" />
          <h3 className="text-base font-bold text-white">
            ATS Technical Formatting Compliance Checklist
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {atsComplianceChecklist.map((item, idx) => (
            <div
              key={idx}
              className={`p-3.5 rounded-xl border flex items-start gap-3 ${
                item.passed
                  ? 'bg-slate-950/60 border-slate-800'
                  : 'bg-rose-950/15 border-rose-900/30'
              }`}
            >
              {item.passed ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              ) : (
                <XCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              )}
              <div className="text-xs">
                <span
                  className={`font-semibold block ${
                    item.passed ? 'text-slate-200' : 'text-rose-300'
                  }`}
                >
                  {item.item}
                </span>
                <span className="text-slate-400 leading-snug mt-0.5 block">
                  {item.details}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Section-by-Section In-Depth Audit */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Layers className="w-5 h-5 text-indigo-400" />
          <h3 className="text-base font-bold text-white">
            Section-by-Section Structural Audit
          </h3>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {sectionEvaluations.map((sec, idx) => {
            const badge = getRatingBadge(sec.rating);

            return (
              <div
                key={idx}
                className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 hover:border-slate-700 transition-all shadow-md"
              >
                <div className="flex items-center justify-between gap-4 mb-3">
                  <h4 className="text-sm font-bold text-white">{sec.sectionName}</h4>
                  <span
                    className={`flex items-center gap-1.5 text-xs font-semibold px-2.5 py-0.5 rounded-full border ${badge.badge}`}
                  >
                    {badge.icon}
                    <span>{badge.label}</span>
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  {/* Positives */}
                  <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80">
                    <span className="font-semibold text-emerald-400 block mb-1">
                      ✓ What's Working:
                    </span>
                    <p className="text-slate-300 leading-relaxed">
                      {sec.positiveNotes || 'Standard baseline met.'}
                    </p>
                  </div>

                  {/* Improvements */}
                  <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80">
                    <span className="font-semibold text-amber-400 block mb-1">
                      ✎ Actionable Enhancement:
                    </span>
                    <p className="text-slate-300 leading-relaxed">
                      {sec.improvements || 'No immediate structural changes needed.'}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
