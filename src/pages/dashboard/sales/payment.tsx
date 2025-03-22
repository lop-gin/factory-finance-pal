
import React from 'react';
import { usePaymentForm } from '@/hooks/usePaymentForm';

export default function PaymentFormPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">Receive Payment</h1>
      <div className="bg-white rounded-lg shadow-md p-6">
        <p className="text-lg mb-4">
          Record customer payments and apply them to outstanding invoices.
        </p>
        <p className="text-gray-600">
          This page will use the usePaymentForm hook to manage payment recording.
        </p>
      </div>
    </div>
  );
}
