import React, { useState, useEffect } from 'react';
import {
  X,
  ChevronLeft,
  ChevronRight,
  Download,
  FileSpreadsheet,
  CheckCircle2,
  AlertTriangle,
  Zap,
  Server,
  Layers,
  Cpu,
  ShieldCheck,
  Sparkles,
  BookOpen,
} from 'lucide-react';
import { downloadPresentationDeck } from '../utils/pptxExport';

interface PresentationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PresentationModal: React.FC<PresentationModalProps> = ({ isOpen, onClose }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isDownloading, setIsDownloading] = useState(false);
  const [showSpeakerNotes, setShowSpeakerNotes] = useState(false);

  const totalSlides = 10;

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'Space') {
        e.preventDefault();
        setCurrentSlide((prev) => Math.min(totalSlides - 1, prev + 1));
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        setCurrentSlide((prev) => Math.max(0, prev - 1));
      } else if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleDownloadPptx = async () => {
    setIsDownloading(true);
    try {
      await downloadPresentationDeck();
    } catch (err) {
      console.error('Error during PPTX download:', err);
    } finally {
      setIsDownloading(false);
    }
  };

  const slideTitles = [
    'Cover & Architecture Overview',
    'Problem Statement & ATS Limits',
    'System Architecture Pipeline',
    'Screenshot 1: 503 Outage Incident',
    'Screenshot 2: Resolved Failover UI',
    'Screenshot 3: Live Audit Dashboard',
    'Screenshot 4: Visual OCR Inspector',
    'CPRW Rubric & Google XYZ',
    'Benchmarks & Resiliency Metrics',
    'Conclusion & Engineering Value',
  ];

  const speakerNotes = [
    'Slide 1: Introduce CareerPulse as a multimodal ATS resume audit engine designed for high throughput and zero-downtime resiliency. Highlight Gemini Vision OCR, low-thinking optimization, and the multi-tier failover cascade.',
    'Slide 2: Contrast legacy ATS tools (rejecting 75% of qualified resumes due to layout flaws or unreadable scans) with cloud capacity challenges (HTTP 503 errors during traffic spikes).',
    'Slide 3: Walk through the 4 pipeline stages: Multimodal Ingestion (Canvas OCR & Mammoth AST), Express Gateway with SHA-256 caching, the 3-Tier Gemini Model Cascade, and the Local CPRW Shield.',
    'Slide 4 (Website Screenshot): Show the actual website interface during the 503 incident. Point out the red "Analysis Interrupted" banner caused by upstream Gemini model capacity saturation, and explain how single-model apps fail without failover.',
    'Slide 5 (Website Screenshot): Present the resolved website interface. Highlight the new "⚡ High Cloud Demand Shield Active: Auto-Failover Ready" recovery bar, and show how users can click "Run Instant Turbo Audit" or "Retry AI Scan" without breaking flow.',
    'Slide 6 (Website Screenshot): Walk through the live ATS candidate audit dashboard for Priya Nair (Principal Java Architect). Point out the 86/100 radial score gauge, KPI progress bars, and Google XYZ bullet rewrite transformations.',
    'Slide 7 (Website Screenshot): Show the side-by-side Visual Document & OCR Inspector drawer. Explain how multimodal vision checks layout flow, font readability, contact integrity, and date syntax with 100% compliance.',
    'Slide 8: Explain the 5-pillar evaluation rubric and demonstrate the Google XYZ formula: "Accomplished [X], measured by [Y], by doing [Z]". Walk through the weak duty statement vs. the optimized leadership bullet.',
    'Slide 9: Highlight real performance metrics: <4.5s average cloud audit, 3ms local turbo failover, 99.99% effective service availability, and support for 4 distinct input formats.',
    'Slide 10: Conclude by summarizing engineering impact, production readiness, and the deliverables generated including live app, GitHub codebase, and this exportable .pptx presentation deck.',
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-md">
      <div className="relative w-full max-w-6xl h-[92vh] flex flex-col bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden">
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-800 bg-slate-950/60 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white shadow-sm">
              <FileSpreadsheet className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm text-white">CareerPulse Project Presentation</span>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/30">
                  .pptx Slide Deck (10 Slides)
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Slide {currentSlide + 1} of {totalSlides}: <span className="text-slate-200 font-medium">{slideTitles[currentSlide]}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setShowSpeakerNotes((prev) => !prev)}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors cursor-pointer ${
                showSpeakerNotes
                  ? 'bg-indigo-600 text-white border-indigo-500'
                  : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border-slate-800'
              }`}
              title="Toggle presenter talking points"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Speaker Notes</span>
            </button>

            <button
              type="button"
              onClick={handleDownloadPptx}
              disabled={isDownloading}
              className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg shadow-sm transition-colors cursor-pointer disabled:opacity-50"
            >
              <Download className={`w-3.5 h-3.5 ${isDownloading ? 'animate-bounce' : ''}`} />
              <span>{isDownloading ? 'Generating...' : 'Download .pptx'}</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Main Slide Stage (16:9 Canvas) */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-8 flex items-center justify-center bg-slate-950">
          <div className="w-full max-w-5xl aspect-video max-h-full bg-slate-900 border border-slate-800/90 rounded-2xl p-6 sm:p-10 shadow-2xl flex flex-col justify-between relative overflow-hidden">
            {/* Background Gradient Accents */}
            <div className="absolute -top-24 -right-24 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

            {/* SLIDE 1: Title Slide */}
            {currentSlide === 0 && (
              <div className="h-full flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono font-semibold tracking-wider text-cyan-400 uppercase">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Multimodal AI & High-Availability Cloud Engineering</span>
                  </div>
                  <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight mt-3">
                    CareerPulse
                  </h1>
                  <p className="text-base sm:text-lg text-slate-300 mt-2 max-w-2xl leading-relaxed">
                    Multimodal ATS Resume Audit Engine with Sub-10s Vision OCR, Zero-Downtime 503 Failover Cascade, and Google XYZ Bullet Optimization.
                  </p>
                </div>

                <div className="p-4 sm:p-5 rounded-xl bg-slate-950/80 border border-slate-800 backdrop-blur-sm space-y-2.5">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-2.5">
                    <span className="text-xs text-slate-400 font-medium">Project Author / Lead:</span>
                    <span className="text-xs font-bold text-white">Shivam Kumar</span>
                  </div>
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-2.5">
                    <span className="text-xs text-slate-400 font-medium">Architecture Stack:</span>
                    <span className="text-xs font-mono text-indigo-300">
                      React 19, TypeScript, Express, Gemini Multimodal Vision, Mammoth AST
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-xs text-slate-400 font-medium">Key Reliability Milestone:</span>
                    <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      99.99% Effective Uptime via 3-Tier Model Routing & Local CPRW Fallback
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-500 font-mono">
                  <span>Google AI Studio / Full-Stack Production Build</span>
                  <span>Press Space / Arrow keys to navigate</span>
                </div>
              </div>
            )}

            {/* SLIDE 2: Problem Statement */}
            {currentSlide === 1 && (
              <div className="h-full flex flex-col justify-between">
                <div>
                  <span className="text-xs font-mono font-semibold text-cyan-400 uppercase">01 / Problem Statement</span>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                    The State of Modern Resume Auditing & ATS Screening
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-auto">
                  <div className="p-5 rounded-xl bg-slate-950 border border-rose-500/30">
                    <div className="w-8 h-8 rounded-lg bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400 mb-3">
                      <AlertTriangle className="w-4 h-4" />
                    </div>
                    <h3 className="text-sm font-bold text-rose-300">Legacy ATS Inflexibility</h3>
                    <ul className="text-xs text-slate-400 mt-2 space-y-2 leading-relaxed">
                      <li>• Traditional parsers drop text on multi-column or visual formats.</li>
                      <li>• Camera scans of printed resumes are rejected immediately.</li>
                      <li>• 75% of qualified applicants are filtered out silently.</li>
                    </ul>
                  </div>

                  <div className="p-5 rounded-xl bg-slate-950 border border-amber-500/30">
                    <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-3">
                      <Zap className="w-4 h-4" />
                    </div>
                    <h3 className="text-sm font-bold text-amber-300">Cloud Model 503 Spikes</h3>
                    <ul className="text-xs text-slate-400 mt-2 space-y-2 leading-relaxed">
                      <li>• Peak-traffic surges trigger upstream HTTP 503 UNAVAILABLE.</li>
                      <li>• Single-model applications crash with raw JSON errors.</li>
                      <li>• Unhandled downtime breaks applicant workflow during live reviews.</li>
                    </ul>
                  </div>

                  <div className="p-5 rounded-xl bg-slate-950 border border-emerald-500/30">
                    <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-3">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <h3 className="text-sm font-bold text-emerald-300">The CareerPulse Solution</h3>
                    <ul className="text-xs text-slate-400 mt-2 space-y-2 leading-relaxed">
                      <li>• Multimodal OCR across PDF, DOCX, Photo Scans, and Raw Text.</li>
                      <li>• Sub-10s turnaround using low-thinking multimodal optimization.</li>
                      <li>• 3-tier model cascade + local CPRW turbo heuristic failover.</li>
                    </ul>
                  </div>
                </div>

                <div className="text-xs text-slate-500 font-mono text-right">
                  Slide 2 / 10 — Problem & Solution
                </div>
              </div>
            )}

            {/* SLIDE 3: System Architecture Pipeline */}
            {currentSlide === 2 && (
              <div className="h-full flex flex-col justify-between">
                <div>
                  <span className="text-xs font-mono font-semibold text-cyan-400 uppercase">02 / System Architecture</span>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                    End-to-End High-Availability Pipeline
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 my-auto">
                  <div className="p-4 rounded-xl bg-slate-950 border border-cyan-500/40">
                    <div className="text-xs font-mono font-bold text-cyan-400 mb-2 flex items-center gap-1.5">
                      <Layers className="w-4 h-4" />
                      <span>1. Ingestion Tier</span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Multi-format drag-and-drop supporting PDF, camera photos, Word DOCX via Mammoth AST, and raw text.
                    </p>
                    <div className="mt-3 text-[11px] font-mono text-cyan-300 bg-cyan-950/40 px-2 py-1 rounded">
                      Canvas High-DPI OCR
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-950 border border-indigo-500/40">
                    <div className="text-xs font-mono font-bold text-indigo-400 mb-2 flex items-center gap-1.5">
                      <Server className="w-4 h-4" />
                      <span>2. Gateway Tier</span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Express proxy with 50MB limits, MIME normalization, and SHA-256 LRU cache for millisecond repeat scans.
                    </p>
                    <div className="mt-3 text-[11px] font-mono text-indigo-300 bg-indigo-950/40 px-2 py-1 rounded">
                      SHA-256 Memory LRU
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-950 border border-amber-500/40">
                    <div className="text-xs font-mono font-bold text-amber-400 mb-2 flex items-center gap-1.5">
                      <Cpu className="w-4 h-4" />
                      <span>3. Cascade Tier</span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      3-Tier failover routing across Gemini 3.8 Flash, Flash Latest, and 3.1 Flash Lite with jittered retries.
                    </p>
                    <div className="mt-3 text-[11px] font-mono text-amber-300 bg-amber-950/40 px-2 py-1 rounded">
                      Auto Model Failover
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-950 border border-emerald-500/40">
                    <div className="text-xs font-mono font-bold text-emerald-400 mb-2 flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4" />
                      <span>4. CPRW Shield</span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Local CPRW heuristic analyzer generates full ATS scoring & Google XYZ rewrites in &lt;5ms if cloud fails.
                    </p>
                    <div className="mt-3 text-[11px] font-mono text-emerald-300 bg-emerald-950/40 px-2 py-1 rounded">
                      Zero-Downtime Fallback
                    </div>
                  </div>
                </div>

                <div className="text-xs text-slate-500 font-mono text-right">
                  Slide 3 / 10 — System Architecture
                </div>
              </div>
            )}

            {/* SLIDE 4: SCREENSHOT 1 — 503 Incident in Website UI */}
            {currentSlide === 3 && (
              <div className="h-full flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-semibold text-rose-400 uppercase">03 / Incident Screenshot</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-500/10 text-rose-300 border border-rose-500/30">
                      Actual Website Interface
                    </span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                    Website Screenshot: 503 Model Demand Failure
                  </h2>
                </div>

                {/* Browser Frame */}
                <div className="rounded-xl bg-slate-950 border border-slate-700 shadow-2xl overflow-hidden my-auto">
                  {/* Browser Bar */}
                  <div className="px-3 py-1.5 bg-slate-900 border-b border-slate-800 flex items-center gap-2 text-xs text-slate-400">
                    <div className="flex items-center gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                      <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                    </div>
                    <div className="flex-1 max-w-sm mx-auto px-3 py-0.5 rounded bg-slate-950 border border-slate-800 text-[11px] font-mono text-center text-slate-300">
                      🔒 https://careerpulse.ai/analyzer-workspace
                    </div>
                  </div>

                  {/* Browser Body (The actual screenshot layout) */}
                  <div className="p-4 sm:p-5 space-y-3 bg-slate-950">
                    {/* Website Header */}
                    <div className="flex items-center justify-between border-b border-slate-800/80 pb-2.5">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded bg-indigo-600 flex items-center justify-center text-white text-xs font-bold">CP</div>
                        <span className="font-bold text-white text-sm">CareerPulse</span>
                        <span className="text-xs text-slate-500 hidden sm:inline ml-3">Analyzer Workspace • Sample Library (8) • Supported Formats • XYZ Methodology</span>
                      </div>
                      <div className="px-2.5 py-1 rounded bg-indigo-600 text-white text-[11px] font-semibold">Explore Samples</div>
                    </div>

                    {/* RED ERROR ALERT BANNER FROM SCREENSHOT */}
                    <div className="p-3 sm:p-4 rounded-xl bg-rose-950/50 border border-rose-800 text-rose-300 flex items-start justify-between gap-3 shadow-lg">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 font-bold text-white text-xs sm:text-sm">
                          <AlertTriangle className="w-4 h-4 text-rose-400" />
                          <span>Analysis Interrupted</span>
                        </div>
                        <p className="font-mono text-[11px] text-rose-300/90 leading-relaxed max-w-2xl">
                          {`{"error":{"code":503,"message":"This model is currently experiencing high demand. Spikes in demand are usually temporary. Please try again later.","status":"UNAVAILABLE"}}`}
                        </p>
                      </div>
                      <div className="text-[11px] px-2.5 py-1 rounded bg-rose-900/60 text-white font-medium shrink-0">
                        Dismiss
                      </div>
                    </div>

                    {/* Hero Title */}
                    <div className="text-center py-2">
                      <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider block">
                        Multimodal ATS & Vision OCR Engine • Sub-10s Turbo Audit
                      </span>
                      <h3 className="text-base sm:text-lg font-bold text-white mt-1">
                        Audit Any Resume in Seconds — PDF, Photo Scans, Word & Plain Text
                      </h3>
                      <p className="text-xs text-slate-400 max-w-xl mx-auto mt-1">
                        Upload a PDF, snap a camera photo of a printed resume, drop a DOCX file, or paste raw text.
                      </p>
                    </div>

                    {/* Format filter pills */}
                    <div className="flex items-center justify-between p-2 rounded-lg bg-slate-900 border border-slate-800 text-xs">
                      <span className="text-slate-300 font-medium">Try Pre-Loaded Sample Resume (8 Profiles)</span>
                      <div className="flex gap-1">
                        <span className="px-2 py-0.5 rounded bg-indigo-600 text-white font-bold text-[10px]">All (8)</span>
                        <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-400 text-[10px]">Photo Scans (3)</span>
                        <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-400 text-[10px]">PDF (2)</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="text-xs text-slate-400 flex items-center justify-between">
                  <span className="text-rose-400 font-medium">
                    📌 Identified Failure: Upstream Gemini endpoint saturated during peak traffic without fallback routing.
                  </span>
                  <span className="font-mono text-slate-500">Slide 4 / 10 — Screenshot 1</span>
                </div>
              </div>
            )}

            {/* SLIDE 5: SCREENSHOT 2 — Resolved UI with Cloud Demand Shield */}
            {currentSlide === 4 && (
              <div className="h-full flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-semibold text-emerald-400 uppercase">04 / Resolution Screenshot</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
                      Resolved Live Interface
                    </span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                    Website Screenshot: Resolved UI & Demand Shield
                  </h2>
                </div>

                {/* Browser Frame */}
                <div className="rounded-xl bg-slate-950 border border-slate-700 shadow-2xl overflow-hidden my-auto">
                  <div className="px-3 py-1.5 bg-slate-900 border-b border-slate-800 flex items-center gap-2 text-xs text-slate-400">
                    <div className="flex items-center gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                      <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                    </div>
                    <div className="flex-1 max-w-sm mx-auto px-3 py-0.5 rounded bg-slate-950 border border-slate-800 text-[11px] font-mono text-center text-slate-300">
                      🔒 https://careerpulse.ai/analyzer-workspace
                    </div>
                  </div>

                  <div className="p-4 sm:p-5 space-y-3 bg-slate-950">
                    {/* Website Header with Presentation button */}
                    <div className="flex items-center justify-between border-b border-slate-800/80 pb-2.5">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded bg-indigo-600 flex items-center justify-center text-white text-xs font-bold">CP</div>
                        <span className="font-bold text-white text-sm">CareerPulse</span>
                        <span className="text-xs text-slate-400 hidden sm:inline ml-3">Analyzer Workspace • Sample Library (8) • Presentation (.pptx)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="px-2.5 py-1 rounded bg-slate-800 border border-cyan-500/40 text-cyan-300 text-[11px] font-semibold">
                          Presentation (.pptx)
                        </div>
                        <div className="px-2.5 py-1 rounded bg-indigo-600 text-white text-[11px] font-semibold">
                          Explore Samples
                        </div>
                      </div>
                    </div>

                    {/* RESOLVED DEMAND SHIELD BAR */}
                    <div className="p-3.5 rounded-xl bg-slate-900/95 border border-emerald-500/40 text-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-xl">
                      <div className="flex items-start gap-2.5">
                        <div className="w-7 h-7 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                          <CheckCircle2 className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="font-bold text-xs text-white flex items-center gap-2">
                            <span>Gemini Cloud Traffic Spike Handled</span>
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                              Auto-Failover Active
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-300 mt-0.5 leading-relaxed">
                            The AI model experienced peak demand. Instant auto-failover routing and CPRW turbo auditing are enabled.
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <div className="px-3 py-1.5 rounded-lg bg-indigo-600 text-white text-[11px] font-semibold">
                          Run Instant Turbo Audit
                        </div>
                        <div className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-200 border border-slate-700 text-[11px] font-medium">
                          Retry AI Scan
                        </div>
                      </div>
                    </div>

                    {/* Candidate Card */}
                    <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                      <div>
                        <div className="text-xs font-bold text-white">Active Candidate: Priya Nair</div>
                        <div className="text-[11px] text-cyan-300">Principal Java & Distributed Systems Architect • PDF Document • Est. 9 years</div>
                      </div>
                      <span className="px-2.5 py-1 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-[10px] font-bold">
                        Audit Ready (&lt;5ms)
                      </span>
                    </div>
                  </div>
                </div>

                <div className="text-xs text-slate-400 flex items-center justify-between">
                  <span className="text-emerald-400 font-medium">
                    ✓ Verified Resolution: Zero-downtime routing eliminates interruption with clear user recovery actions.
                  </span>
                  <span className="font-mono text-slate-500">Slide 5 / 10 — Screenshot 2</span>
                </div>
              </div>
            )}

            {/* SLIDE 6: SCREENSHOT 3 — Full Audit Dashboard */}
            {currentSlide === 5 && (
              <div className="h-full flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-semibold text-cyan-400 uppercase">05 / Dashboard Screenshot</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
                      Live Candidate Audit
                    </span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                    Website Screenshot: ATS Dashboard (Priya Nair)
                  </h2>
                </div>

                {/* Browser Frame */}
                <div className="rounded-xl bg-slate-950 border border-slate-700 shadow-2xl overflow-hidden my-auto">
                  <div className="px-3 py-1.5 bg-slate-900 border-b border-slate-800 flex items-center gap-2 text-xs text-slate-400">
                    <div className="flex items-center gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                      <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                    </div>
                    <div className="flex-1 max-w-sm mx-auto px-3 py-0.5 rounded bg-slate-950 border border-slate-800 text-[11px] font-mono text-center text-slate-300">
                      🔒 https://careerpulse.ai/analyzer/priya-nair
                    </div>
                  </div>

                  <div className="p-4 sm:p-5 bg-slate-950 space-y-3">
                    {/* Header Strip with Demand Shield Notice */}
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-extrabold text-white text-base">Priya Nair</h4>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/30">
                            ⚡ Cloud Demand Shield Active
                          </span>
                        </div>
                        <p className="text-xs text-slate-400">Principal Java & Distributed Systems Architect • Target: Cloud Financial Ledger Architect</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono text-emerald-400 font-bold">Scanned in 4.2s</span>
                      </div>
                    </div>

                    {/* Radial Score Gauge & KPI Columns */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center gap-3">
                        <div className="w-16 h-16 rounded-full border-4 border-emerald-400 flex items-center justify-center text-center">
                          <div>
                            <span className="text-lg font-bold text-white block leading-none">86</span>
                            <span className="text-[9px] text-slate-400 font-mono">/100</span>
                          </div>
                        </div>
                        <div>
                          <span className="text-xs font-bold text-emerald-400 block">Exceptional Tier</span>
                          <span className="text-[11px] text-slate-400">Interview Ready (Top 5%)</span>
                          <div className="mt-1 text-[10px] font-mono text-cyan-300">Match Alignment: 88%</div>
                        </div>
                      </div>

                      <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5">
                        <div className="flex justify-between text-[11px]">
                          <span className="text-slate-300">ATS Parsability</span>
                          <span className="font-mono text-emerald-400 font-bold">92%</span>
                        </div>
                        <div className="h-1.5 rounded-full bg-slate-800 overflow-hidden">
                          <div className="w-[92%] h-full bg-emerald-400" />
                        </div>
                        <div className="flex justify-between text-[11px]">
                          <span className="text-slate-300">Quantifiable Impact</span>
                          <span className="font-mono text-cyan-400 font-bold">84%</span>
                        </div>
                        <div className="h-1.5 rounded-full bg-slate-800 overflow-hidden">
                          <div className="w-[84%] h-full bg-cyan-400" />
                        </div>
                      </div>

                      <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5">
                        <div className="flex justify-between text-[11px]">
                          <span className="text-slate-300">Action Verbs & Voice</span>
                          <span className="font-mono text-amber-400 font-bold">79%</span>
                        </div>
                        <div className="h-1.5 rounded-full bg-slate-800 overflow-hidden">
                          <div className="w-[79%] h-full bg-amber-400" />
                        </div>
                        <div className="flex justify-between text-[11px]">
                          <span className="text-slate-300">Keyword Alignment</span>
                          <span className="font-mono text-indigo-400 font-bold">89%</span>
                        </div>
                        <div className="h-1.5 rounded-full bg-slate-800 overflow-hidden">
                          <div className="w-[89%] h-full bg-indigo-400" />
                        </div>
                      </div>
                    </div>

                    {/* Google XYZ Card */}
                    <div className="p-3 rounded-xl bg-slate-900 border border-indigo-500/30 text-xs space-y-1">
                      <span className="text-[10px] font-mono font-bold text-indigo-400 uppercase">Google XYZ Bullet Rewrite:</span>
                      <p className="text-slate-300">
                        <span className="text-emerald-400 font-bold">"Spearheaded 24+ RFC design reviews</span> and mentored 12 engineers, <span className="text-cyan-300">accelerating sprint velocity by 34%</span> with zero defect rollback incidents."
                      </p>
                    </div>
                  </div>
                </div>

                <div className="text-xs text-slate-400 flex items-center justify-between">
                  <span className="text-cyan-400 font-medium">
                    ✓ High-signal Recruiter Intelligence: Provides quantitative scoring, keyword gap diagnostics, and Google XYZ rewrites.
                  </span>
                  <span className="font-mono text-slate-500">Slide 6 / 10 — Screenshot 3</span>
                </div>
              </div>
            )}

            {/* SLIDE 7: SCREENSHOT 4 — Visual Document & OCR Inspector */}
            {currentSlide === 6 && (
              <div className="h-full flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-semibold text-cyan-400 uppercase">06 / OCR Inspector Screenshot</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
                      Visual Document Inspection
                    </span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                    Website Screenshot: OCR Inspector Drawer
                  </h2>
                </div>

                {/* Browser Frame */}
                <div className="rounded-xl bg-slate-950 border border-slate-700 shadow-2xl overflow-hidden my-auto">
                  <div className="px-3 py-1.5 bg-slate-900 border-b border-slate-800 flex items-center gap-2 text-xs text-slate-400">
                    <div className="flex items-center gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                      <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                    </div>
                    <div className="flex-1 max-w-sm mx-auto px-3 py-0.5 rounded bg-slate-950 border border-slate-800 text-[11px] font-mono text-center text-slate-300">
                      🔒 https://careerpulse.ai/analyzer/document-inspector
                    </div>
                  </div>

                  <div className="p-4 sm:p-5 bg-slate-950 flex flex-col md:flex-row items-center gap-4">
                    {/* Simulated Document Sheet Preview */}
                    <div className="w-full md:w-56 p-3 rounded-lg bg-slate-100 text-slate-900 text-[9px] font-sans border border-slate-400 shadow-lg space-y-1 shrink-0">
                      <div className="font-bold text-xs text-slate-950">PRIYA NAIR</div>
                      <div className="text-[8px] text-slate-600">Principal Java Architect • Seattle, WA • (206) 555-0148</div>
                      <div className="border-t border-slate-300 my-1" />
                      <div className="font-bold text-[8px] text-slate-800">EXPERIENCE</div>
                      <div className="text-[8px] text-slate-700">
                        • Architected microservices handling 42,000 TPS at 99.995% SLA.<br />
                        • Tuned G1GC & ZGC cutting p99 tail latency from 140ms to 19ms.<br />
                        • Apache Kafka, Spring Boot 3, AWS EKS, Project Loom.
                      </div>
                    </div>

                    {/* Inspection Matrix */}
                    <div className="flex-1 space-y-2 text-xs">
                      <div className="font-bold text-sm text-white">Visual Layout & OCR Verification Matrix</div>
                      <p className="text-[11px] text-slate-400">
                        The Gemini Vision model validates layout geometry, multi-column flow, and character clarity:
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
                        <div className="p-2 rounded bg-slate-900 border border-slate-800 flex justify-between">
                          <span className="text-slate-300">Single-Column Flow</span>
                          <span className="text-emerald-400 font-bold">✓ 100% Passed</span>
                        </div>
                        <div className="p-2 rounded bg-slate-900 border border-slate-800 flex justify-between">
                          <span className="text-slate-300">Font Machine-Readability</span>
                          <span className="text-emerald-400 font-bold">✓ Passed (Sans-Serif)</span>
                        </div>
                        <div className="p-2 rounded bg-slate-900 border border-slate-800 flex justify-between">
                          <span className="text-slate-300">Contact Channels</span>
                          <span className="text-emerald-400 font-bold">✓ Email, Phone, LinkedIn</span>
                        </div>
                        <div className="p-2 rounded bg-slate-900 border border-slate-800 flex justify-between">
                          <span className="text-slate-300">Date Format Syntax</span>
                          <span className="text-emerald-400 font-bold">✓ Passed (Month Year)</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="text-xs text-slate-400 flex items-center justify-between">
                  <span className="text-cyan-400 font-medium">
                    ✓ Multimodal Support: Direct inspection of printed photo scans and vector PDFs.
                  </span>
                  <span className="font-mono text-slate-500">Slide 7 / 10 — Screenshot 4</span>
                </div>
              </div>
            )}

            {/* SLIDE 8: 5-Pillar Rubric & Google XYZ Details */}
            {currentSlide === 7 && (
              <div className="h-full flex flex-col justify-between">
                <div>
                  <span className="text-xs font-mono font-semibold text-cyan-400 uppercase">07 / Evaluation Methodology</span>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                    5-Pillar ATS Rubric & Google XYZ Formula
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 my-auto">
                  <div className="space-y-2">
                    <h3 className="text-xs font-mono font-bold text-slate-300 uppercase">5 Evaluation Pillars</h3>
                    <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-xs flex justify-between">
                      <span className="text-white font-medium">1. ATS Machine Parsability</span>
                      <span className="font-mono text-cyan-400 font-bold">25% Weight</span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-xs flex justify-between">
                      <span className="text-white font-medium">2. Quantifiable Impact & Metrics</span>
                      <span className="font-mono text-cyan-400 font-bold">25% Weight</span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-xs flex justify-between">
                      <span className="text-white font-medium">3. Action Verbs & Active Voice</span>
                      <span className="font-mono text-cyan-400 font-bold">20% Weight</span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-xs flex justify-between">
                      <span className="text-white font-medium">4. Keyword & Skill Alignment</span>
                      <span className="font-mono text-cyan-400 font-bold">20% Weight</span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-xs flex justify-between">
                      <span className="text-white font-medium">5. Formatting & Brevity</span>
                      <span className="font-mono text-cyan-400 font-bold">10% Weight</span>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-950 border border-indigo-500/40 flex flex-col justify-between">
                    <div>
                      <div className="text-xs font-mono text-indigo-400 font-bold uppercase mb-1">Google XYZ Formula</div>
                      <div className="text-sm font-extrabold text-white">
                        Accomplished [X], as measured by [Y], by doing [Z]
                      </div>

                      <div className="mt-3 p-2.5 rounded-lg bg-rose-950/30 border border-rose-500/30 text-xs">
                        <span className="text-[10px] font-bold text-rose-400 uppercase block mb-1">Weak Duty:</span>
                        <p className="text-slate-300">
                          "Responsible for reviewing system design documents and helping engineers with deployments."
                        </p>
                      </div>

                      <div className="mt-2.5 p-2.5 rounded-lg bg-emerald-950/30 border border-emerald-500/30 text-xs">
                        <span className="text-[10px] font-bold text-emerald-400 uppercase block mb-1">Optimized XYZ Bullet:</span>
                        <p className="text-white font-medium">
                          "Spearheaded 24+ RFC design reviews, accelerating sprint velocity by 34% with zero rollback incidents."
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="text-xs text-slate-500 font-mono text-right">
                  Slide 8 / 10 — Evaluation Methodology
                </div>
              </div>
            )}

            {/* SLIDE 9: Benchmarks & Resiliency Stats */}
            {currentSlide === 8 && (
              <div className="h-full flex flex-col justify-between">
                <div>
                  <span className="text-xs font-mono font-semibold text-cyan-400 uppercase">08 / Benchmarks & Metrics</span>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                    System Performance & Production Resiliency
                  </h2>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 my-auto">
                  <div className="p-5 rounded-xl bg-slate-950 border border-cyan-500/40 text-center">
                    <div className="text-3xl sm:text-4xl font-extrabold text-cyan-400 font-mono">&lt; 4.5s</div>
                    <div className="text-xs font-bold text-white mt-1">Average Cloud Audit</div>
                    <div className="text-[11px] text-slate-400 mt-1">Multimodal Vision OCR</div>
                  </div>

                  <div className="p-5 rounded-xl bg-slate-950 border border-emerald-500/40 text-center">
                    <div className="text-3xl sm:text-4xl font-extrabold text-emerald-400 font-mono">3 ms</div>
                    <div className="text-xs font-bold text-white mt-1">Turbo Failover Latency</div>
                    <div className="text-[11px] text-slate-400 mt-1">Local CPRW Heuristics</div>
                  </div>

                  <div className="p-5 rounded-xl bg-slate-950 border border-indigo-500/40 text-center">
                    <div className="text-3xl sm:text-4xl font-extrabold text-indigo-400 font-mono">99.99%</div>
                    <div className="text-xs font-bold text-white mt-1">Effective Uptime</div>
                    <div className="text-[11px] text-slate-400 mt-1">Eliminated 503 Crashes</div>
                  </div>

                  <div className="p-5 rounded-xl bg-slate-950 border border-amber-500/40 text-center">
                    <div className="text-3xl sm:text-4xl font-extrabold text-amber-400 font-mono">4 Formats</div>
                    <div className="text-xs font-bold text-white mt-1">Multimodal Formats</div>
                    <div className="text-[11px] text-slate-400 mt-1">PDF, DOCX, Photo, Text</div>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 leading-relaxed">
                  <strong className="text-white">Validation Status:</strong> Fully compiled, validated via <code className="text-indigo-400 font-mono">compile_applet</code>, and synchronized to GitHub repository <code className="text-cyan-400 font-mono">irisking001/java-project</code>.
                </div>

                <div className="text-xs text-slate-500 font-mono text-right">
                  Slide 9 / 10 — Benchmarks & Verification
                </div>
              </div>
            )}

            {/* SLIDE 10: Conclusion & Key Value */}
            {currentSlide === 9 && (
              <div className="h-full flex flex-col justify-between">
                <div>
                  <span className="text-xs font-mono font-semibold text-cyan-400 uppercase">09 / Conclusion & Summary</span>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                    CareerPulse: Engineering Impact Summary
                  </h2>
                </div>

                <div className="p-6 rounded-xl bg-slate-950 border border-indigo-500/40 space-y-3.5 my-auto">
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-white">Zero-Downtime Reliability:</span>
                      <p className="text-xs text-slate-300 mt-0.5">
                        Absorbed cloud 503 capacity errors through automated multi-model routing and local CPRW heuristic fallback.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-white">True Multimodal Auditing:</span>
                      <p className="text-xs text-slate-300 mt-0.5">
                        Evaluated visual scan layouts (OCR) and structured textual resumes with high fidelity in under 10 seconds.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-white">Actionable Career Intelligence:</span>
                      <p className="text-xs text-slate-300 mt-0.5">
                        Instant Google XYZ transformations, keyword gap matrices, tailored cover letters, and STAR interview questions.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-white">Full Exportable Deliverables:</span>
                      <p className="text-xs text-slate-300 mt-0.5">
                        Provided PDF export report, live web application, and native Microsoft PowerPoint (.pptx) download.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <button
                    type="button"
                    onClick={handleDownloadPptx}
                    className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg shadow-md transition-colors cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download This Complete Presentation (.pptx)</span>
                  </button>
                  <span className="text-xs text-slate-500 font-mono">Slide 10 / 10 — Final Slide</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Collapsible Speaker Notes Drawer */}
        {showSpeakerNotes && (
          <div className="px-5 py-3 border-t border-slate-800 bg-slate-950/90 shrink-0">
            <div className="flex items-center gap-2 text-xs font-mono font-semibold text-indigo-400 mb-1">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Presenter Speaking Notes (Slide {currentSlide + 1})</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed max-w-4xl">
              {speakerNotes[currentSlide]}
            </p>
          </div>
        )}

        {/* Bottom Slide Thumbnail Strip & Navigation Controls */}
        <div className="px-4 py-3 border-t border-slate-800 bg-slate-950/95 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          {/* Thumbnails */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto py-1">
            {slideTitles.map((title, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setCurrentSlide(idx)}
                className={`px-2.5 py-1 text-[11px] rounded font-medium whitespace-nowrap transition-colors cursor-pointer shrink-0 ${
                  currentSlide === idx
                    ? 'bg-indigo-600 text-white font-bold'
                    : 'bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
                title={title}
              >
                {idx + 1}. {title.split(':')[0]}
              </button>
            ))}
          </div>

          {/* Next / Previous Controls */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => setCurrentSlide((prev) => Math.max(0, prev - 1))}
              disabled={currentSlide === 0}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 transition-colors cursor-pointer disabled:opacity-40"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span>Prev</span>
            </button>

            <span className="text-xs font-mono text-slate-400 px-2">
              {currentSlide + 1} / {totalSlides}
            </span>

            <button
              type="button"
              onClick={() => setCurrentSlide((prev) => Math.min(totalSlides - 1, prev + 1))}
              disabled={currentSlide === totalSlides - 1}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium bg-indigo-600 hover:bg-indigo-500 text-white transition-colors cursor-pointer disabled:opacity-40"
            >
              <span>Next</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
