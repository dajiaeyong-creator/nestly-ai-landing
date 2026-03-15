/*
 * NESTLY AI Login Page – Modern Fintech Design
 * Clean login form matching Nestly branding
 */

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";

interface LoginFormData {
  email: string;
  password: string;
}

export default function Login() {
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = (): boolean => {
    if (!formData.email.trim()) {
      toast.error("Please enter your email address");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email address");
      return false;
    }

    if (!formData.password) {
      toast.error("Please enter your password");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Login successful! Redirecting to dashboard...");
      // In a real app, this would navigate to /dashboard
      // For now, we'll just show a toast
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-slate-50 to-white flex items-center justify-center py-12 px-4">
      {/* Background glow */}
      <div
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(62, 207, 142, 0.08) 0%, transparent 70%)",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-md"
      >
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex justify-center mb-8"
        >
          <a href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#3ECF8E] to-[#2FBF9B]" />
            <span
              className="text-lg font-semibold text-slate-900"
              style={{ fontFamily: "var(--font-body)" }}
            >
              Nestly AI
            </span>
          </a>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center mb-8"
        >
          <h1
            className="text-3xl sm:text-4xl font-bold text-slate-900 mb-3"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Welcome back to Nestly
          </h1>
          <p
            className="text-base text-slate-600"
            style={{ fontFamily: "var(--font-body)" }}
          >
            Log in to manage your properties and financial analytics.
          </p>
        </motion.div>

        {/* Login Card */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="nestly-card rounded-2xl p-8 shadow-lg"
        >
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-slate-900 mb-2"
                style={{ fontFamily: "var(--font-body)" }}
              >
                Email Address
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

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-slate-900"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => {
                    toast("Password Reset — coming soon", {
                      description: "This feature is under development.",
                    });
                  }}
                  className="text-xs text-[#3ECF8E] hover:text-[#2FBF9B] transition-colors font-medium"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  Forgot?
                </button>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="••••••••"
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-200 bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#3ECF8E] focus:border-transparent transition-all"
                  style={{ fontFamily: "var(--font-body)" }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full btn-primary py-3 rounded-lg font-medium transition-all disabled:opacity-70 disabled:cursor-not-allowed mt-6 flex items-center justify-center gap-2"
              style={{ fontFamily: "var(--font-body)" }}
            >
              {isLoading ? "Logging in..." : "Log In"}
              {!isLoading && <ArrowRight size={16} />}
            </button>
          </form>

          {/* Sign Up Link */}
          <div className="text-center mt-6 pt-6 border-t border-slate-200">
            <p
              className="text-sm text-slate-600"
              style={{ fontFamily: "var(--font-body)" }}
            >
              Don't have an account?{" "}
              <a
                href="/signup"
                className="text-[#3ECF8E] hover:text-[#2FBF9B] transition-colors font-medium"
              >
                Sign Up
              </a>
            </p>
          </div>
        </motion.div>

        {/* Back to home */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-8"
        >
          <a
            href="/"
            className="text-sm text-slate-600 hover:text-slate-900 transition-colors"
            style={{ fontFamily: "var(--font-body)" }}
          >
            ← Back to home
          </a>
        </motion.div>
      </motion.div>
    </div>
  );
}
