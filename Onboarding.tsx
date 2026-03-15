/*
 * NESTLY AI Onboarding Page – Role-Based Onboarding Flow
 * Customized onboarding experience for each user role
 */

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, Check } from "lucide-react";
import { toast } from "sonner";

interface OnboardingData {
  role: string;
  // Tenant fields
  propertyName: string;
  unitNumber: string;
  invitationCode: string;
  // Property Owner/Manager fields
  numProperties: string;
  unitsManaged: string;
  propertyAddress: string;
  propertyUnits: string;
  tenantEmails: string[];
  tenantEmail: string;
  // Investor fields
  portfolioName: string;
  investedProperties: string;
  investedUnits: string;
  teamMembers: Array<{ email: string; role: string }>;
  teamEmail: string;
  teamRole: string;
  // HOA fields
  communityName: string;
  hoaUnits: string;
  hoaDues: string;
  hoaMembers: Array<{ email: string; role: string }>;
  hoaMemberEmail: string;
  hoaMemberRole: string;
}

const roles = [
  { id: "Property Owner", label: "Property Owner", icon: "🏢" },
  { id: "Property Manager", label: "Property Manager", icon: "👔" },
  { id: "Investor", label: "Investor", icon: "📈" },
  { id: "Tenant", label: "Tenant", icon: "🏠" },
  { id: "HOA Administrator", label: "HOA Administrator", icon: "🏘️" },
];

const investorTeamRoles = ["Property Manager", "Accountant", "Investment Partner"];
const hoaMemberRoles = ["Resident", "Board Member", "Property Manager", "Accountant"];

