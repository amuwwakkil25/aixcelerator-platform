import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Rocket, 
  Settings, 
  CheckCircle, 
  Clock,
  AlertCircle,
  Play,
  Pause,
  RotateCcw,
  Zap,
  Bot,
  MessageSquare,
  Phone,
  Target,
  Monitor,
  Database,
  Key,
  Globe,
  Activity,
  Users,
  DollarSign,
  TrendingUp,
  ExternalLink,
  Copy,
  Eye,
  EyeOff,
  ChevronDown,
  ChevronRight,
  Server,
  Shield,
  Wifi
} from 'lucide-react';

interface Agent {
  id: string;
  name: string;
  type: 'voice' | 'chat' | 'task' | 'workflow';
  description: string;
  status: 'draft' | 'deploying' | 'active' | 'paused' | 'failed';
  deployedAt?: Date;
  lastActivity?: Date;
  metrics: {
    interactions: number;
    successRate: number;
    avgResponseTime: number;
    uptime: number;
  };
  config: {
    provider: string;
    model: string;
    temperature: number;
    maxTokens: number;
  };
  integrations: string[];
  endpoint?: string;
}

interface DeploymentStep {
  id: string;
  name: string;
  status: 'pending' | 'running' | 'completed' | 'failed';
  duration?: number;
  error?: string;
}

