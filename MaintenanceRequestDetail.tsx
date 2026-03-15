/*
 * Maintenance Request Detail
 * Shows detailed status, timeline, vendor info, and communication
 */

import { motion } from "framer-motion";
import { X, MapPin, Phone, Mail, MessageCircle, CheckCircle, Clock, AlertCircle, User } from "lucide-react";
import { useState } from "react";

interface MaintenanceRequestDetailProps {
  request: {
    id: number;
    issue: string;
    description: string;
    status: "Pending" | "In Progress" | "Completed" | "On Hold";
    date: string;
    vendor?: {
      name: string;
      phone: string;
      email: string;
      rating: number;
    };
    timeline: Array<{
      date: string;
      status: string;
      description: string;
      completed: boolean;
    }>;
    estimatedCompletion?: string;
    cost?: string;
  };
  onClose: () => void;
}

export default function MaintenanceRequestDetail({ request, onClose }: MaintenanceRequestDetailProps) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Array<{ sender: string; text: string; time: string }>>([
    { sender: "Vendor", text: "I'll be there on Friday at 2 PM", time: "Feb 27, 2:30 PM" },
    { sender: "You", text: "Perfect! Please let me know if you need anything before then.", time: "Feb 27, 3:15 PM" },
  ]);

  const handleSendMessage = () => {
    if (message.trim()) {
      setMessages([...messages, { sender: "You", text: message, time: new Date().toLocaleString() }]);
      setMessage("");
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "text-[#3ECF8E] bg-[#3ECF8E]/10";
      case "In Progress":
        return "text-[#F59E0B] bg-[#F59E0B]/10";
      case "Pending":
        return "text-slate-600 bg-slate-100";
      case "On Hold":
        return "text-red-600 bg-red-100";
      default:
        return "text-slate-600 bg-slate-100";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Completed":
        return <CheckCircle size={20} className="text-[#3ECF8E]" />;
      case "In Progress":
        return <Clock size={20} className="text-[#F59E0B]" />;
      case "On Hold":
        return <AlertCircle size={20} className="text-red-600" />;
      default:
        return <Clock size={20} className="text-slate-600" />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="bg-white rounded-2xl shadow-lg p-6 space-y-6"
    >
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h2 className="text-2xl font-bold text-slate-900" style={{ fontFamily: "var(--font-display)" }}>
              {request.issue}
            </h2>
            <span className={`inline-flex items-center gap-2 px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(request.status)}`}>
              {getStatusIcon(request.status)}
              {request.status}
            </span>
          </div>
          <p className="text-sm text-slate-600" style={{ fontFamily: "var(--font-body)" }}>
            Requested on {request.date}
          </p>
        </div>
        <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
          <X size={20} className="text-slate-600" />
        </button>
      </div>

      {/* Description */}
      <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
        <p className="text-sm text-slate-600 mb-2" style={{ fontFamily: "var(--font-body)" }}>
          Issue Description
        </p>
        <p className="text-slate-900" style={{ fontFamily: "var(--font-body)" }}>
          {request.description}
        </p>
      </div>

      {/* Vendor Info */}
      {request.vendor && (
        <div className="p-4 bg-gradient-to-br from-[#3ECF8E]/10 to-[#2FBF9B]/10 rounded-lg border border-[#3ECF8E]/20">
          <p className="text-sm text-slate-600 mb-3" style={{ fontFamily: "var(--font-body)" }}>
            Assigned Vendor
          </p>
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-semibold text-slate-900 mb-2" style={{ fontFamily: "var(--font-display)" }}>
                {request.vendor.name}
              </h3>
              <div className="space-y-1 text-sm text-slate-600" style={{ fontFamily: "var(--font-body)" }}>
                <div className="flex items-center gap-2">
                  <Phone size={16} />
                  {request.vendor.phone}
                </div>
                <div className="flex items-center gap-2">
                  <Mail size={16} />
                  {request.vendor.email}
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-1 justify-end mb-2">
                <span className="text-sm font-semibold text-slate-900">{request.vendor.rating}</span>
                <span className="text-yellow-400">★</span>
              </div>
              <p className="text-xs text-slate-600">Rating</p>
            </div>
          </div>
        </div>
      )}

      {/* Timeline */}
      <div>
        <p className="text-sm font-semibold text-slate-900 mb-4" style={{ fontFamily: "var(--font-body)" }}>
          Progress Timeline
        </p>
        <div className="space-y-3">
          {request.timeline.map((item, idx) => (
            <div key={idx} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    item.completed ? "bg-[#3ECF8E] text-white" : "bg-slate-200 text-slate-600"
                  }`}
                >
                  {item.completed ? <CheckCircle size={16} /> : <Clock size={16} />}
                </div>
                {idx < request.timeline.length - 1 && (
                  <div className={`w-0.5 h-12 ${item.completed ? "bg-[#3ECF8E]" : "bg-slate-200"}`} />
                )}
              </div>
              <div className="pb-3">
                <p className="font-semibold text-slate-900" style={{ fontFamily: "var(--font-display)" }}>
                  {item.status}
                </p>
                <p className="text-sm text-slate-600" style={{ fontFamily: "var(--font-body)" }}>
                  {item.description}
                </p>
                <p className="text-xs text-slate-500 mt-1">{item.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Estimated Completion & Cost */}
      {(request.estimatedCompletion || request.cost) && (
        <div className="grid grid-cols-2 gap-4">
          {request.estimatedCompletion && (
            <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
              <p className="text-xs text-slate-600 mb-1" style={{ fontFamily: "var(--font-body)" }}>
                Estimated Completion
              </p>
              <p className="font-semibold text-slate-900" style={{ fontFamily: "var(--font-display)" }}>
                {request.estimatedCompletion}
              </p>
            </div>
          )}
          {request.cost && (
            <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
              <p className="text-xs text-slate-600 mb-1" style={{ fontFamily: "var(--font-body)" }}>
                Estimated Cost
              </p>
              <p className="font-semibold text-slate-900" style={{ fontFamily: "var(--font-display)" }}>
                {request.cost}
              </p>
            </div>
          )}
        </div>
      )}

      {/* Messages */}
      <div className="border-t border-slate-200 pt-6">
        <p className="text-sm font-semibold text-slate-900 mb-4" style={{ fontFamily: "var(--font-body)" }}>
          Communication with Vendor
        </p>

        {/* Message List */}
        <div className="bg-slate-50 rounded-lg p-4 mb-4 space-y-3 max-h-48 overflow-y-auto">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.sender === "You" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-xs px-4 py-2 rounded-lg ${
                  msg.sender === "You"
                    ? "bg-[#3ECF8E] text-white"
                    : "bg-white border border-slate-200 text-slate-900"
                }`}
              >
                <p className="text-sm" style={{ fontFamily: "var(--font-body)" }}>
                  {msg.text}
                </p>
                <p className={`text-xs mt-1 ${msg.sender === "You" ? "text-white/70" : "text-slate-500"}`}>
                  {msg.time}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Message Input */}
        <div className="flex gap-3">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            placeholder="Send a message to the vendor..."
            className="flex-1 px-4 py-2 border border-slate-200 rounded-lg outline-none text-sm focus:border-[#3ECF8E] transition-colors"
            style={{ fontFamily: "var(--font-body)" }}
          />
          <button
            onClick={handleSendMessage}
            className="p-2 bg-[#3ECF8E] text-white rounded-lg hover:bg-[#2FBF9B] transition-colors"
          >
            <MessageCircle size={20} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
