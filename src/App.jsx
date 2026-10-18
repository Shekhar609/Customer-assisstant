import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import SettingsModal from './components/SettingsModal';
import AuditLogModal from './components/AuditLogModal';
import PrintReportView from './components/PrintReportView';
import HomePage from './pages/HomePage';
import TestAgentPage from './pages/TestAgentPage';
import DashboardPage from './pages/DashboardPage';

export default function App() {
  const [activeTab, setActiveTab] = useState('home'); // 'home' | 'test-agent' | 'dashboard'
  const [demoMode, setDemoMode] = useState(true); // fallback demo mode toggle
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isFixApplied, setIsFixApplied] = useState(false);
  const [autoStartTest, setAutoStartTest] = useState(false);

  // Selected test case for Audit Log Modal
  const [auditLogData, setAuditLogData] = useState({
    isOpen: false,
    testCase: null,
    persona: null
  });

  // Handler for "Run Demo" (preloads everything and launches ~60s walkthrough)
  const handleRunDemo = () => {
    setActiveTab('test-agent');
    setAutoStartTest(true);
    // Smooth scroll to top of feed
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  };

  const handleOpenAuditLog = (testCase, persona) => {
    setAuditLogData({
      isOpen: true,
      testCase,
      persona
    });
  };

  const handleCloseAuditLog = () => {
    setAuditLogData({
      isOpen: false,
      testCase: null,
      persona: null
    });
  };

  const handlePrintReport = () => {
    window.print();
  };

  return (
    <div className="app-container">
      {/* Printable executive summary when window.print() is called */}
      <PrintReportView isFixApplied={isFixApplied} />

      {/* Main App Navigation */}
      <Header 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        demoMode={demoMode} 
        setDemoMode={setDemoMode}
        onRunDemo={handleRunDemo}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onPrintReport={handlePrintReport}
      />

      {/* Main View Router */}
      <main className="main-content">
        {activeTab === 'home' && (
          <HomePage 
            onRunDemo={handleRunDemo} 
            onNavigate={(tab) => setActiveTab(tab)} 
          />
        )}

        {activeTab === 'test-agent' && (
          <TestAgentPage 
            onOpenAuditLog={handleOpenAuditLog}
            isFixApplied={isFixApplied}
            setIsFixApplied={setIsFixApplied}
            autoStart={autoStartTest}
          />
        )}

        {activeTab === 'dashboard' && (
          <DashboardPage 
            isFixApplied={isFixApplied}
            onOpenAuditLog={handleOpenAuditLog}
            onNavigateToTest={() => setActiveTab('test-agent')}
          />
        )}
      </main>

      {/* Footer on every page */}
      <Footer />

      {/* Modals */}
      <SettingsModal 
        isOpen={isSettingsOpen} 
        onClose={() => setIsSettingsOpen(false)}
        demoMode={demoMode}
        setDemoMode={setDemoMode}
      />

      <AuditLogModal 
        isOpen={auditLogData.isOpen}
        onClose={handleCloseAuditLog}
        testCase={auditLogData.testCase}
        persona={auditLogData.persona}
      />
    </div>
  );
}
