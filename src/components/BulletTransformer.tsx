import React, { useState } from 'react';
import { BulletEnhancement } from '../types/resume';
import { ArrowRight, Copy, Check, Sparkles, Wand2, Lightbulb, RefreshCw, Send } from 'lucide-react';

interface BulletTransformerProps {
  bullets: BulletEnhancement[];
  targetRole?: string;
}

interface CustomRewriteOption {
  type: string;
  rewritten: string;
  whyItWorks: string;
}

export const BulletTransformer: React.FC<BulletTransformerProps> = ({ bullets, targetRole }) => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [copiedCustomIndex, setCopiedCustomIndex] = useState<number | null>(null);

  const [customInput, setCustomInput] = useState('');
  const [isRewriting, setIsRewriting] = useState(false);
  const [customOptions, setCustomOptions] = useState<CustomRewriteOption[] | null>(null);
  const [customError, setCustomError] = useState<string | null>(null);

  const handleCopy = (text: string, index: number, isCustom = false) => {
    navigator.clipboard.writeText(text);
    if (isCustom) {
      setCopiedCustomIndex(index);
      setTimeout(() => setCopiedCustomIndex(null), 2000);
    } else {
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    }
  };

  const handleLiveRewrite = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customInput.trim()) return;

    setIsRewriting(true);
    setCustomError(null);
    setCustomOptions(null);

    try {
      const res = await fetch('/api/rewrite-bullet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          bullet: customInput.trim(),
          targetRole: targetRole || 'Professional',
        }),
      });

      if (!res.ok) {
        throw new Error('Failed to generate rewrites');
      }

      const data = await res.json();
      setCustomOptions(data.options || []);
    } catch (err: any) {
      setCustomError(err.message || 'Error rewriting bullet');
    } finally {
      setIsRewriting(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Educational Banner: Google XYZ Framework */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
        <div className="flex items-start gap-4">
          <div className="p-2.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 shrink-0">
            <Lightbulb className="w-5 h-5" />
          </div>
          <div className="space-y-2">
            <h3 className="text-base font-bold text-white">
              The Google "XYZ" Formula for High-Converting Bullets
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Top recruiters evaluate bullets using Laszlo Bock's impact formula:
              <span className="block font-mono text-xs sm:text-sm text-indigo-200 mt-2 bg-slate-950 p-3 rounded-lg border border-slate-800">
                "Accomplished <span className="text-emerald-400 font-bold">[X]</span>, as measured by{' '}
                <span className="text-cyan-400 font-bold">[Y]</span>, by doing{' '}
                <span className="text-indigo-400 font-bold">[Z]</span>."
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* Detected Weak Bullets vs AI Enhancements */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-indigo-400" />
            <span>Detected Weak Bullets vs. XYZ Upgrades</span>
          </h3>
          <span className="text-xs text-slate-400 font-mono tabular-nums">
            {bullets.length} transformations
          </span>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {bullets.map((item, idx) => (
            <div
              key={idx}
              className="bg-slate-900 border border-slate-800 rounded-xl p-5 hover:border-slate-700 transition-all"
            >
              <div className="flex items-center justify-between gap-2 mb-3">
                <div className="text-xs text-indigo-400 font-semibold">
                  {item.impactCategory || 'Impact & ROI Upgrade'} · Bullet #{idx + 1}
                </div>
                <button
                  type="button"
                  onClick={() => handleCopy(item.improved, idx)}
                  className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-indigo-600/20 text-indigo-300 hover:bg-indigo-600/30 border border-indigo-500/30 transition-colors cursor-pointer"
                >
                  {copiedIndex === idx ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Enhanced</span>
                    </>
                  )}
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                  <div className="text-xs font-semibold text-rose-400 mb-1.5">
                    Original (Passive / Unquantified)
                  </div>
                  <p className="text-xs sm:text-sm text-slate-400 font-mono leading-relaxed">
                    "{item.original}"
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950 border border-indigo-500/30">
                  <div className="text-xs font-semibold text-emerald-400 mb-1.5">
                    Google XYZ Upgrade (Quantified & Active)
                  </div>
                  <p className="text-xs sm:text-sm text-slate-100 font-medium leading-relaxed">
                    "{item.improved}"
                  </p>
                </div>
              </div>

              {item.explanation && (
                <div className="mt-3 text-xs text-slate-400 flex items-start gap-1.5 pt-2.5 border-t border-slate-800/80">
                  <ArrowRight className="w-3.5 h-3.5 text-indigo-400 shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-slate-300">Why this converts:</strong> {item.explanation}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Custom Bullet Rewriter Box */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
        <div className="flex items-center gap-2 mb-1.5">
          <Wand2 className="w-5 h-5 text-indigo-400" />
          <h3 className="text-base font-bold text-white">Live Instant Bullet Point Rewriter</h3>
        </div>
        <p className="text-xs text-slate-400 mb-4">
          Paste any individual bullet point from your resume to generate 3 tailored versions (Metrics, Leadership, Technical) in ~3 seconds.
        </p>

        <form onSubmit={handleLiveRewrite} className="space-y-3">
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              value={customInput}
              onChange={(e) => setCustomInput(e.target.value)}
              placeholder="e.g. Worked on database queries to make the website load faster..."
              className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500 font-mono"
            />
            <button
              type="submit"
              disabled={isRewriting || !customInput.trim()}
              className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-800 disabled:text-slate-500 text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer shrink-0"
            >
              {isRewriting ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Rewriting...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Rewrite Bullet</span>
                </>
              )}
            </button>
          </div>
        </form>

        {customError && <p className="text-xs text-rose-400 mt-2">{customError}</p>}

        {customOptions && (
          <div className="mt-5 space-y-3 pt-4 border-t border-slate-800">
            <h4 className="text-xs font-semibold text-slate-300">
              3 High-Conversion Variations:
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {customOptions.map((opt, i) => (
                <div
                  key={i}
                  className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col justify-between"
                >
                  <div>
                    <div className="text-xs font-semibold text-indigo-400">
                      {opt.type}
                    </div>
                    <p className="text-xs text-slate-200 font-medium mt-2 leading-relaxed">
                      "{opt.rewritten}"
                    </p>
                    <p className="text-[11px] text-slate-400 mt-2 leading-snug">
                      {opt.whyItWorks}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCopy(opt.rewritten, i, true)}
                    className="mt-3 flex items-center justify-center gap-1.5 w-full py-1.5 text-xs font-semibold rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 transition-colors cursor-pointer"
                  >
                    {copiedCustomIndex === i ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Bullet</span>
                      </>
                    )}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
