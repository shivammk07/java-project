import React, { useState } from 'react';
import { SAMPLE_RESUMES } from '../data/sampleResumes';
import { SampleResume, ResumeFormatType } from '../types/resume';
import { generateVisualResumeDataUrl } from '../utils/resumeVisualGenerator';
import {
  X,
  FileText,
  Camera,
  FileCode,
  Zap,
  Play,
  Download,
  Eye,
} from 'lucide-react';

interface SampleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectSample: (sample: SampleResume, mode: 'instant' | 'live') => void;
}

export const SampleModal: React.FC<SampleModalProps> = ({
  isOpen,
  onClose,
  onSelectSample,
}) => {
  const [formatFilter, setFormatFilter] = useState<'all' | ResumeFormatType>('all');
  const [previewSample, setPreviewSample] = useState<SampleResume | null>(null);
  const [previewDataUrl, setPreviewDataUrl] = useState<string>('');

  if (!isOpen) return null;

  const filteredSamples = SAMPLE_RESUMES.filter((s) =>
    formatFilter === 'all' ? true : s.formatType === formatFilter
  );

  const handleOpenVisualPreview = (e: React.MouseEvent, sample: SampleResume) => {
    e.stopPropagation();
    const url = generateVisualResumeDataUrl(sample);
    setPreviewDataUrl(url);
    setPreviewSample(sample);
  };

  const handleDownloadSample = (e: React.MouseEvent, sample: SampleResume) => {
    e.stopPropagation();
    if (sample.formatType === 'photo' || sample.formatType === 'pdf') {
      const dataUrl = generateVisualResumeDataUrl(sample);
      const a = document.createElement('a');
      a.href = dataUrl;
      a.download = `${sample.name.toLowerCase().replace(/\s+/g, '_')}_resume_${sample.formatType}.jpg`;
      a.click();
    } else {
      const blob = new Blob([sample.resumeText], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${sample.name.toLowerCase().replace(/\s+/g, '_')}_resume.txt`;
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  const getFormatIcon = (type: ResumeFormatType) => {
    switch (type) {
      case 'photo':
        return <Camera className="w-3.5 h-3.5 text-amber-400" />;
      case 'pdf':
        return <FileText className="w-3.5 h-3.5 text-indigo-400" />;
      case 'docx':
        return <FileCode className="w-3.5 h-3.5 text-cyan-400" />;
      default:
        return <FileText className="w-3.5 h-3.5 text-emerald-400" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-4xl w-full p-6 sm:p-8 shadow-2xl relative max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 pb-5 border-b border-slate-800 shrink-0">
          <div>
            <h3 className="text-xl font-bold text-white tracking-tight">
              Sample Resume Library (Text, Photo Scans, PDF & DOCX)
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Test multimodal OCR on camera-scanned resume photos, structured PDFs, or plain text profiles.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Interactive Format Filter Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 py-4 border-b border-slate-800/80 shrink-0">
          <div className="flex items-center gap-1 p-1 bg-slate-950 rounded-lg border border-slate-800">
            <button
              type="button"
              onClick={() => setFormatFilter('all')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                formatFilter === 'all'
                  ? 'bg-indigo-600 text-white'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              All Formats ({SAMPLE_RESUMES.length})
            </button>
            <button
              type="button"
              onClick={() => setFormatFilter('photo')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                formatFilter === 'photo'
                  ? 'bg-indigo-600 text-white'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Photo Scans (3)
            </button>
            <button
              type="button"
              onClick={() => setFormatFilter('pdf')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                formatFilter === 'pdf'
                  ? 'bg-indigo-600 text-white'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              PDF Documents (2)
            </button>
            <button
              type="button"
              onClick={() => setFormatFilter('text')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                formatFilter === 'text'
                  ? 'bg-indigo-600 text-white'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Plain Text / MD (2)
            </button>
            <button
              type="button"
              onClick={() => setFormatFilter('docx')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                formatFilter === 'docx'
                  ? 'bg-indigo-600 text-white'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              DOCX Executive (1)
            </button>
          </div>

          <span className="text-xs text-slate-400 font-mono tabular-nums">
            Instant Audit (&lt;0.3s) or Live Gemini Scan (~5s)
          </span>
        </div>

        {/* Visual Sheet Preview Lightbox inside Modal */}
        {previewSample && (
          <div className="my-4 p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row gap-5 items-center justify-between shrink-0">
            <div className="flex items-center gap-4">
              <img
                src={previewDataUrl}
                alt={`${previewSample.name} visual resume preview`}
                referrerPolicy="no-referrer"
                className="w-24 h-32 object-cover rounded-lg border border-slate-700 shrink-0"
              />
              <div>
                <div className="text-xs text-indigo-400 font-medium">
                  Visual Document Sheet · {previewSample.formatBadge}
                </div>
                <h4 className="text-base font-bold text-white mt-0.5">
                  {previewSample.name} — {previewSample.role}
                </h4>
                <p className="text-xs text-slate-400 mt-1 max-w-md">
                  Rendered at 900x1180px high-DPI resolution for realistic multimodal Vision OCR and layout testing.
                </p>
                <div className="flex items-center gap-2 mt-3">
                  <button
                    type="button"
                    onClick={() => {
                      onSelectSample(previewSample, 'instant');
                      onClose();
                    }}
                    className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold cursor-pointer"
                  >
                    Open Instant Audit
                  </button>
                  <button
                    type="button"
                    onClick={(e) => handleDownloadSample(e, previewSample)}
                    className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 text-xs font-medium cursor-pointer"
                  >
                    Download Image (.jpg)
                  </button>
                  <button
                    type="button"
                    onClick={() => setPreviewSample(null)}
                    className="px-2.5 py-1.5 text-xs text-slate-400 hover:text-white cursor-pointer"
                  >
                    Close Preview
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* List of Samples */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 mt-4 overflow-y-auto pr-1">
          {filteredSamples.map((sample) => (
            <div
              key={sample.id}
              className="p-5 rounded-xl bg-slate-950/90 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between gap-4"
            >
              <div>
                {/* Clean unboxed metadata row */}
                <div className="flex items-center justify-between gap-2 text-xs text-slate-400 mb-1.5">
                  <div className="flex items-center gap-1.5">
                    {getFormatIcon(sample.formatType)}
                    <span className="text-slate-300 font-medium">{sample.formatBadge}</span>
                    <span aria-hidden="true">·</span>
                    <span>{sample.level}</span>
                  </div>
                  {sample.precomputedAnalysis && (
                    <span className="font-mono tabular-nums text-emerald-400 font-semibold">
                      ATS {sample.precomputedAnalysis.overallScore}/100
                    </span>
                  )}
                </div>

                <h4 className="font-bold text-white text-base">
                  {sample.name}
                </h4>
                <p className="text-xs text-indigo-400 font-medium mt-0.5">
                  {sample.role}
                </p>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                  {sample.tagline}
                </p>
                <div className="mt-2.5 text-[11px] text-slate-500 font-mono truncate">
                  Target: {sample.targetJobTitle}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-slate-800/80">
                <button
                  type="button"
                  onClick={() => {
                    onSelectSample(sample, 'instant');
                    onClose();
                  }}
                  className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <Zap className="w-3.5 h-3.5" />
                  <span>Instant Audit (&lt;1s)</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    onSelectSample(sample, 'live');
                    onClose();
                  }}
                  className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 hover:text-white text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                  title="Run a fresh live Gemini AI scan (~5s)"
                >
                  <Play className="w-3 h-3 text-cyan-400" />
                  <span>Live Scan (~5s)</span>
                </button>

                <button
                  type="button"
                  onClick={(e) => handleOpenVisualPreview(e, sample)}
                  className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
                  title="Preview Visual Document / Photo Scan"
                >
                  <Eye className="w-3.5 h-3.5" />
                </button>

                <button
                  type="button"
                  onClick={(e) => handleDownloadSample(e, sample)}
                  className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
                  title="Download Sample File"
                >
                  <Download className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
