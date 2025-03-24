
import React from 'react';
import { useInvoiceForm } from '@/hooks/useInvoiceForm';
import { CustomerSection } from '@/components/forms/CustomerSection';
import { DateField, TermsSelect } from '@/components/forms/DateFields';
import { ItemsTable } from '@/components/forms/ItemsTable';
import { DocumentTotal } from '@/components/forms/DocumentTotal';
import { FormMessage } from '@/components/forms/FormMessage';
import { FormActions } from '@/components/forms/FormActions';
import { SalesRepresentative } from '@/components/forms/SalesRepresentative';

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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <DateField 
            label="Invoice date"
            date={invoice.invoiceDate} 
            onDateChange={(date) => updateInvoice({ invoiceDate: date })}
          />
          
          <DateField 
            label="Due date"
            date={invoice.dueDate} 
            onDateChange={(date) => updateInvoice({ dueDate: date })}
          />
          
          <TermsSelect
            terms={invoice.terms || ""}
            onTermsChange={(terms) => updateInvoice({ terms })}
          />
        </div>
        
        <CustomerSection 
          customer={invoice.customer}
          document={invoice}
          updateCustomer={updateCustomer} 
          updateDocument={updateInvoice}
        />
      </div>

      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <ItemsTable 
          items={invoice.items}
          addItem={addInvoiceItem}
          updateItem={updateInvoiceItem}
          removeItem={removeInvoiceItem}
          clearAllItems={clearAllItems}
          updateOtherFees={updateOtherFees}
          otherFees={invoice.otherFees || { description: "", amount: undefined }}
        />
        
        <div className="mt-4">
          <DocumentTotal 
            total={invoice.total}
            balanceDue={invoice.balanceDue}
            otherFeesAmount={invoice.otherFees?.amount}
            documentType="invoice"
          />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <FormMessage 
          message={invoice.messageOnInvoice || ""}
          onChange={(message) => updateInvoice({ messageOnInvoice: message })}
          label="MESSAGE ON INVOICE"
        />
        
        <div className="mt-4">
          <SalesRepresentative 
            value={invoice.salesRep || ""}
            onChange={(rep) => updateInvoice({ salesRep: rep })}
          />
        </div>
      </div>

      <div className="flex justify-end mt-6">
        <button
          onClick={saveInvoice}
          className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
        >
          Save Invoice
        </button>
      </div>
    </div>
  );
}
