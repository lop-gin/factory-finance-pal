
import React from 'react';
import { useEstimateForm } from '@/hooks/useEstimateForm';
import { CustomerSection } from '@/components/forms/CustomerSection';
import { DateField } from '@/components/forms/DateFields';
import { ItemsTable } from '@/components/forms/ItemsTable';
import { DocumentTotal } from '@/components/forms/DocumentTotal';
import { FormMessage } from '@/components/forms/FormMessage';
import { FormActions } from '@/components/forms/FormActions';
import { SalesRepresentative } from '@/components/forms/SalesRepresentative';

export default function EstimateFormPage() {
  const { 
    document: estimate, 
    updateDocument: updateEstimate,
    updateCustomer, 
    addDocumentItem: addEstimateItem, 
    updateDocumentItem: updateEstimateItem, 
    removeDocumentItem: removeEstimateItem, 
    saveDocument: saveEstimate, 
    clearAllItems,
    updateOtherFees
  } = useEstimateForm();

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">Create Estimate</h1>
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <DateField 
            label="Estimate date"
            date={estimate.estimateDate} 
            onDateChange={(date) => updateEstimate({ estimateDate: date })}
          />
          
          <DateField 
            label="Expiration date"
            date={estimate.expirationDate} 
            onDateChange={(date) => updateEstimate({ expirationDate: date })}
          />
        </div>
        
        <CustomerSection 
          customer={estimate.customer}
          document={estimate}
          updateCustomer={updateCustomer} 
          updateDocument={updateEstimate}
        />
      </div>

      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <ItemsTable 
          items={estimate.items}
          addItem={addEstimateItem}
          updateItem={updateEstimateItem}
          removeItem={removeEstimateItem}
          clearAllItems={clearAllItems}
          updateOtherFees={updateOtherFees}
          otherFees={estimate.otherFees || { description: "", amount: undefined }}
        />
        
        <div className="mt-4">
          <DocumentTotal 
            total={estimate.total}
            balanceDue={estimate.total}
            otherFeesAmount={estimate.otherFees?.amount}
            documentType="estimate"
          />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <FormMessage 
          message={estimate.messageOnInvoice || ""}
          onChange={(message) => updateEstimate({ messageOnInvoice: message })}
          label="MESSAGE ON ESTIMATE"
        />
        
        <div className="mt-4">
          <SalesRepresentative 
            value={estimate.salesRep || ""}
            onChange={(rep) => updateEstimate({ salesRep: rep })}
          />
        </div>
      </div>

      <div className="flex justify-end mt-6">
        <button
          onClick={saveEstimate}
          className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
        >
          Save Estimate
        </button>
      </div>
    </div>
  );
}
