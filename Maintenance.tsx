/*
 * Maintenance Page – AI-assisted maintenance request workflow
 * Analyze requests, recommend vendors, track jobs, and auto-categorize expenses
 */

import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Plus,
  AlertCircle,
  CheckCircle,
  Clock,
  Zap,
  Upload,
  FileText,
  Image as ImageIcon,
  X,
  Wrench,
  TrendingUp,
  Filter,
  ChevronRight,
} from "lucide-react";
import { useState, useMemo } from "react";
import { toast } from "sonner";

interface MaintenanceRequest {
  id: number;
  propertyName: string;
  tenantName: string;
  description: string;
  issueType: "Plumbing" | "Electrical" | "HVAC" | "Appliance" | "Structural" | "Other";
  urgencyLevel: "Low" | "Medium" | "High" | "Emergency";
  status: "New" | "Assigned" | "In Progress" | "Completed" | "Invoiced";
  submittedDate: string;
  aiRecommendation: {
    vendorId: number;
    vendorName: string;
    reason: string;
    confidence: number;
  };
  assignedVendor?: {
    id: number;
    name: string;
    contactName: string;
    phone: string;
  };
  completionDate?: string;
  invoice?: {
    amount: number;
    category: string;
    uploadedDate: string;
    fileName: string;
  };
  photos?: string[];
}

const maintenanceRequests: MaintenanceRequest[] = [
  {
    id: 1,
    propertyName: "Downtown Apartments",
    tenantName: "John Smith",
    description: "Kitchen sink is leaking under the cabinet. Water pooling underneath.",
    issueType: "Plumbing",
    urgencyLevel: "High",
    status: "New",
    submittedDate: "2026-03-07",
    aiRecommendation: {
      vendorId: 1,
      vendorName: "ProFix Plumbing",
      reason: "Past repair history shows 98% success rate with similar issues. 2h avg response time.",
      confidence: 98,
    },
  },
  {
    id: 2,
    propertyName: "Lakeside Villas",
    tenantName: "Sarah Johnson",
    description: "AC unit making strange noise and not cooling properly",
    issueType: "HVAC",
    urgencyLevel: "High",
    status: "Assigned",
    submittedDate: "2026-03-06",
    aiRecommendation: {
      vendorId: 6,
      vendorName: "Cool HVAC Solutions",
      reason: "Specializes in AC repairs. 178 jobs completed with 4.7 rating.",
      confidence: 95,
    },
    assignedVendor: {
      id: 6,
      name: "Cool HVAC Solutions",
      contactName: "David Lee",
      phone: "(555) 678-9012",
    },
  },
  {
    id: 3,
    propertyName: "Sunset Plaza",
    tenantName: "Mike Chen",
    description: "Bathroom light fixture broken and won't turn on",
    issueType: "Electrical",
    urgencyLevel: "Medium",
    status: "In Progress",
    submittedDate: "2026-03-05",
    aiRecommendation: {
      vendorId: 2,
      vendorName: "ElectroWorks",
      reason: "89 electrical jobs completed. 4.6 rating with reliable service.",
      confidence: 92,
    },
    assignedVendor: {
      id: 2,
      name: "ElectroWorks",
      contactName: "Sarah Chen",
      phone: "(555) 234-5678",
    },
  },
  {
    id: 4,
    propertyName: "Downtown Apartments",
    tenantName: "Emily Davis",
    description: "Refrigerator stopped working. Food spoiling.",
    issueType: "Appliance",
    urgencyLevel: "Emergency",
    status: "New",
    submittedDate: "2026-03-07",
    aiRecommendation: {
      vendorId: 1,
      vendorName: "ProFix Plumbing",
      reason: "General maintenance vendor. Can handle appliance repairs.",
      confidence: 75,
    },
  },
  {
    id: 5,
    propertyName: "Lakeside Villas",
    tenantName: "Robert Wilson",
    description: "Roof leak in master bedroom during rain",
    issueType: "Structural",
    urgencyLevel: "Emergency",
    status: "Completed",
    submittedDate: "2026-03-01",
    aiRecommendation: {
      vendorId: 7,
      vendorName: "ProRoof Services",
      reason: "Specialized roofing contractor. 156 jobs completed.",
      confidence: 96,
    },
    assignedVendor: {
      id: 7,
      name: "ProRoof Services",
      contactName: "Tom Anderson",
      phone: "(555) 789-0123",
    },
    completionDate: "2026-03-03",
    invoice: {
      amount: 1250,
      category: "Structural Repairs",
      uploadedDate: "2026-03-03",
      fileName: "roof_repair_invoice.pdf",
    },
  },
  {
    id: 6,
    propertyName: "Sunset Plaza",
    tenantName: "Jessica Lee",
    description: "Landscaping maintenance - trim bushes and mow lawn",
    issueType: "Other",
    urgencyLevel: "Low",
    status: "Invoiced",
    submittedDate: "2026-02-28",
    aiRecommendation: {
      vendorId: 3,
      vendorName: "Green Landscapes",
      reason: "234 landscaping jobs completed. 4.7 rating.",
      confidence: 94,
    },
    assignedVendor: {
      id: 3,
      name: "Green Landscapes",
      contactName: "Tom Wilson",
      phone: "(555) 345-6789",
    },
    completionDate: "2026-03-02",
    invoice: {
      amount: 280,
      category: "Landscaping",
      uploadedDate: "2026-03-02",
      fileName: "landscaping_invoice.pdf",
    },
  },
];

