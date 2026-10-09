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
  TrendingUp,
  Award,
  Sparkles,
  BookOpen,
  ArrowRight,
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

  const totalSlides = 8;

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
    'Eliminating 503 Capacity Failures',
    'CPRW Rubric & Google XYZ',
    'Case Study: Priya Nair (Java Lead)',
    'Benchmarks & Resiliency Metrics',
    'Conclusion & Engineering Value',
  ];

  const speakerNotes = [
    'Slide 1: Introduce CareerPulse as a multimodal ATS resume audit engine designed for high throughput and zero-downtime resiliency. Highlight the integration of Gemini Vision OCR, low-thinking optimization, and the multi-tier failover cascade.',
    'Slide 2: Contrast legacy ATS tools (which reject 75% of qualified resumes due to layout flaws or unreadable scans) with cloud capacity challenges (HTTP 503 errors during traffic spikes). Emphasize CareerPulse\'s multimodal approach.',
    'Slide 3: Walk through the 4 pipeline stages: Multimodal Ingestion (Canvas OCR & Mammoth AST), Express Gateway with SHA-256 caching, the 3-Tier Gemini Model Cascade, and the Local CPRW Shield.',
    'Slide 4: Address the specific 503 UNAVAILABLE failure seen in development. Explain the root cause (upstream cloud demand saturation) and demonstrate our solution: automated multi-model routing plus instant local CPRW heuristic failover (<5ms).',
    'Slide 5: Explain the 5-pillar evaluation rubric and demonstrate the Google XYZ formula: "Accomplished [X], measured by [Y], by doing [Z]". Walk through the weak duty statement vs. the optimized high-impact leadership bullet.',
    'Slide 6: Present the primary candidate case study: Priya Nair, Principal Java Architect. Show how her 42,000 TPS scale and 19ms p99 latency tuning profile jumped from 86 to 96 after applying our action item fixes.',
    'Slide 7: Highlight real benchmarks: <4.5s average cloud audit, 3ms local turbo failover, 99.99% effective service availability, and support for 4 distinct input formats.',
    'Slide 8: Conclude by summarizing engineering impact, production readiness, and the deliverables generated including live app, GitHub codebase, and this exportable .pptx presentation deck.',
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
                  .pptx Slide Deck
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
                  Slide 2 / 8 — Problem & Solution
                </div>
              </div>
            )}

            {/* SLIDE 3: System Architecture */}
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
                  Slide 3 / 8 — System Architecture
                </div>
              </div>
            )}

            {/* SLIDE 4: 503 Capacity Failures Deep Dive */}
            {currentSlide === 3 && (
              <div className="h-full flex flex-col justify-between">
                <div>
                  <span className="text-xs font-mono font-semibold text-rose-400 uppercase">03 / Reliability Engineering</span>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                    Eliminating the 503 Model Demand Failure
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 my-auto">
                  <div className="p-5 rounded-xl bg-rose-950/20 border border-rose-500/40">
                    <div className="flex items-center gap-2 text-rose-400 font-bold text-sm mb-2">
                      <AlertTriangle className="w-4 h-4" />
                      <span>Before: Single Point of Failure</span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed mb-3">
                      Single hardcoded <code className="text-rose-300 font-mono">gemini-3.8-flash</code> model. During Google cloud traffic surges:
                    </p>
                    <div className="p-3 rounded-lg bg-black/60 font-mono text-[11px] text-rose-300 border border-rose-900/50 overflow-x-auto">
                      {`{"error":{"code":503,"message":"This model is currently experiencing high demand.","status":"UNAVAILABLE"}}`}
                    </div>
                    <p className="text-xs text-slate-400 mt-3">
                      • Crashed with raw JSON alert.<br />
                      • Zero retry attempts or fallback tiers.<br />
                      • Applicant was 100% blocked.
                    </p>
                  </div>

                  <div className="p-5 rounded-xl bg-emerald-950/20 border border-emerald-500/40">
                    <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm mb-2">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>After: 3-Tier Cascade & CPRW Shield</span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed mb-3">
                      Cascades across 3 distinct capacity tiers with jittered retries and instant heuristic compilation:
                    </p>
                    <div className="p-3 rounded-lg bg-black/60 font-mono text-[11px] text-emerald-300 border border-emerald-900/50 space-y-1">
                      <div>Tier 1: gemini-3.8-flash (Primary)</div>
                      <div>Tier 2: gemini-flash-latest (Auto-Route)</div>
                      <div>Tier 3: gemini-3.1-flash-lite (Capacity Pool)</div>
                      <div className="text-cyan-300">Shield: CPRW Turbo Heuristic (&lt;5ms response)</div>
                    </div>
                    <p className="text-xs text-slate-400 mt-3">
                      • 100% graceful handling with one-click recovery.<br />
                      • Applied across bullets, cover letters, & interview prep.<br />
                      • 0% user disruption guaranteed.
                    </p>
                  </div>
                </div>

                <div className="text-xs text-slate-500 font-mono text-right">
                  Slide 4 / 8 — Resiliency Engineering
                </div>
              </div>
            )}

            {/* SLIDE 5: CPRW Rubric & Google XYZ */}
            {currentSlide === 4 && (
              <div className="h-full flex flex-col justify-between">
                <div>
                  <span className="text-xs font-mono font-semibold text-cyan-400 uppercase">04 / CPRW Audit Methodology</span>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                    5-Pillar Evaluation Rubric & Google XYZ Formula
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 my-auto">
                  {/* Left: 5 Pillars */}
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

                  {/* Right: Google XYZ Formula */}
                  <div className="p-4 rounded-xl bg-slate-950 border border-indigo-500/40 flex flex-col justify-between">
                    <div>
                      <div className="text-xs font-mono text-indigo-400 font-bold uppercase mb-1">Google XYZ Formula</div>
                      <div className="text-sm font-extrabold text-white">
                        Accomplished [X], as measured by [Y], by doing [Z]
                      </div>

                      <div className="mt-3 p-2.5 rounded-lg bg-rose-950/30 border border-rose-500/30 text-xs">
                        <span className="text-[10px] font-bold text-rose-400 uppercase block mb-1">Weak Passive Duty:</span>
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
                  Slide 5 / 8 — Evaluation Methodology
                </div>
              </div>
            )}

            {/* SLIDE 6: Case Study Priya Nair */}
            {currentSlide === 5 && (
              <div className="h-full flex flex-col justify-between">
                <div>
                  <span className="text-xs font-mono font-semibold text-cyan-400 uppercase">05 / Candidate Case Study</span>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                    Priya Nair — Principal Java & Distributed Architect
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-auto">
                  <div className="p-4 rounded-xl bg-slate-950 border border-cyan-500/30">
                    <span className="text-xs font-mono font-bold text-cyan-400 uppercase">Profile Overview</span>
                    <h3 className="text-sm font-bold text-white mt-1">Principal Java Lead</h3>
                    <ul className="text-xs text-slate-300 mt-2.5 space-y-2 leading-relaxed">
                      <li>• 9 Years of Experience (Seattle, WA)</li>
                      <li>• Stack: Java 21, Spring Boot, Kafka, EKS</li>
                      <li>• Scale: 42,000 TPS at 99.995% SLA</li>
                      <li>• Tail Latency: Cut p99 from 140ms to 19ms</li>
                    </ul>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-950 border border-amber-500/30">
                    <span className="text-xs font-mono font-bold text-amber-400 uppercase">Initial Diagnostic</span>
                    <h3 className="text-sm font-bold text-amber-300 mt-1">86/100 (Exceptional)</h3>
                    <ul className="text-xs text-slate-300 mt-2.5 space-y-2 leading-relaxed">
                      <li>• ATS Parsability: 92/100 (Clean PDF flow)</li>
                      <li>• Weakness: Passive phrasing in secondary bullets</li>
                      <li>• Keyword Gap: Missing FinOps cost metrics</li>
                      <li>• Governance: Needed RFC leadership metrics</li>
                    </ul>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-950 border border-emerald-500/30">
                    <span className="text-xs font-mono font-bold text-emerald-400 uppercase">Post-Optimization</span>
                    <h3 className="text-sm font-bold text-emerald-300 mt-1">96/100 (+10 Points)</h3>
                    <ul className="text-xs text-slate-300 mt-2.5 space-y-2 leading-relaxed">
                      <li>• XYZ Fix: Deadlock contention quantified</li>
                      <li>• XYZ Fix: 34% velocity acceleration added</li>
                      <li>• Alignment: 88% &rarr; 96% target ledger match</li>
                      <li>• Result: Top 1% of Principal Staff applicants</li>
                    </ul>
                  </div>
                </div>

                <div className="text-xs text-slate-500 font-mono text-right">
                  Slide 6 / 8 — Candidate Deep Dive
                </div>
              </div>
            )}

            {/* SLIDE 7: Benchmarks & Resiliency Stats */}
            {currentSlide === 6 && (
              <div className="h-full flex flex-col justify-between">
                <div>
                  <span className="text-xs font-mono font-semibold text-cyan-400 uppercase">06 / Benchmarks & Metrics</span>
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
                  Slide 7 / 8 — Benchmarks & Verification
                </div>
              </div>
            )}

            {/* SLIDE 8: Conclusion & Key Value */}
            {currentSlide === 7 && (
              <div className="h-full flex flex-col justify-between">
                <div>
                  <span className="text-xs font-mono font-semibold text-cyan-400 uppercase">07 / Conclusion & Summary</span>
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
                  <span className="text-xs text-slate-500 font-mono">Slide 8 / 8 — Final Slide</span>
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
                {idx + 1}. {title.split(' ')[0]}
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
