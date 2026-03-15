/*
 * Tenant Profile Page – Individual Tenant Management
 * Display tenant info, actions, and payment history
 */

import { motion } from "framer-motion";
import {
  ArrowLeft,
  User,
  Home,
  Calendar,
  DollarSign,
  Bell,
  MessageSquare,
  FileText,
  Settings,
  CheckCircle,
  Clock,
  AlertCircle,
} from "lucide-react";
import { useState } from "react";
import { useLocation } from "wouter";
import { toast } from "sonner";
import EvictionWorkflowModal from "@/components/EvictionWorkflowModal";

interface PaymentRecord {
  id: number;
  date: string;
  amount: number;
  status: "paid" | "pending" | "overdue";
  dueDate: string;
}

// Sample data
const tenantData = {
  id: 1,
  name: "John Smith",
  email: "john.smith@email.com",
  phone: "+1 (555) 123-4567",
  propertyName: "Downtown Apartments",
  unitNumber: "101",
  leaseStartDate: "2023-01-01",
  leaseEndDate: "2025-12-31",
  monthlyRent: 1850,
  moveInDate: "2023-01-15",
  emergencyContact: "Jane Smith",
  emergencyPhone: "+1 (555) 123-4568",
};

const paymentHistory: PaymentRecord[] = [
  {
    id: 1,
    date: "2026-03-01",
    amount: 1850,
    status: "paid",
    dueDate: "2026-03-01",
  },
  {
    id: 2,
    date: "2026-02-01",
    amount: 1850,
    status: "paid",
    dueDate: "2026-02-01",
  },
  {
    id: 3,
    date: "2026-01-01",
    amount: 1850,
    status: "paid",
    dueDate: "2026-01-01",
  },
  {
    id: 4,
    date: "2025-12-01",
    amount: 1850,
    status: "paid",
    dueDate: "2025-12-01",
  },
  {
    id: 5,
    date: "2025-11-01",
    amount: 1850,
    status: "paid",
    dueDate: "2025-11-01",
  },
  {
    id: 6,
    date: "2025-10-01",
    amount: 1850,
    status: "paid",
    dueDate: "2025-10-01",
  },
  {
    id: 7,
    date: "2025-09-15",
    amount: 1850,
    status: "pending",
    dueDate: "2025-09-01",
  },
  {
    id: 8,
    date: "2025-08-01",
    amount: 1850,
    status: "paid",
    dueDate: "2025-08-01",
  },
];

const InfoCard = ({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: string | number;
  icon: React.ReactNode;
}) => (
  <div className="flex items-start gap-3">
    <div className="w-10 h-10 rounded-lg bg-[#3ECF8E]/10 flex items-center justify-center flex-shrink-0">
      {Icon}
    </div>
    <div>
      <p className="text-xs text-slate-500 uppercase tracking-wide" style={{ fontFamily: "var(--font-body)" }}>
        {label}
      </p>
      <p className="text-lg font-semibold text-slate-900 mt-1" style={{ fontFamily: "var(--font-display)" }}>
        {value}
      </p>
    </div>
  </div>
);

