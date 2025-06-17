import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Bot, 
  Star, 
  TrendingUp, 
  Clock, 
  DollarSign,
  Filter,
  Search,
  ArrowRight,
  CheckCircle,
  Zap,
  BarChart3,
  Users,
  MessageSquare,
  Phone,
  Settings,
  Target
} from 'lucide-react';

interface AgentRecommendation {
  id: string;
  name: string;
  category: 'voice' | 'chat' | 'task' | 'workflow';
  description: string;
  matchScore: number;
  estimatedROI: number;
  implementationEffort: 'Low' | 'Medium' | 'High';
  timeToValue: number;
  requiredIntegrations: string[];
  keyBenefits: string[];
  caseStudyCount: number;
  pricing: {
    setup: number;
    monthly: number;
  };
}

const AgentRecommendation = () => {
  const [recommendations, setRecommendations] = useState<AgentRecommendation[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedAgent, setSelectedAgent] = useState<AgentRecommendation | null>(null);
  const [showROICalculator, setShowROICalculator] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const categories = [
    { id: 'all', label: 'All Agents', icon: Bot },
    { id: 'chat', label: 'Chat Agents', icon: MessageSquare },
    { id: 'voice', label: 'Voice Agents', icon: Phone },
    { id: 'task', label: 'Task Agents', icon: Settings },
    { id: 'workflow', label: 'Workflow Agents', icon: Target }
  ];

  const mockRecommendations: AgentRecommendation[] = [
    {
      id: 'agent_cs_chatbot',
      name: 'Customer Support Chatbot',
      category: 'chat',
      description: 'AI-powered chatbot for handling common customer inquiries with 24/7 availability',
      matchScore: 92,
      estimatedROI: 340,
      implementationEffort: 'Medium',
      timeToValue: 14,
      requiredIntegrations: ['Zendesk', 'Slack'],
      keyBenefits: [
        'Handles 70% of support tickets automatically',
        '24/7 availability reduces response time by 80%',
        'Saves $156K annually in agent costs',
        'Improves customer satisfaction by 25%'
      ],
      caseStudyCount: 3,
      pricing: { setup: 5000, monthly: 500 }
    },
    {
      id: 'agent_lead_scoring',
      name: 'Sales Lead Scoring Agent',
      category: 'task',
      description: 'Automated lead qualification and scoring system for sales teams',
      matchScore: 78,
      estimatedROI: 250,
      implementationEffort: 'Low',
      timeToValue: 7,
      requiredIntegrations: ['HubSpot', 'Salesforce'],
      keyBenefits: [
        'Automates lead qualification process',
        'Increases sales team efficiency by 40%',
        'Improves conversion rates by 15%',
        'Saves 20 hours/week of manual scoring'
      ],
      caseStudyCount: 5,
      pricing: { setup: 2000, monthly: 300 }
    },
    {
      id: 'agent_onboarding',
      name: 'Onboarding Assistant Bot',
      category: 'workflow',
      description: 'Automated user onboarding and tutorial system',
      matchScore: 85,
      estimatedROI: 180,
      implementationEffort: 'Medium',
      timeToValue: 21,
      requiredIntegrations: ['Intercom', 'Mixpanel'],
      keyBenefits: [
        'Reduces onboarding time by 50%',
        'Decreases support tickets by 40%',
        'Improves user activation by 30%',
        'Automates welcome sequences'
      ],
      caseStudyCount: 2,
      pricing: { setup: 4000, monthly: 400 }
    },
    {
      id: 'agent_voice_qualifier',
      name: 'Voice Sales Qualifier',
      category: 'voice',
      description: 'AI voice agent for qualifying inbound sales leads',
      matchScore: 70,
      estimatedROI: 200,
      implementationEffort: 'Medium',
      timeToValue: 28,
      requiredIntegrations: ['Calendly', 'Salesforce'],
      keyBenefits: [
        'Qualifies inbound leads via phone',
        'Books qualified demos automatically',
        'Operates 24/7 for global coverage',
        'Increases sales team focus on closing'
      ],
      caseStudyCount: 3,
      pricing: { setup: 6000, monthly: 800 }
    },
    {
      id: 'agent_content_gen',
      name: 'Content Generation Assistant',
      category: 'task',
      description: 'AI-powered content creation and optimization tool',
      matchScore: 65,
      estimatedROI: 120,
      implementationEffort: 'High',
      timeToValue: 42,
      requiredIntegrations: ['WordPress', 'Buffer'],
      keyBenefits: [
        'Automates blog post creation',
        'Generates social media content',
        'Creates help documentation',
        'Saves 15 hours/week of content work'
      ],
      caseStudyCount: 4,
      pricing: { setup: 8000, monthly: 600 }
    }
  ];

  useEffect(() => {
    // Simulate loading recommendations
    setTimeout(() => {
      setRecommendations(mockRecommendations);
      setIsLoading(false);
    }, 2000);
  }, []);

  const filteredRecommendations = selectedCategory === 'all' 
    ? recommendations 
    : recommendations.filter(agent => agent.category === selectedCategory);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'chat': return MessageSquare;
      case 'voice': return Phone;
      case 'task': return Settings;
      case 'workflow': return Target;
      default: return Bot;
    }
  };

  const getEffortColor = (effort: string) => {
    switch (effort) {
      case 'Low': return 'text-green-400 bg-green-500/20';
      case 'Medium': return 'text-yellow-400 bg-yellow-500/20';
      case 'High': return 'text-red-400 bg-red-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

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
          <h1 className="text-4xl font-bold text-white mb-2 flex items-center space-x-3">
            <Bot className="h-10 w-10 text-purple-400" />
            <span>Agent Recommendations</span>
          </h1>
          <p className="text-gray-400 text-lg">
            AI-powered agent recommendations tailored to your business needs
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-8"
        >
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                    selectedCategory === category.id
                      ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                      : 'bg-white/5 text-gray-300 hover:bg-white/10 border border-white/10'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{category.label}</span>
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Loading State */}
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-12 text-center"
          >
            <div className="animate-spin w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full mx-auto mb-4"></div>
            <h3 className="text-xl font-semibold text-white mb-2">Analyzing Your Business</h3>
            <p className="text-gray-400">Generating personalized agent recommendations...</p>
          </motion.div>
        )}

        {/* Recommendations Grid */}
        {!isLoading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6"
          >
            {filteredRecommendations.map((agent, index) => {
              const CategoryIcon = getCategoryIcon(agent.category);
              return (
                <motion.div
                  key={agent.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 group"
                >
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg">
                        <CategoryIcon className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-white group-hover:text-purple-300 transition-colors">
                          {agent.name}
                        </h3>
                        <span className="text-sm text-gray-400 capitalize">{agent.category} Agent</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-white font-semibold">{agent.matchScore}</span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                    {agent.description}
                  </p>

                  {/* Key Metrics */}
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="text-center">
                      <TrendingUp className="h-5 w-5 text-green-400 mx-auto mb-1" />
                      <div className="text-lg font-bold text-white">{agent.estimatedROI}%</div>
                      <div className="text-xs text-gray-400">ROI</div>
                    </div>
                    
                    <div className="text-center">
                      <Clock className="h-5 w-5 text-blue-400 mx-auto mb-1" />
                      <div className="text-lg font-bold text-white">{agent.timeToValue}d</div>
                      <div className="text-xs text-gray-400">Time to Value</div>
                    </div>
                  </div>

                  {/* Implementation Effort */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm text-gray-300">Implementation:</span>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${getEffortColor(agent.implementationEffort)}`}>
                      {agent.implementationEffort}
                    </span>
                  </div>

                  {/* Key Benefits */}
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-white mb-2">Key Benefits:</h4>
                    <ul className="space-y-1">
                      {agent.keyBenefits.slice(0, 2).map((benefit, idx) => (
                        <li key={idx} className="flex items-start space-x-2 text-xs text-gray-400">
                          <CheckCircle className="h-3 w-3 text-green-400 mt-0.5 flex-shrink-0" />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Pricing */}
                  <div className="flex items-center justify-between mb-4 text-sm">
                    <span className="text-gray-300">Setup: ${agent.pricing.setup.toLocaleString()}</span>
                    <span className="text-gray-300">Monthly: ${agent.pricing.monthly}</span>
                  </div>

                  {/* Actions */}
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setSelectedAgent(agent)}
                      className="flex-1 bg-white/10 hover:bg-white/20 text-white px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 flex items-center justify-center space-x-1"
                    >
                      <BarChart3 className="h-4 w-4" />
                      <span>Details</span>
                    </button>
                    
                    <button className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-2 rounded-lg text-sm font-medium hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-1">
                      <Zap className="h-4 w-4" />
                      <span>Deploy</span>
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}

        {/* Agent Detail Modal */}
        {selectedAgent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedAgent(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-slate-900 border border-white/10 rounded-2xl p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-white mb-2">{selectedAgent.name}</h2>
                  <p className="text-gray-400">{selectedAgent.description}</p>
                </div>
                <button
                  onClick={() => setSelectedAgent(null)}
                  className="text-gray-400 hover:text-white"
                >
                  ✕
                </button>
              </div>

              {/* Detailed Metrics */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center bg-white/5 rounded-lg p-4">
                  <Star className="h-6 w-6 text-yellow-400 mx-auto mb-2" />
                  <div className="text-xl font-bold text-white">{selectedAgent.matchScore}/100</div>
                  <div className="text-sm text-gray-400">Match Score</div>
                </div>
                
                <div className="text-center bg-white/5 rounded-lg p-4">
                  <TrendingUp className="h-6 w-6 text-green-400 mx-auto mb-2" />
                  <div className="text-xl font-bold text-white">{selectedAgent.estimatedROI}%</div>
                  <div className="text-sm text-gray-400">Estimated ROI</div>
                </div>
                
                <div className="text-center bg-white/5 rounded-lg p-4">
                  <Clock className="h-6 w-6 text-blue-400 mx-auto mb-2" />
                  <div className="text-xl font-bold text-white">{selectedAgent.timeToValue} days</div>
                  <div className="text-sm text-gray-400">Time to Value</div>
                </div>
              </div>

              {/* Key Benefits */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-white mb-3">Key Benefits</h3>
                <ul className="space-y-2">
                  {selectedAgent.keyBenefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-300">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Required Integrations */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-white mb-3">Required Integrations</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedAgent.requiredIntegrations.map((integration, idx) => (
                    <span key={idx} className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm">
                      {integration}
                    </span>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex space-x-4">
                <button
                  onClick={() => setShowROICalculator(true)}
                  className="flex-1 bg-white/10 hover:bg-white/20 text-white px-4 py-3 rounded-lg font-medium transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <BarChart3 className="h-5 w-5" />
                  <span>Calculate ROI</span>
                </button>
                
                <button className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-3 rounded-lg font-medium hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-2">
                  <Zap className="h-5 w-5" />
                  <span>Deploy Agent</span>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default AgentRecommendation;