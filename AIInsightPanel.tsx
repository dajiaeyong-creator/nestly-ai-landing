/*
 * AI Insight Panel – Explains key trends and provides recommendations
 * Placed beneath charts and analytics to provide context and suggested actions
 */

import { motion } from "framer-motion";
import { Sparkles, TrendingUp, TrendingDown, AlertCircle, CheckCircle, ArrowRight, Lightbulb } from "lucide-react";

interface InsightAction {
  label: string;
  action: () => void;
  variant?: "primary" | "secondary";
}

interface AIInsight {
  title: string;
  description: string;
  trend?: "up" | "down" | "neutral";
  trendLabel?: string;
  keyFinding: string;
  recommendations: string[];
  suggestedActions: InsightAction[];
  severity?: "info" | "warning" | "success";
}

interface AIInsightPanelProps {
  insight: AIInsight;
  compact?: boolean;
}

const severityColors = {
  info: "bg-blue-50 border-blue-200 text-blue-900",
  warning: "bg-yellow-50 border-yellow-200 text-yellow-900",
  success: "bg-green-50 border-green-200 text-green-900",
};

const severityIcons = {
  info: <Lightbulb size={20} className="text-blue-600" />,
  warning: <AlertCircle size={20} className="text-yellow-600" />,
  success: <CheckCircle size={20} className="text-green-600" />,
};

