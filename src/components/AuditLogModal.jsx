import React, { useState } from 'react';
import { X, CheckCircle2, ShieldAlert, Cpu, Database, Eye, Terminal, FileCode } from 'lucide-react';

export default function AuditLogModal({ isOpen, onClose, testCase, persona }) {
  const [activeTab, setActiveTab] = useState('trail'); // 'trail' | 'raw'

  if (!isOpen || !testCase) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-card" style={{ maxWidth: '720px' }} onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <Terminal size={18} color="var(--primary)" />
            <div>
              <h3 style={{ fontSize: '1.05rem', margin: 0 }}>
                Audit Reasoning Trail: {testCase.title}
              </h3>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                Evaluated for {persona?.name} ({persona?.role}) • ID: {testCase.id}
              </span>
            </div>
          </div>
          <button 
            className="btn btn-secondary btn-sm" 
            style={{ padding: '0.25rem 0.5rem' }} 
            onClick={onClose}
          >
            <X size={16} />
          </button>
        </div>

        {/* Sub-nav in modal */}
        <div style={{ 
          padding: '0.5rem 1.5rem', 
          background: 'var(--bg-card-subtle)', 
          borderBottom: '1px solid var(--border-light)',
          display: 'flex',
          gap: '1rem'
        }}>
          <button
            onClick={() => setActiveTab('trail')}
            style={{
              background: 'transparent',
              border: 'none',
              fontSize: '0.825rem',
              fontWeight: 600,
              color: activeTab === 'trail' ? 'var(--primary)' : 'var(--text-muted)',
              borderBottom: activeTab === 'trail' ? '2px solid var(--primary)' : '2px solid transparent',
              paddingBottom: '0.4rem',
              cursor: 'pointer'
            }}
          >
            Step-by-Step Reasoning
          </button>
          <button
            onClick={() => setActiveTab('raw')}
            style={{
              background: 'transparent',
              border: 'none',
              fontSize: '0.825rem',
              fontWeight: 600,
              color: activeTab === 'raw' ? 'var(--primary)' : 'var(--text-muted)',
              borderBottom: activeTab === 'raw' ? '2px solid var(--primary)' : '2px solid transparent',
              paddingBottom: '0.4rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.3rem'
            }}
          >
            <FileCode size={14} />
            Raw Evaluation Payload
          </button>
        </div>

        <div className="modal-body" style={{ maxHeight: '60vh', overflowY: 'auto' }}>
          {activeTab === 'trail' ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {/* Telemetry Chips */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem' }}>
                <div style={{ background: '#F8FAFC', padding: '0.6rem 0.8rem', borderRadius: 8, border: '1px solid var(--border-light)' }}>
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', display: 'block' }}>EVALUATOR MODEL</span>
                  <strong style={{ fontSize: '0.85rem' }}>Impact-Eval-v4 (LLM-as-a-Judge)</strong>
                </div>
                <div style={{ background: '#F8FAFC', padding: '0.6rem 0.8rem', borderRadius: 8, border: '1px solid var(--border-light)' }}>
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', display: 'block' }}>INFERENCE LATENCY</span>
                  <strong style={{ fontSize: '0.85rem' }}>284 ms</strong>
                </div>
                <div style={{ background: '#F8FAFC', padding: '0.6rem 0.8rem', borderRadius: 8, border: '1px solid var(--border-light)' }}>
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', display: 'block' }}>SAFETY GATE</span>
                  <strong style={{ fontSize: '0.85rem', color: testCase.initialResponse.passed ? 'var(--success-text)' : 'var(--danger-text)' }}>
                    {testCase.initialResponse.passed ? 'PASSED' : 'FLAGGED (VIOLATION)'}
                  </strong>
                </div>
              </div>

              {/* Step Sequence */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <h4 style={{ fontSize: '0.85rem', textTransform: 'uppercase', color: 'var(--text-muted)', letterSpacing: '0.05em' }}>
                  Execution & Reasoning Pipeline
                </h4>
                {testCase.auditTrail?.map((trail, idx) => (
                  <div 
                    key={idx}
                    style={{
                      display: 'flex',
                      gap: '0.85rem',
                      background: '#FFFFFF',
                      padding: '0.75rem 1rem',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--border-light)'
                    }}
                  >
                    <div style={{
                      width: 26,
                      height: 26,
                      borderRadius: '50%',
                      background: 'var(--primary-light)',
                      color: 'var(--primary)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 700,
                      fontSize: '0.75rem',
                      flexShrink: 0
                    }}>
                      {idx + 1}
                    </div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '0.85rem', color: '#0F172A' }}>
                        {trail.step}
                      </div>
                      <div style={{ fontSize: '0.825rem', color: 'var(--text-muted)', marginTop: '0.15rem' }}>
                        {trail.detail}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Guardrail Context */}
              {testCase.initialResponse.flagReason && (
                <div style={{
                  background: 'var(--danger-light)',
                  border: '1px solid var(--danger-border)',
                  borderRadius: 'var(--radius-md)',
                  padding: '0.85rem 1rem'
                }}>
                  <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--danger-text)', marginBottom: '0.25rem' }}>
                    Failure Diagnostic:
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#7F1D1D' }}>
                    {testCase.initialResponse.flagReason}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <pre style={{
              background: '#0F172A',
              color: '#38BDF8',
              padding: '1rem',
              borderRadius: 'var(--radius-md)',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.775rem',
              overflowX: 'auto',
              lineHeight: 1.5
            }}>
              {JSON.stringify({
                testId: testCase.id,
                persona: persona?.name,
                role: persona?.role,
                prompt: testCase.userMessage,
                response: testCase.initialResponse.text,
                evaluationMetrics: testCase.initialResponse.scores,
                hallucination: testCase.initialResponse.hallucination,
                confidenceScore: testCase.initialResponse.confidence,
                evaluatorReasoning: testCase.auditTrail,
                suggestedFix: testCase.initialResponse.suggestedFix
              }, null, 2)}
            </pre>
          )}
        </div>

        <div className="modal-footer">
          <button className="btn btn-secondary btn-sm" onClick={onClose}>
            Close Audit Trail
          </button>
        </div>
      </div>
    </div>
  );
}
