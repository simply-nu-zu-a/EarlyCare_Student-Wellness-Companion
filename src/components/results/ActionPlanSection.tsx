import React from 'react';
import { Heart, Building, AlertCircle, Compass } from 'lucide-react';
import { RecommendedAction } from '../../types/assessment';

interface ActionPlanSectionProps {
  recommendations: RecommendedAction[];
  hasClinicalFlag: boolean;
}

export const ActionPlanSection: React.FC<ActionPlanSectionProps> = ({
  recommendations,
  hasClinicalFlag
}) => {
  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-forest-700 bg-sage-100 px-3 py-1 rounded-full border border-sage-200 inline-block mb-1.5">
          <Compass className="w-3.5 h-3.5 inline mr-1" />
          <span>Practical Next Steps</span>
        </div>
        <h3 className="text-xl font-bold font-display text-forest-950">
          Small, gentle habits to try this week
        </h3>
        <p className="text-xs sm:text-sm text-forest-700 mt-1 leading-relaxed max-w-2xl">
          Pick just one or two easy ideas below. Sustainable wellness in college comes from small, repeatable shifts rather than giant lifestyle overhauls.
        </p>
      </div>

      {/* Campus Health Check-In Callout if dizziness/pulse noted */}
      {hasClinicalFlag && (
        <div className="p-5 sm:p-6 rounded-3xl bg-honey-100/60 border border-honey-200 flex items-start gap-4">
          <div className="w-10 h-10 rounded-2xl bg-honey-200 text-honey-600 flex items-center justify-center shrink-0">
            <Heart className="w-5 h-5 fill-honey-600/20" />
          </div>
          <div className="space-y-1">
            <h4 className="text-sm font-bold text-forest-950 font-display">
              A quick hello at Campus Health can give you peace of mind
            </h4>
            <p className="text-xs text-forest-800 leading-relaxed">
              You mentioned feeling lightheaded when getting up or had an unusual pulse reading. While mild dehydration is often the culprit during long library sessions, dropping by campus health for a quick blood pressure or iron check is an easy way to care for yourself.
            </p>
          </div>
        </div>
      )}

      {/* Recommendation Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {recommendations.map((rec) => {
          const isHigh = rec.priority === 'high';
          return (
            <div
              key={rec.id}
              className={`wellness-card p-6 flex flex-col justify-between space-y-4 ${
                isHigh ? 'border-forest-600/40 bg-gradient-to-b from-white to-sage-50/40' : 'bg-white'
              }`}
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between gap-2">
                  <span
                    className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                      isHigh
                        ? 'bg-sage-200 text-forest-900 border border-sage-300'
                        : 'bg-cream-100 text-forest-700 border border-sand-200'
                    }`}
                  >
                    {rec.category.replace('_', ' ')} • {isHigh ? 'Recommended' : 'Gentle habit'}
                  </span>
                </div>

                <h4 className="text-base font-bold text-forest-950 font-display leading-snug">
                  {rec.title}
                </h4>

                <p className="text-xs sm:text-sm text-forest-700 leading-relaxed">
                  {rec.actionSummary}
                </p>
              </div>

              {/* Campus Resource */}
              <div className="pt-3 border-t border-sand-200 flex items-start gap-2 text-xs text-forest-800">
                <Building className="w-4 h-4 text-forest-600 shrink-0 mt-0.5" />
                <span className="text-xs text-forest-700">
                  <strong className="text-forest-900">Campus support:</strong> {rec.campusResource}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Supportive Healthcare Reminder */}
      <div className="rounded-3xl bg-cream-50 border border-sand-200 p-5 sm:p-6 text-xs text-forest-700 space-y-2">
        <h5 className="font-bold text-forest-950 flex items-center gap-2 text-sm">
          <Heart className="w-4 h-4 text-forest-600 fill-forest-600/20" />
          <span>When is it always a good idea to visit a real doctor?</span>
        </h5>
        <p className="text-forest-700 leading-relaxed">
          EarlyCare is an educational space to reflect on daily wellness habits. You should always reach out to a campus doctor or urgent care if you experience:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-forest-800 pt-1">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-3.5 h-3.5 text-forest-600 shrink-0" />
            <span>Fainting, blackout spells, or severe dizziness</span>
          </div>
          <div className="flex items-center gap-2">
            <AlertCircle className="w-3.5 h-3.5 text-forest-600 shrink-0" />
            <span>Chest tightness, shortness of breath, or racing heart</span>
          </div>
          <div className="flex items-center gap-2">
            <AlertCircle className="w-3.5 h-3.5 text-forest-600 shrink-0" />
            <span>Unexplained weight changes or deep fatigue &gt;2 weeks</span>
          </div>
          <div className="flex items-center gap-2">
            <AlertCircle className="w-3.5 h-3.5 text-forest-600 shrink-0" />
            <span>Persistent anxiety or intense feelings of hopelessness</span>
          </div>
        </div>
      </div>
    </div>
  );
};
