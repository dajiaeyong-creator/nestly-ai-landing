/*
 * Portfolio Command Center Dashboard
 * AI-first dashboard with operational alerts, metrics, and analytics
 */

import { motion } from "framer-motion";
import {
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { TrendingUp, DollarSign, Home, Users, Bell, Sparkles, AlertCircle, Wrench, Scale } from "lucide-react";
import { useState } from "react";
import AINavigationSidebar from "@/components/AINavigationSidebar";

// Sample data
const rentCollectionData = [
  { month: "Jan", collected: 12500 },
  { month: "Feb", collected: 13200 },
  { month: "Mar", collected: 14100 },
  { month: "Apr", collected: 13800 },
  { month: "May", collected: 15200 },
  { month: "Jun", collected: 16500 },
  { month: "Jul", collected: 17200 },
  { month: "Aug", collected: 18100 },
  { month: "Sep", collected: 19500 },
  { month: "Oct", collected: 20300 },
  { month: "Nov", collected: 21200 },
  { month: "Dec", collected: 22500 },
];

const tenantPaymentStatusData = [
  { name: "Paid", value: 142, fill: "#3ECF8E" },
  { name: "Pending", value: 18, fill: "#FFA500" },
  { name: "Overdue", value: 5, fill: "#EF4444" },
];

export default function Dashboard() {
  return (
    <div className="flex h-screen bg-gradient-to-br from-white via-slate-50 to-white">
      {/* Sidebar */}
      <AINavigationSidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="sticky top-0 z-20 border-b border-slate-100 bg-white/80 backdrop-blur-md shadow-sm">
          <div className="px-6 py-3">
            {/* Header Row */}
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-gradient-to-br from-[#3ECF8E] to-[#2FBF9B]">
                  <Sparkles size={20} className="text-white" />
                </div>
                <h1 className="text-2xl font-bold text-slate-900" style={{ fontFamily: "var(--font-display)" }}>
                  Portfolio Command Center
                </h1>
              </div>

              <div className="flex items-center gap-3">
                <button className="p-2 rounded-lg hover:bg-slate-100 transition-colors text-slate-600 hover:text-slate-900">
                  <Bell size={20} />
                </button>
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#3ECF8E] to-[#2FBF9B] flex items-center justify-center text-white font-semibold text-sm">
                  PO
                </div>
              </div>
            </div>

            {/* AI Command Bar */}
            <div className="flex gap-3 items-center">
              <input
                type="text"
                placeholder="Ask Nestly anything..."
                className="flex-1 px-4 py-2 bg-white border border-slate-200 rounded-lg outline-none text-sm text-slate-900 placeholder-slate-400 hover:border-slate-300 focus:border-[#3ECF8E] transition-colors"
                style={{ fontFamily: "var(--font-body)" }}
              />
              <button className="px-4 py-2 bg-gradient-to-r from-[#3ECF8E] to-[#2FBF9B] text-white rounded-lg font-medium hover:shadow-lg transition-all flex items-center gap-2 whitespace-nowrap">
                <Sparkles size={16} />
                Ask
              </button>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-auto">
          <div className="max-w-7xl mx-auto px-6 py-6 space-y-6">
            {/* Operational Alerts */}
            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-4" style={{ fontFamily: "var(--font-display)" }}>
                Operational Alerts
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Alert Card 1 */}
                <div className="rounded-2xl p-6 border-l-4 border-amber-500 bg-white shadow-sm hover:shadow-md transition-all">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-lg bg-amber-100">
                        <AlertCircle size={20} className="text-amber-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-slate-900" style={{ fontFamily: "var(--font-display)" }}>
                          Upcoming Lease Expirations
                        </h3>
                        <p className="text-sm text-slate-600 mt-1" style={{ fontFamily: "var(--font-body)" }}>
                          3 leases expiring in 90 days
                        </p>
                      </div>
                    </div>
                    <button className="px-3 py-1 text-xs font-medium text-slate-700 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors">
                      View
                    </button>
                  </div>
                </div>

                {/* Alert Card 2 */}
                <div className="rounded-2xl p-6 border-l-4 border-orange-500 bg-white shadow-sm hover:shadow-md transition-all">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-lg bg-orange-100">
                        <Wrench size={20} className="text-orange-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-slate-900" style={{ fontFamily: "var(--font-display)" }}>
                          Maintenance Requests
                        </h3>
                        <p className="text-sm text-slate-600 mt-1" style={{ fontFamily: "var(--font-body)" }}>
                          7 pending maintenance requests
                        </p>
                      </div>
                    </div>
                    <button className="px-3 py-1 text-xs font-medium text-slate-700 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors">
                      Manage
                    </button>
                  </div>
                </div>

                {/* Alert Card 3 */}
                <div className="rounded-2xl p-6 border-l-4 border-red-500 bg-white shadow-sm hover:shadow-md transition-all">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-lg bg-red-100">
                        <Scale size={20} className="text-red-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-slate-900" style={{ fontFamily: "var(--font-display)" }}>
                          Eviction Workflow Status
                        </h3>
                        <p className="text-sm text-slate-600 mt-1" style={{ fontFamily: "var(--font-body)" }}>
                          2 active eviction workflows in progress
                        </p>
                      </div>
                    </div>
                    <button className="px-3 py-1 text-xs font-medium text-slate-700 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors">
                      Review
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Portfolio Metrics */}
            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-4" style={{ fontFamily: "var(--font-display)" }}>
                Portfolio Metrics
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Metric 1 */}
                <div className="rounded-2xl p-6 bg-white border border-slate-200 hover:border-slate-300 shadow-sm hover:shadow-lg transition-all">
                  <p className="text-sm text-slate-600 mb-2" style={{ fontFamily: "var(--font-body)" }}>
                    Total Revenue
                  </p>
                  <h3 className="text-3xl font-bold text-slate-900" style={{ fontFamily: "var(--font-display)" }}>
                    $22,500
                  </h3>
                  <p className="text-xs text-[#3ECF8E] mt-2 font-medium" style={{ fontFamily: "var(--font-body)" }}>
                    ↑ 8.5% from last month
                  </p>
                  <div className="absolute top-6 right-6 w-12 h-12 rounded-xl bg-gradient-to-br from-[#3ECF8E] to-[#2FBF9B] flex items-center justify-center text-white shadow-lg">
                    <DollarSign size={24} />
                  </div>
                </div>

                {/* Metric 2 */}
                <div className="rounded-2xl p-6 bg-white border border-slate-200 hover:border-slate-300 shadow-sm hover:shadow-lg transition-all">
                  <p className="text-sm text-slate-600 mb-2" style={{ fontFamily: "var(--font-body)" }}>
                    Collection Rate
                  </p>
                  <h3 className="text-3xl font-bold text-slate-900" style={{ fontFamily: "var(--font-display)" }}>
                    96.2%
                  </h3>
                  <p className="text-xs text-[#3ECF8E] mt-2 font-medium" style={{ fontFamily: "var(--font-body)" }}>
                    ↑ 2.1% from last month
                  </p>
                  <div className="absolute top-6 right-6 w-12 h-12 rounded-xl bg-gradient-to-br from-[#06B6D4] to-[#0891B2] flex items-center justify-center text-white shadow-lg">
                    <TrendingUp size={24} />
                  </div>
                </div>

                {/* Metric 3 */}
                <div className="rounded-2xl p-6 bg-white border border-slate-200 hover:border-slate-300 shadow-sm hover:shadow-lg transition-all">
                  <p className="text-sm text-slate-600 mb-2" style={{ fontFamily: "var(--font-body)" }}>
                    Properties
                  </p>
                  <h3 className="text-3xl font-bold text-slate-900" style={{ fontFamily: "var(--font-display)" }}>
                    5
                  </h3>
                  <p className="text-xs text-[#3ECF8E] mt-2 font-medium" style={{ fontFamily: "var(--font-body)" }}>
                    All performing well
                  </p>
                  <div className="absolute top-6 right-6 w-12 h-12 rounded-xl bg-gradient-to-br from-[#F59E0B] to-[#D97706] flex items-center justify-center text-white shadow-lg">
                    <Home size={24} />
                  </div>
                </div>

                {/* Metric 4 */}
                <div className="rounded-2xl p-6 bg-white border border-slate-200 hover:border-slate-300 shadow-sm hover:shadow-lg transition-all">
                  <p className="text-sm text-slate-600 mb-2" style={{ fontFamily: "var(--font-body)" }}>
                    Active Tenants
                  </p>
                  <h3 className="text-3xl font-bold text-slate-900" style={{ fontFamily: "var(--font-display)" }}>
                    165
                  </h3>
                  <p className="text-xs text-[#3ECF8E] mt-2 font-medium" style={{ fontFamily: "var(--font-body)" }}>
                    ↑ 12 new tenants
                  </p>
                  <div className="absolute top-6 right-6 w-12 h-12 rounded-xl bg-gradient-to-br from-[#EC4899] to-[#DB2777] flex items-center justify-center text-white shadow-lg">
                    <Users size={24} />
                  </div>
                </div>
              </div>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Rent Collection Chart */}
              <div className="rounded-2xl p-8 bg-white border border-slate-200 shadow-sm hover:shadow-lg transition-all">
                <h2 className="text-lg font-semibold text-slate-900 mb-6" style={{ fontFamily: "var(--font-display)" }}>
                  Rent Collection Trend (12 Months)
                </h2>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={rentCollectionData}>
                    <defs>
                      <linearGradient id="colorCollected" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3ECF8E" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#3ECF8E" stopOpacity={0.1} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="month" stroke="#94a3b8" />
                    <YAxis stroke="#94a3b8" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#ffffff",
                        border: "1px solid #e2e8f0",
                        borderRadius: "12px",
                        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="collected"
                      stroke="#3ECF8E"
                      fillOpacity={1}
                      fill="url(#colorCollected)"
                      name="Collected"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              {/* Payment Status Chart */}
              <div className="rounded-2xl p-8 bg-white border border-slate-200 shadow-sm hover:shadow-lg transition-all">
                <h2 className="text-lg font-semibold text-slate-900 mb-6" style={{ fontFamily: "var(--font-display)" }}>
                  Tenant Payment Status
                </h2>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={tenantPaymentStatusData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, value }) => `${name}: ${value}`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {tenantPaymentStatusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#ffffff",
                        border: "1px solid #e2e8f0",
                        borderRadius: "12px",
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
