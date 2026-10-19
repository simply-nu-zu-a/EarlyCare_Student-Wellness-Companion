import {
  AssessmentFormValues,
  AssessmentResult,
  CategoryScore,
  FactorContribution,
  RecommendedAction,
  RiskLevel
} from '../types/assessment';

export function calculateAssessmentResult(values: AssessmentFormValues): AssessmentResult {
  const factorContributions: FactorContribution[] = [];

  // 1. Sleep & Rest (Weight 28%)
  let sleepRiskPoints = 0;
  if (values.averageSleepHours < 5) {
    sleepRiskPoints += 45;
    factorContributions.push({
      featureName: 'Short sleep nights (<5 hrs)',
      impactScore: 22,
      category: 'Sleep & Rest',
      explanation: 'Consistently getting under 5 hours of rest drains your mental energy and makes morning lectures tough to focus on.',
      type: 'risk_increaser'
    });
  } else if (values.averageSleepHours < 6.5) {
    sleepRiskPoints += 28;
    factorContributions.push({
      featureName: 'Slight sleep deficit (under 6.5 hrs)',
      impactScore: 12,
      category: 'Sleep & Rest',
      explanation: 'You are clocking slightly less sleep than collegiate bodies usually need to feel fully recharged.',
      type: 'risk_increaser'
    });
  } else if (values.averageSleepHours >= 7 && values.averageSleepHours <= 9) {
    sleepRiskPoints += 5;
    factorContributions.push({
      featureName: 'Great sleep foundation (7-9 hrs)',
      impactScore: -15,
      category: 'Sleep & Rest',
      explanation: 'Your regular full nights of rest give your mind and memory the downtime they need to reset.',
      type: 'protective'
    });
  } else {
    sleepRiskPoints += 15;
  }

  if (values.sleepQuality === 'poor' || values.sleepQuality === 'insomnia_symptoms') {
    sleepRiskPoints += 30;
    factorContributions.push({
      featureName: 'Restless or interrupted sleep',
      impactScore: 14,
      category: 'Sleep & Rest',
      explanation: 'Tossing, turning, or waking up throughout the night keeps you from reaching deep restorative sleep.',
      type: 'risk_increaser'
    });
  }

  if (values.screenBeforeBed) {
    sleepRiskPoints += 15;
    factorContributions.push({
      featureName: 'Late-night phone & laptop time',
      impactScore: 8,
      category: 'Sleep & Rest',
      explanation: 'Bright screens in bed keep your brain alert and signal your body to stay awake longer.',
      type: 'risk_increaser'
    });
  }

  if (values.bedtimeConsistency === 'consistent') {
    sleepRiskPoints = Math.max(0, sleepRiskPoints - 10);
    factorContributions.push({
      featureName: 'Consistent bedtime schedule',
      impactScore: -8,
      category: 'Sleep & Rest',
      explanation: 'Going to bed around the same time stabilizes your body clock and makes waking up much easier.',
      type: 'protective'
    });
  }
  const sleepCategoryScore = Math.min(100, Math.max(8, sleepRiskPoints));

  // 2. Body Movement & Posture (Weight 24%)
  let activityRiskPoints = 0;
  if (values.weeklyExerciseMinutes < 60) {
    activityRiskPoints += 40;
    factorContributions.push({
      featureName: 'Limited active movement (<60 mins/week)',
      impactScore: 18,
      category: 'Movement',
      explanation: 'With heavy coursework, it is easy to miss out on movement, which can leave you feeling sluggish.',
      type: 'risk_increaser'
    });
  } else if (values.weeklyExerciseMinutes >= 150) {
    activityRiskPoints += 5;
    factorContributions.push({
      featureName: 'Regular weekly active movement (150+ mins)',
      impactScore: -14,
      category: 'Movement',
      explanation: 'Your sports, workouts, or fast campus walks give you natural endorphins and clear study fatigue.',
      type: 'protective'
    });
  } else {
    activityRiskPoints += 20;
  }

  if (values.continuousSittingHours >= 7) {
    activityRiskPoints += 30;
    factorContributions.push({
      featureName: 'Long unbroken desk study blocks (7+ hrs)',
      impactScore: 15,
      category: 'Movement',
      explanation: 'Sitting for hours without standing up can lead to tight hips, stiff shoulders, and slower circulation.',
      type: 'risk_increaser'
    });
  }

  if (values.postureStrain) {
    activityRiskPoints += 15;
  }
  const activityCategoryScore = Math.min(100, Math.max(10, activityRiskPoints));

  // 3. Nourishment & Hydration (Weight 22%)
  let nutritionRiskPoints = 0;
  if (values.dailyWaterGlasses < 4) {
    nutritionRiskPoints += 35;
    factorContributions.push({
      featureName: 'Low daily fluid intake (<4 glasses)',
      impactScore: 14,
      category: 'Nourishment',
      explanation: 'Even a small water deficit can sneak up on you as an afternoon headache or dry, tired eyes.',
      type: 'risk_increaser'
    });
  } else if (values.dailyWaterGlasses >= 8) {
    nutritionRiskPoints += 5;
    factorContributions.push({
      featureName: 'Consistent daily hydration (8+ glasses)',
      impactScore: -10,
      category: 'Nourishment',
      explanation: 'Keeping a water bottle nearby supports steady brain focus and physical endurance.',
      type: 'protective'
    });
  } else {
    nutritionRiskPoints += 15;
  }

  if (values.caffeineIntakeCups >= 4) {
    nutritionRiskPoints += 25;
    factorContributions.push({
      featureName: 'High coffee / energy drink intake (4+ cups)',
      impactScore: 12,
      category: 'Nourishment',
      explanation: 'Relying heavily on caffeine helps in the moment, but often triggers afternoon energy dips.',
      type: 'risk_increaser'
    });
  }

  if (values.skipBreakfastOften || values.mealsPerDay <= 1) {
    nutritionRiskPoints += 20;
    factorContributions.push({
      featureName: 'Skipping meals during busy mornings',
      impactScore: 10,
      category: 'Nourishment',
      explanation: 'Missing breakfast or eating only once a day makes blood sugar fluctuate, causing sudden crashes.',
      type: 'risk_increaser'
    });
  }
  const nutritionCategoryScore = Math.min(100, Math.max(10, nutritionRiskPoints));

  // 4. Mind & Academic Rhythm (Weight 26%)
  let stressRiskPoints = 0;
  if (values.academicStressLevel >= 8) {
    stressRiskPoints += 45;
    factorContributions.push({
      featureName: 'Heavy academic pressure right now',
      impactScore: 20,
      category: 'Mind & Study',
      explanation: 'Carrying intense exam or deadline pressure for long periods wears down your mental stamina.',
      type: 'risk_increaser'
    });
  } else if (values.academicStressLevel <= 4) {
    stressRiskPoints += 10;
    factorContributions.push({
      featureName: 'Manageable academic headspace',
      impactScore: -12,
      category: 'Mind & Study',
      explanation: 'Your current study balance gives you enough mental breathing room to handle day-to-day work.',
      type: 'protective'
    });
  } else {
    stressRiskPoints += 25;
  }

  if (values.feelOverwhelmedFrequency === 'frequently' || values.feelOverwhelmedFrequency === 'daily') {
    stressRiskPoints += 25;
  }

  if (values.dailyScreenTimeHours >= 9) {
    stressRiskPoints += 18;
    factorContributions.push({
      featureName: 'High total screen time (9+ hrs)',
      impactScore: 11,
      category: 'Mind & Study',
      explanation: 'Prolonged screen glare creates visual fatigue and makes it harder for your mind to unwind.',
      type: 'risk_increaser'
    });
  }
  const stressCategoryScore = Math.min(100, Math.max(12, stressRiskPoints));

  // Aggregate weighted score
  const weightedTotal = Math.round(
    sleepCategoryScore * 0.28 +
    activityCategoryScore * 0.24 +
    nutritionCategoryScore * 0.22 +
    stressCategoryScore * 0.26
  );

  let overallRiskTier: RiskLevel = 'low';
  if (weightedTotal >= 65) {
    overallRiskTier = 'elevated';
  } else if (weightedTotal >= 38) {
    overallRiskTier = 'moderate';
  }

  if (values.hasExperiencedDizziness) {
    factorContributions.push({
      featureName: 'Felt lightheaded when standing quickly',
      impactScore: 10,
      category: 'Health Note',
      explanation: 'Occasional lightheadedness when getting up is common from low water, but worth a quick check with campus health.',
      type: 'risk_increaser'
    });
  }

  // Category breakdowns in friendly wording
  const categoryScores: CategoryScore[] = [
    {
      name: 'Sleep & Nightly Rest',
      categoryKey: 'sleep',
      score: sleepCategoryScore,
      riskLevel: sleepCategoryScore >= 65 ? 'elevated' : sleepCategoryScore >= 40 ? 'moderate' : 'low',
      benchmark: 25,
      description: 'How consistently your nightly rest recharges your physical and mental energy.',
      keyObservation: values.averageSleepHours < 6
        ? `Averaging ~${values.averageSleepHours} hrs/night leaves you with a slight sleep debt.`
        : `Averaging ~${values.averageSleepHours} hrs/night gives you a dependable energy baseline.`
    },
    {
      name: 'Movement & Posture',
      categoryKey: 'activity',
      score: activityCategoryScore,
      riskLevel: activityCategoryScore >= 65 ? 'elevated' : activityCategoryScore >= 40 ? 'moderate' : 'low',
      benchmark: 30,
      description: 'Balancing desk study with stretching, campus walks, and regular exercise.',
      keyObservation: values.weeklyExerciseMinutes < 90
        ? `Logging ${values.weeklyExerciseMinutes} mins of weekly movement — adding short walks can help.`
        : `Logging ${values.weeklyExerciseMinutes} mins of weekly movement supports steady stamina.`
    },
    {
      name: 'Nourishment & Hydration',
      categoryKey: 'nutrition',
      score: nutritionCategoryScore,
      riskLevel: nutritionCategoryScore >= 65 ? 'elevated' : nutritionCategoryScore >= 40 ? 'moderate' : 'low',
      benchmark: 25,
      description: 'Consistent meals, drinking enough water, and pacing caffeine throughout the day.',
      keyObservation: values.dailyWaterGlasses < 5
        ? `Drinking ~${values.dailyWaterGlasses} glasses/day — keeping a water bottle nearby can help.`
        : `Hydration level (${values.dailyWaterGlasses} glasses) keeps your focus steady.`
    },
    {
      name: 'Mind & Study Rhythm',
      categoryKey: 'stress',
      score: stressCategoryScore,
      riskLevel: stressCategoryScore >= 65 ? 'elevated' : stressCategoryScore >= 40 ? 'moderate' : 'low',
      benchmark: 30,
      description: 'Managing course deadlines, screen breaks, and protecting downtime.',
      keyObservation: values.academicStressLevel >= 7
        ? `Stress rating of ${values.academicStressLevel}/10 suggests high pressure right now.`
        : `Stress rating of ${values.academicStressLevel}/10 indicates a sustainable study balance.`
    }
  ];

  // Recommendations in gentle, encouraging tone
  const recommendations: RecommendedAction[] = [];

  if (values.hasExperiencedDizziness || (values.restingHeartRate && (values.restingHeartRate > 105 || values.restingHeartRate < 45))) {
    recommendations.push({
      id: 'rec-clinic-eval',
      title: 'Schedule a Friendly Campus Health Check-In',
      category: 'clinical',
      priority: 'high',
      actionSummary: 'Because you noted feeling lightheaded or had an unusual pulse reading, it is always a great idea to drop by campus health. A nurse can check your blood pressure, hydration, and iron levels in 10 minutes.',
      campusResource: 'University Student Health Center • Free or low-cost walk-in appointments for students',
      clinicalNote: 'EarlyCare is an educational tool. Physical symptoms always merit in-person clinical appraisal.'
    });
  }

  if (sleepCategoryScore >= 40) {
    recommendations.push({
      id: 'rec-sleep-hygiene',
      title: 'Create a 30-Minute Gentle Wind-Down Window',
      category: 'sleep',
      priority: sleepCategoryScore >= 65 ? 'high' : 'medium',
      actionSummary: 'Try putting your phone on night mode or listening to music/audiobooks 30 minutes before sleep. Giving your eyes a break helps your brain produce natural melatonin for deeper rest.',
      campusResource: 'Student Wellness Center • Sleep Kits & Meditation Audio Guides'
    });
  }

  if (activityCategoryScore >= 40) {
    recommendations.push({
      id: 'rec-micro-movement',
      title: 'Take a 5-Minute Micro-Break Every Study Hour',
      category: 'movement',
      priority: 'medium',
      actionSummary: 'Set a friendly timer to stand up, roll your shoulders, or take a quick lap around the library or dormitory floor to restore circulation.',
      campusResource: 'Campus Recreation • Drop-in Yoga & Ergonomic Study Guides'
    });
  }

  if (nutritionCategoryScore >= 35) {
    recommendations.push({
      id: 'rec-hydration-rhythm',
      title: 'Try a "Water Before Coffee" Morning Routine',
      category: 'nutrition',
      priority: 'medium',
      actionSummary: 'Drink a glass of water before your first morning brew, and tuck an easy snack (like nuts or fruit) in your backpack to avoid skipping meals on busy lecture days.',
      campusResource: 'Campus Dining • Free Hydration Stations Across Buildings'
    });
  }

  if (stressCategoryScore >= 45) {
    recommendations.push({
      id: 'rec-stress-resilience',
      title: 'Protect 20 Minutes of Guilt-Free Downtime Daily',
      category: 'mental_health',
      priority: stressCategoryScore >= 65 ? 'high' : 'standard',
      actionSummary: 'College can feel non-stop. Schedule a small block of time just for yourself — a walk, talking with a friend, or hobby time — without opening textbooks.',
      campusResource: 'Counseling & Psychological Services (CAPS) • Confidential student peer support'
    });
  }

  if (recommendations.length < 3) {
    recommendations.push({
      id: 'rec-general-baseline',
      title: 'Keep Up Your Wonderful Restorative Habits',
      category: 'clinical',
      priority: 'standard',
      actionSummary: 'Your current balance of rest and movement is serving you well. Keep checking in with yourself as exams and project deadlines approach.',
      campusResource: 'Student Wellness Peer Mentorship Network'
    });
  }

  factorContributions.sort((a, b) => Math.abs(b.impactScore) - Math.abs(a.impactScore));

  return {
    id: `EC-${Date.now().toString().slice(-6)}`,
    timestamp: new Date().toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }),
    overallScore: weightedTotal,
    overallRiskTier,
    confidenceScore: 92,
    categoryScores,
    factorContributions,
    recommendations,
    submittedValues: values,
    syntheticModelVersion: 'EarlyCare-Student-Heuristic-v2.0'
  };
}
