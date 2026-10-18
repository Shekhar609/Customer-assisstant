import React, { useState } from 'react';
import { 
  TrendingUp, 
  ShieldCheck, 
  AlertTriangle, 
  Clock, 
  CheckCircle2, 
  BarChart2, 
  Terminal, 
  ArrowUpRight, 
  ArrowDownRight,
  Filter, 
  Search, 
  Layers,
  Sparkles,
  HelpCircle
} from 'lucide-react';
import { 
  BASELINE_METRICS, 
  OPTIMIZED_METRICS, 
  TREND_DATA, 
  FAILURE_CATEGORIES, 
  PERSONAS, 
  INITIAL_TEST_CASES 
} from '../data/mockTestData';

export default function DashboardPage({ isFixApplied, onOpenAuditLog, onNavigateToTest }) {
  const [selectedStatusFilter, setSelectedStatusFilter] = useState('all');
  const [selectedPersonaFilter, setSelectedPersonaFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('overview'); // 'overview' | 'regression'

  // Current active metrics based on whether guardrails are applied
  const currentMetrics = isFixApplied ? OPTIMIZED_METRICS : BASELINE_METRICS;

  // Filter test cases
  const filteredCases = INITIAL_TEST_CASES.filter(tc => {
    const persona = PERSONAS.find(p => p.id === tc.personaId);
    const resp = isFixApplied && tc.fixedResponse ? tc.fixedResponse : tc.initialResponse;

    // Search query
    if (searchQuery) {
      const matchQuery = 
        tc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tc.userMessage.toLowerCase().includes(searchQuery.toLowerCase()) ||
        persona?.name.toLowerCase().includes(searchQuery.toLowerCase());
      if (!matchQuery) return false;
    }

    // Persona filter
    if (selectedPersonaFilter !== 'all' && tc.personaId !== selectedPersonaFilter) {
      return false;
    }

    // Status filter
    if (selectedStatusFilter === 'passed' && !resp.passed) return false;
    if (selectedStatusFilter === 'flagged' && resp.passed) return false;
    if (selectedStatusFilter === 'review' && !tc.initialResponse.humanReviewNeeded) return false;

    return true;
  });

  return (
    <div className="dashboard-page">
      {/* Header bar */}
      <div className="agent-header-bar" style={{ marginBottom: '1.75rem' }}>
        <div>
          <span className="badge badge-primary" style={{ marginBottom: '0.4rem' }}>
            Executive Telemetry
          </span>
          <h1 style={{ fontSize: '1.85rem' }}>AI Quality Dashboard</h1>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
            Real-time evaluation analytics, regression tracking, and compliance metrics for Impact AI.
          </p>
        </div>

        {/* View mode toggle */}
        <div style={{ display: 'flex', gap: '0.5rem', background: 'var(--bg-card-subtle)', padding: 3, borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)' }}>
          <button
            onClick={() => setViewMode('overview')}
            style={{
              padding: '0.4rem 0.9rem',
              borderRadius: 'var(--radius-sm)',
              border: 'none',
              background: viewMode === 'overview' ? '#FFFFFF' : 'transparent',
              color: viewMode === 'overview' ? 'var(--primary)' : 'var(--text-muted)',
              fontWeight: 600,
              fontSize: '0.825rem',
              cursor: 'pointer',
              boxShadow: viewMode === 'overview' ? 'var(--shadow-xs)' : 'none'
            }}
          >
            Overview & Telemetry
          </button>
          <button
            onClick={() => setViewMode('regression')}
            style={{
              padding: '0.4rem 0.9rem',
              borderRadius: 'var(--radius-sm)',
              border: 'none',
              background: viewMode === 'regression' ? '#FFFFFF' : 'transparent',
              color: viewMode === 'regression' ? 'var(--primary)' : 'var(--text-muted)',
              fontWeight: 600,
              fontSize: '0.825rem',
              cursor: 'pointer',
              boxShadow: viewMode === 'regression' ? 'var(--shadow-xs)' : 'none'
            }}
          >
            Regression View (Run 1 vs Run 2)
          </button>
        </div>
      </div>

      {/* 6 EXECUTIVE METRIC CARDS */}
      <div className="grid-6" style={{ marginBottom: '2rem' }}>
        {/* Card 1: Overall Quality Score */}
        <div className="stat-card">
          <div className="stat-label-row">
            <span>Overall Quality Score</span>
            <Sparkles size={16} color="var(--primary)" />
          </div>
          <div className="stat-value" style={{ color: 'var(--primary)' }}>
            {currentMetrics.overallQuality}
            <span style={{ fontSize: '1rem', color: 'var(--text-muted)', fontWeight: 500 }}>/100</span>
          </div>
          <div className="stat-subtext" style={{ color: isFixApplied ? 'var(--success-text)' : 'var(--text-muted)' }}>
            {isFixApplied ? (
              <>
                <ArrowUpRight size={14} color="var(--success-text)" />
                +21.6 pts vs Run 1 Baseline
              </>
            ) : (
              <span>Baseline Run 1 Target: 90+</span>
            )}
          </div>
        </div>

        {/* Card 2: Accuracy */}
        <div className="stat-card">
          <div className="stat-label-row">
            <span>Accuracy Rate</span>
            <CheckCircle2 size={16} color="var(--success)" />
          </div>
          <div className="stat-value">
            {currentMetrics.accuracy}%
          </div>
          <div className="stat-subtext" style={{ color: isFixApplied ? 'var(--success-text)' : 'var(--text-muted)' }}>
            {isFixApplied ? "+20.4% factual lift" : "SLA fabrication flagged"}
          </div>
        </div>

        {/* Card 3: Hallucination Rate */}
        <div className="stat-card">
          <div className="stat-label-row">
            <span>Hallucination Rate</span>
            <AlertTriangle size={16} color={currentMetrics.hallucinationRate > 0 ? "var(--danger)" : "var(--success)"} />
          </div>
          <div className="stat-value" style={{ color: currentMetrics.hallucinationRate > 0 ? "var(--danger-text)" : "var(--success-text)" }}>
            {currentMetrics.hallucinationRate}%
          </div>
          <div className="stat-subtext" style={{ color: currentMetrics.hallucinationRate === 0 ? "var(--success-text)" : "var(--danger-text)" }}>
            {currentMetrics.hallucinationRate === 0 ? "Zero hallucinations detected" : "1 critical SLA hallucination"}
          </div>
        </div>

        {/* Card 4: Safety Flags */}
        <div className="stat-card">
          <div className="stat-label-row">
            <span>Safety / Policy Flags</span>
            <ShieldCheck size={16} color={currentMetrics.safetyFlags === 0 ? "var(--success)" : "var(--danger)"} />
          </div>
          <div className="stat-value" style={{ color: currentMetrics.safetyFlags === 0 ? "var(--success-text)" : "var(--danger-text)" }}>
            {currentMetrics.safetyFlags}
          </div>
          <div className="stat-subtext">
            {currentMetrics.safetyFlags === 0 ? "All 16 tests compliant" : "Prompt injection & PHI leaks"}
          </div>
        </div>

        {/* Card 5: Tests Run */}
        <div className="stat-card">
          <div className="stat-label-row">
            <span>Automated Tests Run</span>
            <BarChart2 size={16} color="var(--primary)" />
          </div>
          <div className="stat-value">
            {currentMetrics.totalTests}
          </div>
          <div className="stat-subtext" style={{ color: 'var(--text-muted)' }}>
            Across 5 diverse user personas
          </div>
        </div>

        {/* Card 6: Estimated Time Saved */}
        <div className="stat-card">
          <div className="stat-label-row">
            <span>Time Saved vs Manual</span>
            <Clock size={16} color="var(--accent-cyan)" />
          </div>
          <div className="stat-value" style={{ color: 'var(--accent-cyan)' }}>
            {currentMetrics.timeSavedHours}h
          </div>
          <div className="stat-subtext" style={{ color: 'var(--text-muted)' }}>
            Calculated at 70m/manual test
          </div>
        </div>
      </div>

      {/* REGRESSION VIEW (When tab selected) */}
      {viewMode === 'regression' && (
        <div className="card" style={{ marginBottom: '2rem', padding: '1.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
            <div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '0.2rem' }}>
                Regression Analysis: Run 1 (Baseline) vs Run 2 (Guardrails v2.1)
              </h3>
              <p style={{ fontSize: '0.85rem' }}>
                Verifying that guardrail additions improved flagged edge cases without regressing existing passing behaviors.
              </p>
            </div>
            <span className="badge badge-success" style={{ fontSize: '0.85rem', padding: '0.4rem 0.8rem' }}>
              Net Lift: +21.6 pts
            </span>
          </div>

          <div className="grid-3" style={{ marginBottom: '1.5rem' }}>
            {/* Improved */}
            <div style={{ background: 'var(--success-light)', border: '1px solid var(--success-border)', borderRadius: 'var(--radius-md)', padding: '1.25rem' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--success-text)', textTransform: 'uppercase' }}>
                Improved Test Cases
              </div>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--success-text)', margin: '0.25rem 0' }}>
                4 Cases (25%)
              </div>
              <p style={{ fontSize: '0.8rem', color: '#065F46' }}>
                Prompt Injection defused, $50k SLA hallucination eliminated, HIPAA intake rejected, hostile tone corrected.
              </p>
            </div>

            {/* Unchanged */}
            <div style={{ background: '#F8FAFC', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-md)', padding: '1.25rem' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                Unchanged / Maintained Passing
              </div>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: '#0F172A', margin: '0.25rem 0' }}>
                12 Cases (75%)
              </div>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                All 12 previously passing enterprise and newcomer tests preserved 90%+ accuracy and latency.
              </p>
            </div>

            {/* Regressed */}
            <div style={{ background: '#F8FAFC', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-md)', padding: '1.25rem' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                Regressed / Worse Cases
              </div>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--success-text)', margin: '0.25rem 0' }}>
                0 Cases (0%)
              </div>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                Zero regressions detected across all 5 evaluation dimensions.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 3 VISUAL CHARTS */}
      <div className="grid-3" style={{ marginBottom: '2rem' }}>
        {/* Chart 1: Score Trend across test runs (Line Chart SVG) */}
        <div className="card">
          <div className="card-header">
            <div>
              <h3 style={{ fontSize: '1rem' }}>Score Trend Across Runs</h3>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Run 1 (Baseline) → Run 3 (Hardened)</span>
            </div>
          </div>
          <div className="card-body" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <svg viewBox="0 0 320 180" style={{ width: '100%', height: '170px' }}>
              {/* Grid Lines */}
              <line x1="40" y1="30" x2="300" y2="30" stroke="#E2E8F0" strokeDasharray="3,3" />
              <line x1="40" y1="80" x2="300" y2="80" stroke="#E2E8F0" strokeDasharray="3,3" />
              <line x1="40" y1="130" x2="300" y2="130" stroke="#E2E8F0" strokeDasharray="3,3" />
              
              {/* Y Axis Labels */}
              <text x="15" y="34" fontSize="10" fill="#94A3B8">100</text>
              <text x="15" y="84" fontSize="10" fill="#94A3B8">80</text>
              <text x="15" y="134" fontSize="10" fill="#94A3B8">60</text>

              {/* Area Gradient */}
              <defs>
                <linearGradient id="trendGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#2563EB" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#2563EB" stopOpacity="0.0" />
                </linearGradient>
              </defs>
              <polygon 
                points="60,105 170,75 280,45 280,150 60,150" 
                fill="url(#trendGradient)" 
              />

              {/* Quality Line */}
              <polyline 
                fill="none" 
                stroke="#2563EB" 
                strokeWidth="3" 
                strokeLinecap="round"
                strokeLinejoin="round"
                points="60,105 170,75 280,45" 
              />
              
              {/* Accuracy Line */}
              <polyline 
                fill="none" 
                stroke="#10B981" 
                strokeWidth="2" 
                strokeDasharray="4,3"
                points="60,100 170,70 280,40" 
              />

              {/* Data points */}
              <circle cx="60" cy="105" r="4.5" fill="#2563EB" stroke="#FFF" strokeWidth="2" />
              <circle cx="170" cy="75" r="4.5" fill="#2563EB" stroke="#FFF" strokeWidth="2" />
              <circle cx="280" cy="45" r="4.5" fill="#2563EB" stroke="#FFF" strokeWidth="2" />

              {/* X Axis Labels */}
              <text x="42" y="165" fontSize="10" fill="#64748B">Run 1 (71.8)</text>
              <text x="152" y="165" fontSize="10" fill="#64748B">Run 2 (81.4)</text>
              <text x="250" y="165" fontSize="10" fill="#64748B" fontWeight="700">Run 3 (93.4)</text>
            </svg>

            <div style={{ display: 'flex', gap: '1rem', fontSize: '0.75rem', marginTop: '0.5rem' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <span style={{ width: 10, height: 3, background: '#2563EB', borderRadius: 2 }} />
                Overall Quality
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <span style={{ width: 10, height: 3, background: '#10B981', borderRadius: 2 }} />
                Accuracy
              </span>
            </div>
          </div>
        </div>

        {/* Chart 2: Score by Persona (Bar Chart SVG) */}
        <div className="card">
          <div className="card-header">
            <div>
              <h3 style={{ fontSize: '1rem' }}>Score by Persona</h3>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Comparison across 5 simulated profiles</span>
            </div>
          </div>
          <div className="card-body">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              {[
                { name: "Impatient Buyer", score: isFixApplied ? 96 : 68, color: "#E11D48" },
                { name: "Confused Newcomer", score: isFixApplied ? 98 : 55, color: "#D97706" },
                { name: "Adversarial Red-Team", score: isFixApplied ? 99 : 46, color: "#7C3AED" },
                { name: "Non-Native Speaker", score: isFixApplied ? 95 : 85, color: "#2563EB" },
                { name: "Enterprise Architect", score: isFixApplied ? 97 : 94, color: "#059669" },
              ].map(item => (
                <div key={item.name}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.775rem', marginBottom: '0.2rem' }}>
                    <span style={{ fontWeight: 600 }}>{item.name}</span>
                    <span style={{ fontWeight: 700, color: item.color }}>{item.score}%</span>
                  </div>
                  <div style={{ height: 8, background: '#F1F5F9', borderRadius: 4, overflow: 'hidden' }}>
                    <div 
                      style={{ 
                        height: '100%', 
                        width: `${item.score}%`, 
                        background: item.color, 
                        borderRadius: 4, 
                        transition: 'width 0.4s ease' 
                      }} 
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Chart 3: Failure Categories (Donut Chart SVG) */}
        <div className="card">
          <div className="card-header">
            <div>
              <h3 style={{ fontSize: '1rem' }}>Failure Categories</h3>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Distribution of flagged baseline risks</span>
            </div>
          </div>
          <div className="card-body" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            {/* SVG Donut */}
            <svg viewBox="0 0 140 140" style={{ width: '130px', height: '130px', flexShrink: 0 }}>
              <circle cx="70" cy="70" r="50" fill="transparent" stroke="#E2E8F0" strokeWidth="18" />
              {/* Segment 1: Prompt Injection (25%) */}
              <circle cx="70" cy="70" r="50" fill="transparent" stroke="#7C3AED" strokeWidth="18" strokeDasharray="78.5 235.5" strokeDashoffset="0" />
              {/* Segment 2: SLA Hallucination (25%) */}
              <circle cx="70" cy="70" r="50" fill="transparent" stroke="#E11D48" strokeWidth="18" strokeDasharray="78.5 235.5" strokeDashoffset="-78.5" />
              {/* Segment 3: HIPAA PHI (25%) */}
              <circle cx="70" cy="70" r="50" fill="transparent" stroke="#D97706" strokeWidth="18" strokeDasharray="78.5 235.5" strokeDashoffset="-157" />
              {/* Segment 4: Off-Brand Tone (25%) */}
              <circle cx="70" cy="70" r="50" fill="transparent" stroke="#2563EB" strokeWidth="18" strokeDasharray="78.5 235.5" strokeDashoffset="-235.5" />
              
              <text x="70" y="67" textAnchor="middle" fontSize="13" fontWeight="800" fill="#0F172A">4</text>
              <text x="70" y="80" textAnchor="middle" fontSize="8" fill="#64748B">Risks</text>
            </svg>

            {/* Legend */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.72rem' }}>
              {FAILURE_CATEGORIES.map(cat => (
                <div key={cat.name} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <span style={{ width: 8, height: 8, borderRadius: 2, background: cat.color, flexShrink: 0 }} />
                  <span style={{ color: 'var(--text-muted)' }}>{cat.name} (25%)</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* FILTERABLE TABLE OF ALL TEST CASES */}
      <div className="card">
        <div className="card-header" style={{ flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h3 style={{ fontSize: '1.1rem' }}>Test Cases & Evaluation Ledger</h3>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Showing {filteredCases.length} of {INITIAL_TEST_CASES.length} total synthetic test executions
            </span>
          </div>

          {/* Table Filters */}
          <div className="filter-bar" style={{ margin: 0 }}>
            {/* Search Bar */}
            <div style={{ position: 'relative' }}>
              <Search size={14} color="var(--text-subtle)" style={{ position: 'absolute', left: 10, top: 10 }} />
              <input 
                type="text" 
                placeholder="Search prompt or title..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  padding: '0.45rem 0.85rem 0.45rem 2rem',
                  fontSize: '0.825rem',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-light)',
                  outline: 'none',
                  width: '200px'
                }}
              />
            </div>

            {/* Status Filter */}
            <select 
              className="filter-select"
              value={selectedStatusFilter}
              onChange={(e) => setSelectedStatusFilter(e.target.value)}
            >
              <option value="all">Status: All</option>
              <option value="passed">Passed</option>
              <option value="flagged">Flagged Violations</option>
              <option value="review">Needs Human Review</option>
            </select>

            {/* Persona Filter */}
            <select 
              className="filter-select"
              value={selectedPersonaFilter}
              onChange={(e) => setSelectedPersonaFilter(e.target.value)}
            >
              <option value="all">Persona: All (5)</option>
              {PERSONAS.map(p => (
                <option key={p.id} value={p.id}>{p.name} ({p.role})</option>
              ))}
            </select>
          </div>
        </div>

        {/* Table Content */}
        <div className="data-table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Test & Persona</th>
                <th>User Prompt</th>
                <th>Accuracy</th>
                <th>Tone</th>
                <th>Safety</th>
                <th>Hallucination</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCases.map(tc => {
                const persona = PERSONAS.find(p => p.id === tc.personaId);
                const resp = isFixApplied && tc.fixedResponse ? tc.fixedResponse : tc.initialResponse;
                const isFailed = !resp.passed;

                return (
                  <tr key={tc.id}>
                    {/* Persona & Title */}
                    <td>
                      <div style={{ fontWeight: 700, color: '#0F172A', fontSize: '0.875rem' }}>{tc.title}</div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', marginTop: '0.2rem' }}>
                        <span style={{ 
                          width: 8, 
                          height: 8, 
                          borderRadius: '50%', 
                          background: persona?.color 
                        }} />
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                          {persona?.name}
                        </span>
                      </div>
                    </td>

                    {/* Prompt Preview */}
                    <td style={{ maxWidth: '280px' }}>
                      <div style={{ 
                        fontSize: '0.8rem', 
                        color: 'var(--text-muted)', 
                        whiteSpace: 'nowrap', 
                        overflow: 'hidden', 
                        textOverflow: 'ellipsis' 
                      }} title={tc.userMessage}>
                        "{tc.userMessage}"
                      </div>
                    </td>

                    {/* Accuracy */}
                    <td>
                      <span style={{ fontWeight: 700, color: resp.scores.accuracy >= 90 ? 'var(--success-text)' : 'var(--danger-text)' }}>
                        {resp.scores.accuracy}%
                      </span>
                    </td>

                    {/* Tone */}
                    <td>
                      <span style={{ fontWeight: 700, color: resp.scores.tone >= 90 ? 'var(--success-text)' : 'var(--danger-text)' }}>
                        {resp.scores.tone}%
                      </span>
                    </td>

                    {/* Safety */}
                    <td>
                      <span style={{ fontWeight: 700, color: resp.scores.safety >= 90 ? 'var(--success-text)' : 'var(--danger-text)' }}>
                        {resp.scores.safety}%
                      </span>
                    </td>

                    {/* Hallucination */}
                    <td>
                      {resp.hallucination ? (
                        <span className="badge badge-danger">SLA Risk</span>
                      ) : (
                        <span className="badge badge-success">Clean</span>
                      )}
                    </td>

                    {/* Status Badge */}
                    <td>
                      {isFailed ? (
                        <span className="badge badge-danger">Flagged</span>
                      ) : isFixApplied && tc.fixedResponse ? (
                        <span className="badge badge-success">Fixed</span>
                      ) : (
                        <span className="badge badge-success">Passed</span>
                      )}
                    </td>

                    {/* Actions */}
                    <td>
                      <button 
                        className="btn btn-secondary btn-sm"
                        onClick={() => onOpenAuditLog(tc, persona)}
                        title="View Evaluator Audit Trail"
                      >
                        <Terminal size={13} />
                        Audit Log
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
