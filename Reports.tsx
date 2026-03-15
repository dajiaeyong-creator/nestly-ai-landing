/*
 * Reports Page
 * Financial and operational analytics for property owners and investors
 */

import { motion } from "framer-motion";
import { BarChart3, PieChart, TrendingUp, Download, Share2, FileText, Sparkles, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { LineChart, Line, BarChart, Bar, PieChart as PieChartComponent, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const reportCategories = [
  {
    id: "financial",
    name: "Financial Reports",
    icon: "💰",
    color: "from-green-500 to-green-600",
    reports: [
      {
        id: "fin-1",
        title: "Revenue by Property",
        description: "Monthly revenue breakdown across all properties",
        data: [
          { property: "Downtown Apt", revenue: 12500 },
          { property: "Midtown House", revenue: 8900 },
          { property: "Uptown Loft", revenue: 15200 },
          { property: "Suburban Home", revenue: 6800 },
        ],
        insight: "Uptown Loft generates 34% of total revenue. Downtown Apartment shows 8% growth month-over-month.",
        lastGenerated: "2 hours ago",
      },
      {
        id: "fin-2",
        title: "Expense Breakdown",
        description: "Categorized operational expenses",
        data: [
          { name: "Maintenance", value: 4200, percentage: 28 },
          { name: "Utilities", value: 3100, percentage: 21 },
          { name: "Property Tax", value: 5600, percentage: 38 },
          { name: "Insurance", value: 1800, percentage: 12 },
          { name: "Other", value: 300, percentage: 2 },
        ],
        insight: "Property tax represents largest expense at 38%. Maintenance costs trending up 12% YoY.",
        lastGenerated: "1 day ago",
      },
      {
        id: "fin-3",
        title: "Net Operating Income",
        description: "NOI trends and projections",
        data: [
          { month: "Jan", noi: 28500 },
          { month: "Feb", noi: 31200 },
          { month: "Mar", noi: 29800 },
          { month: "Apr", noi: 34100 },
          { month: "May", noi: 36900 },
          { month: "Jun", noi: 38200 },
        ],
        insight: "NOI increased 34% over 6 months. Projected annual NOI: $445,000.",
        lastGenerated: "3 hours ago",
      },
    ],
  },
  {
    id: "portfolio",
    name: "Portfolio Performance",
    icon: "📊",
    color: "from-blue-500 to-blue-600",
    reports: [
      {
        id: "port-1",
        title: "Occupancy Rate",
        description: "Property occupancy trends",
        data: [
          { property: "Downtown Apt", occupancy: 95 },
          { property: "Midtown House", occupancy: 88 },
          { property: "Uptown Loft", occupancy: 100 },
          { property: "Suburban Home", occupancy: 75 },
        ],
        insight: "Portfolio average occupancy: 89.5%. Suburban Home below target—consider rent adjustment.",
        lastGenerated: "1 hour ago",
      },
      {
        id: "port-2",
        title: "Rent Growth",
        description: "Year-over-year rent increases",
        data: [
          { month: "Jan", growth: 2.1 },
          { month: "Feb", growth: 2.3 },
          { month: "Mar", growth: 2.5 },
          { month: "Apr", growth: 3.1 },
          { month: "May", growth: 3.4 },
          { month: "Jun", growth: 3.8 },
        ],
        insight: "Rent growth accelerating. Market conditions favorable for 4-5% increases next quarter.",
        lastGenerated: "2 hours ago",
      },
      {
        id: "port-3",
        title: "Vacancy Trends",
        description: "Vacancy analysis and forecasts",
        data: [
          { month: "Jan", vacancy: 8 },
          { month: "Feb", vacancy: 7 },
          { month: "Mar", vacancy: 9 },
          { month: "Apr", vacancy: 6 },
          { month: "May", vacancy: 5 },
          { month: "Jun", vacancy: 10.5 },
        ],
        insight: "Vacancy trending down 38% YoY. Current vacancy rate: 10.5% (above target of 8%).",
        lastGenerated: "4 hours ago",
      },
    ],
  },
  {
    id: "investor",
    name: "Investor Reports",
    icon: "📈",
    color: "from-purple-500 to-purple-600",
    reports: [
      {
        id: "inv-1",
        title: "Property ROI",
        description: "Return on investment by property",
        data: [
          { property: "Downtown Apt", roi: 12.5 },
          { property: "Midtown House", roi: 9.8 },
          { property: "Uptown Loft", roi: 15.2 },
          { property: "Suburban Home", roi: 7.3 },
        ],
        insight: "Portfolio average ROI: 11.2%. Uptown Loft outperforming at 15.2%.",
        lastGenerated: "2 hours ago",
      },
      {
        id: "inv-2",
        title: "Cash Flow Projections",
        description: "12-month cash flow forecast",
        data: [
          { month: "Jul", projected: 38500 },
          { month: "Aug", projected: 39200 },
          { month: "Sep", projected: 40100 },
          { month: "Oct", projected: 41300 },
          { month: "Nov", projected: 42100 },
          { month: "Dec", projected: 43500 },
        ],
        insight: "Projected 6-month cash flow: $244,700. Growth rate: 3.2% monthly.",
        lastGenerated: "1 hour ago",
      },
      {
        id: "inv-3",
        title: "Distribution Summaries",
        description: "Investor distribution history",
        data: [
          { quarter: "Q1", distribution: 85000 },
          { quarter: "Q2", distribution: 92000 },
          { quarter: "Q3", distribution: 98500 },
          { quarter: "Q4", distribution: 105200 },
        ],
        insight: "Annual distributions trending up 24%. Next distribution projected: $28,600 (Q3).",
        lastGenerated: "3 hours ago",
      },
    ],
  },
  {
    id: "operational",
    name: "Operational Reports",
    icon: "🔧",
    color: "from-orange-500 to-orange-600",
    reports: [
      {
        id: "op-1",
        title: "Maintenance Cost Trends",
        description: "Maintenance spending analysis",
        data: [
          { month: "Jan", cost: 2100 },
          { month: "Feb", cost: 1900 },
          { month: "Mar", cost: 2400 },
          { month: "Apr", cost: 2800 },
          { month: "May", cost: 3200 },
          { month: "Jun", cost: 3500 },
        ],
        insight: "Maintenance costs up 67% YoY. Recommend preventive maintenance program.",
        lastGenerated: "2 hours ago",
      },
      {
        id: "op-2",
        title: "Vendor Performance",
        description: "Vendor ratings and efficiency metrics",
        data: [
          { vendor: "ProFix Plumbing", rating: 4.8, jobs: 24 },
          { vendor: "ElectroWorks", rating: 4.6, jobs: 18 },
          { vendor: "Climate Control", rating: 4.9, jobs: 15 },
          { vendor: "QuickRepairs", rating: 4.2, jobs: 12 },
        ],
        insight: "Climate Control highest rated (4.9/5). ProFix Plumbing most utilized (24 jobs).",
        lastGenerated: "1 hour ago",
      },
    ],
  },
];

export default function Reports() {
  const [categories, setCategories] = useState(reportCategories as any);
  const [expandedCategory, setExpandedCategory] = useState<string | null>("financial");
  const [selectedReport, setSelectedReport] = useState<string | null>(null);

  interface Report {
    id: string;
    title: string;
    description: string;
    data: Record<string, any>[];
    insight: string;
    lastGenerated: string;
  }

  const exportReport = (format: "pdf" | "csv", reportTitle: string) => {
    toast.success(`Exporting ${reportTitle} as ${format.toUpperCase()}...`);
  };

  const shareReport = (reportTitle: string) => {
    toast.success(`Share link copied for ${reportTitle}`);
  };

  const currentReport: Report | undefined = categories
    .flatMap((cat: any) => cat.reports)
    .find((rep: any) => rep.id === selectedReport);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-slate-50 to-blue-50">
      {/* Header */}
      <div className="sticky top-0 z-20 border-b border-slate-100 bg-white/80 backdrop-blur-md shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600">
                <BarChart3 size={20} className="text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-900" style={{ fontFamily: "var(--font-display)" }}>
                  Reports & Analytics
                </h1>
                <p className="text-sm text-slate-500">Financial and operational insights</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Report Categories Sidebar */}
          <div className="lg:col-span-1">
            <div className="space-y-2 sticky top-24">
              {categories.map((category: any) => (
                <motion.button
                  key={category.id}
                  onClick={() => setExpandedCategory(expandedCategory === category.id ? null : category.id)}
                  className={`w-full text-left p-4 rounded-xl transition-all ${
                    expandedCategory === category.id
                      ? "bg-gradient-to-r " + category.color + " text-white shadow-lg"
                      : "bg-white border border-slate-200 text-slate-900 hover:border-slate-300"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{category.icon}</span>
                      <div>
                        <p className="font-semibold">{category.name}</p>
                        <p className={`text-xs ${expandedCategory === category.id ? "text-white/80" : "text-slate-500"}`}>
                          {category.reports.length} reports
                        </p>
                      </div>
                    </div>
                    {expandedCategory === category.id ? (
                      <ChevronUp size={18} />
                    ) : (
                      <ChevronDown size={18} />
                    )}
                  </div>

                  {/* Expanded Reports List */}
                  {expandedCategory === category.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      transition={{ duration: 0.3 }}
                      className="mt-3 pt-3 border-t border-white/20 space-y-2"
                    >
                      {category.reports.map((report: any) => (
                        <button
                          key={report.id}
                          onClick={() => setSelectedReport(report.id)}
                          className={`w-full text-left p-2 rounded-lg text-sm transition-all ${
                            selectedReport === report.id
                              ? "bg-white/20 text-white"
                              : "text-white/70 hover:text-white hover:bg-white/10"
                          }`}
                        >
                          {report.title}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Report Content */}
          <div className="lg:col-span-2">
            {selectedReport && currentReport ? (
              <motion.div
                key={selectedReport}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                {/* Report Header */}
                <div className="rounded-2xl p-6 bg-white border border-slate-200 shadow-sm">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h2 className="text-2xl font-bold text-slate-900 mb-2" style={{ fontFamily: "var(--font-display)" }}>
                        {currentReport.title}
                      </h2>
                      <p className="text-slate-600">{currentReport.description}</p>
                      <p className="text-xs text-slate-500 mt-2">Last generated: {currentReport.lastGenerated}</p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => exportReport("pdf", currentReport.title)}
                        className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 transition-all"
                        title="Download PDF"
                      >
                        <Download size={18} />
                      </button>
                      <button
                        onClick={() => exportReport("csv", currentReport.title)}
                        className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 transition-all"
                        title="Export CSV"
                      >
                        <FileText size={18} />
                      </button>
                      <button
                        onClick={() => shareReport(currentReport.title)}
                        className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 transition-all"
                        title="Share"
                      >
                        <Share2 size={18} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Chart */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="rounded-2xl p-6 bg-white border border-slate-200 shadow-sm"
                >
                  <ResponsiveContainer width="100%" height={300}>
                    {currentReport?.id.includes("fin-1") || currentReport?.id.includes("port-1") ? (
                      <BarChart data={currentReport.data}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                        <XAxis dataKey={Object.keys(currentReport.data[0])[0]} />
                        <YAxis />
                        <Tooltip />
                        <Bar
                          dataKey={Object.keys(currentReport.data[0])[1]}
                          fill="#3ECF8E"
                          radius={[8, 8, 0, 0]}
                        />
                      </BarChart>
                    ) : currentReport?.id.includes("fin-2") ? (
                      <PieChartComponent>
                        <Pie
                          data={currentReport.data}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percentage }) => `${name} ${percentage}%`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {currentReport.data.map((entry, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={["#3ECF8E", "#06B6D4", "#8B5CF6", "#F59E0B", "#EF4444"][index % 5]}
                            />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChartComponent>
                    ) : (
                      <LineChart data={currentReport.data}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                        <XAxis dataKey={Object.keys(currentReport.data[0])[0]} />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line
                          type="monotone"
                          dataKey={Object.keys(currentReport.data[0])[1]}
                          stroke="#3ECF8E"
                          strokeWidth={2}
                          dot={{ fill: "#3ECF8E", r: 4 }}
                        />
                      </LineChart>
                    )}
                  </ResponsiveContainer>
                </motion.div>

                {/* AI Insights */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="rounded-2xl p-6 bg-gradient-to-br from-purple-50 to-blue-50 border-2 border-purple-200 shadow-sm"
                >
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 flex-shrink-0">
                      <Sparkles size={18} className="text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-slate-900 mb-2">AI Insights</h3>
                      <p className="text-slate-700">{currentReport.insight}</p>
                    </div>
                  </div>
                </motion.div>

                {/* Export Options */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="rounded-2xl p-6 bg-white border border-slate-200 shadow-sm"
                >
                  <h3 className="font-semibold text-slate-900 mb-4">Export & Share</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <button
                      onClick={() => exportReport("pdf", currentReport.title)}
                      className="p-3 rounded-lg border-2 border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all text-left"
                    >
                      <p className="font-medium text-slate-900 flex items-center gap-2">
                        <Download size={16} /> Download PDF
                      </p>
                      <p className="text-xs text-slate-500 mt-1">High-quality formatted report</p>
                    </button>
                    <button
                      onClick={() => exportReport("csv", currentReport.title)}
                      className="p-3 rounded-lg border-2 border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all text-left"
                    >
                      <p className="font-medium text-slate-900 flex items-center gap-2">
                        <FileText size={16} /> Export CSV
                      </p>
                      <p className="text-xs text-slate-500 mt-1">For spreadsheet analysis</p>
                    </button>
                    <button
                      onClick={() => shareReport(currentReport.title)}
                      className="p-3 rounded-lg border-2 border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all text-left"
                    >
                      <p className="font-medium text-slate-900 flex items-center gap-2">
                        <Share2 size={16} /> Share Report
                      </p>
                      <p className="text-xs text-slate-500 mt-1">Generate shareable link</p>
                    </button>
                  </div>
                </motion.div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="rounded-2xl p-12 bg-white border border-slate-200 shadow-sm text-center"
              >
                <TrendingUp size={48} className="mx-auto text-slate-300 mb-4" />
                <p className="text-slate-500 text-lg">Select a report to view analytics</p>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
