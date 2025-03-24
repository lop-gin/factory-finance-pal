
import React from 'react';
import { useSalesReceiptForm } from '@/hooks/useSalesReceiptForm';

export default function SalesReceiptFormPage() {
  const { 
    formState, 
    handleCustomerChange, 
    handleDateChange, 
    handleItemChange, 
    handleAddItem, 
    handleRemoveItem, 
    handleFormSubmit, 
    handleReset, 
    validationErrors 
  } = useSalesReceiptForm();

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">Create Sales Receipt</h1>
      <div className="bg-white rounded-lg shadow-md p-6">
        <p className="text-lg mb-4">
          Generate a sales receipt to record completed transactions.
        </p>
        <p className="text-gray-600">
          This page will use the useSalesReceiptForm hook to manage sales receipt creation.
        </p>
      </div>
    </div>
  );
}
