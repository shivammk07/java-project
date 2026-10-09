/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { ResumeUploader } from './components/ResumeUploader';
import { ScoreGauge } from './components/ScoreGauge';
import { BulletTransformer } from './components/BulletTransformer';
import { KeywordGapViewer } from './components/KeywordGapViewer';
import { CriticalFixesList } from './components/CriticalFixesList';
import { SectionAudit } from './components/SectionAudit';
import { CoverLetterGenerator } from './components/CoverLetterGenerator';
import { InterviewPrepTab } from './components/InterviewPrepTab';
import { SampleModal } from './components/SampleModal';
import { ResumeAnalysis, SampleResume } from './types/resume';
import { generateVisualResumeDataUrl } from './utils/resumeVisualGenerator';
import {
  AlertOctagon,
  Sparkles,
  Layers,
  Key,
  Mail,
  HelpCircle,
  CheckCircle2,
  AlertTriangle,
} from 'lucide-react';

interface AnalyzeRequestPayload {
  resumeText?: string;
  resumeBase64?: string;
  resumeMimeType?: string;
  fileName?: string;
  jobTitle?: string;
  jobDescription?: string;
  targetLevel?: string;
  previewImageUrl?: string;
  forceRefresh?: boolean;
  forceLocal?: boolean;
}

function formatErrorMessage(raw: string): { title: string; message: string; isDemandSpike: boolean } {
  const isSpike =
    raw.includes('503') ||
    raw.includes('UNAVAILABLE') ||
    raw.includes('high demand') ||
    raw.includes('429') ||
    raw.includes('RESOURCE_EXHAUSTED');

  if (isSpike) {
    return {
      title: 'Gemini Cloud Traffic Spike (503 Handled)',
      message:
        'The Gemini model is temporarily experiencing peak cloud traffic. We provide instant auto-failover routing and CPRW turbo auditing so your audit workflow is never blocked.',
      isDemandSpike: true,
    };
  }

  try {
    const parsed = JSON.parse(raw);
    if (parsed.message) {
      return { title: 'Analysis Notice', message: parsed.message, isDemandSpike: false };
    }
  } catch {}

  return { title: 'Analysis Interrupted', message: raw, isDemandSpike: false };
}

