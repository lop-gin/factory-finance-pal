
import React from 'react';
import { useSalesReceiptForm } from '@/hooks/useSalesReceiptForm';
import { CustomerSection } from '@/components/forms/CustomerSection';
import { DateField } from '@/components/forms/DateFields';
import { ItemsTable } from '@/components/forms/ItemsTable';
import { DocumentTotal } from '@/components/forms/DocumentTotal';
import { FormMessage } from '@/components/forms/FormMessage';
import { FormActions } from '@/components/forms/FormActions';
import { SalesRepresentative } from '@/components/forms/SalesRepresentative';

export default function SalesReceiptFormPage() {
  const { 
    document: salesReceipt, 
    updateDocument: updateSalesReceipt, 
    updateCustomer, 
    addDocumentItem: addSalesReceiptItem, 
    updateDocumentItem: updateSalesReceiptItem, 
    removeDocumentItem: removeSalesReceiptItem, 
    saveDocument: saveSalesReceipt, 
    clearAllItems,
    updateOtherFees
  } = useSalesReceiptForm();

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">Create Sales Receipt</h1>
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <DateField 
            label="Receipt date"
            date={salesReceipt.saleDate} 
            onDateChange={(date) => updateSalesReceipt({ saleDate: date })}
          />
        </div>
        
        <CustomerSection 
          customer={salesReceipt.customer}
          document={salesReceipt}
          updateCustomer={updateCustomer} 
          updateDocument={updateSalesReceipt}
        />
      </div>

      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <ItemsTable 
          items={salesReceipt.items}
          addItem={addSalesReceiptItem}
          updateItem={updateSalesReceiptItem}
          removeItem={removeSalesReceiptItem}
          clearAllItems={clearAllItems}
          updateOtherFees={updateOtherFees}
          otherFees={salesReceipt.otherFees || { description: "", amount: undefined }}
        />
        
        <div className="mt-4">
          <DocumentTotal 
            total={salesReceipt.total}
            balanceDue={0}
            otherFeesAmount={salesReceipt.otherFees?.amount}
            documentType="invoice"
          />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <FormMessage 
          message={salesReceipt.messageOnInvoice || ""}
          onChange={(message) => updateSalesReceipt({ messageOnInvoice: message })}
          label="MESSAGE ON RECEIPT"
        />
        
        <div className="mt-4">
          <SalesRepresentative 
            value={salesReceipt.salesRep || ""}
            onChange={(rep) => updateSalesReceipt({ salesRep: rep })}
          />
        </div>
      </div>

      <div className="flex justify-end mt-6">
        <button
          onClick={saveSalesReceipt}
          className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
        >
          Save Receipt
        </button>
      </div>
    </div>
  );
}
