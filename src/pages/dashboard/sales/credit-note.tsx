
import React from 'react';
import { useCreditNoteForm } from '@/hooks/useCreditNoteForm';
import CreditNoteForm from '@/components/credit-note/CreditNoteForm';
import CreditNoteHeader from '@/components/credit-note/CreditNoteHeader';
import TransactionSelection from '@/components/credit-note/TransactionSelection';
import TransactionTable from '@/components/credit-note/TransactionTable';

export default function CreditNoteFormPage() {
  const {
    creditNote,
    updateCreditNote,
    updateCustomer,
    addItem,
    updateItem,
    removeItem,
    saveCreditNote,
    transactions,
    selectedTransaction,
    setSelectedTransaction
  } = useCreditNoteForm();

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">Create Credit Note</h1>
      
      <CreditNoteHeader 
        creditNote={creditNote} 
        onUpdate={updateCreditNote} 
        onCustomerChange={updateCustomer}
      />
      
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <TransactionSelection
          customerId={creditNote.customer?.id}
          transactions={transactions}
          selectedTransaction={selectedTransaction}
          onSelectTransaction={setSelectedTransaction}
        />
        
        {selectedTransaction && (
          <TransactionTable 
            transaction={selectedTransaction}
            creditNote={creditNote}
            onAddItem={addItem}
            onUpdateItem={updateItem}
            onRemoveItem={removeItem}
          />
        )}
      </div>
      
      <CreditNoteForm 
        creditNote={creditNote} 
        onSave={saveCreditNote} 
        onUpdate={updateCreditNote}
      />
    </div>
  );
}
