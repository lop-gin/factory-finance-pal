
import React from 'react';
import { useRefundReceiptForm } from '@/hooks/useRefundReceiptForm';
import RefundReceiptForm from '@/components/refund-receipt/RefundReceiptForm';
import RefundReceiptHeader from '@/components/refund-receipt/RefundReceiptHeader';

export default function RefundReceiptFormPage() {
  const {
    refundReceipt,
    updateRefundReceipt,
    updateCustomer,
    addDocumentItem,
    updateDocumentItem,
    removeDocumentItem,
    saveRefundReceipt,
    referencedPayments = [],
    selectedReferencedPayment = null,
    setSelectedReferencedPayment = () => {}
  } = useRefundReceiptForm();

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">Create Refund Receipt</h1>
      
      <RefundReceiptHeader 
        refundReceipt={refundReceipt}
        onUpdate={updateRefundReceipt}
        onCustomerChange={updateCustomer}
        payments={referencedPayments}
        selectedPayment={selectedReferencedPayment}
        onSelectPayment={setSelectedReferencedPayment}
      />
      
      <RefundReceiptForm 
        refundReceipt={refundReceipt}
        updateRefundReceipt={updateRefundReceipt}
        updateCustomer={updateCustomer}
        addRefundReceiptItem={addDocumentItem}
        updateRefundReceiptItem={updateDocumentItem}
        removeRefundReceiptItem={removeDocumentItem}
        onSave={saveRefundReceipt}
        clearAllItems={() => {}}
        updateOtherFees={() => {}}
        onCustomerSelect={() => {}}
      />
    </div>
  );
}
