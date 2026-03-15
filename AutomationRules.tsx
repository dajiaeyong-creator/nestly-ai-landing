/*
 * Automation Rules Page
 * Manage automated operational workflows for rent, maintenance, eviction, and lease management
 */

import { motion } from "framer-motion";
import { Zap, Clock, AlertCircle, CheckCircle, ToggleRight, Plus, Sparkles, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const automationCategories = [
  {
    id: "rent",
    name: "Rent Automation",
    icon: "💰",
    color: "from-green-500 to-green-600",
    rules: [
      {
        id: "rent-1",
        name: "Rent Reminder Schedule",
        trigger: "5 days before rent due",
        action: "Send email reminder to tenant",
        status: "active",
        lastTriggered: "2 days ago",
      },
      {
        id: "rent-2",
        name: "Late Fee Automation",
        trigger: "Rent payment overdue by 3 days",
        action: "Apply $50 late fee",
        status: "active",
        lastTriggered: "1 day ago",
      },
      {
        id: "rent-3",
        name: "Payment Escalation",
        trigger: "Rent overdue by 7 days",
        action: "Send formal notice and increase late fee to $100",
        status: "inactive",
        lastTriggered: "Never",
      },
    ],
  },
  {
    id: "maintenance",
    name: "Maintenance Automation",
    icon: "🔧",
    color: "from-blue-500 to-blue-600",
    rules: [
      {
        id: "maint-1",
        name: "Auto Assign Vendors",
        trigger: "Maintenance request submitted",
        action: "Automatically assign preferred vendor based on issue type",
        status: "active",
        lastTriggered: "2 hours ago",
      },
      {
        id: "maint-2",
        name: "Tenant Notification",
        trigger: "Vendor assigned to maintenance request",
        action: "Notify tenant with vendor contact info and ETA",
        status: "active",
        lastTriggered: "2 hours ago",
      },
      {
        id: "maint-3",
        name: "Repair Timeline Tracking",
        trigger: "Work in progress for 48+ hours",
        action: "Send alert if repair exceeds estimated completion time",
        status: "active",
        lastTriggered: "6 hours ago",
      },
    ],
  },
  {
    id: "eviction",
    name: "Eviction Workflow Automation",
    icon: "⚖️",
    color: "from-red-500 to-red-600",
    rules: [
      {
        id: "evict-1",
        name: "Overdue Rent Detection",
        trigger: "Rent overdue by 30 days",
        action: "Flag tenant for eviction review",
        status: "active",
        lastTriggered: "Never",
      },
      {
        id: "evict-2",
        name: "Generate Eviction Notice",
        trigger: "Eviction approved by owner",
        action: "Generate and send formal eviction notice",
        status: "inactive",
        lastTriggered: "Never",
      },
      {
        id: "evict-3",
        name: "Legal Filing Tracker",
        trigger: "Eviction notice sent",
        action: "Create task for legal filing and track court dates",
        status: "inactive",
        lastTriggered: "Never",
      },
    ],
  },
  {
    id: "lease",
    name: "Lease Automation",
    icon: "📋",
    color: "from-purple-500 to-purple-600",
    rules: [
      {
        id: "lease-1",
        name: "Lease Expiration Reminder",
        trigger: "90 days before lease expires",
        action: "Send reminder to owner and tenant",
        status: "active",
        lastTriggered: "3 days ago",
      },
      {
        id: "lease-2",
        name: "Renewal Offer",
        trigger: "Lease expiration reminder sent",
        action: "Generate renewal offer with updated terms",
        status: "active",
        lastTriggered: "3 days ago",
      },
      {
        id: "lease-3",
        name: "Auto-Renewal",
        trigger: "Lease expires and no response from tenant",
        action: "Send final renewal notice or prepare for tenant departure",
        status: "inactive",
        lastTriggered: "Never",
      },
    ],
  },
];

const aiRecommendations = [
  {
    id: "rec-1",
    title: "Enable Automatic Late Fee Enforcement",
    description: "Downtown Apartment Unit 4B has 3 late payments in the last 6 months. Enabling automatic late fees could improve payment compliance.",
    category: "Rent Automation",
    confidence: 92,
    impact: "Potential revenue increase of $150/month",
  },
  {
    id: "rec-2",
    title: "Assign Preferred HVAC Vendor Automatically",
    description: "Climate Control has completed 8 HVAC repairs with 100% satisfaction rating. Auto-assigning them for HVAC requests could reduce response time by 40%.",
    category: "Maintenance Automation",
    confidence: 88,
    impact: "Reduce average repair time by 2 days",
  },
  {
    id: "rec-3",
    title: "Enable Lease Expiration Escalation",
    description: "3 leases expiring in 60 days. Enable automatic escalation workflow to ensure timely renewal offers.",
    category: "Lease Automation",
    confidence: 95,
    impact: "Prevent tenant turnover and vacancy",
  },
];

export default function AutomationRules() {
  const [categories, setCategories] = useState(automationCategories);
  const [expandedCategory, setExpandedCategory] = useState<string | null>("rent");
  const [showAIPanel, setShowAIPanel] = useState(true);
  const [recommendations, setRecommendations] = useState(aiRecommendations);

  const toggleRuleStatus = (categoryId: string, ruleId: string) => {
    setCategories(
      categories.map((cat) =>
        cat.id === categoryId
          ? {
              ...cat,
              rules: cat.rules.map((rule) =>
                rule.id === ruleId ? { ...rule, status: rule.status === "active" ? "inactive" : "active" } : rule
              ),
            }
          : cat
      )
    );
    toast.success("Automation rule updated");
  };

  const activateRecommendation = (recId: string) => {
    toast.success("Automation activated! The rule is now enabled.");
    setRecommendations(recommendations.filter((rec) => rec.id !== recId));
  };

  const dismissRecommendation = (recId: string) => {
    setRecommendations(recommendations.filter((rec) => rec.id !== recId));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-slate-50 to-blue-50">
      {/* Header */}
      <div className="sticky top-0 z-20 border-b border-slate-100 bg-white/80 backdrop-blur-md shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-gradient-to-br from-yellow-500 to-yellow-600">
                <Zap size={20} className="text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-900" style={{ fontFamily: "var(--font-display)" }}>
                  Automation Rules
                </h1>
                <p className="text-sm text-slate-500">Manage automated operational workflows</p>
              </div>
            </div>
            <button className="px-4 py-2 bg-gradient-to-r from-[#3ECF8E] to-[#2FBF9B] text-white rounded-lg font-medium hover:shadow-lg transition-all flex items-center gap-2">
              <Plus size={18} />
              New Rule
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
        {/* AI Recommendations Panel */}
        {showAIPanel && recommendations.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="rounded-2xl p-6 bg-gradient-to-br from-purple-50 to-blue-50 border-2 border-purple-200 shadow-sm"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-gradient-to-br from-purple-500 to-purple-600">
                  <Sparkles size={20} className="text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-900" style={{ fontFamily: "var(--font-display)" }}>
                    AI Automation Recommendations
                  </h3>
                  <p className="text-sm text-slate-600">{recommendations.length} suggestions based on your portfolio activity</p>
                </div>
              </div>
              <button
                onClick={() => setShowAIPanel(false)}
                className="text-slate-500 hover:text-slate-700 text-2xl"
              >
                ×
              </button>
            </div>

            <div className="space-y-3">
              {recommendations.map((rec) => (
                <motion.div
                  key={rec.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  className="p-4 rounded-lg bg-white border border-slate-200 hover:shadow-md transition-all"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h4 className="font-semibold text-slate-900 mb-1">{rec.title}</h4>
                      <p className="text-sm text-slate-600 mb-2">{rec.description}</p>
                      <div className="flex items-center gap-4 text-xs">
                        <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full font-medium">{rec.category}</span>
                        <span className="text-slate-500">📊 {rec.impact}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 ml-4">
                      <div className="text-right">
                        <p className="text-sm font-bold text-slate-900">{rec.confidence}%</p>
                        <p className="text-xs text-slate-500">confidence</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => activateRecommendation(rec.id)}
                      className="flex-1 py-2 px-3 bg-gradient-to-r from-[#3ECF8E] to-[#2FBF9B] text-white rounded-lg text-sm font-medium hover:shadow-lg transition-all"
                    >
                      Activate
                    </button>
                    <button
                      onClick={() => dismissRecommendation(rec.id)}
                      className="flex-1 py-2 px-3 border border-slate-300 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50 transition-all"
                    >
                      Dismiss
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Automation Categories */}
        <div className="space-y-4">
          {categories.map((category, idx) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="rounded-2xl overflow-hidden bg-white border border-slate-200 shadow-sm hover:shadow-md transition-all"
            >
              {/* Category Header */}
              <button
                onClick={() => setExpandedCategory(expandedCategory === category.id ? null : category.id)}
                className="w-full p-6 flex items-center justify-between hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-lg bg-gradient-to-br ${category.color}`}>
                    <span className="text-2xl">{category.icon}</span>
                  </div>
                  <div className="text-left">
                    <h3 className="text-lg font-semibold text-slate-900" style={{ fontFamily: "var(--font-display)" }}>
                      {category.name}
                    </h3>
                    <p className="text-sm text-slate-500">{category.rules.length} rules configured</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex gap-1">
                    {category.rules.map((rule) => (
                      <div
                        key={rule.id}
                        className={`w-2 h-2 rounded-full ${rule.status === "active" ? "bg-green-500" : "bg-slate-300"}`}
                      />
                    ))}
                  </div>
                  {expandedCategory === category.id ? (
                    <ChevronUp size={20} className="text-slate-400" />
                  ) : (
                    <ChevronDown size={20} className="text-slate-400" />
                  )}
                </div>
              </button>

              {/* Category Rules */}
              {expandedCategory === category.id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  transition={{ duration: 0.3 }}
                  className="border-t border-slate-200 divide-y divide-slate-200"
                >
                  {category.rules.map((rule) => (
                    <div key={rule.id} className="p-6 hover:bg-slate-50 transition-colors">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h4 className="font-semibold text-slate-900 mb-2">{rule.name}</h4>
                          <div className="space-y-2">
                            <div className="flex items-center gap-2 text-sm text-slate-600">
                              <Clock size={16} className="text-slate-400" />
                              <span>Trigger: {rule.trigger}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-slate-600">
                              <CheckCircle size={16} className="text-slate-400" />
                              <span>Action: {rule.action}</span>
                            </div>
                            <div className="flex items-center gap-2 text-xs text-slate-500">
                              <AlertCircle size={14} className="text-slate-400" />
                              <span>Last triggered: {rule.lastTriggered}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 ml-4">
                          <div className="text-right">
                            <p className={`text-xs font-semibold px-2 py-1 rounded-full ${
                              rule.status === "active"
                                ? "bg-green-100 text-green-700"
                                : "bg-slate-100 text-slate-700"
                            }`}>
                              {rule.status === "active" ? "Active" : "Inactive"}
                            </p>
                          </div>
                          <button
                            onClick={() => toggleRuleStatus(category.id, rule.id)}
                            className={`p-2 rounded-lg transition-all ${
                              rule.status === "active"
                                ? "bg-green-100 text-green-600 hover:bg-green-200"
                                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                            }`}
                          >
                            <ToggleRight size={20} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Summary Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4"
        >
          <div className="rounded-xl p-6 bg-white border border-slate-200 shadow-sm">
            <p className="text-sm font-medium text-slate-600 mb-2">Total Rules</p>
            <p className="text-3xl font-bold text-slate-900">
              {categories.reduce((sum, cat) => sum + cat.rules.length, 0)}
            </p>
          </div>
          <div className="rounded-xl p-6 bg-white border border-slate-200 shadow-sm">
            <p className="text-sm font-medium text-slate-600 mb-2">Active Rules</p>
            <p className="text-3xl font-bold text-green-600">
              {categories.reduce((sum, cat) => sum + cat.rules.filter(r => r.status === "active").length, 0)}
            </p>
          </div>
          <div className="rounded-xl p-6 bg-white border border-slate-200 shadow-sm">
            <p className="text-sm font-medium text-slate-600 mb-2">Pending Recommendations</p>
            <p className="text-3xl font-bold text-purple-600">{recommendations.length}</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
