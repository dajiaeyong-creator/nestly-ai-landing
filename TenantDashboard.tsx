/*
 * Tenant Dashboard
 * AI-first tenant portal with payment, maintenance, and lease management
 */

import { motion } from "framer-motion";
import { Sparkles, DollarSign, Calendar, Wrench, FileText, ChevronRight, AlertCircle } from "lucide-react";
import { useState } from "react";
import MaintenanceRequestModal from "@/components/MaintenanceRequestModal";
import MaintenanceRequestDetail from "@/components/MaintenanceRequestDetail";

// Sample data
const paymentHistory = [
  { date: "Mar 1, 2026", amount: "$1,500", status: "Paid", dueDate: "Mar 1, 2026" },
  { date: "Feb 1, 2026", amount: "$1,500", status: "Paid", dueDate: "Feb 1, 2026" },
  { date: "Jan 1, 2026", amount: "$1,500", status: "Paid", dueDate: "Jan 1, 2026" },
  { date: "Dec 1, 2025", amount: "$1,500", status: "Paid", dueDate: "Dec 1, 2025" },
];

const maintenanceRequests = [
  {
    id: 1,
    issue: "Leaky kitchen faucet",
    status: "In Progress",
    date: "Feb 28, 2026",
    vendor: "ProFix Plumbing",
    description: "The kitchen faucet has been dripping for several days. It appears to be a valve issue.",
    timeline: [
      { date: "Feb 28, 2026", status: "Request Submitted", description: "Your maintenance request was received", completed: true },
      { date: "Feb 28, 2026", status: "Vendor Assigned", description: "ProFix Plumbing was assigned to your request", completed: true },
      { date: "Mar 1, 2026", status: "Scheduled", description: "Work scheduled for Friday at 2 PM", completed: true },
      { date: "Mar 1, 2026", status: "In Progress", description: "Vendor is currently working on the issue", completed: false },
      { date: "Mar 1, 2026", status: "Completed", description: "Work will be completed and inspected", completed: false },
    ],
    estimatedCompletion: "Mar 1, 2026 by 4 PM",
    cost: "$150 - $250",
  },
  {
    id: 2,
    issue: "Broken window latch",
    status: "Completed",
    date: "Feb 20, 2026",
    vendor: "Downtown Glass",
    description: "The bedroom window latch is broken and won't stay closed.",
    timeline: [
      { date: "Feb 20, 2026", status: "Request Submitted", description: "Your maintenance request was received", completed: true },
      { date: "Feb 20, 2026", status: "Vendor Assigned", description: "Downtown Glass was assigned", completed: true },
      { date: "Feb 22, 2026", status: "Completed", description: "Window latch repaired successfully", completed: true },
    ],
  },
  {
    id: 3,
    issue: "HVAC filter replacement",
    status: "Pending",
    date: "Mar 5, 2026",
    vendor: "Climate Control",
    description: "HVAC filter needs replacement for optimal air quality.",
    timeline: [
      { date: "Mar 5, 2026", status: "Request Submitted", description: "Your maintenance request was received", completed: true },
      { date: "Mar 5, 2026", status: "Pending Assignment", description: "Waiting for vendor assignment", completed: false },
    ],
  },
];

const suggestedPrompts = [
  "When is my rent due?",
  "Show my payment history",
  "Report a maintenance issue",
  "Download my lease",
];

