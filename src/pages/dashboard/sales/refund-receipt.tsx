
import React, { useState } from 'react';
import { RefundReceiptHeader } from "@/components/refund-receipt/RefundReceiptHeader";
import RefundReceiptForm from "@/components/refund-receipt/RefundReceiptForm";
import { FormActions } from "@/components/forms/FormActions";
import useRefundReceiptForm from "@/hooks/useRefundReceiptForm";

export default function RefundReceiptPage() {
  const {
    refundReceipt,
    updateRefundReceipt,
    updateCustomer,
    addRefundReceiptItem,
    updateRefundReceiptItem,
    removeRefundReceiptItem,
    clearAllItems,
    updateOtherFees,
    saveRefundReceipt,
    addItems,
    updateReferencedTransactions
  } = useRefundReceiptForm();
  
  // Mock referenced payments
  const [referencedPayments, setReferencedPayments] = useState([]);
  const [selectedReferencedPayment, setSelectedReferencedPayment] = useState(null);

  // Function for selecting a customer
  const handleCustomerSelect = () => {
    console.log("Customer selected");
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <RefundReceiptHeader />
      
      <div className="flex-1 overflow-y-auto pb-20">
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
          onClearRefund={() => clearAllItems()}
        />
      </div>
      
      <FormActions 
        onSave={saveRefundReceipt}
        onClear={clearAllItems}
        onSaveAndNew={() => {
          saveRefundReceipt();
          clearAllItems();
        }}
        formType="refundReceipt"
      />
    </div>
  );
}
