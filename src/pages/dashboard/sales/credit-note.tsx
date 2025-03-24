
import React from 'react';
import { useCreditNoteForm } from '@/hooks/useCreditNoteForm';
import { CreditNoteForm } from '@/components/credit-note/CreditNoteForm';
import { CreditNoteHeader } from '@/components/credit-note/CreditNoteHeader';
import { TransactionSelection } from '@/components/credit-note/TransactionSelection';
import { TransactionTable } from '@/components/credit-note/TransactionTable';
import { Customer, DocumentItem } from '@/types/document';

export default function CreditNoteFormPage() {
  const {
    creditNote,
    updateCreditNote,
    updateCustomer,
    addDocumentItem: addItem,
    updateDocumentItem: updateItem,
    removeDocumentItem: removeItem,
    saveDocument: saveCreditNote,
    transactions = [],
    selectedTransaction = null,
    setSelectedTransaction = () => {}
  } = useCreditNoteForm();

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">Create Credit Note</h1>
      
      <CreditNoteHeader />
      
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <TransactionSelection
          customerName={creditNote.customer?.name || ""}
          availableTransactions={transactions || []}
          selectedTransactions={selectedTransaction ? [selectedTransaction.id] : []}
          onTransactionSelect={(id) => {
            const transaction = transactions.find(t => t.id === id);
            setSelectedTransaction(transaction || null);
          }}
        />
        
        {selectedTransaction && (
          <TransactionTable 
            transactions={[selectedTransaction]}
            selectedTransactions={[selectedTransaction.id]}
            onTransactionSelect={() => {}}
          />
        )}
      </div>
      
      <CreditNoteForm 
        creditNote={creditNote} 
        updateCreditNote={updateCreditNote}
        updateCustomer={updateCustomer}
        addCreditNoteItem={addItem}
        updateCreditNoteItem={updateItem}
        removeCreditNoteItem={removeItem}
        clearAllItems={() => {}}
        updateOtherFees={() => {}}
        onCustomerSelect={() => {}}
      />
      
      <div className="flex justify-end mt-6">
        <button
          onClick={saveCreditNote}
          className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
        >
          Save Credit Note
        </button>
      </div>
    </div>
  );
}
