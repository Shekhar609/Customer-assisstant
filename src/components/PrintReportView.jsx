import React from 'react';
import { ShieldCheck, CheckCircle2, AlertTriangle, Calendar, Building, Sparkles } from 'lucide-react';
import { BASELINE_METRICS, OPTIMIZED_METRICS, PERSONAS } from '../data/mockTestData';

export default function PrintReportView({ isFixApplied }) {
  const metrics = isFixApplied ? OPTIMIZED_METRICS : BASELINE_METRICS;
  const today = new Date().toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  return (
    <div className="print-only-header">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '2px solid #0F172A', paddingBottom: '1.25rem', marginBottom: '1.5rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
            <div style={{ width: 28, height: 28, background: '#2563EB', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFF' }}>
              <ShieldCheck size={18} />
            </div>
            <h1 style={{ fontSize: '1.5rem', margin: 0, color: '#0F172A' }}>
              aipnt AI Quality Lab — Executive Briefing
            </h1>
          </div>
          <div style={{ fontSize: '0.85rem', color: '#64748B' }}>
            Continuous Evaluation, Adversarial Red-Teaming & Governance Report for <strong>Impact AI</strong>
          </div>
        </div>

        <div style={{ textAlign: 'right', fontSize: '0.8rem', color: '#64748B' }}>
          <div><strong>Date:</strong> {today}</div>
          <div><strong>Application Under Test:</strong> Acuity Sales Copilot</div>
          <div><strong>Evaluation Status:</strong> {isFixApplied ? "GUARDRAILS VERIFIED (OPTIMIZED)" : "BASELINE TEST COMPLETE"}</div>
        </div>
      </div>

      {/* Summary Scorecard Table */}
      <div style={{ marginBottom: '1.5rem' }}>
        <h3 style={{ fontSize: '1.1rem', marginBottom: '0.75rem', color: '#0F172A' }}>
          1. Key Governance Scorecard
        </h3>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem', border: '1px solid #CBD5E1' }}>
          <thead>
            <tr style={{ background: '#F1F5F9' }}>
              <th style={{ padding: '8px 12px', border: '1px solid #CBD5E1', textAlign: 'left' }}>Evaluation Dimension</th>
              <th style={{ padding: '8px 12px', border: '1px solid #CBD5E1', textAlign: 'center' }}>Run 1 (Baseline)</th>
              <th style={{ padding: '8px 12px', border: '1px solid #CBD5E1', textAlign: 'center' }}>Run 2 (Guardrails v2.1)</th>
              <th style={{ padding: '8px 12px', border: '1px solid #CBD5E1', textAlign: 'center' }}>Variance / Lift</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: '8px 12px', border: '1px solid #CBD5E1', fontWeight: 600 }}>Overall Quality Score</td>
              <td style={{ padding: '8px 12px', border: '1px solid #CBD5E1', textAlign: 'center' }}>71.8 / 100</td>
              <td style={{ padding: '8px 12px', border: '1px solid #CBD5E1', textAlign: 'center', fontWeight: 700, color: '#065F46' }}>93.4 / 100</td>
              <td style={{ padding: '8px 12px', border: '1px solid #CBD5E1', textAlign: 'center', color: '#065F46', fontWeight: 700 }}>+21.6 pts</td>
            </tr>
            <tr>
              <td style={{ padding: '8px 12px', border: '1px solid #CBD5E1', fontWeight: 600 }}>Accuracy & Factual Consistency</td>
              <td style={{ padding: '8px 12px', border: '1px solid #CBD5E1', textAlign: 'center' }}>74.2%</td>
              <td style={{ padding: '8px 12px', border: '1px solid #CBD5E1', textAlign: 'center', fontWeight: 700, color: '#065F46' }}>94.6%</td>
              <td style={{ padding: '8px 12px', border: '1px solid #CBD5E1', textAlign: 'center', color: '#065F46', fontWeight: 700 }}>+20.4%</td>
            </tr>
            <tr>
              <td style={{ padding: '8px 12px', border: '1px solid #CBD5E1', fontWeight: 600 }}>Hallucination Incidence Rate</td>
              <td style={{ padding: '8px 12px', border: '1px solid #CBD5E1', textAlign: 'center', color: '#991B1B' }}>18.8%</td>
              <td style={{ padding: '8px 12px', border: '1px solid #CBD5E1', textAlign: 'center', fontWeight: 700, color: '#065F46' }}>0.0%</td>
              <td style={{ padding: '8px 12px', border: '1px solid #CBD5E1', textAlign: 'center', color: '#065F46', fontWeight: 700 }}>-18.8% (Clean)</td>
            </tr>
            <tr>
              <td style={{ padding: '8px 12px', border: '1px solid #CBD5E1', fontWeight: 600 }}>Safety & Policy Violations</td>
              <td style={{ padding: '8px 12px', border: '1px solid #CBD5E1', textAlign: 'center', color: '#991B1B' }}>4 Violations</td>
              <td style={{ padding: '8px 12px', border: '1px solid #CBD5E1', textAlign: 'center', fontWeight: 700, color: '#065F46' }}>0 Violations</td>
              <td style={{ padding: '8px 12px', border: '1px solid #CBD5E1', textAlign: 'center', color: '#065F46', fontWeight: 700 }}>-100% (Defused)</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Remediation Notes */}
      <div style={{ marginBottom: '1.5rem' }}>
        <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', color: '#0F172A' }}>
          2. Verified Guardrail Interventions
        </h3>
        <ol style={{ fontSize: '0.85rem', color: '#334155', lineHeight: 1.6, paddingLeft: '1.25rem' }}>
          <li><strong>System Prompt Armor:</strong> Intercepted simulation tokens (DEBUG_MODE) and neutralized credential extraction attempts.</li>
          <li><strong>Contract & SLA Boundary Rules:</strong> Prohibited commitments to custom financial damages ($50,000 cash penalty) unsupported by Master Agreements.</li>
          <li><strong>HIPAA / PHI Ingestion Filter:</strong> Refused patient intake forms and diagnostic health records, preserving non-HIPAA compliance boundaries.</li>
          <li><strong>Empathy & Brand Voice Enforcer:</strong> Replaced defensive pushback against aggressive buyers with courteous consultative escalation.</li>
        </ol>
      </div>

      {/* Certification Footer */}
      <div style={{ borderTop: '1px solid #CBD5E1', paddingTop: '1rem', fontSize: '0.75rem', color: '#64748B', display: 'flex', justifyContent: 'space-between' }}>
        <span>Certified by <strong>aipnt AI Quality Lab</strong> for Impact AI</span>
        <span>SOC 2 Type II & ISO 42001 Evaluation Standard Compliant</span>
      </div>
    </div>
  );
}
