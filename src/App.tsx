import { useState, useEffect } from 'react';
import { Navbar, NavTab } from './components/Navbar';
import { Footer } from './components/Footer';
import { DisclaimerBanner } from './components/DisclaimerBanner';
import { HeroSection } from './components/dashboard/HeroSection';
import { ScreeningCards } from './components/dashboard/ScreeningCards';
import { DemoProfilesSection } from './components/dashboard/DemoProfilesSection';
import { ProjectExplanation } from './components/dashboard/ProjectExplanation';
import { AssessmentWizard } from './components/assessment/AssessmentWizard';
import { ResultsView } from './components/results/ResultsView';
import { PrivacyAboutView } from './components/privacy/PrivacyAboutView';

import { AssessmentFormValues, AssessmentResult, DemoProfile } from './types/assessment';
import { DEMO_PROFILES, INITIAL_FORM_VALUES } from './mock/demoProfiles';
import { calculateAssessmentResult } from './utils/scoringEngine';

export function App() {
  const [activeTab, setActiveTab] = useState<NavTab>('dashboard');
  const [formData, setFormData] = useState<AssessmentFormValues>(INITIAL_FORM_VALUES);
  const [assessmentResult, setAssessmentResult] = useState<AssessmentResult | null>(null);

  // Initialize with pre-computed result so visiting Insights directly displays rich data
  useEffect(() => {
    const initialResult = calculateAssessmentResult(DEMO_PROFILES[1].values);
    setAssessmentResult(initialResult);
  }, []);

  const handleNavigate = (tab: NavTab) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectDemoProfile = (profile: DemoProfile) => {
    setFormData(profile.values);
    const result = calculateAssessmentResult(profile.values);
    setAssessmentResult(result);
    setActiveTab('results');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmitAssessment = (values: AssessmentFormValues) => {
    setFormData(values);
    const result = calculateAssessmentResult(values);
    setAssessmentResult(result);
    setActiveTab('results');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRetakeAssessment = () => {
    setActiveTab('assessment');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleResetForm = () => {
    setFormData(INITIAL_FORM_VALUES);
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1C2920] flex flex-col font-sans selection:bg-sage-200 selection:text-forest-900">
      {/* Navigation Header */}
      <Navbar
        activeTab={activeTab}
        onNavigate={handleNavigate}
        hasResults={Boolean(assessmentResult)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 w-full space-y-12">
        {/* TAB 1: DASHBOARD / HOMEPAGE */}
        {activeTab === 'dashboard' && (
          <div className="space-y-12 sm:space-y-16 animate-in fade-in duration-150">
            {/* Top Gentle Disclaimer */}
            <DisclaimerBanner />

            {/* Welcoming Hero Section */}
            <HeroSection
              onNavigate={handleNavigate}
              onSelectDemo={(demoId) => {
                const profile = DEMO_PROFILES.find((p) => p.id === demoId);
                if (profile) handleSelectDemoProfile(profile);
              }}
            />

            {/* The 4 Screening Dimensions */}
            <ScreeningCards />

            {/* Sample Student Scenarios */}
            <DemoProfilesSection onSelectProfile={handleSelectDemoProfile} />

            {/* Project Philosophy & Boundaries */}
            <ProjectExplanation onNavigate={handleNavigate} />
          </div>
        )}

        {/* TAB 2: WELLNESS CHECK-IN */}
        {activeTab === 'assessment' && (
          <div className="animate-in fade-in duration-150">
            <AssessmentWizard
              initialValues={formData}
              onSubmit={handleSubmitAssessment}
              onReset={handleResetForm}
            />
          </div>
        )}

        {/* TAB 3: RESULTS / MY INSIGHTS */}
        {activeTab === 'results' && (
          <div className="animate-in fade-in duration-150">
            <ResultsView
              result={assessmentResult}
              onRetake={handleRetakeAssessment}
              onNavigate={handleNavigate}
            />
          </div>
        )}

        {/* TAB 4: PRIVACY, ETHICS & ABOUT */}
        {activeTab === 'privacy' && (
          <div className="animate-in fade-in duration-150">
            <PrivacyAboutView />
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}

export default App;
