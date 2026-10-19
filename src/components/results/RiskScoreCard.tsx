import React from 'react';
import { Heart, Sparkles, Smile, Coffee, Sun } from 'lucide-react';
import { AssessmentResult } from '../../types/assessment';

interface RiskScoreCardProps {
  result: AssessmentResult;
}

export const RiskScoreCard: React.FC<RiskScoreCardProps> = ({ result }) => {
  const isElevated = result.overallRiskTier === 'elevated';
  const isModerate = result.overallRiskTier === 'moderate';

  const tierTitle = isElevated
    ? 'Heavy Study Fatigue'
    : isModerate
    ? 'Moderate Energy Strain'
    : 'Balanced & Steady';

  const tierMessage = isElevated
    ? 'Your check-in reflects elevated day-to-day strain, likely from short sleep, intense screen hours, or academic deadlines. Carving out small moments for recovery will help recharge your battery.'
    : isModerate
    ? 'You have some great grounding habits, but a few routines — like long unbroken desk sitting or late-night scrolling — are taking extra energy. A few small tweaks can make studying feel lighter.'
    : 'You have built dependable daily rhythms of sleep, movement, and hydration. These steady habits serve as a strong protective buffer during busy college weeks.';

  return (
    <div className="wellness-card p-6 sm:p-10 bg-white relative overflow-hidden">
      {/* Subtle organic background glow */}
      <div
        className={`absolute top-0 right-0 w-80 h-80 rounded-full blur-3xl -z-10 pointer-events-none opacity-30 ${
          isElevated ? 'bg-clay-100' : isModerate ? 'bg-honey-100' : 'bg-sage-100'
        }`}
      />

      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 sm:gap-8">
        {/* Left Side: Friendly narrative */}
        <div className="space-y-3.5 max-w-2xl">
          <div className="flex items-center gap-2.5 flex-wrap">
            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                isElevated
                  ? 'bg-clay-100 text-clay-600 border border-clay-200'
                  : isModerate
                  ? 'bg-honey-100 text-honey-600 border border-honey-200'
                  : 'bg-sage-100 text-forest-800 border border-sage-200'
              }`}
            >
              {isElevated ? (
                <Coffee className="w-3.5 h-3.5" />
              ) : isModerate ? (
                <Sun className="w-3.5 h-3.5" />
              ) : (
                <Smile className="w-3.5 h-3.5" />
              )}
              {tierTitle}
            </span>
            <span className="text-xs text-forest-500 font-medium">
              Check-In #{result.id} • {result.timestamp}
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-display font-bold text-forest-950 leading-snug">
            Your Daily Wellness Reflection
          </h2>

          <p className="text-sm sm:text-base text-forest-800/90 leading-relaxed">
            {tierMessage}
          </p>

          <div className="flex items-center gap-4 text-xs text-forest-600 pt-1 flex-wrap">
            <span className="flex items-center gap-1.5 font-medium text-forest-700">
              <Sparkles className="w-3.5 h-3.5 text-forest-600" /> Illustrative Heuristic Output
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Heart className="w-3.5 h-3.5 text-forest-600 fill-forest-600/20" /> Supportive Educational Check-In
            </span>
          </div>
        </div>

        {/* Right Side: Simple, friendly balance meter */}
        <div className="w-full lg:w-72 p-5 rounded-2xl bg-cream-50/80 border border-sand-200 shrink-0 space-y-3">
          <div className="flex justify-between items-center text-xs">
            <span className="font-bold text-forest-900">Lifestyle Balance Index</span>
            <span className="font-bold text-forest-800 font-mono text-sm">{result.overallScore} / 100</span>
          </div>

          {/* Gentle progress bar */}
          <div className="w-full h-3 rounded-full bg-sand-200 overflow-hidden flex">
            <div
              className={`h-full rounded-full transition-all duration-700 ${
                isElevated
                  ? 'bg-clay-500'
                  : isModerate
                  ? 'bg-honey-500'
                  : 'bg-forest-600'
              }`}
              style={{ width: `${Math.min(100, Math.max(10, result.overallScore))}%` }}
            />
          </div>

          <div className="flex justify-between text-[11px] text-forest-600 font-medium pt-0.5">
            <span className="text-forest-700">Steady Balance</span>
            <span>Moderate Strain</span>
            <span className="text-clay-600">High Fatigue</span>
          </div>
        </div>
      </div>
    </div>
  );
};
