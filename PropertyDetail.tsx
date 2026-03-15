/*
 * Property Detail Page – Individual Property Management
 * Display property info, units, tenants, payments, maintenance, documents
 */

import { motion } from "framer-motion";
import {
  ArrowLeft,
  Home,
  Users,
  DollarSign,
  TrendingUp,
  FileText,
  Wrench,
  CreditCard,
  MapPin,
  Bell,
  Settings,
} from "lucide-react";
import { useState } from "react";
import { useLocation } from "wouter";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { toast } from "sonner";

interface Unit {
  id: number;
  unitNumber: string;
  tenant: string;
  rentAmount: number;
  status: "occupied" | "vacant";
  leaseEndDate: string;
}

interface Tenant {
  id: number;
  name: string;
  unit: string;
  rentAmount: number;
  paymentStatus: "paid" | "pending" | "overdue";
  leaseStartDate: string;
  leaseEndDate: string;
}

// Sample data
const propertyData = {
  id: 1,
  name: "Downtown Apartments",
  address: "123 Main St, New York, NY 10001",
  units: 24,
  occupancyRate: 95,
  monthlyRevenue: 45000,
  type: "multifamily",
  yearBuilt: 2010,
  totalArea: 45000,
};

const revenueData = [
  { month: "Jan", revenue: 42500 },
  { month: "Feb", revenue: 43200 },
  { month: "Mar", revenue: 44100 },
  { month: "Apr", revenue: 43800 },
  { month: "May", revenue: 45200 },
  { month: "Jun", revenue: 45500 },
  { month: "Jul", revenue: 45200 },
  { month: "Aug", revenue: 45100 },
  { month: "Sep", revenue: 45500 },
  { month: "Oct", revenue: 45300 },
  { month: "Nov", revenue: 45200 },
  { month: "Dec", revenue: 45000 },
];

const occupancyData = [
  { month: "Jan", rate: 92 },
  { month: "Feb", rate: 93 },
  { month: "Mar", rate: 94 },
  { month: "Apr", rate: 93 },
  { month: "May", rate: 95 },
  { month: "Jun", rate: 95 },
  { month: "Jul", rate: 95 },
  { month: "Aug", rate: 94 },
  { month: "Sep", rate: 95 },
  { month: "Oct", rate: 95 },
  { month: "Nov", rate: 95 },
  { month: "Dec", rate: 95 },
];

const units: Unit[] = [
  {
    id: 1,
    unitNumber: "101",
    tenant: "John Smith",
    rentAmount: 1850,
    status: "occupied",
    leaseEndDate: "2025-12-31",
  },
  {
    id: 2,
    unitNumber: "102",
    tenant: "Sarah Johnson",
    rentAmount: 1950,
    status: "occupied",
    leaseEndDate: "2026-06-30",
  },
  {
    id: 3,
    unitNumber: "103",
    tenant: "Vacant",
    rentAmount: 1900,
    status: "vacant",
    leaseEndDate: "N/A",
  },
  {
    id: 4,
    unitNumber: "104",
    tenant: "Michael Chen",
    rentAmount: 2050,
    status: "occupied",
    leaseEndDate: "2025-09-30",
  },
  {
    id: 5,
    unitNumber: "105",
    tenant: "Emily Davis",
    rentAmount: 1850,
    status: "occupied",
    leaseEndDate: "2026-03-31",
  },
  {
    id: 6,
    unitNumber: "106",
    tenant: "Robert Wilson",
    rentAmount: 2100,
    status: "occupied",
    leaseEndDate: "2025-11-30",
  },
];

const tenants: Tenant[] = [
  {
    id: 1,
    name: "John Smith",
    unit: "101",
    rentAmount: 1850,
    paymentStatus: "paid",
    leaseStartDate: "2023-01-01",
    leaseEndDate: "2025-12-31",
  },
  {
    id: 2,
    name: "Sarah Johnson",
    unit: "102",
    rentAmount: 1950,
    paymentStatus: "paid",
    leaseStartDate: "2023-07-01",
    leaseEndDate: "2026-06-30",
  },
  {
    id: 3,
    name: "Michael Chen",
    unit: "104",
    rentAmount: 2050,
    paymentStatus: "pending",
    leaseStartDate: "2023-03-15",
    leaseEndDate: "2025-09-30",
  },
  {
    id: 4,
    name: "Emily Davis",
    unit: "105",
    rentAmount: 1850,
    paymentStatus: "paid",
    leaseStartDate: "2023-09-01",
    leaseEndDate: "2026-03-31",
  },
  {
    id: 5,
    name: "Robert Wilson",
    unit: "106",
    rentAmount: 2100,
    paymentStatus: "paid",
    leaseStartDate: "2022-11-15",
    leaseEndDate: "2025-11-30",
  },
];

const StatCard = ({
  label,
  value,
  icon: Icon,
  trend,
}: {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: string;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
    className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all"
  >
    <div className="flex items-start justify-between">
      <div>
        <p className="text-sm text-slate-600 mb-2" style={{ fontFamily: "var(--font-body)" }}>
          {label}
        </p>
        <h3 className="text-2xl font-bold text-slate-900" style={{ fontFamily: "var(--font-display)" }}>
          {value}
        </h3>
        {trend && (
          <p className="text-xs text-[#3ECF8E] mt-2 font-medium" style={{ fontFamily: "var(--font-body)" }}>
            {trend}
          </p>
        )}
      </div>
      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#3ECF8E] to-[#2FBF9B] flex items-center justify-center text-white">
        {Icon}
      </div>
    </div>
  </motion.div>
);

const ChartCard = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
    className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm"
  >
    <h3 className="text-lg font-semibold text-slate-900 mb-6" style={{ fontFamily: "var(--font-display)" }}>
      {title}
    </h3>
    {children}
  </motion.div>
);

