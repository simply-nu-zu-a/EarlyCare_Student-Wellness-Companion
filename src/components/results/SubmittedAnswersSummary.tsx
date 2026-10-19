import React, { useState } from 'react';
import { ChevronDown, ChevronUp, FileText, Check } from 'lucide-react';
import { AssessmentFormValues } from '../../types/assessment';

interface SubmittedAnswersSummaryProps {
  values: AssessmentFormValues;
}

export const SubmittedAnswersSummary: React.FC<SubmittedAnswersSummaryProps> = ({ values }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="wellness-card overflow-hidden bg-white">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-5 sm:p-6 flex items-center justify-between text-left hover:bg-cream-50/70 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-sage-100 text-forest-800 flex items-center justify-center shrink-0">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-forest-950 font-display">
              Review What You Shared
            </h4>
            <p className="text-xs text-forest-600">See the exact responses from your check-in</p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs font-bold text-forest-800">
          <span>{isOpen ? 'Hide details' : 'View answers'}</span>
          {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </div>
      </button>

      {isOpen && (
        <div className="px-6 pb-6 pt-2 border-t border-sand-200 space-y-4 animate-in fade-in duration-150">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
            {/* Academic */}
            <div className="p-3.5 rounded-2xl bg-cream-50 border border-sand-200 space-y-1">
              <span className="font-bold text-forest-800 uppercase text-[10px] tracking-wider">
                1. Study Rhythm
              </span>
              <p className="text-forest-900">Year: <strong className="capitalize">{values.studentYear}</strong></p>
              <p className="text-forest-700">Study: <strong>{values.studyHoursPerDay} hrs/day</strong></p>
              <p className="text-forest-700">Screens: <strong>{values.dailyScreenTimeHours} hrs/day</strong></p>
              <p className="text-forest-700">Routine: <strong className="capitalize">{values.scheduleRegularity.replace('_', ' ')}</strong></p>
            </div>

            {/* Sleep */}
            <div className="p-3.5 rounded-2xl bg-cream-50 border border-sand-200 space-y-1">
              <span className="font-bold text-forest-800 uppercase text-[10px] tracking-wider">
                2. Sleep & Rest
              </span>
              <p className="text-forest-900">Duration: <strong>{values.averageSleepHours} hrs</strong></p>
              <p className="text-forest-700">Quality: <strong className="capitalize">{values.sleepQuality.replace('_', ' ')}</strong></p>
              <p className="text-forest-700">Bedtime: <strong className="capitalize">{values.bedtimeConsistency.replace('_', ' ')}</strong></p>
              <p className="text-forest-700">Bed Screen: <strong>{values.screenBeforeBed ? 'Yes, in bed' : 'No'}</strong></p>
            </div>

            {/* Movement */}
            <div className="p-3.5 rounded-2xl bg-cream-50 border border-sand-200 space-y-1">
              <span className="font-bold text-forest-800 uppercase text-[10px] tracking-wider">
                3. Movement
              </span>
              <p className="text-forest-900">Active: <strong>{values.weeklyExerciseMinutes} mins/wk</strong></p>
              <p className="text-forest-700">Desk Sitting: <strong>{values.continuousSittingHours} hrs</strong></p>
              <p className="text-forest-700">Body Fatigue: <strong className="capitalize">{values.physicalFatigueLevel}</strong></p>
              <p className="text-forest-700">Posture Ache: <strong>{values.postureStrain ? 'Yes' : 'None'}</strong></p>
            </div>

            {/* Nutrition & Stress */}
            <div className="p-3.5 rounded-2xl bg-cream-50 border border-sand-200 space-y-1">
              <span className="font-bold text-forest-800 uppercase text-[10px] tracking-wider">
                4. Water & Mind
              </span>
              <p className="text-forest-900">Water: <strong>{values.dailyWaterGlasses} glasses/day</strong></p>
              <p className="text-forest-700">Caffeine: <strong>{values.caffeineIntakeCups} cups/day</strong></p>
              <p className="text-forest-700">Study Stress: <strong>{values.academicStressLevel} / 10</strong></p>
              <p className="text-forest-700">Pulse: <strong>{values.restingHeartRate ? `${values.restingHeartRate} bpm` : 'Not provided'}</strong></p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs text-forest-600">
            <Check className="w-3.5 h-3.5 text-forest-600" />
            <span>Everything you entered was processed locally in your browser memory.</span>
          </div>
        </div>
      )}
    </div>
  );
};
