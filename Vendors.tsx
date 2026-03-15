/*
 * Vendors Page – Manage maintenance and operations vendors
 * Invite-based onboarding with secure banking and tax documentation
 */

import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Plus,
  Filter,
  Star,
  Clock,
  DollarSign,
  MapPin,
  Phone,
  Mail,
  AlertCircle,
  Zap,
  ChevronRight,
  X,
  FileCheck,
  Lock,
  Send,
} from "lucide-react";
import { useState, useMemo } from "react";
import { toast } from "sonner";
import VendorInviteModal from "../components/VendorInviteModal";

interface Vendor {
  id: number;
  name: string;
  serviceType: "Plumbing" | "Electrical" | "Landscaping" | "Cleaning" | "Legal" | "HVAC" | "Roofing" | "General Maintenance";
  contactName: string;
  phone: string;
  email: string;
  preferredProperties: string[];
  paymentMethod: "Check" | "Bank Transfer" | "Credit Card";
  averageResponseTime: number;
  totalJobsCompleted: number;
  averageRepairCost: number;
  rating: number;
  isRecommended: boolean;
  status: "Active" | "Invited" | "Pending Setup" | "Missing W-9" | "Missing Bank Info";
  w9Uploaded?: boolean;
  bankInfoComplete?: boolean;
}

const vendorsData: Vendor[] = [
  {
    id: 1,
    name: "ProFix Plumbing",
    serviceType: "Plumbing",
    contactName: "Mike Johnson",
    phone: "(555) 123-4567",
    email: "mike@profixplumbing.com",
    preferredProperties: ["Downtown Apartments", "Lakeside Villas"],
    paymentMethod: "Bank Transfer",
    averageResponseTime: 2,
    totalJobsCompleted: 156,
    averageRepairCost: 450,
    rating: 4.8,
    isRecommended: true,
    status: "Active",
    w9Uploaded: true,
    bankInfoComplete: true,
  },
  {
    id: 2,
    name: "ElectroWorks",
    serviceType: "Electrical",
    contactName: "Sarah Chen",
    phone: "(555) 234-5678",
    email: "sarah@electroworks.com",
    preferredProperties: ["Downtown Apartments", "Sunset Plaza"],
    paymentMethod: "Check",
    averageResponseTime: 3,
    totalJobsCompleted: 89,
    averageRepairCost: 520,
    rating: 4.6,
    isRecommended: true,
    status: "Active",
    w9Uploaded: true,
    bankInfoComplete: true,
  },
  {
    id: 3,
    name: "Green Landscapes",
    serviceType: "Landscaping",
    contactName: "Tom Wilson",
    phone: "(555) 345-6789",
    email: "tom@greenlandscapes.com",
    preferredProperties: ["Lakeside Villas", "Sunset Plaza"],
    paymentMethod: "Bank Transfer",
    averageResponseTime: 4,
    totalJobsCompleted: 234,
    averageRepairCost: 280,
    rating: 4.7,
    isRecommended: false,
    status: "Active",
    w9Uploaded: true,
    bankInfoComplete: true,
  },
  {
    id: 4,
    name: "ABC Cleaning Services",
    serviceType: "Cleaning",
    contactName: "Jennifer Davis",
    phone: "(555) 456-7890",
    email: "jennifer@abccleaning.com",
    preferredProperties: ["Downtown Apartments"],
    paymentMethod: "Credit Card",
    averageResponseTime: 1,
    totalJobsCompleted: 512,
    averageRepairCost: 250,
    rating: 4.9,
    isRecommended: true,
    status: "Active",
    w9Uploaded: true,
    bankInfoComplete: true,
  },
  {
    id: 5,
    name: "Legal Plus",
    serviceType: "Legal",
    contactName: "Robert Martinez",
    phone: "(555) 567-8901",
    email: "robert@legalplus.com",
    preferredProperties: ["All Properties"],
    paymentMethod: "Check",
    averageResponseTime: 24,
    totalJobsCompleted: 45,
    averageRepairCost: 1200,
    rating: 4.5,
    isRecommended: false,
    status: "Active",
    w9Uploaded: true,
    bankInfoComplete: true,
  },
  {
    id: 6,
    name: "Cool HVAC Solutions",
    serviceType: "HVAC",
    contactName: "David Lee",
    phone: "(555) 678-9012",
    email: "david@coolhvac.com",
    preferredProperties: ["Lakeside Villas", "Sunset Plaza", "Downtown Apartments"],
    paymentMethod: "Bank Transfer",
    averageResponseTime: 2,
    totalJobsCompleted: 178,
    averageRepairCost: 650,
    rating: 4.7,
    isRecommended: true,
    status: "Active",
    w9Uploaded: true,
    bankInfoComplete: true,
  },
  {
    id: 7,
    name: "TechFlow Solutions",
    serviceType: "Electrical",
    contactName: "Alex Rodriguez",
    phone: "(555) 789-0123",
    email: "alex@techflow.com",
    preferredProperties: [],
    paymentMethod: "Bank Transfer",
    averageResponseTime: 0,
    totalJobsCompleted: 0,
    averageRepairCost: 0,
    rating: 0,
    isRecommended: false,
    status: "Invited",
    w9Uploaded: false,
    bankInfoComplete: false,
  },
  {
    id: 8,
    name: "Rapid Repairs Inc",
    serviceType: "General Maintenance",
    contactName: "Patricia Martinez",
    phone: "(555) 456-7890",
    email: "patricia@rapidrepairs.com",
    preferredProperties: ["Downtown Apartments"],
    paymentMethod: "Bank Transfer",
    averageResponseTime: 3,
    totalJobsCompleted: 45,
    averageRepairCost: 350,
    rating: 4.4,
    isRecommended: false,
    status: "Pending Setup",
    w9Uploaded: false,
    bankInfoComplete: true,
  },
  {
    id: 9,
    name: "Premium Plumbing Co",
    serviceType: "Plumbing",
    contactName: "Lisa Anderson",
    phone: "(555) 321-0987",
    email: "lisa@premiumplumbing.com",
    preferredProperties: [],
    paymentMethod: "Bank Transfer",
    averageResponseTime: 0,
    totalJobsCompleted: 0,
    averageRepairCost: 0,
    rating: 0,
    isRecommended: false,
    status: "Missing W-9",
    w9Uploaded: false,
    bankInfoComplete: true,
  },
];

