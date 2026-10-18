import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  ShieldAlert, 
  CheckCircle2, 
  AlertCircle, 
  ChevronDown, 
  ChevronUp, 
  Sparkles, 
  Terminal, 
  Check, 
  X, 
  Wrench, 
  Zap, 
  Clock, 
  ArrowRight,
  Sliders,
  FileText,
  HelpCircle,
  Eye
} from 'lucide-react';
import { 
  PERSONAS, 
  INITIAL_TEST_CASES, 
  SYSTEM_PROMPT_DEFAULT, 
  SYSTEM_PROMPT_FIXED, 
  BASELINE_METRICS, 
  OPTIMIZED_METRICS 
} from '../data/mockTestData';

export default function TestAgentPage({ 
  onOpenAuditLog, 
  onApplyFixAndRetest, 
  isFixApplied, 
  setIsFixApplied,
  autoStart = false
}) {
  // State for System Prompt Collapsible
  const [isPromptExpanded, setIsPromptExpanded] = useState(false);

  // Filter state for Personas
  const [selectedPersonaFilter, setSelectedPersonaFilter] = useState('all');

  // Test Runner State
  const [isRunning, setIsRunning] = useState(false);
  const [currentTestIndex, setCurrentTestIndex] = useState(autoStart ? 0 : 0);
  const [visibleCount, setVisibleCount] = useState(autoStart ? 1 : 16);
  const [playbackSpeed, setPlaybackSpeed] = useState('normal'); // 'normal' (~60s), 'fast' (20s), 'instant' (0s)
  
  // Human-in-the-loop feedback state: testId -> 'approved' | 'rejected'
  const [humanDecisions, setHumanDecisions] = useState({});

  // Dynamic test cases list (reflecting initial vs fixed responses)
  const [testCases, setTestCases] = useState(INITIAL_TEST_CASES);

  // Timer ref for step-by-step animation
  const timerRef = useRef(null);

  // Auto-start if requested from "Run Demo" button
  useEffect(() => {
    if (autoStart) {
      startTestRun();
    }
  }, [autoStart]);

  // Synchronize fixes when isFixApplied changes
  useEffect(() => {
    if (isFixApplied) {
      setTestCases(prev => prev.map(tc => {
        if (tc.fixedResponse) {
          return {
            ...tc,
            currentResponse: tc.fixedResponse,
            isFixedState: true
          };
        }
        return {
          ...tc,
          currentResponse: tc.initialResponse,
          isFixedState: false
        };
      }));
    } else {
      setTestCases(INITIAL_TEST_CASES.map(tc => ({
        ...tc,
        currentResponse: tc.initialResponse,
        isFixedState: false
      })));
    }
  }, [isFixApplied]);

  // Handle Playback Interval
  useEffect(() => {
    if (!isRunning) return;

    if (currentTestIndex >= testCases.length) {
      setIsRunning(false);
      return;
    }

    const delay = playbackSpeed === 'instant' ? 50 : playbackSpeed === 'fast' ? 800 : 2200;

    timerRef.current = setTimeout(() => {
      setCurrentTestIndex(prev => {
        const next = prev + 1;
        setVisibleCount(next);
        if (next >= testCases.length) {
          setIsRunning(false);
        }
        return next;
      });
    }, delay);

    return () => clearTimeout(timerRef.current);
  }, [isRunning, currentTestIndex, playbackSpeed, testCases.length]);

  const startTestRun = () => {
    setCurrentTestIndex(0);
    setVisibleCount(1);
    setIsRunning(true);
  };

  const pauseTestRun = () => {
    setIsRunning(false);
  };

  const resumeTestRun = () => {
    if (currentTestIndex >= testCases.length) {
      setCurrentTestIndex(0);
      setVisibleCount(1);
    }
    setIsRunning(true);
  };

  const resetTestRun = () => {
    setIsRunning(false);
    setCurrentTestIndex(0);
    setVisibleCount(16); // show all in idle
    setIsFixApplied(false);
  };

  const handleApplyFix = () => {
    setIsFixApplied(true);
    // Smoothly scroll to comparison banner
    window.scrollTo({ top: 120, behavior: 'smooth' });
  };

  const handleHumanReview = (testId, decision) => {
    setHumanDecisions(prev => ({
      ...prev,
      [testId]: decision
    }));
  };

  // Filter test cases based on persona tab
  const filteredTests = testCases.filter(tc => {
    if (selectedPersonaFilter === 'all') return true;
    return tc.personaId === selectedPersonaFilter;
  });

  const progressPercent = Math.min(100, Math.round((currentTestIndex / testCases.length) * 100));

  return (
    <div className="test-agent-page">
      {/* Page Title & Controls */}
      <div className="agent-header-bar">
        <div>
          <span className="badge badge-primary" style={{ marginBottom: '0.4rem' }}>
            Autonomous Evaluation Engine
          </span>
          <h1 style={{ fontSize: '1.85rem' }}>AI Product Tester Agent</h1>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
            Simulating 16 adversarial, boundary, and domain-specific conversations against Acuity Sales Copilot.
          </p>
        </div>

        {/* Global Action Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
          {!isRunning && currentTestIndex < testCases.length && currentTestIndex > 0 ? (
            <button className="btn btn-primary" onClick={resumeTestRun} id="resume-test-btn">
              <Play size={16} /> Resume Run
            </button>
          ) : isRunning ? (
            <button className="btn btn-secondary" onClick={pauseTestRun} id="pause-test-btn">
              <Pause size={16} /> Pause Evaluation
            </button>
          ) : (
            <button className="btn btn-primary" onClick={startTestRun} id="start-evaluation-btn">
              <Play size={16} /> Run Full Suite
            </button>
          )}

          <button className="btn btn-secondary" onClick={resetTestRun} id="reset-suite-btn" title="Reset all test states">
            <RotateCcw size={15} /> Reset
          </button>

          {/* Speed Toggle */}
          <div style={{
            display: 'flex',
            background: 'var(--bg-card-subtle)',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-light)',
            padding: '2px'
          }}>
            <button
              onClick={() => setPlaybackSpeed('normal')}
              style={{
                border: 'none',
                background: playbackSpeed === 'normal' ? '#FFFFFF' : 'transparent',
                color: playbackSpeed === 'normal' ? 'var(--primary)' : 'var(--text-muted)',
                fontWeight: 600,
                fontSize: '0.75rem',
                padding: '0.35rem 0.65rem',
                borderRadius: 'var(--radius-sm)',
                cursor: 'pointer'
              }}
            >
              1x (60s)
            </button>
            <button
              onClick={() => setPlaybackSpeed('fast')}
              style={{
                border: 'none',
                background: playbackSpeed === 'fast' ? '#FFFFFF' : 'transparent',
                color: playbackSpeed === 'fast' ? 'var(--primary)' : 'var(--text-muted)',
                fontWeight: 600,
                fontSize: '0.75rem',
                padding: '0.35rem 0.65rem',
                borderRadius: 'var(--radius-sm)',
                cursor: 'pointer'
              }}
            >
              2x (Fast)
            </button>
            <button
              onClick={() => setPlaybackSpeed('instant')}
              style={{
                border: 'none',
                background: playbackSpeed === 'instant' ? '#FFFFFF' : 'transparent',
                color: playbackSpeed === 'instant' ? 'var(--primary)' : 'var(--text-muted)',
                fontWeight: 600,
                fontSize: '0.75rem',
                padding: '0.35rem 0.65rem',
                borderRadius: 'var(--radius-sm)',
                cursor: 'pointer'
              }}
            >
              Instant
            </button>
          </div>
        </div>
      </div>

      {/* BEFORE & AFTER COMPARISON BANNER (Shows when fix is applied) */}
      {isFixApplied && (
        <div className="comparison-banner" id="before-after-banner">
          <div className="comparison-grid">
            {/* Before Run 1 */}
            <div>
              <span className="badge badge-danger" style={{ marginBottom: '0.4rem' }}>
                Run 1 (Baseline Copilot)
              </span>
              <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--danger-text)' }}>
                71.8 / 100
              </div>
              <p style={{ fontSize: '0.8rem', color: '#7F1D1D', marginTop: '0.2rem' }}>
                4 Severe Violations (System Prompt Leak, Fabricated $50k SLA, HIPAA PHI ingestion, Hostile Tone).
              </p>
            </div>

            {/* After Run 2 */}
            <div>
              <span className="badge badge-success" style={{ marginBottom: '0.4rem' }}>
                Run 2 (With Guardrails v2.1 Applied)
              </span>
              <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--success-text)' }}>
                93.4 / 100 <span style={{ fontSize: '1rem', color: 'var(--success-text)', fontWeight: 700 }}>(+21.6 pts)</span>
              </div>
              <p style={{ fontSize: '0.8rem', color: 'var(--success-text)', marginTop: '0.2rem' }}>
                0 Security Leaks • 0 Hallucinations • 100% Policy & Tone Compliance Verified.
              </p>
            </div>

            {/* Action */}
            <div style={{ textAlign: 'right' }}>
              <button 
                className="btn btn-secondary btn-sm"
                onClick={() => setIsFixApplied(false)}
                title="Revert to baseline to demonstrate failures"
              >
                <RotateCcw size={14} /> Compare Baseline
              </button>
            </div>
          </div>
        </div>
      )}

      {/* COLLAPSIBLE PANEL: Sample AI App Under Test */}
      <div className="system-prompt-card">
        <div 
          className="system-prompt-header"
          onClick={() => setIsPromptExpanded(!isPromptExpanded)}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{
              width: 32,
              height: 32,
              borderRadius: 6,
              background: 'var(--primary-light)',
              color: 'var(--primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <FileText size={17} />
            </div>
            <div>
              <h3 style={{ fontSize: '0.95rem', margin: 0 }}>
                Sample AI App Under Test: Acuity Sales Copilot
              </h3>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                {isFixApplied ? "System Prompt: Strict Guardrails v2.1 (Injection Defense & PHI Refusal)" : "System Prompt: Default v1.0 (Unprotected Baseline)"}
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span className="badge badge-neutral">
              {isFixExpandedBadge(isFixApplied)}
            </span>
            {isPromptExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </div>
        </div>

        {isPromptExpanded && (
          <div className="system-prompt-content">
            {isFixApplied ? SYSTEM_PROMPT_FIXED : SYSTEM_PROMPT_DEFAULT}
          </div>
        )}
      </div>

      {/* LIVE TEST RUN CONTROLS & PROGRESS BAR */}
      <div className="test-control-panel">
        <div className="progress-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span style={{ fontWeight: 700, fontSize: '0.95rem' }}>
              Evaluation Execution Feed
            </span>
            {isRunning && (
              <span className="badge badge-primary" style={{ animation: 'pulse 1.5s infinite' }}>
                <Zap size={12} /> Evaluating Case {Math.min(currentTestIndex + 1, testCases.length)} of {testCases.length}
              </span>
            )}
            {!isRunning && currentTestIndex >= testCases.length && (
              <span className="badge badge-success">
                <CheckCircle2 size={12} /> All 16 Test Cases Evaluated
              </span>
            )}
          </div>

          <span style={{ fontSize: '0.825rem', fontWeight: 600, color: 'var(--text-muted)' }}>
            {isRunning ? `${progressPercent}% Complete` : `${testCases.length} tests ready`}
          </span>
        </div>

        <div className="progress-bar-track">
          <div 
            className="progress-bar-fill" 
            style={{ width: `${isRunning || currentTestIndex > 0 ? progressPercent : 100}%` }}
          />
        </div>

        {/* Persona Tabs / Filters */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', overflowX: 'auto', paddingBottom: '0.25rem' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
            Personas:
          </span>
          <button
            onClick={() => setSelectedPersonaFilter('all')}
            style={{
              padding: '0.3rem 0.75rem',
              borderRadius: 'var(--radius-full)',
              border: selectedPersonaFilter === 'all' ? '1px solid var(--primary)' : '1px solid var(--border-light)',
              background: selectedPersonaFilter === 'all' ? 'var(--primary-light)' : '#FFFFFF',
              color: selectedPersonaFilter === 'all' ? 'var(--primary)' : 'var(--text-muted)',
              fontSize: '0.75rem',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            All (16)
          </button>
          {PERSONAS.map(p => (
            <button
              key={p.id}
              onClick={() => setSelectedPersonaFilter(p.id)}
              style={{
                padding: '0.3rem 0.75rem',
                borderRadius: 'var(--radius-full)',
                border: selectedPersonaFilter === p.id ? `1px solid ${p.color}` : '1px solid var(--border-light)',
                background: selectedPersonaFilter === p.id ? p.bg : '#FFFFFF',
                color: selectedPersonaFilter === p.id ? p.color : 'var(--text-muted)',
                fontSize: '0.75rem',
                fontWeight: 600,
                cursor: 'pointer',
                whiteSpace: 'nowrap'
              }}
            >
              {p.name} ({p.role})
            </button>
          ))}
        </div>
      </div>

      {/* STEP-BY-STEP LIVE FEED OF TESTS */}
      <div className="test-feed-container">
        {filteredTests.slice(0, isRunning ? visibleCount : testCases.length).map((testCase, index) => {
          const persona = PERSONAS.find(p => p.id === testCase.personaId);
          const response = isFixApplied && testCase.fixedResponse ? testCase.fixedResponse : testCase.initialResponse;
          const isFailed = !response.passed;
          const humanDecision = humanDecisions[testCase.id];

          return (
            <div 
              key={testCase.id} 
              className={`test-item-card ${isFailed ? 'is-failed' : isFixApplied && testCase.fixedResponse ? 'is-fixed' : 'is-passed'}`}
              id={`test-case-${testCase.id}`}
            >
              {/* Top Bar */}
              <div className="test-item-topbar">
                <div className="persona-tag-group">
                  <div 
                    className="persona-avatar" 
                    style={{ 
                      width: 32, 
                      height: 32, 
                      fontSize: '0.8rem', 
                      backgroundColor: persona?.bg, 
                      color: persona?.color,
                      marginBottom: 0
                    }}
                  >
                    {persona?.avatar}
                  </div>
                  <div>
                    <span style={{ fontWeight: 700, fontSize: '0.875rem' }}>{persona?.name}</span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginLeft: '0.4rem' }}>
                      ({persona?.role})
                    </span>
                  </div>
                  <span style={{
                    fontSize: '0.7rem',
                    background: persona?.bg,
                    color: persona?.color,
                    padding: '0.2rem 0.5rem',
                    borderRadius: 'var(--radius-full)',
                    fontWeight: 700
                  }}>
                    {persona?.badge}
                  </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  {/* Status Badge */}
                  {isFailed ? (
                    <span className="badge badge-danger">
                      <ShieldAlert size={13} />
                      FLAGGED (FAILED)
                    </span>
                  ) : isFixApplied && testCase.fixedResponse ? (
                    <span className="badge badge-success">
                      <Sparkles size={13} />
                      GUARDRAIL VERIFIED
                    </span>
                  ) : (
                    <span className="badge badge-success">
                      <CheckCircle2 size={13} />
                      PASSED
                    </span>
                  )}

                  {/* Audit Trail Button */}
                  <button 
                    className="btn btn-secondary btn-sm"
                    onClick={() => onOpenAuditLog(testCase, persona)}
                    title="Inspect LLM Evaluator Reasoning Trail & Raw JSON"
                  >
                    <Terminal size={13} />
                    Audit Log
                  </button>
                </div>
              </div>

              {/* Conversation Messages */}
              <div className="test-conversation-body">
                {/* User Message */}
                <div className="chat-bubble chat-bubble-user">
                  <span className="author-label">{persona?.name} (Simulated User):</span>
                  {testCase.userMessage}
                </div>

                {/* Copilot Response */}
                <div className={`chat-bubble chat-bubble-app ${isFailed ? 'is-failed-bubble' : ''}`}>
                  <span className="author-label">Acuity Sales Copilot:</span>
                  <div style={{ whiteSpace: 'pre-wrap' }}>
                    {response.text}
                  </div>
                </div>

                {/* AUTOMATIC SCORING METRICS (0-100) */}
                <div className="eval-score-grid">
                  <div className="score-metric-box">
                    <span className="score-metric-label">Accuracy</span>
                    <span className="score-metric-val" style={{ color: getScoreColor(response.scores.accuracy) }}>
                      {response.scores.accuracy}/100
                    </span>
                  </div>
                  <div className="score-metric-box">
                    <span className="score-metric-label">Relevance</span>
                    <span className="score-metric-val" style={{ color: getScoreColor(response.scores.relevance) }}>
                      {response.scores.relevance}/100
                    </span>
                  </div>
                  <div className="score-metric-box">
                    <span className="score-metric-label">Tone</span>
                    <span className="score-metric-val" style={{ color: getScoreColor(response.scores.tone) }}>
                      {response.scores.tone}/100
                    </span>
                  </div>
                  <div className="score-metric-box">
                    <span className="score-metric-label">Safety</span>
                    <span className="score-metric-val" style={{ color: getScoreColor(response.scores.safety) }}>
                      {response.scores.safety}/100
                    </span>
                  </div>

                  {/* Hallucination Flag */}
                  <div className="score-metric-box">
                    <span className="score-metric-label">Hallucination</span>
                    {response.hallucination ? (
                      <span className="badge badge-danger">DETECTED</span>
                    ) : (
                      <span className="badge badge-success">CLEAN</span>
                    )}
                  </div>

                  {/* Confidence Score */}
                  <div className="score-metric-box">
                    <span className="score-metric-label">Confidence</span>
                    <span style={{ fontWeight: 800, fontSize: '0.95rem' }}>
                      {response.confidence}%
                    </span>
                  </div>
                </div>

                {/* FAILURE FLAGGING & SUGGESTED FIX */}
                {isFailed && (
                  <div className="failure-box">
                    <div className="failure-title">
                      <ShieldAlert size={16} />
                      Violation Detected: {response.flagReason}
                    </div>

                    <div className="fix-recommendation-box">
                      <strong>Automated Suggested Fix (Prompt & Guardrail Policy):</strong>
                      {response.suggestedFix}
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', marginTop: '0.25rem' }}>
                      <button 
                        className="btn btn-primary btn-sm"
                        onClick={handleApplyFix}
                        id={`apply-fix-btn-${testCase.id}`}
                      >
                        <Wrench size={14} />
                        Apply Fix & Re-Test Suite
                      </button>
                    </div>
                  </div>
                )}

                {/* HUMAN-IN-THE-LOOP SECTION */}
                {response.humanReviewNeeded && !isFixApplied && (
                  <div className="human-review-banner">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <HelpCircle size={17} color="var(--warning-text)" />
                      <div>
                        <strong style={{ fontSize: '0.85rem', color: 'var(--warning-text)' }}>
                          Needs Human Review:
                        </strong>
                        <span style={{ fontSize: '0.8rem', color: '#92400E', marginLeft: '0.35rem' }}>
                          Model confidence {response.confidence}% or regulatory policy flagged this response.
                        </span>
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      {humanDecision ? (
                        <span className={`badge ${humanDecision === 'approved' ? 'badge-success' : 'badge-danger'}`}>
                          {humanDecision === 'approved' ? 'Approved by Operator' : 'Rejected by Operator'}
                        </span>
                      ) : (
                        <>
                          <button 
                            className="btn btn-outline-success btn-sm"
                            onClick={() => handleHumanReview(testCase.id, 'approved')}
                            id={`approve-btn-${testCase.id}`}
                          >
                            <Check size={14} /> Approve
                          </button>
                          <button 
                            className="btn btn-outline-danger btn-sm"
                            onClick={() => handleHumanReview(testCase.id, 'rejected')}
                            id={`reject-btn-${testCase.id}`}
                          >
                            <X size={14} /> Reject
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function getScoreColor(score) {
  if (score >= 90) return 'var(--success-text)';
  if (score >= 70) return 'var(--text-main)';
  if (score >= 50) return 'var(--warning-text)';
  return 'var(--danger-text)';
}

function isFixExpandedBadge(isFixApplied) {
  return isFixApplied ? "Guardrails v2.1 Active" : "Baseline v1.0 Active";
}
