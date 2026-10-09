import React from 'react';
import { FileText, Printer, RotateCcw, FolderOpen } from 'lucide-react';

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
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/90 bg-slate-950/90 backdrop-blur-md no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Single-line Brand Wordmark */}
        <button
          type="button"
          onClick={onReset}
          className="flex items-center gap-2.5 text-left group whitespace-nowrap shrink-0 cursor-pointer focus:outline-none"
        >
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white shadow-sm group-hover:bg-indigo-500 transition-colors">
            <FileText className="w-4 h-4" />
          </div>
          <span className="font-bold text-lg tracking-tight text-white">
            CareerPulse
          </span>
        </button>

        {/* Zone 2: Clean Single-Line Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-400">
          <button
            type="button"
            onClick={onReset}
            className="hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Analyzer Workspace
          </button>
          <button
            type="button"
            onClick={onOpenSamples}
            className="hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Sample Library (8)
          </button>
          <a
            href="#supported-formats"
            onClick={(e) => {
              if (hasAnalysis) {
                e.preventDefault();
                onReset();
              }
            }}
            className="hover:text-white transition-colors whitespace-nowrap shrink-0"
          >
            Supported Formats
          </a>
          <a
            href="#xyz-methodology"
            onClick={(e) => {
              if (hasAnalysis) {
                e.preventDefault();
                onReset();
              }
            }}
            className="hover:text-white transition-colors whitespace-nowrap shrink-0"
          >
            XYZ Methodology
          </a>
        </nav>

        {/* Zone 3: Primary Action Control */}
        <div className="flex items-center gap-2 shrink-0">
          {!hasAnalysis ? (
            <button
              type="button"
              onClick={onOpenSamples}
              className="flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <FolderOpen className="w-3.5 h-3.5" />
              <span>Explore Samples</span>
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onOpenSamples}
                className="hidden sm:flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                <FolderOpen className="w-3.5 h-3.5 text-indigo-400" />
                <span>Switch Sample</span>
              </button>
              <button
                type="button"
                onClick={onPrint}
                className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5 text-cyan-400" />
                <span>Export PDF</span>
              </button>
              <button
                type="button"
                onClick={onReset}
                className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>New Scan</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