const ActionButton = ({
  label,
  icon: Icon,
  onClick,
  variant = "primary",
}: {
  label: string;
  icon: React.ReactNode;
  onClick: () => void;
  variant?: "primary" | "secondary";
}) => (
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
      variant === "primary"
        ? "bg-gradient-to-r from-[#3ECF8E] to-[#2FBF9B] text-white hover:shadow-lg"
        : "border border-slate-200 text-slate-700 hover:bg-slate-50"
    }`}
    style={{ fontFamily: "var(--font-body)" }}
  >
    {Icon}
    {label}
  </motion.button>
);

const PaymentStatusBadge = ({ status }: { status: "paid" | "pending" | "overdue" }) => {
  const statusConfig = {
    paid: {
      bg: "#ECFDF5",
      color: "#3ECF8E",
      label: "Paid",
      icon: CheckCircle,
    },
    pending: {
      bg: "#FEF3C7",
      color: "#FFA500",
      label: "Pending",
      icon: Clock,
    },
    overdue: {
      bg: "#FEE2E2",
      color: "#EF4444",
      label: "Overdue",
      icon: AlertCircle,
    },
  };

  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <div
      className="flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium"
      style={{ backgroundColor: config.bg, color: config.color }}
    >
      <Icon size={14} />
      {config.label}
    </div>
  );
};

export default function TenantProfile() {
  const [, setLocation] = useLocation();
  const [isEvictionModalOpen, setIsEvictionModalOpen] = useState(false);

  const handleSendReminder = () => {
    toast.success("Payment reminder sent to tenant");
  };

  const handleMessage = () => {
    toast.success("Message interface opening...");
  };

  const handleViewLease = () => {
    toast.success("Lease document opening...");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-slate-50 to-white">
      {/* Top Navigation Bar */}
      <div className="border-b border-slate-200 bg-white sticky top-0 z-20 shadow-sm">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setLocation("/properties")}
                className="p-2 rounded-lg hover:bg-slate-100 transition-colors text-slate-600"
              >
                <ArrowLeft size={20} />
              </motion.button>
              <motion.h1
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="text-2xl font-bold text-slate-900"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {tenantData.name}
              </motion.h1>
            </div>

            <div className="flex items-center gap-3">
              <button className="p-2 rounded-lg hover:bg-slate-100 transition-colors text-slate-600">
                <Bell size={20} />
              </button>
              <button className="p-2 rounded-lg hover:bg-slate-100 transition-colors text-slate-600">
                <Settings size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-6 py-8">
        {/* Tenant Summary Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-xl p-8 border border-slate-200 shadow-sm mb-8"
        >
          {/* Header */}
          <div className="flex items-start justify-between mb-8 pb-8 border-b border-slate-200">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#3ECF8E] to-[#2FBF9B] flex items-center justify-center text-white text-2xl font-bold">
                {tenantData.name.split(" ").map((n) => n[0]).join("")}
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-900" style={{ fontFamily: "var(--font-display)" }}>
                  {tenantData.name}
                </h2>
                <p className="text-slate-600" style={{ fontFamily: "var(--font-body)" }}>
                  {tenantData.email}
                </p>
              </div>
            </div>
          </div>

          {/* Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
            <InfoCard
              label="Property"
              value={tenantData.propertyName}
              icon={<Home size={20} className="text-[#3ECF8E]" />}
            />
            <InfoCard
              label="Unit Number"
              value={`Unit ${tenantData.unitNumber}`}
              icon={<Home size={20} className="text-[#3ECF8E]" />}
            />
            <InfoCard
              label="Monthly Rent"
              value={`$${tenantData.monthlyRent}`}
              icon={<DollarSign size={20} className="text-[#3ECF8E]" />}
            />
            <InfoCard
              label="Lease Start Date"
              value={new Date(tenantData.leaseStartDate).toLocaleDateString()}
              icon={<Calendar size={20} className="text-[#3ECF8E]" />}
            />
            <InfoCard
              label="Lease End Date"
              value={new Date(tenantData.leaseEndDate).toLocaleDateString()}
              icon={<Calendar size={20} className="text-[#3ECF8E]" />}
            />
            <InfoCard
              label="Contact"
              value={tenantData.phone}
              icon={<User size={20} className="text-[#3ECF8E]" />}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3">
            <ActionButton
              label="Send Payment Reminder"
              icon={<Bell size={18} />}
              onClick={handleSendReminder}
              variant="primary"
            />
            <ActionButton
              label="Message Tenant"
              icon={<MessageSquare size={18} />}
              onClick={handleMessage}
              variant="secondary"
            />
            <ActionButton
              label="View Lease Document"
              icon={<FileText size={18} />}
              onClick={handleViewLease}
              variant="secondary"
            />
            <ActionButton
              label="Eviction Process Workflow"
              icon={<AlertCircle size={18} />}
              onClick={() => setIsEvictionModalOpen(true)}
              variant="secondary"
            />
          </div>
        </motion.div>

        {/* Payment History */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm"
        >
          <h2 className="text-lg font-semibold text-slate-900 mb-6" style={{ fontFamily: "var(--font-display)" }}>
            Payment History
          </h2>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200">
                  <th
                    className="text-left px-4 py-3 text-xs font-semibold text-slate-600 uppercase tracking-wide"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    Payment Date
                  </th>
                  <th
                    className="text-left px-4 py-3 text-xs font-semibold text-slate-600 uppercase tracking-wide"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    Due Date
                  </th>
                  <th
                    className="text-left px-4 py-3 text-xs font-semibold text-slate-600 uppercase tracking-wide"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    Amount
                  </th>
                  <th
                    className="text-left px-4 py-3 text-xs font-semibold text-slate-600 uppercase tracking-wide"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {paymentHistory.map((payment, index) => (
                  <motion.tr
                    key={payment.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="border-b border-slate-100 hover:bg-slate-50 transition-colors"
                  >
                    <td
                      className="px-4 py-4 text-sm text-slate-900 font-medium"
                      style={{ fontFamily: "var(--font-body)" }}
                    >
                      {new Date(payment.date).toLocaleDateString()}
                    </td>
                    <td
                      className="px-4 py-4 text-sm text-slate-600"
                      style={{ fontFamily: "var(--font-body)" }}
                    >
                      {new Date(payment.dueDate).toLocaleDateString()}
                    </td>
                    <td
                      className="px-4 py-4 text-sm font-semibold text-slate-900"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      ${payment.amount}
                    </td>
                    <td className="px-4 py-4">
                      <PaymentStatusBadge status={payment.status} />
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Summary */}
          <div className="mt-6 pt-6 border-t border-slate-200 grid grid-cols-3 gap-4">
            <div>
              <p className="text-xs text-slate-500 uppercase tracking-wide" style={{ fontFamily: "var(--font-body)" }}>
                Total Paid
              </p>
              <p className="text-lg font-bold text-[#3ECF8E] mt-1" style={{ fontFamily: "var(--font-display)" }}>
                $14,800
              </p>
            </div>
            <div>
              <p className="text-xs text-slate-500 uppercase tracking-wide" style={{ fontFamily: "var(--font-body)" }}>
                Pending
              </p>
              <p className="text-lg font-bold text-[#FFA500] mt-1" style={{ fontFamily: "var(--font-display)" }}>
                $1,850
              </p>
            </div>
            <div>
              <p className="text-xs text-slate-500 uppercase tracking-wide" style={{ fontFamily: "var(--font-body)" }}>
                Overdue
              </p>
              <p className="text-lg font-bold text-[#EF4444] mt-1" style={{ fontFamily: "var(--font-display)" }}>
                $0
              </p>
            </div>
          </div>
        </motion.div>

        {/* Eviction Workflow Modal */}
        <EvictionWorkflowModal
          isOpen={isEvictionModalOpen}
          onClose={() => setIsEvictionModalOpen(false)}
          tenantName={tenantData.name}
        />
      </div>
    </div>
  );
}
