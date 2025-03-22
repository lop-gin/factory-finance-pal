
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./components/auth/AuthProvider";

// Auth pages
import LoginPage from "./pages/auth/login";
import RegisterPage from "./pages/auth/register";
import ForgotPasswordPage from "./pages/auth/forgot-password";
import ResetPasswordPage from "./pages/auth/reset-password";
import LandingPage from "./pages/landing";
import DashboardLayout from "./layouts/DashboardLayout";
import DashboardPage from "./pages/dashboard";

// Admin pages
import EmployeesPage from "./pages/dashboard/employees";
import RolesPage from "./pages/dashboard/roles";
import CustomersPage from "./pages/dashboard/customers";

// Protected route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/auth/login" replace />;
  }

  return <>{children}</>;
};

// Auth layout wrapper
const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-indigo-100 p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg overflow-hidden">
        {children}
      </div>
    </div>
  );
};

function App() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<LandingPage />} />
      
      {/* Auth routes with layout */}
      <Route path="/auth/login" element={<AuthLayout><LoginPage /></AuthLayout>} />
      <Route path="/auth/register" element={<AuthLayout><RegisterPage /></AuthLayout>} />
      <Route path="/auth/forgot-password" element={<AuthLayout><ForgotPasswordPage /></AuthLayout>} />
      <Route path="/auth/reset-password" element={<AuthLayout><ResetPasswordPage /></AuthLayout>} />
      
      {/* Protected dashboard routes */}
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <DashboardLayout />
        </ProtectedRoute>
      }>
        <Route index element={<DashboardPage />} />
        
        {/* Admin routes */}
        <Route path="employees" element={<EmployeesPage />} />
        <Route path="roles" element={<RolesPage />} />
        <Route path="customers" element={<CustomersPage />} />
        
        {/* Original routes - kept for compatibility */}
        <Route path="sales/invoice" element={<div>Invoice Form - Coming Soon</div>} />
        <Route path="sales/receipt" element={<div>Sales Receipt Form - Coming Soon</div>} />
        <Route path="sales/credit-note" element={<div>Credit Note Form - Coming Soon</div>} />
        <Route path="sales/payment" element={<div>Payment Form - Coming Soon</div>} />
        <Route path="sales/estimate" element={<div>Estimate Form - Coming Soon</div>} />
        <Route path="sales/refund-receipt" element={<div>Refund Receipt Form - Coming Soon</div>} />
      </Route>

      {/* Catch-all redirect to 404 or home */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
