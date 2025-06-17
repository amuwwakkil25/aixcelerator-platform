import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  Bot, 
  Zap, 
  Target, 
  BarChart3, 
  Rocket,
  CheckCircle,
  Star,
  Users,
  TrendingUp
} from 'lucide-react';

const LandingPage = () => {
  const features = [
    {
      icon: Bot,
      title: 'AI Agent Discovery',
      description: 'Automatically scan your business and get personalized AI agent recommendations'
    },
    {
      icon: Rocket,
      title: 'One-Click Deployment',
      description: 'Deploy voice, chat, and task agents instantly with zero code required'
    },
    {
      icon: Target,
      title: 'Smart Automation',
      description: 'Orchestrate complex workflows with intelligent automation and human handoff'
    },
    {
      icon: BarChart3,
      title: 'ROI Analytics',
      description: 'Track performance, measure impact, and optimize your AI agent ecosystem'
    }
  ];

  const stats = [
    { label: 'Businesses Automated', value: '2,500+' },
    { label: 'AI Agents Deployed', value: '15,000+' },
    { label: 'Hours Saved Daily', value: '50,000+' },
    { label: 'ROI Increase', value: '340%' }
  ];

  return (
    <div className="relative overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-slate-600/10 backdrop-blur-3xl" />
        
        <div className="relative max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-400 via-slate-200 to-blue-400 bg-clip-text text-transparent">
                AI Agent
              </span>
              <br />
              <span className="text-white">Operating System</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-slate-300 mb-8 max-w-3xl mx-auto">
              Automatically discover, deploy, and orchestrate AI agents tailored to your business. 
              No code required. Maximum impact guaranteed.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                to="/dashboard"
                className="group bg-gradient-to-r from-blue-600 to-blue-500 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 flex items-center space-x-2"
              >
                <span>Start Building</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <Link
                to="/business-discovery"
                className="border border-slate-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-slate-800/50 transition-all duration-300"
              >
                Discover Agents
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 to-slate-200 bg-clip-text text-transparent mb-2">
                  {stat.value}
                </div>
                <div className="text-slate-400 text-sm md:text-base">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Everything You Need to Scale
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              From business discovery to agent deployment, we've built the complete platform 
              for AI-powered business automation.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-slate-800/50 backdrop-blur-lg border border-slate-700/50 rounded-2xl p-6 hover:bg-slate-800/70 transition-all duration-300"
                >
                  <div className="bg-gradient-to-r from-blue-600 to-blue-500 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                  <p className="text-slate-400">{feature.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-r from-blue-600/10 to-slate-600/10 backdrop-blur-lg border border-slate-700/50 rounded-3xl p-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Accelerate?
            </h2>
            <p className="text-xl text-slate-300 mb-8">
              Join thousands of businesses already using AI agents to automate, scale, and grow.
            </p>
            <Link
              to="/dashboard"
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-2xl hover:shadow-blue-500/25 transition-all duration-300"
            >
              <span>Get Started Now</span>
              <Zap className="h-5 w-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;