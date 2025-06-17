import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Settings, 
  Upload, 
  Link, 
  FileText, 
  Database, 
  Globe, 
  Key, 
  TestTube,
  Play,
  Save,
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  AlertCircle,
  Info,
  Plus,
  Trash2,
  Eye,
  EyeOff,
  Copy,
  Download,
  MessageSquare,
  Phone,
  Bot,
  Workflow,
  Zap,
  Brain,
  Shield,
  Clock,
  Users,
  Target,
  BarChart3,
  Mic,
  Volume2,
  Languages,
  Palette,
  Code,
  Server,
  Cloud,
  Lock,
  Unlock,
  RefreshCw,
  ExternalLink,
  ChevronDown,
  ChevronRight,
  X
} from 'lucide-react';

interface UseCase {
  id: string;
  name: string;
  category: 'voice' | 'chat' | 'task' | 'workflow';
  department: string;
  description: string;
  estimatedROI: number;
  implementationTime: string;
  complexity: 'Low' | 'Medium' | 'High';
  requiredIntegrations: string[];
}

interface AgentConfig {
  id: string;
  name: string;
  description: string;
  knowledgeBase: {
    documents: File[];
    urls: string[];
    textContent: string;
    faqs: Array<{ question: string; answer: string; }>;
  };
  integrations: {
    required: string[];
    optional: string[];
    configured: Array<{ name: string; status: 'connected' | 'pending' | 'error'; }>;
  };
  settings: {
    model: string;
    temperature: number;
    maxTokens: number;
    language: string;
    tone: string;
    responseTime: string;
    escalationRules: string[];
  };
  voiceSettings?: {
    voice: string;
    speed: number;
    pitch: number;
    language: string;
  };
  testScenarios: Array<{
    id: string;
    name: string;
    input: string;
    expectedOutput: string;
    status: 'pending' | 'passed' | 'failed';
  }>;
  deployment: {
    environment: 'development' | 'staging' | 'production';
    endpoint: string;
    apiKey: string;
    webhookUrl: string;
  };
}

interface AgentConfigurationProps {
  selectedUseCases: UseCase[];
  companyData: {
    name: string;
    industry: string;
    size: string;
  };
  onComplete: (configs: AgentConfig[]) => void;
  onBack: () => void;
}

