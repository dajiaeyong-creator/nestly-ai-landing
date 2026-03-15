/*
 * NESTLY AI Pricing Section – Modern SaaS Design
 * Three pricing tiers with clear separation of AI automation vs AI insights
 */

import { motion } from "framer-motion";
import { Check, X, Zap, Brain } from "lucide-react";
import { toast } from "sonner";

const pricingTiers = [
  {
    name: "Starter",
    price: "$29",
    period: "per month",
    description: "For small landlords",
    subtitle: "Up to 10 units",
    cta: "Start Free Trial",
    highlight: false,
    baseFeatures: [
      { name: "Tenant rent payments", included: true },
      { name: "Owner financial dashboard", included: true },
      { name: "Tenant management", included: true },
      { name: "Maintenance tracking", included: true },
    ],
    aiAutomation: [
      { name: "Rent reminders", included: true },
      { name: "Payment notifications", included: true },
      { name: "Automated transaction categorization", included: true },
    ],
    aiInsights: [
      { name: "AI insights assistant", included: false },
      { name: "Portfolio performance questions", included: false },
      { name: "Revenue forecasting", included: false },
      { name: "Property performance analytics", included: false },
      { name: "Maintenance trends analysis", included: false },
    ],
  },
  {
    name: "Professional",
    price: "$99",
    period: "per month",
    description: "For growing property portfolios",
    subtitle: "Up to 100 units",
    cta: "Start Free Trial",
    highlight: true,
    baseFeatures: [
      { name: "Tenant rent payments", included: true },
      { name: "Owner financial dashboard", included: true },
      { name: "Tenant management", included: true },
      { name: "Maintenance tracking", included: true },
    ],
    aiAutomation: [
      { name: "Rent reminders", included: true },
      { name: "Payment notifications", included: true },
      { name: "Automated transaction categorization", included: true },
    ],
    aiInsights: [
      { name: "AI insights assistant", included: true },
      { name: "Portfolio performance questions", included: true },
      { name: "Revenue forecasting", included: true },
      { name: "Property performance analytics", included: true },
      { name: "Maintenance trends analysis", included: true },
    ],
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "contact sales",
    description: "For large property owners",
    subtitle: "Unlimited units",
    cta: "Schedule Demo",
    highlight: false,
    baseFeatures: [
      { name: "Tenant rent payments", included: true },
      { name: "Owner financial dashboard", included: true },
      { name: "Tenant management", included: true },
      { name: "Maintenance tracking", included: true },
    ],
    aiAutomation: [
      { name: "Rent reminders", included: true },
      { name: "Payment notifications", included: true },
      { name: "Automated transaction categorization", included: true },
    ],
    aiInsights: [
      { name: "Advanced AI forecasting", included: true },
      { name: "Investor analytics dashboards", included: true },
      { name: "Custom reporting", included: true },
      { name: "API integrations", included: true },
      { name: "Priority support", included: true },
    ],
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const FeatureGroup = ({
  title,
  icon: Icon,
  features,
  highlight,
}: {
  title: string;
  icon: React.ReactNode;
  features: Array<{ name: string; included: boolean }>;
  highlight?: boolean;
}) => (
  <div className="space-y-3">
    <div className="flex items-center gap-2 pb-3 border-b border-slate-200">
      {Icon}
      <h4
        className="text-sm font-semibold text-slate-900"
        style={{ fontFamily: "var(--font-display)" }}
      >
        {title}
      </h4>
    </div>
    <ul className="space-y-2.5">
      {features.map((feature) => (
        <li key={feature.name} className="flex items-start gap-2.5">
          {feature.included ? (
            <Check size={16} className="text-[#3ECF8E] flex-shrink-0 mt-0.5" />
          ) : (
            <X size={16} className="text-slate-300 flex-shrink-0 mt-0.5" />
          )}
          <span
            className={`text-sm ${
              feature.included
                ? "text-slate-700 font-medium"
                : "text-slate-400"
            }`}
            style={{ fontFamily: "var(--font-body)" }}
          >
            {feature.name}
          </span>
        </li>
      ))}
    </ul>
  </div>
);

export default function PricingSection() {
  const handleCTA = (tier: string) => {
    toast(`${tier} — coming soon`, {
      description: "We're launching soon. Join the waitlist!",
    });
  };

  return (
    <section id="pricing" className="relative py-28 overflow-hidden bg-slate-50">
      <div className="container relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20 max-w-3xl mx-auto"
        >
          <span className="nestly-badge mb-5 inline-flex">
            <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-[#3ECF8E] to-[#2FBF9B] animate-pulse" />
            Simple, Transparent Pricing
          </span>
          <h2
            className="text-5xl sm:text-6xl font-bold tracking-[-0.03em] text-slate-900 mb-6"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Plans for every{" "}
            <span className="gradient-text">property portfolio</span>
          </h2>
          <p
            className="text-xl text-slate-600 leading-relaxed"
            style={{ fontFamily: "var(--font-body)" }}
          >
            Start free with Starter, upgrade anytime. All plans include a 14-day free trial. No credit card required.
          </p>
        </motion.div>

        {/* Pricing cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid md:grid-cols-3 gap-6 lg:gap-8 mb-12"
        >
          {pricingTiers.map((tier, idx) => (
            <motion.div
              key={tier.name}
              variants={cardVariants}
              className={`relative rounded-2xl overflow-hidden transition-all duration-300 ${
                tier.highlight
                  ? "nestly-card border-2 border-[#3ECF8E] shadow-lg ring-4 ring-[#3ECF8E]/10 md:scale-105"
                  : "nestly-card nestly-card-hover"
              }`}
            >
              {/* Highlight badge */}
              {tier.highlight && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                  <span className="nestly-badge">Most Popular</span>
                </div>
              )}

              {/* Card content */}
              <div className="p-8 flex flex-col h-full">
                {/* Header */}
                <div className="flex flex-col gap-2 mb-6">
                  <h3
                    className="text-2xl font-bold text-slate-900"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {tier.name}
                  </h3>
                  <p className="text-sm text-slate-600" style={{ fontFamily: "var(--font-body)" }}>
                    {tier.description}
                  </p>
                  <p className="text-xs font-semibold text-[#3ECF8E] uppercase tracking-widest" style={{ fontFamily: "var(--font-body)" }}>
                    {tier.subtitle}
                  </p>
                </div>

                {/* Price */}
                <div className="flex items-baseline gap-2 mb-6">
                  <span
                    className="text-5xl font-bold text-slate-900"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {tier.price}
                  </span>
                  <span className="text-sm text-slate-600" style={{ fontFamily: "var(--font-body)" }}>
                    {tier.period}
                  </span>
                </div>

                {/* CTA Button */}
                <button
                  onClick={() => handleCTA(tier.name)}
                  className={`w-full py-3 rounded-lg font-medium transition-all mb-6 ${
                    tier.highlight
                      ? "btn-primary"
                      : "btn-secondary"
                  }`}
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  {tier.cta}
                </button>

                {/* Divider */}
                <div className="h-px bg-slate-200 mb-6" />

                {/* Base Features */}
                <FeatureGroup
                  title="Core Features"
                  icon={<Check size={16} className="text-slate-600" />}
                  features={tier.baseFeatures}
                />

                {/* AI Automation Features */}
                <div className="mt-6">
                  <FeatureGroup
                    title="AI Automation"
                    icon={<Zap size={16} className="text-[#3ECF8E]" />}
                    features={tier.aiAutomation}
                  />
                </div>

                {/* AI Insights Features */}
                <div className="mt-6 flex-1">
                  <FeatureGroup
                    title="AI Insights"
                    icon={<Brain size={16} className="text-[#2FBF9B]" />}
                    features={tier.aiInsights}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* FAQ / Comparison hint */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center"
        >
          <p className="text-slate-600 mb-4" style={{ fontFamily: "var(--font-body)" }}>
            Need help choosing?{" "}
            <button
              onClick={() => toast("Comparison table coming soon")}
              className="text-[#3ECF8E] hover:text-[#2FBF9B] transition-colors font-medium"
            >
              View detailed comparison
            </button>
          </p>
          <p className="text-sm text-slate-500" style={{ fontFamily: "var(--font-body)" }}>
            All plans include 14-day free trial. No credit card required. Cancel anytime.
          </p>
        </motion.div>

        {/* Additional info section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-20 pt-12 border-t border-slate-200"
        >
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <h4
                className="text-lg font-semibold text-slate-900 mb-2"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Flexible Billing
              </h4>
              <p className="text-sm text-slate-600" style={{ fontFamily: "var(--font-body)" }}>
                Pay monthly or annually and save 20% with annual billing.
              </p>
            </div>
            <div>
              <h4
                className="text-lg font-semibold text-slate-900 mb-2"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Easy Upgrades
              </h4>
              <p className="text-sm text-slate-600" style={{ fontFamily: "var(--font-body)" }}>
                Upgrade or downgrade your plan anytime. Changes take effect immediately.
              </p>
            </div>
            <div>
              <h4
                className="text-lg font-semibold text-slate-900 mb-2"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Money-Back Guarantee
              </h4>
              <p className="text-sm text-slate-600" style={{ fontFamily: "var(--font-body)" }}>
                Not satisfied? Get a full refund within 30 days, no questions asked.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