export default function Onboarding() {
  const [roleSelected, setRoleSelected] = useState(false);
  const [currentStep, setCurrentStep] = useState(0); // 0 = role selection
  const [formData, setFormData] = useState<OnboardingData>({
    role: "",
    propertyName: "",
    unitNumber: "",
    invitationCode: "",
    numProperties: "",
    unitsManaged: "",
    propertyAddress: "",
    propertyUnits: "",
    tenantEmails: [],
    tenantEmail: "",
    portfolioName: "",
    investedProperties: "",
    investedUnits: "",
    teamMembers: [],
    teamEmail: "",
    teamRole: "",
    communityName: "",
    hoaUnits: "",
    hoaDues: "",
    hoaMembers: [],
    hoaMemberEmail: "",
    hoaMemberRole: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleRoleSelect = (selectedRole: string) => {
    setFormData((prev) => ({
      ...prev,
      role: selectedRole,
    }));
    setRoleSelected(true);
    setCurrentStep(1);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Get total steps based on role
  const getTotalSteps = () => {
    switch (formData.role) {
      case "Tenant":
        return 3;
      case "Property Owner":
      case "Property Manager":
        return 5;
      case "Investor":
        return 4;
      case "HOA Administrator":
        return 4;
      default:
        return 1;
    }
  };

  const totalSteps = getTotalSteps();

  const validateStep = (): boolean => {
    const role = formData.role;

    if (role === "Tenant") {
      switch (currentStep) {
        case 1:
          if (!formData.propertyName.trim()) {
            toast.error("Please enter property name or address");
            return false;
          }
          return true;
        case 2:
          if (!formData.unitNumber.trim()) {
            toast.error("Please enter unit number");
            return false;
          }
          return true;
        case 3:
          return true;
        default:
          return true;
      }
    }

    if (role === "Property Owner" || role === "Property Manager") {
      switch (currentStep) {
        case 1:
          if (!formData.numProperties) {
            toast.error("Please select number of properties");
            return false;
          }
          if (!formData.unitsManaged) {
            toast.error("Please select units managed");
            return false;
          }
          return true;
        case 2:
          if (!formData.propertyAddress.trim()) {
            toast.error("Please enter property address");
            return false;
          }
          if (!formData.propertyName.trim()) {
            toast.error("Please enter property name");
            return false;
          }
          if (!formData.propertyUnits) {
            toast.error("Please enter number of units");
            return false;
          }
          return true;
        case 3:
          return true;
        case 4:
          return true;
        case 5:
          return true;
        default:
          return true;
      }
    }

    if (role === "Investor") {
      switch (currentStep) {
        case 1:
          if (!formData.portfolioName.trim()) {
            toast.error("Please enter portfolio name");
            return false;
          }
          if (!formData.investedProperties) {
            toast.error("Please enter number of properties");
            return false;
          }
          if (!formData.investedUnits) {
            toast.error("Please enter number of units");
            return false;
          }
          return true;
        case 2:
          return true;
        case 3:
          return true;
        case 4:
          return true;
        default:
          return true;
      }
    }

    if (role === "HOA Administrator") {
      switch (currentStep) {
        case 1:
          if (!formData.communityName.trim()) {
            toast.error("Please enter community name");
            return false;
          }
          if (!formData.hoaUnits) {
            toast.error("Please enter number of units");
            return false;
          }
          if (!formData.hoaDues) {
            toast.error("Please enter monthly HOA dues");
            return false;
          }
          return true;
        case 2:
          return true;
        case 3:
          return true;
        case 4:
          return true;
        default:
          return true;
      }
    }

    return true;
  };

  const handleNext = () => {
    if (validateStep()) {
      if (currentStep < totalSteps) {
        setCurrentStep(currentStep + 1);
      }
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else if (currentStep === 1) {
      setRoleSelected(false);
      setCurrentStep(0);
      setFormData((prev) => ({
        ...prev,
        role: "",
      }));
    }
  };

  const handleAddTeamMember = () => {
    if (!formData.teamEmail.trim()) {
      toast.error("Please enter an email address");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.teamEmail)) {
      toast.error("Please enter a valid email address");
      return;
    }

    if (!formData.teamRole) {
      toast.error("Please select a role");
      return;
    }

    if (formData.teamMembers.some((m) => m.email === formData.teamEmail)) {
      toast.error("This email is already added");
      return;
    }

    setFormData((prev) => ({
      ...prev,
      teamMembers: [...prev.teamMembers, { email: formData.teamEmail, role: formData.teamRole }],
      teamEmail: "",
      teamRole: "",
    }));

    toast.success("Team member added");
  };

  const handleRemoveTeamMember = (email: string) => {
    setFormData((prev) => ({
      ...prev,
      teamMembers: prev.teamMembers.filter((m) => m.email !== email),
    }));
  };

  const handleAddTenantEmail = () => {
    if (!formData.tenantEmail.trim()) {
      toast.error("Please enter an email address");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.tenantEmail)) {
      toast.error("Please enter a valid email address");
      return;
    }

    if (formData.tenantEmails.includes(formData.tenantEmail)) {
      toast.error("This email is already added");
      return;
    }

    setFormData((prev) => ({
      ...prev,
      tenantEmails: [...prev.tenantEmails, prev.tenantEmail],
      tenantEmail: "",
    }));

    toast.success("Email added");
  };

  const handleRemoveTenantEmail = (email: string) => {
    setFormData((prev) => ({
      ...prev,
      tenantEmails: prev.tenantEmails.filter((e) => e !== email),
    }));
  };

  const handleAddHOAMember = () => {
    if (!formData.hoaMemberEmail.trim()) {
      toast.error("Please enter an email address");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.hoaMemberEmail)) {
      toast.error("Please enter a valid email address");
      return;
    }

    if (!formData.hoaMemberRole) {
      toast.error("Please select a role");
      return;
    }

    if (formData.hoaMembers.some((m) => m.email === formData.hoaMemberEmail)) {
      toast.error("This email is already added");
      return;
    }

    setFormData((prev) => ({
      ...prev,
      hoaMembers: [...prev.hoaMembers, { email: formData.hoaMemberEmail, role: formData.hoaMemberRole }],
      hoaMemberEmail: "",
      hoaMemberRole: "",
    }));

    toast.success("Member added");
  };

  const handleRemoveHOAMember = (email: string) => {
    setFormData((prev) => ({
      ...prev,
      hoaMembers: prev.hoaMembers.filter((m) => m.email !== email),
    }));
  };

  const handleFinish = async () => {
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      toast.success("Onboarding complete! Redirecting to dashboard...");
      // In a real app, this would navigate to role-specific dashboard
    }, 1200);
  };

  const progressPercentage = roleSelected ? (currentStep / totalSteps) * 100 : 0;

  const getHeadline = () => {
    if (!roleSelected) {
      return "How will you use Nestly?";
    }

    const role = formData.role;
    if (role === "Tenant") {
      return "Join Your Property";
    } else if (role === "Property Owner" || role === "Property Manager") {
      return "Set Up Your Portfolio";
    } else if (role === "Investor") {
      return "Build Your Investment Portfolio";
    } else if (role === "HOA Administrator") {
      return "Set Up Your Community";
    }
    return "Welcome to Nestly";
  };

  const getSubheadline = () => {
    if (!roleSelected) {
      return "Select your role to get started with Nestly AI.";
    }

    const role = formData.role;
    if (role === "Tenant") {
      return "Let's get you connected to your property.";
    } else if (role === "Property Owner" || role === "Property Manager") {
      return "Let's set up your portfolio so you can start managing properties and collecting rent.";
    } else if (role === "Investor") {
      return "Let's set up your investment portfolio and connect your team.";
    } else if (role === "HOA Administrator") {
      return "Let's set up your community management system.";
    }
    return "Welcome to Nestly AI";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-slate-50 to-white py-12 px-4">
      <div
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(62, 207, 142, 0.08) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-2xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1
            className="text-3xl sm:text-4xl font-bold text-slate-900 mb-3"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {getHeadline()}
          </h1>
          <p
            className="text-base text-slate-600"
            style={{ fontFamily: "var(--font-body)" }}
          >
            {getSubheadline()}
          </p>
        </motion.div>

        {/* Progress Bar - Only show after role selection */}
        {roleSelected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-8"
          >
            <div className="flex items-center justify-between mb-3">
              <span
                className="text-sm font-medium text-slate-900"
                style={{ fontFamily: "var(--font-body)" }}
              >
                Step {currentStep} of {totalSteps}
              </span>
              <span
                className="text-sm text-slate-600"
                style={{ fontFamily: "var(--font-body)" }}
              >
                {Math.round(progressPercentage)}%
              </span>
            </div>
            <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-[#3ECF8E] to-[#2FBF9B]"
                initial={{ width: 0 }}
                animate={{ width: `${progressPercentage}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </motion.div>
        )}

        {/* Role Selection Screen */}
        {!roleSelected && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            {roles.map((role) => (
              <motion.button
                key={role.id}
                onClick={() => handleRoleSelect(role.id)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="nestly-card rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all border-2 border-transparent hover:border-[#3ECF8E] group"
              >
                <div className="text-4xl mb-3">{role.icon}</div>
                <h3
                  className="text-lg font-bold text-slate-900 mb-2 group-hover:text-[#3ECF8E] transition-colors"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {role.label}
                </h3>
                <p
                  className="text-sm text-slate-600 text-left"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  {role.id === "Property Owner" && "Manage your rental properties"}
                  {role.id === "Property Manager" && "Operate properties for owners"}
                  {role.id === "Investor" && "Track your real estate investments"}
                  {role.id === "Tenant" && "Pay rent and manage your lease"}
                  {role.id === "HOA Administrator" && "Manage your community"}
                </p>
              </motion.button>
            ))}
          </motion.div>
        )}

        {/* Step Content */}
        {roleSelected && (
          <AnimatePresence mode="wait">
            <motion.div
              key={`${formData.role}-${currentStep}`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
              className="nestly-card rounded-2xl p-8 shadow-lg"
            >
              {/* TENANT ONBOARDING */}
              {formData.role === "Tenant" && currentStep === 1 && (
                <div className="space-y-6">
                  <div>
                    <h2
                      className="text-2xl font-bold text-slate-900 mb-2"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      Property Details
                    </h2>
                    <p
                      className="text-slate-600"
                      style={{ fontFamily: "var(--font-body)" }}
                    >
                      Tell us about the property you're renting.
                    </p>
                  </div>

                  <div>
                    <label
                      htmlFor="propertyName"
                      className="block text-sm font-medium text-slate-900 mb-2"
                      style={{ fontFamily: "var(--font-body)" }}
                    >
                      Property Name or Address
                    </label>
                    <input
                      type="text"
                      id="propertyName"
                      name="propertyName"
                      value={formData.propertyName}
                      onChange={handleInputChange}
                      placeholder="e.g., Downtown Apartments or 123 Main St"
                      className="w-full px-4 py-2.5 rounded-lg border border-slate-200 bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#3ECF8E] focus:border-transparent transition-all"
                      style={{ fontFamily: "var(--font-body)" }}
                    />
                  </div>
                </div>
              )}

              {formData.role === "Tenant" && currentStep === 2 && (
                <div className="space-y-6">
                  <div>
                    <h2
                      className="text-2xl font-bold text-slate-900 mb-2"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      Your Unit
                    </h2>
                    <p
                      className="text-slate-600"
                      style={{ fontFamily: "var(--font-body)" }}
                    >
                      Which unit or apartment do you rent?
                    </p>
                  </div>

                  <div>
                    <label
                      htmlFor="unitNumber"
                      className="block text-sm font-medium text-slate-900 mb-2"
                      style={{ fontFamily: "var(--font-body)" }}
                    >
                      Unit or Apartment Number
                    </label>
                    <input
                      type="text"
                      id="unitNumber"
                      name="unitNumber"
                      value={formData.unitNumber}
                      onChange={handleInputChange}
                      placeholder="e.g., 4B or Apt 201"
                      className="w-full px-4 py-2.5 rounded-lg border border-slate-200 bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#3ECF8E] focus:border-transparent transition-all"
                      style={{ fontFamily: "var(--font-body)" }}
                    />
                  </div>
                </div>
              )}

              {formData.role === "Tenant" && currentStep === 3 && (
                <div className="space-y-6">
                  <div>
                    <h2
                      className="text-2xl font-bold text-slate-900 mb-2"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      Invitation Code
                    </h2>
                    <p
                      className="text-slate-600"
                      style={{ fontFamily: "var(--font-body)" }}
                    >
                      If your landlord has invited you, enter the code they provided.
                    </p>
                  </div>

                  <div>
                    <label
                      htmlFor="invitationCode"
                      className="block text-sm font-medium text-slate-900 mb-2"
                      style={{ fontFamily: "var(--font-body)" }}
                    >
                      Invitation Code (Optional)
                    </label>
                    <input
                      type="text"
                      id="invitationCode"
                      name="invitationCode"
                      value={formData.invitationCode}
                      onChange={handleInputChange}
                      placeholder="e.g., NEST-ABC123"
                      className="w-full px-4 py-2.5 rounded-lg border border-slate-200 bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#3ECF8E] focus:border-transparent transition-all"
                      style={{ fontFamily: "var(--font-body)" }}
                    />
                    <p
                      className="text-xs text-slate-500 mt-2"
                      style={{ fontFamily: "var(--font-body)" }}
                    >
                      You can skip this and add it later in your settings.
                    </p>
                  </div>
                </div>
              )}

              {/* PROPERTY OWNER/MANAGER ONBOARDING */}
              {(formData.role === "Property Owner" || formData.role === "Property Manager") &&
                currentStep === 1 && (
                  <div className="space-y-6">
                    <div>
                      <h2
                        className="text-2xl font-bold text-slate-900 mb-2"
                        style={{ fontFamily: "var(--font-display)" }}
                      >
                        Portfolio Overview
                      </h2>
                      <p
                        className="text-slate-600"
                        style={{ fontFamily: "var(--font-body)" }}
                      >
                        Tell us about your property portfolio.
                      </p>
                    </div>

                    <div>
                      <label
                        htmlFor="numProperties"
                        className="block text-sm font-medium text-slate-900 mb-2"
                        style={{ fontFamily: "var(--font-body)" }}
                      >
                        Number of Properties
                      </label>
                      <select
                        id="numProperties"
                        name="numProperties"
                        value={formData.numProperties}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2.5 rounded-lg border border-slate-200 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#3ECF8E] focus:border-transparent transition-all"
                        style={{ fontFamily: "var(--font-body)" }}
                      >
                        <option value="">Select number of properties</option>
                        <option value="1-5">1–5</option>
                        <option value="6-20">6–20</option>
                        <option value="21-50">21–50</option>
                        <option value="51-100">51–100</option>
                        <option value="100+">100+</option>
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="unitsManaged"
                        className="block text-sm font-medium text-slate-900 mb-2"
                        style={{ fontFamily: "var(--font-body)" }}
                      >
                        Units Managed
                      </label>
                      <select
                        id="unitsManaged"
                        name="unitsManaged"
                        value={formData.unitsManaged}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2.5 rounded-lg border border-slate-200 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#3ECF8E] focus:border-transparent transition-all"
                        style={{ fontFamily: "var(--font-body)" }}
                      >
                        <option value="">Select units managed</option>
                        <option value="1-10">1–10</option>
                        <option value="11-50">11–50</option>
                        <option value="51-100">51–100</option>
                        <option value="101-500">101–500</option>
                        <option value="500+">500+</option>
                      </select>
                    </div>
                  </div>
                )}

              {(formData.role === "Property Owner" || formData.role === "Property Manager") &&
                currentStep === 2 && (
                  <div className="space-y-6">
                    <div>
                      <h2
                        className="text-2xl font-bold text-slate-900 mb-2"
                        style={{ fontFamily: "var(--font-display)" }}
                      >
                        Add Your First Property
                      </h2>
                      <p
                        className="text-slate-600"
                        style={{ fontFamily: "var(--font-body)" }}
                      >
                        Let's add your first property to get started.
                      </p>
                    </div>

                    <div>
                      <label
                        htmlFor="propertyName"
                        className="block text-sm font-medium text-slate-900 mb-2"
                        style={{ fontFamily: "var(--font-body)" }}
                      >
                        Property Name
                      </label>
                      <input
                        type="text"
                        id="propertyName"
                        name="propertyName"
                        value={formData.propertyName}
                        onChange={handleInputChange}
                        placeholder="e.g., Downtown Apartments"
                        className="w-full px-4 py-2.5 rounded-lg border border-slate-200 bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#3ECF8E] focus:border-transparent transition-all"
                        style={{ fontFamily: "var(--font-body)" }}
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="propertyAddress"
                        className="block text-sm font-medium text-slate-900 mb-2"
                        style={{ fontFamily: "var(--font-body)" }}
                      >
                        Property Address
                      </label>
                      <input
                        type="text"
                        id="propertyAddress"
                        name="propertyAddress"
                        value={formData.propertyAddress}
                        onChange={handleInputChange}
                        placeholder="123 Main St, City, State"
                        className="w-full px-4 py-2.5 rounded-lg border border-slate-200 bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#3ECF8E] focus:border-transparent transition-all"
                        style={{ fontFamily: "var(--font-body)" }}
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="propertyUnits"
                        className="block text-sm font-medium text-slate-900 mb-2"
                        style={{ fontFamily: "var(--font-body)" }}
                      >
                        Number of Units
                      </label>
                      <input
                        type="number"
                        id="propertyUnits"
                        name="propertyUnits"
                        value={formData.propertyUnits}
                        onChange={handleInputChange}
                        placeholder="e.g., 12"
                        className="w-full px-4 py-2.5 rounded-lg border border-slate-200 bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#3ECF8E] focus:border-transparent transition-all"
                        style={{ fontFamily: "var(--font-body)" }}
                      />
                    </div>
                  </div>
                )}

              {(formData.role === "Property Owner" || formData.role === "Property Manager") &&
                currentStep === 3 && (
                  <div className="space-y-6">
                    <div>
                      <h2
                        className="text-2xl font-bold text-slate-900 mb-2"
                        style={{ fontFamily: "var(--font-display)" }}
                      >
                        Connect Bank Account
                      </h2>
                      <p
                        className="text-slate-600"
                        style={{ fontFamily: "var(--font-body)" }}
                      >
                        Connect your bank account to start receiving rent payments.
                      </p>
                    </div>

                    <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-lg p-6 border border-slate-200">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#3ECF8E] to-[#2FBF9B] flex items-center justify-center flex-shrink-0">
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="white"
                            strokeWidth="2"
                          >
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z" />
                          </svg>
                        </div>
                        <div>
                          <h3
                            className="font-semibold text-slate-900 mb-1"
                            style={{ fontFamily: "var(--font-body)" }}
                          >
                            Secure Connection
                          </h3>
                          <p
                            className="text-sm text-slate-600"
                            style={{ fontFamily: "var(--font-body)" }}
                          >
                            Your bank information is encrypted and secure. We never store your
                            passwords.
                          </p>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        toast("Bank connection — coming soon", {
                          description: "This feature is under development.",
                        });
                      }}
                      className="w-full btn-primary py-3 rounded-lg font-medium transition-all"
                      style={{ fontFamily: "var(--font-body)" }}
                    >
                      Connect Bank Account
                    </button>
                  </div>
                )}

              {(formData.role === "Property Owner" || formData.role === "Property Manager") &&
                currentStep === 4 && (
                  <div className="space-y-6">
                    <div>
                      <h2
                        className="text-2xl font-bold text-slate-900 mb-2"
                        style={{ fontFamily: "var(--font-display)" }}
                      >
                        Invite Tenants
                      </h2>
                      <p
                        className="text-slate-600"
                        style={{ fontFamily: "var(--font-body)" }}
                      >
                        Invite tenants to pay rent online and manage their accounts.
                      </p>
                    </div>

                    <div className="space-y-3">
                      <div className="flex gap-2">
                        <input
                          type="email"
                          name="tenantEmail"
                          value={formData.tenantEmail}
                          onChange={handleInputChange}
                          placeholder="tenant@example.com"
                          className="flex-1 px-4 py-2.5 rounded-lg border border-slate-200 bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#3ECF8E] focus:border-transparent transition-all"
                          style={{ fontFamily: "var(--font-body)" }}
                        />
                        <button
                          onClick={handleAddTenantEmail}
                          className="px-6 py-2.5 rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-900 font-medium transition-all"
                          style={{ fontFamily: "var(--font-body)" }}
                        >
                          Add
                        </button>
                      </div>

                      {formData.tenantEmails.length > 0 && (
                        <div className="space-y-2">
                          {formData.tenantEmails.map((email) => (
                            <div
                              key={email}
                              className="flex items-center justify-between bg-slate-50 p-3 rounded-lg border border-slate-200"
                            >
                              <span
                                className="text-sm text-slate-900"
                                style={{ fontFamily: "var(--font-body)" }}
                              >
                                {email}
                              </span>
                              <button
                                onClick={() => handleRemoveTenantEmail(email)}
                                className="text-slate-400 hover:text-red-500 transition-colors"
                              >
                                ✕
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}

              {(formData.role === "Property Owner" || formData.role === "Property Manager") &&
                currentStep === 5 && (
                  <div className="space-y-6">
                    <div>
                      <h2
                        className="text-2xl font-bold text-slate-900 mb-2"
                        style={{ fontFamily: "var(--font-display)" }}
                      >
                        Review & Confirm
                      </h2>
                      <p
                        className="text-slate-600"
                        style={{ fontFamily: "var(--font-body)" }}
                      >
                        Your portfolio setup is complete. You're ready to start managing properties
                        and collecting rent with Nestly.
                      </p>
                    </div>

                    <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-lg p-6 border border-slate-200">
                      <div className="space-y-3">
                        <div>
                          <p
                            className="text-xs text-slate-600 uppercase tracking-wide"
                            style={{ fontFamily: "var(--font-body)" }}
                          >
                            Property
                          </p>
                          <p
                            className="text-sm font-medium text-slate-900"
                            style={{ fontFamily: "var(--font-body)" }}
                          >
                            {formData.propertyName}
                          </p>
                        </div>
                        <div>
                          <p
                            className="text-xs text-slate-600 uppercase tracking-wide"
                            style={{ fontFamily: "var(--font-body)" }}
                          >
                            Address
                          </p>
                          <p
                            className="text-sm font-medium text-slate-900"
                            style={{ fontFamily: "var(--font-body)" }}
                          >
                            {formData.propertyAddress}
                          </p>
                        </div>
                        <div>
                          <p
                            className="text-xs text-slate-600 uppercase tracking-wide"
                            style={{ fontFamily: "var(--font-body)" }}
                          >
                            Units
                          </p>
                          <p
                            className="text-sm font-medium text-slate-900"
                            style={{ fontFamily: "var(--font-body)" }}
                          >
                            {formData.propertyUnits}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

              {/* INVESTOR ONBOARDING */}
              {formData.role === "Investor" && currentStep === 1 && (
                <div className="space-y-6">
                  <div>
                    <h2
                      className="text-2xl font-bold text-slate-900 mb-2"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      Investment Portfolio
                    </h2>
                    <p
                      className="text-slate-600"
                      style={{ fontFamily: "var(--font-body)" }}
                    >
                      Tell us about your investment portfolio.
                    </p>
                  </div>

                  <div>
                    <label
                      htmlFor="portfolioName"
                      className="block text-sm font-medium text-slate-900 mb-2"
                      style={{ fontFamily: "var(--font-body)" }}
                    >
                      Portfolio Name
                    </label>
                    <input
                      type="text"
                      id="portfolioName"
                      name="portfolioName"
                      value={formData.portfolioName}
                      onChange={handleInputChange}
                      placeholder="e.g., My Real Estate Investments"
                      className="w-full px-4 py-2.5 rounded-lg border border-slate-200 bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#3ECF8E] focus:border-transparent transition-all"
                      style={{ fontFamily: "var(--font-body)" }}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="investedProperties"
                      className="block text-sm font-medium text-slate-900 mb-2"
                      style={{ fontFamily: "var(--font-body)" }}
                    >
                      Total Properties Invested In
                    </label>
                    <input
                      type="number"
                      id="investedProperties"
                      name="investedProperties"
                      value={formData.investedProperties}
                      onChange={handleInputChange}
                      placeholder="e.g., 5"
                      className="w-full px-4 py-2.5 rounded-lg border border-slate-200 bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#3ECF8E] focus:border-transparent transition-all"
                      style={{ fontFamily: "var(--font-body)" }}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="investedUnits"
                      className="block text-sm font-medium text-slate-900 mb-2"
                      style={{ fontFamily: "var(--font-body)" }}
                    >
                      Total Units Invested In
                    </label>
                    <input
                      type="number"
                      id="investedUnits"
                      name="investedUnits"
                      value={formData.investedUnits}
                      onChange={handleInputChange}
                      placeholder="e.g., 45"
                      className="w-full px-4 py-2.5 rounded-lg border border-slate-200 bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#3ECF8E] focus:border-transparent transition-all"
                      style={{ fontFamily: "var(--font-body)" }}
                    />
                  </div>
                </div>
              )}

              {formData.role === "Investor" && currentStep === 2 && (
                <div className="space-y-6">
                  <div>
                    <h2
                      className="text-2xl font-bold text-slate-900 mb-2"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      Add Team Members
                    </h2>
                    <p
                      className="text-slate-600"
                      style={{ fontFamily: "var(--font-body)" }}
                    >
                      Invite property managers, accountants, and investment partners.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <div className="flex gap-2">
                      <input
                        type="email"
                        name="teamEmail"
                        value={formData.teamEmail}
                        onChange={handleInputChange}
                        placeholder="member@example.com"
                        className="flex-1 px-4 py-2.5 rounded-lg border border-slate-200 bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#3ECF8E] focus:border-transparent transition-all"
                        style={{ fontFamily: "var(--font-body)" }}
                      />
                    </div>

                    <div className="flex gap-2">
                      <select
                        name="teamRole"
                        value={formData.teamRole}
                        onChange={handleInputChange}
                        className="flex-1 px-4 py-2.5 rounded-lg border border-slate-200 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#3ECF8E] focus:border-transparent transition-all"
                        style={{ fontFamily: "var(--font-body)" }}
                      >
                        <option value="">Select role</option>
                        {investorTeamRoles.map((role) => (
                          <option key={role} value={role}>
                            {role}
                          </option>
                        ))}
                      </select>
                      <button
                        onClick={handleAddTeamMember}
                        className="px-6 py-2.5 rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-900 font-medium transition-all"
                        style={{ fontFamily: "var(--font-body)" }}
                      >
                        Add
                      </button>
                    </div>

                    {formData.teamMembers.length > 0 && (
                      <div className="space-y-2">
                        {formData.teamMembers.map((member) => (
                          <div
                            key={member.email}
                            className="flex items-center justify-between bg-slate-50 p-3 rounded-lg border border-slate-200"
                          >
                            <div>
                              <p
                                className="text-sm font-medium text-slate-900"
                                style={{ fontFamily: "var(--font-body)" }}
                              >
                                {member.email}
                              </p>
                              <p
                                className="text-xs text-slate-600"
                                style={{ fontFamily: "var(--font-body)" }}
                              >
                                {member.role}
                              </p>
                            </div>
                            <button
                              onClick={() => handleRemoveTeamMember(member.email)}
                              className="text-slate-400 hover:text-red-500 transition-colors"
                            >
                              ✕
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {formData.role === "Investor" && (currentStep === 3 || currentStep === 4) && (
                <div className="space-y-6">
                  <div>
                    <h2
                      className="text-2xl font-bold text-slate-900 mb-2"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {currentStep === 3 ? "Analytics Setup" : "Review & Confirm"}
                    </h2>
                    <p
                      className="text-slate-600"
                      style={{ fontFamily: "var(--font-body)" }}
                    >
                      {currentStep === 3
                        ? "Customize your analytics dashboard preferences."
                        : "Review your investment portfolio setup."}
                    </p>
                  </div>

                  <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-lg p-6 border border-slate-200">
                    <p
                      className="text-slate-600"
                      style={{ fontFamily: "var(--font-body)" }}
                    >
                      {currentStep === 3
                        ? "You'll have access to detailed analytics dashboards showing your portfolio performance, ROI, and investment trends."
                        : "Your investment portfolio is ready. You'll be taken to the Investor Analytics Dashboard after completion."}
                    </p>
                  </div>
                </div>
              )}

              {/* HOA ADMINISTRATOR ONBOARDING */}
              {formData.role === "HOA Administrator" && currentStep === 1 && (
                <div className="space-y-6">
                  <div>
                    <h2
                      className="text-2xl font-bold text-slate-900 mb-2"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      Community Details
                    </h2>
                    <p
                      className="text-slate-600"
                      style={{ fontFamily: "var(--font-body)" }}
                    >
                      Tell us about your HOA community.
                    </p>
                  </div>

                  <div>
                    <label
                      htmlFor="communityName"
                      className="block text-sm font-medium text-slate-900 mb-2"
                      style={{ fontFamily: "var(--font-body)" }}
                    >
                      Community Name
                    </label>
                    <input
                      type="text"
                      id="communityName"
                      name="communityName"
                      value={formData.communityName}
                      onChange={handleInputChange}
                      placeholder="e.g., Sunset Heights HOA"
                      className="w-full px-4 py-2.5 rounded-lg border border-slate-200 bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#3ECF8E] focus:border-transparent transition-all"
                      style={{ fontFamily: "var(--font-body)" }}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="hoaUnits"
                      className="block text-sm font-medium text-slate-900 mb-2"
                      style={{ fontFamily: "var(--font-body)" }}
                    >
                      Number of Homes / Units
                    </label>
                    <input
                      type="number"
                      id="hoaUnits"
                      name="hoaUnits"
                      value={formData.hoaUnits}
                      onChange={handleInputChange}
                      placeholder="e.g., 150"
                      className="w-full px-4 py-2.5 rounded-lg border border-slate-200 bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#3ECF8E] focus:border-transparent transition-all"
                      style={{ fontFamily: "var(--font-body)" }}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="hoaDues"
                      className="block text-sm font-medium text-slate-900 mb-2"
                      style={{ fontFamily: "var(--font-body)" }}
                    >
                      Monthly HOA Dues
                    </label>
                    <input
                      type="number"
                      id="hoaDues"
                      name="hoaDues"
                      value={formData.hoaDues}
                      onChange={handleInputChange}
                      placeholder="e.g., 250"
                      className="w-full px-4 py-2.5 rounded-lg border border-slate-200 bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#3ECF8E] focus:border-transparent transition-all"
                      style={{ fontFamily: "var(--font-body)" }}
                    />
                  </div>
                </div>
              )}

              {formData.role === "HOA Administrator" && currentStep === 2 && (
                <div className="space-y-6">
                  <div>
                    <h2
                      className="text-2xl font-bold text-slate-900 mb-2"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      Invite Community Members
                    </h2>
                    <p
                      className="text-slate-600"
                      style={{ fontFamily: "var(--font-body)" }}
                    >
                      Invite residents, board members, and managers.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <div className="flex gap-2">
                      <input
                        type="email"
                        name="hoaMemberEmail"
                        value={formData.hoaMemberEmail}
                        onChange={handleInputChange}
                        placeholder="member@example.com"
                        className="flex-1 px-4 py-2.5 rounded-lg border border-slate-200 bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#3ECF8E] focus:border-transparent transition-all"
                        style={{ fontFamily: "var(--font-body)" }}
                      />
                    </div>

                    <div className="flex gap-2">
                      <select
                        name="hoaMemberRole"
                        value={formData.hoaMemberRole}
                        onChange={handleInputChange}
                        className="flex-1 px-4 py-2.5 rounded-lg border border-slate-200 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#3ECF8E] focus:border-transparent transition-all"
                        style={{ fontFamily: "var(--font-body)" }}
                      >
                        <option value="">Select role</option>
                        {hoaMemberRoles.map((role) => (
                          <option key={role} value={role}>
                            {role}
                          </option>
                        ))}
                      </select>
                      <button
                        onClick={handleAddHOAMember}
                        className="px-6 py-2.5 rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-900 font-medium transition-all"
                        style={{ fontFamily: "var(--font-body)" }}
                      >
                        Add
                      </button>
                    </div>

                    {formData.hoaMembers.length > 0 && (
                      <div className="space-y-2">
                        {formData.hoaMembers.map((member) => (
                          <div
                            key={member.email}
                            className="flex items-center justify-between bg-slate-50 p-3 rounded-lg border border-slate-200"
                          >
                            <div>
                              <p
                                className="text-sm font-medium text-slate-900"
                                style={{ fontFamily: "var(--font-body)" }}
                              >
                                {member.email}
                              </p>
                              <p
                                className="text-xs text-slate-600"
                                style={{ fontFamily: "var(--font-body)" }}
                              >
                                {member.role}
                              </p>
                            </div>
                            <button
                              onClick={() => handleRemoveHOAMember(member.email)}
                              className="text-slate-400 hover:text-red-500 transition-colors"
                            >
                              ✕
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {formData.role === "HOA Administrator" && (currentStep === 3 || currentStep === 4) && (
                <div className="space-y-6">
                  <div>
                    <h2
                      className="text-2xl font-bold text-slate-900 mb-2"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {currentStep === 3 ? "Payment Settings" : "Review & Confirm"}
                    </h2>
                    <p
                      className="text-slate-600"
                      style={{ fontFamily: "var(--font-body)" }}
                    >
                      {currentStep === 3
                        ? "Configure how residents pay their HOA dues."
                        : "Review your HOA community setup."}
                    </p>
                  </div>

                  <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-lg p-6 border border-slate-200">
                    <p
                      className="text-slate-600"
                      style={{ fontFamily: "var(--font-body)" }}
                    >
                      {currentStep === 3
                        ? "Residents will be able to pay their HOA dues online through Nestly. You'll receive payments directly to your HOA account."
                        : "Your HOA community is set up and ready. You'll be taken to the Community Management Dashboard after completion."}
                    </p>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        )}

        {/* Navigation Buttons */}
        {roleSelected && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex gap-3 mt-8"
          >
            <button
              onClick={handlePrevious}
              className="flex-1 px-6 py-3 rounded-lg border border-slate-200 bg-white text-slate-900 font-medium hover:bg-slate-50 transition-all flex items-center justify-center gap-2"
              style={{ fontFamily: "var(--font-body)" }}
            >
              <ArrowLeft size={16} />
              {currentStep === 1 ? "Change Role" : "Previous"}
            </button>

            {currentStep < totalSteps ? (
              <button
                onClick={handleNext}
                className="flex-1 btn-primary py-3 rounded-lg font-medium transition-all flex items-center justify-center gap-2"
                style={{ fontFamily: "var(--font-body)" }}
              >
                Next
                <ArrowRight size={16} />
              </button>
            ) : (
              <button
                onClick={handleFinish}
                disabled={isLoading}
                className="flex-1 btn-primary py-3 rounded-lg font-medium transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                style={{ fontFamily: "var(--font-body)" }}
              >
                {isLoading ? "Finishing..." : "Finish Setup"}
                {!isLoading && <Check size={16} />}
              </button>
            )}
          </motion.div>
        )}

        {/* Skip Option */}
        {roleSelected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center mt-6"
          >
            <button
              onClick={() => {
                toast("Skipping onboarding...", {
                  description: "You can complete this later in settings.",
                });
              }}
              className="text-sm text-slate-600 hover:text-slate-900 transition-colors"
              style={{ fontFamily: "var(--font-body)" }}
            >
              Skip for now
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
