/*
 * Eviction Workflow Modal – Legal eviction process tracking
 * Guide property managers through eviction steps with compliance tracking
 */

import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  AlertTriangle,
  FileText,
  Mail,
  Calendar,
  CheckCircle2,
  Clock,
  ChevronRight,
  Download,
  Plus,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface EvictionStep {
  id: number;
  name: string;
  description: string;
  status: "pending" | "in-progress" | "completed";
  dueDate: string;
  documents: string[];
  notes: string;
}

const evictionSteps: EvictionStep[] = [
  {
    id: 1,
    name: "Notice to Pay or Quit",
    description: "Send formal notice to tenant demanding payment or lease termination",
    status: "completed",
    dueDate: "2026-02-15",
    documents: ["Notice_to_Pay_or_Quit.pdf"],
    notes: "Notice delivered on 2026-02-15. Tenant has 3 days to respond.",
  },
  {
    id: 2,
    name: "Cure Period",
    description: "Allow tenant time to pay outstanding rent or cure lease violation",
    status: "completed",
    dueDate: "2026-02-18",
    documents: [],
    notes: "3-day cure period expired on 2026-02-18. Tenant did not pay.",
  },
  {
    id: 3,
    name: "File Eviction Lawsuit",
    description: "File formal eviction lawsuit with the court",
    status: "in-progress",
    dueDate: "2026-03-10",
    documents: ["Eviction_Complaint.pdf", "Proof_of_Service.pdf"],
    notes: "Lawsuit filed on 2026-03-01. Awaiting court hearing date.",
  },
  {
    id: 4,
    name: "Court Hearing",
    description: "Attend court hearing for eviction case",
    status: "pending",
    dueDate: "2026-03-20",
    documents: [],
    notes: "",
  },
  {
    id: 5,
    name: "Judgment & Writ of Possession",
    description: "Obtain court judgment and writ of possession if case is won",
    status: "pending",
    dueDate: "2026-03-27",
    documents: [],
    notes: "",
  },
  {
    id: 6,
    name: "Physical Eviction",
    description: "Sheriff enforces eviction and removes tenant from property",
    status: "pending",
    dueDate: "2026-04-10",
    documents: [],
    notes: "",
  },
];

