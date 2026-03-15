/*
 * NESTLY AI Sign Up Page – Modern Fintech Design
 * Clean signup form with role-specific fields
 */

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";

interface SignUpFormData {
  fullName: string;
  companyName: string;
  email: string;
  password: string;
  role: string;
  unitsManaged: string;
  // Tenant-specific fields
  propertyAddress: string;
  unitNumber: string;
  landlordCode: string;
}

const roles = [
  "Property Owner",
  "Property Manager",
  "Investor",
  "Tenant",
  "Accountant",
  "HOA Administrator",
];

const unitsOptions = ["1–10", "11–50", "51–100", "101–500", "500+"];

export default function SignUp() {
  const [formData, setFormData] = useState<SignUpFormData>({
    fullName: "",
    companyName: "",
    email: "",
    password: "",
    role: "",
    unitsManaged: "",
    propertyAddress: "",
    unitNumber: "",
    landlordCode: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [signupComplete, setSignupComplete] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const isTenant = formData.role === "Tenant";
  const isPropertyOwnerOrManager =
    formData.role === "Property Owner" || formData.role === "Property Manager";

  const validateForm = (): boolean => {
    if (!formData.fullName.trim()) {
      toast.error("Please enter your full name");
      return false;
    }

    // Company name is required for Property Owner/Manager, optional for others
    if (isPropertyOwnerOrManager && !formData.companyName.trim()) {
      toast.error("Please enter your company name");
      return false;
    }

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
      toast.error("Please enter a password");
      return false;
    }

    if (formData.password.length < 8) {
      toast.error("Password must be at least 8 characters long");
      return false;
    }

    if (!formData.role) {
      toast.error("Please select your role");
      return false;
    }

    // Units Managed is required for Property Owner/Manager
    if (isPropertyOwnerOrManager && !formData.unitsManaged) {
      toast.error("Please select the number of units managed");
      return false;
    }

    // Tenant-specific validation
    if (isTenant) {
      if (!formData.propertyAddress.trim()) {
        toast.error("Please enter the property address");
        return false;
      }
      if (!formData.unitNumber.trim()) {
        toast.error("Please enter your unit or apartment number");
        return false;
      }
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
      setSignupComplete(true);
      toast.success("Account created successfully!");
    }, 1200);
  };

  if (signupComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white via-slate-50 to-white flex items-center justify-center py-12 px-4">
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
          className="relative z-10 w-full max-w-md text-center"
        >
          <div className="mb-6">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#3ECF8E] to-[#2FBF9B] flex items-center justify-center mx-auto mb-4">
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <h2
              className="text-3xl font-bold text-slate-900 mb-2"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Welcome to Nestly!
            </h2>
            <p
              className="text-slate-600 mb-6"
              style={{ fontFamily: "var(--font-body)" }}
            >
              Your account has been created successfully. You're all set to get started.
            </p>
          </div>

          <a
            href="/login"
            className="inline-block px-8 py-3 rounded-lg bg-gradient-to-r from-[#3ECF8E] to-[#2FBF9B] text-white font-medium hover:shadow-lg transition-all"
            style={{ fontFamily: "var(--font-body)" }}
          >
            Go to Login
          </a>
        </motion.div>
      </div>
    );
  }

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
            Create your account
          </h1>
          <p
            className="text-base text-slate-600"
            style={{ fontFamily: "var(--font-body)" }}
          >
            {isTenant
              ? "Join a property and start managing your rent payments."
              : "Set up your property management platform."}
          </p>
        </motion.div>

        {/* Signup Card */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="nestly-card rounded-2xl p-8 shadow-lg"
        >
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Full Name */}
            <div>
              <label
                htmlFor="fullName"
                className="block text-sm font-medium text-slate-900 mb-2"
                style={{ fontFamily: "var(--font-body)" }}
              >
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                placeholder="John Doe"
                className="w-full px-4 py-2.5 rounded-lg border border-slate-200 bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#3ECF8E] focus:border-transparent transition-all"
                style={{ fontFamily: "var(--font-body)" }}
              />
            </div>

            {/* Company Name - Only for Property Owners/Managers */}
            {isPropertyOwnerOrManager && (
              <div>
                <label
                  htmlFor="companyName"
                  className="block text-sm font-medium text-slate-900 mb-2"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  Company Name
                  <span className="text-red-500"> *</span>
                </label>
                <input
                  type="text"
                  id="companyName"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleInputChange}
                  placeholder="Your company name"
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-200 bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#3ECF8E] focus:border-transparent transition-all"
                  style={{ fontFamily: "var(--font-body)" }}
                />
                <p
                  className="text-xs text-slate-500 mt-1"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  Company or organization name (if applicable)
                </p>
              </div>
            )}

            {/* Email Address */}
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
              <label
                htmlFor="password"
                className="block text-sm font-medium text-slate-900 mb-2"
                style={{ fontFamily: "var(--font-body)" }}
              >
                Password
              </label>
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
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              <p
                className="text-xs text-slate-500 mt-1"
                style={{ fontFamily: "var(--font-body)" }}
              >
                Minimum 8 characters
              </p>
            </div>

            {/* Role Selection */}
            <div>
              <label
                htmlFor="role"
                className="block text-sm font-medium text-slate-900 mb-2"
                style={{ fontFamily: "var(--font-body)" }}
              >
                Role
              </label>
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 rounded-lg border border-slate-200 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#3ECF8E] focus:border-transparent transition-all"
                style={{ fontFamily: "var(--font-body)" }}
              >
                <option value="">Select your role</option>
                {roles.map((role) => (
                  <option key={role} value={role}>
                    {role}
                  </option>
                ))}
              </select>
            </div>

            {/* Units Managed - Only for Property Owners/Managers */}
            {isPropertyOwnerOrManager && (
              <div>
                <label
                  htmlFor="unitsManaged"
                  className="block text-sm font-medium text-slate-900 mb-2"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  Units Managed
                  <span className="text-red-500"> *</span>
                </label>
                <select
                  id="unitsManaged"
                  name="unitsManaged"
                  value={formData.unitsManaged}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-200 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#3ECF8E] focus:border-transparent transition-all"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  <option value="">Select units managed</option>
                  {unitsOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Tenant-Specific Fields */}
            {isTenant && (
              <>
                <div>
                  <label
                    htmlFor="propertyAddress"
                    className="block text-sm font-medium text-slate-900 mb-2"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    Property Address
                    <span className="text-red-500"> *</span>
                  </label>
                  <input
                    type="text"
                    id="propertyAddress"
                    name="propertyAddress"
                    value={formData.propertyAddress}
                    onChange={handleInputChange}
                    placeholder="123 Main St, City, State"
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-200 bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#3ECF8E] focus:border-transparent transition-all"
                    style={{ fontFamily: "var(--font-body)" }}
                  />
                </div>

                <div>
                  <label
                    htmlFor="unitNumber"
                    className="block text-sm font-medium text-slate-900 mb-2"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    Unit or Apartment Number
                    <span className="text-red-500"> *</span>
                  </label>
                  <input
                    type="text"
                    id="unitNumber"
                    name="unitNumber"
                    value={formData.unitNumber}
                    onChange={handleInputChange}
                    placeholder="e.g., 4B or Apt 201"
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-200 bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#3ECF8E] focus:border-transparent transition-all"
                    style={{ fontFamily: "var(--font-body)" }}
                  />
                </div>

                <div>
                  <label
                    htmlFor="landlordCode"
                    className="block text-sm font-medium text-slate-900 mb-2"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    Landlord Invitation Code
                  </label>
                  <input
                    type="text"
                    id="landlordCode"
                    name="landlordCode"
                    value={formData.landlordCode}
                    onChange={handleInputChange}
                    placeholder="Optional - provided by your landlord"
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-200 bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#3ECF8E] focus:border-transparent transition-all"
                    style={{ fontFamily: "var(--font-body)" }}
                  />
                  <p
                    className="text-xs text-slate-500 mt-1"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    If your landlord has invited you, enter the code they provided
                  </p>
                </div>
              </>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full btn-primary py-3 rounded-lg font-medium transition-all disabled:opacity-70 disabled:cursor-not-allowed mt-6 flex items-center justify-center gap-2"
              style={{ fontFamily: "var(--font-body)" }}
            >
              {isLoading ? "Creating account..." : "Create Account"}
              {!isLoading && <ArrowRight size={16} />}
            </button>
          </form>

          {/* Sign In Link */}
          <div className="text-center mt-6 pt-6 border-t border-slate-200">
            <p
              className="text-sm text-slate-600"
              style={{ fontFamily: "var(--font-body)" }}
            >
              Already have an account?{" "}
              <a
                href="/login"
                className="text-[#3ECF8E] hover:text-[#2FBF9B] transition-colors font-medium"
              >
                Sign In
              </a>
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
