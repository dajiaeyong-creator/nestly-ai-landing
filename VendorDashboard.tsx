/*
 * Vendor Dashboard
 * Maintenance jobs, invoices, and payment tracking for vendors
 */

import { motion } from "framer-motion";
import { Sparkles, Briefcase, CheckCircle, DollarSign, Upload, Clock, MapPin, Phone, Mail, ChevronRight, Download, AlertCircle } from "lucide-react";
import { useState } from "react";

// Sample data
const assignedJobs = [
  {
    id: "JOB-001",
    property: "Downtown Apartment 4B",
    issue: "Leaky kitchen faucet",
    address: "123 Main Street, Downtown",
    status: "In Progress",
    scheduledDate: "Mar 7, 2026",
    estimatedCost: "$150 - $250",
    tenant: "John Smith",
    phone: "(555) 123-4567",
  },
  {
    id: "JOB-002",
    property: "Midtown House - Bedroom",
    issue: "Broken window latch",
    address: "456 Oak Ave, Midtown",
    status: "Scheduled",
    scheduledDate: "Mar 8, 2026",
    estimatedCost: "$75 - $125",
    tenant: "Sarah Johnson",
    phone: "(555) 234-5678",
  },
  {
    id: "JOB-003",
    property: "Uptown Loft - Bathroom",
    issue: "Clogged drain",
    address: "789 Pine St, Uptown",
    status: "Pending",
    scheduledDate: "Mar 9, 2026",
    estimatedCost: "$100 - $200",
    tenant: "Mike Davis",
    phone: "(555) 345-6789",
  },
];

const completedJobs = [
  {
    id: "JOB-100",
    property: "Downtown House",
    issue: "HVAC filter replacement",
    completedDate: "Mar 5, 2026",
    actualCost: "$85",
    status: "Completed",
  },
  {
    id: "JOB-101",
    property: "Suburb Villa",
    issue: "Faucet repair",
    completedDate: "Mar 3, 2026",
    actualCost: "$120",
    status: "Completed",
  },
];

const paymentHistory = [
  {
    id: "PAY-001",
    jobId: "JOB-100",
    amount: "$85",
    date: "Mar 6, 2026",
    status: "Paid",
    method: "Bank Transfer",
  },
  {
    id: "PAY-002",
    jobId: "JOB-101",
    amount: "$120",
    date: "Mar 4, 2026",
    status: "Paid",
    method: "Bank Transfer",
  },
  {
    id: "PAY-003",
    jobId: "JOB-001",
    amount: "$185",
    date: "Pending",
    status: "Processing",
    method: "Bank Transfer",
  },
];

const suggestedPrompts = [
  "Show my assigned jobs",
  "Upload invoice",
  "Check payment status",
  "View earnings this month",
];

