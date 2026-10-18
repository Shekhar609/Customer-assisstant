# aipnt AI Quality Lab

> **A demo built by [aipnt](https://aipnt.com) for Impact AI** — Autonomous testing, multi-metric evaluation, adversarial red-teaming, and governance for enterprise generative AI products.

---

## 🌟 Overview

**aipnt AI Quality Lab** enables AI product teams and leadership to test generative AI products before users do. The suite provides continuous automated evaluation, adversarial prompt injection defenses, factual hallucination detection, and real-time guardrail synthesis.

Designed specifically with a calm, modern, and trustworthy aesthetic for startup founders, product leaders, and enterprise buyers.

---

## 🚀 Key Features

- **Autonomous Evaluation Engine**: Simulates realistic personas stress-testing your copilot across boundary conditions, hostile jailbreaks, and ambiguous inquiries.
- **5 Simulated User Personas**:
  - **Alex Rivera** *(Impatient Buyer)*: High intent, aggressive discount negotiations, rapid SLA demands.
  - **Maya Chen** *(Confused Newcomer)*: High ambiguity, testing capability limits, HIPAA/PHI data ingestion refusal.
  - **Viktor 'Null' Vance** *(Adversarial Red-Teamer)*: System prompt injection, secret credential probes, SQL injection fuzzing.
  - **Sophie Dubois** *(Non-Native Speaker)*: Idiomatic confusion, international billing, reverse VAT tax queries.
  - **Dr. Marcus Vance** *(Enterprise Architect)*: SOC 2 Type II, tenant isolation, CMEK encryption, and SIEM logging.
- **4-Axis Automatic Scoring (0–100)**:
  - Accuracy & Factual Consistency
  - Relevance & Intent Alignment
  - Tone & Brand Voice
  - Safety & Policy Compliance
  - Automated Hallucination Detection & Model Confidence
- **Failure Flagging & Automated Suggested Fixes**:
  - Highlights failure causes (e.g. fabricated SLA damages, prompt injection leak).
  - Proposes precise guardrails and system prompt clauses.
- **Apply Fix & Re-Test Suite**:
  - Interactive Before & After comparison showcasing quality score lift (**71.8 → 93.4 / 100**, **+21.6 pts**).
- **Human-in-the-Loop Review**:
  - Flags borderline cases (<70% confidence) with operator Approve / Reject controls.
- **Executive Telemetry Dashboard**:
  - 6 KPI metric cards, score trend line chart, persona bar chart, and failure categories donut chart.
  - Regression view comparing Run 1 vs Run 2 with zero regressions.
- **Audit Trails & Export**:
  - Step-by-step LLM-as-a-Judge reasoning inspector with raw JSON payload view.
  - Downloadable executive briefing report (`window.print` PDF ready).

---

## 🛠 Tech Stack

- **Frontend**: React 18, Vite, Lucide Icons
- **Styling**: Vanilla CSS Design System (Custom properties, light theme, high-trust indigo accent `#2563EB`)
- **Backend / Edge Functions**: Compatible with Lovable Cloud edge functions and standard LLM APIs.
- **Zero-Exposure Security**: API credentials remain in backend edge functions; frontend never touches secrets.

---

## 🏁 Quick Start

### 1. Install dependencies
```bash
npm install
```

### 2. Start development server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Build for production
```bash
npm run build
```

---

## 📄 License & Partnership

Built by **aipnt** for **Impact AI**.  
For enterprise inquiries, custom evaluation pipelines, and red-teaming: [contact@aipnt.com](mailto:contact@aipnt.com).
