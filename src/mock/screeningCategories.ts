export interface ScreeningCategoryInfo {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  iconName: string;
  keyMetrics: string[];
  whyItMatters: string;
  studentContext: string;
  colorScheme: {
    accent: string;
    bgBadge: string;
    border: string;
  };
}

export const SCREENING_CATEGORIES: ScreeningCategoryInfo[] = [
  {
    id: 'sleep',
    title: 'Sleep & Rest',
    shortDescription: 'How consistently your nightly sleep restores your mind and body.',
    fullDescription: 'Looking at how many hours you sleep, whether you feel rested when waking up, and whether late-night screens are keeping you awake.',
    iconName: 'Moon',
    keyMetrics: ['Sleep hours', 'Bedtime routine', 'Screen wind-down', 'Morning freshness'],
    whyItMatters: 'Consistent rest protects your memory, boosts focus during morning lectures, and keeps your mood steady.',
    studentContext: 'Late assignment crunches and variable campus schedules can quietly chip away at sleep.',
    colorScheme: {
      accent: '#2E4F37',
      bgBadge: '#E8EFEA',
      border: '#D2E2D6'
    }
  },
  {
    id: 'activity',
    title: 'Movement & Posture',
    shortDescription: 'Balancing long hours of desk study with enjoyable daily movement.',
    fullDescription: 'Checking unbroken study sitting, walking between classes, desk ergonomics, and keeping physical stiffness at bay.',
    iconName: 'Activity',
    keyMetrics: ['Weekly movement', 'Desk stretch breaks', 'Posture comfort', 'Physical stamina'],
    whyItMatters: 'A brief walk or quick stretch every hour increases blood flow to your brain and relieves neck stiffness.',
    studentContext: 'Sitting for 6+ hours at library carrels often leads to tight shoulders and afternoon sluggishness.',
    colorScheme: {
      accent: '#3D6448',
      bgBadge: '#F2F7F4',
      border: '#C5DCCF'
    }
  },
  {
    id: 'nutrition',
    title: 'Nourishment & Water',
    shortDescription: 'Drinking enough water, eating regular meals, and pacing caffeine.',
    fullDescription: 'Looking at steady hydration, avoiding skipped breakfasts, and finding balance with coffee or energy drinks.',
    iconName: 'Droplets',
    keyMetrics: ['Daily water glasses', 'Consistent meals', 'Caffeine pacing', 'Steady energy'],
    whyItMatters: 'Drinking enough water prevents dehydration headaches and supports clean, focused studying.',
    studentContext: 'Rushing to 9 AM classes with an empty stomach and an iced coffee is a common college trap.',
    colorScheme: {
      accent: '#BC7D3B',
      bgBadge: '#FAF2DE',
      border: '#F3E3B9'
    }
  },
  {
    id: 'stress',
    title: 'Mind & Study Rhythm',
    shortDescription: 'Navigating academic deadlines and protecting guilt-free downtime.',
    fullDescription: 'Understanding your subjective study pressure, energy rhythm, and making space for rest without guilt.',
    iconName: 'Brain',
    keyMetrics: ['Academic pressure', 'Mindful breathing', 'Daily downtime', 'Burnout prevention'],
    whyItMatters: 'Managing study stress early keeps you from burning out right before midterms and finals.',
    studentContext: 'Balancing coursework, jobs, and social life can make anyone feel stretched thin.',
    colorScheme: {
      accent: '#C25D3B',
      bgBadge: '#F9ECE7',
      border: '#F2D4C9'
    }
  }
];
