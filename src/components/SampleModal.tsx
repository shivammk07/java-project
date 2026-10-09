import React from 'react';
import { SAMPLE_RESUMES } from '../data/sampleResumes';
import { SampleResume } from '../types/resume';
import { X, Sparkles, ArrowRight, CheckCircle2, UserCheck } from 'lucide-react';

interface SampleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectSample: (sample: SampleResume) => void;
}

export const SampleModal: React.FC<SampleModalProps> = ({
  isOpen,
  onClose,
  onSelectSample,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Select a Sample Resume</h3>
              <p className="text-xs text-slate-400">
                Explore real ATS audits and Google XYZ bullet rewrites in one click
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* List of Samples */}
        <div className="space-y-3.5 mt-5">
          {SAMPLE_RESUMES.map((sample) => (
            <div
              key={sample.id}
              onClick={() => {
                onSelectSample(sample);
                onClose();
              }}
              className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 hover:border-indigo-500/50 hover:bg-slate-950 transition-all cursor-pointer group"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white text-base group-hover:text-indigo-300 transition-colors">
                      {sample.name}
                    </span>
                    <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                      {sample.level}
                    </span>
                  </div>
                  <p className="text-xs text-indigo-400 font-medium mt-0.5">
                    {sample.role}
                  </p>
                  <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                    {sample.tagline}
                  </p>
                  <div className="mt-2 text-[11px] text-slate-400 font-mono">
                    Target: {sample.targetJobTitle}
                  </div>
                </div>

                <div className="self-center p-2 rounded-xl bg-slate-900 group-hover:bg-indigo-600 text-slate-400 group-hover:text-white transition-all shrink-0">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
