import React from 'react';
import { ShieldCheck, Mail, Globe, Sparkles } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="footer-wrapper">
      <div className="footer-container">
        {/* Left: Built by aipnt */}
        <div className="footer-brand">
          <div className="footer-logo-badge">
            <div style={{
              width: 24, 
              height: 24, 
              borderRadius: 6, 
              background: '#2563EB', 
              color: '#FFF', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center'
            }}>
              <Sparkles size={14} />
            </div>
            <span>Built by <strong>aipnt</strong> for <strong>Impact AI</strong></span>
          </div>
          <span style={{ color: 'var(--text-subtle)' }}>•</span>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            Enterprise GenAI Evaluation, Automated Red-Teaming & Governance
          </span>
        </div>

        {/* Right: Contact & Trust */}
        <div className="footer-contact" style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <Mail size={14} color="var(--primary)" />
            <a href="mailto:contact@aipnt.com">contact@aipnt.com</a>
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <Globe size={14} color="var(--primary)" />
            <a href="https://aipnt.com" target="_blank" rel="noreferrer">aipnt.com</a>
          </span>
        </div>
      </div>
    </footer>
  );
}
