/*
 * NESTLY AI Feature Banner – Scrolling Animation
 * Futuristic scrolling feature tags with gradient effects
 */

import { motion } from "framer-motion";

const features = [
  "AI-Powered Rent Payments",
  "Real-Time Property Financial Analytics",
  "Automated Rent Collection",
  "Investor Portfolio Dashboards",
  "Smart Maintenance Tracking",
  "Property Performance Insights",
  "Tenant Payment Automation",
  "Portfolio Cash Flow Intelligence",
];

// Duplicate features for seamless loop
const scrollingFeatures = [...features, ...features];

export default function FeatureBanner() {
  return (
    <section className="relative py-12 overflow-hidden bg-gradient-to-r from-white via-slate-50 to-white border-y border-slate-200">
      {/* Glow effect background */}
      <div
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(62, 207, 142, 0.1) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10">
        {/* Scrolling container */}
        <div className="overflow-hidden">
          <motion.div
            className="flex gap-4 whitespace-nowrap"
            animate={{ x: [0, -1920] }}
            transition={{
              duration: 40,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {scrollingFeatures.map((feature, idx) => {
              // Alternate colors for visual interest
              const isGradient = idx % 2 === 0;

              return (
                <motion.div
                  key={`${feature}-${idx}`}
                  className={`flex-shrink-0 px-6 py-3 rounded-full font-medium text-sm transition-all ${
                    isGradient
                      ? "bg-gradient-to-r from-[#3ECF8E] to-[#2FBF9B] text-white shadow-lg"
                      : "bg-white border border-slate-200 text-slate-900 shadow-soft"
                  }`}
                  style={{ fontFamily: "var(--font-body)" }}
                  whileHover={{ scale: 1.05 }}
                >
                  {feature}
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>

      {/* Fade edges for smooth effect */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white via-white to-transparent z-20 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white via-white to-transparent z-20 pointer-events-none" />
    </section>
  );
}
