/*
 * NESTLY AI Product Preview Section – Modern Fintech Design
 * Shows dashboard examples with light theme and soft shadows
 */

import { motion } from "framer-motion";
import { Eye } from "lucide-react";
import { toast } from "sonner";

const REVENUE_CHART_URL =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663410745579/WgMVq9trEhtgZ3P3GW8H7t/nestly-revenue-chart-modern-PLNC5DSVxFFK5MLezuygLY.webp";
const TENANT_PAYMENTS_URL =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663410745579/WgMVq9trEhtgZ3P3GW8H7t/nestly-tenant-payments-modern-G9SZDqNXLyAq5kJ8qTEa6b.webp";

const previews = [
  {
    title: "Revenue Analytics Dashboard",
    description:
      "Real-time revenue tracking with soft green gradient charts, KPI cards, and AI-powered insights. Monitor your portfolio performance at a glance with interactive data visualizations.",
    image: REVENUE_CHART_URL,
    features: ["Revenue Trends", "KPI Tracking", "Interactive Charts"],
  },
  {
    title: "Tenant Payment Management",
    description:
      "Clean, modern payment activity view with circular tenant avatars, colored status badges, and progress tracking. Easily manage and track all tenant payments across your portfolio.",
    image: TENANT_PAYMENTS_URL,
    features: ["Payment Tracking", "Status Badges", "Progress Bars"],
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function ProductPreviewSection() {
  return (
    <section id="product-preview" className="relative py-28 overflow-hidden bg-white">
      <div className="container relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20 max-w-2xl mx-auto"
        >
          <span className="nestly-badge mb-5 inline-flex">
            <Eye size={12} />
            Product Showcase
          </span>
          <h2
            className="text-4xl sm:text-5xl font-bold tracking-[-0.03em] text-slate-900 mb-5"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Experience the{" "}
            <span className="gradient-text">Nestly Platform</span>
          </h2>
          <p
            className="text-lg text-slate-600 leading-relaxed"
            style={{ fontFamily: "var(--font-body)" }}
          >
            Intuitive dashboards designed for property managers and investors.
            Visualize your entire portfolio with modern, clean interfaces.
          </p>
        </motion.div>

        {/* Preview cards grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid lg:grid-cols-2 gap-8"
        >
          {previews.map((preview, idx) => (
            <motion.div
              key={preview.title}
              variants={itemVariants}
              className="flex flex-col gap-6"
            >
              {/* Text content */}
              <div className="flex flex-col gap-4">
                <h3
                  className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-[-0.02em]"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {preview.title}
                </h3>
                <p
                  className="text-base text-slate-600 leading-relaxed"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  {preview.description}
                </p>

                {/* Features list */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {preview.features.map((feature) => (
                    <span
                      key={feature}
                      className="px-3 py-1.5 text-xs font-medium text-[#2FBF9B] bg-[#3ECF8E10] border border-[#3ECF8E20] rounded-full"
                      style={{ fontFamily: "var(--font-body)" }}
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>

              {/* Image */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative group"
              >
                <div className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-soft-lg">
                  <img
                    src={preview.image}
                    alt={preview.title}
                    className="w-full h-auto block"
                    loading="lazy"
                  />
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-16"
        >
          <button
            onClick={() => {
              toast("Schedule Demo — coming soon", {
                description: "We're launching soon. Join the waitlist!",
              });
            }}
            className="btn-primary px-8 py-3 text-base inline-flex items-center gap-2"
          >
            Schedule a Demo
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </motion.div>
      </div>
    </section>
  );
}
