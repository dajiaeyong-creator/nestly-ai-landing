/*
 * Financial Ledger Page – Unified Payment & Expense Tracking
 * Display all financial transactions including rent payments, vendor expenses, and property costs
 */

import { motion } from "framer-motion";
import {
  Search,
  Calendar,
  Filter,
  ChevronRight,
  Download,
  CheckCircle,
  Clock,
  AlertCircle,
  DollarSign,
  Zap,
  Building2,
  Wrench,
} from "lucide-react";
import { useState, useMemo } from "react";
import { toast } from "sonner";

interface FinancialTransaction {
  id: number;
  transactionType: "Rent Payment" | "Vendor Expense" | "Late Fee" | "Security Deposit" | "Refund";
  aiCategory: "Rent Payment" | "Maintenance Expense" | "Utility Expense" | "Vendor Payment" | "Security Deposit" | "Late Fee" | "Refund";
  property: string;
  amount: number;
  date: string;
  status: "paid" | "pending" | "overdue";
  autoMatched: boolean;
  needsReview: boolean;
  
  // Rent payment fields
  tenantName?: string;
  unit?: string;
  paymentMethod?: "Bank Transfer" | "Credit Card" | "Check" | "ACH";
  dueDate?: string;
  
  // Vendor expense fields
  vendorName?: string;
  serviceType?: string;
  maintenanceRequest?: string;
}

const transactionsData: FinancialTransaction[] = [
  {
    id: 1,
    transactionType: "Rent Payment",
    aiCategory: "Rent Payment",
    property: "Downtown Apartments",
    tenantName: "John Smith",
    unit: "101",
    amount: 1850,
    date: "2026-03-01",
    paymentMethod: "Bank Transfer",
    status: "paid",
    dueDate: "2026-03-01",
    autoMatched: true,
    needsReview: false,
  },
  {
    id: 2,
    transactionType: "Rent Payment",
    aiCategory: "Rent Payment",
    property: "Downtown Apartments",
    tenantName: "Sarah Johnson",
    unit: "202",
    amount: 1950,
    date: "2026-02-28",
    paymentMethod: "ACH",
    status: "paid",
    dueDate: "2026-03-01",
    autoMatched: true,
    needsReview: false,
  },
  {
    id: 3,
    transactionType: "Vendor Expense",
    aiCategory: "Maintenance Expense",
    property: "Lakeside Villas",
    vendorName: "ProFix Plumbing",
    serviceType: "Emergency Pipe Repair",
    maintenanceRequest: "MR-2026-001",
    amount: 450,
    date: "2026-03-02",
    status: "paid",
    autoMatched: true,
    needsReview: false,
  },
  {
    id: 4,
    transactionType: "Vendor Expense",
    aiCategory: "Utility Expense",
    property: "Sunset Plaza",
    vendorName: "City Water & Sewer",
    serviceType: "Monthly Water Bill",
    amount: 320,
    date: "2026-03-01",
    status: "pending",
    autoMatched: false,
    needsReview: true,
  },
  {
    id: 5,
    transactionType: "Rent Payment",
    aiCategory: "Rent Payment",
    property: "Lakeside Villas",
    tenantName: "Michael Chen",
    unit: "305",
    amount: 2200,
    date: "2026-03-05",
    paymentMethod: "Bank Transfer",
    status: "pending",
    dueDate: "2026-03-01",
    autoMatched: false,
    needsReview: true,
  },
  {
    id: 6,
    transactionType: "Late Fee",
    aiCategory: "Late Fee",
    property: "Sunset Plaza",
    tenantName: "Emily Davis",
    unit: "401",
    amount: 100,
    date: "2026-02-15",
    status: "overdue",
    autoMatched: false,
    needsReview: true,
  },
  {
    id: 7,
    transactionType: "Vendor Expense",
    aiCategory: "Maintenance Expense",
    property: "Downtown Apartments",
    vendorName: "ABC Cleaning Services",
    serviceType: "Common Area Cleaning",
    maintenanceRequest: "MR-2026-002",
    amount: 250,
    date: "2026-03-03",
    status: "paid",
    autoMatched: true,
    needsReview: false,
  },
  {
    id: 8,
    transactionType: "Security Deposit",
    aiCategory: "Security Deposit",
    property: "Downtown Apartments",
    tenantName: "Jennifer Taylor",
    unit: "204",
    amount: 1950,
    date: "2026-01-15",
    status: "paid",
    autoMatched: true,
    needsReview: false,
  },
];

