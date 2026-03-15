/*
 * User Management Page
 * Invite and manage team members (managers, accountants, investors, tenants, vendors)
 */

import { motion } from "framer-motion";
import { Users, Plus, Mail, Trash2, CheckCircle, Clock, AlertCircle, UserPlus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const userRoles = [
  { id: "manager", label: "Property Manager", icon: "👔", color: "from-blue-500 to-blue-600", description: "Manage properties and tenants" },
  { id: "accountant", label: "Accountant", icon: "📊", color: "from-green-500 to-green-600", description: "Handle financial records" },
  { id: "investor", label: "Investor", icon: "💰", color: "from-yellow-500 to-yellow-600", description: "View portfolio analytics" },
  { id: "tenant", label: "Tenant", icon: "🏠", color: "from-purple-500 to-purple-600", description: "Access tenant portal" },
  { id: "vendor", label: "Vendor", icon: "🔧", color: "from-red-500 to-red-600", description: "Manage maintenance jobs" },
];

const teamMembers = [
  { id: 1, name: "John Smith", email: "john@example.com", role: "manager", status: "active", joinedDate: "Jan 15, 2026" },
  { id: 2, name: "Sarah Johnson", email: "sarah@example.com", role: "accountant", status: "active", joinedDate: "Feb 1, 2026" },
  { id: 3, name: "Mike Davis", email: "mike@example.com", role: "investor", status: "pending", joinedDate: "Mar 5, 2026" },
  { id: 4, name: "Emily Chen", email: "emily@example.com", role: "manager", status: "active", joinedDate: "Feb 20, 2026" },
];

interface InviteForm {
  email: string;
  role: string;
  message: string;
}

export default function UserManagement() {
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [selectedRole, setSelectedRole] = useState("");
  const [inviteForm, setInviteForm] = useState<InviteForm>({ email: "", role: "", message: "" });
  const [teamMembers_, setTeamMembers] = useState(teamMembers);

  const handleInvite = () => {
    if (!inviteForm.email || !inviteForm.role) {
      toast.error("Please fill in all fields");
      return;
    }

    toast.success(`Invitation sent to ${inviteForm.email}`);
    setInviteForm({ email: "", role: "", message: "" });
    setShowInviteModal(false);
  };

  const handleRemoveMember = (id: number) => {
    setTeamMembers(teamMembers_.filter((m) => m.id !== id));
    toast.success("Team member removed");
  };

  const handleRoleSelect = (roleId: string) => {
    setSelectedRole(roleId);
    setInviteForm({ ...inviteForm, role: roleId });
  };

  const getStatusBadge = (status: string) => {
    if (status === "active") {
      return <span className="flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full bg-green-100 text-green-700"><CheckCircle size={14} /> Active</span>;
    }
    return <span className="flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full bg-yellow-100 text-yellow-700"><Clock size={14} /> Pending</span>;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-slate-50 to-blue-50">
      {/* Header */}
      <div className="sticky top-0 z-20 border-b border-slate-100 bg-white/80 backdrop-blur-md shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600">
                <Users size={20} className="text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-900" style={{ fontFamily: "var(--font-display)" }}>
                  User Management
                </h1>
                <p className="text-sm text-slate-500">Invite and manage team members</p>
              </div>
            </div>
            <button
              onClick={() => setShowInviteModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#3ECF8E] to-[#2FBF9B] text-white rounded-lg font-medium hover:shadow-lg transition-all"
            >
              <Plus size={18} />
              Invite Member
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
        {/* Current Team Members */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="rounded-2xl p-6 bg-white border border-slate-200 shadow-sm"
        >
          <h2 className="text-lg font-semibold text-slate-900 mb-6" style={{ fontFamily: "var(--font-display)" }}>
            Team Members ({teamMembers_.length})
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left py-3 px-4 font-semibold text-slate-700">Name</th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-700">Email</th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-700">Role</th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-700">Status</th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-700">Joined</th>
                  <th className="text-right py-3 px-4 font-semibold text-slate-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {teamMembers_.map((member) => (
                  <tr key={member.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-4 font-medium text-slate-900">{member.name}</td>
                    <td className="py-3 px-4 text-slate-600">{member.email}</td>
                    <td className="py-3 px-4">
                      <span className="text-xs font-medium px-2 py-1 rounded-full bg-slate-100 text-slate-700">
                        {userRoles.find((r) => r.id === member.role)?.label}
                      </span>
                    </td>
                    <td className="py-3 px-4">{getStatusBadge(member.status)}</td>
                    <td className="py-3 px-4 text-slate-600">{member.joinedDate}</td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => handleRemoveMember(member.id)}
                        className="p-2 hover:bg-red-50 rounded-lg transition-colors text-red-600"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Invite Modal */}
        {showInviteModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-2xl p-8 max-w-2xl w-full mx-4 shadow-2xl"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-slate-900" style={{ fontFamily: "var(--font-display)" }}>
                  Invite Team Member
                </h2>
                <button
                  onClick={() => setShowInviteModal(false)}
                  className="text-slate-500 hover:text-slate-700 text-2xl"
                >
                  ×
                </button>
              </div>

              {/* Role Selection */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-slate-900 mb-4">Select Role:</label>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                  {userRoles.map((role) => (
                    <button
                      key={role.id}
                      onClick={() => handleRoleSelect(role.id)}
                      className={`p-4 rounded-xl border-2 transition-all text-center ${
                        selectedRole === role.id
                          ? "border-[#3ECF8E] bg-[#3ECF8E]/10"
                          : "border-slate-200 hover:border-slate-300"
                      }`}
                    >
                      <div className="text-2xl mb-2">{role.icon}</div>
                      <div className="text-xs font-semibold text-slate-900">{role.label}</div>
                      <div className="text-xs text-slate-500 mt-1">{role.description}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Email Input */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-slate-900 mb-2">Email Address:</label>
                <input
                  type="email"
                  value={inviteForm.email}
                  onChange={(e) => setInviteForm({ ...inviteForm, email: e.target.value })}
                  placeholder="user@example.com"
                  className="w-full px-4 py-3 border border-slate-200 rounded-lg outline-none focus:border-[#3ECF8E] transition-colors"
                />
              </div>

              {/* Message */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-slate-900 mb-2">Message (Optional):</label>
                <textarea
                  value={inviteForm.message}
                  onChange={(e) => setInviteForm({ ...inviteForm, message: e.target.value })}
                  placeholder="Add a personal message to the invitation..."
                  rows={3}
                  className="w-full px-4 py-3 border border-slate-200 rounded-lg outline-none focus:border-[#3ECF8E] transition-colors resize-none"
                />
              </div>

              {/* Actions */}
              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => setShowInviteModal(false)}
                  className="px-6 py-2 border border-slate-200 rounded-lg text-slate-700 font-medium hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleInvite}
                  className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-[#3ECF8E] to-[#2FBF9B] text-white rounded-lg font-medium hover:shadow-lg transition-all"
                >
                  <Mail size={16} />
                  Send Invitation
                </button>
              </div>
            </motion.div>
          </div>
        )}

        {/* Role Information Cards */}
        <div>
          <h2 className="text-lg font-semibold text-slate-900 mb-4" style={{ fontFamily: "var(--font-display)" }}>
            Available Roles
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {userRoles.map((role) => (
              <motion.div
                key={role.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="rounded-xl p-4 bg-white border border-slate-200 shadow-sm hover:shadow-md transition-all"
              >
                <div className="text-3xl mb-2">{role.icon}</div>
                <h3 className="font-semibold text-slate-900 mb-1">{role.label}</h3>
                <p className="text-xs text-slate-600">{role.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
