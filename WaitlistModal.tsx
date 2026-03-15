/*
 * NESTLY AI Waitlist Modal – Modern Form Design
 * Collects user info for early access waitlist
 */

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Check } from "lucide-react";
import { toast } from "sonner";
import { useLocation } from "wouter";

interface WaitlistFormData {
  name: string;
  email: string;
  role: string;
  properties: string;
  message: string;
}

interface WaitlistModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const roles = [
  "Tenant",
  "Property Owner",
  "Property Manager",
  "Investor",
  "Accountant",
  "HOA",
];

const propertyRanges = ["1–10", "11–20", "21–50", "51–100", "100+"];

export default function WaitlistModal({ isOpen, onClose }: WaitlistModalProps) {
  const [, setLocation] = useLocation();
  const [formData, setFormData] = useState<WaitlistFormData>({
    name: "",
    email: "",
    role: "",
    properties: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate required fields
    if (!formData.name || !formData.email || !formData.role || !formData.properties) {
      toast.error("Please fill in all required fields");
      return;
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setSubmitted(true);

      // Auto-navigate to signup after 1.5 seconds
      setTimeout(() => {
        handleClose();
        setLocation("/signup");
      }, 1500);
    }, 800);
  };

  const handleClose = () => {
    setFormData({
      name: "",
      email: "",
      role: "",
      properties: "",
      message: "",
    });
    setSubmitted(false);
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
            onClick={handleClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md mx-4 z-50"
          >
            <div className="nestly-card rounded-2xl p-8 shadow-lg">
              {/* Close button */}
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 transition-colors"
              >
                <X size={20} />
              </button>

              {!submitted ? (
                <>
                  {/* Header */}
                  <div className="mb-6">
                    <h2
                      className="text-2xl font-bold text-slate-900 mb-2"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      Join the Waitlist
                    </h2>
                    <p
                      className="text-sm text-slate-600"
                      style={{ fontFamily: "var(--font-body)" }}
                    >
                      Join the Nestly AI waitlist to get early access to the
                      AI-powered property finance platform.
                    </p>
                  </div>

                  {/* Form */}
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Name */}
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-slate-900 mb-1.5"
                        style={{ fontFamily: "var(--font-body)" }}
                      >
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="John Doe"
                        className="w-full px-4 py-2.5 rounded-lg border border-slate-200 bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#3ECF8E] focus:border-transparent transition-all"
                        style={{ fontFamily: "var(--font-body)" }}
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-slate-900 mb-1.5"
                        style={{ fontFamily: "var(--font-body)" }}
                      >
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="john@example.com"
                        className="w-full px-4 py-2.5 rounded-lg border border-slate-200 bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#3ECF8E] focus:border-transparent transition-all"
                        style={{ fontFamily: "var(--font-body)" }}
                      />
                    </div>

                    {/* Role */}
                    <div>
                      <label
                        htmlFor="role"
                        className="block text-sm font-medium text-slate-900 mb-1.5"
                        style={{ fontFamily: "var(--font-body)" }}
                      >
                        Role *
                      </label>
                      <select
                        id="role"
                        name="role"
                        value={formData.role}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2.5 rounded-lg border border-slate-200 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#3ECF8E] focus:border-transparent transition-all"
                        style={{ fontFamily: "var(--font-body)" }}
                      >
                        <option value="">Select a role</option>
                        {roles.map((role) => (
                          <option key={role} value={role}>
                            {role}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Properties */}
                    <div>
                      <label
                        htmlFor="properties"
                        className="block text-sm font-medium text-slate-900 mb-1.5"
                        style={{ fontFamily: "var(--font-body)" }}
                      >
                        Number of Properties *
                      </label>
                      <select
                        id="properties"
                        name="properties"
                        value={formData.properties}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2.5 rounded-lg border border-slate-200 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#3ECF8E] focus:border-transparent transition-all"
                        style={{ fontFamily: "var(--font-body)" }}
                      >
                        <option value="">Select a range</option>
                        {propertyRanges.map((range) => (
                          <option key={range} value={range}>
                            {range}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Message */}
                    <div>
                      <label
                        htmlFor="message"
                        className="block text-sm font-medium text-slate-900 mb-1.5"
                        style={{ fontFamily: "var(--font-body)" }}
                      >
                        Message (Optional)
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="What are you hoping Nestly helps you solve?"
                        rows={3}
                        className="w-full px-4 py-2.5 rounded-lg border border-slate-200 bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#3ECF8E] focus:border-transparent transition-all resize-none"
                        style={{ fontFamily: "var(--font-body)" }}
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full btn-primary py-3 rounded-lg font-medium transition-all disabled:opacity-70 disabled:cursor-not-allowed mt-6"
                      style={{ fontFamily: "var(--font-body)" }}
                    >
                      {isLoading ? "Joining..." : "Join the Waitlist"}
                    </button>
                  </form>
                </>
              ) : (
                /* Confirmation */
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-8"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.1, type: "spring" }}
                    className="w-16 h-16 rounded-full bg-gradient-to-br from-[#3ECF8E] to-[#2FBF9B] flex items-center justify-center mx-auto mb-4"
                  >
                    <Check size={32} className="text-white" />
                  </motion.div>
                  <h3
                    className="text-2xl font-bold text-slate-900 mb-2"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    You're on the list!
                  </h3>
                  <p
                    className="text-slate-600"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    We'll notify you when Nestly AI launches.
                  </p>
                </motion.div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
