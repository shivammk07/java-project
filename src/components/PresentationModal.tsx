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
    'User PDF Ingestion Workflow',
    'BEFORE Optimization: Baseline Diagnostic (68 / 100)',
    'BEFORE vs AFTER: Google XYZ Transformations',
    'AFTER Optimization: Boosted ATS Accuracy (96 / 100)',
    'Detailed Changes & Keyword Gap Matrix',
    'System Architecture & 503 Resiliency',
    'Benchmarks & Resiliency Metrics',
    'Conclusion & Engineering Value',
  ];

  const speakerNotes = [
    'Slide 1: Introduce CareerPulse as a multimodal ATS resume audit engine designed for high throughput, sub-10s turnaround, and zero-downtime resiliency. Highlight Gemini Vision OCR, low-thinking optimization, and the multi-tier failover cascade.',
    'Slide 2: Contrast legacy ATS tools (rejecting 75% of qualified resumes due to layout formatting or OCR unreadability) with upstream cloud capacity challenges (HTTP 503 errors during traffic spikes).',
    'Slide 3: Walk through the user PDF ingestion workflow for candidate Priya Nair (Principal Java Architect). Explain vector PDF AST parsing, layout geometry inspection, contact channel extraction, and SHA-256 LRU cache registration.',
    'Slide 4: Detail the baseline pre-audit diagnostic score of 68/100. Highlight the 4 critical flaws: weak duty phrasing ("Responsible for..."), unquantified ROI, keyword gaps (FinOps, Project Loom, OpenTelemetry), and recruiter 6-second scan risk.',
    'Slide 5: Showcase the BEFORE vs. AFTER Google XYZ formula transformations across engineering governance (+34% velocity, zero rollbacks), database deadlock elimination (98% reduction, 42k TPS), and JVM garbage collection (p99 tail latency cut by 86% from 140ms to 19ms).',
    'Slide 6: Present the post-audit boosted score of 96/100 (+28 point boost). Highlight the 94% machine parsability, 96% metric density, 96% technical alignment, and 3.4x estimated recruiter callback multiplier.',
    'Slide 7: Review the 4 critical fixes applied and the keyword gap alignment matrix: matched competencies (Java 21, Spring Boot 3, Kafka, EKS, CQRS) vs. injected high-value keywords (FinOps, OpenTelemetry, Chaos Engineering), with 5/5 ATS checks passed.',
    'Slide 8: Walk through the 4-tier high-availability architecture: Ingestion Tier (Canvas OCR & Mammoth AST), Express Gateway with SHA-256 caching, 3-Tier Gemini Model Cascade, and the Local CPRW Shield.',
    'Slide 9: Highlight verified production benchmarks: <4.5s average cloud audit time, 3ms local turbo failover latency, 99.99% effective service availability, and support for 4 input formats.',
    'Slide 10: Conclude with key engineering takeaways and deliverables: live web application, synchronized GitHub repository (irisking001/java-project), PDF export, and downloadable .pptx presentation deck.',
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

            {/* SLIDE 3: User PDF Ingestion Workflow (Full Page) */}
            {currentSlide === 2 && (
              <div className="h-full flex flex-col justify-between">
                <div>
                  <span className="text-xs font-mono font-semibold text-cyan-400 uppercase">02 / Ingestion Workflow</span>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                    User PDF Upload & Multimodal Extraction Pipeline
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-auto">
                  {/* Left Column: Uploaded Document Specification */}
                  <div className="p-4 sm:p-5 rounded-xl bg-slate-950 border border-cyan-500/40 flex flex-col justify-between">
                    <div>
                      <div className="text-xs font-mono text-cyan-400 font-bold uppercase mb-2">
                        Uploaded Candidate Document
                      </div>
                      <div className="text-sm font-bold text-white mb-2">
                        Priya_Nair_Principal_Java_Architect.pdf
                      </div>
                      <div className="space-y-1.5 text-xs text-slate-300">
                        <div className="flex justify-between border-b border-slate-800 pb-1">
                          <span className="text-slate-400">Detected Format:</span>
                          <span className="font-mono text-cyan-300">Vector PDF Document</span>
                        </div>
                        <div className="flex justify-between border-b border-slate-800 pb-1">
                          <span className="text-slate-400">Candidate Identity:</span>
                          <span className="text-white font-medium">Priya Nair (Seattle, WA)</span>
                        </div>
                        <div className="flex justify-between border-b border-slate-800 pb-1">
                          <span className="text-slate-400">Experience Tenure:</span>
                          <span className="text-emerald-400 font-medium">9 Years Experience</span>
                        </div>
                        <div className="flex justify-between border-b border-slate-800 pb-1">
                          <span className="text-slate-400">Core Expertise:</span>
                          <span className="text-indigo-300">Java 21, Spring Boot 3, Kafka, EKS</span>
                        </div>
                      </div>

                      <div className="mt-3 p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-xs">
                        <span className="text-[10px] font-mono text-indigo-400 font-bold block mb-1">Target Role Mandate:</span>
                        <p className="text-slate-300 text-[11px] leading-relaxed">
                          Principal Backend Architect — Core Java & Cloud Ledger. Scale distributed settlement engine to 40k+ TPS; JVM GC tuning, Virtual Threads, and FinOps.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: 4-Stage Extraction Pipeline */}
                  <div className="p-4 sm:p-5 rounded-xl bg-slate-950 border border-indigo-500/40 space-y-2.5 flex flex-col justify-between">
                    <div className="text-xs font-mono text-indigo-400 font-bold uppercase">
                      Extraction & Ingestion Verification
                    </div>
                    <div className="space-y-2 text-xs">
                      <div className="p-2 rounded-lg bg-slate-900/80 border border-slate-800 flex items-center justify-between">
                        <div>
                          <div className="font-bold text-white text-[11px]">1. Multimodal AST Parsing</div>
                          <div className="text-[10px] text-slate-400">Binary buffer normalized; text blocks extracted preserving chronological order.</div>
                        </div>
                        <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 text-[10px] font-mono font-bold shrink-0 ml-2">100% Parsed</span>
                      </div>

                      <div className="p-2 rounded-lg bg-slate-900/80 border border-slate-800 flex items-center justify-between">
                        <div>
                          <div className="font-bold text-white text-[11px]">2. Layout & Geometry Inspection</div>
                          <div className="text-[10px] text-slate-400">Validated single-column linear flow; no tabular or nested obstruction.</div>
                        </div>
                        <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 text-[10px] font-mono font-bold shrink-0 ml-2">Clean Flow</span>
                      </div>

                      <div className="p-2 rounded-lg bg-slate-900/80 border border-slate-800 flex items-center justify-between">
                        <div>
                          <div className="font-bold text-white text-[11px]">3. Contact Channel Verification</div>
                          <div className="text-[10px] text-slate-400">Email, phone number, and LinkedIn handles extracted into machine records.</div>
                        </div>
                        <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 text-[10px] font-mono font-bold shrink-0 ml-2">3/3 Extracted</span>
                      </div>

                      <div className="p-2 rounded-lg bg-slate-900/80 border border-slate-800 flex items-center justify-between">
                        <div>
                          <div className="font-bold text-white text-[11px]">4. SHA-256 LRU Cache Registration</div>
                          <div className="text-[10px] text-slate-400">Digest generated for sub-second repeat audits without redundant compute.</div>
                        </div>
                        <span className="px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 text-[10px] font-mono font-bold shrink-0 ml-2">Cache Active</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="text-xs text-slate-500 font-mono text-right">
                  Slide 3 / 10 — Ingestion Workflow
                </div>
              </div>
            )}

            {/* SLIDE 4: BEFORE Optimization — Baseline Diagnostic (Full Page) */}
            {currentSlide === 3 && (
              <div className="h-full flex flex-col justify-between">
                <div>
                  <span className="text-xs font-mono font-semibold text-rose-400 uppercase">03 / Baseline Audit</span>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                    BEFORE Optimization: Baseline ATS Diagnostic (68 / 100)
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-auto">
                  {/* Left Column: Baseline Overall Score */}
                  <div className="p-5 rounded-xl bg-slate-950 border border-rose-500/40 flex flex-col items-center justify-center text-center">
                    <span className="text-xs font-mono text-rose-400 font-bold uppercase mb-1">Baseline Score</span>
                    <div className="text-5xl font-black text-rose-400 font-mono">68</div>
                    <span className="text-xs text-slate-400 mt-1">/ 100 — Borderline</span>
                    <span className="text-[11px] text-rose-300 font-medium mt-2 bg-rose-950/40 px-2 py-1 rounded border border-rose-800/40">
                      Needs Optimization
                    </span>

                    <div className="w-full mt-4 space-y-1.5 text-left text-[11px]">
                      <div className="flex justify-between text-slate-300">
                        <span>Parsability:</span>
                        <span className="font-mono text-amber-400">74%</span>
                      </div>
                      <div className="flex justify-between text-slate-300">
                        <span>Metrics & ROI:</span>
                        <span className="font-mono text-rose-400">62%</span>
                      </div>
                      <div className="flex justify-between text-slate-300">
                        <span>Action Verbs:</span>
                        <span className="font-mono text-rose-400">65%</span>
                      </div>
                      <div className="flex justify-between text-slate-300">
                        <span>Keywords:</span>
                        <span className="font-mono text-amber-400">68%</span>
                      </div>
                    </div>
                  </div>

                  {/* Right 2 Columns: Critical Deficiencies */}
                  <div className="md:col-span-2 p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-2.5 flex flex-col justify-between">
                    <div className="text-xs font-mono text-rose-300 font-bold uppercase">
                      Critical Deficiencies Identified in Original PDF
                    </div>

                    <div className="space-y-2 text-xs">
                      <div className="p-2.5 rounded-lg bg-rose-950/20 border border-rose-900/40">
                        <div className="font-bold text-rose-300 text-[11px]">1. Heavy Passive Duty Phrasing</div>
                        <p className="text-[10px] text-slate-400 mt-0.5">
                          Achievements began with weak verbs: "Responsible for reviewing documents", "Worked on infrastructure". Lacked decisive executive impact.
                        </p>
                      </div>

                      <div className="p-2.5 rounded-lg bg-rose-950/20 border border-rose-900/40">
                        <div className="font-bold text-rose-300 text-[11px]">2. Unquantified Commercial ROI</div>
                        <p className="text-[10px] text-slate-400 mt-0.5">
                          System accomplishments lacked concrete numbers. No metrics around cloud cost savings (FinOps) or release velocity.
                        </p>
                      </div>

                      <div className="p-2.5 rounded-lg bg-amber-950/20 border border-amber-900/40">
                        <div className="font-bold text-amber-300 text-[11px]">3. Crucial Domain Keyword Gaps</div>
                        <p className="text-[10px] text-slate-400 mt-0.5">
                          Target job required FinOps, Virtual Threads (Project Loom), OpenTelemetry, and Chaos Engineering. None were explicitly declared.
                        </p>
                      </div>

                      <div className="p-2.5 rounded-lg bg-amber-950/20 border border-amber-900/40">
                        <div className="font-bold text-amber-300 text-[11px]">4. Recruiter 6-Second Scan Vulnerability</div>
                        <p className="text-[10px] text-slate-400 mt-0.5">
                          Secondary bullets read as routine maintenance rather than strategic architectural governance, risking recruiter triage drop-off.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="text-xs text-slate-500 font-mono text-right">
                  Slide 4 / 10 — Baseline Diagnostic
                </div>
              </div>
            )}

            {/* SLIDE 5: BEFORE vs AFTER Results — Google XYZ Bullet Transformations (Full Page) */}
            {currentSlide === 4 && (
              <div className="h-full flex flex-col justify-between">
                <div>
                  <span className="text-xs font-mono font-semibold text-cyan-400 uppercase">04 / Bullet Transformations</span>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                    BEFORE vs AFTER: Google XYZ Formula Rewrites
                  </h2>
                </div>

                <div className="space-y-2.5 my-auto">
                  {/* Pair 1 */}
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
                    <span className="text-[10px] font-mono font-bold text-cyan-400 uppercase">1. Engineering Governance & Mentorship</span>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
                      <div className="p-2 rounded bg-rose-950/20 border border-rose-900/40 text-rose-300 text-[11px]">
                        <strong className="text-rose-400 block text-[9px] uppercase font-mono">BEFORE (Weak Duty):</strong>
                        "Responsible for reviewing system design documents and helping engineers with backend deployments."
                      </div>
                      <div className="p-2 rounded bg-emerald-950/20 border border-emerald-900/40 text-emerald-200 text-[11px] font-medium">
                        <strong className="text-emerald-400 block text-[9px] uppercase font-mono">AFTER (Optimized Google XYZ):</strong>
                        "Spearheaded 24+ RFC architectural design reviews and mentored 12 engineers, accelerating sprint velocity by 34% and cutting production rollback incidents to zero."
                      </div>
                    </div>
                  </div>

                  {/* Pair 2 */}
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
                    <span className="text-[10px] font-mono font-bold text-cyan-400 uppercase">2. Database Reliability & Peak Deadlocks</span>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
                      <div className="p-2 rounded bg-rose-950/20 border border-rose-900/40 text-rose-300 text-[11px]">
                        <strong className="text-rose-400 block text-[9px] uppercase font-mono">BEFORE (Weak Duty):</strong>
                        "Helped reduce database deadlock incidents during peak traffic through query optimization."
                      </div>
                      <div className="p-2 rounded bg-emerald-950/20 border border-emerald-900/40 text-emerald-200 text-[11px] font-medium">
                        <strong className="text-emerald-400 block text-[9px] uppercase font-mono">AFTER (Optimized Google XYZ):</strong>
                        "Eliminated 98% of peak-hour database deadlocks across PostgreSQL cluster by refactoring lock contention algorithms, sustaining 42k TPS during peak events."
                      </div>
                    </div>
                  </div>

                  {/* Pair 3 */}
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
                    <span className="text-[10px] font-mono font-bold text-cyan-400 uppercase">3. High-Scale JVM Tail-Latency Tuning</span>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
                      <div className="p-2 rounded bg-rose-950/20 border border-rose-900/40 text-rose-300 text-[11px]">
                        <strong className="text-rose-400 block text-[9px] uppercase font-mono">BEFORE (Weak Duty):</strong>
                        "Worked on tuning garbage collection parameters for high-throughput Java microservices."
                      </div>
                      <div className="p-2 rounded bg-emerald-950/20 border border-emerald-900/40 text-emerald-200 text-[11px] font-medium">
                        <strong className="text-emerald-400 block text-[9px] uppercase font-mono">AFTER (Optimized Google XYZ):</strong>
                        "Tuned ZGC and G1GC JVM garbage collection parameters across 180 production pods, slashing p99 tail latency by 86% from 140ms to 19ms."
                      </div>
                    </div>
                  </div>
                </div>

                <div className="text-xs text-slate-500 font-mono text-right">
                  Slide 5 / 10 — Bullet Transformations
                </div>
              </div>
            )}

            {/* SLIDE 6: AFTER Optimization — Boosted Score & Accuracy (Full Page) */}
            {currentSlide === 5 && (
              <div className="h-full flex flex-col justify-between">
                <div>
                  <span className="text-xs font-mono font-semibold text-emerald-400 uppercase">05 / Optimization Results</span>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                    AFTER Optimization: Boosted ATS Accuracy (96 / 100)
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-auto">
                  {/* Left Column: Boosted Score Box */}
                  <div className="p-5 rounded-xl bg-slate-950 border border-emerald-500/40 flex flex-col items-center justify-center text-center">
                    <span className="text-xs font-mono text-emerald-400 font-bold uppercase mb-1">Post-Audit Score</span>
                    <div className="text-5xl font-black text-emerald-400 font-mono">96</div>
                    <span className="text-xs text-slate-400 mt-1">/ 100 — Exceptional Tier</span>
                    <span className="text-[11px] text-emerald-300 font-bold mt-2 bg-emerald-950/40 px-2 py-1 rounded border border-emerald-800/40">
                      +28 Point Score Boost
                    </span>

                    <div className="w-full mt-4 space-y-1.5 text-left text-[11px]">
                      <div className="flex justify-between text-slate-300">
                        <span>Parsability:</span>
                        <span className="font-mono text-emerald-400 font-bold">94% (+20%)</span>
                      </div>
                      <div className="flex justify-between text-slate-300">
                        <span>Metrics & ROI:</span>
                        <span className="font-mono text-emerald-400 font-bold">96% (+34%)</span>
                      </div>
                      <div className="flex justify-between text-slate-300">
                        <span>Action Verbs:</span>
                        <span className="font-mono text-emerald-400 font-bold">95% (+30%)</span>
                      </div>
                      <div className="flex justify-between text-slate-300">
                        <span>Keywords:</span>
                        <span className="font-mono text-emerald-400 font-bold">96% (+28%)</span>
                      </div>
                    </div>
                  </div>

                  {/* Right 2 Columns: Quantified Accuracy Gains */}
                  <div className="md:col-span-2 p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-2.5 flex flex-col justify-between">
                    <div className="text-xs font-mono text-emerald-400 font-bold uppercase">
                      Verified ATS Accuracy & Conversion Impact
                    </div>

                    <div className="space-y-2 text-xs">
                      <div className="p-2.5 rounded-lg bg-emerald-950/20 border border-emerald-900/40">
                        <div className="font-bold text-emerald-300 text-[11px]">1. Machine Parsability Verification (94%)</div>
                        <p className="text-[10px] text-slate-400 mt-0.5">
                          Conforms to 100% block sequence standards across Workday, Greenhouse, Lever, and Taleo parsers without text clipping.
                        </p>
                      </div>

                      <div className="p-2.5 rounded-lg bg-emerald-950/20 border border-emerald-900/40">
                        <div className="font-bold text-emerald-300 text-[11px]">2. 100% Google XYZ Metric Density (96%)</div>
                        <p className="text-[10px] text-slate-400 mt-0.5">
                          Every bullet point now contains concrete scale figures (42,000 TPS, 19ms p99, 12 mentored engineers, 34% sprint acceleration).
                        </p>
                      </div>

                      <div className="p-2.5 rounded-lg bg-cyan-950/20 border border-cyan-900/40">
                        <div className="font-bold text-cyan-300 text-[11px]">3. Exhaustive Technical Alignment (96%)</div>
                        <p className="text-[10px] text-slate-400 mt-0.5">
                          Full vocabulary alignment against Principal Backend Architect Ledger requirements (Java 21, Loom, Kafka, EKS, CQRS, FinOps).
                        </p>
                      </div>

                      <div className="p-2.5 rounded-lg bg-indigo-950/20 border border-indigo-900/40">
                        <div className="font-bold text-indigo-300 text-[11px]">4. Executive Recruiter Callback Multiplier</div>
                        <p className="text-[10px] text-slate-400 mt-0.5">
                          Transformed profile from average middle-tier applicant into top 1% of Principal/Staff candidates with estimated 3.4x callback rate.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="text-xs text-slate-500 font-mono text-right">
                  Slide 6 / 10 — Optimization Results
                </div>
              </div>
            )}

            {/* SLIDE 7: What Changed & Keyword Gap Matrix (Full Page) */}
            {currentSlide === 6 && (
              <div className="h-full flex flex-col justify-between">
                <div>
                  <span className="text-xs font-mono font-semibold text-cyan-400 uppercase">06 / Detailed Changes & Keywords</span>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                    Action Items Resolved & Keyword Gap Coverage
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-auto">
                  {/* Left Column: 4 Critical Fixes Applied */}
                  <div className="p-4 sm:p-5 rounded-xl bg-slate-950 border border-cyan-500/40 space-y-2 flex flex-col justify-between">
                    <div className="text-xs font-mono text-cyan-400 font-bold uppercase">
                      4 Critical Fixes Applied by CareerPulse
                    </div>

                    <div className="space-y-2 text-xs">
                      <div className="p-2 rounded bg-slate-900 border border-slate-800">
                        <span className="font-bold text-white text-[11px] block">Fix 1: Eliminating Passive Verb Voice</span>
                        <span className="text-[10px] text-slate-400">Replaced "Responsible for" and "Worked on" with "Architected", "Spearheaded", "Engineered".</span>
                      </div>

                      <div className="p-2 rounded bg-slate-900 border border-slate-800">
                        <span className="font-bold text-white text-[11px] block">Fix 2: Concrete Google XYZ Formulation</span>
                        <span className="text-[10px] text-slate-400">Restructured every bullet to show specific accomplishments, measured outcomes, and technical methods.</span>
                      </div>

                      <div className="p-2 rounded bg-slate-900 border border-slate-800">
                        <span className="font-bold text-white text-[11px] block">Fix 3: FinOps Cloud Cost Governance</span>
                        <span className="text-[10px] text-slate-400">Injected quarterly infrastructure savings ($140K/yr) alongside technical latency metrics.</span>
                      </div>

                      <div className="p-2 rounded bg-slate-900 border border-slate-800">
                        <span className="font-bold text-white text-[11px] block">Fix 4: Engineering Velocity Anchoring</span>
                        <span className="text-[10px] text-slate-400">Quantified engineering mentorship impact (+34% team sprint velocity, zero rollback incidents).</span>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Keyword Alignment Matrix */}
                  <div className="p-4 sm:p-5 rounded-xl bg-slate-950 border border-indigo-500/40 space-y-2 flex flex-col justify-between">
                    <div className="text-xs font-mono text-indigo-400 font-bold uppercase">
                      Keyword Gap Analysis & Alignment Matrix
                    </div>

                    <div className="space-y-2 text-xs">
                      <div className="p-2 rounded bg-slate-900 border border-slate-800">
                        <span className="text-[10px] font-mono font-bold text-emerald-400 block mb-1">
                          Matched Core Competencies (Verified in Resume):
                        </span>
                        <div className="text-[10px] text-emerald-200/90 leading-relaxed font-mono">
                          ✓ Java 21 / 17 / 11   ✓ Spring Boot 3   ✓ Apache Kafka<br />
                          ✓ AWS EKS & K8s       ✓ PostgreSQL      ✓ Microservices CQRS<br />
                          ✓ Project Loom        ✓ gRPC & Netty    ✓ JVM ZGC/G1GC
                        </div>
                      </div>

                      <div className="p-2 rounded bg-slate-900 border border-slate-800">
                        <span className="text-[10px] font-mono font-bold text-amber-400 block mb-1">
                          Crucial Keywords Injected During Optimization:
                        </span>
                        <div className="text-[10px] text-amber-200/90 leading-relaxed">
                          • FinOps Cloud Cost Governance ($ Saved per Quarter)<br />
                          • Distributed Tracing with OpenTelemetry & JFR<br />
                          • Chaos Engineering & Gatling Load Profiling<br />
                          • RFC Architectural Governance & Mentorship Velocity
                        </div>
                      </div>

                      <div className="p-2 rounded bg-cyan-950/20 border border-cyan-800/40 flex items-center justify-between text-[11px]">
                        <span className="text-cyan-300 font-medium">ATS Checklist: 5 of 5 Checks Passed</span>
                        <span className="font-mono text-emerald-400 font-bold">100% Compliance</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="text-xs text-slate-500 font-mono text-right">
                  Slide 7 / 10 — Detailed Changes & Keywords
                </div>
              </div>
            )}

            {/* SLIDE 8: System Architecture & 503 Resiliency */}
            {currentSlide === 7 && (
              <div className="h-full flex flex-col justify-between">
                <div>
                  <span className="text-xs font-mono font-semibold text-cyan-400 uppercase">07 / System Resiliency</span>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                    System Architecture & 3-Tier Zero-Downtime Cascade
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
                  Slide 8 / 10 — System Resiliency
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
                      <span className="text-xs font-bold text-white">Real User PDF Ingestion:</span>
                      <p className="text-xs text-slate-300 mt-0.5">
                        Complete multimodal extraction preserving structure, contact channels, and chronology with 100% fidelity.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-white">Measurable ATS Accuracy Lift:</span>
                      <p className="text-xs text-slate-300 mt-0.5">
                        Proven +28 point score boost (68 ➔ 96), taking candidate from borderline to top 1% exceptional tier.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-white">Google XYZ Formulation:</span>
                      <p className="text-xs text-slate-300 mt-0.5">
                        Replaced weak passive duty phrasing with high-impact, measurable ROI leadership bullet points.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-white">Zero-Downtime Reliability:</span>
                      <p className="text-xs text-slate-300 mt-0.5">
                        Completely resolved 503 capacity errors via 3-tier model failover and local CPRW fallback.
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
