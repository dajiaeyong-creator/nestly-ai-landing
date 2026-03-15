/*
 * Bank Connection Page
 * Secure payment processing setup and bank account management
 */

import { motion } from "framer-motion";
import { CreditCard, Lock, CheckCircle, AlertCircle, Clock, Plus, Edit2, Trash2, Eye, EyeOff, ToggleRight, RefreshCw } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

interface BankAccount {
  id: string;
  accountName: string;
  accountType: "checking" | "savings";
  lastFour: string;
  routingNumber: string;
  status: "connected" | "pending" | "action_required";
  verificationDate?: string;
  isPrimary: boolean;
}

interface PayoutSetting {
  id: string;
  name: string;
  enabled: boolean;
  schedule: "daily" | "weekly" | "bi-weekly" | "monthly";
  requiresApproval: boolean;
  nextPayout: string;
}

const mockBankAccounts: BankAccount[] = [
  {
    id: "1",
    accountName: "Primary Business Account",
    accountType: "checking",
    lastFour: "4829",
    routingNumber: "021000021",
    status: "connected",
    verificationDate: "2026-02-15",
    isPrimary: true,
  },
  {
    id: "2",
    accountName: "Vendor Payout Account",
    accountType: "checking",
    lastFour: "5847",
    routingNumber: "021000021",
    status: "pending",
    isPrimary: false,
  },
];

const mockPayoutSettings: PayoutSetting[] = [
  {
    id: "1",
    name: "Rent Collection Deposits",
    enabled: true,
    schedule: "daily",
    requiresApproval: false,
    nextPayout: "2026-03-08 at 2:00 PM",
  },
  {
    id: "2",
    name: "Vendor Payouts",
    enabled: true,
    schedule: "weekly",
    requiresApproval: true,
    nextPayout: "2026-03-14 at 9:00 AM",
  },
  {
    id: "3",
    name: "Expense Reimbursements",
    enabled: false,
    schedule: "bi-weekly",
    requiresApproval: true,
    nextPayout: "Not scheduled",
  },
];