const AgentConfiguration: React.FC<AgentConfigurationProps> = ({
  selectedUseCases,
  companyData,
  onComplete,
  onBack
}) => {
  const [currentAgentIndex, setCurrentAgentIndex] = useState(0);
  const [agentConfigs, setAgentConfigs] = useState<AgentConfig[]>(
    selectedUseCases.map(useCase => ({
      id: useCase.id,
      name: useCase.name,
      description: useCase.description,
      knowledgeBase: {
        documents: [],
        urls: [],
        textContent: '',
        faqs: []
      },
      integrations: {
        required: useCase.requiredIntegrations,
        optional: [],
        configured: []
      },
      settings: {
        model: 'gpt-4-turbo',
        temperature: 0.3,
        maxTokens: 500,
        language: 'English',
        tone: 'Professional',
        responseTime: 'Fast',
        escalationRules: []
      },
      voiceSettings: useCase.category === 'voice' ? {
        voice: 'alloy',
        speed: 1.0,
        pitch: 1.0,
        language: 'en-US'
      } : undefined,
      testScenarios: [],
      deployment: {
        environment: 'development',
        endpoint: '',
        apiKey: '',
        webhookUrl: ''
      }
    }))
  );

  const [activeTab, setActiveTab] = useState<'knowledge' | 'integrations' | 'settings' | 'testing' | 'deployment'>('knowledge');
  const [showApiKey, setShowApiKey] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isTesting, setIsTesting] = useState(false);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const currentAgent = agentConfigs[currentAgentIndex];
  const currentUseCase = selectedUseCases[currentAgentIndex];

  const tabs = [
    { id: 'knowledge', label: 'Knowledge Base', icon: Brain, description: 'Upload documents and configure knowledge' },
    { id: 'integrations', label: 'Integrations', icon: Link, description: 'Connect to your existing tools' },
    { id: 'settings', label: 'AI Settings', icon: Settings, description: 'Configure AI behavior and responses' },
    { id: 'testing', label: 'Testing', icon: TestTube, description: 'Test scenarios and validate responses' },
    { id: 'deployment', label: 'Deployment', icon: Cloud, description: 'Deploy and configure endpoints' }
  ];

  const updateAgentConfig = (updates: Partial<AgentConfig>) => {
    setAgentConfigs(prev => prev.map((config, index) => 
      index === currentAgentIndex ? { ...config, ...updates } : config
    ));
  };

  const handleFileUpload = async (files: FileList) => {
    setIsUploading(true);
    // Simulate file upload
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const newFiles = Array.from(files);
    updateAgentConfig({
      knowledgeBase: {
        ...currentAgent.knowledgeBase,
        documents: [...currentAgent.knowledgeBase.documents, ...newFiles]
      }
    });
    setIsUploading(false);
  };

  const addFAQ = () => {
    updateAgentConfig({
      knowledgeBase: {
        ...currentAgent.knowledgeBase,
        faqs: [...currentAgent.knowledgeBase.faqs, { question: '', answer: '' }]
      }
    });
  };

  const updateFAQ = (index: number, field: 'question' | 'answer', value: string) => {
    const updatedFaqs = [...currentAgent.knowledgeBase.faqs];
    updatedFaqs[index][field] = value;
    updateAgentConfig({
      knowledgeBase: {
        ...currentAgent.knowledgeBase,
        faqs: updatedFaqs
      }
    });
  };

  const removeFAQ = (index: number) => {
    updateAgentConfig({
      knowledgeBase: {
        ...currentAgent.knowledgeBase,
        faqs: currentAgent.knowledgeBase.faqs.filter((_, i) => i !== index)
      }
    });
  };

  const addTestScenario = () => {
    const newScenario = {
      id: `test_${Date.now()}`,
      name: `Test Scenario ${currentAgent.testScenarios.length + 1}`,
      input: '',
      expectedOutput: '',
      status: 'pending' as const
    };
    
    updateAgentConfig({
      testScenarios: [...currentAgent.testScenarios, newScenario]
    });
  };

  const runTests = async () => {
    setIsTesting(true);
    // Simulate test execution
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    const updatedScenarios = currentAgent.testScenarios.map(scenario => ({
      ...scenario,
      status: Math.random() > 0.3 ? 'passed' : 'failed' as const
    }));
    
    updateAgentConfig({
      testScenarios: updatedScenarios
    });
    setIsTesting(false);
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'chat': return MessageSquare;
      case 'voice': return Phone;
      case 'task': return Bot;
      case 'workflow': return Workflow;
      default: return Bot;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'chat': return 'from-blue-500 to-cyan-500';
      case 'voice': return 'from-green-500 to-emerald-500';
      case 'task': return 'from-purple-500 to-pink-500';
      case 'workflow': return 'from-orange-500 to-red-500';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const getCompletionPercentage = () => {
    let completed = 0;
    let total = 5; // Number of configuration sections

    // Knowledge Base
    if (currentAgent.knowledgeBase.documents.length > 0 || 
        currentAgent.knowledgeBase.urls.length > 0 || 
        currentAgent.knowledgeBase.textContent.length > 0 ||
        currentAgent.knowledgeBase.faqs.length > 0) {
      completed++;
    }

    // Integrations
    if (currentAgent.integrations.configured.length > 0) {
      completed++;
    }

    // Settings
    if (currentAgent.settings.model && currentAgent.settings.tone) {
      completed++;
    }

    // Testing
    if (currentAgent.testScenarios.length > 0) {
      completed++;
    }

    // Deployment
    if (currentAgent.deployment.environment && currentAgent.deployment.endpoint) {
      completed++;
    }

    return Math.round((completed / total) * 100);
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-8"
      >
        <h2 className="text-3xl font-bold text-white mb-4">
          Configure Your AI Agents
        </h2>
        <p className="text-gray-400 text-lg">
          Set up each agent with your specific requirements, knowledge base, and integrations
        </p>
      </motion.div>

      {/* Agent Selection */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="mb-8"
      >
        <div className="flex space-x-4 overflow-x-auto pb-4">
          {selectedUseCases.map((useCase, index) => {
            const Icon = getCategoryIcon(useCase.category);
            const isActive = index === currentAgentIndex;
            const completion = index === currentAgentIndex ? getCompletionPercentage() : 0;
            
            return (
              <button
                key={useCase.id}
                onClick={() => setCurrentAgentIndex(index)}
                className={`flex-shrink-0 p-4 rounded-xl border-2 transition-all duration-300 min-w-[280px] ${
                  isActive
                    ? 'border-purple-500 bg-purple-500/20'
                    : 'border-white/20 bg-white/5 hover:border-purple-400'
                }`}
              >
                <div className="flex items-center space-x-3 mb-3">
                  <div className={`p-2 rounded-lg bg-gradient-to-r ${getCategoryColor(useCase.category)}`}>
                    <Icon className="h-5 w-5 text-white" />
                  </div>
                  <div className="text-left">
                    <div className="text-white font-medium">{useCase.name}</div>
                    <div className="text-gray-400 text-sm">{useCase.department}</div>
                  </div>
                </div>
                
                {/* Progress Bar */}
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${completion}%` }}
                  />
                </div>
                <div className="text-xs text-gray-400 mt-1">{completion}% Complete</div>
              </button>
            );
          })}
        </div>
      </motion.div>

      {/* Configuration Interface */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl overflow-hidden"
      >
        {/* Tabs */}
        <div className="border-b border-white/10">
          <div className="flex overflow-x-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center space-x-3 px-6 py-4 font-medium transition-all duration-300 border-b-2 min-w-max ${
                    activeTab === tab.id
                      ? 'border-purple-500 text-purple-300 bg-purple-500/10'
                      : 'border-transparent text-gray-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <div className="text-left">
                    <div>{tab.label}</div>
                    <div className="text-xs text-gray-400">{tab.description}</div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Content */}
        <div className="p-8">
          {/* Knowledge Base Tab */}
          {activeTab === 'knowledge' && (
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Knowledge Base Configuration</h3>
                <p className="text-gray-400 mb-6">
                  Upload documents, add URLs, and create FAQs to train your agent with specific knowledge.
                </p>
              </div>

              {/* Document Upload */}
              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <h4 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
                  <Upload className="h-5 w-5" />
                  <span>Document Upload</span>
                </h4>
                
                <div className="border-2 border-dashed border-white/20 rounded-lg p-8 text-center">
                  <input
                    type="file"
                    multiple
                    accept=".pdf,.doc,.docx,.txt,.md"
                    onChange={(e) => e.target.files && handleFileUpload(e.target.files)}
                    className="hidden"
                    id="file-upload"
                  />
                  <label htmlFor="file-upload" className="cursor-pointer">
                    <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <div className="text-white font-medium mb-2">
                      {isUploading ? 'Uploading...' : 'Click to upload documents'}
                    </div>
                    <div className="text-gray-400 text-sm">
                      Supports PDF, DOC, DOCX, TXT, MD files
                    </div>
                  </label>
                </div>

                {/* Uploaded Files */}
                {currentAgent.knowledgeBase.documents.length > 0 && (
                  <div className="mt-4 space-y-2">
                    <h5 className="text-white font-medium">Uploaded Documents:</h5>
                    {currentAgent.knowledgeBase.documents.map((file, index) => (
                      <div key={index} className="flex items-center justify-between bg-white/5 rounded-lg p-3">
                        <div className="flex items-center space-x-3">
                          <FileText className="h-5 w-5 text-blue-400" />
                          <span className="text-white">{file.name}</span>
                          <span className="text-gray-400 text-sm">
                            {(file.size / 1024 / 1024).toFixed(2)} MB
                          </span>
                        </div>
                        <button className="text-red-400 hover:text-red-300">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* URL Sources */}
              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <h4 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
                  <Globe className="h-5 w-5" />
                  <span>Website URLs</span>
                </h4>
                
                <div className="space-y-4">
                  <div className="flex space-x-2">
                    <input
                      type="url"
                      placeholder="https://example.com/documentation"
                      className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                    <button className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-lg transition-all duration-300">
                      Add URL
                    </button>
                  </div>
                  
                  {currentAgent.knowledgeBase.urls.length > 0 && (
                    <div className="space-y-2">
                      {currentAgent.knowledgeBase.urls.map((url, index) => (
                        <div key={index} className="flex items-center justify-between bg-white/5 rounded-lg p-3">
                          <div className="flex items-center space-x-3">
                            <Globe className="h-5 w-5 text-green-400" />
                            <span className="text-white">{url}</span>
                          </div>
                          <button className="text-red-400 hover:text-red-300">
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Text Content */}
              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <h4 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
                  <FileText className="h-5 w-5" />
                  <span>Direct Text Input</span>
                </h4>
                
                <textarea
                  value={currentAgent.knowledgeBase.textContent}
                  onChange={(e) => updateAgentConfig({
                    knowledgeBase: {
                      ...currentAgent.knowledgeBase,
                      textContent: e.target.value
                    }
                  })}
                  placeholder="Paste your company information, policies, or any text content here..."
                  className="w-full h-32 px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                />
              </div>

              {/* FAQs */}
              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-lg font-semibold text-white flex items-center space-x-2">
                    <MessageSquare className="h-5 w-5" />
                    <span>Frequently Asked Questions</span>
                  </h4>
                  <button
                    onClick={addFAQ}
                    className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg transition-all duration-300 flex items-center space-x-2"
                  >
                    <Plus className="h-4 w-4" />
                    <span>Add FAQ</span>
                  </button>
                </div>

                <div className="space-y-4">
                  {currentAgent.knowledgeBase.faqs.map((faq, index) => (
                    <div key={index} className="bg-white/5 border border-white/10 rounded-lg p-4">
                      <div className="space-y-3">
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">Question</label>
                          <input
                            type="text"
                            value={faq.question}
                            onChange={(e) => updateFAQ(index, 'question', e.target.value)}
                            placeholder="What is your return policy?"
                            className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">Answer</label>
                          <textarea
                            value={faq.answer}
                            onChange={(e) => updateFAQ(index, 'answer', e.target.value)}
                            placeholder="Our return policy allows..."
                            className="w-full h-20 px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                          />
                        </div>
                        <div className="flex justify-end">
                          <button
                            onClick={() => removeFAQ(index)}
                            className="text-red-400 hover:text-red-300 p-2"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {currentAgent.knowledgeBase.faqs.length === 0 && (
                    <div className="text-center py-8 text-gray-400">
                      No FAQs added yet. Click "Add FAQ" to get started.
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Integrations Tab */}
          {activeTab === 'integrations' && (
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Integration Configuration</h3>
                <p className="text-gray-400 mb-6">
                  Connect your agent to existing tools and platforms for seamless workflow integration.
                </p>
              </div>

              {/* Required Integrations */}
              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <h4 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
                  <Shield className="h-5 w-5 text-red-400" />
                  <span>Required Integrations</span>
                </h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {currentAgent.integrations.required.map((integration, index) => (
                    <div key={index} className="bg-white/5 border border-white/10 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <Database className="h-5 w-5 text-blue-400" />
                          <span className="text-white font-medium">{integration}</span>
                        </div>
                        <span className="px-2 py-1 bg-red-500/20 text-red-300 rounded text-xs">
                          Required
                        </span>
                      </div>
                      
                      <div className="space-y-3">
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-1">API Key</label>
                          <div className="relative">
                            <input
                              type={showApiKey ? 'text' : 'password'}
                              placeholder="Enter API key..."
                              className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 pr-10"
                            />
                            <button
                              onClick={() => setShowApiKey(!showApiKey)}
                              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                            >
                              {showApiKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </button>
                          </div>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-1">Endpoint URL</label>
                          <input
                            type="url"
                            placeholder="https://api.example.com"
                            className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                          />
                        </div>
                        
                        <button className="w-full bg-purple-500 hover:bg-purple-600 text-white py-2 rounded-lg transition-all duration-300">
                          Test Connection
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Optional Integrations */}
              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <h4 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
                  <Plus className="h-5 w-5 text-green-400" />
                  <span>Optional Integrations</span>
                </h4>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {['Slack', 'Microsoft Teams', 'Discord', 'Zapier', 'Webhooks', 'Custom API'].map((integration, index) => (
                    <button
                      key={index}
                      className="bg-white/5 border border-white/10 rounded-lg p-4 hover:bg-white/10 transition-all duration-300 text-left"
                    >
                      <div className="flex items-center space-x-3">
                        <Link className="h-5 w-5 text-gray-400" />
                        <span className="text-white">{integration}</span>
                      </div>
                      <div className="text-gray-400 text-sm mt-2">
                        Click to configure
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* AI Settings Tab */}
          {activeTab === 'settings' && (
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">AI Behavior Configuration</h3>
                <p className="text-gray-400 mb-6">
                  Fine-tune your agent's AI behavior, personality, and response characteristics.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Core AI Settings */}
                <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                  <h4 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
                    <Brain className="h-5 w-5" />
                    <span>Core AI Settings</span>
                  </h4>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">AI Model</label>
                      <select
                        value={currentAgent.settings.model}
                        onChange={(e) => updateAgentConfig({
                          settings: { ...currentAgent.settings, model: e.target.value }
                        })}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                      >
                        <option value="gpt-4-turbo">GPT-4 Turbo (Recommended)</option>
                        <option value="gpt-4">GPT-4</option>
                        <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
                        <option value="claude-3">Claude 3</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Temperature: {currentAgent.settings.temperature}
                      </label>
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.1"
                        value={currentAgent.settings.temperature}
                        onChange={(e) => updateAgentConfig({
                          settings: { ...currentAgent.settings, temperature: parseFloat(e.target.value) }
                        })}
                        className="w-full"
                      />
                      <div className="flex justify-between text-xs text-gray-400 mt-1">
                        <span>Conservative</span>
                        <span>Creative</span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Max Response Length</label>
                      <select
                        value={currentAgent.settings.maxTokens}
                        onChange={(e) => updateAgentConfig({
                          settings: { ...currentAgent.settings, maxTokens: parseInt(e.target.value) }
                        })}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                      >
                        <option value={150}>Short (150 tokens)</option>
                        <option value={500}>Medium (500 tokens)</option>
                        <option value={1000}>Long (1000 tokens)</option>
                        <option value={2000}>Very Long (2000 tokens)</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Personality Settings */}
                <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                  <h4 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
                    <Palette className="h-5 w-5" />
                    <span>Personality & Tone</span>
                  </h4>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Communication Tone</label>
                      <select
                        value={currentAgent.settings.tone}
                        onChange={(e) => updateAgentConfig({
                          settings: { ...currentAgent.settings, tone: e.target.value }
                        })}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                      >
                        <option value="Professional">Professional</option>
                        <option value="Friendly">Friendly</option>
                        <option value="Casual">Casual</option>
                        <option value="Formal">Formal</option>
                        <option value="Enthusiastic">Enthusiastic</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Primary Language</label>
                      <select
                        value={currentAgent.settings.language}
                        onChange={(e) => updateAgentConfig({
                          settings: { ...currentAgent.settings, language: e.target.value }
                        })}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                      >
                        <option value="English">English</option>
                        <option value="Spanish">Spanish</option>
                        <option value="French">French</option>
                        <option value="German">German</option>
                        <option value="Portuguese">Portuguese</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Response Speed</label>
                      <select
                        value={currentAgent.settings.responseTime}
                        onChange={(e) => updateAgentConfig({
                          settings: { ...currentAgent.settings, responseTime: e.target.value }
                        })}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                      >
                        <option value="Instant">Instant (&lt; 1s)</option>
                        <option value="Fast">Fast (1-2s)</option>
                        <option value="Balanced">Balanced (2-3s)</option>
                        <option value="Thoughtful">Thoughtful (3-5s)</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Voice Settings (for voice agents) */}
              {currentUseCase.category === 'voice' && currentAgent.voiceSettings && (
                <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                  <h4 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
                    <Mic className="h-5 w-5" />
                    <span>Voice Configuration</span>
                  </h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Voice Type</label>
                      <select
                        value={currentAgent.voiceSettings.voice}
                        onChange={(e) => updateAgentConfig({
                          voiceSettings: { ...currentAgent.voiceSettings!, voice: e.target.value }
                        })}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                      >
                        <option value="alloy">Alloy (Neutral)</option>
                        <option value="echo">Echo (Male)</option>
                        <option value="fable">Fable (British)</option>
                        <option value="onyx">Onyx (Deep)</option>
                        <option value="nova">Nova (Female)</option>
                        <option value="shimmer">Shimmer (Soft)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Speaking Speed: {currentAgent.voiceSettings.speed}x
                      </label>
                      <input
                        type="range"
                        min="0.5"
                        max="2"
                        step="0.1"
                        value={currentAgent.voiceSettings.speed}
                        onChange={(e) => updateAgentConfig({
                          voiceSettings: { ...currentAgent.voiceSettings!, speed: parseFloat(e.target.value) }
                        })}
                        className="w-full"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Pitch: {currentAgent.voiceSettings.pitch}x
                      </label>
                      <input
                        type="range"
                        min="0.5"
                        max="2"
                        step="0.1"
                        value={currentAgent.voiceSettings.pitch}
                        onChange={(e) => updateAgentConfig({
                          voiceSettings: { ...currentAgent.voiceSettings!, pitch: parseFloat(e.target.value) }
                        })}
                        className="w-full"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Voice Language</label>
                      <select
                        value={currentAgent.voiceSettings.language}
                        onChange={(e) => updateAgentConfig({
                          voiceSettings: { ...currentAgent.voiceSettings!, language: e.target.value }
                        })}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                      >
                        <option value="en-US">English (US)</option>
                        <option value="en-GB">English (UK)</option>
                        <option value="es-ES">Spanish</option>
                        <option value="fr-FR">French</option>
                        <option value="de-DE">German</option>
                      </select>
                    </div>
                  </div>

                  <div className="mt-4">
                    <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-all duration-300 flex items-center space-x-2">
                      <Volume2 className="h-4 w-4" />
                      <span>Test Voice</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Testing Tab */}
          {activeTab === 'testing' && (
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Agent Testing</h3>
                <p className="text-gray-400 mb-6">
                  Create test scenarios to validate your agent's responses and behavior.
                </p>
              </div>

              {/* Test Scenarios */}
              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <h4 className="text-lg font-semibold text-white flex items-center space-x-2">
                    <TestTube className="h-5 w-5" />
                    <span>Test Scenarios</span>
                  </h4>
                  <div className="flex space-x-3">
                    <button
                      onClick={addTestScenario}
                      className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg transition-all duration-300 flex items-center space-x-2"
                    >
                      <Plus className="h-4 w-4" />
                      <span>Add Test</span>
                    </button>
                    <button
                      onClick={runTests}
                      disabled={currentAgent.testScenarios.length === 0 || isTesting}
                      className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-all duration-300 flex items-center space-x-2 disabled:opacity-50"
                    >
                      <Play className="h-4 w-4" />
                      <span>{isTesting ? 'Running...' : 'Run All Tests'}</span>
                    </button>
                  </div>
                </div>

                <div className="space-y-4">
                  {currentAgent.testScenarios.map((scenario, index) => (
                    <div key={scenario.id} className="bg-white/5 border border-white/10 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <input
                          type="text"
                          value={scenario.name}
                          onChange={(e) => {
                            const updatedScenarios = [...currentAgent.testScenarios];
                            updatedScenarios[index].name = e.target.value;
                            updateAgentConfig({ testScenarios: updatedScenarios });
                          }}
                          className="text-white font-medium bg-transparent border-none outline-none"
                        />
                        <div className="flex items-center space-x-2">
                          {scenario.status === 'passed' && <CheckCircle className="h-5 w-5 text-green-400" />}
                          {scenario.status === 'failed' && <AlertCircle className="h-5 w-5 text-red-400" />}
                          {scenario.status === 'pending' && <Clock className="h-5 w-5 text-gray-400" />}
                          <button
                            onClick={() => {
                              const updatedScenarios = currentAgent.testScenarios.filter((_, i) => i !== index);
                              updateAgentConfig({ testScenarios: updatedScenarios });
                            }}
                            className="text-red-400 hover:text-red-300"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">Test Input</label>
                          <textarea
                            value={scenario.input}
                            onChange={(e) => {
                              const updatedScenarios = [...currentAgent.testScenarios];
                              updatedScenarios[index].input = e.target.value;
                              updateAgentConfig({ testScenarios: updatedScenarios });
                            }}
                            placeholder="Enter test input..."
                            className="w-full h-20 px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">Expected Output</label>
                          <textarea
                            value={scenario.expectedOutput}
                            onChange={(e) => {
                              const updatedScenarios = [...currentAgent.testScenarios];
                              updatedScenarios[index].expectedOutput = e.target.value;
                              updateAgentConfig({ testScenarios: updatedScenarios });
                            }}
                            placeholder="Enter expected response..."
                            className="w-full h-20 px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {currentAgent.testScenarios.length === 0 && (
                    <div className="text-center py-8 text-gray-400">
                      No test scenarios created yet. Click "Add Test" to get started.
                    </div>
                  )}
                </div>
              </div>

              {/* Live Testing */}
              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <h4 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
                  <MessageSquare className="h-5 w-5" />
                  <span>Live Testing</span>
                </h4>
                
                <div className="bg-white/5 border border-white/10 rounded-lg p-4 h-64 overflow-y-auto mb-4">
                  <div className="text-gray-400 text-center py-8">
                    Start a conversation to test your agent live...
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <input
                    type="text"
                    placeholder="Type a message to test your agent..."
                    className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                  <button className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-lg transition-all duration-300">
                    Send
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Deployment Tab */}
          {activeTab === 'deployment' && (
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Deployment Configuration</h3>
                <p className="text-gray-400 mb-6">
                  Configure deployment settings and generate API endpoints for your agent.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Environment Settings */}
                <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                  <h4 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
                    <Server className="h-5 w-5" />
                    <span>Environment</span>
                  </h4>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Deployment Environment</label>
                      <select
                        value={currentAgent.deployment.environment}
                        onChange={(e) => updateAgentConfig({
                          deployment: { ...currentAgent.deployment, environment: e.target.value as any }
                        })}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                      >
                        <option value="development">Development</option>
                        <option value="staging">Staging</option>
                        <option value="production">Production</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Custom Domain (Optional)</label>
                      <input
                        type="text"
                        placeholder="agent.yourcompany.com"
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Rate Limiting</label>
                      <select className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500">
                        <option value="100">100 requests/minute</option>
                        <option value="500">500 requests/minute</option>
                        <option value="1000">1000 requests/minute</option>
                        <option value="unlimited">Unlimited</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* API Configuration */}
                <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                  <h4 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
                    <Key className="h-5 w-5" />
                    <span>API Configuration</span>
                  </h4>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">API Endpoint</label>
                      <div className="flex">
                        <input
                          type="text"
                          value={`https://api.aixcelerator.com/agents/${currentAgent.id}`}
                          readOnly
                          className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-l-lg text-white"
                        />
                        <button className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-3 rounded-r-lg transition-all duration-300">
                          <Copy className="h-4 w-4" />
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">API Key</label>
                      <div className="flex">
                        <input
                          type={showApiKey ? 'text' : 'password'}
                          value="sk-1234567890abcdef..."
                          readOnly
                          className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-l-lg text-white"
                        />
                        <button
                          onClick={() => setShowApiKey(!showApiKey)}
                          className="bg-white/10 hover:bg-white/20 text-white px-4 py-3 border border-white/20 transition-all duration-300"
                        >
                          {showApiKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                        <button className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-3 rounded-r-lg transition-all duration-300">
                          <RefreshCw className="h-4 w-4" />
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Webhook URL (Optional)</label>
                      <input
                        type="url"
                        placeholder="https://yourapp.com/webhook"
                        value={currentAgent.deployment.webhookUrl}
                        onChange={(e) => updateAgentConfig({
                          deployment: { ...currentAgent.deployment, webhookUrl: e.target.value }
                        })}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Security Settings */}
              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <h4 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
                  <Shield className="h-5 w-5" />
                  <span>Security & Access Control</span>
                </h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Authentication Method</label>
                    <select className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500">
                      <option value="api-key">API Key</option>
                      <option value="oauth">OAuth 2.0</option>
                      <option value="jwt">JWT Token</option>
                      <option value="basic">Basic Auth</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">CORS Origins</label>
                    <input
                      type="text"
                      placeholder="https://yourapp.com, https://staging.yourapp.com"
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="flex items-center space-x-3">
                      <input type="checkbox" className="rounded" />
                      <span className="text-white">Enable request logging</span>
                    </label>
                  </div>

                  <div className="md:col-span-2">
                    <label className="flex items-center space-x-3">
                      <input type="checkbox" className="rounded" />
                      <span className="text-white">Enable SSL/TLS encryption</span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Deployment Actions */}
              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <h4 className="text-lg font-semibold text-white mb-4">Deploy Agent</h4>
                <p className="text-gray-400 mb-6">
                  Ready to deploy your agent? Make sure all configurations are complete.
                </p>
                
                <div className="flex space-x-4">
                  <button className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 flex items-center space-x-2">
                    <Zap className="h-5 w-5" />
                    <span>Deploy Agent</span>
                  </button>
                  
                  <button className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-lg transition-all duration-300 flex items-center space-x-2">
                    <Download className="h-5 w-5" />
                    <span>Export Config</span>
                  </button>
                  
                  <button className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-lg transition-all duration-300 flex items-center space-x-2">
                    <ExternalLink className="h-5 w-5" />
                    <span>View Docs</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </motion.div>

      {/* Navigation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="flex justify-between items-center mt-8"
      >
        <button
          onClick={onBack}
          className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 flex items-center space-x-2"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Back to Use Cases</span>
        </button>

        <div className="flex items-center space-x-4">
          <div className="text-gray-400 text-sm">
            Agent {currentAgentIndex + 1} of {selectedUseCases.length} • {getCompletionPercentage()}% Complete
          </div>
          
          <div className="flex space-x-2">
            {currentAgentIndex > 0 && (
              <button
                onClick={() => setCurrentAgentIndex(currentAgentIndex - 1)}
                className="bg-white/10 hover:bg-white/20 text-white px-4 py-3 rounded-lg transition-all duration-300"
              >
                Previous Agent
              </button>
            )}
            
            {currentAgentIndex < selectedUseCases.length - 1 ? (
              <button
                onClick={() => setCurrentAgentIndex(currentAgentIndex + 1)}
                className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-3 rounded-lg transition-all duration-300"
              >
                Next Agent
              </button>
            ) : (
              <button
                onClick={() => onComplete(agentConfigs)}
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 flex items-center space-x-2"
              >
                <span>Complete Setup</span>
                <ArrowRight className="h-5 w-5" />
              </button>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AgentConfiguration;