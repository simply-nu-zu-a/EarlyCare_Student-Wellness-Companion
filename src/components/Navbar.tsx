import React, { useState } from 'react';
import { Sparkles, Menu, X, Heart, Shield, Compass, BarChart2 } from 'lucide-react';

export type NavTab = 'dashboard' | 'assessment' | 'results' | 'privacy';

interface NavbarProps {
  activeTab: NavTab;
  onNavigate: (tab: NavTab) => void;
  hasResults: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, onNavigate, hasResults }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNav = (tab: NavTab) => {
    onNavigate(tab);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-sand-200 bg-[#FAF8F5]/90 backdrop-blur-md transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 sm:h-20 flex items-center justify-between gap-4">
        {/* Brand */}
        <button
          onClick={() => handleNav('dashboard')}
          className="flex items-center gap-3 text-left group focus:outline-none focus-visible:ring-2 focus-visible:ring-forest-600 rounded-xl p-1"
          aria-label="EarlyCare Home"
        >
          <div className="w-10 h-10 rounded-2xl bg-forest-800 text-cream-50 flex items-center justify-center group-hover:bg-forest-900 transition-colors shadow-sm">
            <Heart className="w-5 h-5 fill-cream-50/20" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-display font-bold text-lg sm:text-xl tracking-tight text-forest-950 group-hover:text-forest-700 transition-colors">
                EarlyCare
              </span>
              <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium bg-sage-100 text-forest-800 border border-sage-200">
                Student Companion
              </span>
            </div>
            <p className="text-[11px] text-forest-600 hidden sm:block">
              Daily wellness & gentle habit reflection
            </p>
          </div>
        </button>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1.5 lg:gap-2">
          <button
            onClick={() => handleNav('dashboard')}
            className={`px-3.5 py-2 rounded-xl text-sm font-medium transition-all ${
              activeTab === 'dashboard'
                ? 'bg-sage-100 text-forest-900 font-semibold shadow-xs border border-sage-200'
                : 'text-forest-700 hover:text-forest-950 hover:bg-cream-200/60'
            }`}
          >
            Home
          </button>
          <button
            onClick={() => handleNav('assessment')}
            className={`px-3.5 py-2 rounded-xl text-sm font-medium transition-all flex items-center gap-1.5 ${
              activeTab === 'assessment'
                ? 'bg-sage-100 text-forest-900 font-semibold shadow-xs border border-sage-200'
                : 'text-forest-700 hover:text-forest-950 hover:bg-cream-200/60'
            }`}
          >
            <Compass className="w-4 h-4 text-forest-600" />
            Wellness Check-in
          </button>
          <button
            onClick={() => handleNav('results')}
            className={`px-3.5 py-2 rounded-xl text-sm font-medium transition-all flex items-center gap-1.5 ${
              activeTab === 'results'
                ? 'bg-sage-100 text-forest-900 font-semibold shadow-xs border border-sage-200'
                : 'text-forest-700 hover:text-forest-950 hover:bg-cream-200/60'
            }`}
          >
            <BarChart2 className="w-4 h-4 text-forest-600" />
            My Insights
            {hasResults && (
              <span className="w-2 h-2 rounded-full bg-forest-600 inline-block ml-0.5" />
            )}
          </button>
          <button
            onClick={() => handleNav('privacy')}
            className={`px-3.5 py-2 rounded-xl text-sm font-medium transition-all flex items-center gap-1.5 ${
              activeTab === 'privacy'
                ? 'bg-sage-100 text-forest-900 font-semibold shadow-xs border border-sage-200'
                : 'text-forest-700 hover:text-forest-950 hover:bg-cream-200/60'
            }`}
          >
            <Shield className="w-4 h-4 text-forest-600" />
            About & Ethics
          </button>
        </nav>

        {/* Desktop CTA Button */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={() => handleNav('assessment')}
            className="inline-flex items-center gap-2 px-4.5 py-2.5 rounded-xl text-sm font-semibold bg-forest-800 text-cream-50 hover:bg-forest-900 active:scale-98 transition-all shadow-sm"
          >
            <Sparkles className="w-4 h-4 text-sage-200" />
            <span>Start my check-in</span>
          </button>
        </div>

        {/* Mobile menu toggle */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={() => handleNav('assessment')}
            className="px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-forest-800 text-cream-50 hover:bg-forest-900"
          >
            Check-in
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl text-forest-800 hover:bg-cream-200/70 focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-sand-200 bg-[#FAF8F5] px-4 py-4 space-y-2 animate-in fade-in slide-in-from-top-2 duration-150">
          <button
            onClick={() => handleNav('dashboard')}
            className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium ${
              activeTab === 'dashboard'
                ? 'bg-sage-100 text-forest-900 font-semibold border border-sage-200'
                : 'text-forest-800 hover:bg-cream-200/60'
            }`}
          >
            Home
          </button>
          <button
            onClick={() => handleNav('assessment')}
            className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium flex items-center justify-between ${
              activeTab === 'assessment'
                ? 'bg-sage-100 text-forest-900 font-semibold border border-sage-200'
                : 'text-forest-800 hover:bg-cream-200/60'
            }`}
          >
            <span className="flex items-center gap-2">
              <Compass className="w-4 h-4 text-forest-600" />
              Wellness Check-in
            </span>
            <span className="text-xs text-forest-600">~3 mins</span>
          </button>
          <button
            onClick={() => handleNav('results')}
            className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium flex items-center justify-between ${
              activeTab === 'results'
                ? 'bg-sage-100 text-forest-900 font-semibold border border-sage-200'
                : 'text-forest-800 hover:bg-cream-200/60'
            }`}
          >
            <span className="flex items-center gap-2">
              <BarChart2 className="w-4 h-4 text-forest-600" />
              My Insights
            </span>
            {hasResults && (
              <span className="text-[11px] px-2 py-0.5 rounded-full bg-forest-800 text-cream-50 font-medium">
                Ready
              </span>
            )}
          </button>
          <button
            onClick={() => handleNav('privacy')}
            className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium flex items-center gap-2 ${
              activeTab === 'privacy'
                ? 'bg-sage-100 text-forest-900 font-semibold border border-sage-200'
                : 'text-forest-800 hover:bg-cream-200/60'
            }`}
          >
            <Shield className="w-4 h-4 text-forest-600" />
            About & Ethics
          </button>
        </div>
      )}
    </header>
  );
};
