/*
 * AI Assistant Panel – Appears at the top of major pages
 * Provides context-aware insights and suggested actions
 */

import { motion } from "framer-motion";
import { Sparkles, ArrowRight, X, AlertCircle, CheckCircle, TrendingUp, Clock } from "lucide-react";
import { useState } from "react";

interface AssistantCard {
  id: string;
  icon: React.ReactNode;
  title: string;
  message: string;
  priority: "high" | "medium" | "low";
  action?: {
    label: string;
    onClick: () => void;
  };
  dismissible?: boolean;
}

interface AIAssistantPanelProps {
  cards: AssistantCard[];
  onDismiss?: (cardId: string) => void;
  compact?: boolean;
}

const priorityColors = {
  high: "bg-red-50 border-red-200 text-red-900",
  medium: "bg-yellow-50 border-yellow-200 text-yellow-900",
  low: "bg-blue-50 border-blue-200 text-blue-900",
};

const priorityIcons = {
  high: <AlertCircle size={20} className="text-red-600" />,
  medium: <Clock size={20} className="text-yellow-600" />,
  low: <CheckCircle size={20} className="text-blue-600" />,
};

export default function AIAssistantPanel({ cards, onDismiss, compact = false }: AIAssistantPanelProps) {
  const [dismissedCards, setDismissedCards] = useState<Set<string>>(new Set());

  const handleDismiss = (cardId: string) => {
    setDismissedCards((prev) => {
      const newSet = new Set(prev);
      newSet.add(cardId);
      return newSet;
    });
    onDismiss?.(cardId);
  };

  const visibleCards = cards.filter((card) => !dismissedCards.has(card.id));

  if (visibleCards.length === 0) {
    return null;
  }

  return (
    <div className={`space-y-3 ${compact ? "mb-4" : "mb-8"}`}>
      <div className="flex items-center gap-2 mb-4">
        <Sparkles size={18} className="text-[#3ECF8E]" />
        <h2 className="font-bold text-slate-900" style={{ fontFamily: "var(--font-display)" }}>
          Nestly AI Assistant
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {visibleCards.map((card, idx) => (
          <motion.div
            key={card.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className={`border rounded-lg p-4 ${priorityColors[card.priority]} relative group`}
          >
            {/* Header */}
            <div className="flex items-start gap-3 mb-2">
              <div className="flex-shrink-0 mt-0.5">{priorityIcons[card.priority]}</div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-sm" style={{ fontFamily: "var(--font-display)" }}>
                  {card.title}
                </h3>
              </div>
              {card.dismissible && (
                <button
                  onClick={() => handleDismiss(card.id)}
                  className="flex-shrink-0 text-current/40 hover:text-current/70 transition-colors opacity-0 group-hover:opacity-100"
                >
                  <X size={16} />
                </button>
              )}
            </div>

            {/* Message */}
            <p className="text-sm mb-3" style={{ fontFamily: "var(--font-body)" }}>
              {card.message}
            </p>

            {/* Action Button */}
            {card.action && (
              <button
                onClick={card.action.onClick}
                className="inline-flex items-center gap-1 text-sm font-medium px-3 py-1.5 rounded bg-current/20 hover:bg-current/30 transition-all"
                style={{ fontFamily: "var(--font-body)" }}
              >
                {card.action.label}
                <ArrowRight size={14} />
              </button>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// Preset assistant cards for common scenarios
export const assistantCardPresets = {
  unpaidRent: (count: number, amount: number): AssistantCard => ({
    id: "unpaid-rent",
    icon: <AlertCircle size={20} className="text-red-600" />,
    title: "Unpaid Rent Alert",
    message: `${count} tenant${count > 1 ? "s" : ""} have overdue rent totaling $${amount.toLocaleString()}. Immediate action recommended.`,
    priority: "high",
    action: {
      label: "Send Reminders",
      onClick: () => console.log("Send rent reminders"),
    },
    dismissible: true,
  }),

  lowOccupancy: (property: string, occupancy: number): AssistantCard => ({
    id: "low-occupancy",
    icon: <TrendingUp size={20} className="text-yellow-600" />,
    title: "Low Occupancy",
    message: `${property} is at ${occupancy}% occupancy, below your 90% target. Consider promotional pricing.`,
    priority: "medium",
    action: {
      label: "Launch Campaign",
      onClick: () => console.log("Launch marketing campaign"),
    },
    dismissible: true,
  }),

  leaseExpiring: (count: number): AssistantCard => ({
    id: "lease-expiring",
    icon: <Clock size={20} className="text-blue-600" />,
    title: "Lease Renewals Due",
    message: `${count} lease${count > 1 ? "s" : ""} expire within 90 days. Start renewal discussions now for best results.`,
    priority: "low",
    action: {
      label: "Start Campaign",
      onClick: () => console.log("Start lease renewal campaign"),
    },
    dismissible: true,
  }),

  maintenanceRecommendation: (property: string, vendor: string): AssistantCard => ({
    id: "maintenance-rec",
    icon: <CheckCircle size={20} className="text-blue-600" />,
    title: "Vendor Recommendation",
    message: `${vendor} is recommended for maintenance at ${property}. 4.8/5 rating, 2-hour response time.`,
    priority: "low",
    action: {
      label: "Assign Vendor",
      onClick: () => console.log("Assign vendor"),
    },
    dismissible: true,
  }),

  revenueOpportunity: (growth: number): AssistantCard => ({
    id: "revenue-opportunity",
    icon: <TrendingUp size={20} className="text-blue-600" />,
    title: "Revenue Growth",
    message: `Q2 revenue projected to grow ${growth}% based on current occupancy. Lock in lease renewals to maintain momentum.`,
    priority: "low",
    action: {
      label: "View Forecast",
      onClick: () => console.log("View revenue forecast"),
    },
    dismissible: true,
  }),

  highMaintenanceCost: (property: string, variance: number): AssistantCard => ({
    id: "high-maintenance",
    icon: <AlertCircle size={20} className="text-yellow-600" />,
    title: "High Maintenance Costs",
    message: `${property} has maintenance costs ${variance}% above average. Consider preventive maintenance program.`,
    priority: "medium",
    action: {
      label: "Schedule Review",
      onClick: () => console.log("Schedule maintenance review"),
    },
    dismissible: true,
  }),

  automationEnabled: (feature: string): AssistantCard => ({
    id: "automation-enabled",
    icon: <CheckCircle size={20} className="text-green-600" />,
    title: "Automation Active",
    message: `${feature} is now active. Expected to improve efficiency by 15-20%.`,
    priority: "low",
    action: undefined,
    dismissible: true,
  }),
};
