import React from 'react';
import { usePaymentForm } from '@/hooks/usePaymentForm';
import { PaymentForm as PaymentFormComponent } from '@/components/payment/PaymentForm';
import { OutstandingInvoicesTable } from '@/components/payment/OutstandingInvoicesTable';
import { AmountReceivedInput } from '@/components/payment/AmountReceivedInput';
import { PaymentSummary } from '@/components/payment/PaymentSummary';

export default function PaymentFormPage() {
  const {
    payment,
    updateCustomer,
    toggleInvoiceSelection,
    savePayment,
    updateAmountReceived,
    clearPayment
  } = usePaymentForm();

  // Mock data for outstanding invoices
  const outstandingInvoices = payment.outstandingInvoices || [];

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">Receive Payment</h1>
      
      <PaymentFormComponent />
      
      <div className="flex justify-end mt-6">
        <button
          onClick={savePayment}
          className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
        >
          Save Payment
        </button>
      </div>
    </div>
  );
}
