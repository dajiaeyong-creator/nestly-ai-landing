/**
 * User Management Page
 * Administrators can invite, manage, and configure permissions for all user roles
 */

import { motion } from "framer-motion";
import { Users, Plus, Edit2, Trash2, Mail, Lock, Unlock, MoreVertical, Search, Filter, ChevronDown } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

interface User {
  id: string;
  name: string;
  email: string;
  role: "owner" | "manager" | "accountant" | "investor" | "tenant" | "vendor";
  propertiesAssigned: number;
  status: "active" | "pending" | "disabled";
  lastLogin: string;
  joinDate: string;
}

interface RolePermissions {
  role: string;
  permissions: string[];
  description: string;
}

const ROLE_PERMISSIONS: RolePermissions[] = [
  {
    role: "Owner",
    description: "Full platform access and administrative control",
    permissions: [
      "View all properties",
      "Manage all users",
      "Configure bank connections",
      "View financial reports",
      "Manage vendors",
      "Create automation rules",
      "Access AI insights",
      "Export reports",
    ],
  },
  {
    role: "Property Manager",
    description: "Manage properties, tenants, and maintenance",
    permissions: [
      "View assigned properties",
      "Manage tenants",
      "Create maintenance requests",
      "Assign vendors",
      "Track rent collection",
      "View property reports",
      "Communicate with tenants",
      "Upload documents",
    ],
  },
  {
    role: "Accountant",
    description: "Financial oversight and reporting",
    permissions: [
      "View financial ledger",
      "Generate reports",
      "Analyze expenses",
      "Export tax summaries",
      "View payment history",
      "Reconcile accounts",
      "Create custom reports",
      "Access audit logs",
    ],
  },
  {
    role: "Investor",
    description: "Portfolio performance and analytics",
    permissions: [
      "View portfolio metrics",
      "Access investor reports",
      "View cash flow projections",
      "Analyze ROI",
      "View distribution summaries",
      "Download reports",
      "Access AI insights",
    ],
  },
  {
    role: "Tenant",
    description: "Limited access to personal property information",
    permissions: [
      "View lease information",
      "Submit maintenance requests",
      "View payment history",
      "Download documents",
      "Communicate with manager",
      "Track maintenance status",
    ],
  },
  {
    role: "Vendor",
    description: "Job and payment management",
    permissions: [
      "View assigned jobs",
      "Update job status",
      "Submit invoices",
      "Upload photos",
      "View payment history",
      "Track earnings",
      "Communicate with manager",
    ],
  },
];

