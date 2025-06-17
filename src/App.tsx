import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from './components/layout/Navbar';
import Dashboard from './pages/Dashboard';
import BusinessDiscovery from './modules/business-discovery/BusinessDiscovery';
import AgentRecommendation from './modules/agent-recommendation/AgentRecommendation';
import AgentDeployment from './modules/agent-deployment/AgentDeployment';
import AutomationOrchestrator from './modules/automation-orchestrator/AutomationOrchestrator';
import MarketingEngine from './modules/marketing-engine/MarketingEngine';
import OutreachCampaigns from './modules/outreach-campaigns/OutreachCampaigns';
import KPIDashboard from './modules/kpi-dashboard/KPIDashboard';
import LandingPage from './pages/LandingPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <Navbar />
        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/business-discovery" element={<BusinessDiscovery />} />
            <Route path="/agent-recommendation" element={<AgentRecommendation />} />
            <Route path="/agent-deployment" element={<AgentDeployment />} />
            <Route path="/automation-orchestrator" element={<AutomationOrchestrator />} />
            <Route path="/marketing-engine" element={<MarketingEngine />} />
            <Route path="/outreach-campaigns" element={<OutreachCampaigns />} />
            <Route path="/kpi-dashboard" element={<KPIDashboard />} />
          </Routes>
        </motion.main>
      </div>
    </Router>
  );
}

export default App;