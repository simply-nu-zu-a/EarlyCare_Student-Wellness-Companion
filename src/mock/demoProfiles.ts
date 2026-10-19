import { DemoProfile } from '../types/assessment';

export const DEMO_PROFILES: DemoProfile[] = [
  {
    id: 'demo-engineering',
    title: 'Maya • Engineering Junior',
    studentPersona: 'Coding & Lab Crunch',
    tagline: 'High screen time, late nights, and running on iced coffee',
    expectedRiskTier: 'elevated',
    summary: 'Spends 11+ hours coding daily, sleeps under 5 hours, frequently checks her phone in bed, and feels neck stiffness from library desks.',
    values: {
      studentYear: 'junior',
      studyHoursPerDay: 7.5,
      dailyScreenTimeHours: 11.5,
      scheduleRegularity: 'erratic',
      averageSleepHours: 4.8,
      sleepQuality: 'poor',
      bedtimeConsistency: 'often_late_night',
      screenBeforeBed: true,
      weeklyExerciseMinutes: 30,
      continuousSittingHours: 7.5,
      physicalFatigueLevel: 'severe',
      postureStrain: true,
      dailyWaterGlasses: 3,
      mealsPerDay: 2,
      caffeineIntakeCups: 4,
      skipBreakfastOften: true,
      academicStressLevel: 8,
      energyDipTime: 'afternoon',
      feelOverwhelmedFrequency: 'frequently',
      restingHeartRate: 84,
      hasExperiencedDizziness: true
    }
  },
  {
    id: 'demo-premed',
    title: 'Leo • Pre-Health Sophomore',
    studentPersona: 'Intense Coursework',
    tagline: 'High exam pressure, moderate daily walking, variable meal timing',
    expectedRiskTier: 'moderate',
    summary: 'Averages 6.2 hours of sleep, walks between campus halls, but experiences afternoon energy dips and skips breakfast on lab mornings.',
    values: {
      studentYear: 'sophomore',
      studyHoursPerDay: 6,
      dailyScreenTimeHours: 8,
      scheduleRegularity: 'moderate',
      averageSleepHours: 6.2,
      sleepQuality: 'average',
      bedtimeConsistency: 'variable',
      screenBeforeBed: true,
      weeklyExerciseMinutes: 90,
      continuousSittingHours: 5,
      physicalFatigueLevel: 'moderate',
      postureStrain: false,
      dailyWaterGlasses: 5,
      mealsPerDay: 2,
      caffeineIntakeCups: 2,
      skipBreakfastOften: true,
      academicStressLevel: 7,
      energyDipTime: 'evening',
      feelOverwhelmedFrequency: 'sometimes',
      restingHeartRate: 72,
      hasExperiencedDizziness: false
    }
  },
  {
    id: 'demo-active',
    title: 'Elena • Senior & Club Athlete',
    studentPersona: 'Balanced Routine',
    tagline: 'Prioritizes 8 hours of sleep, regular movement & steady hydration',
    expectedRiskTier: 'low',
    summary: 'Sleeps 7.8 hours regularly, rides her bike to campus, stays well-hydrated, and protects time for friends to unwind.',
    values: {
      studentYear: 'senior',
      studyHoursPerDay: 4.5,
      dailyScreenTimeHours: 5.5,
      scheduleRegularity: 'very_regular',
      averageSleepHours: 7.8,
      sleepQuality: 'restful',
      bedtimeConsistency: 'consistent',
      screenBeforeBed: false,
      weeklyExerciseMinutes: 210,
      continuousSittingHours: 3.5,
      physicalFatigueLevel: 'mild',
      postureStrain: false,
      dailyWaterGlasses: 9,
      mealsPerDay: 3,
      caffeineIntakeCups: 1,
      skipBreakfastOften: false,
      academicStressLevel: 3,
      energyDipTime: 'none',
      feelOverwhelmedFrequency: 'rarely',
      restingHeartRate: 60,
      hasExperiencedDizziness: false
    }
  }
];

export const INITIAL_FORM_VALUES = DEMO_PROFILES[1].values;
