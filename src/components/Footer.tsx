import React from 'react';
import { Heart, Sparkles, Phone, Compass, Shield } from 'lucide-react';
import { NavTab } from './Navbar';

interface FooterProps {
  onNavigate: (tab: NavTab) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="w-full border-t border-sand-200 bg-[#F5F1E8] text-forest-800 mt-auto">
      {/* Gentle Campus Care Banner */}
      <div className="border-b border-sand-300/80 bg-cream-50/60 px-4 py-3.5">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs sm:text-[13px]">
          <div className="flex items-center gap-2 text-forest-800">
            <Heart className="w-4 h-4 text-forest-600 fill-forest-600/20 shrink-0" />
            <span>
              Need someone to talk to or feeling physically unwell?
            </span>
          </div>
          <div className="flex items-center gap-4 text-forest-900 font-medium flex-wrap">
            <span className="flex items-center gap-1.5 text-forest-700">
              <Phone className="w-3.5 h-3.5" /> Campus Student Health: (555) 019-CARE
            </span>
            <span className="text-sand-400 hidden sm:inline">|</span>
            <span className="text-forest-700">24/7 Student Crisis Support: Dial 988</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand & Mission */}
          <div className="md:col-span-2 space-y-3.5">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-forest-800 text-cream-50 flex items-center justify-center">
                <Heart className="w-4 h-4 fill-cream-50/20" />
              </div>
              <span className="font-display font-bold text-lg text-forest-950">EarlyCare</span>
              <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-sage-200/80 text-forest-800 border border-sage-300">
                Student Wellness
              </span>
            </div>
            <p className="text-xs sm:text-sm text-forest-700 max-w-lg leading-relaxed">
              EarlyCare is a student-created wellness companion designed to give you a moment of mindful reflection on sleep, movement, hydration, and academic stress during your college journey.
            </p>
            <div className="pt-1 flex items-center gap-4 text-xs text-forest-600">
              <span className="flex items-center gap-1">
                <Shield className="w-3.5 h-3.5 text-forest-600" /> Anonymous & Local to Browser
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-forest-600" /> Non-Clinical Self-Reflection
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h5 className="text-xs font-bold text-forest-900 uppercase tracking-wider mb-3">
              Check-In Tools
            </h5>
            <ul className="space-y-2 text-sm text-forest-700">
              <li>
                <button
                  onClick={() => onNavigate('dashboard')}
                  className="hover:text-forest-950 transition-colors text-left flex items-center gap-1.5"
                >
                  Home & Overview
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('assessment')}
                  className="hover:text-forest-950 transition-colors text-left flex items-center gap-1.5"
                >
                  <Compass className="w-3.5 h-3.5 text-forest-600" />
                  Take the Wellness Check-in
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('results')}
                  className="hover:text-forest-950 transition-colors text-left"
                >
                  View My Reflection & Tips
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('privacy')}
                  className="hover:text-forest-950 transition-colors text-left"
                >
                  Our Philosophy & Ethics
                </button>
              </li>
            </ul>
          </div>

          {/* Supportive Campus Resources */}
          <div>
            <h5 className="text-xs font-bold text-forest-900 uppercase tracking-wider mb-3">
              Campus Support
            </h5>
            <ul className="space-y-1.5 text-xs text-forest-700 leading-relaxed">
              <li>• Student Health Services (Drop-in clinic)</li>
              <li>• Counseling & Psychological Services (CAPS)</li>
              <li>• Campus Recreation & Ergonomic Workshops</li>
              <li>• Peer Academic Success Coaching</li>
              <li className="pt-2 text-forest-600">EarlyCare Prototype v2.0</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-sand-300 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-forest-600">
          <p>© {new Date().getFullYear()} EarlyCare Student Project. Designed for student wellness & awareness.</p>
          <p className="text-center sm:text-right">
            Not for clinical diagnosis, disease prediction, or medical emergency care.
          </p>
        </div>
      </div>
    </footer>
  );
};
