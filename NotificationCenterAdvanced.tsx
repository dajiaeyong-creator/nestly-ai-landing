/**
 * Notification Center
 * Aggregates system alerts and updates with filtering and actions
 */

import { motion } from "framer-motion";
import {
  Bell,
  AlertCircle,
  CheckCircle,
  Clock,
  FileText,
  AlertTriangle,
  Filter,
  X,
  Eye,
  CheckSquare,
  Send,
  Archive,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

interface Notification {
  id: string;
  type: "late_rent" | "maintenance" | "lease" | "invoice" | "system";
  priority: "critical" | "high" | "medium" | "low";
  title: string;
  description: string;
  timestamp: string;
  property?: string;
  tenant?: string;
  relatedId?: string;
  read: boolean;
  action?: {
    label: string;
    type: "view_tenant" | "approve_invoice" | "send_reminder" | "view_property";
  };
}

const NOTIFICATIONS: Notification[] = [
  {
    id: "1",
    type: "late_rent",
    priority: "critical",
    title: "Late Rent Payment - Unit 4B",
    description: "Rent payment for Unit 4B at Downtown Plaza is 5 days overdue",
    timestamp: "2026-03-07T08:30:00",
    property: "Downtown Plaza",
    tenant: "James Wilson",
    relatedId: "tenant-123",
    read: false,
    action: {
      label: "View Tenant",
      type: "view_tenant",
    },
  },
  {
    id: "2",
    type: "maintenance",
    priority: "high",
    title: "Maintenance Request Completed",
    description: "HVAC repair completed at Riverside Apartments Unit 201",
    timestamp: "2026-03-07T07:15:00",
    property: "Riverside Apartments",
    tenant: "Sarah Johnson",
    relatedId: "maintenance-456",
    read: false,
    action: {
      label: "Approve Invoice",
      type: "approve_invoice",
    },
  },
  {
    id: "3",
    type: "invoice",
    priority: "high",
    title: "Vendor Invoice Awaiting Approval",
    description: "Invoice #INV-2026-0847 from ProFix Plumbing for $450.00",
    timestamp: "2026-03-07T06:45:00",
    property: "Downtown Plaza",
    relatedId: "invoice-789",
    read: false,
    action: {
      label: "Approve Invoice",
      type: "approve_invoice",
    },
  },
  {
    id: "4",
    type: "lease",
    priority: "medium",
    title: "Lease Expiration Reminder",
    description: "Lease for Unit 3A expires in 30 days (2026-04-06)",
    timestamp: "2026-03-06T14:20:00",
    property: "Sunset Heights",
    tenant: "Michael Chen",
    relatedId: "lease-321",
    read: false,
    action: {
      label: "Send Reminder",
      type: "send_reminder",
    },
  },
  {
    id: "5",
    type: "maintenance",
    priority: "medium",
    title: "New Maintenance Request",
    description: "Plumbing issue reported at Downtown Plaza Unit 2C",
    timestamp: "2026-03-06T10:30:00",
    property: "Downtown Plaza",
    tenant: "Emma Davis",
    relatedId: "maintenance-654",
    read: true,
    action: {
      label: "View Property",
      type: "view_property",
    },
  },
  {
    id: "6",
    type: "system",
    priority: "low",
    title: "Monthly Report Ready",
    description: "Your March financial report is ready for download",
    timestamp: "2026-03-05T09:00:00",
    read: true,
  },
  {
    id: "7",
    type: "late_rent",
    priority: "high",
    title: "Late Rent Payment - Unit 1A",
    description: "Rent payment for Unit 1A at Riverside Apartments is 3 days overdue",
    timestamp: "2026-03-05T15:45:00",
    property: "Riverside Apartments",
    tenant: "Robert Martinez",
    relatedId: "tenant-234",
    read: true,
    action: {
      label: "View Tenant",
      type: "view_tenant",
    },
  },
  {
    id: "8",
    type: "lease",
    priority: "low",
    title: "Lease Renewal Opportunity",
    description: "Consider offering renewal incentives for Unit 5B",
    timestamp: "2026-03-04T11:00:00",
    property: "Sunset Heights",
    read: true,
  },
];

export default function NotificationCenterAdvanced() {
  const [notifications, setNotifications] = useState<Notification[]>(NOTIFICATIONS);
  const [filterPriority, setFilterPriority] = useState<string>("all");
  const [filterType, setFilterType] = useState<string>("all");
  const [filterProperty, setFilterProperty] = useState<string>("all");
  const [showUnreadOnly, setShowUnreadOnly] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null);

  const getNotificationIcon = (type: string) => {
    const icons: Record<string, React.ReactNode> = {
      late_rent: <AlertTriangle className="text-red-500" size={20} />,
      maintenance: <Clock className="text-blue-500" size={20} />,
      lease: <FileText className="text-orange-500" size={20} />,
      invoice: <CheckCircle className="text-green-500" size={20} />,
      system: <Bell className="text-slate-500" size={20} />,
    };
    return icons[type] || <Bell size={20} />;
  };

  const getPriorityColor = (priority: string) => {
    const colors: Record<string, string> = {
      critical: "bg-red-100 text-red-700 border-red-300",
      high: "bg-orange-100 text-orange-700 border-orange-300",
      medium: "bg-yellow-100 text-yellow-700 border-yellow-300",
      low: "bg-green-100 text-green-700 border-green-300",
    };
    return colors[priority] || "bg-slate-100 text-slate-700";
  };

  const getPriorityBadgeColor = (priority: string) => {
    const colors: Record<string, string> = {
      critical: "bg-red-500",
      high: "bg-orange-500",
      medium: "bg-yellow-500",
      low: "bg-green-500",
    };
    return colors[priority] || "bg-slate-500";
  };

  const filteredNotifications = notifications.filter((notif) => {
    const priorityMatch = filterPriority === "all" || notif.priority === filterPriority;
    const typeMatch = filterType === "all" || notif.type === filterType;
    const propertyMatch =
      filterProperty === "all" || notif.property === filterProperty;
    const readMatch = !showUnreadOnly || !notif.read;
    return priorityMatch && typeMatch && propertyMatch && readMatch;
  });

  const unreadCount = notifications.filter((n) => !n.read).length;
  const properties = Array.from(
    new Set(notifications.filter((n) => n.property).map((n) => n.property))
  );

  const handleMarkAsRead = (id: string) => {
    setNotifications(
      notifications.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
    toast.success("Notification marked as read");
  };

  const handleArchive = (id: string) => {
    setNotifications(notifications.filter((n) => n.id !== id));
    toast.success("Notification archived");
  };

  const handleAction = (notification: Notification) => {
    if (!notification.action) return;

    switch (notification.action.type) {
      case "view_tenant":
        toast.success(`Viewing tenant profile for ${notification.tenant}`);
        break;
      case "approve_invoice":
        toast.success("Invoice approved and payment processed");
        handleArchive(notification.id);
        break;
      case "send_reminder":
        toast.success(`Reminder sent to ${notification.tenant}`);
        break;
      case "view_property":
        toast.success(`Viewing property: ${notification.property}`);
        break;
    }
    handleMarkAsRead(notification.id);
  };

  const handleMarkAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
    toast.success("All notifications marked as read");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-lg relative">
                <Bell className="text-white" size={24} />
                {unreadCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                    {unreadCount}
                  </span>
                )}
              </div>
              <div>
                <h1 className="text-3xl font-bold text-slate-900">
                  Notification Center
                </h1>
                <p className="text-slate-600">
                  {unreadCount} unread notifications
                </p>
              </div>
            </div>
            {unreadCount > 0 && (
              <Button
                onClick={handleMarkAllAsRead}
                className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white gap-2"
              >
                <CheckSquare size={20} />
                Mark All as Read
              </Button>
            )}
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8"
        >
          {[
            {
              label: "Total Notifications",
              value: notifications.length,
              color: "from-slate-400 to-slate-600",
            },
            {
              label: "Unread",
              value: unreadCount,
              color: "from-red-400 to-red-600",
            },
            {
              label: "Critical",
              value: notifications.filter((n) => n.priority === "critical").length,
              color: "from-orange-400 to-orange-600",
            },
            {
              label: "Properties",
              value: properties.length,
              color: "from-green-400 to-green-600",
            },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 + index * 0.05 }}
              className={`bg-gradient-to-br ${stat.color} rounded-xl p-6 text-white shadow-lg`}
            >
              <p className="text-sm font-medium opacity-90">{stat.label}</p>
              <p className="text-3xl font-bold mt-2">{stat.value}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl shadow-md p-6 mb-6"
        >
          <div className="flex items-center gap-2 mb-4">
            <Filter size={20} className="text-slate-600" />
            <h2 className="text-lg font-semibold text-slate-900">Filters</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Priority
              </label>
              <select
                value={filterPriority}
                onChange={(e) => setFilterPriority(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Priorities</option>
                <option value="critical">Critical</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Type
              </label>
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Types</option>
                <option value="late_rent">Late Rent</option>
                <option value="maintenance">Maintenance</option>
                <option value="lease">Lease</option>
                <option value="invoice">Invoice</option>
                <option value="system">System</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Property
              </label>
              <select
                value={filterProperty}
                onChange={(e) => setFilterProperty(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Properties</option>
                {properties.map((prop) => (
                  <option key={prop} value={prop}>
                    {prop}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-end">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={showUnreadOnly}
                  onChange={(e) => setShowUnreadOnly(e.target.checked)}
                  className="w-4 h-4 rounded border-slate-300"
                />
                <span className="text-sm font-medium text-slate-700">
                  Unread Only
                </span>
              </label>
            </div>
          </div>
        </motion.div>

        {/* Notifications List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-4"
        >
          {filteredNotifications.length === 0 ? (
            <div className="bg-white rounded-xl shadow-md p-12 text-center">
              <Bell size={48} className="mx-auto text-slate-300 mb-4" />
              <p className="text-slate-600 text-lg">No notifications found</p>
            </div>
          ) : (
            filteredNotifications.map((notification, index) => (
              <motion.div
                key={notification.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.05 }}
                className={`bg-white rounded-xl shadow-md p-6 border-l-4 ${
                  !notification.read ? "border-blue-500 bg-blue-50" : "border-slate-200"
                } hover:shadow-lg transition-shadow`}
              >
                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <div className="flex-shrink-0 mt-1">
                    {getNotificationIcon(notification.type)}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-lg font-semibold text-slate-900">
                            {notification.title}
                          </h3>
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(
                              notification.priority
                            )}`}
                          >
                            {notification.priority.charAt(0).toUpperCase() +
                              notification.priority.slice(1)}
                          </span>
                          {!notification.read && (
                            <span className={`w-2 h-2 rounded-full ${getPriorityBadgeColor(notification.priority)}`} />
                          )}
                        </div>

                        <p className="text-slate-600 mb-2">
                          {notification.description}
                        </p>

                        <div className="flex flex-wrap items-center gap-3 text-sm text-slate-500">
                          {notification.property && (
                            <span>📍 {notification.property}</span>
                          )}
                          {notification.tenant && (
                            <span>👤 {notification.tenant}</span>
                          )}
                          <span>🕐 {new Date(notification.timestamp).toLocaleString()}</span>
                        </div>
                      </div>

                      {/* Priority Indicator */}
                      <div className="flex-shrink-0">
                        <div
                          className={`w-10 h-10 rounded-lg flex items-center justify-center ${getPriorityColor(
                            notification.priority
                          )}`}
                        >
                          <AlertCircle size={20} />
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 mt-4 pt-4 border-t border-slate-200">
                      {notification.action && (
                        <Button
                          onClick={() => handleAction(notification)}
                          className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white gap-2 text-sm"
                        >
                          <Eye size={16} />
                          {notification.action.label}
                        </Button>
                      )}

                      {!notification.read && (
                        <button
                          onClick={() => handleMarkAsRead(notification.id)}
                          className="px-3 py-2 text-sm text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                        >
                          <CheckSquare size={16} className="inline mr-1" />
                          Mark as Read
                        </button>
                      )}

                      <button
                        onClick={() => handleArchive(notification.id)}
                        className="px-3 py-2 text-sm text-slate-600 hover:bg-slate-100 rounded-lg transition-colors ml-auto"
                      >
                        <Archive size={16} className="inline mr-1" />
                        Archive
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </motion.div>
      </div>
    </div>
  );
}
