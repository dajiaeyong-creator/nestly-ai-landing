/*
 * Notification Center Page
 * Shows alerts like late rent, maintenance updates, lease expirations, vendor invoices
 */

import { motion } from "framer-motion";
import { Bell, AlertCircle, Wrench, FileText, Calendar, DollarSign, CheckCircle, Trash2, Filter } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const notifications = [
  {
    id: 1,
    type: "late_rent",
    title: "Late Rent Payment",
    description: "Downtown Apartment - Unit 4B rent payment is 5 days overdue",
    property: "Downtown Apartment",
    severity: "high",
    timestamp: "2 hours ago",
    read: false,
    icon: DollarSign,
  },
  {
    id: 2,
    type: "maintenance",
    title: "Maintenance Update",
    description: "Plumbing repair at Midtown House completed by ProFix Plumbing",
    property: "Midtown House",
    severity: "info",
    timestamp: "4 hours ago",
    read: false,
    icon: Wrench,
  },
  {
    id: 3,
    type: "lease_expiration",
    title: "Lease Expiration Coming",
    description: "Uptown Loft - Tenant lease expires in 30 days",
    property: "Uptown Loft",
    severity: "warning",
    timestamp: "1 day ago",
    read: true,
    icon: Calendar,
  },
  {
    id: 4,
    type: "vendor_invoice",
    title: "Vendor Invoice Received",
    description: "Invoice from ElectroWorks for electrical repairs - $275",
    property: "Downtown Apartment",
    severity: "info",
    timestamp: "2 days ago",
    read: true,
    icon: FileText,
  },
  {
    id: 5,
    type: "late_rent",
    title: "Rent Payment Received",
    description: "Midtown House - Rent payment of $1,800 received",
    property: "Midtown House",
    severity: "success",
    timestamp: "3 days ago",
    read: true,
    icon: CheckCircle,
  },
  {
    id: 6,
    type: "maintenance",
    title: "Maintenance Request",
    description: "New maintenance request submitted for Uptown Loft - Broken window",
    property: "Uptown Loft",
    severity: "info",
    timestamp: "4 days ago",
    read: true,
    icon: Wrench,
  },
];

