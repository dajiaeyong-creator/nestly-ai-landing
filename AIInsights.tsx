/*
 * AI Insights Page
 * Nestly shows underperforming properties, revenue forecasts, rent pricing recommendations, expense anomalies
 */

import { motion } from "framer-motion";
import { TrendingUp, AlertTriangle, Lightbulb, BarChart3, DollarSign, Home, TrendingDown, CheckCircle } from "lucide-react";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const revenueData = [
  { month: "Jan", actual: 12000, forecast: 12500 },
  { month: "Feb", actual: 13500, forecast: 13800 },
  { month: "Mar", actual: 12800, forecast: 14200 },
  { month: "Apr", actual: 14000, forecast: 14500 },
  { month: "May", actual: 13200, forecast: 15000 },
  { month: "Jun", actual: 15500, forecast: 15800 },
];

const expenseAnomalies = [
  { id: 1, property: "Downtown Apartment", category: "Utilities", amount: 450, expected: 280, variance: "+61%", severity: "high" },
  { id: 2, property: "Midtown House", category: "Maintenance", amount: 1200, expected: 800, variance: "+50%", severity: "high" },
  { id: 3, property: "Uptown Loft", category: "Insurance", amount: 350, expected: 320, variance: "+9%", severity: "low" },
];

const underperformingProperties = [
  {
    id: 1,
    name: "Downtown Apartment",
    occupancy: 65,
    targetOccupancy: 95,
    revenue: 8500,
    targetRevenue: 12000,
    recommendation: "Reduce rent by 5-8% to improve occupancy",
    score: 42,
  },
  {
    id: 2,
    name: "Midtown House",
    occupancy: 85,
    targetOccupancy: 95,
    revenue: 10200,
    targetRevenue: 12000,
    recommendation: "Increase rent by 3-5% based on market analysis",
    score: 72,
  },
  {
    id: 3,
    name: "Uptown Loft",
    occupancy: 100,
    targetOccupancy: 95,
    revenue: 14000,
    targetRevenue: 14000,
    recommendation: "Maintain current pricing strategy",
    score: 95,
  },
];

const pricingRecommendations = [
  {
    property: "Downtown Apartment",
    currentPrice: 1200,
    recommendedPrice: 1140,
    change: "-5%",
    reason: "Market analysis shows oversupply in area",
  },
  {
    property: "Midtown House",
    currentPrice: 1700,
    recommendedPrice: 1750,
    change: "+3%",
    reason: "Strong demand, low vacancy rates",
  },
  {
    property: "Uptown Loft",
    currentPrice: 2800,
    recommendedPrice: 2850,
    change: "+2%",
    reason: "Premium location, high demand",
  },
];

