/*
 * Properties Page – Portfolio Property Management
 * Display all properties with search, filter, and detail view
 */

import { motion } from "framer-motion";
import {
  Plus,
  Search,
  Filter,
  Home,
  MapPin,
  Users,
  DollarSign,
  TrendingUp,
  AlertCircle,
  ChevronRight,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface Property {
  id: number;
  name: string;
  address: string;
  units: number;
  occupancyRate: number;
  monthlyRevenue: number;
  status: "performing" | "attention";
  city: string;
  state: string;
  zipCode: string;
  type: "residential" | "commercial" | "multifamily";
}

const properties: Property[] = [
  {
    id: 1,
    name: "Downtown Apartments",
    address: "123 Main St",
    units: 24,
    occupancyRate: 95,
    monthlyRevenue: 45000,
    status: "performing",
    city: "New York",
    state: "NY",
    zipCode: "10001",
    type: "multifamily",
  },
  {
    id: 2,
    name: "Lakeside Villas",
    address: "456 Lake Ave",
    units: 12,
    occupancyRate: 92,
    monthlyRevenue: 52000,
    status: "performing",
    city: "Los Angeles",
    state: "CA",
    zipCode: "90001",
    type: "residential",
  },
  {
    id: 3,
    name: "Midtown Lofts",
    address: "789 Center Blvd",
    units: 18,
    occupancyRate: 78,
    monthlyRevenue: 38000,
    status: "attention",
    city: "Chicago",
    state: "IL",
    zipCode: "60601",
    type: "commercial",
  },
  {
    id: 4,
    name: "Suburban Homes",
    address: "321 Oak Lane",
    units: 8,
    occupancyRate: 88,
    monthlyRevenue: 42000,
    status: "performing",
    city: "Austin",
    state: "TX",
    zipCode: "78701",
    type: "residential",
  },
  {
    id: 5,
    name: "Beachfront Condos",
    address: "654 Ocean Drive",
    units: 32,
    occupancyRate: 98,
    monthlyRevenue: 58000,
    status: "performing",
    city: "Miami",
    state: "FL",
    zipCode: "33101",
    type: "multifamily",
  },
  {
    id: 6,
    name: "Mountain View Resort",
    address: "987 Summit Rd",
    units: 6,
    occupancyRate: 65,
    monthlyRevenue: 28000,
    status: "attention",
    city: "Denver",
    state: "CO",
    zipCode: "80202",
    type: "residential",
  },
];

const PropertyCard = ({ property }: { property: Property }) => {
  const isPerforming = property.status === "performing";
  const statusColor = isPerforming ? "#3ECF8E" : "#EF4444";
  const statusBg = isPerforming ? "#ECFDF5" : "#FEE2E2";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      onClick={() => toast.success(`Opening property: ${property.name}`)}
      className="bg-white rounded-xl p-6 border border-slate-200 hover:shadow-lg hover:border-[#3ECF8E]/30 transition-all cursor-pointer group"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3
            className="text-lg font-semibold text-slate-900 group-hover:text-[#3ECF8E] transition-colors"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {property.name}
          </h3>
          <div className="flex items-center gap-1 text-sm text-slate-600 mt-1">
            <MapPin size={16} className="text-slate-400" />
            <span style={{ fontFamily: "var(--font-body)" }}>
              {property.city}, {property.state}
            </span>
          </div>
        </div>
        <div
          className="px-3 py-1 rounded-full text-xs font-medium"
          style={{
            backgroundColor: statusBg,
            color: statusColor,
            fontFamily: "var(--font-body)",
          }}
        >
          {isPerforming ? "✓ Performing" : "⚠ Attention"}
        </div>
      </div>

      {/* Details Grid */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        {/* Units */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#3ECF8E]/10 flex items-center justify-center">
            <Home size={16} className="text-[#3ECF8E]" />
          </div>
          <div>
            <p className="text-xs text-slate-500" style={{ fontFamily: "var(--font-body)" }}>
              Units
            </p>
            <p className="text-sm font-semibold text-slate-900" style={{ fontFamily: "var(--font-display)" }}>
              {property.units}
            </p>
          </div>
        </div>

        {/* Occupancy */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#2FBF9B]/10 flex items-center justify-center">
            <Users size={16} className="text-[#2FBF9B]" />
          </div>
          <div>
            <p className="text-xs text-slate-500" style={{ fontFamily: "var(--font-body)" }}>
              Occupancy
            </p>
            <p className="text-sm font-semibold text-slate-900" style={{ fontFamily: "var(--font-display)" }}>
              {property.occupancyRate}%
            </p>
          </div>
        </div>

        {/* Revenue */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#3ECF8E]/10 flex items-center justify-center">
            <DollarSign size={16} className="text-[#3ECF8E]" />
          </div>
          <div>
            <p className="text-xs text-slate-500" style={{ fontFamily: "var(--font-body)" }}>
              Monthly Revenue
            </p>
            <p className="text-sm font-semibold text-slate-900" style={{ fontFamily: "var(--font-display)" }}>
              ${(property.monthlyRevenue / 1000).toFixed(0)}k
            </p>
          </div>
        </div>

        {/* Type */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center">
            <TrendingUp size={16} className="text-slate-600" />
          </div>
          <div>
            <p className="text-xs text-slate-500" style={{ fontFamily: "var(--font-body)" }}>
              Type
            </p>
            <p className="text-sm font-semibold text-slate-900 capitalize" style={{ fontFamily: "var(--font-display)" }}>
              {property.type}
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-100">
        <span className="text-xs text-slate-500" style={{ fontFamily: "var(--font-body)" }}>
          {property.address}
        </span>
        <ChevronRight size={18} className="text-slate-400 group-hover:text-[#3ECF8E] transition-colors" />
      </div>
    </motion.div>
  );
};

export default function Properties() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const filteredProperties = properties.filter((prop) => {
    const matchesSearch =
      prop.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prop.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prop.city.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesFilter = filterType === "all" || prop.type === filterType;

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-slate-50 to-white">
      {/* Top Navigation Bar */}
      <div className="border-b border-slate-200 bg-white sticky top-0 z-20 shadow-sm">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <motion.h1
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="text-2xl font-bold text-slate-900"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Properties
            </motion.h1>

            <div className="flex items-center gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => toast.success("Add Property feature coming soon")}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-[#3ECF8E] to-[#2FBF9B] text-white font-medium hover:shadow-lg transition-all"
                style={{ fontFamily: "var(--font-body)" }}
              >
                <Plus size={18} />
                Add Property
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-6 py-8">
        {/* Search and Filter Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm mb-8"
        >
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search
                size={18}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400"
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search properties by name, address, or city..."
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#3ECF8E] focus:border-transparent transition-all"
                style={{ fontFamily: "var(--font-body)" }}
              />
            </div>

            {/* Filter */}
            <div className="relative">
              <Filter size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 pointer-events-none" />
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="pl-10 pr-4 py-2 rounded-lg border border-slate-200 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#3ECF8E] focus:border-transparent transition-all cursor-pointer"
                style={{ fontFamily: "var(--font-body)" }}
              >
                <option value="all">All Types</option>
                <option value="residential">Residential</option>
                <option value="commercial">Commercial</option>
                <option value="multifamily">Multifamily</option>
              </select>
            </div>
          </div>
        </motion.div>

        {/* Results Count */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="mb-6 flex items-center justify-between"
        >
          <p className="text-sm text-slate-600" style={{ fontFamily: "var(--font-body)" }}>
            Showing <span className="font-semibold text-slate-900">{filteredProperties.length}</span> of{" "}
            <span className="font-semibold text-slate-900">{properties.length}</span> properties
          </p>
        </motion.div>

        {/* Properties Grid */}
        {filteredProperties.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredProperties.map((property, index) => (
              <motion.div
                key={property.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <PropertyCard property={property} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <AlertCircle size={48} className="mx-auto text-slate-300 mb-4" />
            <h3
              className="text-lg font-semibold text-slate-900 mb-2"
              style={{ fontFamily: "var(--font-display)" }}
            >
              No properties found
            </h3>
            <p className="text-slate-600" style={{ fontFamily: "var(--font-body)" }}>
              Try adjusting your search or filter criteria
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
