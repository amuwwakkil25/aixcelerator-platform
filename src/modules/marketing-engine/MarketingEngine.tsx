import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  PenTool, 
  Share2,
  FileText,
  Video,
  Mic,
  Image,
  Calendar,
  Target,
  BarChart3,
  Users,
  Eye,
  Heart,
  MessageCircle,
  Share,
  Play,
  Pause,
  Edit,
  Trash2,
  Plus,
  Filter,
  Search,
  Clock,
  CheckCircle,
  AlertCircle,
  Zap,
  Globe,
  Mail,
  Instagram,
  Twitter,
  Linkedin,
  Youtube,
  Facebook,
  ArrowRight,
  Download,
  Copy,
  ExternalLink,
  Sparkles,
  Brain,
  Wand2,
  RefreshCw,
  ChevronDown,
  ChevronRight
} from 'lucide-react';

interface ContentPiece {
  id: string;
  title: string;
  type: 'blog' | 'social' | 'video' | 'email' | 'ad';
  status: 'draft' | 'scheduled' | 'published' | 'failed';
  platform?: string;
  content: string;
  createdAt: Date;
  scheduledAt?: Date;
  publishedAt?: Date;
  metrics?: {
    views: number;
    likes: number;
    shares: number;
    comments: number;
    clicks: number;
    conversions: number;
  };
  tags: string[];
  aiGenerated: boolean;
}

interface Campaign {
  id: string;
  name: string;
  description: string;
  status: 'draft' | 'active' | 'paused' | 'completed';
  startDate: Date;
  endDate?: Date;
  contentPieces: string[];
  targetAudience: string;
  goals: string[];
  budget?: number;
  metrics: {
    reach: number;
    engagement: number;
    conversions: number;
    roi: number;
  };
}

interface ContentTemplate {
  id: string;
  name: string;
  type: 'blog' | 'social' | 'video' | 'email' | 'ad';
  description: string;
  template: string;
  variables: string[];
  category: string;
}

