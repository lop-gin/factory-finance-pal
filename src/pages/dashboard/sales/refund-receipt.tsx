
import React from 'react';
import { useRefundReceiptForm } from '@/hooks/useRefundReceiptForm';
import RefundReceiptForm from '@/components/refund-receipt/RefundReceiptForm';
import RefundReceiptHeader from '@/components/refund-receipt/RefundReceiptHeader';

export default function RefundReceiptFormPage() {
  const {
    refundReceipt,
    updateRefundReceipt,
    updateCustomer,
    addRefundReceiptItem,
    updateRefundReceiptItem,
    removeRefundReceiptItem,
    saveRefundReceipt,
    clearAllItems,
    updateOtherFees
  } = useRefundReceiptForm();

  // Mock data for referenced payments
  const referencedPayments = [];
  const selectedReferencedPayment = null;
  const setSelectedReferencedPayment = () => {};

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">Create Refund Receipt</h1>
      
      <div className="mb-6">
        <RefundReceiptHeader 
          refundReceipt={refundReceipt}
          onUpdate={updateRefundReceipt}
          onCustomerChange={updateCustomer}
          payments={referencedPayments}
          selectedPayment={selectedReferencedPayment}
          onSelectPayment={setSelectedReferencedPayment}
        />
      </div>
      
      <div>
        <RefundReceiptForm 
          refundReceipt={refundReceipt}
          updateRefundReceipt={updateRefundReceipt}
          updateCustomer={updateCustomer}
          addRefundReceiptItem={addRefundReceiptItem}
          updateRefundReceiptItem={updateRefundReceiptItem}
          removeRefundReceiptItem={removeRefundReceiptItem}
          onSave={saveRefundReceipt}
          clearAllItems={clearAllItems}
          updateOtherFees={updateOtherFees}
          onCustomerSelect={() => {}}
        />
      </div>
      
      <div className="flex justify-end mt-6">
        <button
          onClick={saveRefundReceipt}
          className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
        >
          Save Refund Receipt
        </button>
      </div>
    </div>
  );
}
