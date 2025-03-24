
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
import CreateRolePage from "./pages/dashboard/roles/create";
import EditRolePage from "./pages/dashboard/roles/edit";
import CustomersPage from "./pages/dashboard/customers";
import InviteEmployeePage from "./pages/dashboard/employees/invite";
import EditEmployeePage from "./pages/dashboard/employees/edit";

// Form pages - replacing "coming soon" placeholders
import InvoiceFormPage from "./pages/dashboard/sales/invoice";
import SalesReceiptFormPage from "./pages/dashboard/sales/receipt";
import CreditNoteFormPage from "./pages/dashboard/sales/credit-note";
import PaymentFormPage from "./pages/dashboard/sales/payment";
import EstimateFormPage from "./pages/dashboard/sales/estimate";
import RefundReceiptFormPage from "./pages/dashboard/sales/refund-receipt";

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
        <Route path="employees/invite" element={<InviteEmployeePage />} />
        <Route path="employees/edit/:id" element={<EditEmployeePage />} />
        <Route path="roles" element={<RolesPage />} />
        <Route path="roles/create" element={<CreateRolePage />} />
        <Route path="roles/edit/:id" element={<EditRolePage />} />
        <Route path="customers" element={<CustomersPage />} />
        
        {/* Sales/Document routes - replacing placeholders with actual form components */}
        <Route path="sales/invoice" element={<InvoiceFormPage />} />
        <Route path="sales/receipt" element={<SalesReceiptFormPage />} />
        <Route path="sales/credit-note" element={<CreditNoteFormPage />} />
        <Route path="sales/payment" element={<PaymentFormPage />} />
        <Route path="sales/estimate" element={<EstimateFormPage />} />
        <Route path="sales/refund-receipt" element={<RefundReceiptFormPage />} />
      </Route>

      {/* Catch-all redirect to 404 or home */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