const MarketingEngine = () => {
  const [contentPieces, setContentPieces] = useState<ContentPiece[]>([]);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [templates, setTemplates] = useState<ContentTemplate[]>([]);
  const [selectedTab, setSelectedTab] = useState<'content' | 'campaigns' | 'templates' | 'analytics'>('content');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showContentGenerator, setShowContentGenerator] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [expandedContent, setExpandedContent] = useState<string | null>(null);

  const contentTypes = [
    { id: 'all', label: 'All Content', icon: FileText },
    { id: 'blog', label: 'Blog Posts', icon: FileText },
    { id: 'social', label: 'Social Media', icon: Share2 },
    { id: 'video', label: 'Video Scripts', icon: Video },
    { id: 'email', label: 'Email Campaigns', icon: Mail },
    { id: 'ad', label: 'Advertisements', icon: Target }
  ];

  const platforms = [
    { id: 'linkedin', label: 'LinkedIn', icon: Linkedin, color: 'text-blue-600' },
    { id: 'twitter', label: 'Twitter', icon: Twitter, color: 'text-blue-400' },
    { id: 'facebook', label: 'Facebook', icon: Facebook, color: 'text-blue-700' },
    { id: 'instagram', label: 'Instagram', icon: Instagram, color: 'text-pink-500' },
    { id: 'youtube', label: 'YouTube', icon: Youtube, color: 'text-red-600' },
    { id: 'website', label: 'Website', icon: Globe, color: 'text-green-500' }
  ];

  const mockContentPieces: ContentPiece[] = [
    {
      id: 'content_1',
      title: 'How AI Agents Are Revolutionizing Customer Service',
      type: 'blog',
      status: 'published',
      content: 'In today\'s fast-paced business environment, AI agents are transforming how companies handle customer service...',
      createdAt: new Date(Date.now() - 86400000 * 2),
      publishedAt: new Date(Date.now() - 86400000),
      metrics: {
        views: 2847,
        likes: 156,
        shares: 43,
        comments: 28,
        clicks: 234,
        conversions: 12
      },
      tags: ['AI', 'Customer Service', 'Automation'],
      aiGenerated: true
    },
    {
      id: 'content_2',
      title: '🚀 Just deployed our first AI chatbot and the results are incredible! 94% success rate in handling customer inquiries. #AIAutomation #CustomerService',
      type: 'social',
      status: 'published',
      platform: 'linkedin',
      content: '🚀 Just deployed our first AI chatbot and the results are incredible! 94% success rate in handling customer inquiries. The future of customer service is here! #AIAutomation #CustomerService #Innovation',
      createdAt: new Date(Date.now() - 86400000),
      publishedAt: new Date(Date.now() - 3600000 * 6),
      metrics: {
        views: 1234,
        likes: 89,
        shares: 23,
        comments: 15,
        clicks: 67,
        conversions: 5
      },
      tags: ['AI', 'Success Story', 'LinkedIn'],
      aiGenerated: true
    },
    {
      id: 'content_3',
      title: 'Weekly AI Insights Newsletter - Issue #47',
      type: 'email',
      status: 'scheduled',
      scheduledAt: new Date(Date.now() + 86400000),
      content: 'This week in AI: Latest trends, case studies, and actionable insights for business leaders...',
      createdAt: new Date(Date.now() - 3600000 * 2),
      tags: ['Newsletter', 'AI Trends', 'Business'],
      aiGenerated: true
    },
    {
      id: 'content_4',
      title: 'Transform Your Business with AI Agents - Video Script',
      type: 'video',
      status: 'draft',
      content: 'INTRO: Welcome to the future of business automation. Today, we\'re exploring how AI agents can transform your operations...',
      createdAt: new Date(Date.now() - 3600000),
      tags: ['Video Script', 'Business Transformation', 'AI'],
      aiGenerated: false
    }
  ];

  const mockCampaigns: Campaign[] = [
    {
      id: 'campaign_1',
      name: 'AI Agent Awareness Campaign',
      description: 'Multi-channel campaign to increase awareness of AI agent solutions',
      status: 'active',
      startDate: new Date(Date.now() - 86400000 * 14),
      endDate: new Date(Date.now() + 86400000 * 16),
      contentPieces: ['content_1', 'content_2'],
      targetAudience: 'B2B Decision Makers',
      goals: ['Increase brand awareness', 'Generate qualified leads', 'Drive demo requests'],
      budget: 25000,
      metrics: {
        reach: 45000,
        engagement: 3200,
        conversions: 89,
        roi: 340
      }
    },
    {
      id: 'campaign_2',
      name: 'Customer Success Stories',
      description: 'Showcase successful AI agent implementations',
      status: 'draft',
      startDate: new Date(Date.now() + 86400000 * 7),
      contentPieces: [],
      targetAudience: 'Existing Customers & Prospects',
      goals: ['Build trust', 'Encourage referrals', 'Increase retention'],
      metrics: {
        reach: 0,
        engagement: 0,
        conversions: 0,
        roi: 0
      }
    }
  ];

  const mockTemplates: ContentTemplate[] = [
    {
      id: 'template_1',
      name: 'AI Success Story Blog Post',
      type: 'blog',
      description: 'Template for writing customer success stories with AI implementations',
      template: 'How {COMPANY_NAME} Achieved {RESULT_PERCENTAGE}% {IMPROVEMENT_METRIC} with AI Agents...',
      variables: ['COMPANY_NAME', 'RESULT_PERCENTAGE', 'IMPROVEMENT_METRIC', 'INDUSTRY'],
      category: 'Success Stories'
    },
    {
      id: 'template_2',
      name: 'LinkedIn Achievement Post',
      type: 'social',
      description: 'Template for sharing AI implementation achievements on LinkedIn',
      template: '🚀 Exciting news! {COMPANY_NAME} just achieved {ACHIEVEMENT} using AI agents. {BRIEF_DESCRIPTION} #AI #Automation #Success',
      variables: ['COMPANY_NAME', 'ACHIEVEMENT', 'BRIEF_DESCRIPTION'],
      category: 'Social Media'
    },
    {
      id: 'template_3',
      name: 'Product Demo Email',
      type: 'email',
      description: 'Email template for inviting prospects to product demos',
      template: 'Subject: See how {COMPANY_NAME} can save {TIME_SAVED} hours per week\n\nHi {FIRST_NAME},\n\nI noticed you\'re in the {INDUSTRY} industry...',
      variables: ['COMPANY_NAME', 'TIME_SAVED', 'FIRST_NAME', 'INDUSTRY'],
      category: 'Email Marketing'
    }
  ];

  useEffect(() => {
    setContentPieces(mockContentPieces);
    setCampaigns(mockCampaigns);
    setTemplates(mockTemplates);
  }, []);

  const filteredContent = contentPieces.filter(content => {
    const matchesType = selectedType === 'all' || content.type === selectedType;
    const matchesSearch = content.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         content.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesType && matchesSearch;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'text-green-400 bg-green-500/20';
      case 'scheduled': return 'text-blue-400 bg-blue-500/20';
      case 'draft': return 'text-gray-400 bg-gray-500/20';
      case 'failed': return 'text-red-400 bg-red-500/20';
      case 'active': return 'text-green-400 bg-green-500/20';
      case 'paused': return 'text-yellow-400 bg-yellow-500/20';
      case 'completed': return 'text-purple-400 bg-purple-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'blog': return FileText;
      case 'social': return Share2;
      case 'video': return Video;
      case 'email': return Mail;
      case 'ad': return Target;
      default: return FileText;
    }
  };

  const getPlatformIcon = (platform: string) => {
    const platformData = platforms.find(p => p.id === platform);
    return platformData?.icon || Globe;
  };

  const handleGenerateContent = async () => {
    setIsGenerating(true);
    
    // Simulate AI content generation
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    const newContent: ContentPiece = {
      id: `content_${Date.now()}`,
      title: 'AI-Generated: The Future of Business Automation',
      type: 'blog',
      status: 'draft',
      content: 'This AI-generated blog post explores the latest trends in business automation and how companies can leverage AI agents to streamline their operations...',
      createdAt: new Date(),
      tags: ['AI Generated', 'Automation', 'Business'],
      aiGenerated: true
    };

    setContentPieces(prev => [newContent, ...prev]);
    setIsGenerating(false);
    setShowContentGenerator(false);
  };

  const tabs = [
    { id: 'content', label: 'Content Library', icon: FileText },
    { id: 'campaigns', label: 'Campaigns', icon: Target },
    { id: 'templates', label: 'Templates', icon: Wand2 },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 }
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
          <h1 className="text-4xl font-bold text-white mb-2 flex items-center space-x-3">
            <TrendingUp className="h-10 w-10 text-pink-400" />
            <span>Marketing Engine</span>
          </h1>
          <p className="text-gray-400 text-lg">
            AI-powered content generation and marketing automation
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
              <FileText className="h-8 w-8 text-blue-400" />
              <span className="text-blue-400 text-sm font-medium">+12</span>
            </div>
            <div className="text-2xl font-bold text-white mb-1">{contentPieces.length}</div>
            <div className="text-gray-400 text-sm">Content Pieces</div>
          </div>

          <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <Target className="h-8 w-8 text-green-400" />
              <span className="text-green-400 text-sm font-medium">+2</span>
            </div>
            <div className="text-2xl font-bold text-white mb-1">{campaigns.length}</div>
            <div className="text-gray-400 text-sm">Active Campaigns</div>
          </div>

          <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <Eye className="h-8 w-8 text-purple-400" />
              <span className="text-purple-400 text-sm font-medium">+1.2K</span>
            </div>
            <div className="text-2xl font-bold text-white mb-1">47.3K</div>
            <div className="text-gray-400 text-sm">Total Reach</div>
          </div>

          <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <TrendingUp className="h-8 w-8 text-yellow-400" />
              <span className="text-yellow-400 text-sm font-medium">+15%</span>
            </div>
            <div className="text-2xl font-bold text-white mb-1">340%</div>
            <div className="text-gray-400 text-sm">Campaign ROI</div>
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
                    ? 'bg-pink-500/20 text-pink-300 border border-pink-500/30'
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`}
              >
                <Icon className="h-5 w-5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </motion.div>

        {/* Content Library Tab */}
        {selectedTab === 'content' && (
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
                  placeholder="Search content..."
                  className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                />
              </div>

              {/* Type Filter */}
              <div className="flex flex-wrap gap-2">
                {contentTypes.map((type) => {
                  const Icon = type.icon;
                  return (
                    <button
                      key={type.id}
                      onClick={() => setSelectedType(type.id)}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                        selectedType === type.id
                          ? 'bg-pink-500/20 text-pink-300 border border-pink-500/30'
                          : 'bg-white/5 text-gray-300 hover:bg-white/10 border border-white/10'
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      <span className="hidden sm:inline">{type.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Generate Content Button */}
              <button
                onClick={() => setShowContentGenerator(true)}
                className="bg-gradient-to-r from-pink-500 to-rose-500 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg hover:shadow-pink-500/25 transition-all duration-300 flex items-center space-x-2"
              >
                <Sparkles className="h-5 w-5" />
                <span>Generate Content</span>
              </button>
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredContent.map((content, index) => {
                const TypeIcon = getTypeIcon(content.type);
                const PlatformIcon = content.platform ? getPlatformIcon(content.platform) : null;
                const isExpanded = expandedContent === content.id;
                
                return (
                  <motion.div
                    key={content.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl overflow-hidden"
                  >
                    {/* Content Header */}
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-gradient-to-r from-pink-500 to-rose-500 rounded-lg">
                            <TypeIcon className="h-5 w-5 text-white" />
                          </div>
                          {PlatformIcon && (
                            <div className="p-2 bg-white/10 rounded-lg">
                              <PlatformIcon className="h-4 w-4 text-gray-300" />
                            </div>
                          )}
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          {content.aiGenerated && (
                            <span className="px-2 py-1 bg-purple-500/20 text-purple-300 rounded-full text-xs flex items-center space-x-1">
                              <Brain className="h-3 w-3" />
                              <span>AI</span>
                            </span>
                          )}
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(content.status)}`}>
                            {content.status.toUpperCase()}
                          </span>
                        </div>
                      </div>

                      <h3 className="text-lg font-semibold text-white mb-2 line-clamp-2">
                        {content.title}
                      </h3>

                      <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                        {content.content}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {content.tags.slice(0, 3).map((tag, idx) => (
                          <span key={idx} className="px-2 py-1 bg-blue-500/20 text-blue-300 rounded text-xs">
                            {tag}
                          </span>
                        ))}
                        {content.tags.length > 3 && (
                          <span className="px-2 py-1 bg-gray-500/20 text-gray-400 rounded text-xs">
                            +{content.tags.length - 3} more
                          </span>
                        )}
                      </div>

                      {/* Metrics */}
                      {content.metrics && (
                        <div className="grid grid-cols-3 gap-4 mb-4">
                          <div className="text-center">
                            <div className="text-lg font-bold text-white">{content.metrics.views.toLocaleString()}</div>
                            <div className="text-xs text-gray-400">Views</div>
                          </div>
                          <div className="text-center">
                            <div className="text-lg font-bold text-pink-400">{content.metrics.likes}</div>
                            <div className="text-xs text-gray-400">Likes</div>
                          </div>
                          <div className="text-center">
                            <div className="text-lg font-bold text-blue-400">{content.metrics.shares}</div>
                            <div className="text-xs text-gray-400">Shares</div>
                          </div>
                        </div>
                      )}

                      {/* Timestamps */}
                      <div className="flex items-center justify-between text-xs text-gray-400 mb-4">
                        <span>Created {content.createdAt.toLocaleDateString()}</span>
                        {content.publishedAt && (
                          <span>Published {content.publishedAt.toLocaleDateString()}</span>
                        )}
                        {content.scheduledAt && (
                          <span>Scheduled {content.scheduledAt.toLocaleDateString()}</span>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="flex space-x-2">
                        <button className="flex-1 bg-white/10 hover:bg-white/20 text-white px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 flex items-center justify-center space-x-1">
                          <Edit className="h-4 w-4" />
                          <span>Edit</span>
                        </button>
                        
                        <button className="flex-1 bg-white/10 hover:bg-white/20 text-white px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 flex items-center justify-center space-x-1">
                          <Copy className="h-4 w-4" />
                          <span>Copy</span>
                        </button>
                        
                        <button className="flex-1 bg-gradient-to-r from-pink-500 to-rose-500 text-white px-3 py-2 rounded-lg text-sm font-medium hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-1">
                          <Share className="h-4 w-4" />
                          <span>Share</span>
                        </button>
                      </div>
                    </div>
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
              <h2 className="text-2xl font-semibold text-white">Marketing Campaigns</h2>
              <button className="bg-gradient-to-r from-pink-500 to-rose-500 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg hover:shadow-pink-500/25 transition-all duration-300 flex items-center space-x-2">
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

                  {/* Campaign Metrics */}
                  {campaign.status !== 'draft' && (
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="text-center bg-white/5 rounded-lg p-3">
                        <div className="text-lg font-bold text-white">{campaign.metrics.reach.toLocaleString()}</div>
                        <div className="text-xs text-gray-400">Reach</div>
                      </div>
                      <div className="text-center bg-white/5 rounded-lg p-3">
                        <div className="text-lg font-bold text-green-400">{campaign.metrics.roi}%</div>
                        <div className="text-xs text-gray-400">ROI</div>
                      </div>
                    </div>
                  )}

                  {/* Goals */}
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-white mb-2">Goals:</h4>
                    <div className="flex flex-wrap gap-1">
                      {campaign.goals.map((goal, idx) => (
                        <span key={idx} className="px-2 py-1 bg-green-500/20 text-green-300 rounded text-xs">
                          {goal}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex space-x-2">
                    <button className="flex-1 bg-white/10 hover:bg-white/20 text-white px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300">
                      View Details
                    </button>
                    <button className="flex-1 bg-gradient-to-r from-pink-500 to-rose-500 text-white px-3 py-2 rounded-lg text-sm font-medium hover:shadow-lg transition-all duration-300">
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
              <h2 className="text-2xl font-semibold text-white">Content Templates</h2>
              <button className="bg-gradient-to-r from-pink-500 to-rose-500 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg hover:shadow-pink-500/25 transition-all duration-300 flex items-center space-x-2">
                <Plus className="h-5 w-5" />
                <span>Create Template</span>
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {templates.map((template, index) => {
                const TypeIcon = getTypeIcon(template.type);
                
                return (
                  <motion.div
                    key={template.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6"
                  >
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="p-2 bg-gradient-to-r from-pink-500 to-rose-500 rounded-lg">
                        <TypeIcon className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-white">{template.name}</h3>
                        <span className="text-gray-400 text-sm capitalize">{template.type}</span>
                      </div>
                    </div>

                    <p className="text-gray-400 text-sm mb-4">{template.description}</p>

                    <div className="bg-white/5 rounded-lg p-3 mb-4">
                      <code className="text-green-400 text-xs">{template.template.substring(0, 100)}...</code>
                    </div>

                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-white mb-2">Variables:</h4>
                      <div className="flex flex-wrap gap-1">
                        {template.variables.map((variable, idx) => (
                          <span key={idx} className="px-2 py-1 bg-blue-500/20 text-blue-300 rounded text-xs">
                            {variable}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <button className="flex-1 bg-white/10 hover:bg-white/20 text-white px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300">
                        Edit
                      </button>
                      <button className="flex-1 bg-gradient-to-r from-pink-500 to-rose-500 text-white px-3 py-2 rounded-lg text-sm font-medium hover:shadow-lg transition-all duration-300">
                        Use Template
                      </button>
                    </div>
                  </motion.div>
                );
              })}
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
            <h2 className="text-2xl font-semibold text-white">Marketing Analytics</h2>
            
            <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 text-center">
              <BarChart3 className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Advanced Analytics Coming Soon</h3>
              <p className="text-gray-400">
                Comprehensive marketing analytics dashboard with performance metrics, ROI tracking, and audience insights.
              </p>
            </div>
          </motion.div>
        )}

        {/* Content Generator Modal */}
        {showContentGenerator && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowContentGenerator(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-slate-900 border border-white/10 rounded-2xl p-8 max-w-2xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center space-x-3 mb-6">
                <Sparkles className="h-8 w-8 text-pink-400" />
                <div>
                  <h2 className="text-2xl font-bold text-white">AI Content Generator</h2>
                  <p className="text-gray-400">Generate high-quality content with AI</p>
                </div>
              </div>

              {!isGenerating ? (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Content Type</label>
                    <select className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-pink-500">
                      <option value="blog">Blog Post</option>
                      <option value="social">Social Media Post</option>
                      <option value="email">Email Campaign</option>
                      <option value="ad">Advertisement</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Topic/Keywords</label>
                    <input
                      type="text"
                      placeholder="e.g., AI automation, customer service, business efficiency"
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Target Audience</label>
                    <input
                      type="text"
                      placeholder="e.g., B2B decision makers, small business owners"
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Tone</label>
                    <select className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-pink-500">
                      <option value="professional">Professional</option>
                      <option value="casual">Casual</option>
                      <option value="enthusiastic">Enthusiastic</option>
                      <option value="authoritative">Authoritative</option>
                    </select>
                  </div>

                  <div className="flex space-x-4">
                    <button
                      onClick={() => setShowContentGenerator(false)}
                      className="flex-1 bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-lg transition-all duration-300"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleGenerateContent}
                      className="flex-1 bg-gradient-to-r from-pink-500 to-rose-500 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg hover:shadow-pink-500/25 transition-all duration-300 flex items-center justify-center space-x-2"
                    >
                      <Sparkles className="h-5 w-5" />
                      <span>Generate Content</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="animate-spin w-12 h-12 border-4 border-pink-500 border-t-transparent rounded-full mx-auto mb-4"></div>
                  <h3 className="text-xl font-semibold text-white mb-2">Generating Content</h3>
                  <p className="text-gray-400">AI is creating your content. This may take a few moments...</p>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default MarketingEngine;