/*
 * Vendor Invite Modal – Invite vendors to join platform
 * Vendors complete their own onboarding with banking and tax info
 */

import { motion } from "framer-motion";
import { X, Mail, AlertCircle } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface VendorInviteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const serviceTypes = [
  "Plumbing",
  "Electrical",
  "Landscaping",
  "Cleaning",
  "Legal",
  "HVAC",
  "Roofing",
  "General Maintenance",
];

export default function VendorInviteModal({ isOpen, onClose }: VendorInviteModalProps) {
  const [vendorName, setVendorName] = useState("");
  const [email, setEmail] = useState("");
  const [serviceType, setServiceType] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!vendorName || !email || !serviceType) {
      toast.error("Please fill in all fields");
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      toast.success(`Invitation sent to ${email}`);
      setVendorName("");
      setEmail("");
      setServiceType("");
      setIsSubmitting(false);
      onClose();
    }, 1000);
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-lg max-w-2xl w-full p-8"
      >
        <div className="flex items-start justify-between mb-6">
          <h2 className="text-2xl font-bold text-slate-900" style={{ fontFamily: "var(--font-display)" }}>
            Invite Vendor
          </h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <X size={24} />
          </button>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 flex gap-3">
          <AlertCircle size={20} className="text-blue-600 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-blue-900" style={{ fontFamily: "var(--font-body)" }}>
            The vendor will receive an email invitation to create their account and complete onboarding, including banking details and tax documentation.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2" style={{ fontFamily: "var(--font-body)" }}>
              Vendor Name
            </label>
            <input
              type="text"
              value={vendorName}
              onChange={(e) => setVendorName(e.target.value)}
              placeholder="e.g., ProFix Plumbing"
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#3ECF8E] focus:border-transparent outline-none"
              style={{ fontFamily: "var(--font-body)" }}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2" style={{ fontFamily: "var(--font-body)" }}>
              Email Address
            </label>
            <div className="relative">
              <Mail size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="vendor@company.com"
                className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#3ECF8E] focus:border-transparent outline-none"
                style={{ fontFamily: "var(--font-body)" }}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2" style={{ fontFamily: "var(--font-body)" }}>
              Service Type
            </label>
            <select
              value={serviceType}
              onChange={(e) => setServiceType(e.target.value)}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#3ECF8E] focus:border-transparent outline-none"
              style={{ fontFamily: "var(--font-body)" }}
            >
              <option value="">Select service type</option>
              {serviceTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div className="flex gap-4 pt-6 border-t border-slate-200">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 px-4 py-3 bg-[#3ECF8E] text-white rounded-lg font-medium hover:bg-[#2FBF9B] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ fontFamily: "var(--font-body)" }}
            >
              {isSubmitting ? "Sending..." : "Send Invitation"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 border border-slate-300 text-slate-700 rounded-lg font-medium hover:bg-slate-50 transition-all"
              style={{ fontFamily: "var(--font-body)" }}
            >
              Cancel
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}
