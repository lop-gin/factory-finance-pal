
import React from 'react';
import { useRefundReceiptForm } from '@/hooks/useRefundReceiptForm';

export default function RefundReceiptFormPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">Create Refund Receipt</h1>
      <div className="bg-white rounded-lg shadow-md p-6">
        <p className="text-lg mb-4">
          Process and record customer refunds for previous transactions.
        </p>
        <p className="text-gray-600">
          This page will use the useRefundReceiptForm hook to manage refund receipt creation.
        </p>
      </div>
    </div>
  );
}
