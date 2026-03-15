/*
 * AI Command Bar – Global "Ask Nestly" interface
 * Provides natural language commands and AI-powered suggestions
 * Accessible from every page via keyboard shortcut (Cmd+K / Ctrl+K)
 */

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Sparkles, ArrowRight, Zap, TrendingUp, AlertCircle, Clock, DollarSign, Home, X } from "lucide-react";
import { toast } from "sonner";

interface AICommand {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  category: "insights" | "actions" | "reports" | "automation";
  command: string;
}

interface AIResponse {
  title: string;
  insight: string;
  suggestedActions: Array<{
    label: string;
    action: () => void;
    icon?: React.ReactNode;
  }>;
  metrics?: Array<{
    label: string;
    value: string;
    trend?: "up" | "down" | "neutral";
  }>;
}

const suggestedCommands: AICommand[] = [
  {
    id: "unpaid-rent",
    title: "Show unpaid rent",
    description: "View all overdue rent payments",
    icon: <DollarSign size={18} />,
    category: "insights",
    command: "unpaid-rent",
  },
  {
    id: "forecast-revenue",
    title: "Forecast revenue",
    description: "AI-powered revenue projection",
    icon: <TrendingUp size={18} />,
    category: "insights",
    command: "forecast-revenue",
  },
  {
    id: "assign-vendor",
    title: "Assign vendor to maintenance",
    description: "AI-recommended vendor assignment",
    icon: <Zap size={18} />,
    category: "actions",
    command: "assign-vendor",
  },
  {
    id: "underperforming",
    title: "Identify underperforming properties",
    description: "Find properties with low occupancy or high expenses",
    icon: <AlertCircle size={18} />,
    category: "insights",
    command: "underperforming-properties",
  },
  {
    id: "rent-reminders",
    title: "Send rent reminders",
    description: "Automatically remind tenants of upcoming rent",
    icon: <Clock size={18} />,
    category: "automation",
    command: "rent-reminders",
  },
  {
    id: "lease-renewal",
    title: "Lease renewal suggestions",
    description: "Identify leases expiring soon",
    icon: <Home size={18} />,
    category: "automation",
    command: "lease-renewal",
  },
];

const mockAIResponses: Record<string, AIResponse> = {
  "unpaid-rent": {
    title: "Unpaid Rent Summary",
    insight: "You have $8,450 in overdue rent across 3 properties. Downtown Apartments has the highest outstanding amount at $4,200 from Tenant #42. Immediate action recommended.",
    suggestedActions: [
      {
        label: "Send Payment Reminder",
        action: () => toast.success("Payment reminders sent to 3 tenants"),
        icon: <Mail size={16} />,
      },
      {
        label: "View Detailed Report",
        action: () => toast.info("Opening detailed rent report"),
        icon: <FileText size={16} />,
      },
      {
        label: "Schedule Collections",
        action: () => toast.success("Collections scheduled for overdue accounts"),
        icon: <Calendar size={16} />,
      },
    ],
    metrics: [
      { label: "Total Overdue", value: "$8,450", trend: "down" },
      { label: "Affected Tenants", value: "3", trend: "neutral" },
      { label: "Days Overdue (Avg)", value: "18", trend: "up" },
    ],
  },
  "forecast-revenue": {
    title: "Revenue Forecast",
    insight: "Based on current occupancy rates and lease agreements, projected monthly revenue for Q2 2026 is $127,500, representing a 3.2% increase from Q1. Seasonal factors and upcoming lease renewals are factored in.",
    suggestedActions: [
      {
        label: "View Full Forecast",
        action: () => toast.info("Opening revenue forecast dashboard"),
        icon: <TrendingUp size={16} />,
      },
      {
        label: "Export Report",
        action: () => toast.success("Forecast exported as PDF"),
        icon: <Download size={16} />,
      },
    ],
    metrics: [
      { label: "Q2 Projected Revenue", value: "$127,500", trend: "up" },
      { label: "QoQ Growth", value: "+3.2%", trend: "up" },
      { label: "Occupancy Rate", value: "94%", trend: "up" },
    ],
  },
  "assign-vendor": {
    title: "Vendor Recommendation",
    insight: "For the plumbing issue at Lakeside Villas, ProFix Plumbing is recommended. They have a 4.8/5 rating, 2-hour average response time, and have completed 156 jobs. Cost estimate: $450.",
    suggestedActions: [
      {
        label: "Assign ProFix Plumbing",
        action: () => toast.success("ProFix Plumbing assigned to maintenance request"),
        icon: <Check size={16} />,
      },
      {
        label: "View Alternatives",
        action: () => toast.info("Showing alternative vendors"),
        icon: <List size={16} />,
      },
    ],
    metrics: [
      { label: "Vendor Rating", value: "4.8/5", trend: "up" },
      { label: "Avg Response Time", value: "2h", trend: "neutral" },
      { label: "Est. Cost", value: "$450", trend: "neutral" },
    ],
  },
  "underperforming-properties": {
    title: "Underperforming Properties",
    insight: "Sunset Plaza is underperforming with 78% occupancy (below 90% target) and maintenance costs 22% above average. Recommend rent review and preventive maintenance program.",
    suggestedActions: [
      {
        label: "View Property Details",
        action: () => toast.info("Opening Sunset Plaza details"),
        icon: <Home size={16} />,
      },
      {
        label: "Schedule Maintenance Review",
        action: () => toast.success("Maintenance review scheduled"),
        icon: <Calendar size={16} />,
      },
    ],
    metrics: [
      { label: "Occupancy Rate", value: "78%", trend: "down" },
      { label: "Maintenance Cost Variance", value: "+22%", trend: "down" },
      { label: "Revenue vs Target", value: "-$3,200/mo", trend: "down" },
    ],
  },
  "rent-reminders": {
    title: "Rent Reminder Automation",
    insight: "Automatic rent reminders are now active. Tenants will receive reminders 5 days before due date and 1 day after if unpaid. This typically increases on-time payment rate by 12-15%.",
    suggestedActions: [
      {
        label: "Customize Reminder Schedule",
        action: () => toast.info("Opening reminder settings"),
        icon: <Settings size={16} />,
      },
      {
        label: "View Automation Rules",
        action: () => toast.info("Showing all automation rules"),
        icon: <Zap size={16} />,
      },
    ],
    metrics: [
      { label: "Status", value: "Active", trend: "up" },
      { label: "Expected Improvement", value: "+12-15%", trend: "up" },
      { label: "Tenants Enrolled", value: "47", trend: "neutral" },
    ],
  },
  "lease-renewal": {
    title: "Lease Renewal Opportunities",
    insight: "12 leases expire within the next 90 days. Average renewal success rate is 87%. Recommended actions: start renewal discussions 60 days before expiration.",
    suggestedActions: [
      {
        label: "View Expiring Leases",
        action: () => toast.info("Opening lease renewal dashboard"),
        icon: <Calendar size={16} />,
      },
      {
        label: "Start Renewal Campaign",
        action: () => toast.success("Renewal campaign initiated for 12 leases"),
        icon: <Mail size={16} />,
      },
    ],
    metrics: [
      { label: "Leases Expiring (90 days)", value: "12", trend: "neutral" },
      { label: "Historical Renewal Rate", value: "87%", trend: "up" },
      { label: "Revenue at Risk", value: "$18,600/mo", trend: "down" },
    ],
  },
};

