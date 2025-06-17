import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Target, 
  Mail, 
  Users,
  MessageSquare,
  Phone,
  Calendar,
  TrendingUp,
  BarChart3,
  Plus,
  Search,
  Filter,
  Play,
  Pause,
  Edit,
  Trash2,
  Eye,
  Send,
  Clock,
  CheckCircle,
  AlertCircle,
  Star,
  ArrowRight,
  ExternalLink,
  Copy,
  Download,
  Upload,
  Settings,
  Zap,
  Brain,
  Globe,
  Linkedin,
  Twitter,
  Facebook,
  Instagram,
  Youtube,
  RefreshCw,
  UserPlus,
  Activity,
  DollarSign,
  Percent,
  Timer,
  ChevronDown,
  ChevronRight,
  FileText,
  Database,
  Sparkles,
  Workflow,
  Bot,
  Heart,
  Share2,
  MessageCircle,
  ThumbsUp,
  Bookmark,
  Flag,
  Award,
  Briefcase,
  Building,
  MapPin,
  Link as LinkIcon
} from 'lucide-react';

interface Lead {
  id: string;
  name: string;
  email: string;
  company: string;
  title: string;
  industry: string;
  location: string;
  linkedinUrl?: string;
  score: number;
  status: 'new' | 'contacted' | 'responded' | 'qualified' | 'converted' | 'unresponsive';
  tags: string[];
  lastContact?: Date;
  nextFollowUp?: Date;
  source: string;
  notes: string;
  engagementHistory: Array<{
    type: 'email' | 'linkedin' | 'call' | 'meeting';
    date: Date;
    subject?: string;
    response?: boolean;
    notes?: string;
  }>;
  companyData?: {
    size: string;
    revenue: string;
    website: string;
    description: string;
  };
}

interface Campaign {
  id: string;
  name: string;
  description: string;
  type: 'email' | 'linkedin' | 'multi-channel';
  status: 'draft' | 'active' | 'paused' | 'completed';
  createdAt: Date;
  startDate?: Date;
  endDate?: Date;
  targetAudience: {
    industries: string[];
    titles: string[];
    companySize: string[];
    location: string[];
  };
  sequence: Array<{
    id: string;
    step: number;
    type: 'email' | 'linkedin' | 'call';
    delay: number; // days
    subject: string;
    template: string;
    variables: string[];
  }>;
  metrics: {
    totalLeads: number;
    contacted: number;
    responded: number;
    qualified: number;
    converted: number;
    responseRate: number;
    conversionRate: number;
    revenue: number;
  };
  settings: {
    dailyLimit: number;
    timezone: string;
    workingDays: string[];
    workingHours: { start: string; end: string };
    autoFollowUp: boolean;
    personalizeWithAI: boolean;
  };
}

interface Template {
  id: string;
  name: string;
  type: 'email' | 'linkedin' | 'call-script';
  category: 'cold-outreach' | 'follow-up' | 'meeting-request' | 'value-proposition';
  subject?: string;
  content: string;
  variables: string[];
  successRate: number;
  usage: number;
  createdAt: Date;
  tags: string[];
}

interface Sequence {
  id: string;
  name: string;
  description: string;
  steps: Array<{
    id: string;
    step: number;
    type: 'email' | 'linkedin' | 'call';
    delay: number;
    templateId: string;
    conditions?: Array<{
      type: 'response' | 'open' | 'click' | 'no-response';
      action: 'continue' | 'skip' | 'end' | 'branch';
    }>;
  }>;
  conversionRate: number;
  avgResponseTime: number;
  totalUses: number;
}

