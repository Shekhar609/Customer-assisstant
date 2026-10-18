import React from 'react';
import { 
  Sparkles, 
  ShieldCheck, 
  Cpu, 
  Users, 
  ArrowRight, 
  CheckCircle2, 
  AlertTriangle, 
  Activity, 
  BarChart3, 
  Lock,
  FileCheck,
  TrendingUp,
  Sliders
} from 'lucide-react';
import { PERSONAS, BASELINE_METRICS, OPTIMIZED_METRICS } from '../data/mockTestData';

export default function HomePage({ onRunDemo, onNavigate }) {
  return (
    <div className="home-page-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-pill">
          <Sparkles size={14} />
          Impact AI Quality Suite • Built by aipnt
        </div>

        <h1 className="hero-title">
          Test your genAI product <br />
          <span className="gradient-text">before your users do</span>
        </h1>

        <p className="hero-subtitle">
          Autonomous simulated user agents, adversarial red-teaming, and real-time guardrail synthesis. Protect brand equity, prevent hallucinations, and verify safety before shipping to enterprise customers.
        </p>

        <div className="hero-cta-group">
          <button 
            className="btn btn-primary btn-large"
            onClick={onRunDemo}
            id="hero-run-demo-btn"
          >
            <Sparkles size={18} />
            Run Demo (60s Walkthrough)
          </button>
          
          <button 
            className="btn btn-secondary btn-large"
            onClick={() => onNavigate('dashboard')}
            id="hero-view-dashboard-btn"
          >
            <BarChart3 size={18} />
            View Quality Dashboard
          </button>
        </div>

        {/* Quick Trust Highlights */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '2rem',
          flexWrap: 'wrap',
          color: 'var(--text-muted)',
          fontSize: '0.85rem'
        }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <CheckCircle2 size={16} color="var(--success)" />
            Zero PII or Token Exposure
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <CheckCircle2 size={16} color="var(--success)" />
            SOC-2 & ISO 42001 Evaluation Gating
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <CheckCircle2 size={16} color="var(--success)" />
            Human-in-the-Loop Governance
          </span>
        </div>
      </section>

      {/* Simulated Personas Preview Section */}
      <section style={{ margin: '3rem 0' }}>
        <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            Continuous Synthetic Simulation
          </span>
          <h2 style={{ fontSize: '1.75rem', marginTop: '0.25rem' }}>
            5 Realistic User Personas Stress-Testing Your Model
          </h2>
          <p style={{ maxWidth: '600px', margin: '0.5rem auto 0', fontSize: '0.95rem' }}>
            Every build is bombarded with diverse behaviors—from aggressive price hagglers to sophisticated prompt injection red-teamers.
          </p>
        </div>

        <div className="persona-preview-grid">
          {PERSONAS.map((persona) => (
            <div key={persona.id} className="persona-mini-card">
              <div 
                className="persona-avatar" 
                style={{ backgroundColor: persona.bg, color: persona.color }}
              >
                {persona.avatar}
              </div>
              <h3 style={{ fontSize: '1rem', marginBottom: '0.25rem' }}>{persona.name}</h3>
              <span style={{ 
                fontSize: '0.7rem', 
                fontWeight: 700, 
                color: persona.color, 
                background: persona.bg, 
                padding: '0.2rem 0.5rem', 
                borderRadius: 'var(--radius-full)',
                marginBottom: '0.65rem'
              }}>
                {persona.role}
              </span>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.4, flex: 1 }}>
                {persona.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 3 Core Value Pillars */}
      <section style={{ margin: '4rem 0' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            The Impact AI Evaluation Architecture
          </span>
          <h2 style={{ fontSize: '1.75rem', marginTop: '0.25rem' }}>
            Everything You Need to Trust Your GenAI Product
          </h2>
        </div>

        <div className="grid-3">
          {/* Pillar 1 */}
          <div className="feature-card">
            <div className="feature-icon-wrapper">
              <ShieldCheck size={24} />
            </div>
            <h3 style={{ fontSize: '1.15rem', marginBottom: '0.5rem' }}>
              Adversarial Red-Teaming
            </h3>
            <p style={{ fontSize: '0.875rem', lineHeight: 1.6 }}>
              Uncover jailbreaks, credential leakage, and system prompt extraction vulnerabilities before security auditors or malicious actors do.
            </p>
          </div>

          {/* Pillar 2 */}
          <div className="feature-card">
            <div className="feature-icon-wrapper">
              <Activity size={24} />
            </div>
            <h3 style={{ fontSize: '1.15rem', marginBottom: '0.5rem' }}>
              Automated Scoring & Guardrail Fixes
            </h3>
            <p style={{ fontSize: '0.875rem', lineHeight: 1.6 }}>
              Score every test across Accuracy, Relevance, Tone, and Safety. When an edge case fails, our system automatically synthesizes prompt guardrail fixes.
            </p>
          </div>

          {/* Pillar 3 */}
          <div className="feature-card">
            <div className="feature-icon-wrapper">
              <FileCheck size={24} />
            </div>
            <h3 style={{ fontSize: '1.15rem', marginBottom: '0.5rem' }}>
              Human-in-the-Loop & Audit Logs
            </h3>
            <p style={{ fontSize: '0.875rem', lineHeight: 1.6 }}>
              Flag ambiguous edge cases with a "Needs Human Review" badge. Maintain an immutable reasoning audit trail for executive and regulatory compliance.
            </p>
          </div>
        </div>
      </section>

      {/* Executive Impact Callout Banner */}
      <section style={{
        background: '#FFFFFF',
        border: '1px solid var(--border-light)',
        borderRadius: 'var(--radius-xl)',
        padding: '2.5rem',
        boxShadow: 'var(--shadow-sm)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '2rem'
      }}>
        <div style={{ maxWidth: '620px' }}>
          <span className="badge badge-primary" style={{ marginBottom: '0.75rem' }}>
            Enterprise Readiness
          </span>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>
            Ready to inspect the live test agent?
          </h3>
          <p style={{ fontSize: '0.925rem', color: 'var(--text-muted)' }}>
            Watch the test runner evaluate our sample Sales AI Copilot, flag SLA hallucinations and prompt injection vulnerabilities, and verify guardrail fixes in real-time.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '1rem' }}>
          <button 
            className="btn btn-primary"
            onClick={onRunDemo}
            id="banner-start-testing-btn"
          >
            Launch Test Suite
            <ArrowRight size={16} />
          </button>
        </div>
      </section>
    </div>
  );
}
