
import React from 'react';
import { useSalesReceiptForm } from '@/hooks/useSalesReceiptForm';
import CustomerSection from '@/components/forms/CustomerSection';
import DateFields from '@/components/forms/DateFields';
import ItemsTable from '@/components/forms/ItemsTable';
import DocumentTotal from '@/components/forms/DocumentTotal';
import FormMessage from '@/components/forms/FormMessage';
import FormActions from '@/components/forms/FormActions';
import SalesRepresentative from '@/components/forms/SalesRepresentative';

export default function SalesReceiptFormPage() {
  const { 
    salesReceipt, 
    updateSalesReceipt, 
    updateCustomer, 
    addSalesReceiptItem, 
    updateSalesReceiptItem, 
    removeSalesReceiptItem, 
    saveSalesReceipt, 
    clearAllItems,
    updateOtherFees
  } = useSalesReceiptForm();

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">Create Sales Receipt</h1>
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <DateFields 
          documentDate={salesReceipt.receiptDate} 
          dueDate={null}
          documentNumber={salesReceipt.receiptNumber}
          onUpdate={(updates) => updateSalesReceipt(updates)}
          documentType="receipt"
        />
        
        <CustomerSection 
          customer={salesReceipt.customer}
          onCustomerChange={updateCustomer}
        />
      </div>

      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <ItemsTable 
          items={salesReceipt.items}
          onAddItem={addSalesReceiptItem}
          onUpdateItem={updateSalesReceiptItem}
          onRemoveItem={removeSalesReceiptItem}
          onClearItems={clearAllItems}
          onUpdateOtherFees={updateOtherFees}
          otherFees={salesReceipt.otherFees}
        />
        
        <DocumentTotal 
          subTotal={salesReceipt.subTotal}
          total={salesReceipt.total}
          balanceDue={0}
        />
      </div>

      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <FormMessage 
          messageOnDocument={salesReceipt.messageOnReceipt}
          messageOnStatement={salesReceipt.messageOnStatement}
          onUpdate={(updates) => updateSalesReceipt(updates)}
          documentType="receipt"
        />
        
        <SalesRepresentative 
          salesRep={salesReceipt.salesRep}
          onUpdate={(salesRep) => updateSalesReceipt({ salesRep })}
        />
      </div>

      <FormActions 
        onSave={saveSalesReceipt}
        documentType="receipt"
      />
    </div>
  );
}
