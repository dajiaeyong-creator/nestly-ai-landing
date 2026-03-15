/*
 * NESTLY AI CTA + Footer – Modern Fintech Design
 * Final call-to-action and footer with clean styling
 */

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { toast } from "sonner";

interface CTAFooterProps {
  onWaitlistClick: () => void;
}

export default function CTAFooter({ onWaitlistClick }: CTAFooterProps) {
  const handleCTA = () => {
    onWaitlistClick();
  };

  const handleLink = (label: string) => {
    toast(`${label} — coming soon`, {
      description: "This page is under development.",
    });
  };

  return (
    <>
      {/* Final CTA Section */}
      <section className="relative py-28 overflow-hidden border-t border-slate-200 bg-gradient-to-b from-white to-slate-50">
        <div className="container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2
              className="text-5xl sm:text-6xl font-bold tracking-[-0.03em] text-slate-900 mb-6"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Run Your Property Portfolio with{" "}
              <span className="gradient-text">AI</span>
            </h2>
            <p
              className="text-lg text-slate-600 leading-relaxed mb-8 max-w-xl mx-auto"
              style={{ fontFamily: "var(--font-body)" }}
            >
              Join thousands of property managers and investors automating their
              operations and growing their portfolios with Nestly.
            </p>
            <button
              onClick={handleCTA}
              className="btn-primary px-8 py-4 text-lg inline-flex items-center gap-2"
            >
              Start Using Nestly
              <ArrowRight size={18} />
            </button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative border-t border-slate-200 bg-white py-16">
        <div className="container">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            {/* Brand */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center gap-2 mb-4">
                <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-[#3ECF8E] to-[#2FBF9B]" />
                <span
                  className="text-lg font-semibold text-slate-900"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Nestly AI
                </span>
              </div>
              <p className="text-sm text-slate-600" style={{ fontFamily: "var(--font-body)" }}>
                AI Operating System for Property Finance
              </p>
            </motion.div>

            {/* Product */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h4
                className="font-semibold text-slate-900 mb-4"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Product
              </h4>
              <ul className="flex flex-col gap-2">
                {["Features", "Pricing", "Security", "Roadmap"].map((item) => (
                  <li key={item}>
                    <button
                      onClick={() => handleLink(item)}
                      className="text-sm text-slate-600 hover:text-slate-900 transition-colors"
                      style={{ fontFamily: "var(--font-body)" }}
                    >
                      {item}
                    </button>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Company */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h4
                className="font-semibold text-slate-900 mb-4"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Company
              </h4>
              <ul className="flex flex-col gap-2">
                {["About", "Blog", "Careers", "Contact"].map((item) => (
                  <li key={item}>
                    <button
                      onClick={() => handleLink(item)}
                      className="text-sm text-slate-600 hover:text-slate-900 transition-colors"
                      style={{ fontFamily: "var(--font-body)" }}
                    >
                      {item}
                    </button>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Legal */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h4
                className="font-semibold text-slate-900 mb-4"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Legal
              </h4>
              <ul className="flex flex-col gap-2">
                {["Privacy", "Terms", "Compliance", "Cookies"].map((item) => (
                  <li key={item}>
                    <button
                      onClick={() => handleLink(item)}
                      className="text-sm text-slate-600 hover:text-slate-900 transition-colors"
                      style={{ fontFamily: "var(--font-body)" }}
                    >
                      {item}
                    </button>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Bottom */}
          <div className="border-t border-slate-200 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-slate-600" style={{ fontFamily: "var(--font-body)" }}>
              © 2026 Nestly AI. All rights reserved.
            </p>
            <div className="flex gap-4">
              {["Twitter", "LinkedIn", "GitHub"].map((social) => (
                <button
                  key={social}
                  onClick={() => handleLink(social)}
                  className="text-sm text-slate-600 hover:text-slate-900 transition-colors"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  {social}
                </button>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