export default function AICommandBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedResponse, setSelectedResponse] = useState<AIResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Keyboard shortcut to open command bar
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen(!isOpen);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const filteredCommands = suggestedCommands.filter((cmd) =>
    cmd.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    cmd.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCommandSelect = (command: AICommand) => {
    setIsLoading(true);
    setSearchQuery("");

    // Simulate AI processing
    setTimeout(() => {
      const response = mockAIResponses[command.command];
      if (response) {
        setSelectedResponse(response);
      }
      setIsLoading(false);
    }, 800);
  };

  return (
    <>
      {/* Command Bar Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed top-4 left-1/2 transform -translate-x-1/2 z-40 px-4 py-2 bg-white border border-slate-200 rounded-lg shadow-lg hover:shadow-xl transition-all flex items-center gap-2 text-slate-600 hover:text-slate-900"
        style={{ fontFamily: "var(--font-body)" }}
      >
        <Sparkles size={16} className="text-[#3ECF8E]" />
        <span className="text-sm font-medium">Ask Nestly</span>
        <span className="ml-2 px-2 py-1 bg-slate-100 rounded text-xs text-slate-500">⌘K</span>
      </button>

      {/* Command Bar Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => {
              setIsOpen(false);
              setSelectedResponse(null);
            }}
            className="fixed inset-0 bg-black/40 z-50 flex items-start justify-center pt-20"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: -20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: -20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[80vh] overflow-hidden flex flex-col"
            >
              {/* Search Input */}
              <div className="border-b border-slate-200 p-4 bg-gradient-to-r from-slate-50 to-white">
                <div className="relative">
                  <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                  <input
                    autoFocus
                    type="text"
                    placeholder="Ask Nestly anything... (e.g., 'Show unpaid rent', 'Forecast revenue')"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-transparent outline-none text-slate-900 placeholder-slate-500"
                    style={{ fontFamily: "var(--font-body)" }}
                  />
                </div>
              </div>

              {/* Content Area */}
              <div className="flex-1 overflow-y-auto">
                {selectedResponse ? (
                  // AI Response View
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="p-6 space-y-6"
                  >
                    <div>
                      <h2 className="text-2xl font-bold text-slate-900 mb-2" style={{ fontFamily: "var(--font-display)" }}>
                        {selectedResponse.title}
                      </h2>
                      <p className="text-slate-600 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
                        {selectedResponse.insight}
                      </p>
                    </div>

                    {/* Metrics */}
                    {selectedResponse.metrics && selectedResponse.metrics.length > 0 && (
                      <div className="grid grid-cols-3 gap-3">
                        {selectedResponse.metrics.map((metric, idx) => (
                          <div key={idx} className="bg-slate-50 rounded-lg p-3">
                            <p className="text-xs text-slate-600 mb-1" style={{ fontFamily: "var(--font-body)" }}>
                              {metric.label}
                            </p>
                            <p className="text-lg font-bold text-slate-900" style={{ fontFamily: "var(--font-display)" }}>
                              {metric.value}
                            </p>
                            {metric.trend && (
                              <div className={`text-xs mt-1 ${metric.trend === "up" ? "text-green-600" : metric.trend === "down" ? "text-red-600" : "text-slate-600"}`}>
                                {metric.trend === "up" ? "↑" : metric.trend === "down" ? "↓" : "→"} {metric.trend}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Suggested Actions */}
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-slate-700" style={{ fontFamily: "var(--font-body)" }}>
                        Suggested Actions
                      </p>
                      <div className="space-y-2">
                        {selectedResponse.suggestedActions.map((action, idx) => (
                          <button
                            key={idx}
                            onClick={() => {
                              action.action();
                              setIsOpen(false);
                              setSelectedResponse(null);
                            }}
                            className="w-full px-4 py-3 bg-gradient-to-r from-[#3ECF8E]/10 to-[#2FBF9B]/10 border border-[#3ECF8E]/20 rounded-lg hover:border-[#3ECF8E]/50 hover:bg-gradient-to-r hover:from-[#3ECF8E]/20 hover:to-[#2FBF9B]/20 transition-all flex items-center justify-between group"
                          >
                            <span className="text-sm font-medium text-slate-900 flex items-center gap-2" style={{ fontFamily: "var(--font-body)" }}>
                              {action.icon}
                              {action.label}
                            </span>
                            <ArrowRight size={16} className="text-[#3ECF8E] opacity-0 group-hover:opacity-100 transition-opacity" />
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Back Button */}
                    <button
                      onClick={() => setSelectedResponse(null)}
                      className="w-full px-4 py-2 text-slate-600 hover:text-slate-900 text-sm font-medium transition-colors"
                      style={{ fontFamily: "var(--font-body)" }}
                    >
                      ← Back to Commands
                    </button>
                  </motion.div>
                ) : (
                  // Commands List
                  <div className="p-4 space-y-2">
                    {isLoading ? (
                      <div className="flex items-center justify-center py-12">
                        <div className="flex flex-col items-center gap-3">
                          <div className="w-8 h-8 rounded-full border-2 border-[#3ECF8E] border-t-transparent animate-spin" />
                          <p className="text-sm text-slate-600" style={{ fontFamily: "var(--font-body)" }}>
                            Nestly is thinking...
                          </p>
                        </div>
                      </div>
                    ) : filteredCommands.length > 0 ? (
                      filteredCommands.map((command) => (
                        <motion.button
                          key={command.id}
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          onClick={() => handleCommandSelect(command)}
                          className="w-full px-4 py-3 rounded-lg hover:bg-slate-50 transition-all text-left group border border-transparent hover:border-slate-200"
                        >
                          <div className="flex items-start gap-3">
                            <div className="text-[#3ECF8E] mt-1">{command.icon}</div>
                            <div className="flex-1">
                              <p className="font-medium text-slate-900" style={{ fontFamily: "var(--font-body)" }}>
                                {command.title}
                              </p>
                              <p className="text-sm text-slate-500" style={{ fontFamily: "var(--font-body)" }}>
                                {command.description}
                              </p>
                            </div>
                            <ArrowRight size={16} className="text-slate-300 group-hover:text-slate-400 transition-colors mt-1" />
                          </div>
                        </motion.button>
                      ))
                    ) : (
                      <div className="text-center py-8">
                        <p className="text-slate-500" style={{ fontFamily: "var(--font-body)" }}>
                          No commands found. Try searching for something else.
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="border-t border-slate-200 bg-slate-50 px-4 py-3 flex items-center justify-between text-xs text-slate-500">
                <div className="flex gap-4" style={{ fontFamily: "var(--font-body)" }}>
                  <span>↑↓ Navigate</span>
                  <span>⏎ Select</span>
                  <span>Esc Close</span>
                </div>
                <button
                  onClick={() => {
                    setIsOpen(false);
                    setSelectedResponse(null);
                  }}
                  className="text-slate-400 hover:text-slate-600"
                >
                  <X size={16} />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// Icon imports for suggested actions
function Mail({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

function FileText({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="12" y1="13" x2="12" y2="17" />
      <line x1="9" y1="15" x2="15" y2="15" />
    </svg>
  );
}

function Calendar({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}

function Download({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  );
}

function Check({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function List({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="8" y1="6" x2="21" y2="6" />
      <line x1="8" y1="12" x2="21" y2="12" />
      <line x1="8" y1="18" x2="21" y2="18" />
      <line x1="3" y1="6" x2="3.01" y2="6" />
      <line x1="3" y1="12" x2="3.01" y2="12" />
      <line x1="3" y1="18" x2="3.01" y2="18" />
    </svg>
  );
}

function Settings({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="3" />
      <path d="M12 1v6m0 6v6M4.22 4.22l4.24 4.24m5.08 5.08l4.24 4.24M1 12h6m6 0h6m-16.78 7.78l4.24-4.24m5.08-5.08l4.24-4.24" />
    </svg>
  );
}
