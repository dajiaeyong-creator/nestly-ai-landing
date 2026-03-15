/*
 * Maintenance Workflow Page
 * Manage maintenance requests, vendor assignments, and track workflow stages
 */

import { motion } from "framer-motion";
import { Wrench, AlertCircle, Clock, CheckCircle, Zap, TrendingUp, Filter, Search, ChevronRight, Sparkles } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const maintenanceRequests = [
  {
    id: "MR-001",
    property: "Downtown Apartment",
    unit: "4B",
    tenant: "John Smith",
    issueType: "Plumbing",
    priority: "high",
    assignedVendor: "ProFix Plumbing",
    status: "in_progress",
    estimatedCost: 450,
    lastUpdate: "2 hours ago",
    stage: 5,
  },
  {
    id: "MR-002",
    property: "Midtown House",
    unit: "Main",
    tenant: "Sarah Johnson",
    issueType: "Electrical",
    priority: "medium",
    assignedVendor: "ElectroWorks",
    status: "awaiting_vendor",
    estimatedCost: 350,
    lastUpdate: "4 hours ago",
    stage: 3,
  },
  {
    id: "MR-003",
    property: "Uptown Loft",
    unit: "2A",
    tenant: "Mike Davis",
    issueType: "HVAC",
    priority: "high",
    assignedVendor: "Climate Control",
    status: "vendor_accepted",
    estimatedCost: 800,
    lastUpdate: "1 day ago",
    stage: 4,
  },
  {
    id: "MR-004",
    property: "Downtown Apartment",
    unit: "3F",
    tenant: "Emily Chen",
    issueType: "Painting",
    priority: "low",
    assignedVendor: "Pending",
    status: "submitted",
    estimatedCost: 250,
    lastUpdate: "2 days ago",
    stage: 1,
  },
  {
    id: "MR-005",
    property: "Midtown House",
    unit: "Garage",
    tenant: "Robert Wilson",
    issueType: "Door Repair",
    priority: "medium",
    assignedVendor: "ProFix Plumbing",
    status: "invoice_submitted",
    estimatedCost: 200,
    lastUpdate: "3 days ago",
    stage: 6,
  },
];

const workflowStages = [
  { id: 1, label: "Request Submitted", icon: "📝" },
  { id: 2, label: "AI Categorizes", icon: "🤖" },
  { id: 3, label: "Vendor Assigned", icon: "👤" },
  { id: 4, label: "Vendor Accepts", icon: "✓" },
  { id: 5, label: "Work In Progress", icon: "🔨" },
  { id: 6, label: "Invoice Submitted", icon: "📄" },
  { id: 7, label: "Owner Approves", icon: "👍" },
  { id: 8, label: "Payment Issued", icon: "💳" },
];

const aiRecommendations = {
  vendor: "ProFix Plumbing",
  vendorRating: 4.8,
  estimatedCost: 450,
  costRange: "$400-$500",
  completionTime: "2-3 days",
  reasoning: "Best match based on service type, location, and historical performance",
};

