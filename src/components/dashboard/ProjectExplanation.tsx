import React from 'react';
import { Heart, ShieldCheck, ArrowRight, Lock, BookOpen } from 'lucide-react';
import { NavTab } from '../Navbar';

interface ProjectExplanationProps {
  onNavigate: (tab: NavTab) => void;
}

export const ProjectExplanation: React.FC<ProjectExplanationProps> = ({ onNavigate }) => {
  return (
    <section className="wellness-card p-6 sm:p-10 lg:p-12 space-y-8 bg-white">
      <div className="max-w-2xl">
        <span className="text-xs font-bold uppercase tracking-wider text-forest-700 bg-sage-100 px-3 py-1 rounded-full border border-sage-200 inline-block mb-2">
          Our Philosophy
        </span>
        <h2 className="font-display text-2xl sm:text-3xl font-bold text-forest-950">
          A kind approach to college wellness
        </h2>
        <p className="text-sm text-forest-700 mt-2 leading-relaxed">
          Traditional student health tools often wait until you are already in a doctor’s office. EarlyCare offers a gentler, preventive pause so you can recognize fatigue and restore balance on your own terms.
        </p>
      </div>

      {/* 3 Step Approach */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-5 rounded-2xl bg-cream-50 border border-sand-200/90 space-y-2.5">
          <div className="w-9 h-9 rounded-xl bg-sage-200/70 text-forest-800 font-bold text-sm flex items-center justify-center">
            01
          </div>
          <h3 className="text-base font-bold text-forest-950">A 3-minute pause</h3>
          <p className="text-xs sm:text-sm text-forest-700 leading-relaxed">
            Answer a few conversational questions about how you have been sleeping, moving, and studying this week.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-cream-50 border border-sand-200/90 space-y-2.5">
          <div className="w-9 h-9 rounded-xl bg-sage-200/70 text-forest-800 font-bold text-sm flex items-center justify-center">
            02
          </div>
          <h3 className="text-base font-bold text-forest-950">See what is recharging you</h3>
          <p className="text-xs sm:text-sm text-forest-700 leading-relaxed">
            Discover which habits are giving you steady energy, and which ones might be quietly running down your battery.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-cream-50 border border-sand-200/90 space-y-2.5">
          <div className="w-9 h-9 rounded-xl bg-sage-200/70 text-forest-800 font-bold text-sm flex items-center justify-center">
            03
          </div>
          <h3 className="text-base font-bold text-forest-950">Simple, gentle resets</h3>
          <p className="text-xs sm:text-sm text-forest-700 leading-relaxed">
            Get practical, stress-free micro-habits along with welcoming campus resources whenever you want a helping hand.
          </p>
        </div>
      </div>

      {/* Reassuring Boundaries Box */}
      <div className="rounded-2xl bg-sand-50 border border-sand-200 p-5 sm:p-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2 text-forest-900 font-bold text-sm">
            <ShieldCheck className="w-4 h-4 text-forest-600" />
            <span>What we stand for</span>
          </div>
          <p className="text-xs text-forest-700 leading-relaxed">
            EarlyCare is purely for educational awareness and lifestyle reflection. It is designed to be supportive, positive, and non-judgmental.
          </p>
        </div>

        <div className="space-y-1.5">
          <div className="flex items-center gap-2 text-forest-900 font-bold text-sm">
            <Lock className="w-4 h-4 text-forest-600" />
            <span>Complete student privacy</span>
          </div>
          <p className="text-xs text-forest-700 leading-relaxed">
            Everything stays right inside your browser. We never ask for your name, student ID, or email, and we never save your answers to any remote database.
          </p>
        </div>
      </div>

      {/* Navigation footer */}
      <div className="flex items-center justify-between flex-wrap gap-4 pt-2">
        <div className="flex items-center gap-2 text-xs text-forest-600">
          <Heart className="w-4 h-4 text-forest-600 fill-forest-600/20" />
          <span>Made by students, for students.</span>
        </div>
        <button
          onClick={() => onNavigate('privacy')}
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-forest-800 hover:text-forest-950 transition-colors"
        >
          <BookOpen className="w-4 h-4" />
          <span>Read our privacy & ethics commitment</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </section>
  );
};
