/*
 * Maintenance Request Modal
 * Allows tenants to submit new maintenance requests with photos and descriptions
 */

import { motion, AnimatePresence } from "framer-motion";
import { X, Upload, AlertCircle, CheckCircle } from "lucide-react";
import { useState } from "react";

interface MaintenanceRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (request: MaintenanceRequest) => void;
}

export interface MaintenanceRequest {
  issueType: string;
  description: string;
  urgency: "low" | "medium" | "high";
  photos: File[];
  preferredDate?: string;
}

const issueTypes = [
  "Plumbing",
  "Electrical",
  "HVAC",
  "Appliances",
  "Flooring",
  "Walls/Paint",
  "Windows/Doors",
  "Other",
];

const urgencyLevels = [
  { value: "low", label: "Low - Can wait", color: "text-slate-600 bg-slate-100" },
  { value: "medium", label: "Medium - This week", color: "text-amber-600 bg-amber-100" },
  { value: "high", label: "High - ASAP", color: "text-red-600 bg-red-100" },
];

export default function MaintenanceRequestModal({ isOpen, onClose, onSubmit }: MaintenanceRequestModalProps) {
  const [step, setStep] = useState<"issue" | "details" | "review">("issue");
  const [formData, setFormData] = useState<MaintenanceRequest>({
    issueType: "",
    description: "",
    urgency: "medium",
    photos: [],
  });
  const [submitted, setSubmitted] = useState(false);

  const handleIssueTypeSelect = (type: string) => {
    setFormData({ ...formData, issueType: type });
    setStep("details");
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setFormData({ ...formData, photos: [...formData.photos, ...files] });
  };

  const handleRemovePhoto = (index: number) => {
    setFormData({
      ...formData,
      photos: formData.photos.filter((_, i) => i !== index),
    });
  };

  const handleSubmit = () => {
    if (formData.issueType && formData.description.trim()) {
      onSubmit(formData);
      setSubmitted(true);
      setTimeout(() => {
        setStep("issue");
        setFormData({
          issueType: "",
          description: "",
          urgency: "medium",
          photos: [],
        });
        setSubmitted(false);
        onClose();
      }, 2000);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-40"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              {/* Header */}
              <div className="sticky top-0 border-b border-slate-200 bg-white px-6 py-4 flex items-center justify-between">
                <h2 className="text-xl font-bold text-slate-900" style={{ fontFamily: "var(--font-display)" }}>
                  {submitted ? "Request Submitted!" : "Report a Maintenance Issue"}
                </h2>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-slate-100 rounded-lg transition-colors text-slate-600 hover:text-slate-900"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Content */}
              <div className="p-6">
                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                  >
                    <div className="w-16 h-16 rounded-full bg-[#3ECF8E]/10 flex items-center justify-center mx-auto mb-4">
                      <CheckCircle size={32} className="text-[#3ECF8E]" />
                    </div>
                    <h3 className="text-xl font-semibold text-slate-900 mb-2" style={{ fontFamily: "var(--font-display)" }}>
                      Request Submitted Successfully!
                    </h3>
                    <p className="text-slate-600" style={{ fontFamily: "var(--font-body)" }}>
                      A vendor will be assigned and you'll receive updates via email.
                    </p>
                  </motion.div>
                ) : step === "issue" ? (
                  <div className="space-y-4">
                    <p className="text-sm text-slate-600" style={{ fontFamily: "var(--font-body)" }}>
                      What type of issue are you experiencing?
                    </p>
                    <div className="grid grid-cols-2 gap-3">
                      {issueTypes.map((type) => (
                        <button
                          key={type}
                          onClick={() => handleIssueTypeSelect(type)}
                          className={`p-4 rounded-lg border-2 transition-all text-left font-medium ${
                            formData.issueType === type
                              ? "border-[#3ECF8E] bg-[#3ECF8E]/10 text-[#3ECF8E]"
                              : "border-slate-200 bg-white text-slate-900 hover:border-slate-300"
                          }`}
                          style={{ fontFamily: "var(--font-body)" }}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : step === "details" ? (
                  <div className="space-y-6">
                    {/* Issue Type Display */}
                    <div className="p-4 bg-[#3ECF8E]/10 rounded-lg border border-[#3ECF8E]/20">
                      <p className="text-sm text-slate-600 mb-1" style={{ fontFamily: "var(--font-body)" }}>
                        Issue Type
                      </p>
                      <p className="font-semibold text-slate-900" style={{ fontFamily: "var(--font-display)" }}>
                        {formData.issueType}
                      </p>
                    </div>

                    {/* Description */}
                    <div>
                      <label className="block text-sm font-medium text-slate-900 mb-2" style={{ fontFamily: "var(--font-body)" }}>
                        Describe the issue
                      </label>
                      <textarea
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        placeholder="Provide details about the problem..."
                        className="w-full px-4 py-3 border border-slate-200 rounded-lg outline-none text-slate-900 placeholder-slate-400 focus:border-[#3ECF8E] transition-colors resize-none"
                        rows={4}
                        style={{ fontFamily: "var(--font-body)" }}
                      />
                    </div>

                    {/* Urgency */}
                    <div>
                      <label className="block text-sm font-medium text-slate-900 mb-3" style={{ fontFamily: "var(--font-body)" }}>
                        How urgent is this?
                      </label>
                      <div className="grid grid-cols-3 gap-3">
                        {urgencyLevels.map(({ value, label, color }) => (
                          <button
                            key={value}
                            onClick={() => setFormData({ ...formData, urgency: value as "low" | "medium" | "high" })}
                            className={`p-3 rounded-lg border-2 transition-all text-sm font-medium ${
                              formData.urgency === value
                                ? `border-current ${color}`
                                : "border-slate-200 bg-white text-slate-900 hover:border-slate-300"
                            }`}
                            style={{ fontFamily: "var(--font-body)" }}
                          >
                            {label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Photo Upload */}
                    <div>
                      <label className="block text-sm font-medium text-slate-900 mb-2" style={{ fontFamily: "var(--font-body)" }}>
                        Add photos (optional)
                      </label>
                      <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center hover:border-[#3ECF8E] transition-colors cursor-pointer">
                        <input
                          type="file"
                          multiple
                          accept="image/*"
                          onChange={handlePhotoUpload}
                          className="hidden"
                          id="photo-upload"
                        />
                        <label htmlFor="photo-upload" className="cursor-pointer">
                          <Upload size={24} className="mx-auto mb-2 text-slate-400" />
                          <p className="text-sm text-slate-600" style={{ fontFamily: "var(--font-body)" }}>
                            Click to upload photos
                          </p>
                        </label>
                      </div>

                      {/* Photo Preview */}
                      {formData.photos.length > 0 && (
                        <div className="mt-4 grid grid-cols-4 gap-3">
                          {formData.photos.map((photo, idx) => (
                            <div key={idx} className="relative group">
                              <img
                                src={URL.createObjectURL(photo)}
                                alt={`Photo ${idx + 1}`}
                                className="w-full h-24 object-cover rounded-lg"
                              />
                              <button
                                onClick={() => handleRemovePhoto(idx)}
                                className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                              >
                                <X size={16} />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3 pt-4">
                      <button
                        onClick={() => setStep("issue")}
                        className="flex-1 px-4 py-3 border border-slate-200 rounded-lg font-medium text-slate-900 hover:bg-slate-50 transition-colors"
                        style={{ fontFamily: "var(--font-body)" }}
                      >
                        Back
                      </button>
                      <button
                        onClick={handleSubmit}
                        disabled={!formData.issueType || !formData.description.trim()}
                        className="flex-1 px-4 py-3 bg-gradient-to-r from-[#3ECF8E] to-[#2FBF9B] text-white rounded-lg font-medium hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        style={{ fontFamily: "var(--font-body)" }}
                      >
                        Submit Request
                      </button>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
