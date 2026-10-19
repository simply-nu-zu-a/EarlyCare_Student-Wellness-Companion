export interface AssessmentFormValues {
  // Step 1: Academic & Schedule
  studentYear: 'freshman' | 'sophomore' | 'junior' | 'senior' | 'graduate';
  studyHoursPerDay: number;
  dailyScreenTimeHours: number;
  scheduleRegularity: 'very_regular' | 'moderate' | 'erratic';

  // Step 2: Sleep Architecture
  averageSleepHours: number;
  sleepQuality: 'restful' | 'average' | 'poor' | 'insomnia_symptoms';
  bedtimeConsistency: 'consistent' | 'variable' | 'often_late_night';
  screenBeforeBed: boolean;

  // Step 3: Physical Activity & Sedentary Habit
  weeklyExerciseMinutes: number;
  continuousSittingHours: number;
  physicalFatigueLevel: 'none' | 'mild' | 'moderate' | 'severe';
  postureStrain: boolean;

  // Step 4: Nutrition & Hydration
  dailyWaterGlasses: number;
  mealsPerDay: number;
  caffeineIntakeCups: number;
  skipBreakfastOften: boolean;

  // Step 5: Stress & Subjective Wellbeing
  academicStressLevel: number; // 1 to 10
  energyDipTime: 'none' | 'afternoon' | 'evening' | 'all_day';
  feelOverwhelmedFrequency: 'rarely' | 'sometimes' | 'frequently' | 'daily';
  
  // Optional Vitals (Non-diagnostic)
  restingHeartRate?: number;
  hasExperiencedDizziness?: boolean;
}

export type RiskLevel = 'low' | 'moderate' | 'elevated';

export interface CategoryScore {
  name: string;
  categoryKey: 'sleep' | 'activity' | 'nutrition' | 'stress' | 'lifestyle';
  score: number; // 0 - 100
  riskLevel: RiskLevel;
  benchmark: number; // recommended student benchmark
  description: string;
  keyObservation: string;
}

export interface FactorContribution {
  featureName: string;
  impactScore: number; // positive = increased risk, negative = protective factor
  category: string;
  explanation: string;
  type: 'risk_increaser' | 'protective';
}

export interface RecommendedAction {
  id: string;
  title: string;
  category: 'sleep' | 'movement' | 'nutrition' | 'mental_health' | 'clinical';
  priority: 'high' | 'medium' | 'standard';
  actionSummary: string;
  campusResource: string;
  clinicalNote?: string;
}

export interface AssessmentResult {
  id: string;
  timestamp: string;
  overallScore: number; // 0 (Optimal) to 100 (High Risk Concern)
  overallRiskTier: RiskLevel;
  confidenceScore: number; // simulated ML model confidence, e.g. 89%
  categoryScores: CategoryScore[];
  factorContributions: FactorContribution[];
  recommendations: RecommendedAction[];
  submittedValues: AssessmentFormValues;
  syntheticModelVersion: string;
}

export interface DemoProfile {
  id: string;
  title: string;
  studentPersona: string;
  tagline: string;
  expectedRiskTier: RiskLevel;
  summary: string;
  values: AssessmentFormValues;
}
