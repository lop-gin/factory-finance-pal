
import React from 'react';
import { useInvoiceForm } from '@/hooks/useInvoiceForm';
import CustomerSection from '@/components/forms/CustomerSection';
import DateFields from '@/components/forms/DateFields';
import ItemsTable from '@/components/forms/ItemsTable';
import DocumentTotal from '@/components/forms/DocumentTotal';
import FormMessage from '@/components/forms/FormMessage';
import FormActions from '@/components/forms/FormActions';
import SalesRepresentative from '@/components/forms/SalesRepresentative';

export default function InvoiceFormPage() {
  const { 
    invoice, 
    updateInvoice, 
    updateCustomer, 
    addInvoiceItem, 
    updateInvoiceItem, 
    removeInvoiceItem, 
    saveInvoice, 
    clearAllItems,
    updateOtherFees
  } = useInvoiceForm();

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">Create Invoice</h1>
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <DateFields 
          documentDate={invoice.invoiceDate} 
          dueDate={invoice.dueDate}
          terms={invoice.terms}
          documentNumber={invoice.invoiceNumber}
          onUpdate={(updates) => updateInvoice(updates)}
          documentType="invoice"
        />
        
        <CustomerSection 
          customer={invoice.customer}
          onCustomerChange={updateCustomer}
        />
      </div>

      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <ItemsTable 
          items={invoice.items}
          onAddItem={addInvoiceItem}
          onUpdateItem={updateInvoiceItem}
          onRemoveItem={removeInvoiceItem}
          onClearItems={clearAllItems}
          onUpdateOtherFees={updateOtherFees}
          otherFees={invoice.otherFees}
        />
        
        <DocumentTotal 
          subTotal={invoice.subTotal}
          total={invoice.total}
          balanceDue={invoice.balanceDue}
        />
      </div>

      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <FormMessage 
          messageOnDocument={invoice.messageOnInvoice}
          messageOnStatement={invoice.messageOnStatement}
          onUpdate={(updates) => updateInvoice(updates)}
          documentType="invoice"
        />
        
        <SalesRepresentative 
          salesRep={invoice.salesRep}
          onUpdate={(salesRep) => updateInvoice({ salesRep })}
        />
      </div>

      <FormActions 
        onSave={saveInvoice}
        documentType="invoice"
      />
    </div>
  );
}
