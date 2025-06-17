import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  Globe, 
  Loader2, 
  CheckCircle, 
  AlertCircle,
  Building,
  Users,
  DollarSign,
  TrendingUp,
  Target,
  Zap,
  ArrowRight,
  ArrowLeft
} from 'lucide-react';
import UseCaseSelection from './components/UseCaseSelection';
import AgentConfiguration from './components/AgentConfiguration';

interface ScanProgress {
  step: string;
  progress: number;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  duration?: number;
}

interface BusinessProfile {
  id: string;
  name: string;
  url: string;
  industry: string;
  subVertical: string;
  employeeCount: number;
  revenue: string;
  services: string[];
  painPoints: Array<{
    category: string;
    description: string;
    severity: 'low' | 'medium' | 'high';
    automationPotential: number;
  }>;
  opportunities: Array<{
    category: string;
    score: number;
    description: string;
    estimatedROI: number;
    implementationEffort: 'Low' | 'Medium' | 'High';
  }>;
  taxonomy: {
    departments: string[];
    services: string[];
    painPoints: string[];
  };
}

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
  knowledgeBase: any;
  integrations: any;
  settings: any;
  voiceSettings?: any;
  testScenarios: any[];
  deployment: any;
}

type DiscoveryStep = 'input' | 'scanning' | 'results' | 'usecases' | 'configuration' | 'complete';

