import React from 'react';
import { ShieldCheck, Play, BarChart3, Settings, Printer, Sparkles, AlertCircle } from 'lucide-react';

export default function Header({ 
  activeTab, 
  setActiveTab, 
  demoMode, 
  setDemoMode, 
  onRunDemo, 
  onOpenSettings, 
  onPrintReport 
}) {
  return (
    <header className="navbar-wrapper">
      <div className="navbar-container">
        {/* Left: Brand & Partnership */}
        <div className="brand-group">
          <div className="brand-logo-badge" onClick={() => setActiveTab('home')}>
            <div className="logo-icon-box">
              <ShieldCheck size={22} strokeWidth={2.4} />
            </div>
            <div className="brand-text-col">
              <span className="brand-title">
                aipnt <span className="lab-tag">AI Quality Lab</span>
              </span>
              <span className="brand-partnership">
                Evaluations built for <strong>Impact AI</strong>
              </span>
            </div>
          </div>
        </div>

        {/* Center: Navigation Links */}
        <nav className="nav-links">
          <button 
            className={`nav-item ${activeTab === 'home' ? 'active' : ''}`}
            onClick={() => setActiveTab('home')}
            id="nav-home-btn"
          >
            Home
          </button>
          <button 
            className={`nav-item ${activeTab === 'test-agent' ? 'active' : ''}`}
            onClick={() => setActiveTab('test-agent')}
            id="nav-test-agent-btn"
          >
            <Play size={15} />
            Test Agent
          </button>
          <button 
            className={`nav-item ${activeTab === 'dashboard' ? 'active' : ''}`}
            onClick={() => setActiveTab('dashboard')}
            id="nav-dashboard-btn"
          >
            <BarChart3 size={15} />
            Dashboard
          </button>
        </nav>

        {/* Right: Actions & Demo Mode Toggle */}
        <div className="nav-actions">
          {/* Demo Mode Toggle */}
          <div 
            className="demo-mode-pill"
            title={demoMode ? "Demo Mode: using reliable realistic presets" : "Live Mode: using connected LLM edge function"}
            style={{ cursor: 'pointer' }}
            onClick={() => setDemoMode(!demoMode)}
            id="demo-mode-toggle"
          >
            <span className="status-dot" style={{ backgroundColor: demoMode ? 'var(--success)' : 'var(--primary)' }}></span>
            <span>{demoMode ? "Demo Mode (Presets)" : "Live LLM Engine"}</span>
          </div>

          {/* Quick Run Demo button */}
          <button 
            className="btn btn-primary btn-sm"
            onClick={onRunDemo}
            id="nav-quick-run-demo-btn"
            title="Launch full 60-second automated evaluation demo"
          >
            <Sparkles size={14} />
            Run Demo
          </button>

          {/* Export Report */}
          <button 
            className="btn btn-secondary btn-sm"
            onClick={onPrintReport}
            id="nav-print-report-btn"
            title="Export clean executive briefing PDF"
          >
            <Printer size={14} />
            Download Report
          </button>

          {/* Settings */}
          <button 
            className="btn btn-secondary btn-sm" 
            style={{ padding: '0.4rem 0.5rem' }}
            onClick={onOpenSettings}
            id="nav-settings-btn"
            title="Configure Lovable Cloud / LLM Edge Function"
          >
            <Settings size={15} />
          </button>
        </div>
      </div>
    </header>
  );
}
