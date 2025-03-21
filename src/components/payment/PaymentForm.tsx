
import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import { X, ChevronDown, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CustomerSection } from "@/components/forms/CustomerSection";
import { FormMessage } from "@/components/forms/FormMessage";
import { FormActions } from "@/components/forms/FormActions";
import { OutstandingInvoicesTable } from "@/components/payment/OutstandingInvoicesTable";
import { PaymentSummary } from "@/components/payment/PaymentSummary";
import { AmountReceivedInput } from "@/components/payment/AmountReceivedInput";
import { usePaymentForm } from "@/hooks/usePaymentForm";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";
import { PageLoader } from "@/components/ui/page-loader";
import { AnimatePresence } from "framer-motion";

export const PaymentForm: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const {
    payment,
    updateCustomer,
    updatePaymentDate,
    updateAmountReceived,
    toggleInvoiceSelection,
    updateInvoicePayment,
    clearPayment,
    savePayment,
    totalOpenBalance
  } = usePaymentForm();

  const [isCustomerSelected, setIsCustomerSelected] = useState(false);
  const navigate = useNavigate();

  const handleCustomerSelect = (customerName: string) => {
    setIsCustomerSelected(!!customerName);
  };

  // Simulate loading like in SalesReceiptForm
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  const handleSave = () => {
    savePayment();
    toast.success("Payment saved successfully");
  };

  const handleSaveAndNew = () => {
    savePayment();
    clearPayment();
    toast.success("Payment saved successfully. New payment form ready.");
  };

  // Create a document object that meets the Document interface requirements
  // to pass to CustomerSection
  const documentForCustomer = {
    customer: payment.customer,
    // Add required Document properties
    items: [],
    messageOnInvoice: "",
    messageOnStatement: "",
    subTotal: 0,
    total: 0,
    balanceDue: 0
  };

  return (
    <>
      <AnimatePresence>
        {loading && <PageLoader message="Preparing payment form..." />}
      </AnimatePresence>
    
      <div className="bg-gray-50 min-h-screen w-full">
        <div className="bg-transparent pb-20">
          <div className="bg-white shadow-sm border-b border-gray-200 p-4 flex justify-between items-center">
            <h1 className="text-xl font-semibold">Receive Payment</h1>
            <Link to="/dashboard">
              <Button variant="ghost" size="icon">
                <X className="h-5 w-5" />
              </Button>
            </Link>
          </div>
          
          <div className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="md:col-span-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <CustomerSection
                      customer={payment.customer}
                      document={documentForCustomer}
                      updateCustomer={updateCustomer}
                      updateDocument={() => {}}
                      onCustomerSelect={handleCustomerSelect}
                    />
                  </div>
                  <div>
                    <div className="space-y-3 pb-5">
                      <div>
                        <label className="text-xs font-medium text-gray-600">
                          Payment Date
                        </label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full justify-start text-left font-normal h-9 text-xs",
                                !payment.paymentDate && "text-muted-foreground"
                              )}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {payment.paymentDate ? (
                                format(payment.paymentDate, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={payment.paymentDate}
                              onSelect={(date) => date && updatePaymentDate(date)}
                              initialFocus
                              className="p-3 pointer-events-auto"
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div className="bg-gray-50 p-4 rounded-md border border-gray-200 h-full flex flex-col">
                  <div className="text-center mb-auto">
                    <div className="text-xs text-gray-500">Amount Received</div>
                    <div className="text-2xl font-bold text-gray-800">
                      Ksh{payment.amountReceived.toFixed(2)}
                    </div>
                  </div>
                  
                  <AmountReceivedInput 
                    amount={payment.amountReceived} 
                    onChange={updateAmountReceived} 
                  />
                </div>
              </div>
            </div>

            {/* Only show outstanding invoices when a customer is selected */}
            {isCustomerSelected && (
              <div className="bg-white rounded-md shadow-sm p-4 mb-6">
                <div className="mb-2 flex items-center justify-between">
                  <h2 className="text-lg font-semibold">Outstanding Invoices</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-6">
                  <div className="md:col-span-9">
                    <OutstandingInvoicesTable
                      invoices={payment.outstandingInvoices}
                      onToggleSelection={toggleInvoiceSelection}
                      onUpdatePayment={updateInvoicePayment}
                    />
                  </div>
                  <div className="md:col-span-3">
                    <PaymentSummary
                      amountToApply={payment.amountToApply}
                      amountToCredit={payment.amountToCredit}
                      onClearPayment={clearPayment}
                    />
                  </div>
                </div>
              </div>
            )}

            <div className="mt-8">
              <FormMessage
                message={payment.message}
                onChange={(message) => {
                  // Update the message
                  const updatedPayment = { ...payment, message };
                  savePayment();
                }}
                label="MESSAGE ON PAYMENT"
                placeholder="Add a note to this payment"
              />
            </div>
          </div>
          
          <div className="fixed bottom-0 left-0 right-0 bg-gray-800 p-4 flex justify-between items-center">
            <div className="flex space-x-3">
              <Link to="/dashboard">
                <Button variant="outline" className="bg-transparent text-white border-gray-600 hover:bg-gray-700 hover:text-white">
                  Cancel
                </Button>
              </Link>
              <Button 
                variant="outline"
                className="bg-transparent text-white border-gray-600 hover:bg-gray-700 hover:text-white"
                onClick={clearPayment}
              >
                Clear
              </Button>
            </div>
            
            <div className="flex items-center">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button className="bg-green-600 hover:bg-green-700 text-white flex items-center">
                    Save and close
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={handleSave}>
                    Save & Close
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleSaveAndNew}>
                    Save & New
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentForm;
