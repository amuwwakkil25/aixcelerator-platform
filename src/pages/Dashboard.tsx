import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Bot, Rocket, Settings, TrendingUp, Target, BarChart3, ArrowRight, Activity, Users, Zap } from 'lucide-react';

const Dashboard = () => {
  const modules = [
    {
      id: 'business-discovery',
      title: 'Business Discovery',
      description: 'Scan and analyze your business to identify automation opportunities',
      icon: Search,
      color: 'from-blue-600 to-blue-500',
      status: 'Ready',
      path: '/business-discovery'
    },
    {
      id: 'agent-recommendation',
      title: 'Agent Recommendation',
      description: 'Get AI-powered recommendations for the perfect agents',
      icon: Bot,
      color: 'from-slate-600 to-slate-500',
      status: 'Ready',
      path: '/agent-recommendation'
    },
    {
      id: 'agent-deployment',
      title: 'Agent Deployment',
      description: 'Deploy voice, chat, and task agents with one click',
      icon: Rocket,
      color: 'from-emerald-600 to-emerald-500',
      status: 'Ready',
      path: '/agent-deployment'
    },
    {
      id: 'automation-orchestrator',
      title: 'Automation Orchestrator',
      description: 'Orchestrate complex workflows and agent interactions',
      icon: Settings,
      color: 'from-amber-600 to-amber-500',
      status: 'Ready',
      path: '/automation-orchestrator'
    },
    {
      id: 'marketing-engine',
      title: 'Marketing Engine',
      description: 'Auto-generate content and marketing campaigns',
      icon: TrendingUp,
      color: 'from-indigo-600 to-indigo-500',
      status: 'Ready',
      path: '/marketing-engine'
    },
    {
      id: 'outreach-campaigns',
      title: 'Outreach Campaigns',
      description: 'Smart outreach and lead generation automation',
      icon: Target,
      color: 'from-violet-600 to-violet-500',
      status: 'Ready',
      path: '/outreach-campaigns'
    },
    {
      id: 'kpi-dashboard',
      title: 'KPI Dashboard',
      description: 'Track performance, ROI, and business metrics',
      icon: BarChart3,
      color: 'from-orange-600 to-orange-500',
      status: 'Ready',
      path: '/kpi-dashboard'
    }
  ];

  const quickStats = [
    { label: 'Active Agents', value: '12', icon: Bot, change: '+3' },
    { label: 'Automation Rate', value: '87%', icon: Activity, change: '+12%' },
    { label: 'Users Served', value: '2.4K', icon: Users, change: '+156' },
    { label: 'ROI Increase', value: '340%', icon: TrendingUp, change: '+45%' }
  ];

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-white mb-2">
            AIXcelerator Dashboard
          </h1>
          <p className="text-slate-400 text-lg">
            Manage your AI agent ecosystem from a single command center
          </p>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {quickStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="bg-slate-800/50 backdrop-blur-lg border border-slate-700/50 rounded-xl p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <Icon className="h-8 w-8 text-blue-400" />
                  <span className="text-emerald-400 text-sm font-medium">{stat.change}</span>
                </div>
                <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-slate-400 text-sm">{stat.label}</div>
              </div>
            );
          })}
        </motion.div>

        {/* Modules Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {modules.map((module, index) => {
            const Icon = module.icon;
            return (
              <motion.div
                key={module.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="group"
              >
                <Link
                  to={module.path}
                  className="block bg-slate-800/50 backdrop-blur-lg border border-slate-700/50 rounded-xl p-6 hover:bg-slate-800/70 transition-all duration-300 h-full"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-lg bg-gradient-to-r ${module.color}`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <span className="text-xs bg-emerald-600/20 text-emerald-400 px-2 py-1 rounded-full">
                      {module.status}
                    </span>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-blue-300 transition-colors">
                    {module.title}
                  </h3>
                  
                  <p className="text-slate-400 text-sm mb-4 line-clamp-2">
                    {module.description}
                  </p>
                  
                  <div className="flex items-center text-blue-400 text-sm font-medium group-hover:text-blue-300 transition-colors">
                    <span>Launch Module</span>
                    <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 bg-gradient-to-r from-blue-600/10 to-slate-600/10 backdrop-blur-lg border border-slate-700/50 rounded-2xl p-8"
        >
          <h2 className="text-2xl font-bold text-white mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link
              to="/business-discovery"
              className="flex items-center space-x-3 bg-slate-800/50 hover:bg-slate-800/70 border border-slate-700/50 rounded-lg p-4 transition-all duration-300"
            >
              <Search className="h-5 w-5 text-blue-400" />
              <span className="text-white font-medium">Scan New Business</span>
            </Link>
            
            <Link
              to="/agent-deployment"
              className="flex items-center space-x-3 bg-slate-800/50 hover:bg-slate-800/70 border border-slate-700/50 rounded-lg p-4 transition-all duration-300"
            >
              <Rocket className="h-5 w-5 text-emerald-400" />
              <span className="text-white font-medium">Deploy Agent</span>
            </Link>
            
            <Link
              to="/kpi-dashboard"
              className="flex items-center space-x-3 bg-slate-800/50 hover:bg-slate-800/70 border border-slate-700/50 rounded-lg p-4 transition-all duration-300"
            >
              <BarChart3 className="h-5 w-5 text-amber-400" />
              <span className="text-white font-medium">View Analytics</span>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;