export default function NotificationCenter() {
  const [notificationsList, setNotificationsList] = useState(notifications);
  const [filterType, setFilterType] = useState("all");
  const [showUnreadOnly, setShowUnreadOnly] = useState(false);

  const handleMarkAsRead = (id: number) => {
    setNotificationsList(
      notificationsList.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const handleDeleteNotification = (id: number) => {
    setNotificationsList(notificationsList.filter((n) => n.id !== id));
    toast.success("Notification deleted");
  };

  const handleMarkAllAsRead = () => {
    setNotificationsList(notificationsList.map((n) => ({ ...n, read: true })));
    toast.success("All notifications marked as read");
  };

  const filteredNotifications = notificationsList.filter((n) => {
    if (filterType !== "all" && n.type !== filterType) return false;
    if (showUnreadOnly && n.read) return false;
    return true;
  });

  const unreadCount = notificationsList.filter((n) => !n.read).length;

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "bg-red-100 border-red-200 text-red-700";
      case "warning":
        return "bg-yellow-100 border-yellow-200 text-yellow-700";
      case "success":
        return "bg-green-100 border-green-200 text-green-700";
      default:
        return "bg-blue-100 border-blue-200 text-blue-700";
    }
  };

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case "high":
        return <span className="text-xs font-semibold px-2 py-1 rounded-full bg-red-100 text-red-700">High Priority</span>;
      case "warning":
        return <span className="text-xs font-semibold px-2 py-1 rounded-full bg-yellow-100 text-yellow-700">Warning</span>;
      case "success":
        return <span className="text-xs font-semibold px-2 py-1 rounded-full bg-green-100 text-green-700">Completed</span>;
      default:
        return <span className="text-xs font-semibold px-2 py-1 rounded-full bg-blue-100 text-blue-700">Info</span>;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-slate-50 to-blue-50">
      {/* Header */}
      <div className="sticky top-0 z-20 border-b border-slate-100 bg-white/80 backdrop-blur-md shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 relative">
                <Bell size={20} className="text-white" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-900" style={{ fontFamily: "var(--font-display)" }}>
                  Notification Center
                </h1>
                <p className="text-sm text-slate-500">{unreadCount} unread notifications</p>
              </div>
            </div>
            {unreadCount > 0 && (
              <button
                onClick={handleMarkAllAsRead}
                className="px-4 py-2 text-sm font-medium text-[#3ECF8E] hover:bg-[#3ECF8E]/10 rounded-lg transition-colors"
              >
                Mark all as read
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-6">
        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between"
        >
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => setFilterType("all")}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                filterType === "all"
                  ? "bg-[#3ECF8E] text-white"
                  : "bg-white border border-slate-200 text-slate-700 hover:border-slate-300"
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilterType("late_rent")}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                filterType === "late_rent"
                  ? "bg-[#3ECF8E] text-white"
                  : "bg-white border border-slate-200 text-slate-700 hover:border-slate-300"
              }`}
            >
              Late Rent
            </button>
            <button
              onClick={() => setFilterType("maintenance")}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                filterType === "maintenance"
                  ? "bg-[#3ECF8E] text-white"
                  : "bg-white border border-slate-200 text-slate-700 hover:border-slate-300"
              }`}
            >
              Maintenance
            </button>
            <button
              onClick={() => setFilterType("lease_expiration")}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                filterType === "lease_expiration"
                  ? "bg-[#3ECF8E] text-white"
                  : "bg-white border border-slate-200 text-slate-700 hover:border-slate-300"
              }`}
            >
              Lease
            </button>
          </div>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={showUnreadOnly}
              onChange={(e) => setShowUnreadOnly(e.target.checked)}
              className="w-4 h-4 rounded border-slate-300 text-[#3ECF8E]"
            />
            <span className="text-sm font-medium text-slate-700">Unread only</span>
          </label>
        </motion.div>

        {/* Notifications List */}
        <div className="space-y-3">
          {filteredNotifications.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center py-12"
            >
              <Bell size={48} className="mx-auto text-slate-300 mb-4" />
              <p className="text-slate-600 font-medium">No notifications</p>
              <p className="text-sm text-slate-500">You're all caught up!</p>
            </motion.div>
          ) : (
            filteredNotifications.map((notification, idx) => {
              const IconComponent = notification.icon;
              return (
                <motion.div
                  key={notification.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.05 }}
                  className={`rounded-xl p-4 border-2 transition-all cursor-pointer ${
                    notification.read
                      ? "bg-white border-slate-200 hover:border-slate-300"
                      : "bg-[#3ECF8E]/5 border-[#3ECF8E]/30 hover:border-[#3ECF8E]"
                  }`}
                  onClick={() => handleMarkAsRead(notification.id)}
                >
                  <div className="flex gap-4">
                    {/* Icon */}
                    <div className={`p-3 rounded-lg flex-shrink-0 ${getSeverityColor(notification.severity)}`}>
                      <IconComponent size={20} />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h3 className={`font-semibold ${notification.read ? "text-slate-700" : "text-slate-900"}`}>
                          {notification.title}
                        </h3>
                        {!notification.read && (
                          <div className="w-2 h-2 rounded-full bg-[#3ECF8E] flex-shrink-0 mt-2" />
                        )}
                      </div>
                      <p className="text-sm text-slate-600 mb-2">{notification.description}</p>
                      <div className="flex items-center gap-3 flex-wrap">
                        <span className="text-xs text-slate-500">{notification.property}</span>
                        {getSeverityBadge(notification.severity)}
                        <span className="text-xs text-slate-500">{notification.timestamp}</span>
                      </div>
                    </div>

                    {/* Delete Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteNotification(notification.id);
                      }}
                      className="p-2 hover:bg-red-50 rounded-lg transition-colors text-red-600 flex-shrink-0"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </motion.div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