const StepCard = ({
  step,
  index,
  onUpdate,
}: {
  step: EvictionStep;
  index: number;
  onUpdate: (step: EvictionStep) => void;
}) => {
  const statusColors = {
    completed: { bg: "#ECFDF5", text: "#3ECF8E", icon: CheckCircle2 },
    "in-progress": { bg: "#FEF3C7", text: "#FFA500", icon: Clock },
    pending: { bg: "#F3F4F6", text: "#6B7280", icon: Calendar },
  };

  const config = statusColors[step.status];
  const Icon = config.icon;

  const handleStatusChange = (newStatus: "pending" | "in-progress" | "completed") => {
    onUpdate({ ...step, status: newStatus });
    toast.success(`Step status updated to ${newStatus}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-white rounded-lg border border-slate-200 p-6 hover:shadow-md transition-all"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start gap-3 flex-1">
          <div
            className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{ backgroundColor: config.bg }}
          >
            <Icon size={20} style={{ color: config.text }} />
          </div>
          <div>
            <h3
              className="font-semibold text-slate-900"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Step {index + 1}: {step.name}
            </h3>
            <p className="text-sm text-slate-600 mt-1" style={{ fontFamily: "var(--font-body)" }}>
              {step.description}
            </p>
          </div>
        </div>
      </div>

      {/* Status Badge */}
      <div className="flex gap-2 mb-4">
        {["pending", "in-progress", "completed"].map((status) => (
          <button
            key={status}
            onClick={() => handleStatusChange(status as "pending" | "in-progress" | "completed")}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
              step.status === status
                ? "ring-2 ring-offset-2"
                : "opacity-50 hover:opacity-75"
            }`}
            style={{
              backgroundColor: statusColors[status as keyof typeof statusColors].bg,
              color: statusColors[status as keyof typeof statusColors].text,
              outlineColor:
                step.status === status
                  ? statusColors[status as keyof typeof statusColors].text
                  : "transparent",
            } as React.CSSProperties}
            title={`Mark as ${status}`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>

      {/* Due Date */}
      <div className="mb-4 pb-4 border-b border-slate-100">
        <p className="text-xs text-slate-500 uppercase tracking-wide" style={{ fontFamily: "var(--font-body)" }}>
          Due Date
        </p>
        <p className="text-sm font-medium text-slate-900 mt-1" style={{ fontFamily: "var(--font-display)" }}>
          {new Date(step.dueDate).toLocaleDateString()}
        </p>
      </div>

      {/* Documents */}
      {step.documents.length > 0 && (
        <div className="mb-4 pb-4 border-b border-slate-100">
          <p className="text-xs text-slate-500 uppercase tracking-wide mb-2" style={{ fontFamily: "var(--font-body)" }}>
            Documents
          </p>
          <div className="space-y-2">
            {step.documents.map((doc, idx) => (
              <div key={idx} className="flex items-center gap-2 text-sm">
                <FileText size={16} className="text-[#3ECF8E]" />
                <a href="#" className="text-[#3ECF8E] hover:underline" style={{ fontFamily: "var(--font-body)" }}>
                  {doc}
                </a>
                <Download size={14} className="text-slate-400 cursor-pointer hover:text-slate-600" />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Notes */}
      {step.notes && (
        <div>
          <p className="text-xs text-slate-500 uppercase tracking-wide mb-2" style={{ fontFamily: "var(--font-body)" }}>
            Notes
          </p>
          <p className="text-sm text-slate-700" style={{ fontFamily: "var(--font-body)" }}>
            {step.notes}
          </p>
        </div>
      )}
    </motion.div>
  );
};

export default function EvictionWorkflowModal({
  isOpen,
  onClose,
  tenantName,
}: {
  isOpen: boolean;
  onClose: () => void;
  tenantName: string;
}) {
  const [steps, setSteps] = useState(evictionSteps);

  const handleStepUpdate = (updatedStep: EvictionStep) => {
    setSteps(steps.map((s) => (s.id === updatedStep.id ? updatedStep : s)));
  };

  const completedSteps = steps.filter((s) => s.status === "completed").length;
  const totalSteps = steps.length;
  const progress = (completedSteps / totalSteps) * 100;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          >
            {/* Header */}
            <div className="sticky top-0 bg-white border-b border-slate-200 p-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center">
                  <AlertTriangle size={20} className="text-red-600" />
                </div>
                <div>
                  <h2
                    className="text-xl font-bold text-slate-900"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    Eviction Process Workflow
                  </h2>
                  <p className="text-sm text-slate-600" style={{ fontFamily: "var(--font-body)" }}>
                    {tenantName}
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-slate-100 transition-colors text-slate-600"
              >
                <X size={20} />
              </button>
            </div>

            {/* Content */}
            <div className="p-6">
              {/* Progress Bar */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-2">
                  <p
                    className="text-sm font-medium text-slate-900"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    Process Progress
                  </p>
                  <p
                    className="text-sm text-slate-600"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    {completedSteps} of {totalSteps} steps completed
                  </p>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.5 }}
                    className="h-full bg-gradient-to-r from-[#3ECF8E] to-[#2FBF9B]"
                  />
                </div>
              </div>

              {/* Warning Box */}
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8">
                <p
                  className="text-sm text-red-800"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  <strong>Important:</strong> Eviction laws vary by state and jurisdiction. Ensure all steps comply with
                  local regulations. Consult with a legal professional before proceeding.
                </p>
              </div>

              {/* Steps */}
              <div className="space-y-4">
                {steps.map((step, index) => (
                  <StepCard
                    key={step.id}
                    step={step}
                    index={index}
                    onUpdate={handleStepUpdate}
                  />
                ))}
              </div>

              {/* Action Buttons */}
              <div className="mt-8 pt-6 border-t border-slate-200 flex gap-3">
                <button
                  onClick={() => toast.success("Eviction documents downloaded")}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-200 text-slate-700 font-medium hover:bg-slate-50 transition-all"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  <Download size={18} />
                  Download All Documents
                </button>
                <button
                  onClick={() => toast.success("Eviction notice sent to legal team")}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-200 text-slate-700 font-medium hover:bg-slate-50 transition-all"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  <Mail size={18} />
                  Send to Legal Team
                </button>
                <button
                  onClick={() => toast.success("New step added to workflow")}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-200 text-slate-700 font-medium hover:bg-slate-50 transition-all ml-auto"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  <Plus size={18} />
                  Add Custom Step
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
