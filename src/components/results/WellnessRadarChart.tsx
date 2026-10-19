import React from 'react';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip
} from 'recharts';
import { CategoryScore } from '../../types/assessment';

interface WellnessRadarChartProps {
  categories: CategoryScore[];
}

export const WellnessRadarChart: React.FC<WellnessRadarChartProps> = ({ categories }) => {
  const chartData = categories.map((cat) => ({
    subject: cat.name.split(' ')[0], // "Sleep", "Movement", "Nourishment", "Mind"
    fullName: cat.name,
    studentStrain: cat.score,
    targetBenchmark: cat.benchmark
  }));

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="rounded-2xl bg-white border border-sand-300 p-3 shadow-md text-xs space-y-1">
          <p className="font-bold text-forest-950">{data.fullName}</p>
          <p className="text-forest-700 font-medium">
            Your Energy Strain Index: <span className="font-bold font-mono">{data.studentStrain}/100</span>
          </p>
          <p className="text-forest-500">
            Balanced Benchmark: <span className="font-mono">{data.targetBenchmark}/100</span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="wellness-card p-6 bg-white space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h3 className="text-base font-bold text-forest-950">Your Four-Pillar Wellness Wheel</h3>
          <p className="text-xs text-forest-600">Visual balance across sleep, movement, hydration, and study load</p>
        </div>
        <div className="flex items-center gap-3 text-xs">
          <div className="flex items-center gap-1.5 text-forest-800 font-medium">
            <span className="w-2.5 h-2.5 rounded-full bg-forest-700 inline-block" />
            <span>Your Check-In</span>
          </div>
          <div className="flex items-center gap-1.5 text-forest-500">
            <span className="w-2.5 h-2.5 rounded-full bg-sand-300 inline-block" />
            <span>Target Benchmark</span>
          </div>
        </div>
      </div>

      <div className="w-full h-72 sm:h-80">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="75%" data={chartData}>
            <PolarGrid stroke="#EAE4D7" />
            <PolarAngleAxis
              dataKey="subject"
              tick={{ fill: '#2E4F37', fontSize: 12, fontWeight: 600 }}
            />
            <PolarRadiusAxis
              angle={30}
              domain={[0, 100]}
              tick={{ fill: '#7A8C80', fontSize: 10 }}
              stroke="#EAE4D7"
            />
            <Tooltip content={<CustomTooltip />} />
            <Radar
              name="Your Habits"
              dataKey="studentStrain"
              stroke="#2E4F37"
              strokeWidth={2}
              fill="#558362"
              fillOpacity={0.35}
            />
            <Radar
              name="Target Benchmark"
              dataKey="targetBenchmark"
              stroke="#AECAB3"
              strokeDasharray="3 3"
              fill="#CFDFD2"
              fillOpacity={0.15}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      <p className="text-center text-[11px] text-forest-600 pt-1 border-t border-sand-200">
        Smaller shape area points toward balanced daily habits and low cumulative fatigue.
      </p>
    </div>
  );
};
