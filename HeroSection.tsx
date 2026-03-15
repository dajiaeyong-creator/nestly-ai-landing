/*
 * NESTLY AI Hero Section – Premium Modern Design
 * Full-width luxury property background with glassmorphism card
 */

import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const HERO_BG_URL = "https://d2xsxph8kpxj0f.cloudfront.net/310519663410745579/WgMVq9trEhtgZ3P3GW8H7t/hero-luxury-property-CcTciPpxXc3U4wHYsMQG9p.webp";

const metrics = [
  { value: "$2.4B+", label: "Assets Managed" },
  { value: "12,000+", label: "Properties" },
  { value: "98.7%", label: "Collection Rate" },
  { value: "24.3%", label: "Avg ROI" },
];

interface HeroSectionProps {
  onWaitlistClick: () => void;
}

export default function HeroSection({ onWaitlistClick }: HeroSectionProps) {
  const [selectedRole, setSelectedRole] = useState("investor");
  const [portfolioSize, setPortfolioSize] = useState("5-10");
  const [propertyCount, setPropertyCount] = useState("10-25");

  const handleExploreDemo = () => {
    toast("Explore Demo", {
      description: "Launching demo dashboard...",
    });
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-20">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: `url('${HERO_BG_URL}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center min-h-screen">
        {/* Main Headline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center mb-12"
        >
          <h1
            className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-[-0.02em] text-white mb-6"
            style={{ fontFamily: "var(--font-display)" }}
          >
            AI Financial Intelligence
            <br />
            <span className="bg-gradient-to-r from-[#3ECF8E] via-[#06B6D4] to-[#3ECF8E] bg-clip-text text-transparent">
              for Real Estate
            </span>
          </h1>
          <p
            className="text-lg sm:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed"
            style={{ fontFamily: "var(--font-body)" }}
          >
            Manage properties, automate finances, and grow your portfolio with AI-powered insights
          </p>
        </motion.div>

        {/* Glassmorphism Card */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-8 sm:p-10 shadow-2xl max-w-2xl w-full mb-16"
        >
          {/* Card Header */}
          <div className="flex items-center gap-2 mb-8">
            <div className="p-2 rounded-lg bg-gradient-to-br from-[#3ECF8E]/30 to-[#06B6D4]/30">
              <Sparkles size={20} className="text-white" />
            </div>
            <h2 className="text-xl font-semibold text-white" style={{ fontFamily: "var(--font-display)" }}>
              Get Started
            </h2>
          </div>

          {/* Form Grid */}
          <div className="space-y-6">
            {/* Role Selector */}
            <div>
              <label className="block text-sm font-medium text-white/90 mb-3">
                I am a:
              </label>
              <div className="grid grid-cols-3 gap-3">
                {["investor", "owner", "manager"].map((role) => (
                  <button
                    key={role}
                    onClick={() => setSelectedRole(role)}
                    className={`py-3 px-4 rounded-xl font-medium transition-all ${
                      selectedRole === role
                        ? "bg-gradient-to-r from-[#3ECF8E] to-[#2FBF9B] text-white shadow-lg"
                        : "bg-white/10 text-white/70 hover:bg-white/20 border border-white/20"
                    }`}
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    {role.charAt(0).toUpperCase() + role.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Portfolio Size */}
            <div>
              <label className="block text-sm font-medium text-white/90 mb-3">
                Portfolio Size:
              </label>
              <select
                value={portfolioSize}
                onChange={(e) => setPortfolioSize(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 outline-none focus:border-[#3ECF8E] focus:bg-white/15 transition-all"
                style={{ fontFamily: "var(--font-body)" }}
              >
                <option value="under-5">Under $5M</option>
                <option value="5-10">$5M - $10M</option>
                <option value="10-25">$10M - $25M</option>
                <option value="25-50">$25M - $50M</option>
                <option value="over-50">Over $50M</option>
              </select>
            </div>

            {/* Property Count */}
            <div>
              <label className="block text-sm font-medium text-white/90 mb-3">
                Number of Properties:
              </label>
              <select
                value={propertyCount}
                onChange={(e) => setPropertyCount(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 outline-none focus:border-[#3ECF8E] focus:bg-white/15 transition-all"
                style={{ fontFamily: "var(--font-body)" }}
              >
                <option value="1-5">1 - 5</option>
                <option value="5-10">5 - 10</option>
                <option value="10-25">10 - 25</option>
                <option value="25-50">25 - 50</option>
                <option value="over-50">50+</option>
              </select>
            </div>

            {/* CTA Button */}
            <button
              onClick={handleExploreDemo}
              className="w-full py-4 px-6 bg-gradient-to-r from-[#3ECF8E] to-[#2FBF9B] text-white rounded-xl font-semibold hover:shadow-xl transition-all flex items-center justify-center gap-2 group"
              style={{ fontFamily: "var(--font-body)" }}
            >
              Explore Demo
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Footer Text */}
          <p className="text-center text-sm text-white/60 mt-6" style={{ fontFamily: "var(--font-body)" }}>
            No credit card required. Free access to all features.
          </p>
        </motion.div>
      </div>

      {/* Metrics Bar Below Hero */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="relative z-10 w-full bg-gradient-to-r from-black/80 via-black/70 to-black/80 backdrop-blur-md border-t border-white/10"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
            {metrics.map((metric, idx) => (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 + idx * 0.1 }}
                className="text-center"
              >
                <div
                  className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-[#3ECF8E] to-[#06B6D4] bg-clip-text text-transparent mb-2"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {metric.value}
                </div>
                <div
                  className="text-xs sm:text-sm text-white/60 uppercase tracking-wider"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  {metric.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