const OutreachCampaigns = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [templates, setTemplates] = useState<Template[]>([]);
  const [sequences, setSequences] = useState<Sequence[]>([]);
  const [selectedTab, setSelectedTab] = useState<'leads' | 'campaigns' | 'templates' | 'sequences' | 'analytics'>('leads');
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [selectedCampaign, setCampaign] = useState<Campaign | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [showLeadImport, setShowLeadImport] = useState(false);
  const [showCampaignBuilder, setShowCampaignBuilder] = useState(false);
  const [showTemplateEditor, setShowTemplateEditor] = useState(false);
  const [expandedLead, setExpandedLead] = useState<string | null>(null);
  const [isGeneratingSequence, setIsGeneratingSequence] = useState(false);

  const mockLeads: Lead[] = [
    {
      id: 'lead_1',
      name: 'Sarah Johnson',
      email: 'sarah.johnson@techcorp.com',
      company: 'TechCorp Inc.',
      title: 'VP of Operations',
      industry: 'SaaS',
      location: 'San Francisco, CA',
      linkedinUrl: 'https://linkedin.com/in/sarahjohnson',
      score: 92,
      status: 'qualified',
      tags: ['Enterprise', 'Decision Maker', 'High Priority'],
      lastContact: new Date(Date.now() - 86400000 * 2),
      nextFollowUp: new Date(Date.now() + 86400000 * 3),
      source: 'LinkedIn Sales Navigator',
      notes: 'Interested in AI automation for customer service. Mentioned budget of $50K+',
      engagementHistory: [
        {
          type: 'email',
          date: new Date(Date.now() - 86400000 * 5),
          subject: 'AI Automation for TechCorp',
          response: false
        },
        {
          type: 'linkedin',
          date: new Date(Date.now() - 86400000 * 2),
          subject: 'Follow-up on AI solutions',
          response: true,
          notes: 'Positive response, wants to schedule a demo'
        }
      ],
      companyData: {
        size: '500-1000 employees',
        revenue: '$50M-$100M',
        website: 'https://techcorp.com',
        description: 'Leading SaaS platform for project management'
      }
    },
    {
      id: 'lead_2',
      name: 'Michael Chen',
      email: 'mchen@innovateai.com',
      company: 'InnovateAI',
      title: 'CTO',
      industry: 'AI/ML',
      location: 'Austin, TX',
      score: 78,
      status: 'contacted',
      tags: ['Technical', 'AI Expert', 'Warm Lead'],
      lastContact: new Date(Date.now() - 86400000),
      nextFollowUp: new Date(Date.now() + 86400000 * 2),
      source: 'Conference Lead',
      notes: 'Met at AI Summit. Interested in agent orchestration platform',
      engagementHistory: [
        {
          type: 'email',
          date: new Date(Date.now() - 86400000),
          subject: 'Great meeting you at AI Summit',
          response: false
        }
      ],
      companyData: {
        size: '50-200 employees',
        revenue: '$10M-$50M',
        website: 'https://innovateai.com',
        description: 'AI consulting and implementation services'
      }
    },
    {
      id: 'lead_3',
      name: 'Emily Rodriguez',
      email: 'emily@growthstartup.io',
      company: 'GrowthStartup',
      title: 'Head of Growth',
      industry: 'E-commerce',
      location: 'New York, NY',
      score: 65,
      status: 'new',
      tags: ['Startup', 'Growth Focused', 'Budget Conscious'],
      source: 'Website Form',
      notes: 'Downloaded whitepaper on marketing automation',
      engagementHistory: [],
      companyData: {
        size: '10-50 employees',
        revenue: '$1M-$10M',
        website: 'https://growthstartup.io',
        description: 'Fast-growing e-commerce platform'
      }
    }
  ];

  const mockCampaigns: Campaign[] = [
    {
      id: 'campaign_1',
      name: 'Enterprise AI Automation Outreach',
      description: 'Target enterprise companies for AI agent implementation',
      type: 'multi-channel',
      status: 'active',
      createdAt: new Date(Date.now() - 86400000 * 14),
      startDate: new Date(Date.now() - 86400000 * 10),
      targetAudience: {
        industries: ['SaaS', 'E-commerce', 'Healthcare'],
        titles: ['VP Operations', 'CTO', 'Head of Customer Success'],
        companySize: ['500-1000', '1000+'],
        location: ['United States', 'Canada']
      },
      sequence: [
        {
          id: 'step_1',
          step: 1,
          type: 'email',
          delay: 0,
          subject: 'Transform {COMPANY_NAME} with AI Agents',
          template: 'enterprise_intro_email',
          variables: ['COMPANY_NAME', 'FIRST_NAME', 'INDUSTRY']
        },
        {
          id: 'step_2',
          step: 2,
          type: 'linkedin',
          delay: 3,
          subject: 'Quick follow-up on AI automation',
          template: 'linkedin_follow_up',
          variables: ['FIRST_NAME', 'COMPANY_NAME']
        },
        {
          id: 'step_3',
          step: 3,
          type: 'email',
          delay: 7,
          subject: 'Case study: How {SIMILAR_COMPANY} saved $2M with AI',
          template: 'case_study_email',
          variables: ['FIRST_NAME', 'SIMILAR_COMPANY', 'INDUSTRY']
        }
      ],
      metrics: {
        totalLeads: 1247,
        contacted: 1247,
        responded: 156,
        qualified: 89,
        converted: 23,
        responseRate: 12.5,
        conversionRate: 1.8,
        revenue: 1150000
      },
      settings: {
        dailyLimit: 50,
        timezone: 'America/New_York',
        workingDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        workingHours: { start: '09:00', end: '17:00' },
        autoFollowUp: true,
        personalizeWithAI: true
      }
    },
    {
      id: 'campaign_2',
      name: 'SMB Quick Wins Campaign',
      description: 'Target small-medium businesses with quick AI wins',
      type: 'email',
      status: 'draft',
      createdAt: new Date(Date.now() - 86400000 * 3),
      targetAudience: {
        industries: ['Professional Services', 'Real Estate', 'Healthcare'],
        titles: ['Owner', 'Manager', 'Director'],
        companySize: ['10-50', '50-200'],
        location: ['United States']
      },
      sequence: [],
      metrics: {
        totalLeads: 0,
        contacted: 0,
        responded: 0,
        qualified: 0,
        converted: 0,
        responseRate: 0,
        conversionRate: 0,
        revenue: 0
      },
      settings: {
        dailyLimit: 25,
        timezone: 'America/New_York',
        workingDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        workingHours: { start: '09:00', end: '17:00' },
        autoFollowUp: true,
        personalizeWithAI: true
      }
    }
  ];

  const mockTemplates: Template[] = [
    {
      id: 'template_1',
      name: 'Enterprise Introduction Email',
      type: 'email',
      category: 'cold-outreach',
      subject: 'Transform {COMPANY_NAME} with AI Agents',
      content: `Hi {FIRST_NAME},

I noticed {COMPANY_NAME} is doing incredible work in the {INDUSTRY} space. I wanted to reach out because we've been helping similar companies like {SIMILAR_COMPANY} automate their operations with AI agents.

Our platform has helped businesses:
• Reduce customer service costs by 60%
• Automate lead qualification saving 20+ hours/week
• Increase conversion rates by 25%

Would you be open to a 15-minute conversation about how AI agents could impact {COMPANY_NAME}?

Best regards,
{SENDER_NAME}`,
      variables: ['FIRST_NAME', 'COMPANY_NAME', 'INDUSTRY', 'SIMILAR_COMPANY', 'SENDER_NAME'],
      successRate: 14.2,
      usage: 1247,
      createdAt: new Date(Date.now() - 86400000 * 30),
      tags: ['Enterprise', 'Cold Outreach', 'AI Automation']
    },
    {
      id: 'template_2',
      name: 'LinkedIn Connection Follow-up',
      type: 'linkedin',
      category: 'follow-up',
      content: `Hi {FIRST_NAME},

Thanks for connecting! I see you're leading {DEPARTMENT} at {COMPANY_NAME}. 

I'd love to share how we've helped other {INDUSTRY} companies automate their workflows with AI agents. 

Would you be interested in a quick 10-minute call to explore potential opportunities?

Best,
{SENDER_NAME}`,
      variables: ['FIRST_NAME', 'DEPARTMENT', 'COMPANY_NAME', 'INDUSTRY', 'SENDER_NAME'],
      successRate: 18.7,
      usage: 856,
      createdAt: new Date(Date.now() - 86400000 * 20),
      tags: ['LinkedIn', 'Follow-up', 'Connection']
    },
    {
      id: 'template_3',
      name: 'Case Study Value Email',
      type: 'email',
      category: 'value-proposition',
      subject: 'How {SIMILAR_COMPANY} saved $2M with AI automation',
      content: `Hi {FIRST_NAME},

I wanted to share a quick case study that might interest you.

{SIMILAR_COMPANY}, a {INDUSTRY} company similar to {COMPANY_NAME}, recently implemented our AI agent platform and achieved:

📈 $2.1M in annual savings
⚡ 68% reduction in manual tasks
🎯 40% improvement in customer satisfaction
⏰ 25 hours saved per week per employee

The implementation took just 6 weeks and they saw ROI within 3 months.

I'd be happy to share the full case study and discuss how similar results could be achieved at {COMPANY_NAME}.

Are you available for a brief call this week?

Best regards,
{SENDER_NAME}`,
      variables: ['FIRST_NAME', 'SIMILAR_COMPANY', 'INDUSTRY', 'COMPANY_NAME', 'SENDER_NAME'],
      successRate: 22.1,
      usage: 634,
      createdAt: new Date(Date.now() - 86400000 * 15),
      tags: ['Case Study', 'Value Proposition', 'ROI']
    }
  ];

  const mockSequences: Sequence[] = [
    {
      id: 'sequence_1',
      name: 'Enterprise 5-Touch Sequence',
      description: 'Multi-channel sequence for enterprise prospects',
      steps: [
        {
          id: 'step_1',
          step: 1,
          type: 'email',
          delay: 0,
          templateId: 'template_1'
        },
        {
          id: 'step_2',
          step: 2,
          type: 'linkedin',
          delay: 3,
          templateId: 'template_2'
        },
        {
          id: 'step_3',
          step: 3,
          type: 'email',
          delay: 7,
          templateId: 'template_3'
        }
      ],
      conversionRate: 18.5,
      avgResponseTime: 2.3,
      totalUses: 1247
    }
  ];

  useEffect(() => {
    setLeads(mockLeads);
    setCampaigns(mockCampaigns);
    setTemplates(mockTemplates);
    setSequences(mockSequences);
  }, []);

  const filteredLeads = leads.filter(lead => {
    const matchesSearch = lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lead.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lead.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || lead.status === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'text-blue-400 bg-blue-500/20';
      case 'contacted': return 'text-yellow-400 bg-yellow-500/20';
      case 'responded': return 'text-green-400 bg-green-500/20';
      case 'qualified': return 'text-purple-400 bg-purple-500/20';
      case 'converted': return 'text-emerald-400 bg-emerald-500/20';
      case 'unresponsive': return 'text-red-400 bg-red-500/20';
      case 'active': return 'text-green-400 bg-green-500/20';
      case 'paused': return 'text-yellow-400 bg-yellow-500/20';
      case 'completed': return 'text-purple-400 bg-purple-500/20';
      case 'draft': return 'text-gray-400 bg-gray-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-400';
    if (score >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  const tabs = [
    { id: 'leads', label: 'Leads', icon: Users },
    { id: 'campaigns', label: 'Campaigns', icon: Target },
    { id: 'templates', label: 'Templates', icon: FileText },
    { id: 'sequences', label: 'Sequences', icon: Workflow },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 }
  ];

  const leadFilters = [
    { id: 'all', label: 'All Leads' },
    { id: 'new', label: 'New' },
    { id: 'contacted', label: 'Contacted' },
    { id: 'responded', label: 'Responded' },
    { id: 'qualified', label: 'Qualified' },
    { id: 'converted', label: 'Converted' },
    { id: 'unresponsive', label: 'Unresponsive' }
  ];

  const handleGenerateSequence = async () => {
    setIsGeneratingSequence(true);
    
    // Simulate AI sequence generation
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    setIsGeneratingSequence(false);
    setShowCampaignBuilder(false);
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
            <Target className="h-10 w-10 text-indigo-400" />
            <span>Outreach Campaigns</span>
          </h1>
          <p className="text-gray-400 text-lg">
            Intelligent lead generation and personalized outreach automation
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
              <Users className="h-8 w-8 text-blue-400" />
              <span className="text-blue-400 text-sm font-medium">+47</span>
            </div>
            <div className="text-2xl font-bold text-white mb-1">{leads.length}</div>
            <div className="text-gray-400 text-sm">Total Leads</div>
          </div>

          <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <Target className="h-8 w-8 text-green-400" />
              <span className="text-green-400 text-sm font-medium">+2</span>
            </div>
            <div className="text-2xl font-bold text-white mb-1">{campaigns.filter(c => c.status === 'active').length}</div>
            <div className="text-gray-400 text-sm">Active Campaigns</div>
          </div>

          <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <Percent className="h-8 w-8 text-purple-400" />
              <span className="text-purple-400 text-sm font-medium">+2.1%</span>
            </div>
            <div className="text-2xl font-bold text-white mb-1">12.5%</div>
            <div className="text-gray-400 text-sm">Response Rate</div>
          </div>

          <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <DollarSign className="h-8 w-8 text-yellow-400" />
              <span className="text-yellow-400 text-sm font-medium">+$230K</span>
            </div>
            <div className="text-2xl font-bold text-white mb-1">$1.15M</div>
            <div className="text-gray-400 text-sm">Pipeline Value</div>
          </div>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex space-x-1 mb-8 bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-2"
        >
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id as any)}
                className={`flex items-center space-x-2 px-4 py-3 rounded-lg font-medium transition-all duration-300 flex-1 justify-center ${
                  selectedTab === tab.id
                    ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`}
              >
                <Icon className="h-5 w-5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </motion.div>

        {/* Leads Tab */}
        {selectedTab === 'leads' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            {/* Controls */}
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search leads..."
                  className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>

              {/* Status Filter */}
              <div className="flex flex-wrap gap-2">
                {leadFilters.map((filter) => (
                  <button
                    key={filter.id}
                    onClick={() => setSelectedFilter(filter.id)}
                    className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                      selectedFilter === filter.id
                        ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                        : 'bg-white/5 text-gray-300 hover:bg-white/10 border border-white/10'
                    }`}
                  >
                    {filter.label}
                  </button>
                ))}
              </div>

              {/* Import Leads Button */}
              <button
                onClick={() => setShowLeadImport(true)}
                className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg hover:shadow-indigo-500/25 transition-all duration-300 flex items-center space-x-2"
              >
                <Upload className="h-5 w-5" />
                <span>Import Leads</span>
              </button>
            </div>

            {/* Leads Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredLeads.map((lead, index) => {
                const isExpanded = expandedLead === lead.id;
                
                return (
                  <motion.div
                    key={lead.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl overflow-hidden"
                  >
                    {/* Lead Header */}
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center">
                            <span className="text-white font-semibold text-lg">
                              {lead.name.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-white">{lead.name}</h3>
                            <p className="text-gray-400 text-sm">{lead.title}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <span className={`text-lg font-bold ${getScoreColor(lead.score)}`}>
                            {lead.score}
                          </span>
                          <Star className={`h-4 w-4 ${getScoreColor(lead.score)}`} />
                        </div>
                      </div>

                      <div className="space-y-3 mb-4">
                        <div className="flex items-center space-x-2 text-sm text-gray-300">
                          <Building className="h-4 w-4" />
                          <span>{lead.company}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-gray-300">
                          <Mail className="h-4 w-4" />
                          <span>{lead.email}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-gray-300">
                          <MapPin className="h-4 w-4" />
                          <span>{lead.location}</span>
                        </div>
                      </div>

                      {/* Status and Tags */}
                      <div className="flex items-center justify-between mb-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(lead.status)}`}>
                          {lead.status.toUpperCase()}
                        </span>
                        <span className="text-gray-400 text-xs">{lead.source}</span>
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {lead.tags.slice(0, 2).map((tag, idx) => (
                          <span key={idx} className="px-2 py-1 bg-blue-500/20 text-blue-300 rounded text-xs">
                            {tag}
                          </span>
                        ))}
                        {lead.tags.length > 2 && (
                          <span className="px-2 py-1 bg-gray-500/20 text-gray-400 rounded text-xs">
                            +{lead.tags.length - 2} more
                          </span>
                        )}
                      </div>

                      {/* Last Contact */}
                      {lead.lastContact && (
                        <div className="text-xs text-gray-400 mb-4">
                          Last contact: {lead.lastContact.toLocaleDateString()}
                        </div>
                      )}

                      {/* Actions */}
                      <div className="flex space-x-2">
                        <button
                          onClick={() => setExpandedLead(isExpanded ? null : lead.id)}
                          className="flex-1 bg-white/10 hover:bg-white/20 text-white px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 flex items-center justify-center space-x-1"
                        >
                          <Eye className="h-4 w-4" />
                          <span>Details</span>
                        </button>
                        
                        <button className="flex-1 bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-3 py-2 rounded-lg text-sm font-medium hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-1">
                          <Send className="h-4 w-4" />
                          <span>Contact</span>
                        </button>
                      </div>
                    </div>

                    {/* Expanded Details */}
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="border-t border-white/10 p-6 space-y-4"
                      >
                        {/* Company Data */}
                        {lead.companyData && (
                          <div>
                            <h4 className="text-sm font-semibold text-white mb-2">Company Info</h4>
                            <div className="space-y-2 text-sm text-gray-300">
                              <div>Size: {lead.companyData.size}</div>
                              <div>Revenue: {lead.companyData.revenue}</div>
                              <div>Website: 
                                <a href={lead.companyData.website} target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:text-indigo-300 ml-1">
                                  {lead.companyData.website}
                                </a>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Engagement History */}
                        <div>
                          <h4 className="text-sm font-semibold text-white mb-2">Engagement History</h4>
                          <div className="space-y-2">
                            {lead.engagementHistory.map((engagement, idx) => (
                              <div key={idx} className="flex items-center space-x-3 text-sm">
                                <div className={`w-2 h-2 rounded-full ${engagement.response ? 'bg-green-400' : 'bg-gray-400'}`} />
                                <span className="text-gray-300">{engagement.type}</span>
                                <span className="text-gray-400">{engagement.date.toLocaleDateString()}</span>
                                {engagement.response && <CheckCircle className="h-3 w-3 text-green-400" />}
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Notes */}
                        {lead.notes && (
                          <div>
                            <h4 className="text-sm font-semibold text-white mb-2">Notes</h4>
                            <p className="text-sm text-gray-300">{lead.notes}</p>
                          </div>
                        )}

                        {/* Additional Actions */}
                        <div className="flex space-x-2 pt-4">
                          <button className="flex-1 bg-white/10 hover:bg-white/20 text-white px-3 py-2 rounded-lg text-sm transition-all duration-300">
                            Edit Lead
                          </button>
                          <button className="flex-1 bg-white/10 hover:bg-white/20 text-white px-3 py-2 rounded-lg text-sm transition-all duration-300">
                            Add to Campaign
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* Campaigns Tab */}
        {selectedTab === 'campaigns' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold text-white">Outreach Campaigns</h2>
              <button
                onClick={() => setShowCampaignBuilder(true)}
                className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg hover:shadow-indigo-500/25 transition-all duration-300 flex items-center space-x-2"
              >
                <Plus className="h-5 w-5" />
                <span>Create Campaign</span>
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {campaigns.map((campaign, index) => (
                <motion.div
                  key={campaign.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-2">{campaign.name}</h3>
                      <p className="text-gray-400 text-sm">{campaign.description}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(campaign.status)}`}>
                      {campaign.status.toUpperCase()}
                    </span>
                  </div>

                  {/* Campaign Type */}
                  <div className="flex items-center space-x-2 mb-4">
                    <span className="px-2 py-1 bg-purple-500/20 text-purple-300 rounded text-xs capitalize">
                      {campaign.type.replace('-', ' ')}
                    </span>
                    <span className="text-gray-400 text-xs">
                      {campaign.sequence.length} steps
                    </span>
                  </div>

                  {/* Campaign Metrics */}
                  {campaign.status !== 'draft' && (
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="text-center bg-white/5 rounded-lg p-3">
                        <div className="text-lg font-bold text-white">{campaign.metrics.totalLeads.toLocaleString()}</div>
                        <div className="text-xs text-gray-400">Total Leads</div>
                      </div>
                      <div className="text-center bg-white/5 rounded-lg p-3">
                        <div className="text-lg font-bold text-green-400">{campaign.metrics.responseRate}%</div>
                        <div className="text-xs text-gray-400">Response Rate</div>
                      </div>
                    </div>
                  )}

                  {/* Target Audience */}
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-white mb-2">Target Audience:</h4>
                    <div className="flex flex-wrap gap-1">
                      {campaign.targetAudience.industries.slice(0, 3).map((industry, idx) => (
                        <span key={idx} className="px-2 py-1 bg-blue-500/20 text-blue-300 rounded text-xs">
                          {industry}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex space-x-2">
                    <button className="flex-1 bg-white/10 hover:bg-white/20 text-white px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300">
                      View Details
                    </button>
                    <button className="flex-1 bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-3 py-2 rounded-lg text-sm font-medium hover:shadow-lg transition-all duration-300">
                      Manage
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Templates Tab */}
        {selectedTab === 'templates' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold text-white">Message Templates</h2>
              <button
                onClick={() => setShowTemplateEditor(true)}
                className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg hover:shadow-indigo-500/25 transition-all duration-300 flex items-center space-x-2"
              >
                <Plus className="h-5 w-5" />
                <span>Create Template</span>
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {templates.map((template, index) => (
                <motion.div
                  key={template.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-1">{template.name}</h3>
                      <span className="text-gray-400 text-sm capitalize">{template.type}</span>
                    </div>
                    <span className="px-2 py-1 bg-green-500/20 text-green-300 rounded text-xs">
                      {template.successRate}% success
                    </span>
                  </div>

                  {/* Subject Line */}
                  {template.subject && (
                    <div className="mb-3">
                      <div className="text-xs text-gray-400 mb-1">Subject:</div>
                      <div className="text-sm text-white font-medium">{template.subject}</div>
                    </div>
                  )}

                  {/* Content Preview */}
                  <div className="bg-white/5 rounded-lg p-3 mb-4">
                    <div className="text-xs text-gray-400 mb-1">Content Preview:</div>
                    <div className="text-sm text-gray-300 line-clamp-4">
                      {template.content.substring(0, 150)}...
                    </div>
                  </div>

                  {/* Variables */}
                  <div className="mb-4">
                    <div className="text-xs text-gray-400 mb-2">Variables:</div>
                    <div className="flex flex-wrap gap-1">
                      {template.variables.slice(0, 3).map((variable, idx) => (
                        <span key={idx} className="px-2 py-1 bg-blue-500/20 text-blue-300 rounded text-xs">
                          {variable}
                        </span>
                      ))}
                      {template.variables.length > 3 && (
                        <span className="px-2 py-1 bg-gray-500/20 text-gray-400 rounded text-xs">
                          +{template.variables.length - 3}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Usage Stats */}
                  <div className="flex items-center justify-between text-xs text-gray-400 mb-4">
                    <span>Used {template.usage} times</span>
                    <span>{template.successRate}% success rate</span>
                  </div>

                  {/* Actions */}
                  <div className="flex space-x-2">
                    <button className="flex-1 bg-white/10 hover:bg-white/20 text-white px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300">
                      Edit
                    </button>
                    <button className="flex-1 bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-3 py-2 rounded-lg text-sm font-medium hover:shadow-lg transition-all duration-300">
                      Use Template
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Sequences Tab */}
        {selectedTab === 'sequences' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold text-white">Outreach Sequences</h2>
              <button className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg hover:shadow-indigo-500/25 transition-all duration-300 flex items-center space-x-2">
                <Plus className="h-5 w-5" />
                <span>Create Sequence</span>
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {sequences.map((sequence, index) => (
                <motion.div
                  key={sequence.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-2">{sequence.name}</h3>
                      <p className="text-gray-400 text-sm">{sequence.description}</p>
                    </div>
                    <span className="px-2 py-1 bg-purple-500/20 text-purple-300 rounded text-xs">
                      {sequence.steps.length} steps
                    </span>
                  </div>

                  {/* Sequence Steps */}
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-white mb-2">Sequence Flow:</h4>
                    <div className="space-y-2">
                      {sequence.steps.map((step, idx) => (
                        <div key={step.id} className="flex items-center space-x-3 text-sm">
                          <div className="w-6 h-6 bg-indigo-500 rounded-full flex items-center justify-center text-white text-xs">
                            {step.step}
                          </div>
                          <span className="text-gray-300 capitalize">{step.type}</span>
                          <span className="text-gray-400">
                            {step.delay === 0 ? 'Immediate' : `+${step.delay} days`}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Performance Metrics */}
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="text-center bg-white/5 rounded-lg p-3">
                      <div className="text-lg font-bold text-green-400">{sequence.conversionRate}%</div>
                      <div className="text-xs text-gray-400">Conversion</div>
                    </div>
                    <div className="text-center bg-white/5 rounded-lg p-3">
                      <div className="text-lg font-bold text-blue-400">{sequence.avgResponseTime}d</div>
                      <div className="text-xs text-gray-400">Avg Response</div>
                    </div>
                    <div className="text-center bg-white/5 rounded-lg p-3">
                      <div className="text-lg font-bold text-white">{sequence.totalUses}</div>
                      <div className="text-xs text-gray-400">Total Uses</div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex space-x-2">
                    <button className="flex-1 bg-white/10 hover:bg-white/20 text-white px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300">
                      Edit Sequence
                    </button>
                    <button className="flex-1 bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-3 py-2 rounded-lg text-sm font-medium hover:shadow-lg transition-all duration-300">
                      Use Sequence
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Analytics Tab */}
        {selectedTab === 'analytics' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-semibold text-white">Outreach Analytics</h2>
            
            <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 text-center">
              <BarChart3 className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Advanced Analytics Coming Soon</h3>
              <p className="text-gray-400">
                Comprehensive outreach analytics with performance metrics, conversion tracking, and ROI analysis.
              </p>
            </div>
          </motion.div>
        )}

        {/* Lead Import Modal */}
        {showLeadImport && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowLeadImport(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-slate-900 border border-white/10 rounded-2xl p-8 max-w-2xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center space-x-3 mb-6">
                <Upload className="h-8 w-8 text-indigo-400" />
                <div>
                  <h2 className="text-2xl font-bold text-white">Import Leads</h2>
                  <p className="text-gray-400">Upload your lead list or connect data sources</p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="border-2 border-dashed border-white/20 rounded-lg p-8 text-center">
                  <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-white mb-2">Upload CSV File</h3>
                  <p className="text-gray-400 mb-4">Drag and drop your CSV file or click to browse</p>
                  <button className="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-2 rounded-lg transition-all duration-300">
                    Choose File
                  </button>
                </div>

                <div className="text-center text-gray-400">or</div>

                <div className="grid grid-cols-2 gap-4">
                  <button className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg p-4 text-center transition-all duration-300">
                    <Linkedin className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                    <div className="text-white font-medium">LinkedIn Sales Navigator</div>
                  </button>
                  
                  <button className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg p-4 text-center transition-all duration-300">
                    <Database className="h-8 w-8 text-green-400 mx-auto mb-2" />
                    <div className="text-white font-medium">CRM Integration</div>
                  </button>
                </div>
              </div>

              <div className="flex space-x-4 mt-8">
                <button
                  onClick={() => setShowLeadImport(false)}
                  className="flex-1 bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-lg transition-all duration-300"
                >
                  Cancel
                </button>
                <button className="flex-1 bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg hover:shadow-indigo-500/25 transition-all duration-300">
                  Import Leads
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Campaign Builder Modal */}
        {showCampaignBuilder && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowCampaignBuilder(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-slate-900 border border-white/10 rounded-2xl p-8 max-w-4xl w-full max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center space-x-3 mb-6">
                <Target className="h-8 w-8 text-indigo-400" />
                <div>
                  <h2 className="text-2xl font-bold text-white">Create Campaign</h2>
                  <p className="text-gray-400">Set up your outreach campaign with AI-powered sequences</p>
                </div>
              </div>

              {!isGeneratingSequence ? (
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Campaign Name</label>
                      <input
                        type="text"
                        placeholder="e.g., Enterprise AI Outreach"
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Campaign Type</label>
                      <select className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500">
                        <option value="email">Email Only</option>
                        <option value="linkedin">LinkedIn Only</option>
                        <option value="multi-channel">Multi-Channel</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Target Industries</label>
                    <input
                      type="text"
                      placeholder="e.g., SaaS, E-commerce, Healthcare"
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Job Titles</label>
                      <input
                        type="text"
                        placeholder="e.g., VP Operations, CTO, Head of Growth"
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Company Size</label>
                      <select className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500">
                        <option value="10-50">10-50 employees</option>
                        <option value="50-200">50-200 employees</option>
                        <option value="200-1000">200-1000 employees</option>
                        <option value="1000+">1000+ employees</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Campaign Goal</label>
                    <textarea
                      placeholder="Describe what you want to achieve with this campaign..."
                      rows={3}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>

                  <div className="bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-500/20 rounded-lg p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <Sparkles className="h-5 w-5 text-indigo-400" />
                      <span className="text-indigo-300 font-medium">AI-Powered Sequence Generation</span>
                    </div>
                    <p className="text-gray-300 text-sm">
                      Our AI will automatically generate a personalized outreach sequence based on your target audience and goals.
                    </p>
                  </div>

                  <div className="flex space-x-4">
                    <button
                      onClick={() => setShowCampaignBuilder(false)}
                      className="flex-1 bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-lg transition-all duration-300"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleGenerateSequence}
                      className="flex-1 bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg hover:shadow-indigo-500/25 transition-all duration-300 flex items-center justify-center space-x-2"
                    >
                      <Sparkles className="h-5 w-5" />
                      <span>Generate Campaign</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="animate-spin w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full mx-auto mb-4"></div>
                  <h3 className="text-xl font-semibold text-white mb-2">Generating Campaign</h3>
                  <p className="text-gray-400">AI is creating your personalized outreach sequence...</p>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default OutreachCampaigns;