export default function VendorDashboard() {
  const [aiInput, setAiInput] = useState("");
  const [selectedJob, setSelectedJob] = useState<string | null>(null);
  const [showInvoiceUpload, setShowInvoiceUpload] = useState(false);
  const [invoiceFile, setInvoiceFile] = useState<File | null>(null);

  const handlePromptClick = (prompt: string) => {
    setAiInput(prompt);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-slate-50 to-blue-50">
      {/* Header */}
      <div className="sticky top-0 z-20 border-b border-slate-100 bg-white/80 backdrop-blur-md shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-gradient-to-br from-[#3ECF8E] to-[#2FBF9B]">
                <Briefcase size={20} className="text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-900" style={{ fontFamily: "var(--font-display)" }}>
                  Vendor Dashboard
                </h1>
                <p className="text-sm text-slate-500">ProFix Plumbing • Manage Jobs & Payments</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
        {/* AI Command Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="rounded-2xl p-6 bg-gradient-to-br from-[#3ECF8E]/10 to-[#06B6D4]/10 border border-[#3ECF8E]/20 shadow-sm"
        >
          <h2 className="text-lg font-semibold text-slate-900 mb-4" style={{ fontFamily: "var(--font-display)" }}>
            Nestly AI Command
          </h2>
          <div className="flex gap-3 mb-4">
            <input
              type="text"
              value={aiInput}
              onChange={(e) => setAiInput(e.target.value)}
              placeholder="Ask Nestly about your jobs or payments..."
              className="flex-1 px-4 py-3 bg-white border border-slate-200 rounded-lg outline-none text-sm text-slate-900 placeholder-slate-400 hover:border-slate-300 focus:border-[#3ECF8E] transition-colors"
              style={{ fontFamily: "var(--font-body)" }}
            />
            <button className="px-4 py-3 bg-gradient-to-r from-[#3ECF8E] to-[#2FBF9B] text-white rounded-lg font-medium hover:shadow-lg transition-all flex items-center gap-2 whitespace-nowrap">
              <Sparkles size={16} />
              Ask
            </button>
          </div>

          {/* Suggested Prompts */}
          <div className="space-y-2">
            <p className="text-xs text-slate-600 font-medium">Quick actions:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {suggestedPrompts.map((prompt, idx) => (
                <button
                  key={idx}
                  onClick={() => handlePromptClick(prompt)}
                  className="text-left px-3 py-2 text-sm text-slate-700 bg-white border border-slate-200 rounded-lg hover:border-[#3ECF8E] hover:bg-[#3ECF8E]/5 transition-all"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Key Metrics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {/* Assigned Jobs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="rounded-2xl p-6 bg-white border border-slate-200 shadow-sm hover:shadow-lg transition-all cursor-pointer"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 rounded-xl bg-gradient-to-br from-[#3ECF8E]/20 to-[#2FBF9B]/20">
                <Briefcase size={24} className="text-[#3ECF8E]" />
              </div>
            </div>
            <p className="text-sm text-slate-600 mb-1" style={{ fontFamily: "var(--font-body)" }}>
              Assigned Jobs
            </p>
            <p className="text-3xl font-bold text-slate-900 mb-2" style={{ fontFamily: "var(--font-display)" }}>
              3
            </p>
            <p className="text-sm text-[#3ECF8E] font-medium">1 in progress</p>
          </motion.div>

          {/* Completed Jobs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="rounded-2xl p-6 bg-white border border-slate-200 shadow-sm hover:shadow-lg transition-all cursor-pointer"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 rounded-xl bg-gradient-to-br from-[#06B6D4]/20 to-[#0891B2]/20">
                <CheckCircle size={24} className="text-[#06B6D4]" />
              </div>
            </div>
            <p className="text-sm text-slate-600 mb-1" style={{ fontFamily: "var(--font-body)" }}>
              Completed Jobs
            </p>
            <p className="text-3xl font-bold text-slate-900 mb-2" style={{ fontFamily: "var(--font-display)" }}>
              28
            </p>
            <p className="text-sm text-[#06B6D4] font-medium">This month: 12</p>
          </motion.div>

          {/* Payments Processing */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="rounded-2xl p-6 bg-white border border-slate-200 shadow-sm hover:shadow-lg transition-all cursor-pointer"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 rounded-xl bg-gradient-to-br from-[#F59E0B]/20 to-[#D97706]/20">
                <DollarSign size={24} className="text-[#F59E0B]" />
              </div>
            </div>
            <p className="text-sm text-slate-600 mb-1" style={{ fontFamily: "var(--font-body)" }}>
              Payments Processing
            </p>
            <p className="text-3xl font-bold text-slate-900 mb-2" style={{ fontFamily: "var(--font-display)" }}>
              $185
            </p>
            <p className="text-sm text-[#F59E0B] font-medium">Paid this month: $2,450</p>
          </motion.div>
        </div>

        {/* Assigned Jobs Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="rounded-2xl p-6 bg-white border border-slate-200 shadow-sm"
        >
          <h3 className="text-lg font-semibold text-slate-900 mb-4" style={{ fontFamily: "var(--font-display)" }}>
            Assigned Maintenance Jobs
          </h3>
          <div className="space-y-3">
            {assignedJobs.map((job) => (
              <div
                key={job.id}
                onClick={() => setSelectedJob(selectedJob === job.id ? null : job.id)}
                className="p-4 border border-slate-200 rounded-xl hover:border-[#3ECF8E] hover:bg-[#3ECF8E]/5 transition-all cursor-pointer"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-semibold text-slate-900" style={{ fontFamily: "var(--font-display)" }}>
                        {job.issue}
                      </p>
                      <span
                        className={`text-xs font-medium px-2 py-1 rounded-full ${
                          job.status === "In Progress"
                            ? "bg-[#3ECF8E]/20 text-[#3ECF8E]"
                            : job.status === "Scheduled"
                              ? "bg-[#06B6D4]/20 text-[#06B6D4]"
                              : "bg-slate-200 text-slate-700"
                        }`}
                      >
                        {job.status}
                      </span>
                    </div>
                    <p className="text-sm text-slate-600 mb-2" style={{ fontFamily: "var(--font-body)" }}>
                      {job.property}
                    </p>
                    <div className="flex flex-wrap gap-4 text-sm text-slate-600">
                      <div className="flex items-center gap-1">
                        <MapPin size={16} className="text-slate-400" />
                        {job.address}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock size={16} className="text-slate-400" />
                        {job.scheduledDate}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-slate-900">{job.estimatedCost}</p>
                    <p className="text-xs text-slate-500">Estimated</p>
                  </div>
                </div>

                {/* Expanded Details */}
                {selectedJob === job.id && (
                  <div className="mt-4 pt-4 border-t border-slate-200 space-y-3">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-slate-600 font-medium mb-1">Tenant Contact</p>
                        <p className="font-semibold text-slate-900">{job.tenant}</p>
                        <div className="flex items-center gap-2 text-sm text-slate-600 mt-1">
                          <Phone size={14} />
                          {job.phone}
                        </div>
                      </div>
                      <div>
                        <p className="text-xs text-slate-600 font-medium mb-1">Job ID</p>
                        <p className="font-mono text-sm font-semibold text-slate-900">{job.id}</p>
                      </div>
                    </div>
                    <div className="flex gap-2 pt-2">
                      <button className="flex-1 px-3 py-2 bg-[#3ECF8E] text-white rounded-lg font-medium hover:shadow-lg transition-all text-sm">
                        Mark Complete
                      </button>
                      <button className="flex-1 px-3 py-2 border border-slate-200 text-slate-700 rounded-lg font-medium hover:bg-slate-50 transition-all text-sm">
                        Upload Invoice
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Invoice Upload Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="rounded-2xl p-6 bg-gradient-to-br from-[#3ECF8E]/10 to-[#06B6D4]/10 border border-[#3ECF8E]/20 shadow-sm"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-slate-900" style={{ fontFamily: "var(--font-display)" }}>
              Upload Invoice
            </h3>
            <button
              onClick={() => setShowInvoiceUpload(!showInvoiceUpload)}
              className="text-[#3ECF8E] hover:text-[#2FBF9B] transition-colors"
            >
              <ChevronRight size={20} />
            </button>
          </div>

          {showInvoiceUpload && (
            <div className="space-y-4">
              <div className="border-2 border-dashed border-[#3ECF8E]/30 rounded-xl p-8 text-center hover:border-[#3ECF8E]/60 transition-colors cursor-pointer">
                <Upload size={32} className="mx-auto mb-2 text-[#3ECF8E]" />
                <p className="font-semibold text-slate-900 mb-1" style={{ fontFamily: "var(--font-display)" }}>
                  Click to upload invoice
                </p>
                <p className="text-sm text-slate-600" style={{ fontFamily: "var(--font-body)" }}>
                  PDF, JPG, or PNG (Max 5MB)
                </p>
                <input
                  type="file"
                  onChange={(e) => setInvoiceFile(e.target.files?.[0] || null)}
                  className="hidden"
                  accept=".pdf,.jpg,.png"
                />
              </div>

              {invoiceFile && (
                <div className="p-4 bg-white rounded-lg border border-slate-200">
                  <p className="text-sm font-semibold text-slate-900">Selected: {invoiceFile.name}</p>
                  <button className="mt-3 w-full px-4 py-2 bg-[#3ECF8E] text-white rounded-lg font-medium hover:shadow-lg transition-all">
                    Submit Invoice
                  </button>
                </div>
              )}
            </div>
          )}
        </motion.div>

        {/* Payment History */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="rounded-2xl p-6 bg-white border border-slate-200 shadow-sm"
        >
          <h3 className="text-lg font-semibold text-slate-900 mb-4" style={{ fontFamily: "var(--font-display)" }}>
            Payment History
          </h3>
          <div className="space-y-3">
            {paymentHistory.map((payment) => (
              <div key={payment.id} className="flex items-center justify-between p-4 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors">
                <div className="flex-1">
                  <p className="font-semibold text-slate-900" style={{ fontFamily: "var(--font-display)" }}>
                    {payment.jobId}
                  </p>
                  <p className="text-sm text-slate-600" style={{ fontFamily: "var(--font-body)" }}>
                    {payment.method} • {payment.date}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-slate-900 text-lg">{payment.amount}</p>
                  <span
                    className={`text-xs font-medium px-2 py-1 rounded-full inline-block mt-1 ${
                      payment.status === "Paid"
                        ? "bg-[#3ECF8E]/20 text-[#3ECF8E]"
                        : "bg-[#F59E0B]/20 text-[#F59E0B]"
                    }`}
                  >
                    {payment.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Footer */}
        <div className="text-center py-8">
          <p className="text-sm text-slate-600" style={{ fontFamily: "var(--font-body)" }}>
            Need help? <a href="#" className="text-[#3ECF8E] hover:underline font-medium">Contact support</a>
          </p>
        </div>
      </div>
    </div>
  );
}
