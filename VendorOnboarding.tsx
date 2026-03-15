/*
 * Vendor Onboarding Page – Vendors complete setup with banking and tax info
 * Multi-step process: Business Info → Service Areas → Bank Account → Tax Documentation → Review
 */

import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronRight,
  ChevronLeft,
  CheckCircle,
  AlertCircle,
  Upload,
  FileText,
  X,
  Lock,
  DollarSign,
  Building2,
  MapPin,
  FileCheck,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface OnboardingStep {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const steps: OnboardingStep[] = [
  {
    id: 1,
    title: "Business Information",
    description: "Tell us about your business",
    icon: <Building2 size={24} />,
  },
  {
    id: 2,
    title: "Service Areas",
    description: "Select where you operate",
    icon: <MapPin size={24} />,
  },
  {
    id: 3,
    title: "Bank Account Setup",
    description: "Secure payment information",
    icon: <DollarSign size={24} />,
  },
  {
    id: 4,
    title: "Tax Information",
    description: "Upload W-9 form",
    icon: <FileCheck size={24} />,
  },
  {
    id: 5,
    title: "Review & Activate",
    description: "Confirm your information",
    icon: <CheckCircle size={24} />,
  },
];

export default function VendorOnboarding() {
  const [currentStep, setCurrentStep] = useState(1);
  const [w9Uploaded, setW9Uploaded] = useState(false);
  const [bankInfoComplete, setBankInfoComplete] = useState(false);
  const [formData, setFormData] = useState({
    businessName: "",
    serviceType: "Plumbing",
    contactName: "",
    phone: "",
    email: "",
    serviceAreas: [] as string[],
    bankAccountName: "",
    bankRoutingNumber: "",
    bankAccountNumber: "",
    taxClassification: "Sole Proprietor",
    businessNameW9: "",
    ein: "",
    w9File: null as File | null,
  });

  const serviceTypes = [
    "Plumbing",
    "Electrical",
    "Landscaping",
    "Cleaning",
    "Legal",
    "HVAC",
    "Roofing",
    "General Maintenance",
  ];

  const serviceAreas = [
    "Downtown",
    "Lakeside",
    "Sunset",
    "Midtown",
    "Riverside",
    "Uptown",
  ];

  const handleNext = () => {
    if (currentStep < steps.length) {
      // Validate current step
      if (currentStep === 1 && (!formData.businessName || !formData.contactName)) {
        toast.error("Please fill in all business information");
        return;
      }
      if (currentStep === 2 && formData.serviceAreas.length === 0) {
        toast.error("Please select at least one service area");
        return;
      }
      if (currentStep === 3 && (!formData.bankAccountName || !formData.bankRoutingNumber || !formData.bankAccountNumber)) {
        toast.error("Please fill in all bank account information");
        return;
      }
      if (currentStep === 4 && (!w9Uploaded || !formData.businessNameW9)) {
        toast.error("Please upload W-9 form and enter business name");
        return;
      }
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleServiceAreaToggle = (area: string) => {
    setFormData((prev) => ({
      ...prev,
      serviceAreas: prev.serviceAreas.includes(area)
        ? prev.serviceAreas.filter((a) => a !== area)
        : [...prev.serviceAreas, area],
    }));
  };

  const handleW9Upload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type === "application/pdf" || file.type === "application/x-pdf") {
        setFormData((prev) => ({ ...prev, w9File: file }));
        setW9Uploaded(true);
        toast.success("W-9 form uploaded successfully");
      } else {
        toast.error("Please upload a PDF file");
      }
    }
  };

  const handleComplete = () => {
    toast.success("Vendor account activated! You can now receive assignments.");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 shadow-sm">
        <div className="px-6 py-8">
          <h1 className="text-3xl font-bold text-slate-900" style={{ fontFamily: "var(--font-display)" }}>
            Vendor Onboarding
          </h1>
          <p className="text-slate-600 mt-2" style={{ fontFamily: "var(--font-body)" }}>
            Complete your setup to start receiving maintenance assignments
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-6 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Progress Steps */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-8">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center flex-1">
                  <motion.div
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    className={`flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all ${
                      currentStep >= step.id
                        ? "bg-[#3ECF8E] border-[#3ECF8E] text-white"
                        : "bg-white border-slate-300 text-slate-400"
                    }`}
                  >
                    {step.id}
                  </motion.div>
                  {index < steps.length - 1 && (
                    <div
                      className={`flex-1 h-1 mx-2 transition-all ${
                        currentStep > step.id ? "bg-[#3ECF8E]" : "bg-slate-200"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>

            {/* Step Labels */}
            <div className="grid grid-cols-5 gap-4">
              {steps.map((step) => (
                <div key={step.id} className="text-center">
                  <p
                    className={`text-sm font-medium ${
                      currentStep === step.id ? "text-[#3ECF8E]" : "text-slate-600"
                    }`}
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    {step.title}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Step Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-white rounded-lg border border-slate-200 shadow-sm p-8"
            >
              {/* Step 1: Business Information */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900 mb-2" style={{ fontFamily: "var(--font-display)" }}>
                      {steps[0].title}
                    </h2>
                    <p className="text-slate-600" style={{ fontFamily: "var(--font-body)" }}>
                      {steps[0].description}
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2" style={{ fontFamily: "var(--font-body)" }}>
                        Business Name
                      </label>
                      <input
                        type="text"
                        value={formData.businessName}
                        onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                        placeholder="e.g., ProFix Plumbing LLC"
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#3ECF8E] focus:border-transparent outline-none"
                        style={{ fontFamily: "var(--font-body)" }}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2" style={{ fontFamily: "var(--font-body)" }}>
                        Service Type
                      </label>
                      <select
                        value={formData.serviceType}
                        onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#3ECF8E] focus:border-transparent outline-none"
                        style={{ fontFamily: "var(--font-body)" }}
                      >
                        {serviceTypes.map((type) => (
                          <option key={type} value={type}>
                            {type}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2" style={{ fontFamily: "var(--font-body)" }}>
                          Contact Name
                        </label>
                        <input
                          type="text"
                          value={formData.contactName}
                          onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                          placeholder="Your name"
                          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#3ECF8E] focus:border-transparent outline-none"
                          style={{ fontFamily: "var(--font-body)" }}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2" style={{ fontFamily: "var(--font-body)" }}>
                          Phone
                        </label>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="(555) 123-4567"
                          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#3ECF8E] focus:border-transparent outline-none"
                          style={{ fontFamily: "var(--font-body)" }}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2" style={{ fontFamily: "var(--font-body)" }}>
                        Email
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="vendor@company.com"
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#3ECF8E] focus:border-transparent outline-none"
                        style={{ fontFamily: "var(--font-body)" }}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Service Areas */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900 mb-2" style={{ fontFamily: "var(--font-display)" }}>
                      {steps[1].title}
                    </h2>
                    <p className="text-slate-600" style={{ fontFamily: "var(--font-body)" }}>
                      {steps[1].description}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    {serviceAreas.map((area) => (
                      <button
                        key={area}
                        onClick={() => handleServiceAreaToggle(area)}
                        className={`p-4 rounded-lg border-2 transition-all text-left font-medium ${
                          formData.serviceAreas.includes(area)
                            ? "border-[#3ECF8E] bg-[#3ECF8E]/10 text-[#3ECF8E]"
                            : "border-slate-200 bg-white text-slate-700 hover:border-slate-300"
                        }`}
                        style={{ fontFamily: "var(--font-body)" }}
                      >
                        <div className="flex items-center gap-2">
                          <div
                            className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                              formData.serviceAreas.includes(area)
                                ? "bg-[#3ECF8E] border-[#3ECF8E]"
                                : "border-slate-300"
                            }`}
                          >
                            {formData.serviceAreas.includes(area) && (
                              <CheckCircle size={16} className="text-white" />
                            )}
                          </div>
                          {area}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 3: Bank Account Setup */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900 mb-2" style={{ fontFamily: "var(--font-display)" }}>
                      {steps[2].title}
                    </h2>
                    <p className="text-slate-600 mb-4" style={{ fontFamily: "var(--font-body)" }}>
                      {steps[2].description}
                    </p>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex gap-3 mb-6">
                    <Lock size={20} className="text-blue-600 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-blue-900" style={{ fontFamily: "var(--font-body)" }}>
                      Your banking information is encrypted and stored securely. We never store your account number in plain text.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2" style={{ fontFamily: "var(--font-body)" }}>
                        Account Holder Name
                      </label>
                      <input
                        type="text"
                        value={formData.bankAccountName}
                        onChange={(e) => setFormData({ ...formData, bankAccountName: e.target.value })}
                        placeholder="Name on bank account"
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#3ECF8E] focus:border-transparent outline-none"
                        style={{ fontFamily: "var(--font-body)" }}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2" style={{ fontFamily: "var(--font-body)" }}>
                        Routing Number
                      </label>
                      <input
                        type="text"
                        value={formData.bankRoutingNumber}
                        onChange={(e) => setFormData({ ...formData, bankRoutingNumber: e.target.value })}
                        placeholder="9-digit routing number"
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#3ECF8E] focus:border-transparent outline-none"
                        style={{ fontFamily: "var(--font-body)" }}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2" style={{ fontFamily: "var(--font-body)" }}>
                        Account Number
                      </label>
                      <input
                        type="password"
                        value={formData.bankAccountNumber}
                        onChange={(e) => setFormData({ ...formData, bankAccountNumber: e.target.value })}
                        placeholder="Account number (hidden for security)"
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#3ECF8E] focus:border-transparent outline-none"
                        style={{ fontFamily: "var(--font-body)" }}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 4: Tax Information */}
              {currentStep === 4 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900 mb-2" style={{ fontFamily: "var(--font-display)" }}>
                      {steps[3].title}
                    </h2>
                    <p className="text-slate-600 mb-4" style={{ fontFamily: "var(--font-body)" }}>
                      {steps[3].description}
                    </p>
                  </div>

                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex gap-3 mb-6">
                    <AlertCircle size={20} className="text-amber-600 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-amber-900" style={{ fontFamily: "var(--font-body)" }}>
                      <span className="font-bold">Required:</span> W-9 form must be uploaded before you can receive payments. This is required by IRS regulations.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2" style={{ fontFamily: "var(--font-body)" }}>
                        Tax Classification
                      </label>
                      <select
                        value={formData.taxClassification}
                        onChange={(e) => setFormData({ ...formData, taxClassification: e.target.value })}
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#3ECF8E] focus:border-transparent outline-none"
                        style={{ fontFamily: "var(--font-body)" }}
                      >
                        <option value="Sole Proprietor">Sole Proprietor</option>
                        <option value="Partnership">Partnership</option>
                        <option value="S Corporation">S Corporation</option>
                        <option value="C Corporation">C Corporation</option>
                        <option value="LLC">LLC</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2" style={{ fontFamily: "var(--font-body)" }}>
                        Business Name (as shown on W-9)
                      </label>
                      <input
                        type="text"
                        value={formData.businessNameW9}
                        onChange={(e) => setFormData({ ...formData, businessNameW9: e.target.value })}
                        placeholder="Must match W-9 form"
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#3ECF8E] focus:border-transparent outline-none"
                        style={{ fontFamily: "var(--font-body)" }}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2" style={{ fontFamily: "var(--font-body)" }}>
                        EIN (Optional)
                      </label>
                      <input
                        type="text"
                        value={formData.ein}
                        onChange={(e) => setFormData({ ...formData, ein: e.target.value })}
                        placeholder="XX-XXXXXXX"
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#3ECF8E] focus:border-transparent outline-none"
                        style={{ fontFamily: "var(--font-body)" }}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2" style={{ fontFamily: "var(--font-body)" }}>
                        Upload W-9 Form (PDF)
                      </label>
                      <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center hover:border-[#3ECF8E] transition-colors cursor-pointer">
                        <input
                          type="file"
                          accept=".pdf"
                          onChange={handleW9Upload}
                          className="hidden"
                          id="w9-upload"
                        />
                        <label htmlFor="w9-upload" className="cursor-pointer block">
                          <Upload size={32} className="mx-auto text-slate-400 mb-2" />
                          <p className="text-sm text-slate-600 mb-1" style={{ fontFamily: "var(--font-body)" }}>
                            Click to upload or drag and drop
                          </p>
                          <p className="text-xs text-slate-500" style={{ fontFamily: "var(--font-body)" }}>
                            PDF only (Max 10MB)
                          </p>
                        </label>
                      </div>
                      {w9Uploaded && formData.w9File && (
                        <div className="mt-4 flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                          <div className="flex items-center gap-2">
                            <FileText size={16} className="text-green-600" />
                            <span className="text-sm text-green-900" style={{ fontFamily: "var(--font-body)" }}>
                              {formData.w9File.name}
                            </span>
                          </div>
                          <CheckCircle size={20} className="text-green-600" />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 5: Review & Activate */}
              {currentStep === 5 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900 mb-2" style={{ fontFamily: "var(--font-display)" }}>
                      {steps[4].title}
                    </h2>
                    <p className="text-slate-600 mb-4" style={{ fontFamily: "var(--font-body)" }}>
                      {steps[4].description}
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="bg-slate-50 rounded-lg p-6">
                      <h3 className="font-bold text-slate-900 mb-4" style={{ fontFamily: "var(--font-display)" }}>
                        Business Information
                      </h3>
                      <div className="space-y-2 text-sm">
                        <p className="text-slate-700" style={{ fontFamily: "var(--font-body)" }}>
                          <span className="font-medium">Business Name:</span> {formData.businessName}
                        </p>
                        <p className="text-slate-700" style={{ fontFamily: "var(--font-body)" }}>
                          <span className="font-medium">Service Type:</span> {formData.serviceType}
                        </p>
                        <p className="text-slate-700" style={{ fontFamily: "var(--font-body)" }}>
                          <span className="font-medium">Contact:</span> {formData.contactName}
                        </p>
                      </div>
                    </div>

                    <div className="bg-slate-50 rounded-lg p-6">
                      <h3 className="font-bold text-slate-900 mb-4" style={{ fontFamily: "var(--font-display)" }}>
                        Service Areas
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {formData.serviceAreas.map((area) => (
                          <span
                            key={area}
                            className="px-3 py-1 rounded-full bg-[#3ECF8E]/10 text-[#3ECF8E] text-sm font-medium"
                          >
                            {area}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex gap-3">
                      <CheckCircle size={20} className="text-green-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-bold text-green-900" style={{ fontFamily: "var(--font-body)" }}>
                          All information verified
                        </p>
                        <p className="text-sm text-green-800 mt-1" style={{ fontFamily: "var(--font-body)" }}>
                          Banking details are encrypted. W-9 form stored securely.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="flex gap-4 mt-8">
            <button
              onClick={handlePrev}
              disabled={currentStep === 1}
              className="flex items-center gap-2 px-6 py-3 border border-slate-300 text-slate-700 rounded-lg font-medium hover:bg-slate-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ fontFamily: "var(--font-body)" }}
            >
              <ChevronLeft size={18} />
              Previous
            </button>

            {currentStep < steps.length ? (
              <button
                onClick={handleNext}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-[#3ECF8E] text-white rounded-lg font-medium hover:bg-[#2FBF9B] transition-all"
                style={{ fontFamily: "var(--font-body)" }}
              >
                Next
                <ChevronRight size={18} />
              </button>
            ) : (
              <button
                onClick={handleComplete}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-[#3ECF8E] text-white rounded-lg font-medium hover:bg-[#2FBF9B] transition-all"
                style={{ fontFamily: "var(--font-body)" }}
              >
                <CheckCircle size={18} />
                Activate Account
              </button>
            )}
          </div>

          {/* Status Info */}
          <div className="mt-8 p-4 bg-slate-50 rounded-lg border border-slate-200">
            <p className="text-sm text-slate-600" style={{ fontFamily: "var(--font-body)" }}>
              <span className="font-medium">Current Status:</span>{" "}
              {currentStep < 5 ? "Pending Setup" : "Ready to Activate"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
