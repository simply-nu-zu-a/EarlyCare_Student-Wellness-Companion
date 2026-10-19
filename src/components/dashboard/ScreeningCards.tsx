import React from 'react';
import { Moon, Activity, Droplets, Brain, Sparkles, Check } from 'lucide-react';
import { SCREENING_CATEGORIES } from '../../mock/screeningCategories';

const ICON_MAP: Record<string, React.ReactNode> = {
  Moon: <Moon className="w-5 h-5" />,
  Activity: <Activity className="w-5 h-5" />,
  Droplets: <Droplets className="w-5 h-5" />,
  Brain: <Brain className="w-5 h-5" />
};

export const ScreeningCards: React.FC = () => {
  return (
    <section className="space-y-8">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-forest-700 bg-sage-100 px-3 py-1 rounded-full border border-sage-200 inline-block">
          The Four Pillars
        </span>
        <h2 className="font-display text-2xl sm:text-3xl font-bold text-forest-950">
          Four areas of your daily student life
        </h2>
        <p className="text-sm text-forest-700 leading-relaxed">
          EarlyCare looks at how your day-to-day habits connect together. When one pillar is out of rhythm, small tweaks can restore your natural momentum.
        </p>
      </div>

      {/* Visually Distinct Pillar Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
        {SCREENING_CATEGORIES.map((cat) => {
          const isSleep = cat.id === 'sleep';
          const isMovement = cat.id === 'activity';
          const isNutrition = cat.id === 'nutrition';

          const cardBg = isSleep
            ? 'bg-gradient-to-br from-cream-50 to-sage-50/50 border-sage-200'
            : isMovement
            ? 'bg-gradient-to-br from-cream-50 to-forest-50/50 border-forest-200/80'
            : isNutrition
            ? 'bg-gradient-to-br from-cream-50 to-honey-100/30 border-honey-200'
            : 'bg-gradient-to-br from-cream-50 to-clay-100/30 border-clay-200';

          return (
            <div
              key={cat.id}
              className={`rounded-3xl p-6 sm:p-7 border transition-all duration-200 hover:shadow-md flex flex-col justify-between ${cardBg}`}
            >
              <div className="space-y-4">
                {/* Header with pill badge */}
                <div className="flex items-center gap-3.5">
                  <div
                    className="w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 shadow-2xs"
                    style={{
                      backgroundColor: cat.colorScheme.bgBadge,
                      color: cat.colorScheme.accent
                    }}
                  >
                    {ICON_MAP[cat.iconName]}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-forest-950">
                      {cat.title}
                    </h3>
                    <p className="text-xs text-forest-600">{cat.studentContext}</p>
                  </div>
                </div>

                <p className="text-sm text-forest-800/90 leading-relaxed">
                  {cat.shortDescription}
                </p>

                {/* Micro-metrics */}
                <div className="pt-2">
                  <p className="text-[11px] font-bold text-forest-600 uppercase tracking-wider mb-2">
                    What we look at together:
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {cat.keyMetrics.map((metric, i) => (
                      <span
                        key={i}
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white/90 border border-sand-200 text-xs text-forest-800 font-medium"
                      >
                        <Check className="w-3 h-3 text-forest-600" />
                        {metric}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Friendly student takeaway */}
              <div className="mt-6 pt-4 border-t border-sand-200/80 text-xs text-forest-700 leading-relaxed flex items-start gap-2">
                <Sparkles className="w-3.5 h-3.5 text-forest-600 shrink-0 mt-0.5" />
                <span>
                  <strong className="text-forest-900 font-semibold">Gentle insight:</strong> {cat.whyItMatters}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Non-frightening early awareness callout */}
      <div className="rounded-3xl bg-sage-100/60 border border-sage-200 p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h4 className="text-base font-bold text-forest-950">
            Why early self-awareness feels so empowering
          </h4>
          <p className="text-xs sm:text-sm text-forest-700 leading-relaxed max-w-2xl">
            You do not need to wait until you are completely exhausted to check in on yourself. Small, kind habits — like keeping water on your desk or stepping away from your laptop for 5 minutes — create steady resilience throughout your semester.
          </p>
        </div>
      </div>
    </section>
  );
};
