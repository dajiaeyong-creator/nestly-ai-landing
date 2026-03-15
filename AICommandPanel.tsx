/*
 * AI Command Panel – Futuristic AI Assistant Interface
 * Animated gradient borders and soft glow effects
 */

import { motion } from "framer-motion";
import { Send, Sparkles } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const quickActions = [
  "Show late tenants",
  "Forecast next quarter revenue",
  "Identify eviction risks",
  "Optimize rent pricing",
];

export default function AICommandPanel() {
  const [query, setQuery] = useState("");
  const [isActive, setIsActive] = useState(false);

  const handleSubmit = () => {
    if (query.trim()) {
      toast.success(`Processing: "${query}"`);
      setQuery("");
      setIsActive(false);
    }
  };

  const handleQuickAction = (action: string) => {
    toast.success(`Processing: "${action}"`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative mb-8"
    >
      {/* Animated gradient border background */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#3ECF8E] via-[#2FBF9B] to-[#3ECF8E] opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />

      {/* Main panel */}
      <div className="relative bg-white rounded-2xl p-8 border border-slate-200 shadow-lg hover:shadow-xl transition-all">
        {/* Glow effect */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#3ECF8E]/5 via-transparent to-[#2FBF9B]/5 pointer-events-none" />

        {/* Content */}
        <div className="relative z-10">
          {/* Header */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#3ECF8E] to-[#2FBF9B] flex items-center justify-center">
              <Sparkles size={20} className="text-white" />
            </div>
            <div>
              <h2
                className="text-xl font-bold text-slate-900"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Nestly AI Command
              </h2>
              <p
                className="text-xs text-slate-500"
                style={{ fontFamily: "var(--font-body)" }}
              >
                Ask anything about your portfolio
              </p>
            </div>
          </div>

          {/* Input Field */}
          <div className="flex gap-3 mb-6">
            <div className="flex-1 relative">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => setIsActive(true)}
                onBlur={() => setIsActive(false)}
                onKeyPress={(e) => e.key === "Enter" && handleSubmit()}
                placeholder="Ask anything about your portfolio..."
                className={`w-full px-4 py-3 rounded-lg border-2 bg-white text-slate-900 placeholder-slate-400 focus:outline-none transition-all ${
                  isActive
                    ? "border-[#3ECF8E] shadow-lg shadow-[#3ECF8E]/20"
                    : "border-slate-200 hover:border-slate-300"
                }`}
                style={{ fontFamily: "var(--font-body)" }}
              />
              {isActive && (
                <motion.div
                  layoutId="inputGlow"
                  className="absolute inset-0 rounded-lg bg-gradient-to-r from-[#3ECF8E]/10 to-[#2FBF9B]/10 pointer-events-none"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                />
              )}
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSubmit}
              className="px-6 py-3 rounded-lg bg-gradient-to-r from-[#3ECF8E] to-[#2FBF9B] text-white font-medium hover:shadow-lg transition-all flex items-center gap-2"
              style={{ fontFamily: "var(--font-body)" }}
            >
              <Send size={18} />
              Ask
            </motion.button>
          </div>

          {/* Quick Action Prompts */}
          <div>
            <p
              className="text-xs text-slate-500 mb-3"
              style={{ fontFamily: "var(--font-body)" }}
            >
              Quick actions:
            </p>
            <div className="flex flex-wrap gap-2">
              {quickActions.map((action, index) => (
                <motion.button
                  key={action}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => handleQuickAction(action)}
                  className="px-3 py-2 rounded-lg bg-gradient-to-r from-slate-50 to-slate-100 text-slate-700 text-xs font-medium hover:from-[#3ECF8E]/10 hover:to-[#2FBF9B]/10 hover:text-[#3ECF8E] transition-all border border-slate-200 hover:border-[#3ECF8E]/30"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  {action}
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