export default function TenantDashboard() {
  const [aiInput, setAiInput] = useState("");
  const [selectedPrompt, setSelectedPrompt] = useState<string | null>(null);
  const [isMaintenanceModalOpen, setIsMaintenanceModalOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<number | null>(null);

  const handlePromptClick = (prompt: string) => {
    setSelectedPrompt(prompt);
    setAiInput(prompt);
    if (prompt === "Report a maintenance issue") {
      setIsMaintenanceModalOpen(true);
    }
  };

  const handleMaintenanceSubmit = (request: any) => {
    console.log("New maintenance request:", request);
    // In a real app, this would be sent to the backend
  };

  const selectedRequestData = maintenanceRequests.find((r) => r.id === selectedRequest);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-slate-50 to-blue-50">
      {/* Header */}
      <div className="sticky top-0 z-20 border-b border-slate-100 bg-white/80 backdrop-blur-md shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-gradient-to-br from-[#3ECF8E] to-[#2FBF9B]">
                <Sparkles size={20} className="text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-900" style={{ fontFamily: "var(--font-display)" }}>
                  Your Tenant Portal
                </h1>
                <p className="text-sm text-slate-500">Apartment 4B • 123 Main Street</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-8">
        {/* AI Command Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="rounded-2xl p-6 bg-gradient-to-br from-[#3ECF8E]/10 to-[#06B6D4]/10 border border-[#3ECF8E]/20 shadow-sm"
        >
          <h2 className="text-lg font-semibold text-slate-900 mb-4" style={{ fontFamily: "var(--font-display)" }}>
            Ask Nestly
          </h2>
          <div className="flex gap-3 mb-4">
            <input
              type="text"
              value={aiInput}
              onChange={(e) => setAiInput(e.target.value)}
              placeholder="Ask me anything about your lease, payments, or maintenance..."
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
            <p className="text-xs text-slate-600 font-medium">Suggested questions:</p>
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

        {/* Main Action Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Pay Rent Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="rounded-2xl p-6 bg-white border border-slate-200 shadow-sm hover:shadow-lg transition-all cursor-pointer group"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 rounded-xl bg-gradient-to-br from-[#3ECF8E]/20 to-[#2FBF9B]/20 group-hover:from-[#3ECF8E]/30 group-hover:to-[#2FBF9B]/30 transition-all">
                <DollarSign size={24} className="text-[#3ECF8E]" />
              </div>
              <ChevronRight size={20} className="text-slate-400 group-hover:text-[#3ECF8E] transition-colors" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-1" style={{ fontFamily: "var(--font-display)" }}>
              Pay Rent
            </h3>
            <p className="text-sm text-slate-600" style={{ fontFamily: "var(--font-body)" }}>
              Make a payment online securely
            </p>
          </motion.div>

          {/* Next Payment Due Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="rounded-2xl p-6 bg-white border border-slate-200 shadow-sm hover:shadow-lg transition-all cursor-pointer group"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 rounded-xl bg-gradient-to-br from-[#06B6D4]/20 to-[#0891B2]/20 group-hover:from-[#06B6D4]/30 group-hover:to-[#0891B2]/30 transition-all">
                <Calendar size={24} className="text-[#06B6D4]" />
              </div>
              <ChevronRight size={20} className="text-slate-400 group-hover:text-[#06B6D4] transition-colors" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-1" style={{ fontFamily: "var(--font-display)" }}>
              Next Payment
            </h3>
            <p className="text-2xl font-bold text-[#06B6D4] mb-1">$1,500</p>
            <p className="text-sm text-slate-600" style={{ fontFamily: "var(--font-body)" }}>
              Due April 1, 2026
            </p>
          </motion.div>

          {/* Maintenance Requests Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            onClick={() => setIsMaintenanceModalOpen(true)}
            className="rounded-2xl p-6 bg-white border border-slate-200 shadow-sm hover:shadow-lg transition-all cursor-pointer group"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 rounded-xl bg-gradient-to-br from-[#F59E0B]/20 to-[#D97706]/20 group-hover:from-[#F59E0B]/30 group-hover:to-[#D97706]/30 transition-all">
                <Wrench size={24} className="text-[#F59E0B]" />
              </div>
              <ChevronRight size={20} className="text-slate-400 group-hover:text-[#F59E0B] transition-colors" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-1" style={{ fontFamily: "var(--font-display)" }}>
              Maintenance
            </h3>
            <p className="text-2xl font-bold text-[#F59E0B] mb-1">1 In Progress</p>
            <p className="text-sm text-slate-600" style={{ fontFamily: "var(--font-body)" }}>
              Report or track issues
            </p>
          </motion.div>

          {/* Lease Documents Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="rounded-2xl p-6 bg-white border border-slate-200 shadow-sm hover:shadow-lg transition-all cursor-pointer group"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 rounded-xl bg-gradient-to-br from-[#EC4899]/20 to-[#DB2777]/20 group-hover:from-[#EC4899]/30 group-hover:to-[#DB2777]/30 transition-all">
                <FileText size={24} className="text-[#EC4899]" />
              </div>
              <ChevronRight size={20} className="text-slate-400 group-hover:text-[#EC4899] transition-colors" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-1" style={{ fontFamily: "var(--font-display)" }}>
              Lease
            </h3>
            <p className="text-sm text-slate-600" style={{ fontFamily: "var(--font-body)" }}>
              View and download documents
            </p>
          </motion.div>
        </div>

        {/* Payment History */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="rounded-2xl p-6 bg-white border border-slate-200 shadow-sm"
        >
          <h2 className="text-lg font-semibold text-slate-900 mb-4" style={{ fontFamily: "var(--font-display)" }}>
            Payment History
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left py-3 px-4 text-slate-600 font-medium" style={{ fontFamily: "var(--font-body)" }}>
                    Date
                  </th>
                  <th className="text-left py-3 px-4 text-slate-600 font-medium" style={{ fontFamily: "var(--font-body)" }}>
                    Amount
                  </th>
                  <th className="text-left py-3 px-4 text-slate-600 font-medium" style={{ fontFamily: "var(--font-body)" }}>
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {paymentHistory.map((payment, idx) => (
                  <tr key={idx} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-4 text-slate-900" style={{ fontFamily: "var(--font-body)" }}>
                      {payment.date}
                    </td>
                    <td className="py-3 px-4 font-semibold text-slate-900" style={{ fontFamily: "var(--font-body)" }}>
                      {payment.amount}
                    </td>
                    <td className="py-3 px-4">
                      <span className="inline-block px-3 py-1 text-xs font-medium text-[#3ECF8E] bg-[#3ECF8E]/10 rounded-full">
                        {payment.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Maintenance Request Tracker */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="rounded-2xl p-6 bg-white border border-slate-200 shadow-sm"
        >
          <h2 className="text-lg font-semibold text-slate-900 mb-4" style={{ fontFamily: "var(--font-display)" }}>
            Maintenance Requests
          </h2>
          <div className="space-y-3">
            {maintenanceRequests.map((request) => (
              <div
                key={request.id}
                onClick={() => setSelectedRequest(request.id)}
                className="p-4 border border-slate-200 rounded-lg hover:border-[#3ECF8E] hover:bg-[#3ECF8E]/5 transition-all cursor-pointer"
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-slate-900" style={{ fontFamily: "var(--font-display)" }}>
                    {request.issue}
                  </h3>
                  <span
                    className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${
                      request.status === "Completed"
                        ? "text-[#3ECF8E] bg-[#3ECF8E]/10"
                        : request.status === "In Progress"
                          ? "text-[#F59E0B] bg-[#F59E0B]/10"
                          : "text-slate-600 bg-slate-100"
                    }`}
                  >
                    {request.status}
                  </span>
                </div>
                <p className="text-sm text-slate-600 mb-2" style={{ fontFamily: "var(--font-body)" }}>
                  {request.vendor} • Requested {request.date}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Selected Request Detail */}
        {selectedRequest && selectedRequestData && (
          <MaintenanceRequestDetail
            request={{
              id: selectedRequestData.id,
              issue: selectedRequestData.issue,
              description: selectedRequestData.description,
              status: selectedRequestData.status as "Pending" | "In Progress" | "Completed" | "On Hold",
              date: selectedRequestData.date,
              vendor: {
                name: selectedRequestData.vendor,
                phone: "(555) 123-4567",
                email: "vendor@example.com",
                rating: 4.8,
              },
              timeline: selectedRequestData.timeline,
              estimatedCompletion: selectedRequestData.estimatedCompletion,
              cost: selectedRequestData.cost,
            }}
            onClose={() => setSelectedRequest(null)}
          />
        )}

        {/* Footer */}
        <div className="text-center py-8">
          <p className="text-sm text-slate-600" style={{ fontFamily: "var(--font-body)" }}>
            Need help? <a href="#" className="text-[#3ECF8E] hover:underline font-medium">Contact support</a>
          </p>
        </div>
      </div>

      {/* Maintenance Request Modal */}
      <MaintenanceRequestModal
        isOpen={isMaintenanceModalOpen}
        onClose={() => setIsMaintenanceModalOpen(false)}
        onSubmit={handleMaintenanceSubmit}
      />
    </div>
  );
}
