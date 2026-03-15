/*
 * AI Automation Engine
 * Manages automated workflows: rent reminders, vendor recommendations, expense categorization, lease renewals
 */

export interface AutomationRule {
  id: string;
  name: string;
  description: string;
  trigger: "daily" | "weekly" | "on-event" | "threshold";
  condition?: {
    field: string;
    operator: "equals" | "greater-than" | "less-than" | "contains";
    value: any;
  };
  actions: AutomationAction[];
  enabled: boolean;
  lastRun?: Date;
}

export interface AutomationAction {
  type: "send-notification" | "send-email" | "create-task" | "update-record" | "categorize-expense" | "recommend-vendor";
  payload: Record<string, any>;
}

export interface AutomationResult {
  ruleId: string;
  success: boolean;
  message: string;
  affectedRecords: number;
  timestamp: Date;
}

// Predefined automation rules
export const automationRules: AutomationRule[] = [
  {
    id: "rent-reminder-5days",
    name: "Rent Reminder (5 Days Before)",
    description: "Send rent reminders 5 days before due date",
    trigger: "daily",
    actions: [
      {
        type: "send-email",
        payload: {
          template: "rent-reminder",
          subject: "Rent Payment Reminder",
          daysBeforeDue: 5,
        },
      },
    ],
    enabled: true,
  },

  {
    id: "rent-reminder-overdue",
    name: "Overdue Rent Alert",
    description: "Send alert 1 day after rent is overdue",
    trigger: "daily",
    actions: [
      {
        type: "send-email",
        payload: {
          template: "overdue-rent",
          subject: "Rent Payment Overdue",
          daysOverdue: 1,
        },
      },
      {
        type: "create-task",
        payload: {
          title: "Follow up on overdue rent",
          priority: "high",
          dueDate: "tomorrow",
        },
      },
    ],
    enabled: true,
  },

  {
    id: "lease-renewal-60days",
    name: "Lease Renewal (60 Days Before)",
    description: "Identify and notify about leases expiring in 60 days",
    trigger: "daily",
    actions: [
      {
        type: "send-notification",
        payload: {
          title: "Lease Renewal Opportunity",
          message: "Start renewal discussions for upcoming lease expirations",
          priority: "medium",
        },
      },
      {
        type: "create-task",
        payload: {
          title: "Initiate lease renewal discussion",
          daysBeforeExpiry: 60,
          priority: "medium",
        },
      },
    ],
    enabled: true,
  },

  {
    id: "low-occupancy-alert",
    name: "Low Occupancy Alert",
    description: "Alert when property occupancy falls below 90%",
    trigger: "threshold",
    condition: {
      field: "occupancy_rate",
      operator: "less-than",
      value: 0.9,
    },
    actions: [
      {
        type: "send-notification",
        payload: {
          title: "Low Occupancy Alert",
          message: "Property occupancy below target",
          priority: "high",
        },
      },
      {
        type: "create-task",
        payload: {
          title: "Review marketing strategy",
          priority: "high",
        },
      },
    ],
    enabled: true,
  },

  {
    id: "high-maintenance-cost",
    name: "High Maintenance Cost Alert",
    description: "Alert when maintenance costs exceed average by 20%",
    trigger: "threshold",
    condition: {
      field: "maintenance_cost_variance",
      operator: "greater-than",
      value: 0.2,
    },
    actions: [
      {
        type: "send-notification",
        payload: {
          title: "High Maintenance Costs",
          message: "Maintenance expenses above average",
          priority: "medium",
        },
      },
      {
        type: "create-task",
        payload: {
          title: "Schedule maintenance review",
          priority: "medium",
        },
      },
    ],
    enabled: true,
  },

  {
    id: "auto-expense-categorization",
    name: "Automatic Expense Categorization",
    description: "Automatically categorize expenses based on description and vendor",
    trigger: "on-event",
    actions: [
      {
        type: "categorize-expense",
        payload: {
          rules: [
            { keyword: "plumb", category: "Plumbing" },
            { keyword: "electric", category: "Electrical" },
            { keyword: "hvac", category: "HVAC" },
            { keyword: "roof", category: "Roofing" },
            { keyword: "landscape", category: "Landscaping" },
            { keyword: "clean", category: "Cleaning" },
            { keyword: "legal", category: "Legal" },
          ],
        },
      },
    ],
    enabled: true,
  },

  {
    id: "vendor-recommendation",
    name: "Vendor Recommendation Engine",
    description: "Recommend vendors based on service type, location, and performance",
    trigger: "on-event",
    actions: [
      {
        type: "recommend-vendor",
        payload: {
          criteria: ["rating", "response_time", "cost", "location_match"],
          topN: 3,
        },
      },
    ],
    enabled: true,
  },
];

