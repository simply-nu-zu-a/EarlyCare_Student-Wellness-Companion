# EarlyCare — AI-Powered Student Health Risk Awareness Prototype

An educational, student-focused health risk awareness web application built with **React 19**, **TypeScript**, **Tailwind CSS**, and **Recharts**.

> **Important Medical & Educational Disclaimer**: EarlyCare is an academic demonstration prototype designed for a health-tech project challenge. It is **not** a clinical diagnostic system or medical device. It does not diagnose diseases or replace professional consultation with a licensed campus physician or healthcare provider. All risk scores and feature attributions are calculated from synthetic heuristic modeling.

---

## 🌟 Key Application Modules

### 1. Dashboard (`/`)
- **Hero & Project Mission**: Introduces the early detection rationale for collegiate health (sleep deficit, prolonged sedentary study, erratic hydration, academic burnout).
- **Screening Pillars**: Deep-dive cards into 4 core lifestyle dimensions:
  1. *Circadian & Sleep Architecture*
  2. *Physical Activity & Ergonomics*
  3. *Nutritional Rhythm & Hydration*
  4. *Academic Stress & Cognitive Load*
- **Instant Demo Scenarios**: 3 pre-configured student personas (*Late-Night STEM Student*, *High-Paced Pre-Health Student*, *Balanced Active Student*) allow evaluating the Explainable AI (XAI) results dashboard with one click.
- **Safety & Educational Notices**: Prominent non-diagnostic disclaimers throughout.

### 2. Health Assessment (`/assessment`)
- **5-Step Interactive Wizard**:
  - **Step 1**: Academic rhythm, study hours (0–18h), screen time (0–20h), schedule regularity.
  - **Step 2**: Sleep duration (2–16h), perceived restfulness, bedtime variability, evening blue light habits.
  - **Step 3**: Weekly moderate-to-vigorous physical activity (0–360+ mins), continuous desk sitting, ergonomic posture discomfort, physical fatigue level.
  - **Step 4**: Water intake (glasses/day), meal frequency, caffeine/stimulant consumption, breakfast skipping.
  - **Step 5**: Subjective academic pressure (1–10), energy crash patterns, feelings of overwhelm, plus *optional routine checkup markers* (resting heart rate, orthostatic lightheadedness).
- **Persistent State & Input Validation**: Move forward and back across all 5 steps without losing data; clear inline validation errors for out-of-range values.
- **Answer Review Accordion**: Review summary of all entered responses before final submission.
- **Privacy by Design**: No personally identifying information (names, emails, student IDs, phone numbers) is collected.

### 3. Results & Explainable AI Dashboard (`/results`)
- **Synthetic Health Risk Index**: 0 to 100 severity meter and risk tiers (*Low Concern*, *Moderate Lifestyle Risk*, *Elevated Risk*).
- **Multi-Pillar Radar Chart (Recharts)**: Interactive visualization comparing the student's multi-factorial profile against collegiate wellness benchmarks.
- **Explainable AI (SHAP-style) Feature Attribution**: Deconstructs the overall score into exact contributing habits (+points from risk drivers, -points from protective habits) with plain-language explanations.
- **Tailored Educational Action Plan**: Evidence-based lifestyle resets paired with on-campus university resources (Student Health Center, Counseling and Psychological Services / CAPS, Recreation Ergonomics workshops).
- **Clinical Red-Flag Guidance**: Explicit guidance on when students should consult in-person medical providers.
- **Report Export & Retake Controls**: Export assessment report as JSON, copy share link, or retake the assessment.

### 4. Privacy, Responsible AI & Architecture (`/privacy`)
- Ethical AI principles in digital student health (algorithmic fairness, explainability over black-box models).
- Mitigation of self-diagnosis and health anxiety.
- Complete specification and copyable code snippet for future **Python FastAPI** backend integration.

---

## 🛠️ Technology Stack

- **Framework**: React 19 with Vite 8
- **Language**: TypeScript (strict type checking enabled)
- **Styling**: Tailwind CSS design system with custom dark navy palette (`#070C18`, `#0B1326`, `#162345`), emerald green accents (`#10B981`), and glassmorphism styling
- **Visualization**: Recharts (Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Tooltips)
- **Icons**: Lucide React
- **Architecture**: Modular component tree ready for microservice decoupling

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Start the Local Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 3. Production Build & Validation
```bash
npm run build
```
Build output will be bundled to `dist/` with zero TypeScript or bundling errors.

---

## 🔌 Future Python FastAPI Backend Integration

EarlyCare is structured with a clean separation of concerns. To transition from client-side heuristic simulation to a live Machine Learning microservice:

1. Create a `backend/main.py` using FastAPI and Pydantic:
```python
from fastapi import FastAPI
from pydantic import BaseModel, Field
from typing import Optional

app = FastAPI(title="EarlyCare ML Service")

class AssessmentPayload(BaseModel):
    student_year: str
    study_hours_per_day: float
    daily_screen_time_hours: float
    average_sleep_hours: float
    weekly_exercise_minutes: int
    continuous_sitting_hours: float
    daily_water_glasses: int
    academic_stress_level: int
    resting_heart_rate: Optional[int] = None

@app.post("/api/v1/assess")
async def evaluate_risk(payload: AssessmentPayload):
    # Ingest feature vector into trained XGBoost / Scikit-Learn pipeline
    # Compute SHAP values via TreeExplainer
    return {
        "overall_score": 58,
        "risk_tier": "moderate",
        "factor_contributions": [...]
    }
```
2. In the React frontend, update `src/utils/scoringEngine.ts` to call `fetch('/api/v1/assess', { method: 'POST', body: JSON.stringify(values) })`.
