import React from 'react';
import { Sparkles, FileText, Printer, RotateCcw, Award } from 'lucide-react';

interface NavbarProps {
  onReset: () => void;
  onOpenSamples: () => void;
  hasAnalysis: boolean;
  onPrint: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onReset,
  onOpenSamples,
  hasAnalysis,
  onPrint,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800 bg-slate-950/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 p-0.5 shadow-lg shadow-indigo-500/20">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <FileText className="w-5 h-5 text-indigo-400" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-lg tracking-tight text-white">CareerPulse</span>
              <span className="px-2 py-0.5 text-[10px] font-semibold tracking-wide uppercase rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                AI ATS 3.8
              </span>
            </div>
            <p className="text-xs text-slate-400 hidden sm:block">Executive Resume Analyzer & Career Optimizer</p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={onOpenSamples}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-medium text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-lg transition-all"
          >
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span className="hidden sm:inline">Try Sample</span> Resumes
          </button>

          {hasAnalysis && (
            <>
              <button
                type="button"
                onClick={onPrint}
                className="no-print flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-medium text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-lg transition-all"
                title="Print or Save as PDF"
              >
                <Printer className="w-4 h-4 text-cyan-400" />
                <span className="hidden sm:inline">Export</span> Report
              </button>

              <button
                type="button"
                onClick={onReset}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-medium text-slate-400 hover:text-slate-200 hover:bg-slate-900 rounded-lg transition-all"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>New Scan</span>
              </button>
            </>
          )}

          <div className="hidden md:flex items-center gap-1.5 pl-3 border-l border-slate-800 text-xs text-slate-400">
            <Award className="w-3.5 h-3.5 text-emerald-400" />
            <span>99.4% ATS Precision</span>
          </div>
        </div>
      </div>
    </header>
  );
};
