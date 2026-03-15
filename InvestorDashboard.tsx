/*
 * Investor Dashboard
 * Portfolio performance analytics with AI-powered insights
 */

import { motion } from "framer-motion";
import { Sparkles, TrendingUp, DollarSign, Home, BarChart3, PieChart, LineChart, AlertCircle, ChevronRight } from "lucide-react";
import { useState } from "react";
import { LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart as RechartsPieChart, Pie, Cell, BarChart as RechartsBarChart, Bar } from "recharts";

// Sample data
const revenueData = [
  { month: "Jan", revenue: 24000, expenses: 8000 },
  { month: "Feb", revenue: 27000, expenses: 8500 },
  { month: "Mar", revenue: 26000, expenses: 9000 },
  { month: "Apr", revenue: 29000, expenses: 8800 },
  { month: "May", revenue: 31000, expenses: 9200 },
  { month: "Jun", revenue: 32000, expenses: 9500 },
];

const expenseData = [
  { name: "Maintenance", value: 35, color: "#F59E0B" },
  { name: "Property Tax", value: 25, color: "#3B82F6" },
  { name: "Insurance", value: 20, color: "#8B5CF6" },
  { name: "Utilities", value: 15, color: "#EC4899" },
  { name: "Other", value: 5, color: "#6B7280" },
];

const propertyPerformance = [
  { property: "Downtown Apt", revenue: 8000, expenses: 2500, occupancy: 95 },
  { property: "Midtown House", revenue: 6500, expenses: 2000, occupancy: 88 },
  { property: "Uptown Loft", revenue: 7200, expenses: 2200, occupancy: 92 },
  { property: "Suburb Villa", revenue: 5800, expenses: 1800, occupancy: 85 },
  { property: "Downtown House", revenue: 7500, expenses: 2300, occupancy: 90 },
];

const suggestedPrompts = [
  "Analyze portfolio performance",
  "Forecast next quarter revenue",
  "Identify underperforming properties",
  "Compare ROI across properties",
];