export default function MaintenanceWorkflow() {
  const [requests, setRequests] = useState(maintenanceRequests);
  const [selectedRequest, setSelectedRequest] = useState<typeof maintenanceRequests[0] | null>(null);
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [showAIPanel, setShowAIPanel] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "submitted":
        return "bg-blue-100 text-blue-700";
      case "in_progress":
        return "bg-yellow-100 text-yellow-700";
      case "awaiting_vendor":
        return "bg-orange-100 text-orange-700";
      case "vendor_accepted":
        return "bg-purple-100 text-purple-700";
      case "invoice_submitted":
        return "bg-green-100 text-green-700";
      case "completed":
        return "bg-emerald-100 text-emerald-700";
      default:
        return "bg-slate-100 text-slate-700";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "text-red-600 bg-red-50";
      case "medium":
        return "text-yellow-600 bg-yellow-50";
      case "low":
        return "text-green-600 bg-green-50";
      default:
        return "text-slate-600 bg-slate-50";
    }
  };

  const getStatusLabel = (status: string) => {
    const labels: Record<string, string> = {
      submitted: "Submitted",
      in_progress: "In Progress",
      awaiting_vendor: "Awaiting Vendor",
      vendor_accepted: "Vendor Accepted",
      invoice_submitted: "Invoice Submitted",
      completed: "Completed",
    };
    return labels[status] || status;
  };

  const filteredRequests = requests.filter((req) => {
    const matchesStatus = filterStatus === "all" || req.status === filterStatus;
    const matchesSearch = searchTerm === "" || 
      req.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      req.property.toLowerCase().includes(searchTerm.toLowerCase()) ||
      req.tenant.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const metrics = [
    { label: "Open Requests", value: requests.filter(r => r.status === "submitted" || r.status === "awaiting_vendor").length, icon: AlertCircle, color: "from-orange-500 to-orange-600" },
    { label: "In Progress", value: requests.filter(r => r.status === "in_progress" || r.status === "vendor_accepted").length, icon: Wrench, color: "from-blue-500 to-blue-600" },
    { label: "Awaiting Vendor", value: requests.filter(r => r.status === "awaiting_vendor").length, icon: Clock, color: "from-yellow-500 to-yellow-600" },
    { label: "Completed This Month", value: 12, icon: CheckCircle, color: "from-green-500 to-green-600" },
  ];

  const handleApproveVendor = (requestId: string) => {
    toast.success(`Vendor assignment approved for ${requestId}`);
    setShowAIPanel(false);
  };

  const handleOverrideVendor = (requestId: string) => {
    toast.info("Opening vendor selection dialog...");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-slate-50 to-blue-50">
      {/* Header */}
      <div className="sticky top-0 z-20 border-b border-slate-100 bg-white/80 backdrop-blur-md shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-gradient-to-br from-orange-500 to-orange-600">
                <Wrench size={20} className="text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-900" style={{ fontFamily: "var(--font-display)" }}>
                  Maintenance Workflow
                </h1>
                <p className="text-sm text-slate-500">Manage requests and vendor assignments</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
        {/* Metrics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {metrics.map((metric, idx) => {
            const IconComponent = metric.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="rounded-xl p-6 bg-white border border-slate-200 shadow-sm hover:shadow-md transition-all"
              >
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-medium text-slate-600">{metric.label}</p>
                  <div className={`p-2 rounded-lg bg-gradient-to-br ${metric.color}`}>
                    <IconComponent size={18} className="text-white" />
                  </div>
                </div>
                <p className="text-3xl font-bold text-slate-900">{metric.value}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between"
        >
          <div className="flex-1 relative">
            <Search size={18} className="absolute left-3 top-3 text-slate-400" />
            <input
              type="text"
              placeholder="Search by ID, property, or tenant..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg outline-none focus:border-[#3ECF8E] transition-colors"
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-slate-200 rounded-lg outline-none focus:border-[#3ECF8E] transition-colors bg-white"
          >
            <option value="all">All Status</option>
            <option value="submitted">Submitted</option>
            <option value="in_progress">In Progress</option>
            <option value="awaiting_vendor">Awaiting Vendor</option>
            <option value="vendor_accepted">Vendor Accepted</option>
            <option value="invoice_submitted">Invoice Submitted</option>
          </select>
        </motion.div>

        {/* Requests Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="rounded-2xl p-6 bg-white border border-slate-200 shadow-sm overflow-x-auto"
        >
          <h2 className="text-lg font-semibold text-slate-900 mb-4" style={{ fontFamily: "var(--font-display)" }}>
            Maintenance Requests
          </h2>

          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-4 font-semibold text-slate-700">ID</th>
                <th className="text-left py-3 px-4 font-semibold text-slate-700">Property</th>
                <th className="text-left py-3 px-4 font-semibold text-slate-700">Unit</th>
                <th className="text-left py-3 px-4 font-semibold text-slate-700">Tenant</th>
                <th className="text-left py-3 px-4 font-semibold text-slate-700">Issue</th>
                <th className="text-left py-3 px-4 font-semibold text-slate-700">Priority</th>
                <th className="text-left py-3 px-4 font-semibold text-slate-700">Vendor</th>
                <th className="text-left py-3 px-4 font-semibold text-slate-700">Status</th>
                <th className="text-left py-3 px-4 font-semibold text-slate-700">Cost</th>
                <th className="text-left py-3 px-4 font-semibold text-slate-700">Updated</th>
              </tr>
            </thead>
            <tbody>
              {filteredRequests.map((request) => (
                <tr
                  key={request.id}
                  className="border-b border-slate-100 hover:bg-slate-50 transition-colors cursor-pointer"
                  onClick={() => {
                    setSelectedRequest(request);
                    setShowAIPanel(true);
                  }}
                >
                  <td className="py-3 px-4 font-semibold text-slate-900">{request.id}</td>
                  <td className="py-3 px-4 text-slate-600">{request.property}</td>
                  <td className="py-3 px-4 text-slate-600">{request.unit}</td>
                  <td className="py-3 px-4 text-slate-600">{request.tenant}</td>
                  <td className="py-3 px-4 text-slate-600">{request.issueType}</td>
                  <td className="py-3 px-4">
                    <span className={`text-xs font-semibold px-2 py-1 rounded-full ${getPriorityColor(request.priority)}`}>
                      {request.priority.charAt(0).toUpperCase() + request.priority.slice(1)}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-slate-600">{request.assignedVendor}</td>
                  <td className="py-3 px-4">
                    <span className={`text-xs font-semibold px-2 py-1 rounded-full ${getStatusColor(request.status)}`}>
                      {getStatusLabel(request.status)}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-medium text-slate-900">${request.estimatedCost}</td>
                  <td className="py-3 px-4 text-slate-600 text-xs">{request.lastUpdate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>

        {/* AI Recommendation Panel */}
        {showAIPanel && selectedRequest && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="rounded-2xl p-6 bg-gradient-to-br from-purple-50 to-blue-50 border-2 border-purple-200 shadow-sm"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-gradient-to-br from-purple-500 to-purple-600">
                  <Sparkles size={20} className="text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-900" style={{ fontFamily: "var(--font-display)" }}>
                    AI Recommendation for {selectedRequest.id}
                  </h3>
                  <p className="text-sm text-slate-600">{selectedRequest.property} - {selectedRequest.issueType}</p>
                </div>
              </div>
              <button
                onClick={() => setShowAIPanel(false)}
                className="text-slate-500 hover:text-slate-700 text-2xl"
              >
                ×
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div className="p-4 rounded-lg bg-white border border-slate-200">
                <p className="text-xs text-slate-600 mb-1">Recommended Vendor</p>
                <p className="text-lg font-bold text-slate-900">{aiRecommendations.vendor}</p>
                <div className="flex items-center gap-1 mt-1">
                  <span className="text-yellow-500">★</span>
                  <span className="text-xs font-medium text-slate-700">{aiRecommendations.vendorRating} rating</span>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-white border border-slate-200">
                <p className="text-xs text-slate-600 mb-1">Estimated Cost</p>
                <p className="text-lg font-bold text-slate-900">${aiRecommendations.estimatedCost}</p>
                <p className="text-xs text-slate-500 mt-1">{aiRecommendations.costRange}</p>
              </div>

              <div className="p-4 rounded-lg bg-white border border-slate-200">
                <p className="text-xs text-slate-600 mb-1">Completion Time</p>
                <p className="text-lg font-bold text-slate-900">{aiRecommendations.completionTime}</p>
                <p className="text-xs text-slate-500 mt-1">Estimated duration</p>
              </div>

              <div className="p-4 rounded-lg bg-white border border-slate-200">
                <p className="text-xs text-slate-600 mb-1">AI Confidence</p>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden">
                    <div className="h-full w-4/5 bg-gradient-to-r from-[#3ECF8E] to-[#06B6D4]" />
                  </div>
                  <span className="text-sm font-bold text-slate-900">92%</span>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white border border-slate-200 mb-6">
              <p className="text-sm font-medium text-slate-900 mb-2">Why This Vendor?</p>
              <p className="text-sm text-slate-600">{aiRecommendations.reasoning}</p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => handleApproveVendor(selectedRequest.id)}
                className="flex-1 py-3 px-4 bg-gradient-to-r from-[#3ECF8E] to-[#2FBF9B] text-white rounded-lg font-medium hover:shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <CheckCircle size={18} />
                Approve Assignment
              </button>
              <button
                onClick={() => handleOverrideVendor(selectedRequest.id)}
                className="flex-1 py-3 px-4 border border-slate-300 text-slate-700 rounded-lg font-medium hover:bg-slate-50 transition-all flex items-center justify-center gap-2"
              >
                <ChevronRight size={18} />
                Override & Select
              </button>
            </div>
          </motion.div>
        )}

        {/* Workflow Stages */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="rounded-2xl p-6 bg-white border border-slate-200 shadow-sm"
        >
          <h2 className="text-lg font-semibold text-slate-900 mb-6" style={{ fontFamily: "var(--font-display)" }}>
            Maintenance Workflow Stages
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
            {workflowStages.map((stage, idx) => (
              <div key={stage.id} className="flex flex-col items-center">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold mb-2 ${
                  selectedRequest && selectedRequest.stage >= stage.id
                    ? "bg-gradient-to-br from-[#3ECF8E] to-[#2FBF9B] text-white"
                    : "bg-slate-200 text-slate-600"
                }`}>
                  {stage.icon}
                </div>
                <p className="text-xs font-medium text-center text-slate-700">{stage.label}</p>
                {idx < workflowStages.length - 1 && (
                  <div className={`w-0.5 h-6 mt-2 ${
                    selectedRequest && selectedRequest.stage > stage.id
                      ? "bg-gradient-to-b from-[#3ECF8E] to-[#2FBF9B]"
                      : "bg-slate-200"
                  }`} />
                )}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
