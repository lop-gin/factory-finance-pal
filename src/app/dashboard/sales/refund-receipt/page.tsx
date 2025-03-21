
import React, { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { DocumentItem } from "@/types/document";
import { useRefundReceiptForm } from "@/hooks/useRefundReceiptForm";
import { PageLoader } from "@/components/ui/page-loader";
import { RefundReceiptHeader } from "@/components/refund-receipt/RefundReceiptHeader";
import { RefundReceiptForm } from "@/components/refund-receipt/RefundReceiptForm";
import { ItemsTable } from "@/components/forms/ItemsTable";
import { FormMessage } from "@/components/forms/FormMessage";
import { FormActions } from "@/components/forms/FormActions";

export default function RefundReceiptPage() {
  const [loading, setLoading] = useState(true);
  const [customerName, setCustomerName] = useState<string>("");
  
  const {
    refundReceipt,
    updateRefundReceipt,
    updateCustomer,
    addRefundReceiptItem,
    updateRefundReceiptItem,
    removeRefundReceiptItem,
    clearAllItems,
    saveRefundReceipt,
    updateOtherFees,
  } = useRefundReceiptForm();

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  // Handler for customer selection
  const handleCustomerSelect = (name: string) => {
    // If customer name is changing, reset everything
    if (name !== customerName) {
      setCustomerName(name);
      clearAllItems();
      
      updateCustomer({
        ...refundReceipt.customer,
        name
      });
    }
  };
  
  // Reset form handler for "Save & New"
  const handleSaveAndNew = () => {
    saveRefundReceipt();
    clearAllItems();
    setCustomerName("");
    toast.success("Refund receipt saved and new form created");
  };

  return (
    <>
      <AnimatePresence>
        {loading && <PageLoader message="Preparing refund receipt form..." />}
      </AnimatePresence>
    
      <div className="bg-gray-50 min-h-screen w-full">
        <div className="bg-transparent pb-20">
          <RefundReceiptHeader />
          
          <RefundReceiptForm
            refundReceipt={refundReceipt}
            updateRefundReceipt={updateRefundReceipt}
            updateCustomer={updateCustomer}
            addRefundReceiptItem={addRefundReceiptItem}
            updateRefundReceiptItem={updateRefundReceiptItem}
            removeRefundReceiptItem={removeRefundReceiptItem}
            clearAllItems={clearAllItems}
            updateOtherFees={updateOtherFees}
            onCustomerSelect={handleCustomerSelect}
          />
          
          <div className="p-4">
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
            onSave={saveRefundReceipt}
            onClear={clearAllItems}
            onSaveAndNew={handleSaveAndNew}
            formType="refundReceipt"
          />
        </div>
      </div>
    </>
  );
}
