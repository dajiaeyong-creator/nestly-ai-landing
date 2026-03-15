/*
 * AI Command Center
 * Control hub for analyzing data and performing actions
 * Futuristic design with soft gradients and floating cards
 */

import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Send, Zap, TrendingUp, AlertCircle, CheckCircle, ArrowRight, Lightbulb } from "lucide-react";
import { toast } from "sonner";

interface CommandSuggestion {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  category: "analyze" | "action" | "forecast";
}

const commandSuggestions: CommandSuggestion[] = [
  {
    id: "analyze-occupancy",
    icon: <TrendingUp size={20} />,
    title: "Analyze Occupancy",
    description: "Deep dive into occupancy metrics and trends",
    category: "analyze",
  },
  {
    id: "forecast-revenue",
    icon: <TrendingUp size={20} />,
    title: "Forecast Revenue",
    description: "Project next quarter revenue with AI",
    category: "forecast",
  },
  {
    id: "identify-risks",
    icon: <AlertCircle size={20} />,
    title: "Identify Risks",
    description: "Find eviction and payment risks",
    category: "analyze",
  },
  {
    id: "optimize-pricing",
    icon: <Zap size={20} />,
    title: "Optimize Pricing",
    description: "AI-powered rent optimization",
    category: "action",
  },
  {
    id: "analyze-expenses",
    icon: <TrendingUp size={20} />,
    title: "Analyze Expenses",
    description: "Review spending patterns and anomalies",
    category: "analyze",
  },
  {
    id: "vendor-recommendations",
    icon: <CheckCircle size={20} />,
    title: "Vendor Recommendations",
    description: "Get AI-recommended vendors for tasks",
    category: "action",
  },
];

interface AICommandCenterProps {
  compact?: boolean;
}

export default function AICommandCenter({ compact = false }: AICommandCenterProps) {
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCommand, setSelectedCommand] = useState<CommandSuggestion | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsLoading(true);
    setTimeout(() => {
      toast.success(`Analyzing: "${query}"`);
      setQuery("");
      setIsLoading(false);
    }, 1200);
  };

  const handleCommandClick = (command: CommandSuggestion) => {
    setSelectedCommand(command);
    setIsLoading(true);
    setTimeout(() => {
      toast.success(`Executing: ${command.title}`);
      setSelectedCommand(null);
      setIsLoading(false);
    }, 1200);
  };

  return (
    <div className={`space-y-6 ${compact ? "space-y-4" : ""}`}>
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 rounded-xl bg-gradient-to-br from-[#3ECF8E] to-[#2FBF9B] shadow-lg">
          <Sparkles size={24} className="text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-slate-900" style={{ fontFamily: "var(--font-display)" }}>
            Nestly AI Control Center
          </h2>
          <p className="text-sm text-slate-500" style={{ fontFamily: "var(--font-body)" }}>
            Ask me anything about your portfolio
          </p>
        </div>
      </div>

      {/* Main Command Input */}
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative"
      >
        <div className="relative group">
          {/* Gradient Background */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#3ECF8E]/20 to-[#06B6D4]/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Input Container */}
          <div className="relative bg-white border border-slate-200 rounded-2xl shadow-lg hover:shadow-xl transition-all p-1 flex items-center gap-2">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ask Nestly to analyze data, forecast trends, or perform actions..."
              className="flex-1 px-6 py-4 bg-transparent outline-none text-slate-900 placeholder-slate-400"
              style={{ fontFamily: "var(--font-body)" }}
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading || !query.trim()}
              className="mr-1 px-6 py-3 bg-gradient-to-r from-[#3ECF8E] to-[#2FBF9B] text-white rounded-xl font-medium hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              style={{ fontFamily: "var(--font-body)" }}
            >
              {isLoading ? (
                <div className="w-5 h-5 rounded-full border-2 border-white border-t-transparent animate-spin" />
              ) : (
                <Send size={18} />
              )}
              {!isLoading && <span className="hidden sm:inline">Ask</span>}
            </button>
          </div>
        </div>
      </motion.form>

      {/* Quick Commands Grid */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Lightbulb size={18} className="text-[#3ECF8E]" />
          <h3 className="font-semibold text-slate-900" style={{ fontFamily: "var(--font-display)" }}>
            Quick Commands
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {commandSuggestions.map((command, idx) => (
            <motion.button
              key={command.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              onClick={() => handleCommandClick(command)}
              disabled={isLoading}
              className="group relative px-4 py-4 rounded-xl border border-slate-200 bg-white hover:bg-gradient-to-br hover:from-slate-50 hover:to-white hover:border-slate-300 transition-all hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed text-left"
            >
              {/* Gradient Overlay on Hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#3ECF8E]/5 to-[#06B6D4]/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="relative z-10 flex items-start gap-3">
                <div className="p-2 rounded-lg bg-gradient-to-br from-slate-100 to-slate-50 group-hover:from-[#3ECF8E]/20 group-hover:to-[#06B6D4]/20 transition-all">
                  <div className="text-slate-600 group-hover:text-[#3ECF8E] transition-colors">{command.icon}</div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-slate-900 text-sm" style={{ fontFamily: "var(--font-display)" }}>
                    {command.title}
                  </p>
                  <p className="text-xs text-slate-500 line-clamp-2" style={{ fontFamily: "var(--font-body)" }}>
                    {command.description}
                  </p>
                </div>
                <ArrowRight size={16} className="text-slate-300 group-hover:text-[#3ECF8E] transition-colors flex-shrink-0 mt-1" />
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Info Box */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="p-4 rounded-xl bg-gradient-to-r from-[#3ECF8E]/10 to-[#06B6D4]/10 border border-[#3ECF8E]/20"
      >
        <p className="text-sm text-slate-700" style={{ fontFamily: "var(--font-body)" }}>
          <span className="font-semibold">💡 Tip:</span> Use natural language to ask questions like "Which properties are underperforming?" or "Show me high-risk tenants"
        </p>
      </motion.div>
    </div>
  );
}