export default function PropertyDetail() {
  const [, setLocation] = useLocation();
  const [activeTab, setActiveTab] = useState("units");

  const tabs = [
    { id: "units", label: "Units", icon: Home },
    { id: "tenants", label: "Tenants", icon: Users },
    { id: "payments", label: "Payments", icon: CreditCard },
    { id: "maintenance", label: "Maintenance", icon: Wrench },
    { id: "documents", label: "Documents", icon: FileText },
  ];

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
                {propertyData.name}
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
        {/* Property Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm mb-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h2 className="text-lg font-semibold text-slate-900 mb-4" style={{ fontFamily: "var(--font-display)" }}>
                Property Summary
              </h2>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <MapPin size={18} className="text-[#3ECF8E]" />
                  <p className="text-slate-700" style={{ fontFamily: "var(--font-body)" }}>
                    {propertyData.address}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Home size={18} className="text-[#3ECF8E]" />
                  <p className="text-slate-700" style={{ fontFamily: "var(--font-body)" }}>
                    {propertyData.units} Total Units
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp size={18} className="text-[#3ECF8E]" />
                  <p className="text-slate-700" style={{ fontFamily: "var(--font-body)" }}>
                    Built: {propertyData.yearBuilt}
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <StatCard
                label="Occupancy Rate"
                value={`${propertyData.occupancyRate}%`}
                icon={<Users size={24} />}
              />
              <StatCard
                label="Monthly Revenue"
                value={`$${(propertyData.monthlyRevenue / 1000).toFixed(0)}k`}
                icon={<DollarSign size={24} />}
              />
            </div>
          </div>
        </motion.div>

        {/* Analytics Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <ChartCard title="Monthly Revenue Trend">
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3ECF8E" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#3ECF8E" stopOpacity={0.1} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="month" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#ffffff",
                    border: "1px solid #e2e8f0",
                    borderRadius: "8px",
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#3ECF8E"
                  fillOpacity={1}
                  fill="url(#colorRevenue)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard title="Occupancy Rate Trend">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={occupancyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="month" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" domain={[0, 100]} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#ffffff",
                    border: "1px solid #e2e8f0",
                    borderRadius: "8px",
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="rate"
                  stroke="#2FBF9B"
                  strokeWidth={2}
                  dot={{ fill: "#2FBF9B", r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>

        {/* Navigation Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden"
        >
          {/* Tab Navigation */}
          <div className="flex border-b border-slate-200 overflow-x-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-4 font-medium transition-all whitespace-nowrap ${
                    isActive
                      ? "text-[#3ECF8E] border-b-2 border-[#3ECF8E]"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  <Icon size={18} />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {/* Units Tab */}
            {activeTab === "units" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-lg font-semibold text-slate-900 mb-4" style={{ fontFamily: "var(--font-display)" }}>
                  Units List
                </h3>
                <div className="space-y-3">
                  {units.map((unit) => (
                    <div
                      key={unit.id}
                      className="flex items-center justify-between p-4 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors"
                    >
                      <div className="flex-1">
                        <p className="font-semibold text-slate-900" style={{ fontFamily: "var(--font-display)" }}>
                          Unit {unit.unitNumber}
                        </p>
                        <p className="text-sm text-slate-600" style={{ fontFamily: "var(--font-body)" }}>
                          {unit.status === "occupied" ? unit.tenant : "Vacant"}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-slate-900" style={{ fontFamily: "var(--font-display)" }}>
                          ${unit.rentAmount}
                        </p>
                        <span
                          className={`text-xs font-medium px-2 py-1 rounded-full ${
                            unit.status === "occupied"
                              ? "bg-[#3ECF8E]/10 text-[#3ECF8E]"
                              : "bg-slate-100 text-slate-600"
                          }`}
                          style={{ fontFamily: "var(--font-body)" }}
                        >
                          {unit.status === "occupied" ? "Occupied" : "Vacant"}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Tenants Tab */}
            {activeTab === "tenants" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-lg font-semibold text-slate-900 mb-4" style={{ fontFamily: "var(--font-display)" }}>
                  Tenants List
                </h3>
                <div className="space-y-3">
                  {tenants.map((tenant) => (
                    <div
                      key={tenant.id}
                      className="flex items-center justify-between p-4 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors"
                    >
                      <div className="flex-1">
                        <p className="font-semibold text-slate-900" style={{ fontFamily: "var(--font-display)" }}>
                          {tenant.name}
                        </p>
                        <p className="text-sm text-slate-600" style={{ fontFamily: "var(--font-body)" }}>
                          Unit {tenant.unit} • Lease ends {tenant.leaseEndDate}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-slate-900" style={{ fontFamily: "var(--font-display)" }}>
                          ${tenant.rentAmount}
                        </p>
                        <span
                          className={`text-xs font-medium px-2 py-1 rounded-full ${
                            tenant.paymentStatus === "paid"
                              ? "bg-[#3ECF8E]/10 text-[#3ECF8E]"
                              : tenant.paymentStatus === "pending"
                              ? "bg-[#FFA500]/10 text-[#FFA500]"
                              : "bg-[#EF4444]/10 text-[#EF4444]"
                          }`}
                          style={{ fontFamily: "var(--font-body)" }}
                        >
                          {tenant.paymentStatus.charAt(0).toUpperCase() + tenant.paymentStatus.slice(1)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Payments, Maintenance, Documents Tabs */}
            {["payments", "maintenance", "documents"].includes(activeTab) && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="text-center py-12"
              >
                <p className="text-slate-600" style={{ fontFamily: "var(--font-body)" }}>
                  {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} content coming soon
                </p>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
