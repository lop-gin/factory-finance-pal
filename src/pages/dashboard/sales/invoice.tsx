
import React from 'react';
import { useInvoiceForm } from '@/hooks/useInvoiceForm';

export default function InvoiceFormPage() {
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
  } = useInvoiceForm();

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">Create Invoice</h1>
      <div className="bg-white rounded-lg shadow-md p-6">
        <p className="text-lg mb-4">
          Create a new invoice for your customers with itemized billing.
        </p>
        <p className="text-gray-600">
          This page will use the useInvoiceForm hook to manage invoice creation.
        </p>
      </div>
    </div>
  );
}
