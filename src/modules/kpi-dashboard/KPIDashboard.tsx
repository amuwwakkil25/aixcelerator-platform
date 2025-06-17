import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown,
  Activity, 
  Users, 
  DollarSign,
  Zap,
  Bot,
  MessageSquare,
  Phone,
  Target,
  Clock,
  CheckCircle,
  AlertCircle,
  Eye,
  MousePointer,
  Heart,
  Share2,
  Download,
  Filter,
  Calendar,
  RefreshCw,
  ArrowUp,
  ArrowDown,
  Minus,
  PieChart,
  LineChart,
  BarChart,
  Globe,
  Mail,
  Linkedin,
  Twitter,
  Facebook,
  Youtube,
  Settings,
  Bell,
  Search,
  ExternalLink,
  ChevronDown,
  ChevronRight,
  Info,
  AlertTriangle,
  Sparkles,
  Timer,
  Gauge,
  Layers,
  Database,
  Server,
  Wifi,
  Shield,
  Cpu,
  HardDrive,
  Network,
  MonitorSpeaker
} from 'lucide-react';

interface MetricCard {
  id: string;
  title: string;
  value: string | number;
  change: number;
  changeType: 'increase' | 'decrease' | 'neutral';
  icon: any;
  color: string;
  description: string;
  target?: number;
  unit?: string;
}

interface ChartData {
  name: string;
  value: number;
  change?: number;
  color?: string;
}

interface Agent {
  id: string;
  name: string;
  type: 'voice' | 'chat' | 'task' | 'workflow';
  status: 'active' | 'paused' | 'error';
  metrics: {
    interactions: number;
    successRate: number;
    avgResponseTime: number;
    uptime: number;
    revenue: number;
    costSavings: number;
  };
  performance: ChartData[];
}

interface Campaign {
  id: string;
  name: string;
  type: 'email' | 'social' | 'content' | 'outreach';
  status: 'active' | 'paused' | 'completed';
  metrics: {
    reach: number;
    engagement: number;
    conversions: number;
    roi: number;
    clicks: number;
    impressions: number;
  };
}

interface Alert {
  id: string;
  type: 'success' | 'warning' | 'error' | 'info';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
}

