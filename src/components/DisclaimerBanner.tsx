import React from 'react';
import { Heart, Info } from 'lucide-react';

interface DisclaimerBannerProps {
  compact?: boolean;
}

export const DisclaimerBanner: React.FC<DisclaimerBannerProps> = ({ compact = false }) => {
  if (compact) {
    return (
      <div className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl bg-sage-50 border border-sage-200 text-xs text-forest-800">
        <Info className="w-4 h-4 text-forest-600 shrink-0" />
        <span>
          <strong className="font-semibold text-forest-900">Student Wellness Project:</strong> EarlyCare is an educational self-reflection companion, not a clinical diagnostic system.
        </span>
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-gradient-to-r from-cream-50 via-sage-50/60 to-sand-50 border border-sage-200/80 p-5 sm:p-6 shadow-sm">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="w-10 h-10 rounded-2xl bg-sage-100 border border-sage-200 flex items-center justify-center shrink-0 text-forest-700">
          <Heart className="w-5 h-5 text-forest-600 fill-forest-600/20" />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <h4 className="text-sm font-bold text-forest-900 font-display">
              A gentle note on student wellness & care
            </h4>
            <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-sage-200/60 text-forest-800">
              Educational Project
            </span>
          </div>
          <p className="text-xs sm:text-[13px] text-forest-700/90 mt-1 leading-relaxed">
            EarlyCare is an academic student project designed to help you reflect on daily habits like sleep, hydration, and study movement. It does <strong className="text-forest-900">not</strong> provide medical diagnoses or replace an in-person conversation with a campus physician or mental health professional.
          </p>
        </div>
      </div>
    </div>
  );
};
