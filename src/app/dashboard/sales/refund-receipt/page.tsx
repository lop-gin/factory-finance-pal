
import React, { useState, useEffect } from "react";
import { FormActions } from "@/components/forms/FormActions";
import { RefundReceiptHeader } from "@/components/refund-receipt/RefundReceiptHeader";
import { AnimatePresence } from "framer-motion";
import { PageLoader } from "@/components/ui/page-loader";
import { useRefundReceiptForm } from "@/hooks/useRefundReceiptForm";
import { toast } from "sonner";
import { ItemsTable } from "@/components/forms/ItemsTable";
import { FormMessage } from "@/components/forms/FormMessage";
import { CustomerSection } from "@/components/forms/CustomerSection";
import { DateField } from "@/components/forms/DateFields";
import { SalesRepresentative } from "@/components/forms/SalesRepresentative";
import { DocumentTotal } from "@/components/forms/DocumentTotal";

export default function RefundReceiptPage() {
  const [loading, setLoading] = useState(true);
  
  const {
    refundReceipt,
    updateRefundReceipt,
    updateCustomer,
    addRefundReceiptItem,
    updateRefundReceiptItem,
    removeRefundReceiptItem,
    clearAllItems,
    saveRefundReceipt,
    updateOtherFees
  } = useRefundReceiptForm();

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  const handleSave = () => {
    saveRefundReceipt();
    toast.success("Refund receipt saved successfully");
  };

  const handleSaveAndNew = () => {
    saveRefundReceipt();
    clearAllItems();
    toast.success("Refund receipt saved successfully. New refund receipt form ready.");
  };

  return (
    <>
      <AnimatePresence>
        {loading && <PageLoader message="Preparing refund receipt form..." />}
      </AnimatePresence>
    
      <div className="bg-gray-50 min-h-screen w-full">
        <div className="bg-transparent pb-20">
          <RefundReceiptHeader />
          
          <div className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="md:col-span-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <CustomerSection 
                      customer={refundReceipt.customer}
                      document={refundReceipt}
                      updateCustomer={updateCustomer} 
                      updateDocument={updateRefundReceipt}
                    />
                  </div>
                  <div>
                    <div className="space-y-3 pb-5">
                      <DateField 
                        label="Refund receipt date"
                        date={refundReceipt.refundReceiptDate}
                        onDateChange={(date) => updateRefundReceipt({ refundReceiptDate: date })}
                      />
                      
                      <SalesRepresentative 
                        value={refundReceipt.salesRep || ""}
                        onChange={(rep) => updateRefundReceipt({ salesRep: rep })}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <DocumentTotal 
                  total={refundReceipt.total}
                  balanceDue={refundReceipt.balanceDue}
                  otherFeesAmount={refundReceipt.otherFees?.amount}
                  documentType="refundReceipt"
                />
              </div>
            </div>
            
            <div className="bg-white rounded-md shadow-sm p-4 mb-6">
              <ItemsTable 
                items={refundReceipt.items} 
                addItem={addRefundReceiptItem} 
                updateItem={updateRefundReceiptItem} 
                removeItem={removeRefundReceiptItem}
                clearAllItems={clearAllItems}
                otherFees={refundReceipt.otherFees || { description: "", amount: undefined }}
                updateOtherFees={updateOtherFees}
              />
            </div>
            
            <div className="mt-8">
              <FormMessage 
                message={refundReceipt.messageOnInvoice}
                label="MESSAGE ON REFUND RECEIPT"
                onChange={(message) => updateRefundReceipt({ messageOnInvoice: message })}
                placeholder="Enter a message to be displayed on the refund receipt"
              />
            </div>
          </div>
          
          <FormActions
            onSave={handleSave}
            onClear={clearAllItems}
            onSaveAndNew={handleSaveAndNew}
            formType="refundReceipt"
          />
        </div>
      </div>
    </>
  );
}
