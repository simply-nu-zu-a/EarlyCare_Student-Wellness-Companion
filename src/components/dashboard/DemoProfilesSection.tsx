import React from 'react';
import { Sparkles, Clock, Monitor, Dumbbell, Coffee, ArrowRight } from 'lucide-react';
import { DEMO_PROFILES } from '../../mock/demoProfiles';
import { DemoProfile } from '../../types/assessment';

interface DemoProfilesSectionProps {
  onSelectProfile: (profile: DemoProfile) => void;
}

export const DemoProfilesSection: React.FC<DemoProfilesSectionProps> = ({ onSelectProfile }) => {
  return (
    <section id="student-stories" className="space-y-6 pt-2">
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-forest-700 bg-sage-100 px-3 py-1 rounded-full border border-sage-200 inline-block">
          Explore Examples
        </span>
        <h2 className="font-display text-2xl sm:text-3xl font-bold text-forest-950">
          Relatable student routines
        </h2>
        <p className="text-sm text-forest-700 leading-relaxed">
          Curious how the check-in reflects on different habits? Pick a student scenario below to view an illustrative wellness snapshot.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {DEMO_PROFILES.map((profile) => {
          const isElevated = profile.expectedRiskTier === 'elevated';
          const isModerate = profile.expectedRiskTier === 'moderate';

          const badgeBg = isElevated
            ? 'bg-clay-100 text-clay-600 border-clay-200'
            : isModerate
            ? 'bg-honey-100 text-honey-600 border-honey-200'
            : 'bg-sage-100 text-forest-800 border-sage-200';

          return (
            <div
              key={profile.id}
              className="wellness-card p-6 flex flex-col justify-between hover:border-forest-600/30 transition-all duration-200"
            >
              <div className="space-y-3.5">
                <div className="flex items-center justify-between gap-2">
                  <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${badgeBg}`}>
                    {isElevated ? 'High Fatigue Routine' : isModerate ? 'Moderate Strain' : 'Balanced Routine'}
                  </span>
                  <span className="text-xs text-forest-600 font-medium">{profile.studentPersona}</span>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-forest-950">{profile.title}</h3>
                  <p className="text-xs text-forest-700 mt-1 leading-relaxed">
                    {profile.tagline}
                  </p>
                </div>

                <p className="text-xs text-forest-600 leading-relaxed">
                  {profile.summary}
                </p>

                {/* Quick lifestyle snapshot */}
                <div className="grid grid-cols-2 gap-2 pt-3 border-t border-sand-200 text-xs">
                  <div className="flex items-center gap-1.5 text-forest-800">
                    <Clock className="w-3.5 h-3.5 text-forest-600" />
                    <span>Sleep: <strong>{profile.values.averageSleepHours}h</strong></span>
                  </div>
                  <div className="flex items-center gap-1.5 text-forest-800">
                    <Monitor className="w-3.5 h-3.5 text-forest-600" />
                    <span>Screen: <strong>{profile.values.dailyScreenTimeHours}h</strong></span>
                  </div>
                  <div className="flex items-center gap-1.5 text-forest-800">
                    <Dumbbell className="w-3.5 h-3.5 text-forest-600" />
                    <span>Active: <strong>{profile.values.weeklyExerciseMinutes}m</strong></span>
                  </div>
                  <div className="flex items-center gap-1.5 text-forest-800">
                    <Coffee className="w-3.5 h-3.5 text-forest-600" />
                    <span>Coffee: <strong>{profile.values.caffeineIntakeCups} cups</strong></span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-5 mt-4 border-t border-sand-200">
                <button
                  onClick={() => onSelectProfile(profile)}
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-cream-100 hover:bg-sage-100 border border-sand-300 text-forest-900 transition-colors"
                >
                  <Sparkles className="w-3.5 h-3.5 text-forest-600" />
                  <span>View this reflection</span>
                  <ArrowRight className="w-3.5 h-3.5 text-forest-600 ml-1" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