export default function UserManagementAdmin() {
  const [users, setUsers] = useState<User[]>([
    {
      id: "1",
      name: "John Smith",
      email: "john@example.com",
      role: "owner",
      propertiesAssigned: 12,
      status: "active",
      lastLogin: "2026-03-07",
      joinDate: "2025-01-15",
    },
    {
      id: "2",
      name: "Sarah Johnson",
      email: "sarah@example.com",
      role: "manager",
      propertiesAssigned: 5,
      status: "active",
      lastLogin: "2026-03-06",
      joinDate: "2025-06-20",
    },
    {
      id: "3",
      name: "Michael Chen",
      email: "michael@example.com",
      role: "accountant",
      propertiesAssigned: 0,
      status: "active",
      lastLogin: "2026-03-07",
      joinDate: "2025-08-10",
    },
    {
      id: "4",
      name: "Emma Davis",
      email: "emma@example.com",
      role: "investor",
      propertiesAssigned: 8,
      status: "active",
      lastLogin: "2026-03-05",
      joinDate: "2025-11-01",
    },
    {
      id: "5",
      name: "Alex Rodriguez",
      email: "alex@example.com",
      role: "manager",
      propertiesAssigned: 3,
      status: "pending",
      lastLogin: "Never",
      joinDate: "2026-02-28",
    },
  ]);

  const [showInviteModal, setShowInviteModal] = useState(false);
  const [showPermissionsModal, setShowPermissionsModal] = useState(false);
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState<string>("all");
  const [inviteForm, setInviteForm] = useState({
    name: "",
    email: "",
    role: "manager" as const,
    properties: [] as string[],
  });

  const getRoleColor = (role: string) => {
    const colors: Record<string, string> = {
      owner: "bg-purple-100 text-purple-700",
      manager: "bg-blue-100 text-blue-700",
      accountant: "bg-green-100 text-green-700",
      investor: "bg-orange-100 text-orange-700",
      tenant: "bg-slate-100 text-slate-700",
      vendor: "bg-emerald-100 text-emerald-700",
    };
    return colors[role] || "bg-slate-100 text-slate-700";
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      active: "bg-green-100 text-green-700",
      pending: "bg-yellow-100 text-yellow-700",
      disabled: "bg-red-100 text-red-700",
    };
    return colors[status] || "bg-slate-100 text-slate-700";
  };

  const handleInviteUser = () => {
    if (!inviteForm.name || !inviteForm.email) {
      toast.error("Please fill in all required fields");
      return;
    }

    const newUser: User = {
      id: String(users.length + 1),
      name: inviteForm.name,
      email: inviteForm.email,
      role: inviteForm.role,
      propertiesAssigned: inviteForm.properties.length,
      status: "pending",
      lastLogin: "Never",
      joinDate: new Date().toISOString().split("T")[0],
    };

    setUsers([...users, newUser]);
    setInviteForm({ name: "", email: "", role: "manager", properties: [] });
    setShowInviteModal(false);
    toast.success(`Invitation sent to ${inviteForm.email}`);
  };

  const handleChangeRole = (userId: string, newRole: string) => {
    setUsers(
      users.map((user) =>
        user.id === userId ? { ...user, role: newRole as any } : user
      )
    );
    toast.success("User role updated");
  };

  const handleDisableUser = (userId: string) => {
    setUsers(
      users.map((user) =>
        user.id === userId
          ? { ...user, status: user.status === "disabled" ? "active" : "disabled" }
          : user
      )
    );
    toast.success("User access updated");
  };

  const handleResendInvite = (email: string) => {
    toast.success(`Invitation resent to ${email}`);
  };

  const handleDeleteUser = (userId: string) => {
    setUsers(users.filter((user) => user.id !== userId));
    toast.success("User removed from platform");
  };

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === "all" || user.role === filterRole;
    return matchesSearch && matchesRole;
  });

  const rolePermissions = ROLE_PERMISSIONS.find(
    (rp) => rp.role.toLowerCase() === selectedRole?.toLowerCase()
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-lg">
                <Users className="text-white" size={24} />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-slate-900">
                  User Management
                </h1>
                <p className="text-slate-600">
                  Invite and manage platform users and permissions
                </p>
              </div>
            </div>
            <Button
              onClick={() => setShowInviteModal(true)}
              className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white gap-2"
            >
              <Plus size={20} />
              Invite User
            </Button>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8"
        >
          {[
            { label: "Total Users", value: users.length, color: "from-blue-400 to-blue-600" },
            { label: "Active Users", value: users.filter((u) => u.status === "active").length, color: "from-green-400 to-green-600" },
            { label: "Pending Invites", value: users.filter((u) => u.status === "pending").length, color: "from-yellow-400 to-yellow-600" },
            { label: "Disabled Users", value: users.filter((u) => u.status === "disabled").length, color: "from-red-400 to-red-600" },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 + index * 0.05 }}
              className={`bg-gradient-to-br ${stat.color} rounded-xl p-6 text-white shadow-lg`}
            >
              <p className="text-sm font-medium opacity-90">{stat.label}</p>
              <p className="text-3xl font-bold mt-2">{stat.value}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl shadow-md p-6 mb-6"
        >
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 text-slate-400" size={20} />
              <input
                type="text"
                placeholder="Search by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <select
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
              className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="all">All Roles</option>
              <option value="owner">Owner</option>
              <option value="manager">Property Manager</option>
              <option value="accountant">Accountant</option>
              <option value="investor">Investor</option>
              <option value="tenant">Tenant</option>
              <option value="vendor">Vendor</option>
            </select>
          </div>
        </motion.div>

        {/* Users Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl shadow-md overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-slate-50 to-slate-100 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">
                    User Name
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">
                    Role
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">
                    Email
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">
                    Properties
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">
                    Last Login
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {filteredUsers.map((user, index) => (
                  <motion.tr
                    key={user.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 + index * 0.05 }}
                    className="hover:bg-slate-50 transition-colors"
                  >
                    <td className="px-6 py-4 text-sm text-slate-900 font-medium">
                      {user.name}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${getRoleColor(
                          user.role
                        )}`}
                      >
                        {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">
                      {user.email}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">
                      {user.propertiesAssigned}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                          user.status
                        )}`}
                      >
                        {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">
                      {user.lastLogin}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <div className="flex gap-2">
                        {user.status === "pending" && (
                          <button
                            onClick={() => handleResendInvite(user.email)}
                            className="p-2 hover:bg-blue-100 rounded-lg transition-colors"
                            title="Resend invite"
                          >
                            <Mail size={16} className="text-blue-600" />
                          </button>
                        )}
                        <button
                          onClick={() => {
                            setSelectedRole(user.role);
                            setShowPermissionsModal(true);
                          }}
                          className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                          title="View permissions"
                        >
                          <Edit2 size={16} className="text-slate-600" />
                        </button>
                        <button
                          onClick={() => handleDisableUser(user.id)}
                          className={`p-2 rounded-lg transition-colors ${
                            user.status === "disabled"
                              ? "hover:bg-green-100"
                              : "hover:bg-red-100"
                          }`}
                          title={
                            user.status === "disabled"
                              ? "Enable user"
                              : "Disable user"
                          }
                        >
                          {user.status === "disabled" ? (
                            <Unlock size={16} className="text-green-600" />
                          ) : (
                            <Lock size={16} className="text-red-600" />
                          )}
                        </button>
                        <button
                          onClick={() => handleDeleteUser(user.id)}
                          className="p-2 hover:bg-red-100 rounded-lg transition-colors"
                          title="Delete user"
                        >
                          <Trash2 size={16} className="text-red-600" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Invite Modal */}
        {showInviteModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowInviteModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white rounded-xl shadow-xl max-w-md w-full p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Invite User
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={inviteForm.name}
                    onChange={(e) =>
                      setInviteForm({ ...inviteForm, name: e.target.value })
                    }
                    placeholder="e.g., Jane Smith"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={inviteForm.email}
                    onChange={(e) =>
                      setInviteForm({ ...inviteForm, email: e.target.value })
                    }
                    placeholder="jane@example.com"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Role
                  </label>
                  <select
                    value={inviteForm.role}
                    onChange={(e) =>
                      setInviteForm({
                        ...inviteForm,
                        role: e.target.value as any,
                      })
                    }
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="manager">Property Manager</option>
                    <option value="accountant">Accountant</option>
                    <option value="investor">Investor</option>
                    <option value="tenant">Tenant</option>
                    <option value="vendor">Vendor</option>
                  </select>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    onClick={() => setShowInviteModal(false)}
                    className="flex-1 px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleInviteUser}
                    className="flex-1 px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-lg hover:from-emerald-600 hover:to-teal-600 transition-all"
                  >
                    Send Invitation
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Permissions Modal */}
        {showPermissionsModal && rolePermissions && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowPermissionsModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white rounded-xl shadow-xl max-w-md w-full p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-2xl font-bold text-slate-900 mb-2">
                {rolePermissions.role} Permissions
              </h2>
              <p className="text-slate-600 mb-4">{rolePermissions.description}</p>

              <div className="space-y-2 mb-6">
                {rolePermissions.permissions.map((permission, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                    <span className="text-sm text-slate-700">{permission}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => setShowPermissionsModal(false)}
                className="w-full px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-lg hover:from-emerald-600 hover:to-teal-600 transition-all"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