// AI Automation Engine
export class AIAutomationEngine {
  private rules: AutomationRule[] = automationRules;
  private executionHistory: AutomationResult[] = [];

  constructor() {
    this.initializeRules();
  }

  private initializeRules() {
    // Load saved rules from localStorage
    const saved = localStorage.getItem("automation_rules");
    if (saved) {
      try {
        this.rules = JSON.parse(saved);
      } catch (e) {
        console.error("Failed to load automation rules", e);
      }
    }
  }

  /**
   * Execute a specific automation rule
   */
  async executeRule(ruleId: string): Promise<AutomationResult> {
    const rule = this.rules.find((r) => r.id === ruleId);
    if (!rule || !rule.enabled) {
      return {
        ruleId,
        success: false,
        message: "Rule not found or disabled",
        affectedRecords: 0,
        timestamp: new Date(),
      };
    }

    try {
      let affectedRecords = 0;

      // Execute each action in the rule
      for (const action of rule.actions) {
        affectedRecords += await this.executeAction(action, rule);
      }

      const result: AutomationResult = {
        ruleId,
        success: true,
        message: `Rule executed successfully. ${affectedRecords} records affected.`,
        affectedRecords,
        timestamp: new Date(),
      };

      this.executionHistory.push(result);
      rule.lastRun = new Date();

      return result;
    } catch (error) {
      const result: AutomationResult = {
        ruleId,
        success: false,
        message: `Error executing rule: ${error instanceof Error ? error.message : "Unknown error"}`,
        affectedRecords: 0,
        timestamp: new Date(),
      };

      this.executionHistory.push(result);
      return result;
    }
  }

  /**
   * Execute a specific automation action
   */
  private async executeAction(action: AutomationAction, rule: AutomationRule): Promise<number> {
    switch (action.type) {
      case "send-notification":
        return this.sendNotification(action.payload);

      case "send-email":
        return this.sendEmail(action.payload);

      case "create-task":
        return this.createTask(action.payload);

      case "update-record":
        return this.updateRecord(action.payload);

      case "categorize-expense":
        return this.categorizeExpense(action.payload);

      case "recommend-vendor":
        return this.recommendVendor(action.payload);

      default:
        return 0;
    }
  }

  private async sendNotification(payload: Record<string, any>): Promise<number> {
    console.log("Sending notification:", payload);
    // Simulate notification sending
    return 1;
  }

  private async sendEmail(payload: Record<string, any>): Promise<number> {
    console.log("Sending email:", payload);
    // Simulate email sending
    return 1;
  }

  private async createTask(payload: Record<string, any>): Promise<number> {
    console.log("Creating task:", payload);
    // Simulate task creation
    return 1;
  }

  private async updateRecord(payload: Record<string, any>): Promise<number> {
    console.log("Updating record:", payload);
    // Simulate record update
    return 1;
  }

  private async categorizeExpense(payload: Record<string, any>): Promise<number> {
    console.log("Categorizing expense:", payload);
    // Simulate expense categorization
    return 1;
  }

  private async recommendVendor(payload: Record<string, any>): Promise<number> {
    console.log("Recommending vendor:", payload);
    // Simulate vendor recommendation
    return 1;
  }

  /**
   * Get all automation rules
   */
  getRules(): AutomationRule[] {
    return this.rules;
  }

  /**
   * Enable/disable a rule
   */
  toggleRule(ruleId: string, enabled: boolean): void {
    const rule = this.rules.find((r) => r.id === ruleId);
    if (rule) {
      rule.enabled = enabled;
      this.saveRules();
    }
  }

  /**
   * Get execution history
   */
  getExecutionHistory(): AutomationResult[] {
    return this.executionHistory;
  }

  /**
   * Save rules to localStorage
   */
  private saveRules(): void {
    localStorage.setItem("automation_rules", JSON.stringify(this.rules));
  }

  /**
   * Get automation insights
   */
  getInsights() {
    return {
      totalRules: this.rules.length,
      enabledRules: this.rules.filter((r) => r.enabled).length,
      totalExecutions: this.executionHistory.length,
      successfulExecutions: this.executionHistory.filter((r) => r.success).length,
      failedExecutions: this.executionHistory.filter((r) => !r.success).length,
      lastExecution: this.executionHistory[this.executionHistory.length - 1]?.timestamp,
    };
  }
}

// Singleton instance
export const automationEngine = new AIAutomationEngine();
