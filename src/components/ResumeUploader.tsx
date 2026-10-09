import React, { useState, useRef } from 'react';
import { Upload, FileText, Briefcase, Sparkles, Check, ChevronDown, ChevronUp, FileUp, AlertCircle } from 'lucide-react';
import { SAMPLE_RESUMES } from '../data/sampleResumes';
import { SampleResume } from '../types/resume';

interface ResumeUploaderProps {
  onAnalyze: (payload: {
    resumeText?: string;
    resumeBase64?: string;
    resumeMimeType?: string;
    fileName?: string;
    jobTitle?: string;
    jobDescription?: string;
    targetLevel?: string;
  }) => void;
  isLoading: boolean;
}

export const ResumeUploader: React.FC<ResumeUploaderProps> = ({ onAnalyze, isLoading }) => {
  const [activeTab, setActiveTab] = useState<'upload' | 'paste'>('upload');
  const [resumeText, setResumeText] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [fileBase64, setFileBase64] = useState<string | null>(null);
  const [fileMimeType, setFileMimeType] = useState<string | null>(null);
  const [jobTitle, setJobTitle] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [targetLevel, setTargetLevel] = useState('Senior');
  const [showJobDetails, setShowJobDetails] = useState(true);
  const [dragActive, setDragActive] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileProcess = (selectedFile: File) => {
    setUploadError(null);
    const validTypes = ['application/pdf', 'text/plain', 'text/markdown'];
    const extension = selectedFile.name.split('.').pop()?.toLowerCase();

    if (!validTypes.includes(selectedFile.type) && !['pdf', 'txt', 'md', 'docx'].includes(extension || '')) {
      setUploadError('Please upload a PDF (.pdf), plain text (.txt), or markdown (.md) file.');
      return;
    }

    if (selectedFile.size > 15 * 1024 * 1024) {
      setUploadError('File size exceeds 15MB limit.');
      return;
    }

    setFile(selectedFile);

    if (selectedFile.type === 'text/plain' || extension === 'txt' || extension === 'md') {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result as string;
        setResumeText(text);
        setFileBase64(null);
        setFileMimeType(null);
      };
      reader.readAsText(selectedFile);
    } else {
      // PDF or binary
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        // Strip data:mime;base64, prefix
        const base64Data = result.split(',')[1];
        setFileBase64(base64Data);
        setFileMimeType(selectedFile.type || 'application/pdf');
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileProcess(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };

  const handleLoadSample = (sample: SampleResume) => {
    setActiveTab('paste');
    setResumeText(sample.resumeText);
    setJobTitle(sample.targetJobTitle);
    setJobDescription(sample.targetJobDescription);
    setTargetLevel(sample.level.split(' ')[0] || 'Mid-Senior');
    setFile(null);
    setFileBase64(null);
    setFileMimeType(null);
    setShowJobDetails(true);
    setUploadError(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (activeTab === 'upload' && !file && !resumeText) {
      setUploadError('Please select a resume file or switch to paste mode.');
      return;
    }
    if (activeTab === 'paste' && !resumeText.trim()) {
      setUploadError('Please paste your resume text to begin analysis.');
      return;
    }

    onAnalyze({
      resumeText: resumeText.trim() ? resumeText : undefined,
      resumeBase64: fileBase64 || undefined,
      resumeMimeType: fileMimeType || undefined,
      fileName: file ? file.name : undefined,
      jobTitle: jobTitle.trim() || undefined,
      jobDescription: jobDescription.trim() || undefined,
      targetLevel,
    });
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Intro Hero */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          Powered by Gemini 3.8 Flash • Executive Recruiter Intelligence
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Supercharge Your Resume For Top ATS & Hiring Managers
        </h1>
        <p className="text-slate-400 text-base max-w-2xl mx-auto mt-2 leading-relaxed">
          Instant ATS scoring, quantifiable impact grading, missing keywords detection, and Google-standard bullet rewriting to maximize your interview conversion rate.
        </p>

        {/* Quick Sample Selector */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
          <span className="text-xs text-slate-400 font-medium mr-1">Try instant sample:</span>
          {SAMPLE_RESUMES.map((sample) => (
            <button
              key={sample.id}
              type="button"
              onClick={() => handleLoadSample(sample)}
              className="text-xs px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700/80 text-slate-300 hover:text-white transition-all flex items-center gap-1.5"
            >
              <FileText className="w-3 h-3 text-indigo-400" />
              <span>{sample.name}</span>
              <span className="text-[10px] text-slate-400 font-normal">({sample.role.split(' ')[0]})</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Upload Card */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 backdrop-blur-md shadow-2xl relative">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Mode Switcher */}
          <div className="flex border-b border-slate-800">
            <button
              type="button"
              onClick={() => {
                setActiveTab('upload');
                setUploadError(null);
              }}
              className={`flex items-center gap-2 pb-3 px-4 text-sm font-semibold border-b-2 transition-all ${
                activeTab === 'upload'
                  ? 'border-indigo-500 text-indigo-400'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <Upload className="w-4 h-4" />
              Upload Document (PDF / TXT)
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveTab('paste');
                setUploadError(null);
              }}
              className={`flex items-center gap-2 pb-3 px-4 text-sm font-semibold border-b-2 transition-all ${
                activeTab === 'paste'
                  ? 'border-indigo-500 text-indigo-400'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <FileText className="w-4 h-4" />
              Paste Resume Text
            </button>
          </div>

          {/* Upload Tab */}
          {activeTab === 'upload' && (
            <div>
              <div
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${
                  dragActive
                    ? 'border-indigo-400 bg-indigo-500/10'
                    : file
                    ? 'border-emerald-500/50 bg-emerald-500/5'
                    : 'border-slate-700 hover:border-slate-600 bg-slate-950/40 hover:bg-slate-950/70'
                }`}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,.txt,.md"
                  className="hidden"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      handleFileProcess(e.target.files[0]);
                    }
                  }}
                />

                {file ? (
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-3">
                      <Check className="w-6 h-6" />
                    </div>
                    <span className="font-semibold text-white text-sm">{file.name}</span>
                    <span className="text-xs text-slate-400 mt-1">
                      {(file.size / 1024).toFixed(1)} KB • Ready for scan
                    </span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setFile(null);
                        setFileBase64(null);
                        setFileMimeType(null);
                      }}
                      className="mt-3 text-xs text-rose-400 hover:underline"
                    >
                      Remove file
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-3">
                      <FileUp className="w-6 h-6" />
                    </div>
                    <p className="text-sm font-medium text-white">
                      Drag and drop your resume file here, or <span className="text-indigo-400 hover:underline">browse</span>
                    </p>
                    <p className="text-xs text-slate-400 mt-1">
                      Supports PDF, TXT, Markdown (Max 15MB)
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Paste Tab */}
          {activeTab === 'paste' && (
            <div>
              <div className="flex justify-between items-center text-xs text-slate-400 mb-2">
                <label className="font-medium text-slate-300">Resume Plain Text</label>
                <span>{resumeText.split(/\s+/).filter(Boolean).length} words</span>
              </div>
              <textarea
                value={resumeText}
                onChange={(e) => setResumeText(e.target.value)}
                placeholder="Paste the full text of your resume here (Summary, Work Experience, Skills, Education)..."
                rows={9}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl p-4 text-xs sm:text-sm text-slate-200 placeholder-slate-400 focus:outline-none focus:border-indigo-500 font-mono transition-all resize-y"
              />
            </div>
          )}

          {/* Target Job Details Accordion (High-Value Match) */}
          <div className="border border-slate-800 rounded-xl bg-slate-950/50 overflow-hidden">
            <button
              type="button"
              onClick={() => setShowJobDetails(!showJobDetails)}
              className="w-full flex items-center justify-between p-4 text-left hover:bg-slate-900/50 transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <Briefcase className="w-4 h-4 text-indigo-400" />
                <div>
                  <span className="text-sm font-semibold text-slate-200">
                    Target Job Description & Seniority
                  </span>
                  <span className="text-xs text-indigo-400 block sm:inline sm:ml-2">
                    (Recommended for Keyword Gap & Tailored Scoring)
                  </span>
                </div>
              </div>
              {showJobDetails ? (
                <ChevronUp className="w-4 h-4 text-slate-400" />
              ) : (
                <ChevronDown className="w-4 h-4 text-slate-400" />
              )}
            </button>

            {showJobDetails && (
              <div className="p-4 pt-0 space-y-4 border-t border-slate-800/80 mt-2">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-3">
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-medium text-slate-400 mb-1">
                      Target Job Title / Role
                    </label>
                    <input
                      type="text"
                      value={jobTitle}
                      onChange={(e) => setJobTitle(e.target.value)}
                      placeholder="e.g. Senior Full Stack Engineer / Product Manager"
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-200 placeholder-slate-400 focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1">
                      Target Seniority Level
                    </label>
                    <select
                      value={targetLevel}
                      onChange={(e) => setTargetLevel(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-indigo-500"
                    >
                      <option value="Entry">Entry Level (0-2 YOE)</option>
                      <option value="Mid">Mid-Level (3-5 YOE)</option>
                      <option value="Senior">Senior (5-8 YOE)</option>
                      <option value="Lead">Lead / Staff (8+ YOE)</option>
                      <option value="Executive">Executive / Director / VP</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">
                    Job Description / Key Requirements
                  </label>
                  <textarea
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                    placeholder="Paste the target job description or requirements here to check match percentage and detect missing keywords..."
                    rows={4}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-xs sm:text-sm text-slate-200 placeholder-slate-400 focus:outline-none focus:border-indigo-500 font-mono transition-all"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Upload Error Alert */}
          {uploadError && (
            <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/30 flex items-center gap-2 text-xs text-rose-300">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
              <span>{uploadError}</span>
            </div>
          )}

          {/* Submit Action */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3.5 px-6 rounded-xl font-bold text-sm tracking-wide flex items-center justify-center gap-2 shadow-xl transition-all ${
                isLoading
                  ? 'bg-slate-800 text-slate-400 cursor-not-allowed border border-slate-700'
                  : 'bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white shadow-indigo-500/25 cursor-pointer active:scale-[0.99]'
              }`}
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-indigo-400 border-t-transparent rounded-full animate-spin" />
                  <span>Auditing Resume with Gemini 3.8 AI...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Analyze Resume & Get ATS Score</span>
                </>
              )}
            </button>
            <p className="text-[11px] text-center text-slate-400 mt-2">
              Confidential analysis • Evaluates ATS parsing, Google XYZ metric formula, and keyword gaps
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};