const BusinessDiscovery = () => {
  const [currentStep, setCurrentStep] = useState<DiscoveryStep>('input');
  const [url, setUrl] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState<ScanProgress[]>([]);
  const [businessProfile, setBusinessProfile] = useState<BusinessProfile | null>(null);
  const [selectedDepartments, setSelectedDepartments] = useState<string[]>([]);
  const [selectedUseCases, setSelectedUseCases] = useState<UseCase[]>([]);
  const [agentConfigs, setAgentConfigs] = useState<AgentConfig[]>([]);
  const [currentScanStep, setCurrentScanStep] = useState(0);

  const scanSteps = [
    { name: 'Website Scraping', description: 'Analyzing website content and structure' },
    { name: 'LinkedIn Discovery', description: 'Gathering company insights from LinkedIn' },
    { name: 'Data Enrichment', description: 'Enhancing profile with external data sources' },
    { name: 'AI Analysis', description: 'Generating taxonomy and opportunity analysis' }
  ];

  const handleScan = async () => {
    if (!url || !companyName) return;
    
    setIsScanning(true);
    setCurrentScanStep(0);
    setScanProgress([]);
    setBusinessProfile(null);
    setCurrentStep('scanning');

    // Simulate scanning process
    for (let i = 0; i < scanSteps.length; i++) {
      setCurrentScanStep(i);
      
      // Simulate processing time
      await new Promise(resolve => setTimeout(resolve, 2000 + Math.random() * 2000));
      
      setScanProgress(prev => [
        ...prev,
        {
          step: scanSteps[i].name,
          progress: ((i + 1) / scanSteps.length) * 100,
          status: 'completed',
          duration: Math.floor(2000 + Math.random() * 2000)
        }
      ]);
    }

    // Generate mock business profile based on company name
    const mockProfile: BusinessProfile = {
      id: 'biz_' + Date.now(),
      name: companyName,
      url: url,
      industry: 'Technology',
      subVertical: 'SaaS',
      employeeCount: 150,
      revenue: '$10M-$50M',
      services: [
        'Software Development',
        'Customer Support',
        'Sales & Marketing',
        'Product Management'
      ],
      painPoints: [
        {
          category: 'Customer Support',
          description: 'High volume of repetitive support tickets',
          severity: 'high',
          automationPotential: 0.85
        },
        {
          category: 'Lead Qualification',
          description: 'Manual sales process for enterprise deals',
          severity: 'medium',
          automationPotential: 0.70
        },
        {
          category: 'Content Marketing',
          description: 'Manual blog post creation and distribution',
          severity: 'medium',
          automationPotential: 0.60
        }
      ],
      opportunities: [
        {
          category: 'Customer Support Chatbot',
          score: 92,
          description: 'Deploy AI chatbot for common inquiries and onboarding',
          estimatedROI: 340,
          implementationEffort: 'Medium'
        },
        {
          category: 'Sales Lead Scoring',
          score: 78,
          description: 'Automated lead qualification and scoring system',
          estimatedROI: 250,
          implementationEffort: 'Low'
        }
      ],
      taxonomy: {
        departments: [
          'Customer Service',
          'Sales',
          'Marketing',
          'Operations',
          'Human Resources',
          'Finance',
          'IT'
        ],
        services: [
          'Customer Support',
          'Lead Generation',
          'Content Creation',
          'Data Processing',
          'Workflow Automation'
        ],
        painPoints: [
          'Manual processes',
          'High response times',
          'Repetitive tasks',
          'Data entry errors',
          'Inconsistent quality'
        ]
      }
    };

    setBusinessProfile(mockProfile);
    setIsScanning(false);
    setCurrentStep('results');
  };

  const handleDepartmentSelection = (departments: string[]) => {
    setSelectedDepartments(departments);
    setCurrentStep('usecases');
  };

  const handleUseCaseSelection = (useCases: UseCase[]) => {
    setSelectedUseCases(useCases);
    setCurrentStep('configuration');
  };

  const handleConfigurationComplete = (configs: AgentConfig[]) => {
    setAgentConfigs(configs);
    setCurrentStep('complete');
  };

  // Step 1: Company Input
  if (currentStep === 'input') {
    return (
      <div className="min-h-screen p-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <h1 className="text-4xl font-bold text-white mb-2 flex items-center space-x-3">
              <Search className="h-10 w-10 text-blue-400" />
              <span>Business Discovery</span>
            </h1>
            <p className="text-slate-400 text-lg">
              Let's analyze your business to identify the perfect AI automation opportunities
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-slate-800/50 backdrop-blur-lg border border-slate-700/50 rounded-2xl p-8"
          >
            <h2 className="text-2xl font-semibold text-white mb-6">Company Information</h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Company Name *
                </label>
                <input
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="e.g., Acme Corporation"
                  className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Company Website URL *
                </label>
                <div className="relative">
                  <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                  <input
                    type="url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="https://company.com"
                    className="w-full pl-10 pr-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <button
                onClick={handleScan}
                disabled={!url || !companyName}
                className="w-full px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                <Search className="h-5 w-5" />
                <span>Analyze Business</span>
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  // Step 2: Scanning Progress
  if (currentStep === 'scanning') {
    return (
      <div className="min-h-screen p-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-slate-800/50 backdrop-blur-lg border border-slate-700/50 rounded-2xl p-8"
          >
            <h3 className="text-2xl font-semibold text-white mb-6 text-center">
              Analyzing {companyName}
            </h3>
            
            <div className="space-y-6">
              {scanSteps.map((step, index) => {
                const isActive = index === currentScanStep;
                const isCompleted = scanProgress.some(p => p.step === step.name);
                
                return (
                  <div key={step.name} className="flex items-center space-x-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      isCompleted ? 'bg-emerald-500' : isActive ? 'bg-blue-500' : 'bg-slate-600'
                    }`}>
                      {isCompleted ? (
                        <CheckCircle className="h-6 w-6 text-white" />
                      ) : isActive ? (
                        <Loader2 className="h-6 w-6 text-white animate-spin" />
                      ) : (
                        <span className="text-white text-sm">{index + 1}</span>
                      )}
                    </div>
                    
                    <div className="flex-1">
                      <div className="text-white font-medium text-lg">{step.name}</div>
                      <div className="text-slate-400">{step.description}</div>
                    </div>
                    
                    {isCompleted && (
                      <div className="text-emerald-400 text-sm">
                        {scanProgress.find(p => p.step === step.name)?.duration}ms
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  // Step 3: Business Profile Results with Department Selection
  if (currentStep === 'results' && businessProfile) {
    return (
      <div className="min-h-screen p-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <h2 className="text-3xl font-bold text-white mb-4">
              Business Analysis Complete
            </h2>
            <p className="text-slate-400 text-lg">
              Here's what we discovered about {businessProfile.name}. Select the departments where you'd like to implement AI automation.
            </p>
          </motion.div>

          <div className="space-y-8">
            {/* Company Overview */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-slate-800/50 backdrop-blur-lg border border-slate-700/50 rounded-2xl p-8"
            >
              <h3 className="text-2xl font-semibold text-white mb-6">Company Overview</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center">
                  <Building className="h-8 w-8 text-blue-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">{businessProfile.name}</div>
                  <div className="text-slate-400">{businessProfile.industry}</div>
                </div>
                
                <div className="text-center">
                  <Users className="h-8 w-8 text-emerald-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">{businessProfile.employeeCount}</div>
                  <div className="text-slate-400">Employees</div>
                </div>
                
                <div className="text-center">
                  <DollarSign className="h-8 w-8 text-amber-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">{businessProfile.revenue}</div>
                  <div className="text-slate-400">Annual Revenue</div>
                </div>
                
                <div className="text-center">
                  <Target className="h-8 w-8 text-violet-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">{businessProfile.subVertical}</div>
                  <div className="text-slate-400">Sub-vertical</div>
                </div>
              </div>
            </motion.div>

            {/* Department Selection */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-slate-800/50 backdrop-blur-lg border border-slate-700/50 rounded-2xl p-8"
            >
              <h3 className="text-2xl font-semibold text-white mb-6">Select Focus Areas</h3>
              <p className="text-slate-400 mb-6">
                Choose the departments where you'd like to implement AI automation. We'll recommend specific agents for each selected area.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                {businessProfile.taxonomy.departments.map((dept, index) => {
                  const isSelected = selectedDepartments.includes(dept);
                  return (
                    <button
                      key={index}
                      onClick={() => {
                        setSelectedDepartments(prev => 
                          isSelected 
                            ? prev.filter(d => d !== dept)
                            : [...prev, dept]
                        );
                      }}
                      className={`p-4 rounded-lg border-2 transition-all duration-300 text-left ${
                        isSelected
                          ? 'border-blue-500 bg-blue-500/20 text-blue-300'
                          : 'border-slate-600/50 bg-slate-700/50 text-white hover:border-blue-400 hover:bg-blue-500/10'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{dept}</span>
                        {isSelected && <CheckCircle className="h-5 w-5 text-blue-400" />}
                      </div>
                    </button>
                  );
                })}
              </div>

              {selectedDepartments.length > 0 && (
                <div className="bg-blue-500/20 border border-blue-500/30 rounded-lg p-4">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-blue-400" />
                    <span className="text-white font-medium">
                      {selectedDepartments.length} department{selectedDepartments.length !== 1 ? 's' : ''} selected
                    </span>
                  </div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {selectedDepartments.map((dept, index) => (
                      <span key={index} className="px-3 py-1 bg-blue-500/30 text-blue-200 rounded-full text-sm">
                        {dept}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>

            {/* Navigation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex justify-between items-center"
            >
              <button
                onClick={() => setCurrentStep('input')}
                className="bg-slate-700/50 hover:bg-slate-700/70 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 flex items-center space-x-2"
              >
                <ArrowLeft className="h-5 w-5" />
                <span>Start Over</span>
              </button>

              <button
                onClick={() => handleDepartmentSelection(selectedDepartments)}
                disabled={selectedDepartments.length === 0}
                className="bg-gradient-to-r from-blue-600 to-blue-500 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
              >
                <span>View AI Agents ({selectedDepartments.length})</span>
                <ArrowRight className="h-5 w-5" />
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    );
  }

  // Step 4: Use Case Selection
  if (currentStep === 'usecases' && businessProfile) {
    return (
      <div className="min-h-screen p-6">
        <UseCaseSelection
          companyData={{
            name: businessProfile.name,
            industry: businessProfile.industry,
            size: businessProfile.employeeCount > 100 ? 'medium' : 'small',
            taxonomy: businessProfile.taxonomy
          }}
          selectedDepartments={selectedDepartments}
          onUseCaseSelect={handleUseCaseSelection}
          onBack={() => setCurrentStep('results')}
        />
      </div>
    );
  }

  // Step 5: Agent Configuration
  if (currentStep === 'configuration' && businessProfile) {
    return (
      <div className="min-h-screen p-6">
        <AgentConfiguration
          selectedUseCases={selectedUseCases}
          companyData={{
            name: businessProfile.name,
            industry: businessProfile.industry,
            size: businessProfile.employeeCount > 100 ? 'medium' : 'small'
          }}
          onComplete={handleConfigurationComplete}
          onBack={() => setCurrentStep('usecases')}
        />
      </div>
    );
  }

  // Step 6: Complete
  if (currentStep === 'complete') {
    return (
      <div className="min-h-screen p-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <CheckCircle className="h-20 w-20 text-emerald-400 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-white mb-4">
              Setup Complete!
            </h2>
            <p className="text-slate-400 text-lg mb-8">
              Your AI agents have been configured and are ready for deployment.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {agentConfigs.map((config, index) => (
                <div key={config.id} className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-white mb-2">{config.name}</h3>
                  <p className="text-slate-400 text-sm mb-4">{config.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-emerald-400 text-sm">Ready to Deploy</span>
                    <CheckCircle className="h-5 w-5 text-emerald-400" />
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-center space-x-4">
              <button
                onClick={() => setCurrentStep('input')}
                className="bg-slate-700/50 hover:bg-slate-700/70 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300"
              >
                Start New Discovery
              </button>
              
              <button className="bg-gradient-to-r from-emerald-600 to-emerald-500 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg hover:shadow-emerald-500/25 transition-all duration-300 flex items-center space-x-2">
                <Zap className="h-5 w-5" />
                <span>Deploy All Agents</span>
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return null;
};

export default BusinessDiscovery;