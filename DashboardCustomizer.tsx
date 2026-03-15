/*
 * Dashboard Customizer – Widget Selection Modal
 * Allow users to customize which widgets appear on their dashboard
 */

import { motion, AnimatePresence } from "framer-motion";
import { X, Check } from "lucide-react";
import { useState } from "react";

const availableWidgets = [
  { id: "rent-collected", label: "Rent Collected", icon: "💰" },
  { id: "vacancy-rate", label: "Vacancy Rate", icon: "📊" },
  { id: "maintenance", label: "Maintenance Requests", icon: "🔧" },
  { id: "lease-expiry", label: "Lease Expirations", icon: "📅" },
  { id: "cash-flow", label: "Cash Flow", icon: "💹" },
  { id: "property-perf", label: "Property Performance", icon: "🏢" },
  { id: "ai-insights", label: "AI Insights", icon: "✨" },
];

interface DashboardCustomizerProps {
  isOpen: boolean;
  onClose: () => void;
  selectedWidgets: string[];
  onSave: (widgets: string[]) => void;
}

export default function DashboardCustomizer({
  isOpen,
  onClose,
  selectedWidgets,
  onSave,
}: DashboardCustomizerProps) {
  const [tempSelected, setTempSelected] = useState(selectedWidgets);

  const handleToggle = (widgetId: string) => {
    setTempSelected((prev) =>
      prev.includes(widgetId)
        ? prev.filter((id) => id !== widgetId)
        : [...prev, widgetId]
    );
  };

  const handleSave = () => {
    onSave(tempSelected);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-40"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl shadow-2xl z-50 max-w-md w-full mx-4"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-slate-200">
              <h2
                className="text-xl font-bold text-slate-900"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Customize Dashboard
              </h2>
              <button
                onClick={onClose}
                className="p-1 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <X size={20} className="text-slate-600" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 max-h-96 overflow-y-auto">
              <p
                className="text-sm text-slate-600 mb-4"
                style={{ fontFamily: "var(--font-body)" }}
              >
                Select which widgets you want to see on your dashboard:
              </p>

              <div className="space-y-2">
                {availableWidgets.map((widget) => (
                  <motion.button
                    key={widget.id}
                    onClick={() => handleToggle(widget.id)}
                    className={`w-full flex items-center gap-3 p-3 rounded-lg border-2 transition-all ${
                      tempSelected.includes(widget.id)
                        ? "border-[#3ECF8E] bg-[#3ECF8E]/5"
                        : "border-slate-200 bg-white hover:border-slate-300"
                    }`}
                  >
                    <div className="text-xl">{widget.icon}</div>
                    <span
                      className={`flex-1 text-left font-medium ${
                        tempSelected.includes(widget.id)
                          ? "text-[#3ECF8E]"
                          : "text-slate-900"
                      }`}
                      style={{ fontFamily: "var(--font-body)" }}
                    >
                      {widget.label}
                    </span>
                    {tempSelected.includes(widget.id) && (
                      <Check size={20} className="text-[#3ECF8E]" />
                    )}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="flex gap-3 p-6 border-t border-slate-200">
              <button
                onClick={onClose}
                className="flex-1 px-4 py-2 rounded-lg border border-slate-200 text-slate-700 font-medium hover:bg-slate-50 transition-colors"
                style={{ fontFamily: "var(--font-body)" }}
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="flex-1 px-4 py-2 rounded-lg bg-gradient-to-r from-[#3ECF8E] to-[#2FBF9B] text-white font-medium hover:shadow-lg transition-all"
                style={{ fontFamily: "var(--font-body)" }}
              >
                Save
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