export default function AIInsights() {
  const getScoreColor = (score: number) => {
    if (score >= 80) return "from-green-500 to-green-600";
    if (score >= 60) return "from-yellow-500 to-yellow-600";
    return "from-red-500 to-red-600";
  };

  const getSeverityColor = (severity: string) => {
    if (severity === "high") return "bg-red-100 text-red-700";
    return "bg-yellow-100 text-yellow-700";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-slate-50 to-blue-50">
      {/* Header */}
      <div className="sticky top-0 z-20 border-b border-slate-100 bg-white/80 backdrop-blur-md shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-gradient-to-br from-purple-500 to-purple-600">
              <Lightbulb size={20} className="text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900" style={{ fontFamily: "var(--font-display)" }}>
                AI Insights
              </h1>
              <p className="text-sm text-slate-500">Predictive analytics and recommendations</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
        {/* Revenue Forecast */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="rounded-2xl p-6 bg-white border border-slate-200 shadow-sm"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-semibold text-slate-900" style={{ fontFamily: "var(--font-display)" }}>
                Revenue Forecast
              </h2>
              <p className="text-sm text-slate-600">6-month projection vs. actual revenue</p>
            </div>
            <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600">
              <TrendingUp size={20} className="text-white" />
            </div>
          </div>

          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="month" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip contentStyle={{ backgroundColor: "#1e293b", border: "none", borderRadius: "8px", color: "#fff" }} />
              <Legend />
              <Line type="monotone" dataKey="actual" stroke="#3ECF8E" strokeWidth={2} dot={{ fill: "#3ECF8E" }} />
              <Line type="monotone" dataKey="forecast" stroke="#06B6D4" strokeWidth={2} strokeDasharray="5 5" dot={{ fill: "#06B6D4" }} />
            </LineChart>
          </ResponsiveContainer>

          <div className="mt-4 p-4 rounded-lg bg-blue-50 border border-blue-200">
            <p className="text-sm text-blue-900">
              <strong>AI Insight:</strong> Revenue is trending 8% below forecast. Recommend increasing marketing efforts for Downtown Apartment and Midtown House to improve occupancy.
            </p>
          </div>
        </motion.div>

        {/* Underperforming Properties */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="rounded-2xl p-6 bg-white border border-slate-200 shadow-sm"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-semibold text-slate-900" style={{ fontFamily: "var(--font-display)" }}>
                Property Performance
              </h2>
              <p className="text-sm text-slate-600">AI-scored performance metrics</p>
            </div>
            <div className="p-2 rounded-lg bg-gradient-to-br from-red-500 to-red-600">
              <AlertTriangle size={20} className="text-white" />
            </div>
          </div>

          <div className="space-y-4">
            {underperformingProperties.map((property) => (
              <div key={property.id} className="p-4 rounded-xl border border-slate-200 hover:border-slate-300 transition-all">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-slate-100">
                      <Home size={18} className="text-slate-700" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900">{property.name}</h3>
                      <p className="text-xs text-slate-600">{property.recommendation}</p>
                    </div>
                  </div>
                  <div className={`px-4 py-2 rounded-lg text-white font-bold bg-gradient-to-r ${getScoreColor(property.score)}`}>
                    {property.score}%
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div>
                    <p className="text-xs text-slate-600 mb-1">Occupancy</p>
                    <p className="font-semibold text-slate-900">{property.occupancy}%</p>
                    <p className="text-xs text-slate-500">Target: {property.targetOccupancy}%</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-600 mb-1">Revenue</p>
                    <p className="font-semibold text-slate-900">${property.revenue.toLocaleString()}</p>
                    <p className="text-xs text-slate-500">Target: ${property.targetRevenue.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-600 mb-1">Status</p>
                    <div className="flex items-center gap-1">
                      {property.score >= 80 ? (
                        <>
                          <CheckCircle size={16} className="text-green-600" />
                          <span className="text-sm font-medium text-green-600">Healthy</span>
                        </>
                      ) : property.score >= 60 ? (
                        <>
                          <AlertTriangle size={16} className="text-yellow-600" />
                          <span className="text-sm font-medium text-yellow-600">Monitor</span>
                        </>
                      ) : (
                        <>
                          <TrendingDown size={16} className="text-red-600" />
                          <span className="text-sm font-medium text-red-600">Action Needed</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Rent Pricing Recommendations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="rounded-2xl p-6 bg-white border border-slate-200 shadow-sm"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-semibold text-slate-900" style={{ fontFamily: "var(--font-display)" }}>
                Rent Pricing Recommendations
              </h2>
              <p className="text-sm text-slate-600">AI-optimized pricing based on market analysis</p>
            </div>
            <div className="p-2 rounded-lg bg-gradient-to-br from-green-500 to-green-600">
              <DollarSign size={20} className="text-white" />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left py-3 px-4 font-semibold text-slate-700">Property</th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-700">Current Price</th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-700">Recommended</th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-700">Change</th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-700">Reason</th>
                </tr>
              </thead>
              <tbody>
                {pricingRecommendations.map((rec, idx) => (
                  <tr key={idx} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-4 font-medium text-slate-900">{rec.property}</td>
                    <td className="py-3 px-4 text-slate-600">${rec.currentPrice.toLocaleString()}</td>
                    <td className="py-3 px-4 font-semibold text-slate-900">${rec.recommendedPrice.toLocaleString()}</td>
                    <td className="py-3 px-4">
                      <span className={`font-semibold ${rec.change.startsWith("+") ? "text-green-600" : "text-red-600"}`}>
                        {rec.change}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-slate-600 text-xs">{rec.reason}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Expense Anomalies */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="rounded-2xl p-6 bg-white border border-slate-200 shadow-sm"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-semibold text-slate-900" style={{ fontFamily: "var(--font-display)" }}>
                Expense Anomalies
              </h2>
              <p className="text-sm text-slate-600">Unusual spending patterns detected</p>
            </div>
            <div className="p-2 rounded-lg bg-gradient-to-br from-yellow-500 to-yellow-600">
              <BarChart3 size={20} className="text-white" />
            </div>
          </div>

          <div className="space-y-3">
            {expenseAnomalies.map((anomaly) => (
              <div key={anomaly.id} className="p-4 rounded-xl border border-slate-200">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-semibold text-slate-900">{anomaly.property}</h3>
                    <p className="text-sm text-slate-600">{anomaly.category}</p>
                  </div>
                  <span className={`text-xs font-semibold px-2 py-1 rounded-full ${getSeverityColor(anomaly.severity)}`}>
                    {anomaly.variance}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex gap-4">
                    <div>
                      <p className="text-xs text-slate-600">Actual</p>
                      <p className="font-semibold text-slate-900">${anomaly.amount}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-600">Expected</p>
                      <p className="font-semibold text-slate-900">${anomaly.expected}</p>
                    </div>
                  </div>
                  <button className="px-3 py-1 text-sm font-medium text-[#3ECF8E] hover:bg-[#3ECF8E]/10 rounded-lg transition-colors">
                    Investigate
                  </button>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
