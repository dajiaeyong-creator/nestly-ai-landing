/*
 * NESTLY AI Features Section – Modern Fintech Design
 * 4-feature grid with clean cards and green accents
 */

import { motion } from "framer-motion";
import { Zap, TrendingUp, BarChart3, Settings2, MessageCircle } from "lucide-react";

const AI_FEATURE_BG_URL =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663410745579/WgMVq9trEhtgZ3P3GW8H7t/nestly-ai-feature-JCDg2sFQz7XzZgYZZHpFn8.webp";

const features = [
  {
    icon: BarChart3,
    color: "#3ECF8E",
    colorBg: "#3ECF8E10",
    colorBorder: "#3ECF8E20",
    title: "Portfolio Management",
    description:
      "Unified platform for residential, multifamily, and commercial properties. Manage diverse portfolios in one dashboard with role-based access for property managers, accountants, and investors.",
    tag: "Portfolio",
  },
  {
    icon: Zap,
    color: "#3ECF8E",
    colorBg: "#3ECF8E10",
    colorBorder: "#3ECF8E20",
    title: "Rent Payment Automation",
    description:
      "AI-driven payment scheduling, smart reminders, and automated reconciliation eliminate manual rent collection entirely. Funds clear faster with intelligent routing.",
    tag: "Payments",
  },
  {
    icon: TrendingUp,
    color: "#2FBF9B",
    colorBg: "#2FBF9B10",
    colorBorder: "#2FBF9B20",
    title: "Predictive Financial Insights",
    description:
      "Machine learning models forecast cash flow, vacancy risk, and maintenance costs — giving you a 90-day financial outlook with confidence intervals.",
    tag: "Analytics",
  },
  {
    icon: TrendingUp,
    color: "#2FBF9B",
    colorBg: "#2FBF9B10",
    colorBorder: "#2FBF9B20",
    title: "Portfolio Analytics",
    description:
      "Real-time performance metrics across your entire portfolio. Compare properties, track ROI, and surface underperformers with AI-generated recommendations.",
    tag: "Analytics",
  },
  {
    icon: Settings2,
    color: "#2FBF9B",
    colorBg: "#2FBF9B10",
    colorBorder: "#2FBF9B20",
    title: "Operational Automation",
    description:
      "Automate lease renewals, maintenance workflows, tenant communications, and compliance tracking. Nestly also provides eviction workflow assistance, helping property managers track notices, deadlines, and required documentation while staying aligned with local regulations.",
    tag: "Operations",
  },
  {
    icon: MessageCircle,
    color: "#3ECF8E",
    colorBg: "#3ECF8E10",
    colorBorder: "#3ECF8E20",
    title: "AI Financial Assistant",
    description:
      "Ask Nestly questions about your portfolio performance, rent trends, and financial forecasts. Instantly surface insights across residential and commercial properties using AI.",
    tag: "AI Assistant",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55 } },
};

export default function AIFeaturesSection() {
  return (
    <section id="features" className="relative py-28 overflow-hidden bg-slate-50">
      <div className="container relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 max-w-2xl mx-auto"
        >
          <span className="nestly-badge mb-5 inline-flex">
            <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-[#3ECF8E] to-[#2FBF9B] animate-pulse" />
            Powered by AI
          </span>
          <h2
            className="text-4xl sm:text-5xl font-bold tracking-[-0.03em] text-slate-900 mb-5"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Intelligence built into{" "}
            <span className="gradient-text">every layer</span>
          </h2>
          <p
            className="text-lg text-slate-600 leading-relaxed"
            style={{ fontFamily: "var(--font-body)" }}
          >
            Nestly's AI engine continuously learns from your portfolio data,
            delivering smarter decisions with every transaction.
          </p>
        </motion.div>

        {/* Features grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                variants={cardVariants}
                className="nestly-card nestly-card-hover p-6 flex flex-col gap-4"
              >
                {/* Icon */}
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{
                    background: feature.colorBg,
                    border: `1px solid ${feature.colorBorder}`,
                  }}
                >
                  <Icon size={18} style={{ color: feature.color }} />
                </div>

                {/* Tag */}
                <span
                  className="text-[10px] font-semibold uppercase tracking-widest"
                  style={{ color: feature.color, fontFamily: "var(--font-body)" }}
                >
                  {feature.tag}
                </span>

                {/* Title */}
                <h3
                  className="text-base font-semibold text-slate-900 leading-snug tracking-[-0.01em]"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {feature.title}
                </h3>

                {/* Description */}
                <p
                  className="text-sm text-slate-600 leading-relaxed flex-1"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  {feature.description}
                </p>

                {/* Bottom accent line */}
                <div
                  className="h-px w-full opacity-30 mt-auto"
                  style={{
                    background: `linear-gradient(90deg, ${feature.color}, transparent)`,
                  }}
                />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
