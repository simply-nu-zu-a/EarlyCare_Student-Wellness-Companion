import React, { useState } from 'react';
import {
  ChevronRight,
  ChevronLeft,
  Sparkles,
  Moon,
  Activity,
  Droplets,
  Brain,
  RotateCcw,
  Check,
  Heart,
  HelpCircle
} from 'lucide-react';
import { AssessmentFormValues } from '../../types/assessment';
import { DisclaimerBanner } from '../DisclaimerBanner';

interface AssessmentWizardProps {
  initialValues: AssessmentFormValues;
  onSubmit: (values: AssessmentFormValues) => void;
  onReset: () => void;
}

export const AssessmentWizard: React.FC<AssessmentWizardProps> = ({
  initialValues,
  onSubmit,
  onReset
}) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [formData, setFormData] = useState<AssessmentFormValues>(initialValues);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const updateField = <K extends keyof AssessmentFormValues>(field: K, value: AssessmentFormValues[K]) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value
    }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const validateStep = (step: number): boolean => {
    const stepErrors: Record<string, string> = {};

    if (step === 1) {
      if (formData.studyHoursPerDay < 0 || formData.studyHoursPerDay > 18) {
        stepErrors.studyHoursPerDay = 'Please enter study hours between 0 and 18.';
      }
      if (formData.dailyScreenTimeHours < 0 || formData.dailyScreenTimeHours > 20) {
        stepErrors.dailyScreenTimeHours = 'Please enter screen time between 0 and 20 hours.';
      }
    } else if (step === 2) {
      if (formData.averageSleepHours < 2 || formData.averageSleepHours > 16) {
        stepErrors.averageSleepHours = 'Please enter sleep between 2 and 16 hours.';
      }
    } else if (step === 3) {
      if (formData.weeklyExerciseMinutes < 0 || formData.weeklyExerciseMinutes > 1200) {
        stepErrors.weeklyExerciseMinutes = 'Please enter weekly exercise between 0 and 1200 minutes.';
      }
      if (formData.continuousSittingHours < 0 || formData.continuousSittingHours > 16) {
        stepErrors.continuousSittingHours = 'Please enter continuous sitting between 0 and 16 hours.';
      }
    } else if (step === 4) {
      if (formData.dailyWaterGlasses < 0 || formData.dailyWaterGlasses > 25) {
        stepErrors.dailyWaterGlasses = 'Please enter water between 0 and 25 glasses.';
      }
    } else if (step === 5) {
      if (formData.restingHeartRate !== undefined && formData.restingHeartRate !== null && !isNaN(formData.restingHeartRate)) {
        if (formData.restingHeartRate < 35 || formData.restingHeartRate > 180) {
          stepErrors.restingHeartRate = 'Optional resting heart rate must be between 35 and 180 bpm.';
        }
      }
    }

    setErrors(stepErrors);
    return Object.keys(stepErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, 5));
      window.scrollTo({ top: 80, behavior: 'smooth' });
    }
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
    window.scrollTo({ top: 80, behavior: 'smooth' });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep(5)) {
      setIsSubmitting(true);
      setTimeout(() => {
        setIsSubmitting(false);
        onSubmit(formData);
      }, 400);
    }
  };

  const stepTitles = [
    { num: 1, label: 'Study & Rhythm', icon: Brain },
    { num: 2, label: 'Sleep & Rest', icon: Moon },
    { num: 3, label: 'Movement & Body', icon: Activity },
    { num: 4, label: 'Water & Food', icon: Droplets },
    { num: 5, label: 'Mind & Review', icon: Heart }
  ];

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Friendly banner */}
      <DisclaimerBanner compact />

      {/* Main Check-In Card */}
      <div className="wellness-card p-6 sm:p-10 bg-white relative">
        {/* Header and Stepper */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-forest-700 bg-sage-100 px-3 py-1 rounded-full border border-sage-200">
                Question {currentStep} of 5
              </span>
              <h2 className="text-xl sm:text-2xl font-bold font-display text-forest-950 mt-2">
                {stepTitles[currentStep - 1].label}
              </h2>
            </div>
            <button
              type="button"
              onClick={onReset}
              className="inline-flex items-center gap-1.5 text-xs text-forest-700 hover:text-forest-950 px-3 py-1.5 rounded-xl bg-cream-100 border border-sand-200 hover:bg-cream-200 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset answers</span>
            </button>
          </div>

          {/* Stepper Progress Bar */}
          <div className="grid grid-cols-5 gap-2 sm:gap-3">
            {stepTitles.map((step) => {
              const isPassed = step.num < currentStep;
              const isCurrent = step.num === currentStep;

              return (
                <button
                  key={step.num}
                  type="button"
                  onClick={() => {
                    if (step.num < currentStep || validateStep(currentStep)) {
                      setCurrentStep(step.num);
                    }
                  }}
                  className={`text-left p-2 sm:p-2.5 rounded-xl transition-all border ${
                    isCurrent
                      ? 'bg-sage-100 border-forest-600 shadow-2xs'
                      : isPassed
                      ? 'bg-cream-100/70 border-sand-200 text-forest-800'
                      : 'bg-sand-50/60 border-sand-200 text-forest-600'
                  }`}
                >
                  <div className="flex items-center gap-1.5">
                    <div
                      className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-bold shrink-0 ${
                        isCurrent
                          ? 'bg-forest-800 text-cream-50'
                          : isPassed
                          ? 'bg-sage-200 text-forest-800'
                          : 'bg-sand-200 text-forest-600'
                      }`}
                    >
                      {isPassed ? <Check className="w-3 h-3 stroke-[3]" /> : step.num}
                    </div>
                    <span className="text-xs font-semibold hidden md:inline truncate text-forest-900">
                      {step.label}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="space-y-7">
          {/* STEP 1: Study & Rhythm */}
          {currentStep === 1 && (
            <div className="space-y-6 animate-in fade-in duration-150">
              {/* Year in School */}
              <div className="space-y-2">
                <label className="block text-sm font-bold text-forest-950">
                  What year of college are you in?
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
                  {(['freshman', 'sophomore', 'junior', 'senior', 'graduate'] as const).map((year) => (
                    <button
                      key={year}
                      type="button"
                      onClick={() => updateField('studentYear', year)}
                      className={`py-3 px-3 rounded-2xl text-xs font-bold capitalize border transition-all ${
                        formData.studentYear === year
                          ? 'bg-forest-800 border-forest-800 text-cream-50 shadow-xs'
                          : 'bg-cream-50 border-sand-200 text-forest-800 hover:bg-cream-100'
                      }`}
                    >
                      {year}
                    </button>
                  ))}
                </div>
              </div>

              {/* Study Hours */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm font-bold text-forest-950">
                  <label htmlFor="studyHours">Daily study & lecture hours</label>
                  <span className="px-3 py-1 rounded-full bg-sage-100 text-forest-800 text-xs font-bold border border-sage-200">
                    {formData.studyHoursPerDay} hrs / day
                  </span>
                </div>
                <input
                  id="studyHours"
                  type="range"
                  min="1"
                  max="14"
                  step="0.5"
                  value={formData.studyHoursPerDay}
                  onChange={(e) => updateField('studyHoursPerDay', parseFloat(e.target.value))}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-forest-600 font-medium">
                  <span>1–2 hrs (Light)</span>
                  <span className="text-forest-800 font-semibold">6–8 hrs (Typical load)</span>
                  <span>12+ hrs (Intense sprint)</span>
                </div>
              </div>

              {/* Screen Time */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm font-bold text-forest-950">
                  <label htmlFor="screenTime">Total daily screen time (phone, laptop, tablet)</label>
                  <span className="px-3 py-1 rounded-full bg-sage-100 text-forest-800 text-xs font-bold border border-sage-200">
                    {formData.dailyScreenTimeHours} hrs / day
                  </span>
                </div>
                <input
                  id="screenTime"
                  type="range"
                  min="2"
                  max="16"
                  step="0.5"
                  value={formData.dailyScreenTimeHours}
                  onChange={(e) => updateField('dailyScreenTimeHours', parseFloat(e.target.value))}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-forest-600 font-medium">
                  <span>2 hrs</span>
                  <span className="text-forest-800 font-semibold">7–9 hrs (College average)</span>
                  <span>14+ hrs (Heavy screen days)</span>
                </div>
              </div>

              {/* Schedule Regularity */}
              <div className="space-y-2">
                <label className="block text-sm font-bold text-forest-950">
                  How predictable does your weekly routine feel?
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { key: 'very_regular', title: 'Fairly steady', desc: 'Predictable wake, study & sleep times' },
                    { key: 'moderate', title: 'A bit variable', desc: 'Shifts between weekdays and weekends' },
                    { key: 'erratic', title: 'Constantly shifting', desc: 'Frequent all-nighters or shifting deadlines' }
                  ].map((item) => (
                    <button
                      key={item.key}
                      type="button"
                      onClick={() => updateField('scheduleRegularity', item.key as any)}
                      className={`p-4 rounded-2xl text-left border transition-all ${
                        formData.scheduleRegularity === item.key
                          ? 'bg-sage-100/80 border-forest-600 text-forest-950 shadow-xs'
                          : 'bg-cream-50/60 border-sand-200 text-forest-700 hover:bg-cream-100'
                      }`}
                    >
                      <p className="text-sm font-bold text-forest-950">{item.title}</p>
                      <p className="text-xs text-forest-600 mt-1 leading-relaxed">{item.desc}</p>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Sleep & Rest */}
          {currentStep === 2 && (
            <div className="space-y-6 animate-in fade-in duration-150">
              {/* Average Sleep Hours */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm font-bold text-forest-950">
                  <label htmlFor="sleepHours">About how many hours of sleep do you get?</label>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold border ${
                      formData.averageSleepHours < 6
                        ? 'bg-clay-100 text-clay-600 border-clay-200'
                        : formData.averageSleepHours <= 8.5
                        ? 'bg-sage-100 text-forest-800 border-sage-200'
                        : 'bg-honey-100 text-honey-600 border-honey-200'
                    }`}
                  >
                    {formData.averageSleepHours} hours
                  </span>
                </div>
                <input
                  id="sleepHours"
                  type="range"
                  min="3"
                  max="12"
                  step="0.25"
                  value={formData.averageSleepHours}
                  onChange={(e) => updateField('averageSleepHours', parseFloat(e.target.value))}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-forest-600 font-medium">
                  <span>💤 Under 5 hrs (Deficit)</span>
                  <span className="text-forest-800 font-semibold">✨ 7–9 hrs (Steady recharge)</span>
                  <span>11+ hrs</span>
                </div>
              </div>

              {/* Perceived Sleep Quality */}
              <div className="space-y-2">
                <label className="block text-sm font-bold text-forest-950">
                  How rested do you feel when you wake up?
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { key: 'restful', label: 'Restful & refreshing', desc: 'Wake up with good energy and clear head' },
                    { key: 'average', label: 'Okay / typical', desc: 'Usual morning grogginess that clears with water' },
                    { key: 'poor', label: 'Restless & fragmented', desc: 'Wake up frequently or feel exhausted all day' },
                    { key: 'insomnia_symptoms', label: 'Hard to fall or stay asleep', desc: 'Mind races for an hour or more in bed' }
                  ].map((quality) => (
                    <button
                      key={quality.key}
                      type="button"
                      onClick={() => updateField('sleepQuality', quality.key as any)}
                      className={`p-4 rounded-2xl text-left border transition-all ${
                        formData.sleepQuality === quality.key
                          ? 'bg-sage-100/80 border-forest-600 text-forest-950 shadow-xs'
                          : 'bg-cream-50/60 border-sand-200 text-forest-700 hover:bg-cream-100'
                      }`}
                    >
                      <p className="text-sm font-bold text-forest-950">{quality.label}</p>
                      <p className="text-xs text-forest-600 mt-1 leading-relaxed">{quality.desc}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Bedtime Consistency */}
              <div className="space-y-2">
                <label className="block text-sm font-bold text-forest-950">
                  Bedtime timing pattern
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { key: 'consistent', label: 'Pretty consistent', desc: 'Within 45 mins every night' },
                    { key: 'variable', label: 'Varies by 1–2 hours', desc: 'Depends on daily homework' },
                    { key: 'often_late_night', label: 'Frequently past 2 AM', desc: 'Regular late-night studying' }
                  ].map((item) => (
                    <button
                      key={item.key}
                      type="button"
                      onClick={() => updateField('bedtimeConsistency', item.key as any)}
                      className={`p-3.5 rounded-2xl text-left border transition-all ${
                        formData.bedtimeConsistency === item.key
                          ? 'bg-sage-100/80 border-forest-600 text-forest-950 shadow-xs'
                          : 'bg-cream-50/60 border-sand-200 text-forest-700 hover:bg-cream-100'
                      }`}
                    >
                      <p className="text-xs font-bold text-forest-950">{item.label}</p>
                      <p className="text-[11px] text-forest-600 mt-0.5">{item.desc}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Screens in bed */}
              <div className="p-4 sm:p-5 rounded-2xl bg-cream-50 border border-sand-200 flex items-center justify-between gap-4">
                <div>
                  <h4 className="text-sm font-bold text-forest-950">Scrolling on your phone in bed?</h4>
                  <p className="text-xs text-forest-600 mt-0.5">
                    Using phone or laptop displays right as you are falling asleep
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => updateField('screenBeforeBed', false)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
                      !formData.screenBeforeBed
                        ? 'bg-forest-800 text-cream-50 border-forest-800'
                        : 'bg-white text-forest-700 border-sand-200'
                    }`}
                  >
                    No, I wind down
                  </button>
                  <button
                    type="button"
                    onClick={() => updateField('screenBeforeBed', true)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
                      formData.screenBeforeBed
                        ? 'bg-clay-100 text-clay-600 border-clay-200 font-bold'
                        : 'bg-white text-forest-700 border-sand-200'
                    }`}
                  >
                    Yes, in bed
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Movement & Body */}
          {currentStep === 3 && (
            <div className="space-y-6 animate-in fade-in duration-150">
              {/* Exercise Minutes */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm font-bold text-forest-950">
                  <label htmlFor="exerciseMins">Weekly active movement (sports, gym, brisk walks)</label>
                  <span className="px-3 py-1 rounded-full bg-sage-100 text-forest-800 text-xs font-bold border border-sage-200">
                    {formData.weeklyExerciseMinutes} mins / week
                  </span>
                </div>
                <input
                  id="exerciseMins"
                  type="range"
                  min="0"
                  max="360"
                  step="15"
                  value={formData.weeklyExerciseMinutes}
                  onChange={(e) => updateField('weeklyExerciseMinutes', parseInt(e.target.value, 10))}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-forest-600 font-medium">
                  <span>0 mins (Mostly sedentary)</span>
                  <span className="text-forest-800 font-semibold">150 mins (Great energy target)</span>
                  <span>300+ mins</span>
                </div>
              </div>

              {/* Continuous Sitting */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm font-bold text-forest-950">
                  <label htmlFor="sittingHours">How long do you sit at your desk without standing up?</label>
                  <span className="px-3 py-1 rounded-full bg-sage-100 text-forest-800 text-xs font-bold border border-sage-200">
                    ~{formData.continuousSittingHours} hours at a time
                  </span>
                </div>
                <input
                  id="sittingHours"
                  type="range"
                  min="1"
                  max="12"
                  step="0.5"
                  value={formData.continuousSittingHours}
                  onChange={(e) => updateField('continuousSittingHours', parseFloat(e.target.value))}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-forest-600 font-medium">
                  <span>1 hr (Frequent stretch breaks)</span>
                  <span>4–6 hrs (Long study session)</span>
                  <span>8+ hrs</span>
                </div>
              </div>

              {/* Physical Fatigue */}
              <div className="space-y-2">
                <label className="block text-sm font-bold text-forest-950">
                  How does your body physically feel at the end of the day?
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {(['none', 'mild', 'moderate', 'severe'] as const).map((level) => (
                    <button
                      key={level}
                      type="button"
                      onClick={() => updateField('physicalFatigueLevel', level)}
                      className={`p-3.5 rounded-2xl text-center text-xs font-bold capitalize border transition-all ${
                        formData.physicalFatigueLevel === level
                          ? 'bg-forest-800 border-forest-800 text-cream-50'
                          : 'bg-cream-50 border-sand-200 text-forest-800 hover:bg-cream-100'
                      }`}
                    >
                      {level === 'none' ? '🌿 Energized' : level === 'mild' ? '⛅ A little tired' : level === 'moderate' ? '🥱 Worn down' : '🛋️ Completely wiped'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Posture stiffness */}
              <div className="p-4 sm:p-5 rounded-2xl bg-cream-50 border border-sand-200 flex items-center justify-between gap-4">
                <div>
                  <h4 className="text-sm font-bold text-forest-950">Do you notice neck or shoulder stiffness?</h4>
                  <p className="text-xs text-forest-600 mt-0.5">
                    Ache or tightness after working on laptops or notebooks
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => updateField('postureStrain', false)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
                      !formData.postureStrain
                        ? 'bg-forest-800 text-cream-50 border-forest-800'
                        : 'bg-white text-forest-700 border-sand-200'
                    }`}
                  >
                    No stiffness
                  </button>
                  <button
                    type="button"
                    onClick={() => updateField('postureStrain', true)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
                      formData.postureStrain
                        ? 'bg-clay-100 text-clay-600 border-clay-200 font-bold'
                        : 'bg-white text-forest-700 border-sand-200'
                    }`}
                  >
                    Yes, stiff neck
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: Water & Food */}
          {currentStep === 4 && (
            <div className="space-y-6 animate-in fade-in duration-150">
              {/* Daily Water */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm font-bold text-forest-950">
                  <label htmlFor="waterGlasses">How many glasses of water do you drink daily?</label>
                  <span className="px-3 py-1 rounded-full bg-sage-100 text-forest-800 text-xs font-bold border border-sage-200">
                    💧 {formData.dailyWaterGlasses} glasses (~{formData.dailyWaterGlasses * 250} ml)
                  </span>
                </div>
                <input
                  id="waterGlasses"
                  type="range"
                  min="1"
                  max="14"
                  step="1"
                  value={formData.dailyWaterGlasses}
                  onChange={(e) => updateField('dailyWaterGlasses', parseInt(e.target.value, 10))}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-forest-600 font-medium">
                  <span>1–2 glasses (Low)</span>
                  <span className="text-forest-800 font-semibold">8 glasses (~2L Recommended)</span>
                  <span>14 glasses</span>
                </div>
              </div>

              {/* Meals per day */}
              <div className="space-y-2">
                <label className="block text-sm font-bold text-forest-950">
                  How many regular meals do you usually eat?
                </label>
                <div className="grid grid-cols-4 gap-3">
                  {[1, 2, 3, 4].map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => updateField('mealsPerDay', num)}
                      className={`p-3.5 rounded-2xl text-center text-xs font-bold border transition-all ${
                        formData.mealsPerDay === num
                          ? 'bg-forest-800 border-forest-800 text-cream-50'
                          : 'bg-cream-50 border-sand-200 text-forest-800 hover:bg-cream-100'
                      }`}
                    >
                      {num} {num === 1 ? 'Meal' : num === 4 ? '4+ Meals' : 'Meals'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Caffeine */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm font-bold text-forest-950">
                  <label htmlFor="caffeine">Coffee, tea, or energy drink cups per day</label>
                  <span className="px-3 py-1 rounded-full bg-sage-100 text-forest-800 text-xs font-bold border border-sage-200">
                    ☕ {formData.caffeineIntakeCups} {formData.caffeineIntakeCups === 1 ? 'cup' : 'cups/cans'}
                  </span>
                </div>
                <input
                  id="caffeine"
                  type="range"
                  min="0"
                  max="6"
                  step="1"
                  value={formData.caffeineIntakeCups}
                  onChange={(e) => updateField('caffeineIntakeCups', parseInt(e.target.value, 10))}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-forest-600 font-medium">
                  <span>0 (None)</span>
                  <span className="text-forest-800 font-semibold">1–2 (Moderate)</span>
                  <span>4+ (Heavy caffeine)</span>
                </div>
              </div>

              {/* Skip Breakfast */}
              <div className="p-4 sm:p-5 rounded-2xl bg-cream-50 border border-sand-200 flex items-center justify-between gap-4">
                <div>
                  <h4 className="text-sm font-bold text-forest-950">Do you often skip breakfast?</h4>
                  <p className="text-xs text-forest-600 mt-0.5">
                    Heading straight out the door to early classes without eating
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => updateField('skipBreakfastOften', false)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
                      !formData.skipBreakfastOften
                        ? 'bg-forest-800 text-cream-50 border-forest-800'
                        : 'bg-white text-forest-700 border-sand-200'
                    }`}
                  >
                    No, I eat
                  </button>
                  <button
                    type="button"
                    onClick={() => updateField('skipBreakfastOften', true)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
                      formData.skipBreakfastOften
                        ? 'bg-clay-100 text-clay-600 border-clay-200 font-bold'
                        : 'bg-white text-forest-700 border-sand-200'
                    }`}
                  >
                    Yes, often skip
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* STEP 5: Mind & Review */}
          {currentStep === 5 && (
            <div className="space-y-6 animate-in fade-in duration-150">
              {/* Academic Stress */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm font-bold text-forest-950">
                  <label htmlFor="stressScale">How heavy has coursework pressure felt recently?</label>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold border ${
                      formData.academicStressLevel >= 8
                        ? 'bg-clay-100 text-clay-600 border-clay-200'
                        : formData.academicStressLevel >= 5
                        ? 'bg-honey-100 text-honey-600 border-honey-200'
                        : 'bg-sage-100 text-forest-800 border-sage-200'
                    }`}
                  >
                    {formData.academicStressLevel} / 10
                  </span>
                </div>
                <input
                  id="stressScale"
                  type="range"
                  min="1"
                  max="10"
                  step="1"
                  value={formData.academicStressLevel}
                  onChange={(e) => updateField('academicStressLevel', parseInt(e.target.value, 10))}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-forest-600 font-medium">
                  <span>1–3 (Feeling relaxed)</span>
                  <span className="text-forest-800 font-semibold">5–7 (Manageable hustle)</span>
                  <span>8–10 (High pressure)</span>
                </div>
              </div>

              {/* Feeling Overwhelmed */}
              <div className="space-y-2">
                <label className="block text-sm font-bold text-forest-950">
                  How often do you feel drained or stretched thin?
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {(['rarely', 'sometimes', 'frequently', 'daily'] as const).map((freq) => (
                    <button
                      key={freq}
                      type="button"
                      onClick={() => updateField('feelOverwhelmedFrequency', freq)}
                      className={`p-3.5 rounded-2xl text-center text-xs font-bold capitalize border transition-all ${
                        formData.feelOverwhelmedFrequency === freq
                          ? 'bg-forest-800 border-forest-800 text-cream-50'
                          : 'bg-cream-50 border-sand-200 text-forest-800 hover:bg-cream-100'
                      }`}
                    >
                      {freq}
                    </button>
                  ))}
                </div>
              </div>

              {/* Optional Routine Checkup Markers */}
              <div className="p-5 rounded-3xl bg-sand-50/80 border border-sand-200 space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-forest-800 uppercase tracking-wider">
                  <HelpCircle className="w-4 h-4 text-forest-600" />
                  <span>Optional Wellness Questions (Non-diagnostic)</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="heartRate" className="block text-xs font-semibold text-forest-900 mb-1">
                      Resting pulse (bpm) — Optional
                    </label>
                    <input
                      id="heartRate"
                      type="number"
                      placeholder="e.g. 70 (Leave blank if unknown)"
                      value={formData.restingHeartRate ?? ''}
                      onChange={(e) => {
                        const val = e.target.value ? parseInt(e.target.value, 10) : undefined;
                        updateField('restingHeartRate', val);
                      }}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-sand-300 text-forest-950 text-xs placeholder:text-forest-400 focus:outline-none focus:border-forest-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-forest-900 mb-1">
                      Ever feel lightheaded when standing quickly?
                    </label>
                    <div className="flex items-center gap-2 pt-0.5">
                      <button
                        type="button"
                        onClick={() => updateField('hasExperiencedDizziness', false)}
                        className={`px-3.5 py-2 rounded-xl text-xs font-bold border transition-all ${
                          !formData.hasExperiencedDizziness
                            ? 'bg-forest-800 text-cream-50 border-forest-800'
                            : 'bg-white text-forest-700 border-sand-200'
                        }`}
                      >
                        No
                      </button>
                      <button
                        type="button"
                        onClick={() => updateField('hasExperiencedDizziness', true)}
                        className={`px-3.5 py-2 rounded-xl text-xs font-bold border transition-all ${
                          formData.hasExperiencedDizziness
                            ? 'bg-clay-100 text-clay-600 border-clay-200'
                            : 'bg-white text-forest-700 border-sand-200'
                        }`}
                      >
                        Yes, sometimes
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Review Panel before Submission */}
              <div className="rounded-2xl bg-cream-50 border border-sand-200 p-4 sm:p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-forest-800">
                    Quick Summary of Your Check-In
                  </h4>
                  <span className="text-xs text-forest-600">All questions answered</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
                  <div className="p-3 rounded-xl bg-white border border-sand-200">
                    <p className="text-[10px] text-forest-500 uppercase font-semibold">Sleep</p>
                    <p className="font-bold text-forest-950 mt-0.5">{formData.averageSleepHours} hrs / night</p>
                  </div>
                  <div className="p-3 rounded-xl bg-white border border-sand-200">
                    <p className="text-[10px] text-forest-500 uppercase font-semibold">Screen Time</p>
                    <p className="font-bold text-forest-950 mt-0.5">{formData.dailyScreenTimeHours} hrs / day</p>
                  </div>
                  <div className="p-3 rounded-xl bg-white border border-sand-200">
                    <p className="text-[10px] text-forest-500 uppercase font-semibold">Movement</p>
                    <p className="font-bold text-forest-950 mt-0.5">{formData.weeklyExerciseMinutes} mins / wk</p>
                  </div>
                  <div className="p-3 rounded-xl bg-white border border-sand-200">
                    <p className="text-[10px] text-forest-500 uppercase font-semibold">Stress Load</p>
                    <p className="font-bold text-forest-950 mt-0.5">{formData.academicStressLevel} / 10</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Controls: Back & Next/Submit */}
          <div className="pt-6 border-t border-sand-200 flex items-center justify-between gap-4">
            {currentStep > 1 ? (
              <button
                type="button"
                onClick={handleBack}
                className="inline-flex items-center gap-1.5 px-5 py-3 rounded-xl text-sm font-semibold text-forest-800 bg-cream-100 hover:bg-cream-200 border border-sand-300 transition-all"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
            ) : (
              <div />
            )}

            {currentStep < 5 ? (
              <button
                type="button"
                onClick={handleNext}
                className="inline-flex items-center gap-2 px-7 py-3 rounded-xl text-sm font-bold bg-forest-800 text-cream-50 hover:bg-forest-900 active:scale-98 transition-all shadow-sm"
              >
                <span>Continue</span>
                <ChevronRight className="w-4 h-4 text-sage-200" />
              </button>
            ) : (
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-sm font-bold bg-forest-800 text-cream-50 hover:bg-forest-900 active:scale-98 transition-all shadow-md shadow-forest-900/10 disabled:opacity-60"
              >
                {isSubmitting ? (
                  <>
                    <span className="w-4 h-4 border-2 border-cream-50 border-t-transparent rounded-full animate-spin" />
                    <span>Preparing your reflection...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-sage-200" />
                    <span>See My Wellness Reflection</span>
                  </>
                )}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};
