/*
 * Tenants Page – Portfolio Tenant Management
 * Display all tenants with add, invite, and search functionality
 */

import { motion } from "framer-motion";
import {
  Search,
  Plus,
  Mail,
  ChevronRight,
  X,
  Calendar,
  DollarSign,
  User,
  Phone,
  Building,
} from "lucide-react";
import { useState, useMemo } from "react";
import { useLocation } from "wouter";
import { toast } from "sonner";

interface Tenant {
  id: number;
  name: string;
  email: string;
  phone: string;
  property: string;
  unit: string;
  monthlyRent: number;
  leaseEndDate: string;
  paymentStatus: "paid" | "pending" | "overdue";
}

const tenantsData: Tenant[] = [
  {
    id: 1,
    name: "John Smith",
    email: "john@example.com",
    phone: "(555) 123-4567",
    property: "Downtown Apartments",
    unit: "101",
    monthlyRent: 1850,
    leaseEndDate: "2026-12-31",
    paymentStatus: "paid",
  },
  {
    id: 2,
    name: "Sarah Johnson",
    email: "sarah@example.com",
    phone: "(555) 234-5678",
    property: "Downtown Apartments",
    unit: "202",
    monthlyRent: 1950,
    leaseEndDate: "2027-03-15",
    paymentStatus: "paid",
  },
  {
    id: 3,
    name: "Michael Chen",
    email: "michael@example.com",
    phone: "(555) 345-6789",
    property: "Lakeside Villas",
    unit: "305",
    monthlyRent: 2200,
    leaseEndDate: "2026-08-30",
    paymentStatus: "pending",
  },
  {
    id: 4,
    name: "Emily Davis",
    email: "emily@example.com",
    phone: "(555) 456-7890",
    property: "Sunset Plaza",
    unit: "401",
    monthlyRent: 1750,
    leaseEndDate: "2026-06-15",
    paymentStatus: "overdue",
  },
  {
    id: 5,
    name: "Robert Wilson",
    email: "robert@example.com",
    phone: "(555) 567-8901",
    property: "Downtown Apartments",
    unit: "103",
    monthlyRent: 1850,
    leaseEndDate: "2027-01-20",
    paymentStatus: "paid",
  },
  {
    id: 6,
    name: "Lisa Anderson",
    email: "lisa@example.com",
    phone: "(555) 678-9012",
    property: "Lakeside Villas",
    unit: "201",
    monthlyRent: 2200,
    leaseEndDate: "2026-11-10",
    paymentStatus: "paid",
  },
];

const PaymentStatusBadge = ({ status }: { status: "paid" | "pending" | "overdue" }) => {
  const statusConfig = {
    paid: {
      bg: "#ECFDF5",
      color: "#3ECF8E",
      label: "Paid",
    },
    pending: {
      bg: "#FEF3C7",
      color: "#FFA500",
      label: "Pending",
    },
    overdue: {
      bg: "#FEE2E2",
      color: "#EF4444",
      label: "Overdue",
    },
  };

  const config = statusConfig[status];

  return (
    <div
      className="px-3 py-1 rounded-full text-xs font-medium w-fit"
      style={{ backgroundColor: config.bg, color: config.color }}
    >
      {config.label}
    </div>
  );
};

