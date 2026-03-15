import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Vendors from "./pages/Vendors";
import Maintenance from "./pages/Maintenance";
import VendorOnboarding from "./pages/VendorOnboarding";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Onboarding from "./pages/Onboarding";
import Dashboard from "./pages/Dashboard";
import Properties from "./pages/Properties";
import PropertyDetail from "./pages/PropertyDetail";
import TenantProfile from "./pages/TenantProfile";
import Payments from "./pages/Payments";
import Tenants from "./pages/Tenants";
import TenantDashboard from "./pages/TenantDashboard";
import InvestorDashboard from "./pages/InvestorDashboard";
import VendorDashboard from "./pages/VendorDashboard";
import AccountantDashboard from "./pages/AccountantDashboard";
import UserManagement from "./pages/UserManagement";
import UserManagementAdmin from "./pages/UserManagementAdmin";
import NotificationCenter from "./pages/NotificationCenter";
import NotificationCenterAdvanced from "./pages/NotificationCenterAdvanced";
import AIInsights from "./pages/AIInsights";
import MaintenanceWorkflow from "./pages/MaintenanceWorkflow";
import AutomationRules from "./pages/AutomationRules";
import Reports from "./pages/Reports";
import BankConnection from "./pages/BankConnection";
import AICommandBar from "./components/AICommandBar";

function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/vendors"} component={Vendors} />
      <Route path={"/maintenance"} component={Maintenance} />
      <Route path={"/vendor-onboarding"} component={VendorOnboarding} />
      <Route path={"/404"} component={NotFound} />
      <Route path={"/login"} component={Login} />
      <Route path={"/onboarding"} component={Onboarding} />
      <Route path={"/dashboard"} component={Dashboard} />
      <Route path={"/properties"} component={Properties} />
      <Route path={"/properties/:id"} component={PropertyDetail} />
      <Route path={"/tenants/:id"} component={TenantProfile} />
      <Route path={"/payments"} component={Payments} />
      <Route path={"/tenants"} component={Tenants} />
      <Route path={"/tenant-dashboard"} component={TenantDashboard} />
      <Route path={"/investor-dashboard"} component={InvestorDashboard} />
      <Route path={"/vendor-dashboard"} component={VendorDashboard} />
      <Route path={"/accountant-dashboard"} component={AccountantDashboard} />
      <Route path={"/user-management"} component={UserManagement} />
      <Route path={"/notifications"} component={NotificationCenter} />
      <Route path={"/ai-insights"} component={AIInsights} />
      <Route path={"/maintenance-workflow"} component={MaintenanceWorkflow} />
      <Route path={"/automation-rules"} component={AutomationRules} />
      <Route path={"/reports"} component={Reports} />
      <Route path={"/bank-connection"} component={BankConnection} />
      <Route path={"/user-management-admin"} component={UserManagementAdmin} />
      <Route path={"/notification-center-advanced"} component={NotificationCenterAdvanced} />
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Router />
          <AICommandBar />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
