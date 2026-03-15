/*
 * Dashboard Sidebar Navigation
 * Comprehensive navigation for all portfolio management features
 */

import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Zap,
  Home,
  Grid3x3,
  Users,
  CreditCard,
  FileText,
  Wrench,
  Archive,
  AlertTriangle,
  BarChart3,
  Settings,
  ChevronDown,
} from "lucide-react";
import { useState } from "react";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "#" },
  { icon: Zap, label: "AI Insights", href: "#" },
  { icon: Home, label: "Properties", href: "#" },
  { icon: Grid3x3, label: "Units", href: "#" },
  { icon: Users, label: "Tenants", href: "#" },
  { icon: CreditCard, label: "Payments", href: "#" },
  { icon: FileText, label: "Reports", href: "#" },
  { icon: Wrench, label: "Maintenance", href: "#" },
  { icon: Archive, label: "Documents", href: "#" },
  { icon: AlertTriangle, label: "Eviction Workflows", href: "#" },
  { icon: BarChart3, label: "Investor Reports", href: "#" },
  { icon: Users, label: "Users", href: "#" },
  { icon: Settings, label: "Settings", href: "#" },
];

export default function DashboardSidebar() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <motion.div
      initial={{ x: -280 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.3 }}
      className={`fixed left-0 top-0 h-screen bg-white border-r border-slate-200 transition-all duration-300 z-30 ${
        isOpen ? "w-64" : "w-20"
      }`}
    >
      {/* Sidebar Header */}
      <div className="h-16 border-b border-slate-200 flex items-center justify-between px-4">
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="flex items-center gap-2"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#3ECF8E] to-[#2FBF9B] flex items-center justify-center">
              <span className="text-white font-bold text-sm">N</span>
            </div>
            <span
              className="font-bold text-slate-900"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Nestly
            </span>
          </motion.div>
        )}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-1 hover:bg-slate-100 rounded-lg transition-colors"
        >
          <ChevronDown
            size={20}
            className={`text-slate-600 transition-transform ${
              isOpen ? "rotate-90" : "-rotate-90"
            }`}
          />
        </button>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 overflow-y-auto py-4">
        {navItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <motion.a
              key={item.label}
              href={item.href}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="flex items-center gap-3 px-4 py-3 text-slate-700 hover:bg-slate-50 transition-colors group relative"
              style={{ fontFamily: "var(--font-body)" }}
            >
              <Icon size={20} className="text-slate-600 group-hover:text-[#3ECF8E] transition-colors" />
              {isOpen && (
                <span className="text-sm font-medium group-hover:text-[#3ECF8E] transition-colors">
                  {item.label}
                </span>
              )}
              {!isOpen && (
                <div className="absolute left-20 bg-slate-900 text-white px-2 py-1 rounded text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  {item.label}
                </div>
              )}
            </motion.a>
          );
        })}
      </nav>
    </motion.div>
  );
}
