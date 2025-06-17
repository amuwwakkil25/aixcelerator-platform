import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Bot, 
  MessageSquare, 
  Phone, 
  Settings, 
  Target,
  CheckCircle,
  Star,
  TrendingUp,
  Clock,
  DollarSign,
  Users,
  Zap,
  ArrowRight,
  Filter,
  Search,
  Info,
  ChevronDown,
  ChevronRight,
  Sparkles,
  Shield,
  BarChart3,
  Mail,
  Calendar,
  FileText,
  Database,
  Globe,
  Headphones,
  ShoppingCart,
  CreditCard,
  UserCheck,
  AlertCircle,
  RefreshCw,
  Workflow
} from 'lucide-react';

interface UseCase {
  id: string;
  name: string;
  category: 'voice' | 'chat' | 'task' | 'workflow';
  department: string;
  description: string;
  detailedDescription: string;
  benefits: string[];
  estimatedROI: number;
  implementationTime: string;
  complexity: 'Low' | 'Medium' | 'High';
  popularity: number;
  requiredIntegrations: string[];
  sampleQuestions?: string[];
  sampleTasks?: string[];
  icon: React.ComponentType<any>;
  tags: string[];
  businessSize: ('startup' | 'small' | 'medium' | 'enterprise')[];
  industry: string[];
}

interface UseCaseSelectionProps {
  companyData: {
    name: string;
    industry: string;
    size: string;
    taxonomy: {
      departments: string[];
      services: string[];
      painPoints: string[];
    };
  };
  selectedDepartments: string[];
  onUseCaseSelect: (useCases: UseCase[]) => void;
  onBack: () => void;
}

