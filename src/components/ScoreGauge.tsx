import React from 'react';
import { ResumeAnalysis } from '../types/resume';
import { ShieldCheck, AlertTriangle, Zap, CheckCircle2, TrendingUp, Info } from 'lucide-react';

interface ScoreGaugeProps {
  analysis: ResumeAnalysis;
}

export const ScoreGauge: React.FC<ScoreGaugeProps> = ({ analysis }) => {
  const { overallScore, scoreLabel, categoryScores, executiveSummary, candidateName, detectedRole, targetRoleMatch } = analysis;

  // Gauge parameters
  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (overallScore / 100) * circumference;

  const getScoreTheme = (score: number) => {
    if (score >= 85) {
      return {
        stroke: '#10b981', // emerald-500
        text: 'text-emerald-400',
        bg: 'bg-emerald-500/10',
        border: 'border-emerald-500/30',
        gradient: 'from-emerald-500 to-teal-400',
        verdict: 'Interview Ready',
        description: 'Strong ATS compliance and compelling impact verbs. Ready for high-volume applications.',
      };
    }
    if (score >= 70) {
      return {
        stroke: '#3b82f6', // blue-500
        text: 'text-blue-400',
        bg: 'bg-blue-500/10',
        border: 'border-blue-500/30',
        gradient: 'from-blue-500 to-cyan-400',
        verdict: 'Competitive with Room for Growth',
        description: 'Passes basic ATS screening, but lacks sharp metrics to stand out among top 10% applicants.',
      };
    }
    if (score >= 55) {
      return {
        stroke: '#f59e0b', // amber-500
        text: 'text-amber-400',
        bg: 'bg-amber-500/10',
        border: 'border-amber-500/30',
        gradient: 'from-amber-500 to-yellow-400',
        verdict: 'Needs Strategic Optimization',
        description: 'Vulnerable to ATS keyword filters or vague bullet points. Review the critical fixes below.',
      };
    }
    return {
      stroke: '#ef4444', // red-500
      text: 'text-rose-400',
      bg: 'bg-rose-500/10',
      border: 'border-rose-500/30',
      gradient: 'from-rose-500 to-red-400',
      verdict: 'High ATS Rejection Risk',
      description: 'Major structural or content gaps detected. High probability of getting screened out automatically.',
    };
  };

  const theme = getScoreTheme(overallScore);

  const categories = [
    { label: 'ATS Parsability', data: categoryScores?.atsParsability, weight: '25%' },
    { label: 'Quantifiable Metrics', data: categoryScores?.quantifiableImpact, weight: '25%' },
    { label: 'Action Verbs', data: categoryScores?.actionVerbs, weight: '15%' },
    { label: 'Keyword Alignment', data: categoryScores?.keywordMatch, weight: '20%' },
    { label: 'Formatting & Brevity', data: categoryScores?.formattingReadability, weight: '15%' },
  ];

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 lg:p-8 backdrop-blur-md shadow-xl relative overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header Info */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
            <ShieldCheck className="w-4 h-4 text-indigo-400" />
            <span>ATS Audit Report</span>
            <span className="text-slate-600">•</span>
            <span className="text-indigo-400 font-mono text-[10px]">TEAM MOSHDI LOADING......</span>
            <span className="text-slate-600">•</span>
            <span className="text-cyan-400 normal-case font-medium text-[11px] bg-cyan-950/40 px-2 py-0.5 rounded-full border border-cyan-800/40">
              Designed by Shivam Kumar
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            {candidateName || 'Candidate Profile'}
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Detected Role: <span className="text-slate-200 font-medium">{detectedRole || 'Professional'}</span>
            {targetRoleMatch && (
              <span className="block sm:inline sm:before:content-['•'] sm:before:mx-2 text-indigo-300">
                {targetRoleMatch}
              </span>
            )}
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <span className={`px-3 py-1 rounded-full text-xs font-bold border ${theme.bg} ${theme.text} ${theme.border}`}>
            {scoreLabel}
          </span>
          <span className="px-3 py-1 rounded-full text-xs font-medium bg-slate-800 text-slate-300 border border-slate-700">
            {theme.verdict}
          </span>
        </div>
      </div>

      {/* Main Score & Breakdown Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-6">
        {/* Radial ATS Gauge */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center text-center">
          <div className="relative w-52 h-52 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 200 200">
              {/* Background ring */}
              <circle
                cx="100"
                cy="100"
                r={radius}
                stroke="#1e293b"
                strokeWidth="16"
                fill="transparent"
              />
              {/* Active filled ring */}
              <circle
                cx="100"
                cy="100"
                r={radius}
                stroke={theme.stroke}
                strokeWidth="16"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                fill="transparent"
                style={{
                  transition: 'stroke-dashoffset 1.2s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
              />
            </svg>

            <div className="absolute flex flex-col items-center justify-center">
              <span className="text-5xl font-black text-white tracking-tight">
                {overallScore}
              </span>
              <span className="text-xs uppercase font-semibold text-slate-400 tracking-wider">
                out of 100
              </span>
              <span className={`text-xs font-bold mt-1 ${theme.text}`}>
                {scoreLabel}
              </span>
            </div>
          </div>

          <p className="text-xs text-slate-400 max-w-xs mt-3 leading-relaxed">
            {theme.description}
          </p>
        </div>

        {/* Category Progress Bars */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-400">
            <span>ATS Core Evaluation Dimensions</span>
            <span>Target: 80+</span>
          </div>

          <div className="space-y-3">
            {categories.map((cat, i) => {
              const score = cat.data?.score ?? 70;
              const barColor =
                score >= 80 ? 'bg-emerald-500' : score >= 65 ? 'bg-blue-500' : score >= 50 ? 'bg-amber-500' : 'bg-rose-500';

              return (
                <div key={i} className="bg-slate-950/60 p-3 rounded-xl border border-slate-800/80">
                  <div className="flex justify-between items-center text-xs mb-1.5">
                    <span className="font-medium text-slate-200">{cat.label}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] text-slate-400">{cat.data?.status || 'normal'}</span>
                      <span className="font-bold text-white text-xs">{score}/100</span>
                    </div>
                  </div>
                  {/* Progress bar */}
                  <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${barColor} rounded-full transition-all duration-1000`}
                      style={{ width: `${Math.min(100, Math.max(0, score))}%` }}
                    />
                  </div>
                  {cat.data?.feedback && (
                    <p className="text-[11px] text-slate-400 mt-1.5 leading-snug">
                      {cat.data.feedback}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Recruiter Executive Summary */}
      {executiveSummary && (
        <div className="mt-6 p-4 rounded-xl bg-indigo-950/30 border border-indigo-900/40 text-slate-200">
          <div className="flex items-start gap-2.5">
            <Info className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
            <div>
              <h2 className="text-xs font-bold text-indigo-300 uppercase tracking-wider mb-1">
                Recruiter First Impression (6-Second Scan)
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed font-normal">
                "{executiveSummary}"
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
