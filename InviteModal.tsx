/*
 * NESTLY AI Invite Modal – Role-Based Invitation System
 * Allows users to invite others based on their role
 */

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Mail, Send } from "lucide-react";
import { toast } from "sonner";

interface InviteModalProps {
  isOpen: boolean;
  onClose: () => void;
  userRole: string;
}

// Define which roles each user type can invite
const invitationPermissions: Record<string, string[]> = {
  "Property Owner": [
    "Tenant",
    "Property Manager",
    "Accountant",
    "Investor",
  ],
  "Property Manager": [
    "Tenant",
    "Property Owner",
    "Maintenance Staff",
    "Investor",
  ],
  Investor: [
    "Property Manager",
    "Accountant",
    "Investment Partner",
  ],
  "HOA Administrator": [
    "Resident",
    "HOA Board Member",
    "Property Manager",
    "Accountant",
  ],
  Tenant: ["Co-Tenant"],
  Accountant: [],
};

interface InviteFormData {
  email: string;
  role: string;
  message: string;
}

export default function InviteModal({ isOpen, onClose, userRole }: InviteModalProps) {
  const [formData, setFormData] = useState<InviteFormData>({
    email: "",
    role: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [invitedEmails, setInvitedEmails] = useState<Array<{ email: string; role: string }>>([]);

  const availableRoles = invitationPermissions[userRole] || [];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = (): boolean => {
    if (!formData.email.trim()) {
      toast.error("Please enter an email address");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email address");
      return false;
    }

    if (!formData.role) {
      toast.error("Please select a role");
      return false;
    }

    if (invitedEmails.some((inv) => inv.email === formData.email)) {
      toast.error("This email is already invited");
      return false;
    }

    return true;
  };

  const handleAddInvite = () => {
    if (validateForm()) {
      setInvitedEmails([
        ...invitedEmails,
        { email: formData.email, role: formData.role },
      ]);
      setFormData({ email: "", role: "", message: "" });
      toast.success("Invitation added");
    }
  };

  const handleRemoveInvite = (email: string) => {
    setInvitedEmails(invitedEmails.filter((inv) => inv.email !== email));
  };

  const handleSendInvites = async () => {
    if (invitedEmails.length === 0) {
      toast.error("Please add at least one invitation");
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast.success(`${invitedEmails.length} invitation(s) sent successfully!`);
      setInvitedEmails([]);
      setFormData({ email: "", role: "", message: "" });
      onClose();
    }, 1200);
  };

  if (availableRoles.length === 0) {
    return (
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl p-8 max-w-md w-full shadow-xl"
            >
              <div className="flex items-center justify-between mb-6">
                <h2
                  className="text-xl font-bold text-slate-900"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Invitations
                </h2>
                <button
                  onClick={onClose}
                  className="text-slate-400 hover:text-slate-600 transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              <p
                className="text-slate-600 text-center"
                style={{ fontFamily: "var(--font-body)" }}
              >
                Your role ({userRole}) doesn't have permission to invite other users.
              </p>

              <button
                onClick={onClose}
                className="w-full mt-6 px-4 py-2 rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-900 font-medium transition-all"
                style={{ fontFamily: "var(--font-body)" }}
              >
                Close
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    );
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-white rounded-2xl p-8 max-w-md w-full shadow-xl max-h-[90vh] overflow-y-auto"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2
                  className="text-xl font-bold text-slate-900"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Invite Users
                </h2>
                <p
                  className="text-sm text-slate-600 mt-1"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  As a {userRole}, you can invite:
                </p>
              </div>
              <button
                onClick={onClose}
                className="text-slate-400 hover:text-slate-600 transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Available Roles */}
            <div className="mb-6 p-3 bg-slate-50 rounded-lg border border-slate-200">
              <div className="flex flex-wrap gap-2">
                {availableRoles.map((role) => (
                  <span
                    key={role}
                    className="px-3 py-1 bg-gradient-to-r from-[#3ECF8E] to-[#2FBF9B] text-white text-xs font-medium rounded-full"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    {role}
                  </span>
                ))}
              </div>
            </div>

            {/* Invite Form */}
            <div className="space-y-4 mb-6">
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
                  placeholder="user@example.com"
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-200 bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#3ECF8E] focus:border-transparent transition-all"
                  style={{ fontFamily: "var(--font-body)" }}
                />
              </div>

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
                  <option value="">Select role</option>
                  {availableRoles.map((role) => (
                    <option key={role} value={role}>
                      {role}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-slate-900 mb-2"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  Message (Optional)
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Add a personal message..."
                  rows={3}
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-200 bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#3ECF8E] focus:border-transparent transition-all resize-none"
                  style={{ fontFamily: "var(--font-body)" }}
                />
              </div>

              <button
                onClick={handleAddInvite}
                className="w-full px-4 py-2.5 rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-900 font-medium transition-all flex items-center justify-center gap-2"
                style={{ fontFamily: "var(--font-body)" }}
              >
                <Mail size={16} />
                Add Invitation
              </button>
            </div>

            {/* Invited Users List */}
            {invitedEmails.length > 0 && (
              <div className="mb-6 border-t border-slate-200 pt-6">
                <h3
                  className="text-sm font-semibold text-slate-900 mb-3"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  Pending Invitations ({invitedEmails.length})
                </h3>
                <div className="space-y-2">
                  {invitedEmails.map((invite) => (
                    <div
                      key={invite.email}
                      className="flex items-center justify-between bg-slate-50 p-3 rounded-lg border border-slate-200"
                    >
                      <div>
                        <p
                          className="text-sm font-medium text-slate-900"
                          style={{ fontFamily: "var(--font-body)" }}
                        >
                          {invite.email}
                        </p>
                        <p
                          className="text-xs text-slate-600"
                          style={{ fontFamily: "var(--font-body)" }}
                        >
                          Role: {invite.role}
                        </p>
                      </div>
                      <button
                        onClick={() => handleRemoveInvite(invite.email)}
                        className="text-slate-400 hover:text-red-500 transition-colors"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="flex-1 px-4 py-2.5 rounded-lg border border-slate-200 bg-white text-slate-900 font-medium hover:bg-slate-50 transition-all"
                style={{ fontFamily: "var(--font-body)" }}
              >
                Cancel
              </button>
              <button
                onClick={handleSendInvites}
                disabled={isLoading || invitedEmails.length === 0}
                className="flex-1 btn-primary py-2.5 rounded-lg font-medium transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                style={{ fontFamily: "var(--font-body)" }}
              >
                {isLoading ? "Sending..." : "Send Invitations"}
                {!isLoading && <Send size={16} />}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