export default function BankConnection() {
  const [bankAccounts, setBankAccounts] = useState<BankAccount[]>(mockBankAccounts);
  const [payoutSettings, setPayoutSettings] = useState<PayoutSetting[]>(mockPayoutSettings);
  const [showConnectModal, setShowConnectModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState<BankAccount | null>(null);
  const [showAccountDetails, setShowAccountDetails] = useState<string | null>(null);
  const [newAccountForm, setNewAccountForm] = useState<{
    accountName: string;
    accountType: "checking" | "savings";
    accountNumber: string;
    routingNumber: string;
  }>({
    accountName: "",
    accountType: "checking",
    accountNumber: "",
    routingNumber: "",
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "connected":
        return "bg-green-100 text-green-800 border-green-300";
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-300";
      case "action_required":
        return "bg-red-100 text-red-800 border-red-300";
      default:
        return "bg-slate-100 text-slate-800 border-slate-300";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "connected":
        return <CheckCircle size={16} />;
      case "pending":
        return <Clock size={16} />;
      case "action_required":
        return <AlertCircle size={16} />;
      default:
        return null;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "connected":
        return "Connected";
      case "pending":
        return "Pending Verification";
      case "action_required":
        return "Action Required";
      default:
        return "Unknown";
    }
  };

  const handleAddAccount = () => {
    if (!newAccountForm.accountName || !newAccountForm.accountNumber || !newAccountForm.routingNumber) {
      toast.error("Please fill in all fields");
      return;
    }

    const newAccount: BankAccount = {
      id: Date.now().toString(),
      accountName: newAccountForm.accountName,
      accountType: newAccountForm.accountType,
      lastFour: newAccountForm.accountNumber.slice(-4),
      routingNumber: newAccountForm.routingNumber,
      status: "pending",
      isPrimary: false,
    };

    setBankAccounts([...bankAccounts, newAccount]);
    setNewAccountForm({ accountName: "", accountType: "checking", accountNumber: "", routingNumber: "" });
    setShowConnectModal(false);
    toast.success("Bank account added. Verification in progress...");
  };

  const handleDeleteAccount = (id: string) => {
    const account = bankAccounts.find(a => a.id === id);
    if (account?.isPrimary) {
      toast.error("Cannot delete primary account");
      return;
    }
    setBankAccounts(bankAccounts.filter(a => a.id !== id));
    toast.success("Bank account removed");
  };

  const handleSetPrimary = (id: string) => {
    setBankAccounts(
      bankAccounts.map(a => ({
        ...a,
        isPrimary: a.id === id,
      }))
    );
    toast.success("Primary account updated");
  };

  const togglePayoutSetting = (id: string) => {
    setPayoutSettings(
      payoutSettings.map(p => (p.id === id ? { ...p, enabled: !p.enabled } : p))
    );
    toast.success("Payout setting updated");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-slate-50 to-blue-50">
      {/* Header */}
      <div className="sticky top-0 z-20 border-b border-slate-100 bg-white/80 backdrop-blur-md shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-gradient-to-br from-emerald-500 to-emerald-600">
              <CreditCard size={20} className="text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900" style={{ fontFamily: "var(--font-display)" }}>
                Bank Connection
              </h1>
              <p className="text-sm text-slate-500">Manage payment processing and bank accounts</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="space-y-8">
          {/* Primary Bank Account Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="rounded-2xl p-6 bg-white border border-slate-200 shadow-sm"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-emerald-100">
                  <Lock size={20} className="text-emerald-600" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-slate-900">Primary Bank Account</h2>
                  <p className="text-sm text-slate-500">Your main payout destination</p>
                </div>
              </div>
              <Button
                onClick={() => setShowConnectModal(true)}
                className="bg-emerald-500 hover:bg-emerald-600 text-white"
              >
                <Plus size={16} className="mr-2" /> Add Account
              </Button>
            </div>

            {/* Bank Accounts List */}
            <div className="space-y-3">
              {bankAccounts.map((account) => (
                <motion.div
                  key={account.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    account.isPrimary
                      ? "bg-emerald-50 border-emerald-300"
                      : "bg-slate-50 border-slate-200 hover:border-slate-300"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-slate-900">{account.accountName}</h3>
                        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(account.status)}`}>
                          {getStatusIcon(account.status)}
                          {getStatusLabel(account.status)}
                        </span>
                        {account.isPrimary && (
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                            Primary
                          </span>
                        )}
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
                        <div>
                          <p className="text-slate-500">Account Type</p>
                          <p className="font-medium text-slate-900 capitalize">{account.accountType}</p>
                        </div>
                        <div>
                          <p className="text-slate-500">Account Number</p>
                          <p className="font-medium text-slate-900">•••• {account.lastFour}</p>
                        </div>
                        <div>
                          <p className="text-slate-500">Routing Number</p>
                          <p className="font-medium text-slate-900">{account.routingNumber}</p>
                        </div>
                        {account.verificationDate && (
                          <div>
                            <p className="text-slate-500">Verified</p>
                            <p className="font-medium text-slate-900">{account.verificationDate}</p>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-2 ml-4">
                      {!account.isPrimary && (
                        <button
                          onClick={() => handleSetPrimary(account.id)}
                          className="p-2 rounded-lg hover:bg-slate-200 text-slate-600 transition-all"
                          title="Set as primary"
                        >
                          <RefreshCw size={16} />
                        </button>
                      )}
                      <button
                        onClick={() => setShowEditModal(true)}
                        className="p-2 rounded-lg hover:bg-slate-200 text-slate-600 transition-all"
                        title="Edit account"
                      >
                        <Edit2 size={16} />
                      </button>
                      {!account.isPrimary && (
                        <button
                          onClick={() => handleDeleteAccount(account.id)}
                          className="p-2 rounded-lg hover:bg-red-100 text-red-600 transition-all"
                          title="Delete account"
                        >
                          <Trash2 size={16} />
                        </button>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Payment Routing Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="rounded-2xl p-6 bg-white border border-slate-200 shadow-sm"
          >
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-slate-900 mb-2">Payment Routing</h2>
              <p className="text-sm text-slate-500">Configure where payments are routed</p>
            </div>

            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <p className="font-semibold text-slate-900">Rent Payment Routing</p>
                    <p className="text-sm text-slate-500">Tenant rent payments go to Primary Business Account</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-slate-500">Destination</p>
                    <p className="font-medium text-slate-900">Primary Account (•••• 4829)</p>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <p className="font-semibold text-slate-900">Vendor Payout Routing</p>
                    <p className="text-sm text-slate-500">Vendor payments are sent from Primary Business Account</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-slate-500">Source</p>
                    <p className="font-medium text-slate-900">Primary Account (•••• 4829)</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Payout Settings Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="rounded-2xl p-6 bg-white border border-slate-200 shadow-sm"
          >
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-slate-900 mb-2">Payout Settings</h2>
              <p className="text-sm text-slate-500">Configure automatic payout schedules</p>
            </div>

            <div className="space-y-3">
              {payoutSettings.map((setting) => (
                <motion.div
                  key={setting.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  className="p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-slate-300 transition-all"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-slate-900">{setting.name}</h3>
                        {setting.requiresApproval && (
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            Requires Approval
                          </span>
                        )}
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm">
                        <div>
                          <p className="text-slate-500">Schedule</p>
                          <p className="font-medium text-slate-900 capitalize">{setting.schedule}</p>
                        </div>
                        <div>
                          <p className="text-slate-500">Next Payout</p>
                          <p className="font-medium text-slate-900">{setting.nextPayout}</p>
                        </div>
                        <div>
                          <p className="text-slate-500">Status</p>
                          <p className={`font-medium ${setting.enabled ? "text-green-600" : "text-slate-500"}`}>
                            {setting.enabled ? "Active" : "Inactive"}
                          </p>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => togglePayoutSetting(setting.id)}
                      className={`p-2 rounded-lg transition-all ${
                        setting.enabled
                          ? "bg-green-100 text-green-600 hover:bg-green-200"
                          : "bg-slate-200 text-slate-600 hover:bg-slate-300"
                      }`}
                    >
                      <ToggleRight size={20} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Security Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="rounded-2xl p-6 bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-200"
          >
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-blue-200 flex-shrink-0">
                <Lock size={18} className="text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-blue-900 mb-2">Bank Connection Security</h3>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>✓ All bank connections are encrypted with AES-256</li>
                  <li>✓ Account numbers are never stored in full—only last 4 digits displayed</li>
                  <li>✓ Microdeposit verification confirms account ownership</li>
                  <li>✓ Multi-factor authentication required for account changes</li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Connect Bank Modal */}
      {showConnectModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl"
          >
            <h3 className="text-xl font-bold text-slate-900 mb-4">Connect Bank Account</h3>
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Account Name</label>
                <input
                  type="text"
                  placeholder="e.g., Business Checking"
                  value={newAccountForm.accountName}
                  onChange={(e) => setNewAccountForm({ ...newAccountForm, accountName: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Account Type</label>
                <select
                  value={newAccountForm.accountType}
                  onChange={(e) => setNewAccountForm({ ...newAccountForm, accountType: e.target.value === "checking" ? "checking" : "savings" })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="checking">Checking</option>
                  <option value="savings">Savings</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Account Number</label>
                <input
                  type="password"
                  placeholder="••••••••••••••••"
                  value={newAccountForm.accountNumber}
                  onChange={(e) => setNewAccountForm({ ...newAccountForm, accountNumber: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Routing Number</label>
                <input
                  type="text"
                  placeholder="e.g., 021000021"
                  value={newAccountForm.routingNumber}
                  onChange={(e) => setNewAccountForm({ ...newAccountForm, routingNumber: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowConnectModal(false)}
                className="flex-1 px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleAddAccount}
                className="flex-1 px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg transition-all"
              >
                Connect Account
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
