
import React from 'react';
import { useCreditNoteForm } from '@/hooks/useCreditNoteForm';

export default function CreditNoteFormPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">Create Credit Note</h1>
      <div className="bg-white rounded-lg shadow-md p-6">
        <p className="text-lg mb-4">
          Issue a credit note to correct errors or provide refunds.
        </p>
        <p className="text-gray-600">
          This page will use the useCreditNoteForm hook to manage credit note creation.
        </p>
      </div>
    </div>
  );
}