export default function App() {
  const [analysis, setAnalysis] = useState<ResumeAnalysis | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<
    'fixes' | 'bullets' | 'keywords' | 'sections' | 'coverletter' | 'interview'
  >('fixes');
  const [sampleModalOpen, setSampleModalOpen] = useState(false);
  const [currentJobTitle, setCurrentJobTitle] = useState<string | undefined>();
  const [currentJobDescription, setCurrentJobDescription] = useState<string | undefined>();
  const [previewImageUrl, setPreviewImageUrl] = useState<string | null>(null);
  const [showDocumentPreview, setShowDocumentPreview] = useState(false);
  const [lastPayload, setLastPayload] = useState<AnalyzeRequestPayload | null>(null);

  const handleAnalyze = async (payload: AnalyzeRequestPayload) => {
    setIsLoading(true);
    setError(null);
    setCurrentJobTitle(payload.jobTitle);
    setCurrentJobDescription(payload.jobDescription);
    setLastPayload(payload);
    if (payload.previewImageUrl) {
      setPreviewImageUrl(payload.previewImageUrl);
    }

    try {
      const response = await fetch('/api/analyze-resume', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          resumeText: payload.resumeText,
          resumeBase64: payload.resumeBase64,
          resumeMimeType: payload.resumeMimeType,
          fileName: payload.fileName,
          jobTitle: payload.jobTitle,
          jobDescription: payload.jobDescription,
          targetLevel: payload.targetLevel,
          forceRefresh: payload.forceRefresh,
          forceLocal: payload.forceLocal,
        }),
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.message || 'Failed to analyze resume. Please try again.');
      }

      const data: ResumeAnalysis = await response.json();
      setAnalysis(data);
      setActiveTab('fixes');
    } catch (err: any) {
      console.error('Analysis error:', err);
      setError(err.message || 'Failed to connect to AI analysis engine. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInstantSampleSelect = (sample: SampleResume, generatedPreviewUrl?: string) => {
    setError(null);
    setCurrentJobTitle(sample.targetJobTitle);
    setCurrentJobDescription(sample.targetJobDescription);
    const visualUrl = generatedPreviewUrl || generateVisualResumeDataUrl(sample);
    setPreviewImageUrl(visualUrl);
    setShowDocumentPreview(sample.formatType === 'photo');

    const payload: AnalyzeRequestPayload = {
      resumeText: sample.resumeText,
      fileName: `${sample.id}.${sample.formatType === 'photo' ? 'jpg' : sample.formatType}`,
      jobTitle: sample.targetJobTitle,
      jobDescription: sample.targetJobDescription,
      targetLevel: sample.level.split(' ')[0],
      previewImageUrl: visualUrl,
    };
    setLastPayload(payload);

    if (sample.precomputedAnalysis) {
      setAnalysis(sample.precomputedAnalysis);
      setActiveTab('fixes');
    } else {
      handleAnalyze(payload);
    }
  };

  const handleModalSelectSample = (sample: SampleResume, mode: 'instant' | 'live') => {
    const visualUrl = generateVisualResumeDataUrl(sample);
    if (mode === 'instant' && sample.precomputedAnalysis) {
      handleInstantSampleSelect(sample, visualUrl);
    } else {
      const base64 = visualUrl.split(',')[1] || '';
      handleAnalyze({
        resumeText: sample.formatType === 'photo' ? undefined : sample.resumeText,
        resumeBase64: sample.formatType === 'photo' ? base64 : undefined,
        resumeMimeType: sample.formatType === 'photo' ? 'image/jpeg' : undefined,
        fileName: `${sample.id}.${sample.formatType === 'photo' ? 'jpg' : sample.formatType}`,
        jobTitle: sample.targetJobTitle,
        jobDescription: sample.targetJobDescription,
        targetLevel: sample.level.split(' ')[0],
        previewImageUrl: visualUrl,
        forceRefresh: true,
      });
    }
  };

  const handleLiveRescan = () => {
    if (!lastPayload) return;
    handleAnalyze({
      ...lastPayload,
      forceRefresh: true,
    });
  };

  const handleReset = () => {
    setAnalysis(null);
    setError(null);
    setCurrentJobTitle(undefined);
    setCurrentJobDescription(undefined);
    setPreviewImageUrl(null);
    setShowDocumentPreview(false);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      {/* Top Navbar */}
      <Navbar
        onReset={handleReset}
        onOpenSamples={() => setSampleModalOpen(true)}
        hasAnalysis={!!analysis}
        onPrint={handlePrint}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        {/* Error Alert */}
        {error && (() => {
          const formatted = formatErrorMessage(error);
          return (
            <div className="mb-6 p-4.5 rounded-2xl bg-slate-900/95 border border-rose-500/40 text-slate-200 shadow-2xl backdrop-blur-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-start gap-3 flex-1">
                <div className="w-9 h-9 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400 shrink-0 mt-0.5">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-white flex items-center gap-2">
                    {formatted.title}
                    {formatted.isDemandSpike && (
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30 font-semibold">
                        Auto-Failover Ready
                      </span>
                    )}
                  </h3>
                  <p className="text-xs text-slate-300 mt-1 max-w-2xl leading-relaxed">
                    {formatted.message}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto shrink-0 pt-2 sm:pt-0 border-t border-slate-800 sm:border-0">
                {lastPayload && (
                  <button
                    type="button"
                    onClick={() => handleAnalyze({ ...lastPayload, forceLocal: true })}
                    disabled={isLoading}
                    className="flex-1 sm:flex-initial text-xs px-3.5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold transition-colors cursor-pointer shadow-sm"
                  >
                    Run Instant Turbo Audit
                  </button>
                )}
                {lastPayload && (
                  <button
                    type="button"
                    onClick={() => handleAnalyze({ ...lastPayload, forceRefresh: true })}
                    disabled={isLoading}
                    className="flex-1 sm:flex-initial text-xs px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium border border-slate-700 transition-colors cursor-pointer"
                  >
                    Retry AI Scan
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setError(null)}
                  className="text-xs px-3 py-2 rounded-lg bg-transparent hover:bg-slate-800 text-slate-400 hover:text-white font-medium cursor-pointer"
                >
                  Dismiss
                </button>
              </div>
            </div>
          );
        })()}

        {/* View 1: Upload / Multi-Format Input Workbench */}
        {!analysis && (
          <ResumeUploader
            onAnalyze={handleAnalyze}
            onInstantSampleSelect={handleInstantSampleSelect}
            isLoading={isLoading}
          />
        )}

        {/* View 2: Full Analysis Dashboard */}
        {analysis && (
          <div className="space-y-8">
            {/* Top Score Banner & Radial Gauge */}
            <ScoreGauge
              analysis={analysis}
              previewImageUrl={previewImageUrl}
              showDocumentPreview={showDocumentPreview}
              onToggleDocumentPreview={() => setShowDocumentPreview((prev) => !prev)}
              onLiveRescan={lastPayload ? handleLiveRescan : undefined}
              isRescanning={isLoading}
            />

            {/* 4-Column KPI Summary Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 no-print">
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-lg bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400 shrink-0">
                  <AlertOctagon className="w-4 h-4" />
                </div>
                <div>
                  <span className="block text-xl font-bold text-white font-mono tabular-nums">
                    {analysis.criticalFixes?.length || 0}
                  </span>
                  <span className="text-xs text-slate-400 font-medium">Critical Action Items</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 shrink-0">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <span className="block text-xl font-bold text-white font-mono tabular-nums">
                    {analysis.bulletEnhancements?.length || 0}
                  </span>
                  <span className="text-xs text-slate-400 font-medium">Google XYZ Rewrites</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
                  <Key className="w-4 h-4" />
                </div>
                <div>
                  <span className="block text-xl font-bold text-white font-mono tabular-nums">
                    {analysis.keywordAnalysis?.missingCrucialKeywords?.length || 0}
                  </span>
                  <span className="text-xs text-slate-400 font-medium">Missing ATS Keywords</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <span className="block text-xl font-bold text-white font-mono tabular-nums">
                    {analysis.strengths?.length || 0}
                  </span>
                  <span className="text-xs text-slate-400 font-medium">Verified Strengths</span>
                </div>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex border-b border-slate-800 overflow-x-auto no-print space-x-1 sm:space-x-2">
              <button
                type="button"
                onClick={() => setActiveTab('fixes')}
                className={`flex items-center gap-2 py-3 px-4 text-xs sm:text-sm font-semibold border-b-2 whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                  activeTab === 'fixes'
                    ? 'border-indigo-500 text-indigo-400 bg-indigo-500/5'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <AlertOctagon className="w-4 h-4 text-rose-400" />
                <span>Actionable Fixes ({analysis.criticalFixes?.length || 0})</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('bullets')}
                className={`flex items-center gap-2 py-3 px-4 text-xs sm:text-sm font-semibold border-b-2 whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                  activeTab === 'bullets'
                    ? 'border-indigo-500 text-indigo-400 bg-indigo-500/5'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <Sparkles className="w-4 h-4 text-indigo-400" />
                <span>Bullet Rewriter ({analysis.bulletEnhancements?.length || 0})</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('keywords')}
                className={`flex items-center gap-2 py-3 px-4 text-xs sm:text-sm font-semibold border-b-2 whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                  activeTab === 'keywords'
                    ? 'border-indigo-500 text-indigo-400 bg-indigo-500/5'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <Key className="w-4 h-4 text-amber-400" />
                <span>Keyword Gap Matrix</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('sections')}
                className={`flex items-center gap-2 py-3 px-4 text-xs sm:text-sm font-semibold border-b-2 whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                  activeTab === 'sections'
                    ? 'border-indigo-500 text-indigo-400 bg-indigo-500/5'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <Layers className="w-4 h-4 text-cyan-400" />
                <span>Section Audit & Checklist</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('coverletter')}
                className={`flex items-center gap-2 py-3 px-4 text-xs sm:text-sm font-semibold border-b-2 whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                  activeTab === 'coverletter'
                    ? 'border-indigo-500 text-indigo-400 bg-indigo-500/5'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <Mail className="w-4 h-4 text-indigo-400" />
                <span>Tailored Cover Letter</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('interview')}
                className={`flex items-center gap-2 py-3 px-4 text-xs sm:text-sm font-semibold border-b-2 whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                  activeTab === 'interview'
                    ? 'border-indigo-500 text-indigo-400 bg-indigo-500/5'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <HelpCircle className="w-4 h-4 text-emerald-400" />
                <span>Interview Defense</span>
              </button>
            </div>

            {/* Tab Contents */}
            <div className="pt-2">
              {activeTab === 'fixes' && (
                <CriticalFixesList
                  fixes={analysis.criticalFixes || []}
                  strengths={analysis.strengths || []}
                  weaknesses={analysis.weaknesses || []}
                  baseScore={analysis.overallScore}
                />
              )}

              {activeTab === 'bullets' && (
                <BulletTransformer
                  bullets={analysis.bulletEnhancements || []}
                  targetRole={currentJobTitle || analysis.detectedRole}
                />
              )}

              {activeTab === 'keywords' && (
                <KeywordGapViewer
                  keywordAnalysis={analysis.keywordAnalysis}
                  topSkillsIdentified={analysis.topSkillsIdentified}
                />
              )}

              {activeTab === 'sections' && (
                <SectionAudit
                  sectionEvaluations={analysis.sectionEvaluations || []}
                  atsComplianceChecklist={analysis.atsComplianceChecklist || []}
                />
              )}

              {activeTab === 'coverletter' && (
                <CoverLetterGenerator
                  analysis={analysis}
                  jobTitle={currentJobTitle}
                  jobDescription={currentJobDescription}
                />
              )}

              {activeTab === 'interview' && (
                <InterviewPrepTab
                  analysis={analysis}
                  jobTitle={currentJobTitle}
                />
              )}
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-6 text-xs text-slate-400 no-print">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2 justify-center sm:justify-start">
            <span className="text-slate-300 font-semibold">CareerPulse</span>
            <span aria-hidden="true">·</span>
            <span>Multimodal ATS & Vision OCR Resume Analyzer</span>
            <span aria-hidden="true">·</span>
            <span>Team Moshdi</span>
          </div>
          <div className="flex flex-wrap items-center gap-2 text-slate-400 justify-center">
            <span className="text-cyan-400 font-medium">
              Designed by Shivam Kumar
            </span>
            <span aria-hidden="true">·</span>
            <span>Supports PDF, Photos, DOCX & Text</span>
            <span aria-hidden="true">·</span>
            <span>Google XYZ Formula</span>
          </div>
        </div>
      </footer>

      {/* Sample Resumes Picker Modal */}
      <SampleModal
        isOpen={sampleModalOpen}
        onClose={() => setSampleModalOpen(false)}
        onSelectSample={handleModalSelectSample}
      />
    </div>
  );
}