export default function InvestorDashboard() {
  const [aiInput, setAiInput] = useState("");
  const [selectedPrompt, setSelectedPrompt] = useState<string | null>(null);

  const handlePromptClick = (prompt: string) => {
    setSelectedPrompt(prompt);
    setAiInput(prompt);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-slate-50 to-blue-50">
      {/* Header */}
      <div className="sticky top-0 z-20 border-b border-slate-100 bg-white/80 backdrop-blur-md shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-gradient-to-br from-[#3ECF8E] to-[#2FBF9B]">
                <TrendingUp size={20} className="text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-900" style={{ fontFamily: "var(--font-display)" }}>
                  Investor Dashboard
                </h1>
                <p className="text-sm text-slate-500">Portfolio Performance & Analytics</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
        {/* AI Command Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="rounded-2xl p-6 bg-gradient-to-br from-[#3ECF8E]/10 to-[#06B6D4]/10 border border-[#3ECF8E]/20 shadow-sm"
        >
          <h2 className="text-lg font-semibold text-slate-900 mb-4" style={{ fontFamily: "var(--font-display)" }}>
            Nestly AI Command
          </h2>
          <div className="flex gap-3 mb-4">
            <input
              type="text"
              value={aiInput}
              onChange={(e) => setAiInput(e.target.value)}
              placeholder="Ask Nestly to analyze your portfolio..."
              className="flex-1 px-4 py-3 bg-white border border-slate-200 rounded-lg outline-none text-sm text-slate-900 placeholder-slate-400 hover:border-slate-300 focus:border-[#3ECF8E] transition-colors"
              style={{ fontFamily: "var(--font-body)" }}
            />
            <button className="px-4 py-3 bg-gradient-to-r from-[#3ECF8E] to-[#2FBF9B] text-white rounded-lg font-medium hover:shadow-lg transition-all flex items-center gap-2 whitespace-nowrap">
              <Sparkles size={16} />
              Analyze
            </button>
          </div>

          {/* Suggested Prompts */}
          <div className="space-y-2">
            <p className="text-xs text-slate-600 font-medium">Suggested analysis:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {suggestedPrompts.map((prompt, idx) => (
                <button
                  key={idx}
                  onClick={() => handlePromptClick(prompt)}
                  className="text-left px-3 py-2 text-sm text-slate-700 bg-white border border-slate-200 rounded-lg hover:border-[#3ECF8E] hover:bg-[#3ECF8E]/5 transition-all"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Key Metrics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Portfolio Value */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="rounded-2xl p-6 bg-white border border-slate-200 shadow-sm hover:shadow-lg transition-all"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 rounded-xl bg-gradient-to-br from-[#3ECF8E]/20 to-[#2FBF9B]/20">
                <DollarSign size={24} className="text-[#3ECF8E]" />
              </div>
            </div>
            <p className="text-sm text-slate-600 mb-1" style={{ fontFamily: "var(--font-body)" }}>
              Portfolio Value
            </p>
            <p className="text-3xl font-bold text-slate-900 mb-2" style={{ fontFamily: "var(--font-display)" }}>
              $1.2M
            </p>
            <p className="text-sm text-[#3ECF8E] font-medium">↑ 12% from last year</p>
          </motion.div>

          {/* Monthly Cash Flow */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="rounded-2xl p-6 bg-white border border-slate-200 shadow-sm hover:shadow-lg transition-all"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 rounded-xl bg-gradient-to-br from-[#06B6D4]/20 to-[#0891B2]/20">
                <TrendingUp size={24} className="text-[#06B6D4]" />
              </div>
            </div>
            <p className="text-sm text-slate-600 mb-1" style={{ fontFamily: "var(--font-body)" }}>
              Monthly Cash Flow
            </p>
            <p className="text-3xl font-bold text-slate-900 mb-2" style={{ fontFamily: "var(--font-display)" }}>
              $22,500
            </p>
            <p className="text-sm text-[#06B6D4] font-medium">↑ 8% from last month</p>
          </motion.div>

          {/* Occupancy Rate */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="rounded-2xl p-6 bg-white border border-slate-200 shadow-sm hover:shadow-lg transition-all"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 rounded-xl bg-gradient-to-br from-[#F59E0B]/20 to-[#D97706]/20">
                <Home size={24} className="text-[#F59E0B]" />
              </div>
            </div>
            <p className="text-sm text-slate-600 mb-1" style={{ fontFamily: "var(--font-body)" }}>
              Occupancy Rate
            </p>
            <p className="text-3xl font-bold text-slate-900 mb-2" style={{ fontFamily: "var(--font-display)" }}>
              90%
            </p>
            <p className="text-sm text-[#F59E0B] font-medium">2 units vacant</p>
          </motion.div>

          {/* Return on Investment */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="rounded-2xl p-6 bg-white border border-slate-200 shadow-sm hover:shadow-lg transition-all"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 rounded-xl bg-gradient-to-br from-[#8B5CF6]/20 to-[#7C3AED]/20">
                <BarChart3 size={24} className="text-[#8B5CF6]" />
              </div>
            </div>
            <p className="text-sm text-slate-600 mb-1" style={{ fontFamily: "var(--font-body)" }}>
              Return on Investment
            </p>
            <p className="text-3xl font-bold text-slate-900 mb-2" style={{ fontFamily: "var(--font-display)" }}>
              8.5%
            </p>
            <p className="text-sm text-[#8B5CF6] font-medium">Annual ROI</p>
          </motion.div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Revenue Trend Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="rounded-2xl p-6 bg-white border border-slate-200 shadow-sm"
          >
            <h3 className="text-lg font-semibold text-slate-900 mb-4" style={{ fontFamily: "var(--font-display)" }}>
              Revenue Trend
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <RechartsLineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="month" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip contentStyle={{ backgroundColor: "#1e293b", border: "1px solid #475569", borderRadius: "8px", color: "#f1f5f9" }} />
                <Legend />
                <Line type="monotone" dataKey="revenue" stroke="#3ECF8E" strokeWidth={2} dot={{ fill: "#3ECF8E", r: 4 }} />
                <Line type="monotone" dataKey="expenses" stroke="#F59E0B" strokeWidth={2} dot={{ fill: "#F59E0B", r: 4 }} />
              </RechartsLineChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Expense Breakdown */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="rounded-2xl p-6 bg-white border border-slate-200 shadow-sm"
          >
            <h3 className="text-lg font-semibold text-slate-900 mb-4" style={{ fontFamily: "var(--font-display)" }}>
              Expense Breakdown
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <RechartsPieChart>
                <Pie data={expenseData} cx="50%" cy="50%" labelLine={false} label={({ name, value }) => `${name}: ${value}%`} outerRadius={80} fill="#8884d8" dataKey="value">
                  {expenseData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </RechartsPieChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        {/* Property Performance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="rounded-2xl p-6 bg-white border border-slate-200 shadow-sm"
        >
          <h3 className="text-lg font-semibold text-slate-900 mb-4" style={{ fontFamily: "var(--font-display)" }}>
            Property Performance Comparison
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <RechartsBarChart data={propertyPerformance}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="property" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip contentStyle={{ backgroundColor: "#1e293b", border: "1px solid #475569", borderRadius: "8px", color: "#f1f5f9" }} />
              <Legend />
              <Bar dataKey="revenue" fill="#3ECF8E" radius={[8, 8, 0, 0]} />
              <Bar dataKey="expenses" fill="#F59E0B" radius={[8, 8, 0, 0]} />
            </RechartsBarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* AI Insights Panel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="rounded-2xl p-6 bg-gradient-to-br from-[#3ECF8E]/10 to-[#06B6D4]/10 border border-[#3ECF8E]/20 shadow-sm"
        >
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-[#3ECF8E]/20 flex-shrink-0">
              <Sparkles size={24} className="text-[#3ECF8E]" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-slate-900 mb-3" style={{ fontFamily: "var(--font-display)" }}>
                AI Portfolio Insights
              </h3>
              <div className="space-y-3" style={{ fontFamily: "var(--font-body)" }}>
                <p className="text-slate-700">
                  <span className="font-semibold">Strong Performance:</span> Your portfolio is performing well with a 90% occupancy rate and 8.5% annual ROI. Monthly cash flow has increased 8% compared to last month, indicating positive momentum.
                </p>
                <p className="text-slate-700">
                  <span className="font-semibold">Opportunity:</span> Downtown Apartment is your top performer with $8,000 monthly revenue. Consider allocating more capital to similar high-performing properties.
                </p>
                <p className="text-slate-700">
                  <span className="font-semibold">Recommendation:</span> Suburb Villa has lower occupancy (85%). Recommend targeted marketing or minor renovations to increase occupancy to 92%+, which could add $1,200/month revenue.
                </p>
                <div className="pt-3 border-t border-[#3ECF8E]/20">
                  <p className="text-sm text-slate-600">
                    <span className="font-semibold">Forecast:</span> Based on current trends, expect Q3 revenue to reach $98,000 (+6% from Q2), with ROI potentially increasing to 9.2%.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Footer */}
        <div className="text-center py-8">
          <p className="text-sm text-slate-600" style={{ fontFamily: "var(--font-body)" }}>
            Need detailed analysis? <a href="#" className="text-[#3ECF8E] hover:underline font-medium">Generate custom report</a>
          </p>
        </div>
      </div>
    </div>
  );
}
