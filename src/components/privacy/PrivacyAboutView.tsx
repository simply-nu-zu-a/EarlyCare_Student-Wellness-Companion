import React, { useState } from 'react';
import {
  Shield,
  Lock,
  Heart,
  Stethoscope,
  Terminal,
  Check,
  AlertCircle,
  Code2,
  Copy
} from 'lucide-react';

export const PrivacyAboutView: React.FC = () => {
  const [copiedCode, setCopiedCode] = useState(false);

  const sampleFastAPICode = `# earlycare_backend/main.py
# Future Python FastAPI Integration
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import Optional, List
import numpy as np

app = FastAPI(
    title="EarlyCare Student Wellness API",
    version="2.0.0",
    description="Educational Student Wellness Habit Scoring & Feature Attribution"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

class StudentWellnessInput(BaseModel):
    student_year: str
    study_hours_per_day: float = Field(..., ge=0, le=18)
    daily_screen_time_hours: float = Field(..., ge=0, le=24)
    average_sleep_hours: float = Field(..., ge=2, le=16)
    sleep_quality: str
    weekly_exercise_minutes: int = Field(..., ge=0, le=1200)
    continuous_sitting_hours: float = Field(..., ge=0, le=16)
    daily_water_glasses: int = Field(..., ge=0, le=25)
    caffeine_intake_cups: int = Field(..., ge=0, le=15)
    academic_stress_level: int = Field(..., ge=1, le=10)
    has_experienced_dizziness: bool = False
    resting_heart_rate: Optional[int] = None

@app.post("/api/v1/assess")
async def evaluate_wellness_habits(payload: StudentWellnessInput):
    """
    Simulates ML inference and returns calibrated lifestyle reflection
    metrics and feature attribution for educational feedback.
    """
    features = np.array([
        payload.average_sleep_hours,
        payload.weekly_exercise_minutes,
        payload.academic_stress_level,
        payload.daily_screen_time_hours
    ]).reshape(1, -1)
    
    return {
        "status": "success",
        "model_version": "EarlyCare-Student-Heuristic-v2.0",
        "balance_score": 58,
        "energy_status": "moderate_strain",
        "key_drivers": [
            {"factor": "average_sleep_hours", "impact": "drainer", "detail": "Sleep under 6.5 hours"},
            {"factor": "weekly_exercise_minutes", "impact": "giver", "detail": "Regular daily movement"}
        ],
        "disclaimer": "Educational research output. Not a medical diagnostic tool."
    }
`;

  const handleCopy = () => {
    navigator.clipboard.writeText(sampleFastAPICode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-10 animate-in fade-in duration-150">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sage-100 border border-sage-200 text-xs font-semibold text-forest-800">
          <Shield className="w-3.5 h-3.5 text-forest-600" />
          <span>Ethics, Privacy & Technical Architecture</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-display font-bold text-forest-950">
          Our commitment to student privacy & care
        </h1>
        <p className="text-sm text-forest-700 max-w-2xl mx-auto leading-relaxed">
          How EarlyCare handles your reflection data, our non-diagnostic philosophy, and our vision for responsible student health technology.
        </p>
      </div>

      {/* 3 Core Ethical Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="wellness-card p-6 bg-white space-y-3">
          <div className="w-10 h-10 rounded-2xl bg-sage-100 text-forest-800 flex items-center justify-center">
            <Lock className="w-5 h-5 text-forest-700" />
          </div>
          <h3 className="text-base font-bold text-forest-950">Zero Tracking or Names</h3>
          <p className="text-xs text-forest-700 leading-relaxed">
            We never ask for your name, student ID, email address, or university login. Everything runs right in your browser session.
          </p>
        </div>

        <div className="wellness-card p-6 bg-white space-y-3">
          <div className="w-10 h-10 rounded-2xl bg-sage-100 text-forest-800 flex items-center justify-center">
            <Heart className="w-5 h-5 text-forest-700 fill-forest-700/20" />
          </div>
          <h3 className="text-base font-bold text-forest-950">Kind & Non-Judgmental</h3>
          <p className="text-xs text-forest-700 leading-relaxed">
            College is demanding. We present observations with compassion and practical micro-habits rather than scary clinical scores.
          </p>
        </div>

        <div className="wellness-card p-6 bg-white space-y-3">
          <div className="w-10 h-10 rounded-2xl bg-sage-100 text-forest-800 flex items-center justify-center">
            <Stethoscope className="w-5 h-5 text-forest-700" />
          </div>
          <h3 className="text-base font-bold text-forest-950">Non-Diagnostic Boundary</h3>
          <p className="text-xs text-forest-700 leading-relaxed">
            EarlyCare is strictly an educational tool. We encourage students to visit campus doctors or nurses whenever they feel physically unwell.
          </p>
        </div>
      </div>

      {/* Detailed Consent & Data Policies */}
      <div className="wellness-card p-6 sm:p-8 bg-white space-y-5">
        <h3 className="text-xl font-bold font-display text-forest-950">
          How we protect your peace of mind
        </h3>

        <div className="space-y-3 text-xs sm:text-sm text-forest-800 leading-relaxed">
          <div className="p-4 rounded-2xl bg-cream-50 border border-sand-200 space-y-1.5">
            <h4 className="font-bold text-forest-950 flex items-center gap-2">
              <Check className="w-4 h-4 text-forest-600 stroke-[3]" />
              <span>1. Complete Client-Side Processing</span>
            </h4>
            <p className="text-xs text-forest-700">
              When you fill out the wellness check-in, all math and logic run locally inside your browser memory. Closing your tab or hitting reset instantly clears your temporary answers.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-cream-50 border border-sand-200 space-y-1.5">
            <h4 className="font-bold text-forest-950 flex items-center gap-2">
              <Check className="w-4 h-4 text-forest-600 stroke-[3]" />
              <span>2. Avoiding Health Anxiety & Self-Diagnosis</span>
            </h4>
            <p className="text-xs text-forest-700">
              Many online symptom checkers trigger alarmism. EarlyCare focuses on modifiable lifestyle habits — sleep schedules, water intake, and study stretch breaks — rather than diagnostic disease categories.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-cream-50 border border-sand-200 space-y-1.5">
            <h4 className="font-bold text-forest-950 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-forest-600" />
              <span>3. Bridge to In-Person Healthcare</span>
            </h4>
            <p className="text-xs text-forest-700">
              Technology can never replace a trained clinician. When physical flags like dizziness or irregular pulse are reported, EarlyCare gently connects students to on-campus walk-in health clinics.
            </p>
          </div>
        </div>
      </div>

      {/* Future Backend Integration / FastAPI Specification */}
      <div className="wellness-card p-6 sm:p-8 bg-white space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-forest-700 mb-1">
              <Terminal className="w-4 h-4 text-forest-600" />
              <span>Technical Extension</span>
            </div>
            <h3 className="text-xl font-bold font-display text-forest-950">
              Python FastAPI Backend Specification
            </h3>
            <p className="text-xs text-forest-700 mt-0.5">
              Clean separation of concerns ready to connect with a Python FastAPI microservice.
            </p>
          </div>
          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-sage-100 hover:bg-sage-200 border border-sage-200 text-xs text-forest-900 font-bold transition-all self-start sm:self-auto"
          >
            {copiedCode ? (
              <>
                <Check className="w-3.5 h-3.5 text-forest-700 stroke-[3]" />
                <span className="text-forest-900">Copied Python Code</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-forest-600" />
                <span>Copy API Code</span>
              </>
            )}
          </button>
        </div>

        {/* Code Preview Box */}
        <div className="relative rounded-2xl bg-[#172C1E] border border-forest-800 p-4 font-mono text-xs overflow-x-auto text-cream-50">
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-forest-800 text-[11px] text-sage-300">
            <span className="flex items-center gap-2">
              <Code2 className="w-3.5 h-3.5 text-sage-300" />
              earlycare_backend/main.py (FastAPI Endpoint)
            </span>
            <span>REST API Spec v2.0</span>
          </div>
          <pre className="text-cream-100 leading-relaxed">
            <code>{sampleFastAPICode}</code>
          </pre>
        </div>
      </div>
    </div>
  );
};
