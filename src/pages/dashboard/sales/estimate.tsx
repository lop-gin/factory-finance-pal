
import React from 'react';
import { useEstimateForm } from '@/hooks/useEstimateForm';
import CustomerSection from '@/components/forms/CustomerSection';
import DateFields from '@/components/forms/DateFields';
import ItemsTable from '@/components/forms/ItemsTable';
import DocumentTotal from '@/components/forms/DocumentTotal';
import FormMessage from '@/components/forms/FormMessage';
import FormActions from '@/components/forms/FormActions';
import SalesRepresentative from '@/components/forms/SalesRepresentative';

export default function EstimateFormPage() {
  const { 
    estimate, 
    updateEstimate, 
    updateCustomer, 
    addEstimateItem, 
    updateEstimateItem, 
    removeEstimateItem, 
    saveEstimate, 
    clearAllItems,
    updateOtherFees
  } = useEstimateForm();

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">Create Estimate</h1>
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <DateFields 
          documentDate={estimate.estimateDate} 
          dueDate={estimate.expirationDate}
          documentNumber={estimate.estimateNumber}
          onUpdate={(updates) => updateEstimate(updates)}
          documentType="estimate"
        />
        
        <CustomerSection 
          customer={estimate.customer}
          onCustomerChange={updateCustomer}
        />
      </div>

      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <ItemsTable 
          items={estimate.items}
          onAddItem={addEstimateItem}
          onUpdateItem={updateEstimateItem}
          onRemoveItem={removeEstimateItem}
          onClearItems={clearAllItems}
          onUpdateOtherFees={updateOtherFees}
          otherFees={estimate.otherFees}
        />
        
        <DocumentTotal 
          subTotal={estimate.subTotal}
          total={estimate.total}
          balanceDue={estimate.total}
        />
      </div>

      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <FormMessage 
          messageOnDocument={estimate.messageOnEstimate}
          messageOnStatement={null}
          onUpdate={(updates) => updateEstimate(updates)}
          documentType="estimate"
        />
        
        <SalesRepresentative 
          salesRep={estimate.salesRep}
          onUpdate={(salesRep) => updateEstimate({ salesRep })}
        />
      </div>

      <FormActions 
        onSave={saveEstimate}
        documentType="estimate"
      />
    </div>
  );
}