function TransactionStatusBadge({ status }: { status: "paid" | "pending" | "overdue" }) {
  const statusConfig = {
    paid: { bg: "bg-green-50", text: "text-green-700", icon: CheckCircle },
    pending: { bg: "bg-blue-50", text: "text-blue-700", icon: Clock },
    overdue: { bg: "bg-red-50", text: "text-red-700", icon: AlertCircle },
  };

  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${config.bg} ${config.text} text-sm font-medium`}>
      <Icon size={14} />
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}

export default function FinancialLedger() {
  const [searchTerm, setSearchTerm] = useState("");
  const [transactionTypeFilter, setTransactionTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState<"all" | "paid" | "pending" | "overdue">("all");
  const [propertyFilter, setPropertyFilter] = useState("all");
  const [vendorFilter, setVendorFilter] = useState("all");
  const [selectedTransaction, setSelectedTransaction] = useState<FinancialTransaction | null>(null);

  const filteredTransactions = useMemo(() => {
    return transactionsData.filter((transaction) => {
      const matchesSearch =
        (transaction.tenantName?.toLowerCase().includes(searchTerm.toLowerCase()) || false) ||
        (transaction.vendorName?.toLowerCase().includes(searchTerm.toLowerCase()) || false) ||
        transaction.property.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (transaction.unit?.toLowerCase().includes(searchTerm.toLowerCase()) || false);

      const matchesTransactionType = transactionTypeFilter === "all" || transaction.transactionType === transactionTypeFilter;
      const matchesStatus = statusFilter === "all" || transaction.status === statusFilter;
      const matchesProperty = propertyFilter === "all" || transaction.property === propertyFilter;
      const matchesVendor = vendorFilter === "all" || (transaction.vendorName === vendorFilter);

      return matchesSearch && matchesTransactionType && matchesStatus && matchesProperty && matchesVendor;
    });
  }, [searchTerm, transactionTypeFilter, statusFilter, propertyFilter, vendorFilter]);

  const properties = Array.from(new Set(transactionsData.map((t) => t.property)));
  const vendors = Array.from(new Set(transactionsData.filter((t) => t.vendorName).map((t) => t.vendorName || "")));

  const totalAmount = filteredTransactions.reduce((sum, t) => sum + t.amount, 0);
  const rentPayments = filteredTransactions.filter((t) => t.transactionType === "Rent Payment").reduce((sum, t) => sum + t.amount, 0);
  const expenses = filteredTransactions.filter((t) => t.transactionType === "Vendor Expense").reduce((sum, t) => sum + t.amount, 0);
  const paidCount = filteredTransactions.filter((t) => t.status === "paid").length;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Top Navigation */}
      <div className="border-b border-slate-200 bg-white sticky top-0 z-20 shadow-sm">
        <div className="px-6 py-4">
          <h1 className="text-2xl font-bold text-slate-900" style={{ fontFamily: "var(--font-display)" }}>
            Financial Ledger
          </h1>
          <p className="text-sm text-slate-600 mt-1" style={{ fontFamily: "var(--font-body)" }}>
            Unified view of rent payments, vendor expenses, and property costs
          </p>
        </div>
      </div>

      {/* AI Transaction Processing Section */}
      <div className="px-6 py-8 border-b border-slate-200 bg-gradient-to-r from-[#3ECF8E]/5 to-[#2FBF9B]/5">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
          <h2 className="text-lg font-bold text-slate-900 mb-2" style={{ fontFamily: "var(--font-display)" }}>
            AI Transaction Processing
          </h2>
          <p className="text-sm text-slate-600" style={{ fontFamily: "var(--font-body)" }}>
            Nestly automatically matches rent payments and categorizes expenses. Imported transactions are flagged for AI-assisted reconciliation.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-lg p-4 border border-slate-200 shadow-sm"
          >
            <p className="text-xs text-slate-500 uppercase tracking-wide" style={{ fontFamily: "var(--font-body)" }}>
              Total Amount
            </p>
            <p className="text-3xl font-bold text-[#3ECF8E] mt-2" style={{ fontFamily: "var(--font-display)" }}>
              ${totalAmount.toLocaleString()}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-lg p-4 border border-slate-200 shadow-sm"
          >
            <p className="text-xs text-slate-500 uppercase tracking-wide" style={{ fontFamily: "var(--font-body)" }}>
              Rent Payments
            </p>
            <p className="text-3xl font-bold text-green-600 mt-2" style={{ fontFamily: "var(--font-display)" }}>
              ${rentPayments.toLocaleString()}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-lg p-4 border border-slate-200 shadow-sm"
          >
            <p className="text-xs text-slate-500 uppercase tracking-wide" style={{ fontFamily: "var(--font-body)" }}>
              Expenses
            </p>
            <p className="text-3xl font-bold text-orange-600 mt-2" style={{ fontFamily: "var(--font-display)" }}>
              ${expenses.toLocaleString()}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-lg p-4 border border-slate-200 shadow-sm"
          >
            <p className="text-xs text-slate-500 uppercase tracking-wide" style={{ fontFamily: "var(--font-body)" }}>
              Completed
            </p>
            <p className="text-3xl font-bold text-blue-600 mt-2" style={{ fontFamily: "var(--font-display)" }}>
              {paidCount}
            </p>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-6 py-8">
        {/* Needs Review Panel */}
        {filteredTransactions.some((t) => t.needsReview) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8"
          >
            <h3 className="text-lg font-bold text-yellow-900 mb-4" style={{ fontFamily: "var(--font-display)" }}>
              Transactions Needing Review
            </h3>
            <div className="space-y-3">
              {filteredTransactions
                .filter((t) => t.needsReview)
                .map((transaction) => (
                  <div
                    key={transaction.id}
                    className="flex items-center justify-between bg-white p-4 rounded-lg border border-yellow-100"
                  >
                    <div>
                      <p className="font-medium text-slate-900" style={{ fontFamily: "var(--font-body)" }}>
                        {transaction.transactionType === "Rent Payment" ? transaction.tenantName : transaction.vendorName} - {transaction.property}
                      </p>
                      <p className="text-sm text-slate-600" style={{ fontFamily: "var(--font-body)" }}>
                        ${transaction.amount} • {transaction.transactionType}
                      </p>
                    </div>
                    <button
                      onClick={() => toast.success("Transaction confirmed")}
                      className="px-3 py-1 rounded-lg bg-yellow-100 text-yellow-700 font-medium text-sm hover:bg-yellow-200 transition-all"
                      style={{ fontFamily: "var(--font-body)" }}
                    >
                      Confirm
                    </button>
                  </div>
                ))}
            </div>
          </motion.div>
        )}

        {/* Filters */}
        <div className="bg-white rounded-lg p-6 border border-slate-200 shadow-sm mb-8">
          <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2" style={{ fontFamily: "var(--font-body)" }}>
                Search
              </label>
              <div className="relative">
                <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Tenant, vendor, property..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#3ECF8E] focus:border-transparent outline-none"
                  style={{ fontFamily: "var(--font-body)" }}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2" style={{ fontFamily: "var(--font-body)" }}>
                Type
              </label>
              <select
                value={transactionTypeFilter}
                onChange={(e) => setTransactionTypeFilter(e.target.value)}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#3ECF8E] focus:border-transparent outline-none"
                style={{ fontFamily: "var(--font-body)" }}
              >
                <option value="all">All Types</option>
                <option value="Rent Payment">Rent Payment</option>
                <option value="Vendor Expense">Vendor Expense</option>
                <option value="Late Fee">Late Fee</option>
                <option value="Security Deposit">Security Deposit</option>
                <option value="Refund">Refund</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2" style={{ fontFamily: "var(--font-body)" }}>
                Property
              </label>
              <select
                value={propertyFilter}
                onChange={(e) => setPropertyFilter(e.target.value)}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#3ECF8E] focus:border-transparent outline-none"
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

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2" style={{ fontFamily: "var(--font-body)" }}>
                Vendor
              </label>
              <select
                value={vendorFilter}
                onChange={(e) => setVendorFilter(e.target.value)}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#3ECF8E] focus:border-transparent outline-none"
                style={{ fontFamily: "var(--font-body)" }}
              >
                <option value="all">All Vendors</option>
                {vendors.map((vendor) => (
                  <option key={vendor} value={vendor}>
                    {vendor}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2" style={{ fontFamily: "var(--font-body)" }}>
                Status
              </label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as any)}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#3ECF8E] focus:border-transparent outline-none"
                style={{ fontFamily: "var(--font-body)" }}
              >
                <option value="all">All Status</option>
                <option value="paid">Paid</option>
                <option value="pending">Pending</option>
                <option value="overdue">Overdue</option>
              </select>
            </div>

            <div className="flex items-end">
              <button
                onClick={() => toast.success("Exporting transactions...")}
                className="w-full px-4 py-2 bg-[#3ECF8E] text-white rounded-lg font-medium hover:bg-[#2FBF9B] transition-all flex items-center justify-center gap-2"
                style={{ fontFamily: "var(--font-body)" }}
              >
                <Download size={18} />
                Export
              </button>
            </div>
          </div>
        </div>

        {/* Transactions Table */}
        {filteredTransactions.length > 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden"
          >
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50">
                  <th
                    className="text-left px-6 py-4 text-xs font-semibold text-slate-600 uppercase tracking-wide"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    Transaction Type
                  </th>
                  <th
                    className="text-left px-6 py-4 text-xs font-semibold text-slate-600 uppercase tracking-wide"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    Description
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
                    Amount
                  </th>
                  <th
                    className="text-left px-6 py-4 text-xs font-semibold text-slate-600 uppercase tracking-wide"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    AI Category
                  </th>
                  <th
                    className="text-left px-6 py-4 text-xs font-semibold text-slate-600 uppercase tracking-wide"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    Date
                  </th>
                  <th
                    className="text-left px-6 py-4 text-xs font-semibold text-slate-600 uppercase tracking-wide"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredTransactions.map((transaction, index) => (
                  <motion.tr
                    key={transaction.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => setSelectedTransaction(transaction)}
                    className="border-b border-slate-200 hover:bg-slate-50 cursor-pointer transition-colors"
                  >
                    <td
                      className="px-6 py-4 text-sm font-medium text-slate-900"
                      style={{ fontFamily: "var(--font-body)" }}
                    >
                      <div className="flex items-center gap-2">
                        {transaction.transactionType === "Vendor Expense" ? (
                          <Wrench size={16} className="text-orange-600" />
                        ) : (
                          <Building2 size={16} className="text-green-600" />
                        )}
                        {transaction.transactionType}
                      </div>
                    </td>
                    <td
                      className="px-6 py-4 text-sm text-slate-600"
                      style={{ fontFamily: "var(--font-body)" }}
                    >
                      {transaction.transactionType === "Rent Payment"
                        ? `${transaction.tenantName} - Unit ${transaction.unit}`
                        : transaction.vendorName}
                    </td>
                    <td
                      className="px-6 py-4 text-sm text-slate-600"
                      style={{ fontFamily: "var(--font-body)" }}
                    >
                      {transaction.property}
                    </td>
                    <td
                      className="px-6 py-4 text-sm font-medium text-slate-900"
                      style={{ fontFamily: "var(--font-body)" }}
                    >
                      ${transaction.amount.toLocaleString()}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {transaction.autoMatched && (
                          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-green-50 text-green-700 text-xs font-medium">
                            <Zap size={12} />
                            Auto
                          </span>
                        )}
                        <span
                          className="text-sm font-medium text-slate-700"
                          style={{ fontFamily: "var(--font-body)" }}
                        >
                          {transaction.aiCategory}
                        </span>
                      </div>
                    </td>
                    <td
                      className="px-6 py-4 text-sm text-slate-600"
                      style={{ fontFamily: "var(--font-body)" }}
                    >
                      {transaction.date}
                    </td>
                    <td className="px-6 py-4">
                      <TransactionStatusBadge status={transaction.status} />
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        ) : (
          <div className="bg-white rounded-lg border border-slate-200 p-12 text-center">
            <AlertCircle size={48} className="mx-auto text-slate-300 mb-4" />
            <p className="text-slate-600" style={{ fontFamily: "var(--font-body)" }}>
              No transactions match your filters
            </p>
          </div>
        )}
      </div>

      {/* Transaction Detail Modal */}
      {selectedTransaction && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setSelectedTransaction(null)}
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-lg max-w-2xl w-full p-8"
          >
            <h2 className="text-2xl font-bold text-slate-900 mb-6" style={{ fontFamily: "var(--font-display)" }}>
              Transaction Details
            </h2>

            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-slate-600 mb-1" style={{ fontFamily: "var(--font-body)" }}>
                    Transaction Type
                  </p>
                  <p className="text-lg font-medium text-slate-900" style={{ fontFamily: "var(--font-body)" }}>
                    {selectedTransaction.transactionType}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-slate-600 mb-1" style={{ fontFamily: "var(--font-body)" }}>
                    Property
                  </p>
                  <p className="text-lg font-medium text-slate-900" style={{ fontFamily: "var(--font-body)" }}>
                    {selectedTransaction.property}
                  </p>
                </div>

                {selectedTransaction.transactionType === "Rent Payment" && (
                  <>
                    <div>
                      <p className="text-sm text-slate-600 mb-1" style={{ fontFamily: "var(--font-body)" }}>
                        Tenant Name
                      </p>
                      <p className="text-lg font-medium text-slate-900" style={{ fontFamily: "var(--font-body)" }}>
                        {selectedTransaction.tenantName}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-600 mb-1" style={{ fontFamily: "var(--font-body)" }}>
                        Unit
                      </p>
                      <p className="text-lg font-medium text-slate-900" style={{ fontFamily: "var(--font-body)" }}>
                        {selectedTransaction.unit}
                      </p>
                    </div>
                  </>
                )}

                {selectedTransaction.transactionType === "Vendor Expense" && (
                  <>
                    <div>
                      <p className="text-sm text-slate-600 mb-1" style={{ fontFamily: "var(--font-body)" }}>
                        Vendor Name
                      </p>
                      <p className="text-lg font-medium text-slate-900" style={{ fontFamily: "var(--font-body)" }}>
                        {selectedTransaction.vendorName}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-600 mb-1" style={{ fontFamily: "var(--font-body)" }}>
                        Service Type
                      </p>
                      <p className="text-lg font-medium text-slate-900" style={{ fontFamily: "var(--font-body)" }}>
                        {selectedTransaction.serviceType}
                      </p>
                    </div>
                    {selectedTransaction.maintenanceRequest && (
                      <div>
                        <p className="text-sm text-slate-600 mb-1" style={{ fontFamily: "var(--font-body)" }}>
                          Maintenance Request
                        </p>
                        <p className="text-lg font-medium text-slate-900" style={{ fontFamily: "var(--font-body)" }}>
                          {selectedTransaction.maintenanceRequest}
                        </p>
                      </div>
                    )}
                  </>
                )}

                <div>
                  <p className="text-sm text-slate-600 mb-1" style={{ fontFamily: "var(--font-body)" }}>
                    Amount
                  </p>
                  <p className="text-lg font-medium text-slate-900" style={{ fontFamily: "var(--font-body)" }}>
                    ${selectedTransaction.amount.toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-slate-600 mb-1" style={{ fontFamily: "var(--font-body)" }}>
                    Date
                  </p>
                  <p className="text-lg font-medium text-slate-900" style={{ fontFamily: "var(--font-body)" }}>
                    {selectedTransaction.date}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-slate-600 mb-1" style={{ fontFamily: "var(--font-body)" }}>
                    AI Category
                  </p>
                  <p className="text-lg font-medium text-slate-900" style={{ fontFamily: "var(--font-body)" }}>
                    {selectedTransaction.aiCategory}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-slate-600 mb-1" style={{ fontFamily: "var(--font-body)" }}>
                    Status
                  </p>
                  <TransactionStatusBadge status={selectedTransaction.status} />
                </div>
              </div>

              <div className="flex gap-4 pt-6 border-t border-slate-200 flex-wrap">
                {selectedTransaction.transactionType === "Rent Payment" && selectedTransaction.status === "paid" && (
                  <>
                    <button
                      onClick={() => {
                        toast.success("Receipt downloaded");
                        setSelectedTransaction(null);
                      }}
                      className="flex-1 px-4 py-2 bg-[#3ECF8E] text-white rounded-lg font-medium hover:bg-[#2FBF9B] transition-all"
                      style={{ fontFamily: "var(--font-body)" }}
                    >
                      Download Receipt
                    </button>
                    <button
                      onClick={() => {
                        toast.success("Receipt sent to tenant");
                        setSelectedTransaction(null);
                      }}
                      className="flex-1 px-4 py-2 border border-slate-300 text-slate-700 rounded-lg font-medium hover:bg-slate-50 transition-all"
                      style={{ fontFamily: "var(--font-body)" }}
                    >
                      Send Receipt
                    </button>
                  </>
                )}
                {selectedTransaction.transactionType === "Vendor Expense" && selectedTransaction.status === "pending" && (
                  <button
                    onClick={() => {
                      toast.success("Expense approved");
                      setSelectedTransaction(null);
                    }}
                    className="flex-1 px-4 py-2 bg-[#3ECF8E] text-white rounded-lg font-medium hover:bg-[#2FBF9B] transition-all"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    Approve & Pay
                  </button>
                )}
                <button
                  onClick={() => setSelectedTransaction(null)}
                  className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg font-medium hover:bg-slate-50 transition-all"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
