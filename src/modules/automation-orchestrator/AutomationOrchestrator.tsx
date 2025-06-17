import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Settings, 
  Workflow, 
  GitBranch,
  Play,
  Pause,
  Square,
  Plus,
  Edit,
  Trash2,
  Clock,
  CheckCircle,
  AlertCircle,
  Activity,
  Users,
  Zap,
  Bot,
  MessageSquare,
  Phone,
  Target,
  Database,
  Globe,
  Mail,
  Calendar,
  FileText,
  BarChart3,
  ArrowRight,
  Copy,
  Eye,
  MoreVertical,
  Filter,
  Search,
  TrendingUp,
  Timer,
  RefreshCw,
  AlertTriangle,
  ChevronDown,
  ChevronRight
} from 'lucide-react';

interface WorkflowNode {
  id: string;
  type: 'trigger' | 'action' | 'condition' | 'agent' | 'human';
  name: string;
  description: string;
  config: Record<string, any>;
  position: { x: number; y: number };
  connections: string[];
}

interface Workflow {
  id: string;
  name: string;
  description: string;
  status: 'draft' | 'active' | 'paused' | 'failed';
  category: 'customer-service' | 'sales' | 'marketing' | 'operations';
  createdAt: Date;
  lastRun?: Date;
  nodes: WorkflowNode[];
  metrics: {
    totalRuns: number;
    successRate: number;
    avgExecutionTime: number;
    lastExecution?: Date;
  };
  triggers: {
    webhook?: string;
    schedule?: string;
    event?: string;
  };
}

interface WorkflowExecution {
  id: string;
  workflowId: string;
  status: 'running' | 'completed' | 'failed' | 'cancelled';
  startedAt: Date;
  completedAt?: Date;
  duration?: number;
  steps: Array<{
    nodeId: string;
    status: 'pending' | 'running' | 'completed' | 'failed';
    startedAt?: Date;
    completedAt?: Date;
    output?: any;
    error?: string;
  }>;
}