const urgencyColors: Record<string, string> = {
  Low: "bg-blue-50 text-blue-700 border-blue-200",
  Medium: "bg-yellow-50 text-yellow-700 border-yellow-200",
  High: "bg-orange-50 text-orange-700 border-orange-200",
  Emergency: "bg-red-50 text-red-700 border-red-200",
};

const statusColors: Record<string, string> = {
  New: "bg-slate-50 text-slate-700",
  Assigned: "bg-blue-50 text-blue-700",
  "In Progress": "bg-yellow-50 text-yellow-700",
  Completed: "bg-green-50 text-green-700",
  Invoiced: "bg-purple-50 text-purple-700",
};

function UrgencyBadge({ level }: { level: string }) {
  const icons: Record<string, React.ReactNode> = {
    Low: <Clock size={14} />,
    Medium: <AlertCircle size={14} />,
    High: <Zap size={14} />,
    Emergency: <AlertCircle size={14} />,
  };

  return (
    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full border ${urgencyColors[level]} text-xs font-medium`}>
      {icons[level]}
      {level}
    </span>
  );
}

export default function Maintenance() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedRequest, setSelectedRequest] = useState<MaintenanceRequest | null>(null);
  const [showApprovalModal, setShowApprovalModal] = useState(false);
  const [showCompletionModal, setShowCompletionModal] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<{ type: string; name: string }[]>([]);

  const filteredRequests = useMemo(() => {
    return maintenanceRequests.filter((req) => {
      const matchesSearch =
        req.propertyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        req.tenantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        req.description.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus = statusFilter === "all" || req.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [searchTerm, statusFilter]);

  const newRequests = filteredRequests.filter((r) => r.status === "New");
  const inProgressRequests = filteredRequests.filter((r) => r.status === "In Progress" || r.status === "Assigned");
  const completedRequests = filteredRequests.filter((r) => r.status === "Completed" || r.status === "Invoiced");

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Top Navigation */}
      <div className="border-b border-slate-200 bg-white sticky top-0 z-20 shadow-sm">
        <div className="px-6 py-4">
          <h1 className="text-2xl font-bold text-slate-900" style={{ fontFamily: "var(--font-display)" }}>
            Maintenance Requests
          </h1>
          <p className="text-sm text-slate-600 mt-1" style={{ fontFamily: "var(--font-body)" }}>
            AI-assisted workflow with intelligent vendor recommendations
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-6 py-8">
        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg p-6 border border-slate-200 shadow-sm"
          >
            <p className="text-sm text-slate-600 mb-2" style={{ fontFamily: "var(--font-body)" }}>
              New Requests
            </p>
            <p className="text-3xl font-bold text-red-600" style={{ fontFamily: "var(--font-display)" }}>
              {newRequests.length}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-lg p-6 border border-slate-200 shadow-sm"
          >
            <p className="text-sm text-slate-600 mb-2" style={{ fontFamily: "var(--font-body)" }}>
              In Progress
            </p>
            <p className="text-3xl font-bold text-yellow-600" style={{ fontFamily: "var(--font-display)" }}>
              {inProgressRequests.length}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-lg p-6 border border-slate-200 shadow-sm"
          >
            <p className="text-sm text-slate-600 mb-2" style={{ fontFamily: "var(--font-body)" }}>
              Completed
            </p>
            <p className="text-3xl font-bold text-green-600" style={{ fontFamily: "var(--font-display)" }}>
              {completedRequests.length}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-lg p-6 border border-slate-200 shadow-sm"
          >
            <p className="text-sm text-slate-600 mb-2" style={{ fontFamily: "var(--font-body)" }}>
              Total Requests
            </p>
            <p className="text-3xl font-bold text-[#3ECF8E]" style={{ fontFamily: "var(--font-display)" }}>
              {maintenanceRequests.length}
            </p>
          </motion.div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg p-6 border border-slate-200 shadow-sm mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2" style={{ fontFamily: "var(--font-body)" }}>
                Search Requests
              </label>
              <div className="relative">
                <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Property, tenant, description..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#3ECF8E] focus:border-transparent outline-none"
                  style={{ fontFamily: "var(--font-body)" }}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2" style={{ fontFamily: "var(--font-body)" }}>
                Status
              </label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#3ECF8E] focus:border-transparent outline-none"
                style={{ fontFamily: "var(--font-body)" }}
              >
                <option value="all">All Status</option>
                <option value="New">New</option>
                <option value="Assigned">Assigned</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
                <option value="Invoiced">Invoiced</option>
              </select>
            </div>

            <div className="flex items-end">
              <button
                onClick={() => toast.info("Submit maintenance request feature coming soon")}
                className="w-full px-4 py-2 bg-[#3ECF8E] text-white rounded-lg font-medium hover:bg-[#2FBF9B] transition-all flex items-center justify-center gap-2"
                style={{ fontFamily: "var(--font-body)" }}
              >
                <Plus size={18} />
                New Request
              </button>
            </div>
          </div>
        </div>

        {/* New Requests Section */}
        {newRequests.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2" style={{ fontFamily: "var(--font-display)" }}>
              <AlertCircle size={20} className="text-red-600" />
              New Requests Pending AI Review
            </h2>
            <div className="space-y-4">
              {newRequests.map((request) => (
                <motion.div
                  key={request.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  onClick={() => {
                    setSelectedRequest(request);
                    setShowApprovalModal(true);
                  }}
                  className="bg-white rounded-lg border border-slate-200 shadow-sm hover:shadow-md cursor-pointer transition-all hover:border-[#3ECF8E] p-6"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-slate-900" style={{ fontFamily: "var(--font-body)" }}>
                        {request.propertyName} - {request.issueType}
                      </h3>
                      <p className="text-sm text-slate-600 mt-1" style={{ fontFamily: "var(--font-body)" }}>
                        Tenant: {request.tenantName}
                      </p>
                    </div>
                    <UrgencyBadge level={request.urgencyLevel} />
                  </div>

                  <p className="text-slate-700 mb-4" style={{ fontFamily: "var(--font-body)" }}>
                    {request.description}
                  </p>

                  {/* AI Recommendation Card */}
                  <div className="bg-gradient-to-r from-[#3ECF8E]/10 to-[#2FBF9B]/10 border border-[#3ECF8E]/30 rounded-lg p-4 mb-4">
                    <div className="flex items-start gap-3">
                      <Zap size={20} className="text-[#3ECF8E] flex-shrink-0 mt-1" />
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-slate-900" style={{ fontFamily: "var(--font-body)" }}>
                          Nestly AI Recommendation
                        </p>
                        <p className="text-sm text-slate-700 mt-1" style={{ fontFamily: "var(--font-body)" }}>
                          <span className="font-bold text-[#3ECF8E]">{request.aiRecommendation.vendorName}</span> recommended for this request.
                        </p>
                        <p className="text-xs text-slate-600 mt-2" style={{ fontFamily: "var(--font-body)" }}>
                          {request.aiRecommendation.reason}
                        </p>
                        <div className="mt-3 flex items-center gap-2">
                          <div className="w-full bg-slate-200 rounded-full h-2">
                            <div
                              className="bg-[#3ECF8E] h-2 rounded-full"
                              style={{ width: `${request.aiRecommendation.confidence}%` }}
                            />
                          </div>
                          <span className="text-xs font-medium text-slate-600 whitespace-nowrap">
                            {request.aiRecommendation.confidence}% confidence
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2 text-xs text-slate-600">
                    <span>Submitted: {request.submittedDate}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* In Progress Section */}
        {inProgressRequests.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2" style={{ fontFamily: "var(--font-display)" }}>
              <Clock size={20} className="text-yellow-600" />
              In Progress
            </h2>
            <div className="space-y-4">
              {inProgressRequests.map((request) => (
                <motion.div
                  key={request.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  onClick={() => setSelectedRequest(request)}
                  className="bg-white rounded-lg border border-slate-200 shadow-sm hover:shadow-md cursor-pointer transition-all p-6"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-lg font-bold text-slate-900" style={{ fontFamily: "var(--font-body)" }}>
                        {request.propertyName}
                      </h3>
                      <p className="text-sm text-slate-600" style={{ fontFamily: "var(--font-body)" }}>
                        {request.issueType} • {request.tenantName}
                      </p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[request.status]}`}>
                      {request.status}
                    </span>
                  </div>
                  <p className="text-sm text-slate-700 mb-3" style={{ fontFamily: "var(--font-body)" }}>
                    {request.description}
                  </p>
                  {request.assignedVendor && (
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <Wrench size={14} />
                      <span>{request.assignedVendor.name}</span>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Completed Section */}
        {completedRequests.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2" style={{ fontFamily: "var(--font-display)" }}>
              <CheckCircle size={20} className="text-green-600" />
              Completed & Invoiced
            </h2>
            <div className="space-y-4">
              {completedRequests.map((request) => (
                <motion.div
                  key={request.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  onClick={() => setSelectedRequest(request)}
                  className="bg-white rounded-lg border border-slate-200 shadow-sm hover:shadow-md cursor-pointer transition-all p-6"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-lg font-bold text-slate-900" style={{ fontFamily: "var(--font-body)" }}>
                        {request.propertyName}
                      </h3>
                      <p className="text-sm text-slate-600" style={{ fontFamily: "var(--font-body)" }}>
                        {request.issueType} • {request.tenantName}
                      </p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[request.status]}`}>
                      {request.status}
                    </span>
                  </div>
                  {request.invoice && (
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2 text-slate-700">
                        <FileText size={14} />
                        <span>{request.invoice.fileName}</span>
                      </div>
                      <span className="font-bold text-slate-900">${request.invoice.amount}</span>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {filteredRequests.length === 0 && (
          <div className="bg-white rounded-lg border border-slate-200 p-12 text-center">
            <AlertCircle size={48} className="mx-auto text-slate-300 mb-4" />
            <p className="text-slate-600" style={{ fontFamily: "var(--font-body)" }}>
              No maintenance requests found
            </p>
          </div>
        )}
      </div>

      {/* Approval Modal */}
      <AnimatePresence>
        {showApprovalModal && selectedRequest && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowApprovalModal(false)}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-lg max-w-2xl w-full p-8 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-start justify-between mb-6">
                <h2 className="text-2xl font-bold text-slate-900" style={{ fontFamily: "var(--font-display)" }}>
                  Maintenance Request Review
                </h2>
                <button
                  onClick={() => setShowApprovalModal(false)}
                  className="text-slate-400 hover:text-slate-600"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Request Details */}
              <div className="space-y-6 mb-6">
                <div>
                  <p className="text-sm text-slate-600 mb-1" style={{ fontFamily: "var(--font-body)" }}>
                    Property
                  </p>
                  <p className="text-lg font-medium text-slate-900" style={{ fontFamily: "var(--font-body)" }}>
                    {selectedRequest.propertyName}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-slate-600 mb-1" style={{ fontFamily: "var(--font-body)" }}>
                      Tenant
                    </p>
                    <p className="text-lg font-medium text-slate-900" style={{ fontFamily: "var(--font-body)" }}>
                      {selectedRequest.tenantName}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600 mb-1" style={{ fontFamily: "var(--font-body)" }}>
                      Issue Type
                    </p>
                    <p className="text-lg font-medium text-slate-900" style={{ fontFamily: "var(--font-body)" }}>
                      {selectedRequest.issueType}
                    </p>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-slate-600 mb-1" style={{ fontFamily: "var(--font-body)" }}>
                    Description
                  </p>
                  <p className="text-slate-900" style={{ fontFamily: "var(--font-body)" }}>
                    {selectedRequest.description}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-slate-600 mb-2" style={{ fontFamily: "var(--font-body)" }}>
                    Urgency Level
                  </p>
                  <UrgencyBadge level={selectedRequest.urgencyLevel} />
                </div>
              </div>

              {/* AI Recommendation Section */}
              <div className="bg-gradient-to-r from-[#3ECF8E]/10 to-[#2FBF9B]/10 border border-[#3ECF8E]/30 rounded-lg p-6 mb-6">
                <div className="flex items-start gap-3 mb-4">
                  <Zap size={24} className="text-[#3ECF8E] flex-shrink-0" />
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-slate-900 mb-2" style={{ fontFamily: "var(--font-display)" }}>
                      AI Vendor Recommendation
                    </h3>
                    <p className="text-slate-700 mb-3" style={{ fontFamily: "var(--font-body)" }}>
                      <span className="font-bold text-[#3ECF8E]">{selectedRequest.aiRecommendation.vendorName}</span> is recommended for this request.
                    </p>
                    <p className="text-sm text-slate-600 mb-4" style={{ fontFamily: "var(--font-body)" }}>
                      {selectedRequest.aiRecommendation.reason}
                    </p>
                    <div className="flex items-center gap-2">
                      <div className="w-full bg-slate-200 rounded-full h-2">
                        <div
                          className="bg-[#3ECF8E] h-2 rounded-full"
                          style={{ width: `${selectedRequest.aiRecommendation.confidence}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium text-slate-600 whitespace-nowrap">
                        {selectedRequest.aiRecommendation.confidence}% confidence
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <button
                  onClick={() => {
                    toast.success(`Vendor ${selectedRequest.aiRecommendation.vendorName} assigned to request`);
                    setShowApprovalModal(false);
                  }}
                  className="flex-1 px-4 py-3 bg-[#3ECF8E] text-white rounded-lg font-medium hover:bg-[#2FBF9B] transition-all"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  Approve & Assign Vendor
                </button>
                <button
                  onClick={() => {
                    toast.info("Select different vendor feature coming soon");
                  }}
                  className="flex-1 px-4 py-3 border border-slate-300 text-slate-700 rounded-lg font-medium hover:bg-slate-50 transition-all"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  Choose Different Vendor
                </button>
                <button
                  onClick={() => setShowApprovalModal(false)}
                  className="px-4 py-3 border border-slate-300 text-slate-700 rounded-lg font-medium hover:bg-slate-50 transition-all"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Completion Modal */}
      <AnimatePresence>
        {showCompletionModal && selectedRequest && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowCompletionModal(false)}
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
                  Mark Job as Complete
                </h2>
                <button
                  onClick={() => setShowCompletionModal(false)}
                  className="text-slate-400 hover:text-slate-600"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="space-y-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2" style={{ fontFamily: "var(--font-body)" }}>
                    Invoice Amount
                  </label>
                  <input
                    type="number"
                    placeholder="Enter invoice amount"
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#3ECF8E] focus:border-transparent outline-none"
                    style={{ fontFamily: "var(--font-body)" }}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2" style={{ fontFamily: "var(--font-body)" }}>
                    Expense Category (AI will auto-categorize)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Plumbing Repairs, HVAC Maintenance"
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#3ECF8E] focus:border-transparent outline-none"
                    style={{ fontFamily: "var(--font-body)" }}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2" style={{ fontFamily: "var(--font-body)" }}>
                    Upload Invoice & Photos
                  </label>
                  <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center hover:border-[#3ECF8E] transition-colors cursor-pointer">
                    <Upload size={32} className="mx-auto text-slate-400 mb-2" />
                    <p className="text-sm text-slate-600 mb-1" style={{ fontFamily: "var(--font-body)" }}>
                      Click to upload or drag and drop
                    </p>
                    <p className="text-xs text-slate-500" style={{ fontFamily: "var(--font-body)" }}>
                      PDF, JPG, PNG (Max 10MB each)
                    </p>
                  </div>
                  {uploadedFiles.length > 0 && (
                    <div className="mt-4 space-y-2">
                      {uploadedFiles.map((file, idx) => (
                        <div key={idx} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                          <div className="flex items-center gap-2">
                            {file.type === "invoice" ? (
                              <FileText size={16} className="text-blue-600" />
                            ) : (
                              <ImageIcon size={16} className="text-green-600" />
                            )}
                            <span className="text-sm text-slate-700" style={{ fontFamily: "var(--font-body)" }}>
                              {file.name}
                            </span>
                          </div>
                          <button
                            onClick={() => setUploadedFiles(uploadedFiles.filter((_, i) => i !== idx))}
                            className="text-slate-400 hover:text-slate-600"
                          >
                            <X size={16} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <p className="text-sm text-blue-900" style={{ fontFamily: "var(--font-body)" }}>
                  <span className="font-bold">AI Auto-Categorization:</span> Once you submit, Nestly AI will automatically categorize this expense and record it in the Financial Ledger.
                </p>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => {
                    toast.success("Job completed and expense recorded in Financial Ledger");
                    setShowCompletionModal(false);
                  }}
                  className="flex-1 px-4 py-3 bg-[#3ECF8E] text-white rounded-lg font-medium hover:bg-[#2FBF9B] transition-all"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  Complete & Record Expense
                </button>
                <button
                  onClick={() => setShowCompletionModal(false)}
                  className="flex-1 px-4 py-3 border border-slate-300 text-slate-700 rounded-lg font-medium hover:bg-slate-50 transition-all"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Request Detail Modal */}
      <AnimatePresence>
        {selectedRequest && !showApprovalModal && !showCompletionModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedRequest(null)}
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
                  {selectedRequest.propertyName}
                </h2>
                <button
                  onClick={() => setSelectedRequest(null)}
                  className="text-slate-400 hover:text-slate-600"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="space-y-4 mb-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-slate-600 mb-1" style={{ fontFamily: "var(--font-body)" }}>
                      Tenant
                    </p>
                    <p className="font-medium text-slate-900" style={{ fontFamily: "var(--font-body)" }}>
                      {selectedRequest.tenantName}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600 mb-1" style={{ fontFamily: "var(--font-body)" }}>
                      Status
                    </p>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[selectedRequest.status]}`}>
                      {selectedRequest.status}
                    </span>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-slate-600 mb-1" style={{ fontFamily: "var(--font-body)" }}>
                    Description
                  </p>
                  <p className="text-slate-900" style={{ fontFamily: "var(--font-body)" }}>
                    {selectedRequest.description}
                  </p>
                </div>

                {selectedRequest.assignedVendor && (
                  <div>
                    <p className="text-sm text-slate-600 mb-2" style={{ fontFamily: "var(--font-body)" }}>
                      Assigned Vendor
                    </p>
                    <div className="bg-slate-50 rounded-lg p-4">
                      <p className="font-medium text-slate-900" style={{ fontFamily: "var(--font-body)" }}>
                        {selectedRequest.assignedVendor.name}
                      </p>
                      <p className="text-sm text-slate-600" style={{ fontFamily: "var(--font-body)" }}>
                        {selectedRequest.assignedVendor.contactName} • {selectedRequest.assignedVendor.phone}
                      </p>
                    </div>
                  </div>
                )}

                {selectedRequest.invoice && (
                  <div>
                    <p className="text-sm text-slate-600 mb-2" style={{ fontFamily: "var(--font-body)" }}>
                      Invoice Details
                    </p>
                    <div className="bg-slate-50 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-slate-700" style={{ fontFamily: "var(--font-body)" }}>
                          {selectedRequest.invoice.fileName}
                        </span>
                        <span className="font-bold text-slate-900">${selectedRequest.invoice.amount}</span>
                      </div>
                      <p className="text-xs text-slate-600" style={{ fontFamily: "var(--font-body)" }}>
                        Category: {selectedRequest.invoice.category}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex gap-4">
                {selectedRequest.status === "New" && (
                  <button
                    onClick={() => {
                      setShowApprovalModal(true);
                    }}
                    className="flex-1 px-4 py-2 bg-[#3ECF8E] text-white rounded-lg font-medium hover:bg-[#2FBF9B] transition-all"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    Review & Approve
                  </button>
                )}
                {(selectedRequest.status === "In Progress" || selectedRequest.status === "Assigned") && (
                  <button
                    onClick={() => {
                      setShowCompletionModal(true);
                    }}
                    className="flex-1 px-4 py-2 bg-[#3ECF8E] text-white rounded-lg font-medium hover:bg-[#2FBF9B] transition-all"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    Mark Complete & Upload Invoice
                  </button>
                )}
                <button
                  onClick={() => setSelectedRequest(null)}
                  className="flex-1 px-4 py-2 border border-slate-300 text-slate-700 rounded-lg font-medium hover:bg-slate-50 transition-all"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
