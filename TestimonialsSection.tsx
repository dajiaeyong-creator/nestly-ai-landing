/*
 * NESTLY AI Testimonials Section – Modern Fintech Design
 * Social proof with customer quotes and avatars
 */

import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    quote:
      "Nestly cut our rent collection time by 80%. What used to take our team days now happens automatically.",
    author: "Sarah Chen",
    role: "Property Manager",
    company: "Urban Living Properties",
    avatar: "SC",
  },
  {
    quote:
      "The AI insights are incredible. We discovered underperforming properties we didn't know about. ROI increased 23%.",
    author: "Marcus Johnson",
    role: "Real Estate Investor",
    company: "Midwest Portfolio Group",
    avatar: "MJ",
  },
  {
    quote:
      "Finally, a platform built for property professionals. The interface is intuitive and the support team is responsive.",
    author: "Elena Rodriguez",
    role: "Portfolio Director",
    company: "Coastal Properties Inc",
    avatar: "ER",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function TestimonialsSection() {
  return (
    <section className="relative py-28 overflow-hidden bg-white">
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
            <Star size={12} className="text-[#3ECF8E]" />
            Trusted by Property Professionals
          </span>
          <h2
            className="text-4xl sm:text-5xl font-bold tracking-[-0.03em] text-slate-900 mb-5"
            style={{ fontFamily: "var(--font-display)" }}
          >
            What our customers{" "}
            <span className="gradient-text">are saying</span>
          </h2>
        </motion.div>

        {/* Testimonials grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid md:grid-cols-3 gap-6"
        >
          {testimonials.map((testimonial) => (
            <motion.div
              key={testimonial.author}
              variants={cardVariants}
              className="nestly-card nestly-card-hover p-6 flex flex-col gap-4"
            >
              {/* Stars */}
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    className="fill-[#3ECF8E] text-[#3ECF8E]"
                  />
                ))}
              </div>

              {/* Quote */}
              <p
                className="text-base text-slate-700 leading-relaxed flex-1"
                style={{ fontFamily: "var(--font-body)" }}
              >
                "{testimonial.quote}"
              </p>

              {/* Divider */}
              <div className="h-px bg-slate-200" />

              {/* Author */}
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full bg-gradient-to-br from-[#3ECF8E] to-[#2FBF9B] flex items-center justify-center text-sm font-bold text-white"
                >
                  {testimonial.avatar}
                </div>
                <div>
                  <p
                    className="text-sm font-semibold text-slate-900"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {testimonial.author}
                  </p>
                  <p className="text-xs text-slate-500" style={{ fontFamily: "var(--font-body)" }}>
                    {testimonial.role} at {testimonial.company}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
