import React, { useState, useRef, useEffect } from 'react';
import {
  Upload,
  FileText,
  Briefcase,
  Sparkles,
  Check,
  ChevronDown,
  ChevronUp,
  FileUp,
  AlertCircle,
  Camera,
  Image as ImageIcon,
  Zap,
  Clock,
  FileCode,
  Eye,
  Trash2,
  ClipboardPaste,
  Video,
  X,
} from 'lucide-react';
import { SAMPLE_RESUMES } from '../data/sampleResumes';
import { SampleResume, ResumeFormatType } from '../types/resume';
import {
  compressImageFile,
  generateVisualResumeDataUrl,
  normalizeTextFormat,
} from '../utils/resumeVisualGenerator';

interface ResumeUploaderProps {
  onAnalyze: (payload: {
    resumeText?: string;
    resumeBase64?: string;
    resumeMimeType?: string;
    fileName?: string;
    jobTitle?: string;
    jobDescription?: string;
    targetLevel?: string;
    previewImageUrl?: string;
  }) => void;
  onInstantSampleSelect: (sample: SampleResume, previewUrl?: string) => void;
  isLoading: boolean;
}

export const ResumeUploader: React.FC<ResumeUploaderProps> = ({
  onAnalyze,
  onInstantSampleSelect,
  isLoading,
}) => {
  const [activeTab, setActiveTab] = useState<'upload' | 'photo' | 'paste'>('upload');
  const [sampleFilter, setSampleFilter] = useState<'all' | ResumeFormatType>('all');

  const [resumeText, setResumeText] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [fileBase64, setFileBase64] = useState<string | null>(null);
  const [fileMimeType, setFileMimeType] = useState<string | null>(null);
  const [previewImageUrl, setPreviewImageUrl] = useState<string | null>(null);
  const [detectedFileBadge, setDetectedFileBadge] = useState<string | null>(null);

  const [jobTitle, setJobTitle] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [targetLevel, setTargetLevel] = useState('Senior');
  const [showJobDetails, setShowJobDetails] = useState(true);
  const [dragActive, setDragActive] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [isCompressing, setIsCompressing] = useState(false);

  // Camera capture state
  const [cameraActive, setCameraActive] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Live analysis stopwatch
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const photoInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isLoading) {
      setElapsedSeconds(0);
      return;
    }
    const start = Date.now();
    const timer = setInterval(() => {
      setElapsedSeconds((Date.now() - start) / 1000);
    }, 100);
    return () => clearInterval(timer);
  }, [isLoading]);

  // Stop camera stream on unmount
  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  // Global clipboard paste support (Ctrl+V screenshot or resume image/text)
  useEffect(() => {
    const handlePaste = async (e: ClipboardEvent) => {
      const items = e.clipboardData?.items;
      if (!items) return;
      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        if (item.type.startsWith('image/')) {
          e.preventDefault();
          const blob = item.getAsFile();
          if (blob) {
            const pastedFile = new File([blob], `clipboard_resume_${Date.now()}.png`, {
              type: blob.type || 'image/png',
            });
            await handleFileProcess(pastedFile);
          }
          break;
        }
      }
    };
    window.addEventListener('paste', handlePaste);
    return () => window.removeEventListener('paste', handlePaste);
  }, []);

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setCameraActive(false);
  };

  const startCamera = async () => {
    setUploadError(null);
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment', width: { ideal: 1600 }, height: { ideal: 1200 } },
      });
      streamRef.current = mediaStream;
      setCameraActive(true);
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
        }
      }, 50);
    } catch {
      setUploadError(
        'Camera access unavailable in this browser environment. Please upload a photo file (.jpg, .png, .webp) or select a Sample Photo Resume below.'
      );
    }
  };

  const captureCameraPhoto = () => {
    if (!videoRef.current) return;
    const video = videoRef.current;
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth || 1280;
    canvas.height = video.videoHeight || 960;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const dataUrl = canvas.toDataURL('image/jpeg', 0.88);
    const base64 = dataUrl.split(',')[1] || '';

    const syntheticFile = new File([new Blob()], `camera_resume_scan_${Date.now()}.jpg`, {
      type: 'image/jpeg',
    });
    setFile(syntheticFile);
    setFileBase64(base64);
    setFileMimeType('image/jpeg');
    setPreviewImageUrl(dataUrl);
    setDetectedFileBadge('Camera Photo Scan (JPEG)');
    stopCamera();
  };

  const handleFileProcess = async (selectedFile: File) => {
    setUploadError(null);

    if (selectedFile.size > 25 * 1024 * 1024) {
      setUploadError('File size exceeds 25MB limit. Please choose a smaller file.');
      return;
    }

    const extension = (selectedFile.name.split('.').pop() || '').toLowerCase();
    const mime = (selectedFile.type || '').toLowerCase();

    setFile(selectedFile);

    // 1. Check if Image / Photo Resume (.png, .jpg, .jpeg, .webp, .gif, .bmp, .heic, .tiff)
    if (
      mime.startsWith('image/') ||
      ['png', 'jpg', 'jpeg', 'webp', 'gif', 'bmp', 'heic', 'heif', 'tiff', 'tif'].includes(extension)
    ) {
      setIsCompressing(true);
      try {
        const compressed = await compressImageFile(selectedFile, 1600, 0.86);
        setFileBase64(compressed.base64);
        setFileMimeType(compressed.mimeType);
        setPreviewImageUrl(compressed.dataUrl);
        setDetectedFileBadge(`Photo Resume (${extension.toUpperCase() || 'IMAGE'} · Optimized for Fast OCR)`);
      } catch {
        setUploadError('Failed to process image file.');
      } finally {
        setIsCompressing(false);
      }
      return;
    }

    // 2. Check if Client-Readable Text Format (.txt, .md, .csv, .json, .html, .htm, .xml, .tex, .rtf)
    if (
      ['txt', 'md', 'markdown', 'csv', 'json', 'html', 'htm', 'xml', 'tex', 'rtf'].includes(extension) ||
      mime === 'text/plain' ||
      mime === 'text/markdown' ||
      mime === 'text/html' ||
      mime === 'text/csv' ||
      mime === 'application/json'
    ) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const rawText = (e.target?.result as string) || '';
        const cleaned = normalizeTextFormat(rawText, extension);
        setResumeText(cleaned);
        setFileBase64(null);
        setFileMimeType(null);
        setPreviewImageUrl(null);
        setDetectedFileBadge(`Text Document (${extension.toUpperCase() || 'TXT'})`);
      };
      reader.readAsText(selectedFile);
      return;
    }

    // 3. PDF, DOCX, DOC, ODT, or any binary resume file
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = (e.target?.result as string) || '';
      const base64Data = result.split(',')[1] || '';
      setFileBase64(base64Data);
      const resolvedMime =
        extension === 'pdf'
          ? 'application/pdf'
          : extension === 'docx'
          ? 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
          : selectedFile.type || 'application/octet-stream';
      setFileMimeType(resolvedMime);
      setPreviewImageUrl(null);
      setDetectedFileBadge(
        extension === 'pdf'
          ? 'PDF Document'
          : extension === 'docx' || extension === 'doc'
          ? `Word Document (${extension.toUpperCase()})`
          : `Document (${extension.toUpperCase() || 'FILE'})`
      );
    };
    reader.readAsDataURL(selectedFile);
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

  // Load sample into editor/uploader (generates real visual photo/PDF sheet too!)
  const handleLoadSampleIntoWorkspace = (sample: SampleResume) => {
    setUploadError(null);
    setJobTitle(sample.targetJobTitle);
    setJobDescription(sample.targetJobDescription);
    setTargetLevel(sample.level.split(' ')[0] || 'Senior');
    setShowJobDetails(true);
    setResumeText(sample.resumeText);

    const visualDataUrl = generateVisualResumeDataUrl(sample);
    const base64 = visualDataUrl.split(',')[1] || '';

    if (sample.formatType === 'photo') {
      setActiveTab('photo');
      const syntheticPhoto = new File([new Blob()], `${sample.id}_photo_scan.jpg`, {
        type: 'image/jpeg',
      });
      setFile(syntheticPhoto);
      setFileBase64(base64);
      setFileMimeType('image/jpeg');
      setPreviewImageUrl(visualDataUrl);
      setDetectedFileBadge(`${sample.formatBadge} · Multimodal Vision Ready`);
    } else if (sample.formatType === 'pdf' || sample.formatType === 'docx') {
      setActiveTab('upload');
      const ext = sample.formatType === 'pdf' ? 'pdf' : 'docx';
      const syntheticDoc = new File([new Blob()], `${sample.id}_resume.${ext}`, {
        type: sample.formatType === 'pdf' ? 'application/pdf' : 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      });
      setFile(syntheticDoc);
      // Keep text ready for ultra-fast scan + visual sheet preview
      setFileBase64(null);
      setFileMimeType(null);
      setPreviewImageUrl(visualDataUrl);
      setDetectedFileBadge(`${sample.formatBadge} · Text + Layout Layer Extracted`);
    } else {
      setActiveTab('paste');
      setFile(null);
      setFileBase64(null);
      setFileMimeType(null);
      setPreviewImageUrl(visualDataUrl);
      setDetectedFileBadge(sample.formatBadge);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!file && !resumeText.trim() && !fileBase64) {
      setUploadError('Please upload a resume (PDF, Photo, DOCX, TXT) or paste your resume text.');
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
      previewImageUrl: previewImageUrl || undefined,
    });
  };

  const filteredSamples = SAMPLE_RESUMES.filter((s) =>
    sampleFilter === 'all' ? true : s.formatType === sampleFilter
  );

  // Quick live text metrics for Paste mode
  const wordCount = resumeText.split(/\s+/).filter(Boolean).length;
  const bulletCount = (resumeText.match(/^[\s]*[-•*]/gm) || []).length;
  const metricMatches = (resumeText.match(/\b\d+(?:\.\d+)?(?:%|x|\+|k|m|b|ms|s|\$)?\b|\$\d+/gi) || []).length;

  const getCurrentStageIndex = () => {
    if (elapsedSeconds < 1.8) return 0;
    if (elapsedSeconds < 4.5) return 1;
    return 2;
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Hero Section */}
      <div className="text-center space-y-3">
        <div className="flex items-center justify-center gap-2 text-xs text-slate-400">
          <span className="text-indigo-400 font-medium">Multimodal ATS & Vision OCR Engine</span>
          <span aria-hidden="true">·</span>
          <span>Sub-10s Turbo Audit</span>
          <span aria-hidden="true">·</span>
          <span className="text-slate-300">Designed by Shivam Kumar</span>
        </div>

        <h1
          className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight max-w-3xl mx-auto leading-tight"
          style={{ textWrap: 'balance' }}
        >
          Audit Any Resume in Seconds — PDF, Photo Scans, Word & Plain Text
        </h1>

        <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
          Upload a PDF, snap a camera photo of a printed resume, drop a DOCX file, or paste raw text. Get instant ATS scoring, keyword gap matrices, and Google XYZ bullet rewrites in under 10 seconds.
        </p>
      </div>

      {/* Interactive 8-Sample Resume Showcase (Text, Photo Scans, PDF & DOCX) */}
      <section className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <h2 className="text-sm font-bold text-white">
              Try a Pre-Loaded Sample Resume (8 Profiles Across All Formats)
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Includes Java Architecture, Applied AI Photo Scan, DevOps SRE Photo Scan, Product Management, Data & Executive roles.
            </p>
          </div>

          {/* Segmented Filter Control */}
          <div className="flex items-center gap-1 p-1 bg-slate-950 rounded-lg border border-slate-800 self-start sm:self-auto overflow-x-auto max-w-full">
            <button
              type="button"
              onClick={() => setSampleFilter('all')}
              className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                sampleFilter === 'all'
                  ? 'bg-indigo-600 text-white'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              All (8)
            </button>
            <button
              type="button"
              onClick={() => setSampleFilter('photo')}
              className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                sampleFilter === 'photo'
                  ? 'bg-indigo-600 text-white'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Photo Scans (3)
            </button>
            <button
              type="button"
              onClick={() => setSampleFilter('pdf')}
              className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                sampleFilter === 'pdf'
                  ? 'bg-indigo-600 text-white'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              PDF (2)
            </button>
            <button
              type="button"
              onClick={() => setSampleFilter('text')}
              className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                sampleFilter === 'text'
                  ? 'bg-indigo-600 text-white'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Text (2)
            </button>
            <button
              type="button"
              onClick={() => setSampleFilter('docx')}
              className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                sampleFilter === 'docx'
                  ? 'bg-indigo-600 text-white'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              DOCX (1)
            </button>
          </div>
        </div>

        {/* Sample Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-4">
          {filteredSamples.map((sample) => {
            const isPhoto = sample.formatType === 'photo';
            const isPdf = sample.formatType === 'pdf';
            return (
              <div
                key={sample.id}
                className="p-3.5 rounded-xl bg-slate-950/90 border border-slate-800/90 hover:border-slate-700 transition-all flex flex-col justify-between gap-3"
              >
                <div>
                  <div className="flex items-center justify-between gap-1 text-[11px] text-slate-400 mb-1">
                    <span className="flex items-center gap-1 font-medium text-slate-300">
                      {isPhoto ? (
                        <Camera className="w-3 h-3 text-amber-400" />
                      ) : isPdf ? (
                        <FileText className="w-3 h-3 text-indigo-400" />
                      ) : (
                        <FileCode className="w-3 h-3 text-emerald-400" />
                      )}
                      {sample.formatBadge}
                    </span>
                    {sample.precomputedAnalysis && (
                      <span className="font-mono tabular-nums text-emerald-400 font-semibold">
                        {sample.precomputedAnalysis.overallScore}/100
                      </span>
                    )}
                  </div>
                  <h3 className="text-sm font-bold text-white truncate">{sample.name}</h3>
                  <p className="text-xs text-indigo-400 truncate mt-0.5">{sample.role}</p>
                  <p className="text-[11px] text-slate-500 mt-1">{sample.level}</p>
                </div>

                <div className="flex items-center gap-1.5 pt-2 border-t border-slate-800/70">
                  <button
                    type="button"
                    onClick={() => {
                      const visualUrl = generateVisualResumeDataUrl(sample);
                      onInstantSampleSelect(sample, visualUrl);
                    }}
                    className="flex-1 py-1.5 px-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-[11px] font-semibold flex items-center justify-center gap-1 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                    title="Open Instant ATS Report (<0.3s)"
                  >
                    <Zap className="w-3 h-3" />
                    <span>Instant Audit</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleLoadSampleIntoWorkspace(sample)}
                    className="py-1.5 px-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-white text-[11px] font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                    title="Load into editor to inspect or run live scan"
                  >
                    Load
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Main Analyzer Input Workbench */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl relative">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* 3-Tab Input Mode Switcher */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-3">
            <div className="flex items-center gap-1 p-1 bg-slate-950 rounded-xl border border-slate-800 overflow-x-auto max-w-full">
              <button
                type="button"
                onClick={() => {
                  setActiveTab('upload');
                  stopCamera();
                  setUploadError(null);
                }}
                className={`flex items-center gap-2 px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  activeTab === 'upload'
                    ? 'bg-indigo-600 text-white'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Upload className="w-4 h-4" />
                <span>Upload File (PDF, DOCX, Photo, All Types)</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setActiveTab('photo');
                  setUploadError(null);
                }}
                className={`flex items-center gap-2 px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  activeTab === 'photo'
                    ? 'bg-indigo-600 text-white'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Camera className="w-4 h-4" />
                <span>Photo / Camera Scan</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setActiveTab('paste');
                  stopCamera();
                  setUploadError(null);
                }}
                className={`flex items-center gap-2 px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  activeTab === 'paste'
                    ? 'bg-indigo-600 text-white'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <FileText className="w-4 h-4" />
                <span>Paste / Edit Resume Text</span>
              </button>
            </div>

            <div className="text-xs text-slate-400 flex items-center gap-1.5 font-mono tabular-nums">
              <Clock className="w-3.5 h-3.5 text-emerald-400" />
              <span>Avg Scan Time: 4–8 sec</span>
            </div>
          </div>

          {/* TAB 1: Universal File Upload */}
          {activeTab === 'upload' && (
            <div className="space-y-4">
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
                    : 'border-slate-700 hover:border-slate-600 bg-slate-950/60 hover:bg-slate-950'
                }`}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,.doc,.docx,.txt,.md,.markdown,.rtf,.odt,.html,.htm,.json,.csv,.tex,.xml,image/*,.png,.jpg,.jpeg,.webp,.gif,.bmp,.heic,.tiff"
                  className="hidden"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      handleFileProcess(e.target.files[0]);
                    }
                  }}
                />

                {isCompressing ? (
                  <div className="flex flex-col items-center py-4">
                    <div className="w-8 h-8 border-2 border-indigo-400 border-t-transparent rounded-full animate-spin mb-3" />
                    <span className="text-sm font-semibold text-white">
                      Optimizing high-resolution image for fast OCR...
                    </span>
                  </div>
                ) : file ? (
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-left">
                    {previewImageUrl ? (
                      <img
                        src={previewImageUrl}
                        alt="Uploaded resume visual preview"
                        referrerPolicy="no-referrer"
                        className="w-24 h-32 object-cover rounded-lg border border-slate-700 shadow-md shrink-0"
                      />
                    ) : (
                      <div className="w-14 h-14 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
                        <Check className="w-7 h-7" />
                      </div>
                    )}
                    <div>
                      <div className="text-xs text-emerald-400 font-medium mb-0.5">
                        {detectedFileBadge || 'Document Ready for Analysis'}
                      </div>
                      <span className="font-bold text-white text-base block">{file.name}</span>
                      <span className="text-xs text-slate-400 font-mono tabular-nums block mt-0.5">
                        {file.size > 0 ? `${(file.size / 1024).toFixed(1)} KB · ` : ''}
                        Multimodal Vision & Text Parser Ready
                      </span>
                      <div className="flex items-center gap-3 mt-3">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            fileInputRef.current?.click();
                          }}
                          className="text-xs px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium cursor-pointer"
                        >
                          Replace File
                        </button>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setFile(null);
                            setFileBase64(null);
                            setFileMimeType(null);
                            setPreviewImageUrl(null);
                            setDetectedFileBadge(null);
                          }}
                          className="text-xs text-rose-400 hover:text-rose-300 flex items-center gap-1 cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Remove</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-3">
                      <FileUp className="w-6 h-6" />
                    </div>
                    <p className="text-sm sm:text-base font-semibold text-white">
                      Drag & drop your resume here, <span className="text-indigo-400 underline">browse files</span>, or press <kbd className="px-1.5 py-0.5 text-xs font-mono bg-slate-800 border border-slate-700 rounded">Ctrl+V</kbd> to paste a screenshot
                    </p>
                    <p className="text-xs text-slate-400 mt-1.5 max-w-xl">
                      All formats supported: <strong>PDF</strong> (.pdf), <strong>Photos & Images</strong> (.jpg, .png, .webp, .heic), <strong>Word</strong> (.docx, .doc, .rtf), <strong>Text & Code</strong> (.txt, .md, .html, .json, .csv)
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 2: Photo / Camera & Screenshot Scanner */}
          {activeTab === 'photo' && (
            <div className="space-y-4">
              <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h3 className="text-sm font-bold text-white flex items-center gap-2">
                      <Camera className="w-4 h-4 text-indigo-400" />
                      <span>Photo & Camera Resume OCR Scanner</span>
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Upload a phone photo of a printed resume, paste a screenshot (Ctrl+V), or capture via camera.
                    </p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={() => photoInputRef.current?.click()}
                      className="px-3.5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
                    >
                      <ImageIcon className="w-3.5 h-3.5" />
                      <span>Upload Photo (.JPG / .PNG / .WEBP)</span>
                    </button>

                    {!cameraActive ? (
                      <button
                        type="button"
                        onClick={startCamera}
                        className="px-3.5 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 text-xs font-medium flex items-center gap-1.5 cursor-pointer"
                      >
                        <Video className="w-3.5 h-3.5 text-cyan-400" />
                        <span>Use Camera</span>
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={stopCamera}
                        className="px-3 py-2 rounded-lg bg-rose-950/60 border border-rose-800 text-rose-300 text-xs font-medium flex items-center gap-1 cursor-pointer"
                      >
                        <X className="w-3.5 h-3.5" />
                        <span>Close Camera</span>
                      </button>
                    )}
                  </div>
                </div>

                <input
                  ref={photoInputRef}
                  type="file"
                  accept="image/*,.png,.jpg,.jpeg,.webp,.gif,.bmp,.heic,.tiff"
                  capture="environment"
                  className="hidden"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      handleFileProcess(e.target.files[0]);
                    }
                  }}
                />

                {/* Active Webcam View */}
                {cameraActive && (
                  <div className="relative rounded-xl overflow-hidden border border-slate-700 bg-black max-w-lg mx-auto">
                    <video
                      ref={videoRef}
                      autoPlay
                      playsInline
                      muted
                      className="w-full h-72 object-cover"
                    />
                    <div className="p-3 bg-slate-900/90 flex items-center justify-between">
                      <span className="text-xs text-slate-300">
                        Position paper resume clearly in frame
                      </span>
                      <button
                        type="button"
                        onClick={captureCameraPhoto}
                        className="px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold cursor-pointer"
                      >
                        Snap Resume Photo
                      </button>
                    </div>
                  </div>
                )}

                {/* Photo Preview if loaded */}
                {previewImageUrl && (
                  <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 flex flex-col sm:flex-row items-center gap-5">
                    <img
                      src={previewImageUrl}
                      alt="Resume photo scan preview"
                      referrerPolicy="no-referrer"
                      className="w-32 h-44 object-cover rounded-lg border border-slate-700 shadow-lg shrink-0"
                    />
                    <div className="space-y-2 flex-1">
                      <div className="text-xs text-emerald-400 font-medium">
                        {detectedFileBadge || 'Photo Scan Loaded & Optimized'}
                      </div>
                      <h4 className="text-sm font-bold text-white">
                        {file?.name || 'Visual Resume Scan'}
                      </h4>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        Image automatically compressed and contrast-normalized so Gemini Vision OCR extracts every section, bullet, and layout cue in under 6 seconds.
                      </p>
                      <div className="flex items-center gap-3 pt-1">
                        <button
                          type="button"
                          onClick={() => photoInputRef.current?.click()}
                          className="text-xs px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium cursor-pointer"
                        >
                          Upload Different Photo
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setFile(null);
                            setFileBase64(null);
                            setFileMimeType(null);
                            setPreviewImageUrl(null);
                          }}
                          className="text-xs text-rose-400 hover:underline cursor-pointer"
                        >
                          Clear Photo
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* 1-Click Sample Photo Resumes */}
                <div className="pt-2 border-t border-slate-800/80 flex flex-wrap items-center gap-2">
                  <span className="text-xs text-slate-400 mr-1">
                    Or test with a Sample Camera-Scanned Photo Resume:
                  </span>
                  {SAMPLE_RESUMES.filter((s) => s.formatType === 'photo').map((photoSample) => (
                    <button
                      key={photoSample.id}
                      type="button"
                      onClick={() => handleLoadSampleIntoWorkspace(photoSample)}
                      className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs text-slate-200 hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Camera className="w-3 h-3 text-amber-400" />
                      <span>{photoSample.name}</span>
                      <span className="text-slate-500">({photoSample.formatBadge})</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: Paste / Edit Resume Text */}
          {activeTab === 'paste' && (
            <div className="space-y-3">
              <div className="flex flex-wrap justify-between items-center gap-2 text-xs text-slate-400">
                <label className="font-semibold text-slate-200">
                  Resume Plain Text or Markdown
                </label>
                <div className="flex items-center gap-3 font-mono tabular-nums">
                  <span>{wordCount} words</span>
                  <span aria-hidden="true">·</span>
                  <span>{bulletCount} bullets</span>
                  <span aria-hidden="true">·</span>
                  <span className={metricMatches >= 5 ? 'text-emerald-400' : 'text-amber-400'}>
                    {metricMatches} quantified metrics detected
                  </span>
                </div>
              </div>
              <textarea
                value={resumeText}
                onChange={(e) => setResumeText(e.target.value)}
                placeholder="Paste the full text of your resume here (Header, Summary, Work Experience, Skills, Education)..."
                rows={10}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl p-4 text-xs sm:text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500 font-mono transition-colors resize-y"
              />
            </div>
          )}

          {/* Target Job Details Accordion */}
          <div className="border border-slate-800 rounded-xl bg-slate-950/60 overflow-hidden">
            <button
              type="button"
              onClick={() => setShowJobDetails(!showJobDetails)}
              className="w-full flex items-center justify-between p-4 text-left hover:bg-slate-900/50 transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-2.5">
                <Briefcase className="w-4 h-4 text-indigo-400" />
                <div>
                  <span className="text-sm font-semibold text-slate-200">
                    Target Job Description & Seniority Calibration
                  </span>
                  <span className="text-xs text-slate-400 block sm:inline sm:ml-2">
                    (Optional — enables exact Keyword Gap Matrix & JD Match %)
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
              <div className="p-4 pt-3 space-y-4 border-t border-slate-800/80">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-medium text-slate-400 mb-1">
                      Target Job Title / Role
                    </label>
                    <input
                      type="text"
                      value={jobTitle}
                      onChange={(e) => setJobTitle(e.target.value)}
                      placeholder="e.g. Principal Java Architect / Senior Full Stack Engineer"
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
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
                      <option value="Lead">Lead / Staff / Principal (8+ YOE)</option>
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
                    placeholder="Paste the target job description here to compare required skills, tools, and compliance keywords..."
                    rows={3}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-xs sm:text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500 font-mono transition-colors"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Error Alert */}
          {uploadError && (
            <div className="p-3.5 rounded-xl bg-rose-950/40 border border-rose-800/60 flex items-center gap-2.5 text-xs text-rose-200">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
              <span>{uploadError}</span>
            </div>
          )}

          {/* Live Multi-Stage Progress Tracker when Scanning */}
          {isLoading && (
            <div className="p-5 rounded-xl bg-slate-950 border border-indigo-500/40 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-4 h-4 border-2 border-indigo-400 border-t-transparent rounded-full animate-spin" />
                  <span className="text-sm font-bold text-white">
                    Turbo ATS & Multimodal Audit in Progress...
                  </span>
                </div>
                <span className="text-sm font-mono tabular-nums font-bold text-indigo-400">
                  {elapsedSeconds.toFixed(1)}s
                </span>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-indigo-500 rounded-full transition-all duration-300"
                  style={{
                    width: `${Math.min(95, Math.max(12, (elapsedSeconds / 7) * 100))}%`,
                  }}
                />
              </div>

              {/* 3 Pipeline Stages */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                {[
                  '1. Document & Vision OCR Parse',
                  '2. 5-Dimension ATS & Keyword Audit',
                  '3. Google XYZ Bullet Synthesis',
                ].map((stageLabel, idx) => {
                  const currentStage = getCurrentStageIndex();
                  const isDone = currentStage > idx;
                  const isCurrent = currentStage === idx;
                  return (
                    <div
                      key={stageLabel}
                      className={`p-2.5 rounded-lg border flex items-center gap-2 ${
                        isDone
                          ? 'bg-emerald-950/20 border-emerald-800/40 text-emerald-300'
                          : isCurrent
                          ? 'bg-indigo-950/30 border-indigo-500/40 text-white font-semibold'
                          : 'bg-slate-900/50 border-slate-800 text-slate-500'
                      }`}
                    >
                      <Check
                        className={`w-3.5 h-3.5 shrink-0 ${
                          isDone ? 'text-emerald-400' : isCurrent ? 'text-indigo-400' : 'text-slate-600'
                        }`}
                      />
                      <span className="truncate">{stageLabel}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Submit CTA */}
          <div>
            <button
              type="submit"
              disabled={isLoading || isCompressing}
              className={`w-full py-3.5 px-6 rounded-xl font-bold text-sm tracking-wide flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer ${
                isLoading || isCompressing
                  ? 'bg-slate-800 text-slate-400 cursor-not-allowed border border-slate-700'
                  : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-600/20 active:scale-[0.99]'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>
                {isLoading
                  ? `Analyzing Resume (${elapsedSeconds.toFixed(1)}s)...`
                  : 'Run Turbo ATS Audit & Score Resume (<10s)'}
              </span>
            </button>
          </div>
        </form>
      </div>

      {/* Supported Formats & XYZ Methodology Reference Strip */}
      <div
        id="supported-formats"
        className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2"
      >
        <div className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1.5">
          <div className="text-xs font-semibold text-indigo-400">
            01. Universal Document & Photo Support
          </div>
          <h3 className="text-sm font-bold text-white">
            PDF, Camera Photos, DOCX & Plain Text
          </h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Native support for PDF files, camera-scanned photos (.jpg, .png, .webp, .heic), Word documents (.docx, .rtf), Markdown, HTML, JSON, and clipboard screenshots.
          </p>
        </div>

        <div className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1.5">
          <div className="text-xs font-semibold text-emerald-400">
            02. Sub-10s Low-Latency AI Pipeline
          </div>
          <h3 className="text-sm font-bold text-white">
            Client Image Compression + Fast Inference
          </h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            High-resolution camera photos are automatically normalized on the client and processed with low-latency Gemini inference to deliver full audits in 4–8 seconds.
          </p>
        </div>

        <div
          id="xyz-methodology"
          className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1.5"
        >
          <div className="text-xs font-semibold text-cyan-400">
            03. Google XYZ Impact Calibration
          </div>
          <h3 className="text-sm font-bold text-white">
            Accomplished [X] as Measured by [Y] via [Z]
          </h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Automatically detects passive phrasing ("Worked on", "Responsible for") and rewrites bullets with concrete ROI, latency, and leadership metrics.
          </p>
        </div>
      </div>
    </div>
  );
};
