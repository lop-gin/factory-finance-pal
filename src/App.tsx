
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import DashboardPage from "./app/dashboard/page";
import InvoicePage from "./app/dashboard/sales/invoice/page";
import SalesReceiptPage from "./app/dashboard/sales/receipt/page";
import CreditNotePage from "./app/dashboard/sales/credit-note/page";
import PaymentPage from "./app/dashboard/sales/payment/page";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/dashboard/sales/invoice" element={<InvoicePage />} />
          <Route path="/dashboard/sales/receipt" element={<SalesReceiptPage />} />
          <Route path="/dashboard/sales/credit-note" element={<CreditNotePage />} />
          <Route path="/dashboard/sales/payment" element={<PaymentPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