const KPIDashboard = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState<'24h' | '7d' | '30d' | '90d'>('7d');
  const [selectedTab, setSelectedTab] = useState<'overview' | 'agents' | 'campaigns' | 'revenue' | 'performance'>('overview');
  const [agents, setAgents] = useState<Agent[]>([]);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [expandedAgent, setExpandedAgent] = useState<string | null>(null);
  const [showAlerts, setShowAlerts] = useState(false);

  const timeframes = [
    { id: '24h', label: '24 Hours' },
    { id: '7d', label: '7 Days' },
    { id: '30d', label: '30 Days' },
    { id: '90d', label: '90 Days' }
  ];

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'agents', label: 'AI Agents', icon: Bot },
    { id: 'campaigns', label: 'Campaigns', icon: Target },
    { id: 'revenue', label: 'Revenue', icon: DollarSign },
    { id: 'performance', label: 'Performance', icon: Activity }
  ];

  const overviewMetrics: MetricCard[] = [
    {
      id: 'total_revenue',
      title: 'Total Revenue',
      value: '$847K',
      change: 23.5,
      changeType: 'increase',
      icon: DollarSign,
      color: 'text-green-400',
      description: 'Revenue generated through AI automation',
      target: 1000000,
      unit: '$'
    },
    {
      id: 'active_agents',
      title: 'Active Agents',
      value: 24,
      change: 12.0,
      changeType: 'increase',
      icon: Bot,
      color: 'text-blue-400',
      description: 'Currently deployed and active AI agents'
    },
    {
      id: 'automation_rate',
      title: 'Automation Rate',
      value: '94.2%',
      change: 5.8,
      changeType: 'increase',
      icon: Zap,
      color: 'text-purple-400',
      description: 'Percentage of tasks automated vs manual',
      target: 95,
      unit: '%'
    },
    {
      id: 'cost_savings',
      title: 'Cost Savings',
      value: '$234K',
      change: 18.3,
      changeType: 'increase',
      icon: TrendingDown,
      color: 'text-yellow-400',
      description: 'Monthly cost savings from automation',
      unit: '$'
    },
    {
      id: 'user_interactions',
      title: 'User Interactions',
      value: '156K',
      change: 31.2,
      changeType: 'increase',
      icon: Users,
      color: 'text-pink-400',
      description: 'Total interactions across all agents'
    },
    {
      id: 'success_rate',
      title: 'Success Rate',
      value: '91.7%',
      change: 2.4,
      changeType: 'increase',
      icon: CheckCircle,
      color: 'text-emerald-400',
      description: 'Overall success rate of AI operations',
      target: 95,
      unit: '%'
    },
    {
      id: 'response_time',
      title: 'Avg Response Time',
      value: '1.8s',
      change: -12.5,
      changeType: 'increase',
      icon: Clock,
      color: 'text-cyan-400',
      description: 'Average response time across all agents',
      unit: 's'
    },
    {
      id: 'uptime',
      title: 'System Uptime',
      value: '99.9%',
      change: 0.1,
      changeType: 'increase',
      icon: Activity,
      color: 'text-orange-400',
      description: 'Overall system availability',
      target: 99.9,
      unit: '%'
    }
  ];

  const mockAgents: Agent[] = [
    {
      id: 'agent_cs_chatbot',
      name: 'Customer Support Chatbot',
      type: 'chat',
      status: 'active',
      metrics: {
        interactions: 45678,
        successRate: 94.2,
        avgResponseTime: 1.2,
        uptime: 99.8,
        revenue: 234000,
        costSavings: 156000
      },
      performance: [
        { name: 'Mon', value: 4200 },
        { name: 'Tue', value: 4800 },
        { name: 'Wed', value: 5200 },
        { name: 'Thu', value: 4900 },
        { name: 'Fri', value: 5600 },
        { name: 'Sat', value: 3800 },
        { name: 'Sun', value: 4100 }
      ]
    },
    {
      id: 'agent_voice_sales',
      name: 'Voice Sales Qualifier',
      type: 'voice',
      status: 'active',
      metrics: {
        interactions: 12456,
        successRate: 87.5,
        avgResponseTime: 2.8,
        uptime: 98.9,
        revenue: 189000,
        costSavings: 78000
      },
      performance: [
        { name: 'Mon', value: 1200 },
        { name: 'Tue', value: 1450 },
        { name: 'Wed', value: 1680 },
        { name: 'Thu', value: 1520 },
        { name: 'Fri', value: 1890 },
        { name: 'Sat', value: 980 },
        { name: 'Sun', value: 1100 }
      ]
    },
    {
      id: 'agent_task_processor',
      name: 'Document Processing Agent',
      type: 'task',
      status: 'active',
      metrics: {
        interactions: 8934,
        successRate: 96.8,
        avgResponseTime: 0.9,
        uptime: 99.9,
        revenue: 145000,
        costSavings: 234000
      },
      performance: [
        { name: 'Mon', value: 890 },
        { name: 'Tue', value: 1020 },
        { name: 'Wed', value: 1150 },
        { name: 'Thu', value: 980 },
        { name: 'Fri', value: 1280 },
        { name: 'Sat', value: 760 },
        { name: 'Sun', value: 820 }
      ]
    },
    {
      id: 'agent_workflow_onboarding',
      name: 'User Onboarding Assistant',
      type: 'workflow',
      status: 'paused',
      metrics: {
        interactions: 5678,
        successRate: 89.3,
        avgResponseTime: 3.2,
        uptime: 95.2,
        revenue: 98000,
        costSavings: 67000
      },
      performance: [
        { name: 'Mon', value: 560 },
        { name: 'Tue', value: 620 },
        { name: 'Wed', value: 580 },
        { name: 'Thu', value: 0 },
        { name: 'Fri', value: 0 },
        { name: 'Sat', value: 0 },
        { name: 'Sun', value: 0 }
      ]
    }
  ];

  const mockCampaigns: Campaign[] = [
    {
      id: 'campaign_ai_awareness',
      name: 'AI Agent Awareness Campaign',
      type: 'content',
      status: 'active',
      metrics: {
        reach: 125000,
        engagement: 8900,
        conversions: 456,
        roi: 340,
        clicks: 12400,
        impressions: 245000
      }
    },
    {
      id: 'campaign_lead_gen',
      name: 'B2B Lead Generation',
      type: 'outreach',
      status: 'active',
      metrics: {
        reach: 45000,
        engagement: 3200,
        conversions: 189,
        roi: 280,
        clicks: 5600,
        impressions: 89000
      }
    },
    {
      id: 'campaign_social_media',
      name: 'Social Media Automation',
      type: 'social',
      status: 'active',
      metrics: {
        reach: 89000,
        engagement: 6700,
        conversions: 234,
        roi: 195,
        clicks: 8900,
        impressions: 156000
      }
    }
  ];

  const mockAlerts: Alert[] = [
    {
      id: 'alert_1',
      type: 'warning',
      title: 'High Response Time',
      message: 'Voice Sales Qualifier response time increased by 15% in the last hour',
      timestamp: new Date(Date.now() - 3600000),
      read: false
    },
    {
      id: 'alert_2',
      type: 'success',
      title: 'ROI Target Achieved',
      message: 'AI Agent Awareness Campaign exceeded ROI target by 40%',
      timestamp: new Date(Date.now() - 7200000),
      read: false
    },
    {
      id: 'alert_3',
      type: 'error',
      title: 'Agent Offline',
      message: 'User Onboarding Assistant has been offline for 2 hours',
      timestamp: new Date(Date.now() - 7200000),
      read: true
    },
    {
      id: 'alert_4',
      type: 'info',
      title: 'Weekly Report Ready',
      message: 'Your weekly performance report is ready for download',
      timestamp: new Date(Date.now() - 86400000),
      read: true
    }
  ];

  useEffect(() => {
    setAgents(mockAgents);
    setCampaigns(mockCampaigns);
    setAlerts(mockAlerts);
  }, []);

  const getChangeIcon = (changeType: string) => {
    switch (changeType) {
      case 'increase': return ArrowUp;
      case 'decrease': return ArrowDown;
      default: return Minus;
    }
  };

  const getChangeColor = (changeType: string) => {
    switch (changeType) {
      case 'increase': return 'text-green-400';
      case 'decrease': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-400 bg-green-500/20';
      case 'paused': return 'text-yellow-400 bg-yellow-500/20';
      case 'error': return 'text-red-400 bg-red-500/20';
      case 'completed': return 'text-blue-400 bg-blue-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'chat': return MessageSquare;
      case 'voice': return Phone;
      case 'task': return Settings;
      case 'workflow': return Target;
      case 'email': return Mail;
      case 'social': return Share2;
      case 'content': return PieChart;
      case 'outreach': return Users;
      default: return Bot;
    }
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'success': return CheckCircle;
      case 'warning': return AlertTriangle;
      case 'error': return AlertCircle;
      case 'info': return Info;
      default: return Bell;
    }
  };

  const getAlertColor = (type: string) => {
    switch (type) {
      case 'success': return 'text-green-400 bg-green-500/20 border-green-500/30';
      case 'warning': return 'text-yellow-400 bg-yellow-500/20 border-yellow-500/30';
      case 'error': return 'text-red-400 bg-red-500/20 border-red-500/30';
      case 'info': return 'text-blue-400 bg-blue-500/20 border-blue-500/30';
      default: return 'text-gray-400 bg-gray-500/20 border-gray-500/30';
    }
  };

  const refreshData = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsLoading(false);
  };

  const unreadAlerts = alerts.filter(alert => !alert.read).length;

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
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2 flex items-center space-x-3">
                <BarChart3 className="h-10 w-10 text-yellow-400" />
                <span>KPI Dashboard</span>
              </h1>
              <p className="text-gray-400 text-lg">
                Real-time analytics and performance insights for your AI ecosystem
              </p>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Alerts */}
              <div className="relative">
                <button
                  onClick={() => setShowAlerts(!showAlerts)}
                  className="relative p-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg transition-all duration-300"
                >
                  <Bell className="h-5 w-5 text-gray-300" />
                  {unreadAlerts > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {unreadAlerts}
                    </span>
                  )}
                </button>

                {/* Alerts Dropdown */}
                {showAlerts && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute right-0 top-full mt-2 w-80 bg-slate-900 border border-white/10 rounded-xl shadow-2xl z-50"
                  >
                    <div className="p-4 border-b border-white/10">
                      <h3 className="text-lg font-semibold text-white">Notifications</h3>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      {alerts.slice(0, 5).map((alert) => {
                        const AlertIcon = getAlertIcon(alert.type);
                        return (
                          <div
                            key={alert.id}
                            className={`p-4 border-b border-white/5 hover:bg-white/5 transition-all duration-300 ${
                              !alert.read ? 'bg-white/5' : ''
                            }`}
                          >
                            <div className="flex items-start space-x-3">
                              <div className={`p-2 rounded-lg border ${getAlertColor(alert.type)}`}>
                                <AlertIcon className="h-4 w-4" />
                              </div>
                              <div className="flex-1">
                                <h4 className="text-white font-medium text-sm">{alert.title}</h4>
                                <p className="text-gray-400 text-xs mt-1">{alert.message}</p>
                                <span className="text-gray-500 text-xs">
                                  {alert.timestamp.toLocaleTimeString()}
                                </span>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    <div className="p-4 border-t border-white/10">
                      <button className="w-full text-center text-blue-400 hover:text-blue-300 text-sm">
                        View All Notifications
                      </button>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Refresh Button */}
              <button
                onClick={refreshData}
                disabled={isLoading}
                className="p-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg transition-all duration-300 disabled:opacity-50"
              >
                <RefreshCw className={`h-5 w-5 text-gray-300 ${isLoading ? 'animate-spin' : ''}`} />
              </button>

              {/* Export Button */}
              <button className="px-4 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-lg font-medium hover:shadow-lg hover:shadow-yellow-500/25 transition-all duration-300 flex items-center space-x-2">
                <Download className="h-4 w-4" />
                <span>Export</span>
              </button>
            </div>
          </div>
        </motion.div>

        {/* Timeframe Selector */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex space-x-2 mb-8 bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-2"
        >
          {timeframes.map((timeframe) => (
            <button
              key={timeframe.id}
              onClick={() => setSelectedTimeframe(timeframe.id as any)}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                selectedTimeframe === timeframe.id
                  ? 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30'
                  : 'text-gray-300 hover:text-white hover:bg-white/10'
              }`}
            >
              {timeframe.label}
            </button>
          ))}
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
                    ? 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30'
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`}
              >
                <Icon className="h-5 w-5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </motion.div>

        {/* Overview Tab */}
        {selectedTab === 'overview' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            {/* Key Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {overviewMetrics.map((metric, index) => {
                const Icon = metric.icon;
                const ChangeIcon = getChangeIcon(metric.changeType);
                
                return (
                  <motion.div
                    key={metric.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-300"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <Icon className={`h-8 w-8 ${metric.color}`} />
                      <div className={`flex items-center space-x-1 ${getChangeColor(metric.changeType)}`}>
                        <ChangeIcon className="h-4 w-4" />
                        <span className="text-sm font-medium">{Math.abs(metric.change)}%</span>
                      </div>
                    </div>
                    
                    <div className="text-2xl font-bold text-white mb-1">{metric.value}</div>
                    <div className="text-gray-400 text-sm mb-3">{metric.title}</div>
                    
                    {metric.target && (
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full bg-gradient-to-r ${metric.color.includes('green') ? 'from-green-500 to-emerald-500' : 'from-yellow-500 to-orange-500'}`}
                          style={{ width: `${(parseFloat(metric.value.toString().replace(/[^0-9.]/g, '')) / metric.target) * 100}%` }}
                        />
                      </div>
                    )}
                    
                    <p className="text-gray-500 text-xs mt-2">{metric.description}</p>
                  </motion.div>
                );
              })}
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Revenue Chart */}
              <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold text-white">Revenue Trend</h3>
                  <div className="flex items-center space-x-2 text-green-400">
                    <TrendingUp className="h-5 w-5" />
                    <span className="text-sm font-medium">+23.5%</span>
                  </div>
                </div>
                
                <div className="h-64 flex items-end justify-between space-x-2">
                  {[120, 145, 132, 178, 195, 234, 267].map((value, index) => (
                    <div key={index} className="flex-1 flex flex-col items-center">
                      <div 
                        className="w-full bg-gradient-to-t from-green-500 to-emerald-400 rounded-t"
                        style={{ height: `${(value / 300) * 100}%` }}
                      />
                      <span className="text-xs text-gray-400 mt-2">
                        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][index]}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Agent Performance */}
              <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold text-white">Agent Performance</h3>
                  <div className="flex items-center space-x-2 text-blue-400">
                    <Activity className="h-5 w-5" />
                    <span className="text-sm font-medium">94.2% Avg</span>
                  </div>
                </div>
                
                <div className="space-y-4">
                  {agents.slice(0, 4).map((agent) => {
                    const TypeIcon = getTypeIcon(agent.type);
                    return (
                      <div key={agent.id} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg">
                            <TypeIcon className="h-4 w-4 text-white" />
                          </div>
                          <div>
                            <div className="text-white font-medium text-sm">{agent.name}</div>
                            <div className="text-gray-400 text-xs capitalize">{agent.type}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-white font-semibold">{agent.metrics.successRate}%</div>
                          <div className="w-16 bg-gray-700 rounded-full h-1 mt-1">
                            <div 
                              className="h-1 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500"
                              style={{ width: `${agent.metrics.successRate}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* System Health */}
            <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6">
              <h3 className="text-xl font-semibold text-white mb-6">System Health</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center">
                  <Cpu className="h-8 w-8 text-blue-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">23%</div>
                  <div className="text-gray-400 text-sm">CPU Usage</div>
                  <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
                    <div className="w-1/4 h-2 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500" />
                  </div>
                </div>
                
                <div className="text-center">
                  <HardDrive className="h-8 w-8 text-green-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">67%</div>
                  <div className="text-gray-400 text-sm">Memory</div>
                  <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
                    <div className="w-2/3 h-2 rounded-full bg-gradient-to-r from-green-500 to-emerald-500" />
                  </div>
                </div>
                
                <div className="text-center">
                  <Network className="h-8 w-8 text-purple-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">1.2GB</div>
                  <div className="text-gray-400 text-sm">Network I/O</div>
                  <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
                    <div className="w-1/3 h-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500" />
                  </div>
                </div>
                
                <div className="text-center">
                  <Database className="h-8 w-8 text-yellow-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">45%</div>
                  <div className="text-gray-400 text-sm">Storage</div>
                  <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
                    <div className="w-1/2 h-2 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Agents Tab */}
        {selectedTab === 'agents' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
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
                        <div className="p-3 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg">
                          <TypeIcon className="h-6 w-6 text-white" />
                        </div>
                        
                        <div>
                          <h3 className="text-xl font-semibold text-white">{agent.name}</h3>
                          <div className="flex items-center space-x-4 mt-1">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(agent.status)}`}>
                              {agent.status.toUpperCase()}
                            </span>
                            <span className="text-gray-400 text-sm capitalize">{agent.type} Agent</span>
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={() => setExpandedAgent(isExpanded ? null : agent.id)}
                        className="text-gray-400 hover:text-white p-2 rounded-lg hover:bg-white/10 transition-all duration-300"
                      >
                        {isExpanded ? <ChevronDown className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
                      </button>
                    </div>

                    {/* Agent Metrics */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                      <div className="text-center bg-white/5 rounded-lg p-4">
                        <div className="text-2xl font-bold text-white">{agent.metrics.interactions.toLocaleString()}</div>
                        <div className="text-xs text-gray-400">Interactions</div>
                      </div>
                      <div className="text-center bg-white/5 rounded-lg p-4">
                        <div className="text-2xl font-bold text-green-400">{agent.metrics.successRate}%</div>
                        <div className="text-xs text-gray-400">Success Rate</div>
                      </div>
                      <div className="text-center bg-white/5 rounded-lg p-4">
                        <div className="text-2xl font-bold text-blue-400">{agent.metrics.avgResponseTime}s</div>
                        <div className="text-xs text-gray-400">Avg Response</div>
                      </div>
                      <div className="text-center bg-white/5 rounded-lg p-4">
                        <div className="text-2xl font-bold text-purple-400">{agent.metrics.uptime}%</div>
                        <div className="text-xs text-gray-400">Uptime</div>
                      </div>
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
                      {/* Performance Chart */}
                      <div>
                        <h4 className="text-lg font-semibold text-white mb-4">Weekly Performance</h4>
                        <div className="h-32 flex items-end justify-between space-x-2">
                          {agent.performance.map((data, idx) => (
                            <div key={idx} className="flex-1 flex flex-col items-center">
                              <div 
                                className="w-full bg-gradient-to-t from-yellow-500 to-orange-400 rounded-t"
                                style={{ height: `${(data.value / Math.max(...agent.performance.map(p => p.value))) * 100}%` }}
                              />
                              <span className="text-xs text-gray-400 mt-2">{data.name}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Revenue Impact */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-white/5 rounded-lg p-4">
                          <h5 className="text-white font-medium mb-2">Revenue Generated</h5>
                          <div className="text-2xl font-bold text-green-400">${agent.metrics.revenue.toLocaleString()}</div>
                          <p className="text-gray-400 text-sm">This month</p>
                        </div>
                        <div className="bg-white/5 rounded-lg p-4">
                          <h5 className="text-white font-medium mb-2">Cost Savings</h5>
                          <div className="text-2xl font-bold text-blue-400">${agent.metrics.costSavings.toLocaleString()}</div>
                          <p className="text-gray-400 text-sm">This month</p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
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
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {campaigns.map((campaign, index) => {
                const TypeIcon = getTypeIcon(campaign.type);
                
                return (
                  <motion.div
                    key={campaign.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg">
                          <TypeIcon className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-white">{campaign.name}</h3>
                          <span className="text-gray-400 text-sm capitalize">{campaign.type}</span>
                        </div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(campaign.status)}`}>
                        {campaign.status.toUpperCase()}
                      </span>
                    </div>

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

                    <div className="grid grid-cols-3 gap-2 text-center">
                      <div>
                        <div className="text-sm font-semibold text-blue-400">{campaign.metrics.engagement.toLocaleString()}</div>
                        <div className="text-xs text-gray-400">Engagement</div>
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-purple-400">{campaign.metrics.conversions}</div>
                        <div className="text-xs text-gray-400">Conversions</div>
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-pink-400">{campaign.metrics.clicks.toLocaleString()}</div>
                        <div className="text-xs text-gray-400">Clicks</div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* Revenue Tab */}
        {selectedTab === 'revenue' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            {/* Revenue Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <DollarSign className="h-8 w-8 text-green-400" />
                  <div>
                    <h3 className="text-lg font-semibold text-white">Total Revenue</h3>
                    <p className="text-gray-400 text-sm">This month</p>
                  </div>
                </div>
                <div className="text-3xl font-bold text-white mb-2">$847,234</div>
                <div className="flex items-center space-x-2 text-green-400">
                  <TrendingUp className="h-4 w-4" />
                  <span className="text-sm font-medium">+23.5% from last month</span>
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <TrendingDown className="h-8 w-8 text-blue-400" />
                  <div>
                    <h3 className="text-lg font-semibold text-white">Cost Savings</h3>
                    <p className="text-gray-400 text-sm">This month</p>
                  </div>
                </div>
                <div className="text-3xl font-bold text-white mb-2">$234,567</div>
                <div className="flex items-center space-x-2 text-blue-400">
                  <TrendingUp className="h-4 w-4" />
                  <span className="text-sm font-medium">+18.3% from last month</span>
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <BarChart3 className="h-8 w-8 text-purple-400" />
                  <div>
                    <h3 className="text-lg font-semibold text-white">Net ROI</h3>
                    <p className="text-gray-400 text-sm">Overall</p>
                  </div>
                </div>
                <div className="text-3xl font-bold text-white mb-2">340%</div>
                <div className="flex items-center space-x-2 text-purple-400">
                  <TrendingUp className="h-4 w-4" />
                  <span className="text-sm font-medium">+45% from last quarter</span>
                </div>
              </div>
            </div>

            {/* Revenue by Agent */}
            <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6">
              <h3 className="text-xl font-semibold text-white mb-6">Revenue by Agent</h3>
              <div className="space-y-4">
                {agents.map((agent) => {
                  const TypeIcon = getTypeIcon(agent.type);
                  const revenuePercentage = (agent.metrics.revenue / 847234) * 100;
                  
                  return (
                    <div key={agent.id} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg">
                          <TypeIcon className="h-4 w-4 text-white" />
                        </div>
                        <div>
                          <div className="text-white font-medium">{agent.name}</div>
                          <div className="text-gray-400 text-sm">{revenuePercentage.toFixed(1)}% of total</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-white font-semibold">${agent.metrics.revenue.toLocaleString()}</div>
                        <div className="w-24 bg-gray-700 rounded-full h-2 mt-1">
                          <div 
                            className="h-2 rounded-full bg-gradient-to-r from-green-500 to-emerald-500"
                            style={{ width: `${revenuePercentage}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}

        {/* Performance Tab */}
        {selectedTab === 'performance' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            {/* Performance Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <Activity className="h-8 w-8 text-blue-400" />
                  <span className="text-blue-400 text-sm font-medium">+5.2%</span>
                </div>
                <div className="text-2xl font-bold text-white mb-1">91.7%</div>
                <div className="text-gray-400 text-sm">Overall Success Rate</div>
              </div>

              <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <Clock className="h-8 w-8 text-green-400" />
                  <span className="text-green-400 text-sm font-medium">-12%</span>
                </div>
                <div className="text-2xl font-bold text-white mb-1">1.8s</div>
                <div className="text-gray-400 text-sm">Avg Response Time</div>
              </div>

              <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <Wifi className="h-8 w-8 text-purple-400" />
                  <span className="text-purple-400 text-sm font-medium">+0.1%</span>
                </div>
                <div className="text-2xl font-bold text-white mb-1">99.9%</div>
                <div className="text-gray-400 text-sm">System Uptime</div>
              </div>

              <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <Users className="h-8 w-8 text-yellow-400" />
                  <span className="text-yellow-400 text-sm font-medium">+31%</span>
                </div>
                <div className="text-2xl font-bold text-white mb-1">156K</div>
                <div className="text-gray-400 text-sm">Total Interactions</div>
              </div>
            </div>

            {/* Performance Trends */}
            <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6">
              <h3 className="text-xl font-semibold text-white mb-6">Performance Trends</h3>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Success Rate Trend */}
                <div>
                  <h4 className="text-lg font-medium text-white mb-4">Success Rate Trend</h4>
                  <div className="h-48 flex items-end justify-between space-x-2">
                    {[89, 91, 88, 93, 95, 92, 94].map((value, index) => (
                      <div key={index} className="flex-1 flex flex-col items-center">
                        <div 
                          className="w-full bg-gradient-to-t from-green-500 to-emerald-400 rounded-t"
                          style={{ height: `${(value / 100) * 100}%` }}
                        />
                        <span className="text-xs text-gray-400 mt-2">
                          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][index]}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Response Time Trend */}
                <div>
                  <h4 className="text-lg font-medium text-white mb-4">Response Time Trend</h4>
                  <div className="h-48 flex items-end justify-between space-x-2">
                    {[2.1, 1.9, 2.3, 1.7, 1.5, 1.8, 1.6].map((value, index) => (
                      <div key={index} className="flex-1 flex flex-col items-center">
                        <div 
                          className="w-full bg-gradient-to-t from-blue-500 to-cyan-400 rounded-t"
                          style={{ height: `${((3 - value) / 3) * 100}%` }}
                        />
                        <span className="text-xs text-gray-400 mt-2">
                          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][index]}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Agent Performance Comparison */}
            <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6">
              <h3 className="text-xl font-semibold text-white mb-6">Agent Performance Comparison</h3>
              
              <div className="space-y-6">
                {agents.map((agent) => {
                  const TypeIcon = getTypeIcon(agent.type);
                  
                  return (
                    <div key={agent.id} className="bg-white/5 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg">
                            <TypeIcon className="h-4 w-4 text-white" />
                          </div>
                          <div>
                            <div className="text-white font-medium">{agent.name}</div>
                            <div className="text-gray-400 text-sm capitalize">{agent.type}</div>
                          </div>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(agent.status)}`}>
                          {agent.status.toUpperCase()}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-4 gap-4">
                        <div className="text-center">
                          <div className="text-lg font-bold text-white">{agent.metrics.successRate}%</div>
                          <div className="text-xs text-gray-400">Success Rate</div>
                          <div className="w-full bg-gray-700 rounded-full h-1 mt-1">
                            <div 
                              className="h-1 rounded-full bg-gradient-to-r from-green-500 to-emerald-500"
                              style={{ width: `${agent.metrics.successRate}%` }}
                            />
                          </div>
                        </div>
                        
                        <div className="text-center">
                          <div className="text-lg font-bold text-white">{agent.metrics.avgResponseTime}s</div>
                          <div className="text-xs text-gray-400">Response Time</div>
                          <div className="w-full bg-gray-700 rounded-full h-1 mt-1">
                            <div 
                              className="h-1 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500"
                              style={{ width: `${((5 - agent.metrics.avgResponseTime) / 5) * 100}%` }}
                            />
                          </div>
                        </div>
                        
                        <div className="text-center">
                          <div className="text-lg font-bold text-white">{agent.metrics.uptime}%</div>
                          <div className="text-xs text-gray-400">Uptime</div>
                          <div className="w-full bg-gray-700 rounded-full h-1 mt-1">
                            <div 
                              className="h-1 rounded-full bg-gradient-to-r from-purple-500 to-pink-500"
                              style={{ width: `${agent.metrics.uptime}%` }}
                            />
                          </div>
                        </div>
                        
                        <div className="text-center">
                          <div className="text-lg font-bold text-white">{agent.metrics.interactions.toLocaleString()}</div>
                          <div className="text-xs text-gray-400">Interactions</div>
                          <div className="w-full bg-gray-700 rounded-full h-1 mt-1">
                            <div 
                              className="h-1 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500"
                              style={{ width: `${(agent.metrics.interactions / 50000) * 100}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default KPIDashboard;