const AutomationOrchestrator = () => {
  const [workflows, setWorkflows] = useState<Workflow[]>([]);
  const [selectedWorkflow, setSelectedWorkflow] = useState<Workflow | null>(null);
  const [executions, setExecutions] = useState<WorkflowExecution[]>([]);
  const [showWorkflowBuilder, setShowWorkflowBuilder] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedWorkflow, setExpandedWorkflow] = useState<string | null>(null);

  const categories = [
    { id: 'all', label: 'All Workflows', icon: Workflow },
    { id: 'customer-service', label: 'Customer Service', icon: MessageSquare },
    { id: 'sales', label: 'Sales', icon: Target },
    { id: 'marketing', label: 'Marketing', icon: TrendingUp },
    { id: 'operations', label: 'Operations', icon: Settings }
  ];

  const nodeTypes = [
    { type: 'trigger', label: 'Triggers', icon: Zap, color: 'from-blue-500 to-cyan-500' },
    { type: 'agent', label: 'AI Agents', icon: Bot, color: 'from-purple-500 to-pink-500' },
    { type: 'action', label: 'Actions', icon: Settings, color: 'from-green-500 to-emerald-500' },
    { type: 'condition', label: 'Conditions', icon: GitBranch, color: 'from-yellow-500 to-orange-500' },
    { type: 'human', label: 'Human Tasks', icon: Users, color: 'from-red-500 to-pink-500' }
  ];

  const mockWorkflows: Workflow[] = [
    {
      id: 'wf_customer_support',
      name: 'Customer Support Automation',
      description: 'Automated customer inquiry routing and response system',
      status: 'active',
      category: 'customer-service',
      createdAt: new Date(Date.now() - 86400000 * 7),
      lastRun: new Date(Date.now() - 3600000),
      nodes: [
        {
          id: 'trigger_1',
          type: 'trigger',
          name: 'New Support Ticket',
          description: 'Webhook trigger for new support tickets',
          config: { webhook: '/webhook/support-ticket' },
          position: { x: 100, y: 100 },
          connections: ['agent_1']
        },
        {
          id: 'agent_1',
          type: 'agent',
          name: 'Ticket Classifier',
          description: 'AI agent to classify and prioritize tickets',
          config: { model: 'gpt-4', temperature: 0.3 },
          position: { x: 300, y: 100 },
          connections: ['condition_1']
        },
        {
          id: 'condition_1',
          type: 'condition',
          name: 'Priority Check',
          description: 'Route based on ticket priority',
          config: { field: 'priority', operator: 'equals', value: 'high' },
          position: { x: 500, y: 100 },
          connections: ['human_1', 'agent_2']
        },
        {
          id: 'human_1',
          type: 'human',
          name: 'Escalate to Human',
          description: 'Assign high-priority tickets to human agents',
          config: { assignee: 'support-team' },
          position: { x: 700, y: 50 },
          connections: []
        },
        {
          id: 'agent_2',
          type: 'agent',
          name: 'Auto-Responder',
          description: 'AI agent to provide automated responses',
          config: { model: 'gpt-4', temperature: 0.5 },
          position: { x: 700, y: 150 },
          connections: []
        }
      ],
      metrics: {
        totalRuns: 1247,
        successRate: 94.2,
        avgExecutionTime: 2.8,
        lastExecution: new Date(Date.now() - 3600000)
      },
      triggers: {
        webhook: '/webhook/support-ticket',
        event: 'ticket.created'
      }
    },
    {
      id: 'wf_lead_qualification',
      name: 'Lead Qualification Pipeline',
      description: 'Automated lead scoring and qualification workflow',
      status: 'active',
      category: 'sales',
      createdAt: new Date(Date.now() - 86400000 * 14),
      lastRun: new Date(Date.now() - 1800000),
      nodes: [
        {
          id: 'trigger_2',
          type: 'trigger',
          name: 'New Lead',
          description: 'Trigger when new lead is captured',
          config: { webhook: '/webhook/new-lead' },
          position: { x: 100, y: 100 },
          connections: ['agent_3']
        },
        {
          id: 'agent_3',
          type: 'agent',
          name: 'Lead Scorer',
          description: 'AI agent to score lead quality',
          config: { model: 'gpt-4', temperature: 0.2 },
          position: { x: 300, y: 100 },
          connections: ['condition_2']
        },
        {
          id: 'condition_2',
          type: 'condition',
          name: 'Score Threshold',
          description: 'Check if lead score meets threshold',
          config: { field: 'score', operator: 'greater_than', value: 75 },
          position: { x: 500, y: 100 },
          connections: ['action_1', 'action_2']
        },
        {
          id: 'action_1',
          type: 'action',
          name: 'Add to CRM',
          description: 'Add qualified lead to CRM system',
          config: { integration: 'salesforce', action: 'create_lead' },
          position: { x: 700, y: 50 },
          connections: []
        },
        {
          id: 'action_2',
          type: 'action',
          name: 'Nurture Campaign',
          description: 'Add to email nurture sequence',
          config: { integration: 'mailchimp', campaign: 'lead-nurture' },
          position: { x: 700, y: 150 },
          connections: []
        }
      ],
      metrics: {
        totalRuns: 856,
        successRate: 91.7,
        avgExecutionTime: 1.5,
        lastExecution: new Date(Date.now() - 1800000)
      },
      triggers: {
        webhook: '/webhook/new-lead',
        event: 'lead.created'
      }
    },
    {
      id: 'wf_onboarding',
      name: 'User Onboarding Sequence',
      description: 'Automated user onboarding and activation workflow',
      status: 'paused',
      category: 'operations',
      createdAt: new Date(Date.now() - 86400000 * 21),
      lastRun: new Date(Date.now() - 86400000 * 2),
      nodes: [],
      metrics: {
        totalRuns: 423,
        successRate: 87.3,
        avgExecutionTime: 4.2,
        lastExecution: new Date(Date.now() - 86400000 * 2)
      },
      triggers: {
        event: 'user.signup'
      }
    },
    {
      id: 'wf_content_generation',
      name: 'Content Generation Pipeline',
      description: 'Automated content creation and publishing workflow',
      status: 'draft',
      category: 'marketing',
      createdAt: new Date(Date.now() - 86400000 * 3),
      nodes: [],
      metrics: {
        totalRuns: 0,
        successRate: 0,
        avgExecutionTime: 0
      },
      triggers: {
        schedule: '0 9 * * 1' // Every Monday at 9 AM
      }
    }
  ];

  useEffect(() => {
    setWorkflows(mockWorkflows);
  }, []);

  const filteredWorkflows = workflows.filter(workflow => {
    const matchesCategory = selectedCategory === 'all' || workflow.category === selectedCategory;
    const matchesSearch = workflow.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         workflow.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-400 bg-green-500/20';
      case 'paused': return 'text-yellow-400 bg-yellow-500/20';
      case 'failed': return 'text-red-400 bg-red-500/20';
      case 'draft': return 'text-gray-400 bg-gray-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'customer-service': return MessageSquare;
      case 'sales': return Target;
      case 'marketing': return TrendingUp;
      case 'operations': return Settings;
      default: return Workflow;
    }
  };

  const handlePlayWorkflow = (workflowId: string) => {
    setWorkflows(prev => prev.map(w => 
      w.id === workflowId ? { ...w, status: 'active' } : w
    ));
  };

  const handlePauseWorkflow = (workflowId: string) => {
    setWorkflows(prev => prev.map(w => 
      w.id === workflowId ? { ...w, status: 'paused' } : w
    ));
  };

  const handleDeleteWorkflow = (workflowId: string) => {
    setWorkflows(prev => prev.filter(w => w.id !== workflowId));
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
            <Settings className="h-10 w-10 text-orange-400" />
            <span>Automation Orchestrator</span>
          </h1>
          <p className="text-gray-400 text-lg">
            Orchestrate complex workflows and intelligent agent interactions
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
              {workflows.filter(w => w.status === 'active').length}
            </div>
            <div className="text-gray-400 text-sm">Active Workflows</div>
          </div>

          <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <BarChart3 className="h-8 w-8 text-blue-400" />
              <span className="text-blue-400 text-sm font-medium">+156</span>
            </div>
            <div className="text-2xl font-bold text-white mb-1">2,526</div>
            <div className="text-gray-400 text-sm">Total Executions</div>
          </div>

          <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <CheckCircle className="h-8 w-8 text-purple-400" />
              <span className="text-purple-400 text-sm font-medium">+2.1%</span>
            </div>
            <div className="text-2xl font-bold text-white mb-1">91.1%</div>
            <div className="text-gray-400 text-sm">Success Rate</div>
          </div>

          <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <Timer className="h-8 w-8 text-yellow-400" />
              <span className="text-yellow-400 text-sm font-medium">-0.3s</span>
            </div>
            <div className="text-2xl font-bold text-white mb-1">2.4s</div>
            <div className="text-gray-400 text-sm">Avg Execution</div>
          </div>
        </motion.div>

        {/* Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col md:flex-row gap-4 mb-8"
        >
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search workflows..."
              className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
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
                      ? 'bg-orange-500/20 text-orange-300 border border-orange-500/30'
                      : 'bg-white/5 text-gray-300 hover:bg-white/10 border border-white/10'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span className="hidden sm:inline">{category.label}</span>
                </button>
              );
            })}
          </div>

          {/* Create Workflow Button */}
          <button
            onClick={() => setShowWorkflowBuilder(true)}
            className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg hover:shadow-orange-500/25 transition-all duration-300 flex items-center space-x-2"
          >
            <Plus className="h-5 w-5" />
            <span>Create Workflow</span>
          </button>
        </motion.div>

        {/* Workflows List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="space-y-6"
        >
          {filteredWorkflows.map((workflow, index) => {
            const CategoryIcon = getCategoryIcon(workflow.category);
            const isExpanded = expandedWorkflow === workflow.id;
            
            return (
              <motion.div
                key={workflow.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl overflow-hidden"
              >
                {/* Workflow Header */}
                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="p-3 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg">
                        <CategoryIcon className="h-6 w-6 text-white" />
                      </div>
                      
                      <div>
                        <h3 className="text-xl font-semibold text-white">{workflow.name}</h3>
                        <p className="text-gray-400 text-sm">{workflow.description}</p>
                        <div className="flex items-center space-x-4 mt-2">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(workflow.status)}`}>
                            {workflow.status.toUpperCase()}
                          </span>
                          <span className="text-gray-400 text-xs capitalize">{workflow.category.replace('-', ' ')}</span>
                          <span className="text-gray-400 text-xs">
                            Created {workflow.createdAt.toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      {/* Workflow Actions */}
                      {workflow.status === 'draft' && (
                        <button
                          onClick={() => handlePlayWorkflow(workflow.id)}
                          className="bg-green-500/20 text-green-400 border border-green-500/30 px-4 py-2 rounded-lg hover:bg-green-500/30 transition-all duration-300 flex items-center space-x-2"
                        >
                          <Play className="h-4 w-4" />
                          <span>Activate</span>
                        </button>
                      )}

                      {workflow.status === 'active' && (
                        <button
                          onClick={() => handlePauseWorkflow(workflow.id)}
                          className="bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 px-4 py-2 rounded-lg hover:bg-yellow-500/30 transition-all duration-300 flex items-center space-x-2"
                        >
                          <Pause className="h-4 w-4" />
                          <span>Pause</span>
                        </button>
                      )}

                      {workflow.status === 'paused' && (
                        <button
                          onClick={() => handlePlayWorkflow(workflow.id)}
                          className="bg-green-500/20 text-green-400 border border-green-500/30 px-4 py-2 rounded-lg hover:bg-green-500/30 transition-all duration-300 flex items-center space-x-2"
                        >
                          <Play className="h-4 w-4" />
                          <span>Resume</span>
                        </button>
                      )}

                      <button
                        onClick={() => setExpandedWorkflow(isExpanded ? null : workflow.id)}
                        className="text-gray-400 hover:text-white p-2 rounded-lg hover:bg-white/10 transition-all duration-300"
                      >
                        {isExpanded ? <ChevronDown className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
                      </button>
                    </div>
                  </div>

                  {/* Workflow Metrics */}
                  {workflow.status !== 'draft' && (
                    <div className="grid grid-cols-4 gap-4 mt-6">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-white">{workflow.metrics.totalRuns.toLocaleString()}</div>
                        <div className="text-xs text-gray-400">Total Runs</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-400">{workflow.metrics.successRate}%</div>
                        <div className="text-xs text-gray-400">Success Rate</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-400">{workflow.metrics.avgExecutionTime}s</div>
                        <div className="text-xs text-gray-400">Avg Time</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-purple-400">
                          {workflow.lastRun ? workflow.lastRun.toLocaleTimeString() : 'Never'}
                        </div>
                        <div className="text-xs text-gray-400">Last Run</div>
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
                    {/* Workflow Nodes */}
                    {workflow.nodes.length > 0 && (
                      <div>
                        <h4 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
                          <GitBranch className="h-5 w-5" />
                          <span>Workflow Nodes</span>
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {workflow.nodes.map((node, idx) => {
                            const nodeType = nodeTypes.find(nt => nt.type === node.type);
                            const NodeIcon = nodeType?.icon || Settings;
                            
                            return (
                              <div key={node.id} className="bg-white/5 border border-white/10 rounded-lg p-4">
                                <div className="flex items-center space-x-3 mb-2">
                                  <div className={`p-2 bg-gradient-to-r ${nodeType?.color || 'from-gray-500 to-gray-600'} rounded-lg`}>
                                    <NodeIcon className="h-4 w-4 text-white" />
                                  </div>
                                  <div>
                                    <div className="text-white font-medium text-sm">{node.name}</div>
                                    <div className="text-gray-400 text-xs capitalize">{node.type}</div>
                                  </div>
                                </div>
                                <p className="text-gray-400 text-xs">{node.description}</p>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* Triggers */}
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
                        <Zap className="h-5 w-5" />
                        <span>Triggers</span>
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {workflow.triggers.webhook && (
                          <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm flex items-center space-x-1">
                            <Globe className="h-3 w-3" />
                            <span>Webhook</span>
                          </span>
                        )}
                        {workflow.triggers.schedule && (
                          <span className="px-3 py-1 bg-green-500/20 text-green-300 rounded-full text-sm flex items-center space-x-1">
                            <Clock className="h-3 w-3" />
                            <span>Schedule</span>
                          </span>
                        )}
                        {workflow.triggers.event && (
                          <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm flex items-center space-x-1">
                            <Activity className="h-3 w-3" />
                            <span>Event</span>
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex space-x-4">
                      <button className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg transition-all duration-300 flex items-center space-x-2">
                        <Edit className="h-4 w-4" />
                        <span>Edit Workflow</span>
                      </button>
                      <button className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg transition-all duration-300 flex items-center space-x-2">
                        <Activity className="h-4 w-4" />
                        <span>View Logs</span>
                      </button>
                      <button className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg transition-all duration-300 flex items-center space-x-2">
                        <Copy className="h-4 w-4" />
                        <span>Duplicate</span>
                      </button>
                      <button
                        onClick={() => handleDeleteWorkflow(workflow.id)}
                        className="bg-red-500/20 text-red-400 border border-red-500/30 px-4 py-2 rounded-lg hover:bg-red-500/30 transition-all duration-300 flex items-center space-x-2"
                      >
                        <Trash2 className="h-4 w-4" />
                        <span>Delete</span>
                      </button>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </motion.div>

        {/* Empty State */}
        {filteredWorkflows.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-12 text-center"
          >
            <Workflow className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">No Workflows Found</h3>
            <p className="text-gray-400 mb-6">
              {searchTerm || selectedCategory !== 'all' 
                ? 'Try adjusting your search or filter criteria.'
                : 'Create your first workflow to get started with automation.'
              }
            </p>
            <button
              onClick={() => setShowWorkflowBuilder(true)}
              className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg hover:shadow-orange-500/25 transition-all duration-300 flex items-center space-x-2 mx-auto"
            >
              <Plus className="h-5 w-5" />
              <span>Create Your First Workflow</span>
            </button>
          </motion.div>
        )}

        {/* Workflow Builder Modal */}
        {showWorkflowBuilder && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowWorkflowBuilder(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-slate-900 border border-white/10 rounded-2xl p-8 max-w-4xl w-full max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-white mb-2">Workflow Builder</h2>
                  <p className="text-gray-400">Create and configure your automation workflow</p>
                </div>
                <button
                  onClick={() => setShowWorkflowBuilder(false)}
                  className="text-gray-400 hover:text-white"
                >
                  ✕
                </button>
              </div>

              {/* Node Types */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-white mb-4">Available Node Types</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {nodeTypes.map((nodeType) => {
                    const Icon = nodeType.icon;
                    return (
                      <div
                        key={nodeType.type}
                        className="bg-white/5 border border-white/10 rounded-lg p-4 hover:bg-white/10 transition-all duration-300 cursor-pointer"
                      >
                        <div className="flex items-center space-x-3 mb-2">
                          <div className={`p-2 bg-gradient-to-r ${nodeType.color} rounded-lg`}>
                            <Icon className="h-5 w-5 text-white" />
                          </div>
                          <div>
                            <div className="text-white font-medium">{nodeType.label}</div>
                            <div className="text-gray-400 text-sm capitalize">{nodeType.type}</div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Canvas Placeholder */}
              <div className="bg-white/5 border border-white/10 rounded-lg p-8 text-center">
                <GitBranch className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Visual Workflow Builder</h3>
                <p className="text-gray-400 mb-6">
                  Drag and drop nodes to create your workflow. Connect them to define the execution flow.
                </p>
                <div className="text-sm text-gray-500">
                  Full visual workflow builder coming soon...
                </div>
              </div>

              {/* Actions */}
              <div className="flex justify-end space-x-4 mt-8">
                <button
                  onClick={() => setShowWorkflowBuilder(false)}
                  className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-lg transition-all duration-300"
                >
                  Cancel
                </button>
                <button className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg hover:shadow-orange-500/25 transition-all duration-300">
                  Create Workflow
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default AutomationOrchestrator;