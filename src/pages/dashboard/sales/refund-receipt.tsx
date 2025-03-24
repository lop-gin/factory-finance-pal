
import React from 'react';
import { useRefundReceiptForm } from '@/hooks/useRefundReceiptForm';
import RefundReceiptForm from '@/components/refund-receipt/RefundReceiptForm';
import RefundReceiptHeader from '@/components/refund-receipt/RefundReceiptHeader';

export default function RefundReceiptFormPage() {
  const {
    refundReceipt,
    updateRefundReceipt,
    updateCustomer,
    addItem,
    updateItem,
    removeItem,
    saveRefundReceipt,
    payments,
    selectedPayment,
    setSelectedPayment
  } = useRefundReceiptForm();

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">Create Refund Receipt</h1>
      
      <RefundReceiptHeader 
        refundReceipt={refundReceipt}
        onUpdate={updateRefundReceipt}
        onCustomerChange={updateCustomer}
        payments={payments}
        selectedPayment={selectedPayment}
        onSelectPayment={setSelectedPayment}
      />
      
      <RefundReceiptForm 
        refundReceipt={refundReceipt}
        onUpdate={updateRefundReceipt}
        onAddItem={addItem}
        onUpdateItem={updateItem}
        onRemoveItem={removeItem}
        onSave={saveRefundReceipt}
      />
    </div>
  );
}