const statusColors: Record<string, string> = {
  Active: "bg-green-50 text-green-700 border-green-200",
  Invited: "bg-blue-50 text-blue-700 border-blue-200",
  "Pending Setup": "bg-yellow-50 text-yellow-700 border-yellow-200",
  "Missing W-9": "bg-red-50 text-red-700 border-red-200",
  "Missing Bank Info": "bg-orange-50 text-orange-700 border-orange-200",
};

function StatusBadge({ status }: { status: string }) {
  const icons: Record<string, React.ReactNode> = {
    Active: <CheckCircle size={14} />,
    Invited: <Send size={14} />,
    "Pending Setup": <Clock size={14} />,
    "Missing W-9": <FileCheck size={14} />,
    "Missing Bank Info": <Lock size={14} />,
  };

  return (
    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full border text-xs font-medium ${statusColors[status]}`}>
      {icons[status]}
      {status}
    </span>
  );
}

export default function Vendors() {
  const [searchTerm, setSearchTerm] = useState("");
  const [serviceTypeFilter, setServiceTypeFilter] = useState("all");
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [showAddVendor, setShowAddVendor] = useState(false);
  const [selectedVendor, setSelectedVendor] = useState<Vendor | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

  const filteredVendors = useMemo(() => {
    return vendorsData.filter((vendor) => {
      const matchesSearch =
        vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vendor.contactName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vendor.email.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesServiceType = serviceTypeFilter === "all" || vendor.serviceType === serviceTypeFilter;

      return matchesSearch && matchesServiceType;
    });
  }, [searchTerm, serviceTypeFilter]);

  const activeVendors = filteredVendors.filter((v) => v.status === "Active");
  const pendingVendors = filteredVendors.filter((v) => v.status !== "Active");

  const handleViewDetails = (vendor: Vendor) => {
    setSelectedVendor(vendor);
    setShowDetailModal(true);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Top Navigation */}
      <div className="border-b border-slate-200 bg-white sticky top-0 z-20 shadow-sm">
        <div className="px-6 py-4">
          <h1 className="text-2xl font-bold text-slate-900" style={{ fontFamily: "var(--font-display)" }}>
            Vendors
          </h1>
          <p className="text-sm text-slate-600 mt-1" style={{ fontFamily: "var(--font-body)" }}>
            Manage vendors with secure onboarding and payment processing
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
              Active Vendors
            </p>
            <p className="text-3xl font-bold text-green-600" style={{ fontFamily: "var(--font-display)" }}>
              {activeVendors.length}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-lg p-6 border border-slate-200 shadow-sm"
          >
            <p className="text-sm text-slate-600 mb-2" style={{ fontFamily: "var(--font-body)" }}>
              Pending Setup
            </p>
            <p className="text-3xl font-bold text-yellow-600" style={{ fontFamily: "var(--font-display)" }}>
              {pendingVendors.length}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-lg p-6 border border-slate-200 shadow-sm"
          >
            <p className="text-sm text-slate-600 mb-2" style={{ fontFamily: "var(--font-body)" }}>
              Total Vendors
            </p>
            <p className="text-3xl font-bold text-[#3ECF8E]" style={{ fontFamily: "var(--font-display)" }}>
              {vendorsData.length}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-lg p-6 border border-slate-200 shadow-sm"
          >
            <p className="text-sm text-slate-600 mb-2" style={{ fontFamily: "var(--font-body)" }}>
              Recommended
            </p>
            <p className="text-3xl font-bold text-blue-600" style={{ fontFamily: "var(--font-display)" }}>
              {vendorsData.filter((v) => v.isRecommended).length}
            </p>
          </motion.div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg p-6 border border-slate-200 shadow-sm mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2" style={{ fontFamily: "var(--font-body)" }}>
                Search Vendors
              </label>
              <div className="relative">
                <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Name, contact, email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
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
                value={serviceTypeFilter}
                onChange={(e) => setServiceTypeFilter(e.target.value)}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#3ECF8E] focus:border-transparent outline-none"
                style={{ fontFamily: "var(--font-body)" }}
              >
                <option value="all">All Services</option>
                <option value="Plumbing">Plumbing</option>
                <option value="Electrical">Electrical</option>
                <option value="Landscaping">Landscaping</option>
                <option value="Cleaning">Cleaning</option>
                <option value="Legal">Legal</option>
                <option value="HVAC">HVAC</option>
                <option value="Roofing">Roofing</option>
                <option value="General Maintenance">General Maintenance</option>
              </select>
            </div>

            <div className="flex items-end gap-2">
              <button
                onClick={() => setShowInviteModal(true)}
                className="flex-1 px-4 py-2 bg-[#3ECF8E] text-white rounded-lg font-medium hover:bg-[#2FBF9B] transition-all flex items-center justify-center gap-2"
                style={{ fontFamily: "var(--font-body)" }}
              >
                <Plus size={18} />
                Invite Vendor
              </button>
              <button
                onClick={() => setShowAddVendor(true)}
                className="flex-1 px-4 py-2 border border-slate-300 text-slate-700 rounded-lg font-medium hover:bg-slate-50 transition-all flex items-center justify-center gap-2"
                style={{ fontFamily: "var(--font-body)" }}
              >
                <Plus size={18} />
                Add Existing
              </button>
            </div>
          </div>
        </div>

        {/* Active Vendors Section */}
        {activeVendors.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2" style={{ fontFamily: "var(--font-display)" }}>
              <Star size={20} className="text-green-600" />
              Active Vendors
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50">
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase" style={{ fontFamily: "var(--font-body)" }}>
                      Vendor Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase" style={{ fontFamily: "var(--font-body)" }}>
                      Service Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase" style={{ fontFamily: "var(--font-body)" }}>
                      Contact
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase" style={{ fontFamily: "var(--font-body)" }}>
                      Rating
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase" style={{ fontFamily: "var(--font-body)" }}>
                      Response Time
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase" style={{ fontFamily: "var(--font-body)" }}>
                      Jobs
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase" style={{ fontFamily: "var(--font-body)" }}>
                      Avg Cost
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {activeVendors.map((vendor) => (
                    <motion.tr
                      key={vendor.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      onClick={() => handleViewDetails(vendor)}
                      className="border-b border-slate-200 hover:bg-slate-50 cursor-pointer transition-all"
                    >
                      <td className="px-6 py-4 text-sm font-medium text-slate-900" style={{ fontFamily: "var(--font-body)" }}>
                        <div className="flex items-center gap-2">
                          {vendor.isRecommended && <Zap size={14} className="text-[#3ECF8E]" />}
                          {vendor.name}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-700" style={{ fontFamily: "var(--font-body)" }}>
                        {vendor.serviceType}
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-700" style={{ fontFamily: "var(--font-body)" }}>
                        <div>
                          <p>{vendor.contactName}</p>
                          <p className="text-xs text-slate-500">{vendor.email}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-700" style={{ fontFamily: "var(--font-body)" }}>
                        <div className="flex items-center gap-1">
                          <Star size={14} className="text-yellow-500 fill-yellow-500" />
                          {vendor.rating}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-700" style={{ fontFamily: "var(--font-body)" }}>
                        <div className="flex items-center gap-1">
                          <Clock size={14} className="text-slate-400" />
                          {vendor.averageResponseTime}h
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-700" style={{ fontFamily: "var(--font-body)" }}>
                        {vendor.totalJobsCompleted}
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-slate-900" style={{ fontFamily: "var(--font-body)" }}>
                        ${vendor.averageRepairCost}
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {/* Pending Vendors Section */}
        {pendingVendors.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2" style={{ fontFamily: "var(--font-display)" }}>
              <AlertCircle size={20} className="text-yellow-600" />
              Pending Onboarding
            </h2>
            <div className="space-y-4">
              {pendingVendors.map((vendor) => (
                <motion.div
                  key={vendor.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  onClick={() => handleViewDetails(vendor)}
                  className="bg-white rounded-lg border border-slate-200 shadow-sm hover:shadow-md cursor-pointer transition-all p-6"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-lg font-bold text-slate-900" style={{ fontFamily: "var(--font-body)" }}>
                        {vendor.name}
                      </h3>
                      <p className="text-sm text-slate-600" style={{ fontFamily: "var(--font-body)" }}>
                        {vendor.serviceType} • {vendor.contactName}
                      </p>
                    </div>
                    <StatusBadge status={vendor.status} />
                  </div>

                  {/* Status Details */}
                  <div className="space-y-2 text-sm">
                    {vendor.status === "Invited" && (
                      <p className="text-slate-600" style={{ fontFamily: "var(--font-body)" }}>
                        Invitation sent to <span className="font-medium">{vendor.email}</span>. Awaiting vendor response.
                      </p>
                    )}
                    {vendor.status === "Pending Setup" && (
                      <div className="space-y-1">
                        <p className="text-slate-600" style={{ fontFamily: "var(--font-body)" }}>
                          <span className="font-medium">Setup Progress:</span>
                        </p>
                        <div className="flex gap-4 text-xs">
                          <div className="flex items-center gap-1">
                            <div className={`w-3 h-3 rounded-full ${vendor.bankInfoComplete ? "bg-green-600" : "bg-slate-300"}`} />
                            <span>Bank Info</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <div className={`w-3 h-3 rounded-full ${vendor.w9Uploaded ? "bg-green-600" : "bg-slate-300"}`} />
                            <span>W-9 Form</span>
                          </div>
                        </div>
                      </div>
                    )}
                    {vendor.status === "Missing W-9" && (
                      <p className="text-red-600 font-medium" style={{ fontFamily: "var(--font-body)" }}>
                        ⚠️ W-9 form required before payments can be processed
                      </p>
                    )}
                    {vendor.status === "Missing Bank Info" && (
                      <p className="text-red-600 font-medium" style={{ fontFamily: "var(--font-body)" }}>
                        ⚠️ Bank account information required
                      </p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {filteredVendors.length === 0 && (
          <div className="bg-white rounded-lg border border-slate-200 p-12 text-center">
            <AlertCircle size={48} className="mx-auto text-slate-300 mb-4" />
            <p className="text-slate-600" style={{ fontFamily: "var(--font-body)" }}>
              No vendors found
            </p>
          </div>
        )}
      </div>

      {/* Invite Vendor Modal */}
      <VendorInviteModal isOpen={showInviteModal} onClose={() => setShowInviteModal(false)} />

      {/* Vendor Detail Modal */}
      <AnimatePresence>
        {showDetailModal && selectedVendor && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowDetailModal(false)}
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
                  {selectedVendor.name}
                </h2>
                <button
                  onClick={() => setShowDetailModal(false)}
                  className="text-slate-400 hover:text-slate-600"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="space-y-6 mb-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-600 mb-1" style={{ fontFamily: "var(--font-body)" }}>
                      Status
                    </p>
                    <StatusBadge status={selectedVendor.status} />
                  </div>
                  <div>
                    <p className="text-sm text-slate-600 mb-1" style={{ fontFamily: "var(--font-body)" }}>
                      Service Type
                    </p>
                    <p className="text-lg font-medium text-slate-900" style={{ fontFamily: "var(--font-body)" }}>
                      {selectedVendor.serviceType}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-slate-600 mb-1" style={{ fontFamily: "var(--font-body)" }}>
                      Contact Name
                    </p>
                    <p className="font-medium text-slate-900" style={{ fontFamily: "var(--font-body)" }}>
                      {selectedVendor.contactName}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600 mb-1" style={{ fontFamily: "var(--font-body)" }}>
                      Phone
                    </p>
                    <p className="font-medium text-slate-900" style={{ fontFamily: "var(--font-body)" }}>
                      {selectedVendor.phone}
                    </p>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-slate-600 mb-1" style={{ fontFamily: "var(--font-body)" }}>
                    Email
                  </p>
                  <p className="font-medium text-slate-900" style={{ fontFamily: "var(--font-body)" }}>
                    {selectedVendor.email}
                  </p>
                </div>

                {selectedVendor.status === "Active" && (
                  <>
                    <div className="border-t border-slate-200 pt-6">
                      <h3 className="font-bold text-slate-900 mb-4" style={{ fontFamily: "var(--font-display)" }}>
                        Performance Metrics
                      </h3>
                      <div className="grid grid-cols-3 gap-4">
                        <div className="bg-slate-50 rounded-lg p-4">
                          <p className="text-xs text-slate-600 mb-1" style={{ fontFamily: "var(--font-body)" }}>
                            Avg Response Time
                          </p>
                          <p className="text-2xl font-bold text-slate-900" style={{ fontFamily: "var(--font-display)" }}>
                            {selectedVendor.averageResponseTime}h
                          </p>
                        </div>
                        <div className="bg-slate-50 rounded-lg p-4">
                          <p className="text-xs text-slate-600 mb-1" style={{ fontFamily: "var(--font-body)" }}>
                            Jobs Completed
                          </p>
                          <p className="text-2xl font-bold text-slate-900" style={{ fontFamily: "var(--font-display)" }}>
                            {selectedVendor.totalJobsCompleted}
                          </p>
                        </div>
                        <div className="bg-slate-50 rounded-lg p-4">
                          <p className="text-xs text-slate-600 mb-1" style={{ fontFamily: "var(--font-body)" }}>
                            Avg Cost
                          </p>
                          <p className="text-2xl font-bold text-slate-900" style={{ fontFamily: "var(--font-display)" }}>
                            ${selectedVendor.averageRepairCost}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-slate-200 pt-6">
                      <h3 className="font-bold text-slate-900 mb-4" style={{ fontFamily: "var(--font-display)" }}>
                        Compliance
                      </h3>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 rounded-full bg-green-600" />
                          <span className="text-sm text-slate-700" style={{ fontFamily: "var(--font-body)" }}>
                            W-9 Form: Uploaded
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 rounded-full bg-green-600" />
                          <span className="text-sm text-slate-700" style={{ fontFamily: "var(--font-body)" }}>
                            Bank Account: Verified
                          </span>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {selectedVendor.status !== "Active" && (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <p className="text-sm text-yellow-900" style={{ fontFamily: "var(--font-body)" }}>
                      <span className="font-bold">Setup Status:</span> This vendor must complete onboarding before they can receive assignments and payments.
                    </p>
                  </div>
                )}
              </div>

              <div className="flex gap-4">
                {selectedVendor.status === "Active" && (
                  <button
                    onClick={() => {
                      toast.success(`${selectedVendor.name} assigned to maintenance request`);
                      setShowDetailModal(false);
                    }}
                    className="flex-1 px-4 py-3 bg-[#3ECF8E] text-white rounded-lg font-medium hover:bg-[#2FBF9B] transition-all"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    Assign to Job
                  </button>
                )}
                <button
                  onClick={() => {
                    toast.info("Contact vendor feature coming soon");
                  }}
                  className="flex-1 px-4 py-3 border border-slate-300 text-slate-700 rounded-lg font-medium hover:bg-slate-50 transition-all"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  Contact Vendor
                </button>
                <button
                  onClick={() => setShowDetailModal(false)}
                  className="px-4 py-3 border border-slate-300 text-slate-700 rounded-lg font-medium hover:bg-slate-50 transition-all"
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

// Placeholder for CheckCircle icon (add to imports if needed)
function CheckCircle({ size, className }: { size: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className={className}
    >
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}
