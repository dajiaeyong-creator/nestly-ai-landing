/*
 * AI-Driven Navigation Sidebar
 * Simplified, grouped navigation with futuristic design
 * Groups: Dashboard, Portfolio, Operations, Financials, Documents, AI Insights, Settings
 */

import { useState } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Building2,
  Wrench,
  DollarSign,
  FileText,
  Sparkles,
  Settings,
  ChevronDown,
  Home,
  Users,
  Briefcase,
  AlertCircle,
  TrendingUp,
  Menu,
  X,
} from "lucide-react";

interface NavSection {
  id: string;
  label: string;
  icon: React.ReactNode;
  color: string;
  items: NavItem[];
}

interface NavItem {
  label: string;
  path: string;
  icon: React.ReactNode;
}

const navSections: NavSection[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: <LayoutDashboard size={20} />,
    color: "from-[#3ECF8E] to-[#2FBF9B]",
    items: [
      {
        label: "Overview",
        path: "/dashboard",
        icon: <LayoutDashboard size={18} />,
      },
      {
        label: "AI Insights",
        path: "/ai-insights",
        icon: <Sparkles size={18} />,
      },
    ],
  },
  {
    id: "portfolio",
    label: "Portfolio",
    icon: <Building2 size={20} />,
    color: "from-[#06B6D4] to-[#0891B2]",
    items: [
      {
        label: "Properties",
        path: "/properties",
        icon: <Home size={18} />,
      },
      {
        label: "Units",
        path: "/units",
        icon: <Briefcase size={18} />,
      },
      {
        label: "Tenants",
        path: "/tenants",
        icon: <Users size={18} />,
      },
    ],
  },
  {
    id: "operations",
    label: "Operations",
    icon: <Wrench size={20} />,
    color: "from-[#F59E0B] to-[#D97706]",
    items: [
      {
        label: "Maintenance",
        path: "/maintenance",
        icon: <Wrench size={18} />,
      },
      {
        label: "Vendors",
        path: "/vendors",
        icon: <Briefcase size={18} />,
      },
      {
        label: "Eviction Workflows",
        path: "/eviction-workflows",
        icon: <AlertCircle size={18} />,
      },
    ],
  },
  {
    id: "financials",
    label: "Financials",
    icon: <DollarSign size={20} />,
    color: "from-[#EC4899] to-[#DB2777]",
    items: [
      {
        label: "Payments",
        path: "/payments",
        icon: <DollarSign size={18} />,
      },
      {
        label: "Expenses",
        path: "/expenses",
        icon: <TrendingUp size={18} />,
      },
      {
        label: "Reports",
        path: "/reports",
        icon: <FileText size={18} />,
      },
    ],
  },
  {
    id: "documents",
    label: "Documents",
    icon: <FileText size={20} />,
    color: "from-[#8B5CF6] to-[#7C3AED]",
    items: [
      {
        label: "All Documents",
        path: "/documents",
        icon: <FileText size={18} />,
      },
    ],
  },
  {
    id: "settings",
    label: "Settings",
    icon: <Settings size={20} />,
    color: "from-[#64748B] to-[#475569]",
    items: [
      {
        label: "Account",
        path: "/settings/account",
        icon: <Settings size={18} />,
      },
      {
        label: "Preferences",
        path: "/settings/preferences",
        icon: <Settings size={18} />,
      },
    ],
  },
];

interface AINavigationSidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export default function AINavigationSidebar({ isOpen = true, onClose }: AINavigationSidebarProps) {
  const [expandedSection, setExpandedSection] = useState<string | null>("dashboard");
  const [location] = useLocation();
  const [mobileOpen, setMobileOpen] = useState(isOpen);

  const isActive = (path: string) => location === path;

  const toggleSection = (sectionId: string) => {
    setExpandedSection(expandedSection === sectionId ? null : sectionId);
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="fixed top-4 left-4 z-50 md:hidden p-2 bg-white border border-slate-200 rounded-lg shadow-lg hover:shadow-xl transition-all"
      >
        {mobileOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Sidebar */}
      <motion.aside
        initial={{ x: -300 }}
        animate={{ x: mobileOpen ? 0 : -300 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="fixed left-0 top-0 h-screen w-80 bg-gradient-to-b from-white via-slate-50 to-white border-r border-slate-100 shadow-xl z-40 overflow-y-auto md:relative md:translate-x-0"
      >
        {/* Header */}
        <div className="sticky top-0 bg-white/80 backdrop-blur-md border-b border-slate-100 p-6 z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#3ECF8E] to-[#2FBF9B] flex items-center justify-center">
              <Sparkles size={20} className="text-white" />
            </div>
            <div>
              <h1 className="font-bold text-slate-900" style={{ fontFamily: "var(--font-display)" }}>
                Nestly
              </h1>
              <p className="text-xs text-slate-500" style={{ fontFamily: "var(--font-body)" }}>
                AI Operating System
              </p>
            </div>
          </div>
        </div>

        {/* Navigation Sections */}
        <nav className="p-4 space-y-2">
          {navSections.map((section) => (
            <div key={section.id} className="space-y-1">
              {/* Section Header */}
              <button
                onClick={() => toggleSection(section.id)}
                className="w-full px-4 py-3 rounded-lg hover:bg-slate-100 transition-all flex items-center justify-between group"
              >
                <div className="flex items-center gap-3 flex-1 text-left">
                  <div className={`p-2 rounded-lg bg-gradient-to-br ${section.color} text-white`}>
                    {section.icon}
                  </div>
                  <span className="font-semibold text-slate-900" style={{ fontFamily: "var(--font-display)" }}>
                    {section.label}
                  </span>
                </div>
                <motion.div
                  animate={{ rotate: expandedSection === section.id ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown size={18} className="text-slate-400 group-hover:text-slate-600" />
                </motion.div>
              </button>

              {/* Section Items */}
              <AnimatePresence>
                {expandedSection === section.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-1 pl-2"
                  >
                    {section.items.map((item) => (
                      <Link key={item.path} href={item.path}>
                        <a
                          onClick={() => {
                            if (window.innerWidth < 768) {
                              setMobileOpen(false);
                            }
                          }}
                          className={`px-4 py-2.5 rounded-lg flex items-center gap-3 transition-all group ${
                            isActive(item.path)
                              ? `bg-gradient-to-r ${section.color} text-white shadow-lg`
                              : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                          }`}
                        >
                          <div className={isActive(item.path) ? "text-white" : "text-slate-400 group-hover:text-slate-600"}>
                            {item.icon}
                          </div>
                          <span className="text-sm font-medium" style={{ fontFamily: "var(--font-body)" }}>
                            {item.label}
                          </span>
                        </a>
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </nav>

        {/* Footer Info */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-white to-transparent border-t border-slate-100">
          <div className="px-4 py-3 rounded-lg bg-gradient-to-br from-[#3ECF8E]/10 to-[#2FBF9B]/10 border border-[#3ECF8E]/20">
            <p className="text-xs text-slate-600" style={{ fontFamily: "var(--font-body)" }}>
              💡 Tip: Press <kbd className="px-2 py-1 bg-slate-200 rounded text-xs font-mono">⌘K</kbd> to open AI Command Bar
            </p>
          </div>
        </div>
      </motion.aside>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 bg-black/40 z-30 md:hidden"
        />
      )}
    </>
  );
}