export default function AIInsightPanel({ insight, compact = false }: AIInsightPanelProps) {
  const severity = insight.severity || "info";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`border rounded-lg p-6 ${severityColors[severity]} ${compact ? "p-4" : ""}`}
    >
      {/* Header */}
      <div className="flex items-start gap-3 mb-4">
        <div className="flex-shrink-0 mt-1">{severityIcons[severity]}</div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-bold text-lg" style={{ fontFamily: "var(--font-display)" }}>
              {insight.title}
            </h3>
            {insight.trend && (
              <div className="flex items-center gap-1 text-sm font-medium">
                {insight.trend === "up" && <TrendingUp size={16} className="text-green-600" />}
                {insight.trend === "down" && <TrendingDown size={16} className="text-red-600" />}
                {insight.trendLabel && <span>{insight.trendLabel}</span>}
              </div>
            )}
          </div>
          <p className="text-sm opacity-90" style={{ fontFamily: "var(--font-body)" }}>
            {insight.description}
          </p>
        </div>
      </div>

      {/* Key Finding */}
      <div className="mb-4 p-3 bg-white/50 rounded-lg border border-current/10">
        <p className="text-sm font-medium mb-1" style={{ fontFamily: "var(--font-body)" }}>
          Key Finding:
        </p>
        <p className="text-sm" style={{ fontFamily: "var(--font-body)" }}>
          {insight.keyFinding}
        </p>
      </div>

      {/* Recommendations */}
      {insight.recommendations.length > 0 && (
        <div className="mb-4">
          <p className="text-sm font-medium mb-2" style={{ fontFamily: "var(--font-body)" }}>
            Recommendations:
          </p>
          <ul className="space-y-1">
            {insight.recommendations.map((rec, idx) => (
              <li key={idx} className="text-sm flex gap-2" style={{ fontFamily: "var(--font-body)" }}>
                <span className="text-current/60">•</span>
                <span>{rec}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Suggested Actions */}
      {insight.suggestedActions.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {insight.suggestedActions.map((action, idx) => (
            <button
              key={idx}
              onClick={action.action}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-1 ${
                action.variant === "primary"
                  ? "bg-current/20 hover:bg-current/30 text-current"
                  : "bg-white/50 hover:bg-white/80 text-current border border-current/20"
              }`}
              style={{ fontFamily: "var(--font-body)" }}
            >
              {action.label}
              <ArrowRight size={14} />
            </button>
          ))}
        </div>
      )}
    </motion.div>
  );
}

// Preset insights for common scenarios
export const insightPresets = {
  highOccupancy: {
    title: "Strong Occupancy Performance",
    description: "Your properties are performing well above average",
    trend: "up" as const,
    trendLabel: "+8% from last month",
    keyFinding: "Downtown Apartments and Lakeside Villas are at 96% and 94% occupancy respectively. This is excellent performance.",
    recommendations: [
      "Consider slight rent increases for renewal leases",
      "Maintain current maintenance standards to preserve tenant satisfaction",
      "Monitor market rates to ensure competitive pricing",
    ],
    suggestedActions: [
      { label: "View Lease Renewals", action: () => {}, variant: "primary" as const },
      { label: "Adjust Pricing", action: () => {} },
    ],
    severity: "success" as const,
  },

  lowOccupancy: {
    title: "Low Occupancy Alert",
    description: "One or more properties are below target occupancy",
    trend: "down" as const,
    trendLabel: "-12% from target",
    keyFinding: "Sunset Plaza is at 78% occupancy, 12% below your 90% target. This is costing approximately $3,200/month in lost revenue.",
    recommendations: [
      "Review rental rates—consider promotional pricing",
      "Increase marketing and advertising spend",
      "Conduct property walkthrough to identify improvement opportunities",
      "Check maintenance issues that may deter tenants",
    ],
    suggestedActions: [
      { label: "Launch Marketing Campaign", action: () => {}, variant: "primary" as const },
      { label: "Schedule Property Review", action: () => {} },
    ],
    severity: "warning" as const,
  },

  unpaidRent: {
    title: "Unpaid Rent Alert",
    description: "Action needed on overdue rent payments",
    trend: "down" as const,
    trendLabel: "$8,450 overdue",
    keyFinding: "3 tenants have overdue rent totaling $8,450. The oldest account is 18 days past due.",
    recommendations: [
      "Send immediate payment reminders to affected tenants",
      "Consider late fees if within lease terms",
      "Schedule collection calls for accounts over 30 days",
      "Review tenant payment history for patterns",
    ],
    suggestedActions: [
      { label: "Send Reminders", action: () => {}, variant: "primary" as const },
      { label: "View Collections Report", action: () => {} },
    ],
    severity: "warning" as const,
  },

  maintenanceCost: {
    title: "Maintenance Cost Analysis",
    description: "Maintenance expenses are trending higher than expected",
    trend: "up" as const,
    trendLabel: "+22% above average",
    keyFinding: "Sunset Plaza has maintenance costs 22% above your portfolio average. This is driven by HVAC repairs and plumbing issues.",
    recommendations: [
      "Schedule preventive maintenance program",
      "Consider equipment replacement vs. repair analysis",
      "Review vendor pricing—get competitive quotes",
      "Implement predictive maintenance schedule",
    ],
    suggestedActions: [
      { label: "Schedule Maintenance Review", action: () => {}, variant: "primary" as const },
      { label: "Get Vendor Quotes", action: () => {} },
    ],
    severity: "warning" as const,
  },

  revenueGrowth: {
    title: "Revenue Growth Opportunity",
    description: "Q2 revenue projection shows positive growth",
    trend: "up" as const,
    trendLabel: "+3.2% QoQ",
    keyFinding: "Based on current occupancy and lease agreements, Q2 2026 revenue is projected at $127,500, up from $123,500 in Q1.",
    recommendations: [
      "Lock in lease renewals to maintain growth trajectory",
      "Plan capital improvements to support higher rents",
      "Monitor market conditions for rate optimization",
    ],
    suggestedActions: [
      { label: "View Full Forecast", action: () => {}, variant: "primary" as const },
      { label: "Export Report", action: () => {} },
    ],
    severity: "success" as const,
  },

  leaseRenewal: {
    title: "Lease Renewal Opportunities",
    description: "Multiple leases expiring soon—action needed",
    keyFinding: "12 leases expire within 90 days. Historical renewal rate is 87%, but proactive outreach increases success to 92%.",
    recommendations: [
      "Start renewal discussions 60 days before expiration",
      "Offer incentives for early renewals",
      "Prepare market analysis for rate negotiations",
      "Schedule property inspections before renewal",
    ],
    suggestedActions: [
      { label: "Start Renewal Campaign", action: () => {}, variant: "primary" as const },
      { label: "View Expiring Leases", action: () => {} },
    ],
    severity: "info" as const,
  },
};
