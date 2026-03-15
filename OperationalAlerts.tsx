/*
 * Operational Alerts – Dashboard Alert Cards
 * Display upcoming lease expirations, maintenance requests, eviction status
 */

import { motion } from "framer-motion";
import { AlertCircle, Calendar, Wrench, AlertTriangle } from "lucide-react";

interface Alert {
  id: number;
  type: "lease" | "maintenance" | "eviction";
  title: string;
  description: string;
  count?: number;
  dueDate?: string;
  urgency: "high" | "medium" | "low";
}

const alerts: Alert[] = [
  {
    id: 1,
    type: "lease",
    title: "Upcoming Lease Expirations",
    description: "3 leases expiring in the next 30 days",
    count: 3,
    dueDate: "Next 30 days",
    urgency: "high",
  },
  {
    id: 2,
    type: "maintenance",
    title: "Maintenance Requests",
    description: "7 pending maintenance requests across properties",
    count: 7,
    urgency: "medium",
  },
  {
    id: 3,
    type: "eviction",
    title: "Eviction Workflow Status",
    description: "2 active eviction workflows in progress",
    count: 2,
    urgency: "high",
  },
];

const getIcon = (type: string) => {
  switch (type) {
    case "lease":
      return Calendar;
    case "maintenance":
      return Wrench;
    case "eviction":
      return AlertTriangle;
    default:
      return AlertCircle;
  }
};

const getColor = (urgency: string) => {
  switch (urgency) {
    case "high":
      return { bg: "#EF4444", light: "#FEE2E2", text: "#DC2626" };
    case "medium":
      return { bg: "#FFA500", light: "#FEF3C7", text: "#D97706" };
    case "low":
      return { bg: "#3ECF8E", light: "#ECFDF5", text: "#059669" };
    default:
      return { bg: "#3ECF8E", light: "#ECFDF5", text: "#059669" };
  }
};

export default function OperationalAlerts() {
  return (
    <div className="mb-8">
      <h3
        className="text-lg font-semibold text-slate-900 mb-4"
        style={{ fontFamily: "var(--font-display)" }}
      >
        Operational Alerts
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {alerts.map((alert, index) => {
          const Icon = getIcon(alert.type);
          const colors = getColor(alert.urgency);

          return (
            <motion.div
              key={alert.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="rounded-xl p-4 border-2 bg-white hover:shadow-md transition-all"
              style={{
                borderColor: colors.light,
                backgroundColor: colors.light + "40",
              }}
            >
              <div className="flex items-start gap-3">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: colors.light }}
                >
                  <Icon size={20} style={{ color: colors.bg }} />
                </div>
                <div className="flex-1">
                  <h4
                    className="font-semibold text-sm mb-1"
                    style={{ color: colors.text, fontFamily: "var(--font-display)" }}
                  >
                    {alert.title}
                  </h4>
                  <p
                    className="text-xs text-slate-600 mb-2"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    {alert.description}
                  </p>
                  {alert.count && (
                    <div className="flex items-center justify-between">
                      <span
                        className="text-xs font-bold"
                        style={{ color: colors.bg }}
                      >
                        {alert.count} items
                      </span>
                      <button
                        className="text-xs font-medium transition-colors"
                        style={{ color: colors.bg }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.opacity = "0.7";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.opacity = "1";
                        }}
                      >
                        View →
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
