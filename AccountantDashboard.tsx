/*
 * Accountant Dashboard
 * Financial oversight, ledger management, and reporting
 */

import { motion } from "framer-motion";
import { Sparkles, DollarSign, TrendingUp, PieChart, Download, Filter, Search, ArrowUpRight, ArrowDownLeft, FileText, Calendar } from "lucide-react";
import { useState } from "react";
import { LineChart, Line, BarChart, Bar, PieChart as PieChartComponent, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

// Sample data
const financialLedger = [
  { id: "TXN-001", date: "Mar 7, 2026", description: "Rent Payment - Downtown Apt", category: "Income", amount: "$2,500", type: "income", property: "Downtown Apartment" },
  { id: "TXN-002", date: "Mar 6, 2026", description: "Plumbing Repair - Downtown", category: "Maintenance", amount: "-$185", type: "expense", property: "Downtown Apartment" },
  { id: "TXN-003", date: "Mar 5, 2026", description: "Property Tax Payment", category: "Taxes", amount: "-$450", type: "expense", property: "Midtown House" },
  { id: "TXN-004", date: "Mar 4, 2026", description: "Rent Payment - Midtown House", category: "Income", amount: "$1,800", type: "income", property: "Midtown House" },
  { id: "TXN-005", date: "Mar 3, 2026", description: "Insurance Premium", category: "Insurance", amount: "-$320", type: "expense", property: "Portfolio" },
  { id: "TXN-006", date: "Mar 2, 2026", description: "Electrical Repair - Uptown", category: "Maintenance", amount: "-$275", type: "expense", property: "Uptown Loft" },
];

const expenseCategories = [
  { name: "Maintenance", value: 2850, percentage: 35 },
  { name: "Property Tax", value: 1200, percentage: 15 },
  { name: "Insurance", value: 960, percentage: 12 },
  { name: "Utilities", value: 800, percentage: 10 },
  { name: "Management", value: 1600, percentage: 20 },
  { name: "Other", value: 590, percentage: 8 },
];

const monthlyRevenueData = [
  { month: "Jan", revenue: 18000, expenses: 6500 },
  { month: "Feb", revenue: 19200, expenses: 6800 },
  { month: "Mar", revenue: 20500, expenses: 7200 },
  { month: "Apr", revenue: 21000, expenses: 7100 },
  { month: "May", revenue: 22300, expenses: 7400 },
  { month: "Jun", revenue: 23100, expenses: 7600 },
];

const monthlyReports = [
  { month: "March 2026", revenue: "$20,500", expenses: "$7,200", profit: "$13,300", status: "Current" },
  { month: "February 2026", revenue: "$19,200", expenses: "$6,800", profit: "$12,400", status: "Completed" },
  { month: "January 2026", revenue: "$18,000", expenses: "$6,500", profit: "$11,500", status: "Completed" },
];

const suggestedPrompts = [
  "Generate monthly financial report",
  "Analyze expense categories",
  "Export tax summary",
  "Compare properties by ROI",
];

const COLORS = ["#3ECF8E", "#06B6D4", "#F59E0B", "#EF4444", "#8B5CF6", "#EC4899"];

export default function AccountantDashboard() {
  const [aiInput, setAiInput] = useState("");
  const [selectedLedgerFilter, setSelectedLedgerFilter] = useState("all");
  const [searchLedger, setSearchLedger] = useState("");

  const handlePromptClick = (prompt: string) => {
    setAiInput(prompt);
  };

  const filteredLedger = financialLedger.filter((item) => {
    const matchesFilter = selectedLedgerFilter === "all" || item.type === selectedLedgerFilter;
    const matchesSearch = item.description.toLowerCase().includes(searchLedger.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-slate-50 to-blue-50">
      {/* Header */}
      <div className="sticky top-0 z-20 border-b border-slate-100 bg-white/80 backdrop-blur-md shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-gradient-to-br from-[#3ECF8E] to-[#2FBF9B]">
                <DollarSign size={20} className="text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-900" style={{ fontFamily: "var(--font-display)" }}>
                  Accountant Dashboard
                </h1>
                <p className="text-sm text-slate-500">Financial Oversight & Reporting</p>
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
              placeholder="Ask Nestly for financial analysis..."
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
            <p className="text-xs text-slate-600 font-medium">Quick actions:</p>
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

        {/* Key Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="rounded-2xl p-6 bg-white border border-slate-200 shadow-sm"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 rounded-xl bg-gradient-to-br from-[#3ECF8E]/20 to-[#2FBF9B]/20">
                <TrendingUp size={24} className="text-[#3ECF8E]" />
              </div>
            </div>
            <p className="text-sm text-slate-600 mb-1">Total Revenue</p>
            <p className="text-3xl font-bold text-slate-900">$122,200</p>
            <p className="text-sm text-[#3ECF8E] font-medium mt-2">↑ 8% from last month</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="rounded-2xl p-6 bg-white border border-slate-200 shadow-sm"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 rounded-xl bg-gradient-to-br from-[#EF4444]/20 to-[#DC2626]/20">
                <ArrowDownLeft size={24} className="text-[#EF4444]" />
              </div>
            </div>
            <p className="text-sm text-slate-600 mb-1">Total Expenses</p>
            <p className="text-3xl font-bold text-slate-900">$35,800</p>
            <p className="text-sm text-[#EF4444] font-medium mt-2">↑ 5% from last month</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="rounded-2xl p-6 bg-white border border-slate-200 shadow-sm"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 rounded-xl bg-gradient-to-br from-[#06B6D4]/20 to-[#0891B2]/20">
                <DollarSign size={24} className="text-[#06B6D4]" />
              </div>
            </div>
            <p className="text-sm text-slate-600 mb-1">Net Profit</p>
            <p className="text-3xl font-bold text-slate-900">$86,400</p>
            <p className="text-sm text-[#06B6D4] font-medium mt-2">↑ 10% from last month</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="rounded-2xl p-6 bg-white border border-slate-200 shadow-sm"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 rounded-xl bg-gradient-to-br from-[#F59E0B]/20 to-[#D97706]/20">
                <PieChart size={24} className="text-[#F59E0B]" />
              </div>
            </div>
            <p className="text-sm text-slate-600 mb-1">Profit Margin</p>
            <p className="text-3xl font-bold text-slate-900">70.7%</p>
            <p className="text-sm text-[#F59E0B] font-medium mt-2">Healthy margin</p>
          </motion.div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Monthly Revenue Trend */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="rounded-2xl p-6 bg-white border border-slate-200 shadow-sm"
          >
            <h3 className="text-lg font-semibold text-slate-900 mb-4" style={{ fontFamily: "var(--font-display)" }}>
              Monthly Revenue & Expenses
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyRevenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="month" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip contentStyle={{ backgroundColor: "#f1f5f9", border: "1px solid #e2e8f0", borderRadius: "8px" }} />
                <Legend />
                <Line type="monotone" dataKey="revenue" stroke="#3ECF8E" strokeWidth={2} dot={{ fill: "#3ECF8E" }} />
                <Line type="monotone" dataKey="expenses" stroke="#EF4444" strokeWidth={2} dot={{ fill: "#EF4444" }} />
              </LineChart>
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
              <PieChartComponent>
                <Pie data={expenseCategories} cx="50%" cy="50%" labelLine={false} label={({ name, percentage }) => `${name} ${percentage}%`} outerRadius={80} fill="#8884d8" dataKey="value">
                  {expenseCategories.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `$${value}`} />
              </PieChartComponent>
            </ResponsiveContainer>
          </motion.div>
        </div>

        {/* Financial Ledger */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="rounded-2xl p-6 bg-white border border-slate-200 shadow-sm"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-slate-900" style={{ fontFamily: "var(--font-display)" }}>
              Financial Ledger
            </h3>
            <button className="flex items-center gap-2 px-3 py-2 text-sm text-slate-700 border border-slate-200 rounded-lg hover:bg-slate-50 transition-all">
              <Download size={16} />
              Export
            </button>
          </div>

          {/* Filters */}
          <div className="flex gap-3 mb-6">
            <div className="flex-1 relative">
              <Search size={16} className="absolute left-3 top-3 text-slate-400" />
              <input
                type="text"
                value={searchLedger}
                onChange={(e) => setSearchLedger(e.target.value)}
                placeholder="Search transactions..."
                className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg text-sm outline-none focus:border-[#3ECF8E] transition-colors"
              />
            </div>
            <select
              value={selectedLedgerFilter}
              onChange={(e) => setSelectedLedgerFilter(e.target.value)}
              className="px-4 py-2 border border-slate-200 rounded-lg text-sm outline-none focus:border-[#3ECF8E] transition-colors"
            >
              <option value="all">All Transactions</option>
              <option value="income">Income</option>
              <option value="expense">Expenses</option>
            </select>
          </div>

          {/* Ledger Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left py-3 px-4 font-semibold text-slate-700">Date</th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-700">Description</th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-700">Category</th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-700">Property</th>
                  <th className="text-right py-3 px-4 font-semibold text-slate-700">Amount</th>
                </tr>
              </thead>
              <tbody>
                {filteredLedger.map((item) => (
                  <tr key={item.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-4 text-slate-600">{item.date}</td>
                    <td className="py-3 px-4 text-slate-900 font-medium">{item.description}</td>
                    <td className="py-3 px-4">
                      <span className="text-xs font-medium px-2 py-1 rounded-full bg-slate-100 text-slate-700">{item.category}</span>
                    </td>
                    <td className="py-3 px-4 text-slate-600">{item.property}</td>
                    <td className={`py-3 px-4 text-right font-semibold ${item.type === "income" ? "text-[#3ECF8E]" : "text-[#EF4444]"}`}>
                      {item.amount}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Monthly Reports */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="rounded-2xl p-6 bg-white border border-slate-200 shadow-sm"
        >
          <h3 className="text-lg font-semibold text-slate-900 mb-4" style={{ fontFamily: "var(--font-display)" }}>
            Monthly Reports
          </h3>
          <div className="space-y-3">
            {monthlyReports.map((report, idx) => (
              <div key={idx} className="flex items-center justify-between p-4 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors">
                <div className="flex items-center gap-3 flex-1">
                  <div className="p-2 rounded-lg bg-[#3ECF8E]/10">
                    <FileText size={20} className="text-[#3ECF8E]" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">{report.month}</p>
                    <p className="text-sm text-slate-600">
                      Revenue: {report.revenue} • Expenses: {report.expenses} • Profit: {report.profit}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${report.status === "Current" ? "bg-[#3ECF8E]/20 text-[#3ECF8E]" : "bg-slate-200 text-slate-700"}`}>
                    {report.status}
                  </span>
                  <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                    <Download size={16} className="text-slate-600" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* AI Insights Panel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.9 }}
          className="rounded-2xl p-6 bg-gradient-to-br from-[#3ECF8E]/10 to-[#06B6D4]/10 border border-[#3ECF8E]/20 shadow-sm"
        >
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-lg bg-[#3ECF8E]/20 flex-shrink-0">
              <Sparkles size={24} className="text-[#3ECF8E]" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-900 mb-3" style={{ fontFamily: "var(--font-display)" }}>
                AI Financial Insights
              </h3>
              <div className="space-y-3 text-sm text-slate-700" style={{ fontFamily: "var(--font-body)" }}>
                <p>
                  <strong>Strong Revenue Growth:</strong> Your portfolio revenue has grown 8% month-over-month, reaching $122,200 in total revenue. This positive trend indicates healthy property performance and tenant satisfaction.
                </p>
                <p>
                  <strong>Expense Optimization:</strong> Maintenance costs represent 35% of expenses ($2,850). Consider scheduling preventive maintenance to reduce emergency repairs and lower costs by 10-15%.
                </p>
                <p>
                  <strong>Profit Margin Analysis:</strong> Your 70.7% profit margin is excellent. Focus on maintaining current operational efficiency while exploring opportunities to increase rental rates on renewal.
                </p>
                <p>
                  <strong>Tax Planning:</strong> With current profit levels, consider tax-advantaged strategies. Property tax deductions and depreciation can reduce taxable income. Recommend consulting with tax professional for Q2 planning.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Footer */}
        <div className="text-center py-8">
          <p className="text-sm text-slate-600" style={{ fontFamily: "var(--font-body)" }}>
            Need help? <a href="#" className="text-[#3ECF8E] hover:underline font-medium">Contact support</a>
          </p>
        </div>
      </div>
    </div>
  );
}
