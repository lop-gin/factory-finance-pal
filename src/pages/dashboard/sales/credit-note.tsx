
import React from 'react';
import { CreditNoteHeader } from "@/components/credit-note/CreditNoteHeader";
import { CreditNoteForm } from "@/components/credit-note/CreditNoteForm";
import { TransactionSelection } from "@/components/credit-note/TransactionSelection";
import { FormActions } from "@/components/forms/FormActions";
import { useCreditNoteForm } from "@/hooks/useCreditNoteForm";
import { useState } from "react";

export default function CreditNotePage() {
  const {
    creditNote,
    updateCreditNote, 
    updateCustomer,
    addCreditNoteItem,
    updateCreditNoteItem,
    removeCreditNoteItem,
    clearAllItems,
    updateOtherFees,
    saveCreditNote,
    addItems
  } = useCreditNoteForm();
  
  // Mock transactions for demonstration
  const [transactions, setTransactions] = useState([]);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  const handleSelectTransaction = (transaction) => {
    setSelectedTransaction(transaction);
    // Simulate fetching transaction items and adding them to the credit note
    if (transaction) {
      const mockItems = [
        {
          id: `item-${Date.now()}-1`,
          product: "Product from transaction",
          description: "Item imported from selected transaction",
          quantity: 1,
          unitPrice: 100,
          amount: 100
        }
      ];
      addItems(mockItems);
    }
  };

  const handleCustomerSelect = () => {
    // This function doesn't need arguments in this context
    console.log("Customer selected");
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <CreditNoteHeader />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 p-4">
        <div className="lg:col-span-2">
          <CreditNoteForm 
            creditNote={creditNote}
            updateCreditNote={updateCreditNote}
            updateCustomer={updateCustomer}
            addCreditNoteItem={addCreditNoteItem}
            updateCreditNoteItem={updateCreditNoteItem}
            removeCreditNoteItem={removeCreditNoteItem}
            clearAllItems={clearAllItems}
            updateOtherFees={updateOtherFees}
          />
        </div>
        
        <div>
          <TransactionSelection 
            transactions={transactions}
            selectedTransaction={selectedTransaction}
            onSelectTransaction={handleSelectTransaction}
          />
        </div>
      </div>
      
      <FormActions 
        onSave={saveCreditNote}
        onClear={clearAllItems}
        onSaveAndNew={() => {
          saveCreditNote();
          clearAllItems();
        }}
        formType="creditNote"
      />
    </div>
  );
}
