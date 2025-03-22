
import React from 'react';
import { useEstimateForm } from '@/hooks/useEstimateForm';

export default function EstimateFormPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">Create Estimate</h1>
      <div className="bg-white rounded-lg shadow-md p-6">
        <p className="text-lg mb-4">
          Create estimates for potential customers with detailed pricing.
        </p>
        <p className="text-gray-600">
          This page will use the useEstimateForm hook to manage estimate creation.
        </p>
      </div>
    </div>
  );
}
