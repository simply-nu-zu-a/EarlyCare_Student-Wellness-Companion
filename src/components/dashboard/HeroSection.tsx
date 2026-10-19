import React from 'react';
import { Sparkles, ArrowRight, Clock, ShieldCheck, Heart } from 'lucide-react';
import { NavTab } from '../Navbar';

interface HeroSectionProps {
  onNavigate: (tab: NavTab) => void;
  onSelectDemo: (demoId: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onNavigate }) => {
  return (
    <section className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-cream-50 via-white to-sand-50/50 border border-sand-200/90 p-6 sm:p-12 lg:p-16 shadow-xs">
      {/* Gentle ambient background motifs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-sage-100/50 rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-honey-100/40 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="relative z-10 max-w-3xl mx-auto text-center space-y-6 sm:space-y-8">
        {/* Soft Wellness Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sage-100/80 border border-sage-200 text-xs sm:text-sm font-medium text-forest-800">
          <Sparkles className="w-4 h-4 text-forest-600" />
          <span>A gentle student wellness check-in</span>
        </div>

        {/* Core Headline requested by user */}
        <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-forest-950 leading-[1.12]">
          Take a moment <br className="hidden sm:inline" />
          <span className="text-forest-700 font-serif italic font-normal">for yourself.</span>
        </h1>

        {/* 2-3 Simple Sentences explaining purpose */}
        <p className="text-base sm:text-lg text-forest-700/90 max-w-2xl mx-auto leading-relaxed">
          College moves fast, and between classes, study marathons, and daily life, it is easy to put your own wellbeing on pause. EarlyCare is a calm, 3-minute reflection to help you check in on your sleep, hydration, movement, and stress before exhaustion sets in.
        </p>

        {/* Prominent Action Button */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4 pt-2">
          <button
            onClick={() => onNavigate('assessment')}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl text-base font-bold bg-forest-800 text-cream-50 hover:bg-forest-900 active:scale-98 transition-all shadow-md shadow-forest-900/10"
          >
            <span>Start my check-in</span>
            <ArrowRight className="w-4 h-4 text-sage-200" />
          </button>

          <button
            onClick={() => {
              const demoSection = document.getElementById('student-stories');
              demoSection?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl text-base font-medium text-forest-800 bg-white hover:bg-cream-100 border border-sand-300 transition-all shadow-2xs"
          >
            <span>Explore student stories</span>
          </button>
        </div>

        {/* Peaceful Reassuring Badges */}
        <div className="pt-6 sm:pt-8 border-t border-sand-200/80 grid grid-cols-1 sm:grid-cols-3 gap-3.5 text-left">
          <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-white/80 border border-sand-200">
            <div className="w-8 h-8 rounded-xl bg-sage-100 flex items-center justify-center text-forest-700 shrink-0">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-bold text-forest-900">~3 Short Minutes</p>
              <p className="text-[11px] text-forest-600">Simple, conversational questions</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-white/80 border border-sand-200">
            <div className="w-8 h-8 rounded-xl bg-sage-100 flex items-center justify-center text-forest-700 shrink-0">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-bold text-forest-900">Completely Private</p>
              <p className="text-[11px] text-forest-600">No account, no names saved</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-white/80 border border-sand-200">
            <div className="w-8 h-8 rounded-xl bg-sage-100 flex items-center justify-center text-forest-700 shrink-0">
              <Heart className="w-4 h-4 fill-forest-600/20" />
            </div>
            <div>
              <p className="text-xs font-bold text-forest-900">Kind & Supportive</p>
              <p className="text-[11px] text-forest-600">Constructive daily balance tips</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
