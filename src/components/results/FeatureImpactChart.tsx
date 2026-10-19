import React from 'react';
import { Sparkles, Sun, Check, HeartHandshake } from 'lucide-react';
import { FactorContribution } from '../../types/assessment';

interface FeatureImpactChartProps {
  factors: FactorContribution[];
}

export const FeatureImpactChart: React.FC<FeatureImpactChartProps> = ({ factors }) => {
  const energyDrainers = factors.filter((f) => f.type === 'risk_increaser');
  const energyGivers = factors.filter((f) => f.type === 'protective');

  return (
    <div className="wellness-card p-6 sm:p-8 bg-white space-y-6">
      <div>
        <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-forest-700 bg-sage-100 px-3 py-1 rounded-full border border-sage-200 inline-block mb-1.5">
          <Sparkles className="w-3.5 h-3.5 inline mr-1" />
          <span>Understanding Your Responses</span>
        </div>
        <h3 className="text-xl font-bold font-display text-forest-950">
          What is recharging you vs. what is draining your battery
        </h3>
        <p className="text-xs sm:text-sm text-forest-700 mt-1 leading-relaxed">
          Here is a simple look at the habits supporting your daily energy, alongside routines that might be creating extra fatigue.
        </p>
      </div>

      <div className="space-y-6">
        {/* Energy Draining Habits */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-clay-600 uppercase tracking-wider">
            <Sun className="w-4 h-4 text-clay-500" />
            <span>Habits taking extra energy</span>
          </div>

          {energyDrainers.length === 0 ? (
            <div className="p-4 rounded-2xl bg-sage-50 text-xs text-forest-700 italic border border-sage-200">
              No significant daily energy drainers detected in your check-in!
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-3">
              {energyDrainers.map((factor, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-cream-50 border border-sand-200 space-y-1.5"
                >
                  <div className="flex items-start justify-between gap-3 text-xs">
                    <div>
                      <span className="font-bold text-forest-950 text-sm">{factor.featureName}</span>
                      <span className="ml-2 text-[10px] px-2 py-0.5 rounded-full bg-sand-200 text-forest-700 font-semibold">
                        {factor.category}
                      </span>
                    </div>
                    <span className="text-xs text-clay-600 font-bold bg-clay-100 px-2 py-0.5 rounded-lg shrink-0">
                      Takes Energy
                    </span>
                  </div>
                  <p className="text-xs text-forest-700 leading-relaxed">
                    {factor.explanation}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Energy Supporting Habits */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center gap-2 text-xs font-bold text-forest-800 uppercase tracking-wider">
            <Check className="w-4 h-4 text-forest-600 stroke-[3]" />
            <span>Strengths supporting your wellbeing</span>
          </div>

          {energyGivers.length === 0 ? (
            <div className="p-4 rounded-2xl bg-sand-50 text-xs text-forest-700 italic border border-sand-200">
              Adding a few consistent sleep hours or short campus walks will give you instant energy buffers.
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-3">
              {energyGivers.map((factor, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-sage-50/70 border border-sage-200 space-y-1.5"
                >
                  <div className="flex items-start justify-between gap-3 text-xs">
                    <div>
                      <span className="font-bold text-forest-950 text-sm">{factor.featureName}</span>
                      <span className="ml-2 text-[10px] px-2 py-0.5 rounded-full bg-sage-200 text-forest-800 font-semibold">
                        {factor.category}
                      </span>
                    </div>
                    <span className="text-xs text-forest-800 font-bold bg-sage-200 px-2 py-0.5 rounded-lg shrink-0">
                      Recharges You
                    </span>
                  </div>
                  <p className="text-xs text-forest-700 leading-relaxed">
                    {factor.explanation}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="p-4 rounded-2xl bg-sand-50 border border-sand-200 text-xs text-forest-700 flex items-start gap-3">
        <HeartHandshake className="w-4 h-4 text-forest-600 shrink-0 mt-0.5" />
        <span>
          <strong>How this reflection works:</strong> Instead of hiding behind an opaque number, EarlyCare breaks down the specific routines you shared so you can pick one small, manageable habit to improve at your own pace.
        </span>
      </div>
    </div>
  );
};
