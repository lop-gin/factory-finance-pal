
import React from 'react';
import { usePaymentForm } from '@/hooks/usePaymentForm';
import PaymentForm from '@/components/payment/PaymentForm';
import OutstandingInvoicesTable from '@/components/payment/OutstandingInvoicesTable';
import AmountReceivedInput from '@/components/payment/AmountReceivedInput';
import PaymentSummary from '@/components/payment/PaymentSummary';

export default function PaymentFormPage() {
  const {
    payment,
    updatePayment,
    updateCustomer,
    outstandingInvoices,
    selectedInvoices,
    toggleInvoiceSelection,
    amountReceived,
    setAmountReceived,
    savePayment
  } = usePaymentForm();

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">Receive Payment</h1>
      
      <PaymentForm 
        payment={payment}
        onUpdate={updatePayment}
        onCustomerChange={updateCustomer}
      />
      
      {payment.customer && payment.customer.id && (
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4">Outstanding Invoices</h2>
          
          <OutstandingInvoicesTable
            invoices={outstandingInvoices}
            selectedInvoices={selectedInvoices}
            onToggleInvoice={toggleInvoiceSelection}
          />
          
          <div className="mt-6">
            <AmountReceivedInput
              amountReceived={amountReceived}
              onChange={setAmountReceived}
            />
            
            <PaymentSummary
              selectedInvoices={selectedInvoices}
              amountReceived={amountReceived}
            />
          </div>
        </div>
      )}
      
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
