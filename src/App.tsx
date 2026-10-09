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
import { SAMPLE_RESUMES } from './data/sampleResumes';
import {
  AlertOctagon,
  Sparkles,
  Layers,
  Key,
  Mail,
  HelpCircle,
  RotateCcw,
  Printer,
  CheckCircle2,
  FileText,
  AlertTriangle,
} from 'lucide-react';

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

  const handleAnalyze = async (payload: {
    resumeText?: string;
    resumeBase64?: string;
    resumeMimeType?: string;
    fileName?: string;
    jobTitle?: string;
    jobDescription?: string;
    targetLevel?: string;
  }) => {
    setIsLoading(true);
    setError(null);
    setCurrentJobTitle(payload.jobTitle);
    setCurrentJobDescription(payload.jobDescription);

    try {
      const response = await fetch('/api/analyze-resume', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.message || 'Failed to analyze resume with TEAM MOSHDI LOADING.......');
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

  const handleSelectSample = (sample: SampleResume) => {
    handleAnalyze({
      resumeText: sample.resumeText,
      jobTitle: sample.targetJobTitle,
      jobDescription: sample.targetJobDescription,
      targetLevel: sample.level.split(' ')[0],
    });
  };

  const handleReset = () => {
    setAnalysis(null);
    setError(null);
    setCurrentJobTitle(undefined);
    setCurrentJobDescription(undefined);
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
        {error && (
          <div className="mb-6 p-4 rounded-2xl bg-rose-950/40 border border-rose-800/60 text-rose-300 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
            <div className="flex-1">
              <h3 className="font-bold text-sm text-white">Analysis Interrupted</h3>
              <p className="text-xs text-rose-300 mt-1">{error}</p>
            </div>
            <button
              onClick={() => setError(null)}
              className="text-xs px-3 py-1 rounded bg-rose-900/50 hover:bg-rose-900 text-white font-medium"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* View 1: Upload / Input Screen */}
        {!analysis && (
          <ResumeUploader onAnalyze={handleAnalyze} isLoading={isLoading} />
        )}

        {/* View 2: Full Analysis Dashboard */}
        {analysis && (
          <div className="space-y-8 animate-fadeIn">
            {/* Top Score Banner & Radial Gauge */}
            <ScoreGauge analysis={analysis} />

            {/* Quick Summary Pill Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 no-print">
              <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400">
                  <AlertOctagon className="w-4 h-4" />
                </div>
                <div>
                  <span className="block text-lg font-bold text-white">
                    {analysis.criticalFixes?.length || 0}
                  </span>
                  <span className="text-[11px] text-slate-400 font-medium">Critical Action Items</span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <span className="block text-lg font-bold text-white">
                    {analysis.bulletEnhancements?.length || 0}
                  </span>
                  <span className="text-[11px] text-slate-400 font-medium">Google XYZ Rewrites</span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                  <Key className="w-4 h-4" />
                </div>
                <div>
                  <span className="block text-lg font-bold text-white">
                    {analysis.keywordAnalysis?.missingCrucialKeywords?.length || 0}
                  </span>
                  <span className="text-[11px] text-slate-400 font-medium">Missing ATS Keywords</span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <span className="block text-lg font-bold text-white">
                    {analysis.strengths?.length || 0}
                  </span>
                  <span className="text-[11px] text-slate-400 font-medium">Verified Strengths</span>
                </div>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex border-b border-slate-800 overflow-x-auto no-print space-x-1 sm:space-x-2">
              <button
                type="button"
                onClick={() => setActiveTab('fixes')}
                className={`flex items-center gap-2 py-3 px-3.5 text-xs sm:text-sm font-semibold border-b-2 whitespace-nowrap transition-all ${
                  activeTab === 'fixes'
                    ? 'border-indigo-500 text-indigo-400 bg-indigo-500/5'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <AlertOctagon className="w-4 h-4 text-rose-400" />
                <span>Actionable Fixes & Gaps</span>
                <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-slate-800 text-slate-300">
                  {analysis.criticalFixes?.length || 0}
                </span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('bullets')}
                className={`flex items-center gap-2 py-3 px-3.5 text-xs sm:text-sm font-semibold border-b-2 whitespace-nowrap transition-all ${
                  activeTab === 'bullets'
                    ? 'border-indigo-500 text-indigo-400 bg-indigo-500/5'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <Sparkles className="w-4 h-4 text-indigo-400" />
                <span>Bullet Point Rewriter (XYZ)</span>
                <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-slate-800 text-slate-300">
                  {analysis.bulletEnhancements?.length || 0}
                </span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('keywords')}
                className={`flex items-center gap-2 py-3 px-3.5 text-xs sm:text-sm font-semibold border-b-2 whitespace-nowrap transition-all ${
                  activeTab === 'keywords'
                    ? 'border-indigo-500 text-indigo-400 bg-indigo-500/5'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <Key className="w-4 h-4 text-amber-400" />
                <span>Keyword Gap Analysis</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('sections')}
                className={`flex items-center gap-2 py-3 px-3.5 text-xs sm:text-sm font-semibold border-b-2 whitespace-nowrap transition-all ${
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
                className={`flex items-center gap-2 py-3 px-3.5 text-xs sm:text-sm font-semibold border-b-2 whitespace-nowrap transition-all ${
                  activeTab === 'coverletter'
                    ? 'border-indigo-500 text-indigo-400 bg-indigo-500/5'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <Mail className="w-4 h-4 text-purple-400" />
                <span>Tailored Cover Letter</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('interview')}
                className={`flex items-center gap-2 py-3 px-3.5 text-xs sm:text-sm font-semibold border-b-2 whitespace-nowrap transition-all ${
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
      <footer className="border-t border-slate-900 bg-slate-950 py-6 text-center text-xs text-slate-400 no-print">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2 justify-center sm:justify-start">
            <span>CareerPulse AI • Real-time ATS Parsing & Career Optimization</span>
            <span className="text-slate-600">•</span>
            <span className="text-indigo-400 font-mono">TEAM MOSHDI LOADING......</span>
          </div>
          <div className="flex items-center gap-4 text-slate-400 justify-center">
            <span className="text-cyan-400 font-semibold bg-cyan-950/40 border border-cyan-800/40 px-2.5 py-1 rounded-full">
              Designed by Shivam Kumar
            </span>
            <span>•</span>
            <span>Confidential & Private</span>
            <span>•</span>
            <span>Google XYZ Metric Formula</span>
          </div>
        </div>
      </footer>

      {/* Sample Resumes Picker Modal */}
      <SampleModal
        isOpen={sampleModalOpen}
        onClose={() => setSampleModalOpen(false)}
        onSelectSample={handleSelectSample}
      />
    </div>
  );
}
