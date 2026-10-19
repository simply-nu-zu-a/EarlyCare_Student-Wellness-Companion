import React, { useState } from 'react';
import {
  RotateCcw,
  Download,
  Share2,
  Check,
  ArrowRight,
  Heart
} from 'lucide-react';
import { AssessmentResult } from '../../types/assessment';
import { DisclaimerBanner } from '../DisclaimerBanner';
import { RiskScoreCard } from './RiskScoreCard';
import { WellnessRadarChart } from './WellnessRadarChart';
import { FeatureImpactChart } from './FeatureImpactChart';
import { SubmittedAnswersSummary } from './SubmittedAnswersSummary';
import { ActionPlanSection } from './ActionPlanSection';
import { NavTab } from '../Navbar';

interface ResultsViewProps {
  result: AssessmentResult | null;
  onRetake: () => void;
  onNavigate: (tab: NavTab) => void;
}

export const ResultsView: React.FC<ResultsViewProps> = ({
  result,
  onRetake,
  onNavigate
}) => {
  const [copied, setCopied] = useState(false);

  if (!result) {
    return (
      <div className="max-w-xl mx-auto text-center py-16 px-4 space-y-6">
        <div className="w-16 h-16 rounded-3xl bg-sage-100 border border-sage-200 mx-auto flex items-center justify-center text-forest-700">
          <Heart className="w-8 h-8 fill-forest-600/20" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold font-display text-forest-950">No Check-In Recorded Yet</h2>
          <p className="text-sm text-forest-700 leading-relaxed">
            Take a short 3-minute check-in or explore one of our student stories to view a personalized reflection.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button
            onClick={() => onNavigate('assessment')}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl text-sm font-bold bg-forest-800 text-cream-50 hover:bg-forest-900 transition-all shadow-sm"
          >
            <span>Start my check-in</span>
            <ArrowRight className="w-4 h-4 text-sage-200" />
          </button>
          <button
            onClick={() => onNavigate('dashboard')}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl text-sm font-medium text-forest-800 bg-white hover:bg-cream-100 border border-sand-300 transition-all"
          >
            <span>Back to home</span>
          </button>
        </div>
      </div>
    );
  }

  const handleExportJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(result, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `earlycare-checkin-${result.id}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const hasClinicalFlag = Boolean(
    result.submittedValues.hasExperiencedDizziness ||
    (result.submittedValues.restingHeartRate && (result.submittedValues.restingHeartRate > 105 || result.submittedValues.restingHeartRate < 50))
  );

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-150">
      {/* Gentle disclaimer banner */}
      <DisclaimerBanner />

      {/* Primary Reflection Card */}
      <RiskScoreCard result={result} />

      {/* Two-Column Grid: Radar & Feature Impact */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left column: Radar Wheel & Category Cards (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <WellnessRadarChart categories={result.categoryScores} />

          {/* Category breakdown list */}
          <div className="wellness-card p-6 bg-white space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-forest-800">
              Pillar-by-Pillar Observations
            </h4>
            <div className="space-y-2.5">
              {result.categoryScores.map((cat) => (
                <div
                  key={cat.categoryKey}
                  className="p-3.5 rounded-2xl bg-cream-50/80 border border-sand-200 space-y-1"
                >
                  <div className="flex items-center justify-between text-xs font-bold">
                    <span className="text-forest-950">{cat.name}</span>
                    <span className="font-mono text-forest-800">
                      {cat.score} / 100
                    </span>
                  </div>
                  <p className="text-xs text-forest-600 leading-relaxed">
                    {cat.keyObservation}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right column: Energy Givers & Drainers (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <FeatureImpactChart factors={result.factorContributions} />
        </div>
      </div>

      {/* Submitted Answers Accordion */}
      <SubmittedAnswersSummary values={result.submittedValues} />

      {/* Action Plan & Campus Guidance */}
      <ActionPlanSection
        recommendations={result.recommendations}
        hasClinicalFlag={hasClinicalFlag}
      />

      {/* Bottom Controls */}
      <div className="wellness-card p-5 sm:p-6 bg-white flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={onRetake}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold bg-forest-800 text-cream-50 hover:bg-forest-900 transition-all shadow-sm"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Retake check-in</span>
          </button>
          <button
            onClick={() => onNavigate('dashboard')}
            className="inline-flex items-center gap-2 px-4 py-3 rounded-2xl text-xs sm:text-sm font-medium text-forest-800 bg-cream-100 hover:bg-cream-200 border border-sand-200 transition-all"
          >
            <span>Back to home</span>
          </button>
        </div>

        <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
          <button
            onClick={handleExportJSON}
            className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs font-medium text-forest-700 bg-cream-50 hover:bg-cream-100 border border-sand-200 transition-all"
            title="Download summary as JSON"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Reflection (JSON)</span>
          </button>
          <button
            onClick={handleCopyLink}
            className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs font-medium text-forest-700 bg-cream-50 hover:bg-cream-100 border border-sand-200 transition-all"
            title="Copy URL"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-forest-700 stroke-[3]" />
                <span className="text-forest-800 font-bold">Copied!</span>
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5" />
                <span>Share</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