const AgentDeployment = () => {
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [deploymentSteps, setDeploymentSteps] = useState<DeploymentStep[]>([]);
  const [isDeploying, setIsDeploying] = useState(false);
  const [showConfig, setShowConfig] = useState(false);
  const [showCredentials, setShowCredentials] = useState(false);
  const [expandedAgent, setExpandedAgent] = useState<string | null>(null);

  const mockAgents: Agent[] = [
    {
      id: 'agent_cs_chatbot',
      name: 'Customer Support Chatbot',
      type: 'chat',
      description: 'AI-powered customer support with 24/7 availability',
      status: 'active',
      deployedAt: new Date(Date.now() - 86400000 * 2),
      lastActivity: new Date(Date.now() - 3600000),
      metrics: {
        interactions: 1247,
        successRate: 94.2,
        avgResponseTime: 1.8,
        uptime: 99.9
      },
      config: {
        provider: 'OpenAI',
        model: 'gpt-4-turbo',
        temperature: 0.3,
        maxTokens: 500
      },
      integrations: ['Zendesk', 'Slack', 'Intercom'],
      endpoint: 'https://api.aixcelerator.com/agents/cs-chatbot'
    },
    {
      id: 'agent_voice_sales',
      name: 'Voice Sales Qualifier',
      type: 'voice',
      description: 'AI voice agent for qualifying inbound sales leads',
      status: 'deploying',
      metrics: {
        interactions: 0,
        successRate: 0,
        avgResponseTime: 0,
        uptime: 0
      },
      config: {
        provider: 'Vapi',
        model: 'gpt-4-turbo',
        temperature: 0.4,
        maxTokens: 300
      },
      integrations: ['Calendly', 'Salesforce', 'HubSpot']
    },
    {
      id: 'agent_task_processor',
      name: 'Document Processing Agent',
      type: 'task',
      description: 'Automated document analysis and data extraction',
      status: 'draft',
      metrics: {
        interactions: 0,
        successRate: 0,
        avgResponseTime: 0,
        uptime: 0
      },
      config: {
        provider: 'OpenAI',
        model: 'gpt-4-vision',
        temperature: 0.1,
        maxTokens: 1000
      },
      integrations: ['Google Drive', 'Dropbox', 'Notion']
    },
    {
      id: 'agent_workflow_onboarding',
      name: 'User Onboarding Assistant',
      type: 'workflow',
      description: 'Automated user onboarding and tutorial system',
      status: 'paused',
      deployedAt: new Date(Date.now() - 86400000 * 7),
      lastActivity: new Date(Date.now() - 86400000 * 2),
      metrics: {
        interactions: 456,
        successRate: 87.3,
        avgResponseTime: 2.4,
        uptime: 95.2
      },
      config: {
        provider: 'OpenAI',
        model: 'gpt-4',
        temperature: 0.5,
        maxTokens: 800
      },
      integrations: ['Intercom', 'Mixpanel', 'Segment']
    }
  ];

  const [agents, setAgents] = useState<Agent[]>(mockAgents);

  const deploymentStepsTemplate = [
    { id: 'validate', name: 'Validate Configuration', status: 'pending' as const },
    { id: 'provision', name: 'Provision Resources', status: 'pending' as const },
    { id: 'deploy', name: 'Deploy Agent', status: 'pending' as const },
    { id: 'test', name: 'Run Health Checks', status: 'pending' as const },
    { id: 'activate', name: 'Activate Agent', status: 'pending' as const }
  ];

  const handleDeploy = async (agent: Agent) => {
    setSelectedAgent(agent);
    setIsDeploying(true);
    setDeploymentSteps([...deploymentStepsTemplate]);

    // Update agent status
    setAgents(prev => prev.map(a => 
      a.id === agent.id ? { ...a, status: 'deploying' } : a
    ));

    // Simulate deployment process
    for (let i = 0; i < deploymentStepsTemplate.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 2000 + Math.random() * 2000));
      
      setDeploymentSteps(prev => prev.map((step, index) => 
        index === i 
          ? { ...step, status: 'completed', duration: Math.floor(1000 + Math.random() * 3000) }
          : step
      ));
    }

    // Update agent to active status
    setAgents(prev => prev.map(a => 
      a.id === agent.id 
        ? { 
            ...a, 
            status: 'active', 
            deployedAt: new Date(),
            endpoint: `https://api.aixcelerator.com/agents/${agent.id}`
          } 
        : a
    ));

    setIsDeploying(false);
  };

  const handlePause = (agentId: string) => {
    setAgents(prev => prev.map(a => 
      a.id === agentId ? { ...a, status: 'paused' } : a
    ));
  };

  const handleResume = (agentId: string) => {
    setAgents(prev => prev.map(a => 
      a.id === agentId ? { ...a, status: 'active' } : a
    ));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-400 bg-green-500/20';
      case 'deploying': return 'text-blue-400 bg-blue-500/20';
      case 'paused': return 'text-yellow-400 bg-yellow-500/20';
      case 'failed': return 'text-red-400 bg-red-500/20';
      case 'draft': return 'text-gray-400 bg-gray-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'chat': return MessageSquare;
      case 'voice': return Phone;
      case 'task': return Settings;
      case 'workflow': return Target;
      default: return Bot;
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
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
            <Rocket className="h-10 w-10 text-green-400" />
            <span>Agent Deployment</span>
          </h1>
          <p className="text-gray-400 text-lg">
            Deploy and manage your AI agents with one-click setup
          </p>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
        >
          <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <Activity className="h-8 w-8 text-green-400" />
              <span className="text-green-400 text-sm font-medium">+2</span>
            </div>
            <div className="text-2xl font-bold text-white mb-1">
              {agents.filter(a => a.status === 'active').length}
            </div>
            <div className="text-gray-400 text-sm">Active Agents</div>
          </div>

          <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <Users className="h-8 w-8 text-blue-400" />
              <span className="text-blue-400 text-sm font-medium">+247</span>
            </div>
            <div className="text-2xl font-bold text-white mb-1">1,703</div>
            <div className="text-gray-400 text-sm">Total Interactions</div>
          </div>

          <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <TrendingUp className="h-8 w-8 text-purple-400" />
              <span className="text-purple-400 text-sm font-medium">+5.2%</span>
            </div>
            <div className="text-2xl font-bold text-white mb-1">92.1%</div>
            <div className="text-gray-400 text-sm">Success Rate</div>
          </div>

          <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <Wifi className="h-8 w-8 text-yellow-400" />
              <span className="text-yellow-400 text-sm font-medium">99.9%</span>
            </div>
            <div className="text-2xl font-bold text-white mb-1">1.8s</div>
            <div className="text-gray-400 text-sm">Avg Response</div>
          </div>
        </motion.div>

        {/* Agents List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-6"
        >
          {agents.map((agent, index) => {
            const TypeIcon = getTypeIcon(agent.type);
            const isExpanded = expandedAgent === agent.id;
            
            return (
              <motion.div
                key={agent.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl overflow-hidden"
              >
                {/* Agent Header */}
                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg">
                        <TypeIcon className="h-6 w-6 text-white" />
                      </div>
                      
                      <div>
                        <h3 className="text-xl font-semibold text-white">{agent.name}</h3>
                        <p className="text-gray-400 text-sm">{agent.description}</p>
                        <div className="flex items-center space-x-4 mt-2">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(agent.status)}`}>
                            {agent.status.toUpperCase()}
                          </span>
                          <span className="text-gray-400 text-xs capitalize">{agent.type} Agent</span>
                          {agent.deployedAt && (
                            <span className="text-gray-400 text-xs">
                              Deployed {agent.deployedAt.toLocaleDateString()}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      {/* Agent Actions */}
                      {agent.status === 'draft' && (
                        <button
                          onClick={() => handleDeploy(agent)}
                          disabled={isDeploying}
                          className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all duration-300 flex items-center space-x-2 disabled:opacity-50"
                        >
                          <Rocket className="h-4 w-4" />
                          <span>Deploy</span>
                        </button>
                      )}

                      {agent.status === 'active' && (
                        <button
                          onClick={() => handlePause(agent.id)}
                          className="bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 px-4 py-2 rounded-lg hover:bg-yellow-500/30 transition-all duration-300 flex items-center space-x-2"
                        >
                          <Pause className="h-4 w-4" />
                          <span>Pause</span>
                        </button>
                      )}

                      {agent.status === 'paused' && (
                        <button
                          onClick={() => handleResume(agent.id)}
                          className="bg-green-500/20 text-green-400 border border-green-500/30 px-4 py-2 rounded-lg hover:bg-green-500/30 transition-all duration-300 flex items-center space-x-2"
                        >
                          <Play className="h-4 w-4" />
                          <span>Resume</span>
                        </button>
                      )}

                      <button
                        onClick={() => setExpandedAgent(isExpanded ? null : agent.id)}
                        className="text-gray-400 hover:text-white p-2 rounded-lg hover:bg-white/10 transition-all duration-300"
                      >
                        {isExpanded ? <ChevronDown className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
                      </button>
                    </div>
                  </div>

                  {/* Agent Metrics (for active agents) */}
                  {agent.status === 'active' && (
                    <div className="grid grid-cols-4 gap-4 mt-6">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-white">{agent.metrics.interactions.toLocaleString()}</div>
                        <div className="text-xs text-gray-400">Interactions</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-400">{agent.metrics.successRate}%</div>
                        <div className="text-xs text-gray-400">Success Rate</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-400">{agent.metrics.avgResponseTime}s</div>
                        <div className="text-xs text-gray-400">Avg Response</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-purple-400">{agent.metrics.uptime}%</div>
                        <div className="text-xs text-gray-400">Uptime</div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Expanded Details */}
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="border-t border-white/10 p-6 space-y-6"
                  >
                    {/* Configuration */}
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
                        <Settings className="h-5 w-5" />
                        <span>Configuration</span>
                      </h4>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="bg-white/5 rounded-lg p-4">
                          <div className="text-sm text-gray-400">Provider</div>
                          <div className="text-white font-medium">{agent.config.provider}</div>
                        </div>
                        <div className="bg-white/5 rounded-lg p-4">
                          <div className="text-sm text-gray-400">Model</div>
                          <div className="text-white font-medium">{agent.config.model}</div>
                        </div>
                        <div className="bg-white/5 rounded-lg p-4">
                          <div className="text-sm text-gray-400">Temperature</div>
                          <div className="text-white font-medium">{agent.config.temperature}</div>
                        </div>
                        <div className="bg-white/5 rounded-lg p-4">
                          <div className="text-sm text-gray-400">Max Tokens</div>
                          <div className="text-white font-medium">{agent.config.maxTokens}</div>
                        </div>
                      </div>
                    </div>

                    {/* Integrations */}
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
                        <Database className="h-5 w-5" />
                        <span>Integrations</span>
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {agent.integrations.map((integration, idx) => (
                          <span key={idx} className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm">
                            {integration}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Endpoint (for deployed agents) */}
                    {agent.endpoint && (
                      <div>
                        <h4 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
                          <Globe className="h-5 w-5" />
                          <span>API Endpoint</span>
                        </h4>
                        <div className="bg-white/5 rounded-lg p-4 flex items-center justify-between">
                          <code className="text-green-400 font-mono text-sm">{agent.endpoint}</code>
                          <button
                            onClick={() => copyToClipboard(agent.endpoint!)}
                            className="text-gray-400 hover:text-white p-2 rounded hover:bg-white/10 transition-all duration-300"
                          >
                            <Copy className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex space-x-4">
                      <button className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg transition-all duration-300 flex items-center space-x-2">
                        <Monitor className="h-4 w-4" />
                        <span>View Logs</span>
                      </button>
                      <button className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg transition-all duration-300 flex items-center space-x-2">
                        <Settings className="h-4 w-4" />
                        <span>Configure</span>
                      </button>
                      <button className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg transition-all duration-300 flex items-center space-x-2">
                        <ExternalLink className="h-4 w-4" />
                        <span>Test Agent</span>
                      </button>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </motion.div>

        {/* Deployment Modal */}
        {isDeploying && selectedAgent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-slate-900 border border-white/10 rounded-2xl p-8 max-w-2xl w-full"
            >
              <div className="flex items-center space-x-3 mb-6">
                <Rocket className="h-8 w-8 text-green-400" />
                <div>
                  <h2 className="text-2xl font-bold text-white">Deploying Agent</h2>
                  <p className="text-gray-400">{selectedAgent.name}</p>
                </div>
              </div>

              <div className="space-y-4">
                {deploymentSteps.map((step, index) => (
                  <div key={step.id} className="flex items-center space-x-4">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      step.status === 'completed' ? 'bg-green-500' : 
                      step.status === 'running' ? 'bg-blue-500' : 
                      step.status === 'failed' ? 'bg-red-500' : 'bg-gray-600'
                    }`}>
                      {step.status === 'completed' ? (
                        <CheckCircle className="h-5 w-5 text-white" />
                      ) : step.status === 'running' ? (
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      ) : step.status === 'failed' ? (
                        <AlertCircle className="h-5 w-5 text-white" />
                      ) : (
                        <span className="text-white text-sm">{index + 1}</span>
                      )}
                    </div>
                    
                    <div className="flex-1">
                      <div className="text-white font-medium">{step.name}</div>
                      {step.error && (
                        <div className="text-red-400 text-sm">{step.error}</div>
                      )}
                    </div>
                    
                    {step.duration && (
                      <div className="text-gray-400 text-sm">{step.duration}ms</div>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default AgentDeployment;