const AddTenantModal = ({
  isOpen,
  onClose,
  properties,
}: {
  isOpen: boolean;
  onClose: () => void;
  properties: string[];
}) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    property: "",
    unit: "",
    leaseStartDate: "",
    leaseEndDate: "",
    monthlyRent: "",
    securityDeposit: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.property || !formData.unit) {
      toast.error("Please fill in all required fields");
      return;
    }
    toast.success("Tenant added successfully");
    setFormData({
      name: "",
      email: "",
      phone: "",
      property: "",
      unit: "",
      leaseStartDate: "",
      leaseEndDate: "",
      monthlyRent: "",
      securityDeposit: "",
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="border-b border-slate-200 p-6 sticky top-0 bg-white">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-slate-900" style={{ fontFamily: "var(--font-display)" }}>
              Add New Tenant
            </h2>
            <button
              onClick={onClose}
              className="text-slate-600 hover:text-slate-900 transition-colors"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Personal Information */}
          <div>
            <h3 className="text-sm font-semibold text-slate-600 uppercase tracking-wide mb-4" style={{ fontFamily: "var(--font-body)" }}>
              Personal Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2" style={{ fontFamily: "var(--font-body)" }}>
                  Tenant Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Smith"
                  className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#3ECF8E]"
                  style={{ fontFamily: "var(--font-body)" }}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2" style={{ fontFamily: "var(--font-body)" }}>
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#3ECF8E]"
                  style={{ fontFamily: "var(--font-body)" }}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2" style={{ fontFamily: "var(--font-body)" }}>
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="(555) 123-4567"
                  className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#3ECF8E]"
                  style={{ fontFamily: "var(--font-body)" }}
                />
              </div>
            </div>
          </div>

          {/* Property Information */}
          <div className="border-t border-slate-200 pt-6">
            <h3 className="text-sm font-semibold text-slate-600 uppercase tracking-wide mb-4" style={{ fontFamily: "var(--font-body)" }}>
              Property Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2" style={{ fontFamily: "var(--font-body)" }}>
                  Property *
                </label>
                <select
                  name="property"
                  value={formData.property}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#3ECF8E]"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  <option value="">Select Property</option>
                  {properties.map((prop) => (
                    <option key={prop} value={prop}>
                      {prop}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2" style={{ fontFamily: "var(--font-body)" }}>
                  Unit Number *
                </label>
                <input
                  type="text"
                  name="unit"
                  value={formData.unit}
                  onChange={handleChange}
                  placeholder="101"
                  className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#3ECF8E]"
                  style={{ fontFamily: "var(--font-body)" }}
                />
              </div>
            </div>
          </div>

          {/* Lease Information */}
          <div className="border-t border-slate-200 pt-6">
            <h3 className="text-sm font-semibold text-slate-600 uppercase tracking-wide mb-4" style={{ fontFamily: "var(--font-body)" }}>
              Lease Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2" style={{ fontFamily: "var(--font-body)" }}>
                  Lease Start Date
                </label>
                <input
                  type="date"
                  name="leaseStartDate"
                  value={formData.leaseStartDate}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#3ECF8E]"
                  style={{ fontFamily: "var(--font-body)" }}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2" style={{ fontFamily: "var(--font-body)" }}>
                  Lease End Date
                </label>
                <input
                  type="date"
                  name="leaseEndDate"
                  value={formData.leaseEndDate}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#3ECF8E]"
                  style={{ fontFamily: "var(--font-body)" }}
                />
              </div>
            </div>
          </div>

          {/* Financial Information */}
          <div className="border-t border-slate-200 pt-6">
            <h3 className="text-sm font-semibold text-slate-600 uppercase tracking-wide mb-4" style={{ fontFamily: "var(--font-body)" }}>
              Financial Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2" style={{ fontFamily: "var(--font-body)" }}>
                  Monthly Rent Amount
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-3 text-slate-400" size={18} />
                  <input
                    type="number"
                    name="monthlyRent"
                    value={formData.monthlyRent}
                    onChange={handleChange}
                    placeholder="1850"
                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#3ECF8E]"
                    style={{ fontFamily: "var(--font-body)" }}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2" style={{ fontFamily: "var(--font-body)" }}>
                  Security Deposit (Optional)
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-3 text-slate-400" size={18} />
                  <input
                    type="number"
                    name="securityDeposit"
                    value={formData.securityDeposit}
                    onChange={handleChange}
                    placeholder="1850"
                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#3ECF8E]"
                    style={{ fontFamily: "var(--font-body)" }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="border-t border-slate-200 pt-6 flex gap-3 justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 rounded-lg border border-slate-200 text-slate-700 font-medium hover:bg-slate-50 transition-all"
              style={{ fontFamily: "var(--font-body)" }}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 rounded-lg bg-gradient-to-r from-[#3ECF8E] to-[#2FBF9B] text-white font-medium hover:shadow-lg transition-all"
              style={{ fontFamily: "var(--font-body)" }}
            >
              Add Tenant
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

const InviteTenantModal = ({
  isOpen,
  onClose,
  properties,
}: {
  isOpen: boolean;
  onClose: () => void;
  properties: string[];
}) => {
  const [formData, setFormData] = useState({
    email: "",
    property: "",
    unit: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.property || !formData.unit) {
      toast.error("Please fill in all fields");
      return;
    }
    toast.success(`Invitation sent to ${formData.email}`);
    setFormData({ email: "", property: "", unit: "" });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-xl shadow-xl max-w-md w-full"
      >
        {/* Header */}
        <div className="border-b border-slate-200 p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-slate-900" style={{ fontFamily: "var(--font-display)" }}>
              Invite Tenant
            </h2>
            <button
              onClick={onClose}
              className="text-slate-600 hover:text-slate-900 transition-colors"
            >
              <X size={24} />
            </button>
          </div>
          <p className="text-sm text-slate-600 mt-2" style={{ fontFamily: "var(--font-body)" }}>
            Send an invitation link to a tenant to create their account
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2" style={{ fontFamily: "var(--font-body)" }}>
              Email Address *
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="tenant@example.com"
              className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#3ECF8E]"
              style={{ fontFamily: "var(--font-body)" }}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2" style={{ fontFamily: "var(--font-body)" }}>
              Property *
            </label>
            <select
              name="property"
              value={formData.property}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#3ECF8E]"
              style={{ fontFamily: "var(--font-body)" }}
            >
              <option value="">Select Property</option>
              {properties.map((prop) => (
                <option key={prop} value={prop}>
                  {prop}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2" style={{ fontFamily: "var(--font-body)" }}>
              Unit Number *
            </label>
            <input
              type="text"
              name="unit"
              value={formData.unit}
              onChange={handleChange}
              placeholder="101"
              className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#3ECF8E]"
              style={{ fontFamily: "var(--font-body)" }}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 justify-end pt-4 border-t border-slate-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg border border-slate-200 text-slate-700 font-medium hover:bg-slate-50 transition-all"
              style={{ fontFamily: "var(--font-body)" }}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#3ECF8E] to-[#2FBF9B] text-white font-medium hover:shadow-lg transition-all"
              style={{ fontFamily: "var(--font-body)" }}
            >
              Send Invitation
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default function Tenants() {
  const [, setLocation] = useLocation();
  const [searchTerm, setSearchTerm] = useState("");
  const [propertyFilter, setPropertyFilter] = useState("all");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);

  // Get unique properties
  const properties = Array.from(new Set(tenantsData.map((t) => t.property)));

  // Filter tenants
  const filteredTenants = useMemo(() => {
    return tenantsData.filter((tenant) => {
      const matchesSearch =
        tenant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tenant.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tenant.unit.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesProperty = propertyFilter === "all" || tenant.property === propertyFilter;

      return matchesSearch && matchesProperty;
    });
  }, [searchTerm, propertyFilter]);

  const handleTenantClick = (tenantId: number) => {
    setLocation(`/tenants/${tenantId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-slate-50 to-white">
      {/* Top Navigation */}
      <div className="border-b border-slate-200 bg-white sticky top-0 z-20 shadow-sm">
        <div className="px-6 py-4">
          <h1 className="text-2xl font-bold text-slate-900" style={{ fontFamily: "var(--font-display)" }}>
            Tenants
          </h1>
          <p className="text-sm text-slate-600 mt-1" style={{ fontFamily: "var(--font-body)" }}>
            Manage all tenants across your portfolio
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-6 py-8">
        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex gap-3 mb-8"
        >
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-[#3ECF8E] to-[#2FBF9B] text-white font-medium hover:shadow-lg transition-all"
            style={{ fontFamily: "var(--font-body)" }}
          >
            <Plus size={18} />
            Add Tenant
          </button>
          <button
            onClick={() => setIsInviteModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-200 text-slate-700 font-medium hover:bg-slate-50 transition-all"
            style={{ fontFamily: "var(--font-body)" }}
          >
            <Mail size={18} />
            Invite Tenant
          </button>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-lg p-6 border border-slate-200 shadow-sm mb-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-3 text-slate-400" size={18} />
              <input
                type="text"
                placeholder="Search tenant name, email, unit..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#3ECF8E]"
                style={{ fontFamily: "var(--font-body)" }}
              />
            </div>

            {/* Property Filter */}
            <select
              value={propertyFilter}
              onChange={(e) => setPropertyFilter(e.target.value)}
              className="px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#3ECF8E]"
              style={{ fontFamily: "var(--font-body)" }}
            >
              <option value="all">All Properties</option>
              {properties.map((prop) => (
                <option key={prop} value={prop}>
                  {prop}
                </option>
              ))}
            </select>
          </div>
        </motion.div>

        {/* Tenants Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50">
                  <th
                    className="text-left px-6 py-4 text-xs font-semibold text-slate-600 uppercase tracking-wide"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    Tenant Name
                  </th>
                  <th
                    className="text-left px-6 py-4 text-xs font-semibold text-slate-600 uppercase tracking-wide"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    Property
                  </th>
                  <th
                    className="text-left px-6 py-4 text-xs font-semibold text-slate-600 uppercase tracking-wide"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    Unit
                  </th>
                  <th
                    className="text-left px-6 py-4 text-xs font-semibold text-slate-600 uppercase tracking-wide"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    Monthly Rent
                  </th>
                  <th
                    className="text-left px-6 py-4 text-xs font-semibold text-slate-600 uppercase tracking-wide"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    Lease End Date
                  </th>
                  <th
                    className="text-left px-6 py-4 text-xs font-semibold text-slate-600 uppercase tracking-wide"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    Payment Status
                  </th>
                  <th
                    className="text-left px-6 py-4 text-xs font-semibold text-slate-600 uppercase tracking-wide"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredTenants.map((tenant, index) => (
                  <motion.tr
                    key={tenant.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="border-b border-slate-100 hover:bg-slate-50 transition-colors cursor-pointer"
                    onClick={() => handleTenantClick(tenant.id)}
                  >
                    <td
                      className="px-6 py-4 text-sm font-medium text-slate-900"
                      style={{ fontFamily: "var(--font-body)" }}
                    >
                      {tenant.name}
                    </td>
                    <td
                      className="px-6 py-4 text-sm text-slate-600"
                      style={{ fontFamily: "var(--font-body)" }}
                    >
                      {tenant.property}
                    </td>
                    <td
                      className="px-6 py-4 text-sm text-slate-600"
                      style={{ fontFamily: "var(--font-body)" }}
                    >
                      {tenant.unit}
                    </td>
                    <td
                      className="px-6 py-4 text-sm font-semibold text-slate-900"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      ${tenant.monthlyRent}
                    </td>
                    <td
                      className="px-6 py-4 text-sm text-slate-600"
                      style={{ fontFamily: "var(--font-body)" }}
                    >
                      {new Date(tenant.leaseEndDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <PaymentStatusBadge status={tenant.paymentStatus} />
                    </td>
                    <td className="px-6 py-4">
                      <ChevronRight size={18} className="text-slate-400" />
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Empty State */}
          {filteredTenants.length === 0 && (
            <div className="p-12 text-center">
              <User size={48} className="mx-auto text-slate-300 mb-4" />
              <p className="text-slate-600" style={{ fontFamily: "var(--font-body)" }}>
                No tenants found matching your filters
              </p>
            </div>
          )}
        </motion.div>
      </div>

      {/* Add Tenant Modal */}
      <AddTenantModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        properties={properties}
      />

      {/* Invite Tenant Modal */}
      <InviteTenantModal
        isOpen={isInviteModalOpen}
        onClose={() => setIsInviteModalOpen(false)}
        properties={properties}
      />
    </div>
  );
}