const UseCaseSelection: React.FC<UseCaseSelectionProps> = ({
  companyData,
  selectedDepartments,
  onUseCaseSelect,
  onBack
}) => {
  const [selectedUseCases, setSelectedUseCases] = useState<UseCase[]>([]);
  const [filteredUseCases, setFilteredUseCases] = useState<UseCase[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedUseCase, setExpandedUseCase] = useState<string | null>(null);
  const [showRecommended, setShowRecommended] = useState(true);

  // Comprehensive use case database
  const allUseCases: UseCase[] = [
    // Customer Service Use Cases
    {
      id: 'cs_chatbot',
      name: 'Customer Support Chatbot',
      category: 'chat',
      department: 'Customer Service',
      description: 'AI-powered chatbot for handling common customer inquiries 24/7',
      detailedDescription: 'Deploy an intelligent chatbot that can handle up to 80% of common customer inquiries, provide instant responses, and seamlessly escalate complex issues to human agents. Integrates with your existing help desk and knowledge base.',
      benefits: [
        'Reduce response time from hours to seconds',
        'Handle 70-80% of inquiries automatically',
        'Provide 24/7 customer support coverage',
        'Reduce support team workload by 60%',
        'Improve customer satisfaction scores'
      ],
      estimatedROI: 340,
      implementationTime: '2-3 weeks',
      complexity: 'Medium',
      popularity: 95,
      requiredIntegrations: ['Help Desk', 'Knowledge Base', 'CRM'],
      sampleQuestions: [
        'How do I reset my password?',
        'What are your business hours?',
        'How can I cancel my subscription?',
        'Where is my order?'
      ],
      icon: MessageSquare,
      tags: ['customer service', 'automation', 'chat', '24/7'],
      businessSize: ['small', 'medium', 'enterprise'],
      industry: ['technology', 'saas', 'ecommerce', 'healthcare', 'finance', 'education', 'all']
    },
    {
      id: 'voice_support',
      name: 'Voice Support Agent',
      category: 'voice',
      department: 'Customer Service',
      description: 'AI voice agent for phone-based customer support and call routing',
      detailedDescription: 'Handle inbound customer calls with natural voice AI that can understand customer needs, provide basic support, collect information, and route calls to the appropriate department or agent.',
      benefits: [
        'Reduce call wait times by 75%',
        'Handle basic inquiries via voice',
        'Intelligent call routing and prioritization',
        'Collect customer information before transfer',
        'Operate during off-hours and peak times'
      ],
      estimatedROI: 280,
      implementationTime: '3-4 weeks',
      complexity: 'High',
      popularity: 78,
      requiredIntegrations: ['Phone System', 'CRM', 'Ticketing System'],
      sampleQuestions: [
        'I need help with my account',
        'I want to speak to billing',
        'My product isn\'t working',
        'I need technical support'
      ],
      icon: Phone,
      tags: ['voice', 'phone support', 'call routing', 'customer service'],
      businessSize: ['medium', 'enterprise'],
      industry: ['technology', 'saas', 'healthcare', 'finance', 'telecommunications', 'all']
    },

    // Sales Use Cases
    {
      id: 'lead_qualifier',
      name: 'Lead Qualification Agent',
      category: 'task',
      department: 'Sales',
      description: 'Automatically score and qualify incoming leads based on predefined criteria',
      detailedDescription: 'Intelligent lead scoring system that analyzes incoming leads, assigns scores based on your criteria, enriches lead data, and automatically routes qualified leads to the appropriate sales representatives.',
      benefits: [
        'Increase lead conversion rates by 35%',
        'Reduce manual lead qualification time',
        'Ensure no leads fall through cracks',
        'Prioritize high-value prospects',
        'Improve sales team efficiency'
      ],
      estimatedROI: 250,
      implementationTime: '1-2 weeks',
      complexity: 'Low',
      popularity: 88,
      requiredIntegrations: ['CRM', 'Marketing Automation', 'Lead Sources'],
      sampleTasks: [
        'Score leads based on company size and budget',
        'Enrich lead data with company information',
        'Route qualified leads to sales reps',
        'Send follow-up sequences to unqualified leads'
      ],
      icon: Target,
      tags: ['sales', 'lead scoring', 'automation', 'crm'],
      businessSize: ['small', 'medium', 'enterprise'],
      industry: ['technology', 'saas', 'b2b', 'consulting', 'manufacturing', 'all']
    },
    {
      id: 'sales_voice_agent',
      name: 'Sales Qualification Calls',
      category: 'voice',
      department: 'Sales',
      description: 'AI voice agent for qualifying inbound sales leads via phone',
      detailedDescription: 'Conduct initial qualification calls with prospects, gather key information about their needs and budget, schedule demos with sales reps, and maintain a warm, professional tone throughout the conversation.',
      benefits: [
        'Qualify leads 24/7 without human intervention',
        'Consistent qualification process',
        'Immediate response to inbound inquiries',
        'Schedule demos automatically',
        'Capture detailed prospect information'
      ],
      estimatedROI: 200,
      implementationTime: '3-4 weeks',
      complexity: 'High',
      popularity: 72,
      requiredIntegrations: ['CRM', 'Calendar', 'Phone System'],
      sampleQuestions: [
        'What\'s your current solution?',
        'What\'s your budget range?',
        'How many users would need access?',
        'When are you looking to implement?'
      ],
      icon: Headphones,
      tags: ['sales', 'voice', 'qualification', 'demos'],
      businessSize: ['medium', 'enterprise'],
      industry: ['technology', 'saas', 'b2b', 'consulting', 'all']
    },

    // Marketing Use Cases
    {
      id: 'content_generator',
      name: 'Content Generation Agent',
      category: 'task',
      department: 'Marketing',
      description: 'Automatically generate blog posts, social media content, and marketing copy',
      detailedDescription: 'AI-powered content creation system that generates high-quality blog posts, social media content, email campaigns, and marketing copy based on your brand voice, target audience, and content strategy.',
      benefits: [
        'Reduce content creation time by 70%',
        'Maintain consistent brand voice',
        'Generate content ideas and outlines',
        'Create multiple content variations',
        'Scale content production efficiently'
      ],
      estimatedROI: 180,
      implementationTime: '2-3 weeks',
      complexity: 'Medium',
      popularity: 85,
      requiredIntegrations: ['CMS', 'Social Media', 'Email Platform'],
      sampleTasks: [
        'Generate weekly blog post topics',
        'Create social media post variations',
        'Write email campaign copy',
        'Develop product descriptions'
      ],
      icon: FileText,
      tags: ['marketing', 'content', 'automation', 'writing'],
      businessSize: ['small', 'medium', 'enterprise'],
      industry: ['technology', 'saas', 'ecommerce', 'media', 'education', 'all']
    },
    {
      id: 'email_campaigns',
      name: 'Email Campaign Automation',
      category: 'workflow',
      department: 'Marketing',
      description: 'Automated email sequences based on user behavior and preferences',
      detailedDescription: 'Intelligent email automation that creates personalized email sequences, segments audiences based on behavior, optimizes send times, and automatically adjusts content based on engagement metrics.',
      benefits: [
        'Increase email open rates by 40%',
        'Personalize content at scale',
        'Optimize send times automatically',
        'Segment audiences intelligently',
        'Reduce manual campaign management'
      ],
      estimatedROI: 220,
      implementationTime: '2-3 weeks',
      complexity: 'Medium',
      popularity: 82,
      requiredIntegrations: ['Email Platform', 'CRM', 'Analytics'],
      sampleTasks: [
        'Create welcome email sequences',
        'Send behavior-triggered emails',
        'Segment audiences by engagement',
        'A/B test email variations'
      ],
      icon: Mail,
      tags: ['marketing', 'email', 'automation', 'personalization'],
      businessSize: ['small', 'medium', 'enterprise'],
      industry: ['ecommerce', 'saas', 'education', 'healthcare', 'all']
    },

    // Operations Use Cases
    {
      id: 'document_processor',
      name: 'Document Processing Agent',
      category: 'task',
      department: 'Operations',
      description: 'Automatically extract data from documents and invoices',
      detailedDescription: 'AI-powered document processing that extracts key information from invoices, contracts, forms, and other documents, validates data accuracy, and integrates with your existing systems.',
      benefits: [
        'Reduce manual data entry by 90%',
        'Improve data accuracy and consistency',
        'Process documents 24/7',
        'Handle multiple document formats',
        'Integrate with existing workflows'
      ],
      estimatedROI: 300,
      implementationTime: '3-4 weeks',
      complexity: 'High',
      popularity: 76,
      requiredIntegrations: ['Document Storage', 'ERP', 'Accounting Software'],
      sampleTasks: [
        'Extract invoice data and amounts',
        'Process expense reports',
        'Validate contract information',
        'Categorize and file documents'
      ],
      icon: Database,
      tags: ['operations', 'documents', 'data extraction', 'automation'],
      businessSize: ['medium', 'enterprise'],
      industry: ['finance', 'healthcare', 'legal', 'manufacturing', 'all']
    },
    {
      id: 'inventory_management',
      name: 'Inventory Management Agent',
      category: 'workflow',
      department: 'Operations',
      description: 'Automated inventory tracking and reorder management',
      detailedDescription: 'Intelligent inventory management system that tracks stock levels, predicts demand, automatically creates purchase orders, and optimizes inventory levels to reduce costs while preventing stockouts.',
      benefits: [
        'Reduce inventory costs by 25%',
        'Prevent stockouts and overstock',
        'Automate reorder processes',
        'Predict demand accurately',
        'Optimize inventory turnover'
      ],
      estimatedROI: 190,
      implementationTime: '4-5 weeks',
      complexity: 'High',
      popularity: 68,
      requiredIntegrations: ['ERP', 'Suppliers', 'POS System'],
      sampleTasks: [
        'Monitor stock levels in real-time',
        'Generate purchase orders automatically',
        'Predict seasonal demand patterns',
        'Optimize safety stock levels'
      ],
      icon: RefreshCw,
      tags: ['operations', 'inventory', 'automation', 'supply chain'],
      businessSize: ['medium', 'enterprise'],
      industry: ['ecommerce', 'retail', 'manufacturing', 'distribution', 'all']
    },

    // HR Use Cases
    {
      id: 'hr_chatbot',
      name: 'HR Assistant Chatbot',
      category: 'chat',
      department: 'Human Resources',
      description: 'Answer employee questions about policies, benefits, and procedures',
      detailedDescription: 'AI-powered HR assistant that provides instant answers to employee questions about company policies, benefits, vacation requests, and HR procedures, reducing the workload on HR staff.',
      benefits: [
        'Reduce HR inquiry volume by 60%',
        'Provide instant policy information',
        'Handle routine HR requests',
        'Improve employee satisfaction',
        'Free up HR for strategic work'
      ],
      estimatedROI: 160,
      implementationTime: '2-3 weeks',
      complexity: 'Medium',
      popularity: 74,
      requiredIntegrations: ['HRIS', 'Policy Database', 'Employee Portal'],
      sampleQuestions: [
        'How many vacation days do I have?',
        'What\'s the remote work policy?',
        'How do I submit an expense report?',
        'What are my health insurance options?'
      ],
      icon: Users,
      tags: ['hr', 'employee support', 'policies', 'benefits'],
      businessSize: ['medium', 'enterprise'],
      industry: ['all']
    },
    {
      id: 'recruitment_agent',
      name: 'Recruitment Screening Agent',
      category: 'task',
      department: 'Human Resources',
      description: 'Automatically screen resumes and schedule initial interviews',
      detailedDescription: 'AI-powered recruitment assistant that screens resumes against job requirements, ranks candidates, conducts initial screening interviews, and schedules qualified candidates for human interviews.',
      benefits: [
        'Reduce time-to-hire by 50%',
        'Screen candidates consistently',
        'Eliminate unconscious bias',
        'Handle high application volumes',
        'Improve candidate experience'
      ],
      estimatedROI: 210,
      implementationTime: '3-4 weeks',
      complexity: 'High',
      popularity: 69,
      requiredIntegrations: ['ATS', 'Calendar', 'Video Platform'],
      sampleTasks: [
        'Screen resumes against job criteria',
        'Conduct initial phone screenings',
        'Schedule interviews automatically',
        'Send candidate communications'
      ],
      icon: UserCheck,
      tags: ['hr', 'recruitment', 'screening', 'automation'],
      businessSize: ['medium', 'enterprise'],
      industry: ['all']
    },

    // Finance Use Cases
    {
      id: 'expense_processor',
      name: 'Expense Report Processor',
      category: 'task',
      department: 'Finance',
      description: 'Automatically process and approve expense reports',
      detailedDescription: 'AI-powered expense management that automatically processes expense reports, validates receipts, checks policy compliance, and routes for appropriate approvals based on company rules.',
      benefits: [
        'Reduce processing time by 80%',
        'Ensure policy compliance',
        'Detect fraudulent expenses',
        'Automate approval workflows',
        'Improve expense visibility'
      ],
      estimatedROI: 240,
      implementationTime: '2-3 weeks',
      complexity: 'Medium',
      popularity: 71,
      requiredIntegrations: ['Expense Software', 'Accounting', 'Approval System'],
      sampleTasks: [
        'Extract data from receipt images',
        'Validate expense policy compliance',
        'Route for appropriate approvals',
        'Generate expense reports'
      ],
      icon: CreditCard,
      tags: ['finance', 'expenses', 'automation', 'compliance'],
      businessSize: ['medium', 'enterprise'],
      industry: ['all']
    },
    {
      id: 'invoice_automation',
      name: 'Invoice Processing Agent',
      category: 'workflow',
      department: 'Finance',
      description: 'Automated invoice processing and payment workflows',
      detailedDescription: 'Intelligent invoice processing system that extracts invoice data, validates against purchase orders, routes for approval, and integrates with accounting systems for seamless payment processing.',
      benefits: [
        'Reduce invoice processing time by 75%',
        'Improve payment accuracy',
        'Automate 3-way matching',
        'Reduce late payment penalties',
        'Enhance vendor relationships'
      ],
      estimatedROI: 280,
      implementationTime: '3-4 weeks',
      complexity: 'High',
      popularity: 77,
      requiredIntegrations: ['Accounting Software', 'ERP', 'Payment System'],
      sampleTasks: [
        'Extract invoice data automatically',
        'Match invoices to purchase orders',
        'Route for approval workflows',
        'Process payments automatically'
      ],
      icon: FileText,
      tags: ['finance', 'invoices', 'automation', 'payments'],
      businessSize: ['medium', 'enterprise'],
      industry: ['all']
    },

    // IT Use Cases
    {
      id: 'it_helpdesk',
      name: 'IT Helpdesk Chatbot',
      category: 'chat',
      department: 'IT',
      description: 'Automated IT support for common technical issues',
      detailedDescription: 'AI-powered IT support that handles common technical issues, provides troubleshooting steps, resets passwords, and escalates complex issues to IT staff while maintaining detailed ticket logs.',
      benefits: [
        'Resolve 60% of tickets automatically',
        'Provide 24/7 IT support',
        'Reduce IT workload significantly',
        'Faster issue resolution',
        'Consistent troubleshooting process'
      ],
      estimatedROI: 200,
      implementationTime: '2-3 weeks',
      complexity: 'Medium',
      popularity: 83,
      requiredIntegrations: ['Ticketing System', 'Active Directory', 'Knowledge Base'],
      sampleQuestions: [
        'I forgot my password',
        'My computer won\'t start',
        'I can\'t access the network',
        'How do I install software?'
      ],
      icon: Settings,
      tags: ['it', 'helpdesk', 'technical support', 'automation'],
      businessSize: ['medium', 'enterprise'],
      industry: ['all']
    }
  ];

  const categories = [
    { id: 'all', label: 'All Use Cases', icon: Bot },
    { id: 'chat', label: 'Chat Agents', icon: MessageSquare },
    { id: 'voice', label: 'Voice Agents', icon: Phone },
    { id: 'task', label: 'Task Agents', icon: Settings },
    { id: 'workflow', label: 'Workflow Agents', icon: Workflow }
  ];

  useEffect(() => {
    // Filter use cases based on selected departments, company size, and industry
    let filtered = allUseCases.filter(useCase => {
      const matchesDepartment = selectedDepartments.includes(useCase.department);
      
      // More flexible size matching - map company size to our categories
      const sizeMapping: { [key: string]: string[] } = {
        'small': ['startup', 'small'],
        'medium': ['small', 'medium'],
        'large': ['medium', 'enterprise'],
        'enterprise': ['enterprise']
      };
      
      const companySizes = sizeMapping[companyData.size.toLowerCase()] || ['small', 'medium'];
      const matchesSize = useCase.businessSize.some(size => companySizes.includes(size));
      
      // More flexible industry matching - include 'all' and partial matches
      const matchesIndustry = useCase.industry.includes('all') || 
                             useCase.industry.some(industry => 
                               industry.toLowerCase().includes(companyData.industry.toLowerCase()) ||
                               companyData.industry.toLowerCase().includes(industry.toLowerCase())
                             );
      
      const matchesCategory = selectedCategory === 'all' || useCase.category === selectedCategory;
      const matchesSearch = useCase.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           useCase.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           useCase.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));

      return matchesDepartment && matchesSize && matchesIndustry && matchesCategory && matchesSearch;
    });

    // Sort by popularity and ROI if showing recommended
    if (showRecommended) {
      filtered = filtered.sort((a, b) => (b.popularity + b.estimatedROI / 10) - (a.popularity + a.estimatedROI / 10));
    }

    setFilteredUseCases(filtered);
  }, [selectedDepartments, companyData, selectedCategory, searchTerm, showRecommended]);

  const handleUseCaseToggle = (useCase: UseCase) => {
    setSelectedUseCases(prev => {
      const isSelected = prev.some(uc => uc.id === useCase.id);
      if (isSelected) {
        return prev.filter(uc => uc.id !== useCase.id);
      } else {
        return [...prev, useCase];
      }
    });
  };

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case 'Low': return 'text-green-400 bg-green-500/20';
      case 'Medium': return 'text-yellow-400 bg-yellow-500/20';
      case 'High': return 'text-red-400 bg-red-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
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

  const handleContinue = () => {
    if (selectedUseCases.length > 0) {
      onUseCaseSelect(selectedUseCases);
    }
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
          Choose Your AI Agents
        </h2>
        <p className="text-gray-400 text-lg">
          Based on your company profile and selected departments, here are the recommended AI agents for{' '}
          <span className="text-purple-400 font-semibold">{companyData.name}</span>
        </p>
        
        {/* Selected Departments */}
        <div className="flex flex-wrap gap-2 mt-4">
          {selectedDepartments.map((dept, index) => (
            <span key={index} className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm">
              {dept}
            </span>
          ))}
        </div>
      </motion.div>

      {/* Controls */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="flex flex-col lg:flex-row gap-4 mb-8"
      >
        {/* Search */}
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search use cases..."
            className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2">
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
                <span className="hidden sm:inline">{category.label}</span>
              </button>
            );
          })}
        </div>

        {/* Recommended Toggle */}
        <button
          onClick={() => setShowRecommended(!showRecommended)}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
            showRecommended
              ? 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30'
              : 'bg-white/5 text-gray-300 hover:bg-white/10 border border-white/10'
          }`}
        >
          <Star className="h-4 w-4" />
          <span>Recommended</span>
        </button>
      </motion.div>

      {/* Selected Count */}
      {selectedUseCases.length > 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-purple-500/20 border border-purple-500/30 rounded-lg p-4 mb-6"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <CheckCircle className="h-5 w-5 text-purple-400" />
              <span className="text-white font-medium">
                {selectedUseCases.length} agent{selectedUseCases.length !== 1 ? 's' : ''} selected
              </span>
            </div>
            <div className="text-sm text-gray-300">
              Estimated total ROI: {Math.round(selectedUseCases.reduce((sum, uc) => sum + uc.estimatedROI, 0) / selectedUseCases.length)}%
            </div>
          </div>
        </motion.div>
      )}

      {/* Use Cases Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8"
      >
        {filteredUseCases.map((useCase, index) => {
          const Icon = useCase.icon;
          const isSelected = selectedUseCases.some(uc => uc.id === useCase.id);
          const isExpanded = expandedUseCase === useCase.id;
          
          return (
            <motion.div
              key={useCase.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`bg-white/5 backdrop-blur-lg border rounded-2xl overflow-hidden transition-all duration-300 ${
                isSelected 
                  ? 'border-purple-500/50 bg-purple-500/10' 
                  : 'border-white/10 hover:border-white/20'
              }`}
            >
              {/* Use Case Header */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className={`p-3 rounded-lg bg-gradient-to-r ${getCategoryColor(useCase.category)}`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">{useCase.name}</h3>
                      <span className="text-gray-400 text-sm capitalize">{useCase.category} Agent</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    {showRecommended && useCase.popularity > 80 && (
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    )}
                    <button
                      onClick={() => handleUseCaseToggle(useCase)}
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                        isSelected
                          ? 'bg-purple-500 border-purple-500'
                          : 'border-gray-400 hover:border-purple-400'
                      }`}
                    >
                      {isSelected && <CheckCircle className="h-4 w-4 text-white" />}
                    </button>
                  </div>
                </div>

                <p className="text-gray-400 text-sm mb-4">{useCase.description}</p>

                {/* Key Metrics */}
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="text-center">
                    <TrendingUp className="h-5 w-5 text-green-400 mx-auto mb-1" />
                    <div className="text-lg font-bold text-white">{useCase.estimatedROI}%</div>
                    <div className="text-xs text-gray-400">ROI</div>
                  </div>
                  
                  <div className="text-center">
                    <Clock className="h-5 w-5 text-blue-400 mx-auto mb-1" />
                    <div className="text-lg font-bold text-white">{useCase.implementationTime}</div>
                    <div className="text-xs text-gray-400">Timeline</div>
                  </div>
                  
                  <div className="text-center">
                    <BarChart3 className="h-5 w-5 text-purple-400 mx-auto mb-1" />
                    <div className="text-lg font-bold text-white">{useCase.popularity}%</div>
                    <div className="text-xs text-gray-400">Popularity</div>
                  </div>
                </div>

                {/* Complexity Badge */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-gray-300">Implementation:</span>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${getComplexityColor(useCase.complexity)}`}>
                    {useCase.complexity}
                  </span>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {useCase.tags.slice(0, 3).map((tag, idx) => (
                    <span key={idx} className="px-2 py-1 bg-blue-500/20 text-blue-300 rounded text-xs">
                      {tag}
                    </span>
                  ))}
                  {useCase.tags.length > 3 && (
                    <span className="px-2 py-1 bg-gray-500/20 text-gray-400 rounded text-xs">
                      +{useCase.tags.length - 3}
                    </span>
                  )}
                </div>

                {/* Actions */}
                <div className="flex space-x-2">
                  <button
                    onClick={() => setExpandedUseCase(isExpanded ? null : useCase.id)}
                    className="flex-1 bg-white/10 hover:bg-white/20 text-white px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 flex items-center justify-center space-x-1"
                  >
                    <Info className="h-4 w-4" />
                    <span>Details</span>
                    {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                  </button>
                  
                  <button
                    onClick={() => handleUseCaseToggle(useCase)}
                    className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 flex items-center justify-center space-x-1 ${
                      isSelected
                        ? 'bg-purple-500 text-white hover:bg-purple-600'
                        : 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:shadow-lg'
                    }`}
                  >
                    {isSelected ? (
                      <>
                        <CheckCircle className="h-4 w-4" />
                        <span>Selected</span>
                      </>
                    ) : (
                      <>
                        <Zap className="h-4 w-4" />
                        <span>Select</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Expanded Details */}
              {isExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="border-t border-white/10 p-6 space-y-6"
                >
                  {/* Detailed Description */}
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-3">How It Works</h4>
                    <p className="text-gray-300 text-sm leading-relaxed">{useCase.detailedDescription}</p>
                  </div>

                  {/* Benefits */}
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-3">Key Benefits</h4>
                    <ul className="space-y-2">
                      {useCase.benefits.map((benefit, idx) => (
                        <li key={idx} className="flex items-start space-x-3">
                          <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-300 text-sm">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Sample Questions/Tasks */}
                  {(useCase.sampleQuestions || useCase.sampleTasks) && (
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-3">
                        {useCase.sampleQuestions ? 'Sample Questions' : 'Sample Tasks'}
                      </h4>
                      <ul className="space-y-2">
                        {(useCase.sampleQuestions || useCase.sampleTasks)?.map((item, idx) => (
                          <li key={idx} className="flex items-start space-x-3">
                            <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0" />
                            <span className="text-gray-300 text-sm italic">"{item}"</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Required Integrations */}
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-3">Required Integrations</h4>
                    <div className="flex flex-wrap gap-2">
                      {useCase.requiredIntegrations.map((integration, idx) => (
                        <span key={idx} className="px-3 py-1 bg-orange-500/20 text-orange-300 rounded-full text-sm">
                          {integration}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </motion.div>

      {/* Empty State */}
      {filteredUseCases.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-12 text-center"
        >
          <AlertCircle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">No Use Cases Found</h3>
          <p className="text-gray-400 mb-6">
            Try adjusting your search criteria or category filters to find relevant use cases.
          </p>
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedCategory('all');
            }}
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
          >
            Reset Filters
          </button>
        </motion.div>
      )}

      {/* Navigation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="flex justify-between items-center"
      >
        <button
          onClick={onBack}
          className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300"
        >
          Back to Departments
        </button>

        <div className="flex items-center space-x-4">
          <span className="text-gray-400 text-sm">
            {selectedUseCases.length} agent{selectedUseCases.length !== 1 ? 's' : ''} selected
          </span>
          <button
            onClick={handleContinue}
            disabled={selectedUseCases.length === 0}
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
          >
            <span>Configure Agents</span>
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default UseCaseSelection;