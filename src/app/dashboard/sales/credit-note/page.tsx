import React, { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { DocumentItem } from "@/types/document";
import { useCreditNoteForm } from "@/hooks/useCreditNoteForm";
import { PageLoader } from "@/components/ui/page-loader";
import { CreditNoteHeader } from "@/components/credit-note/CreditNoteHeader";
import { CreditNoteForm } from "@/components/credit-note/CreditNoteForm";
import { TransactionSelection } from "@/components/credit-note/TransactionSelection";
import { ItemsTable } from "@/components/forms/ItemsTable";
import { FormMessage } from "@/components/forms/FormMessage";
import { FormActions } from "@/components/forms/FormActions";

// Dummy data for invoices and receipts mapped by customer
const customerTransactions = {
  "John Smith": [
    { id: "1", type: "invoice", date: "2023-10-15", number: "INV-307", total: 1250.00, status: "paid" },
    { id: "3", type: "receipt", date: "2023-11-12", number: "SR-45", total: 325.75, status: "paid" },
  ],
  "Jane Doe": [
    { id: "2", type: "invoice", date: "2023-11-03", number: "INV-315", total: 875.50, status: "overdue" },
    { id: "5", type: "receipt", date: "2023-12-18", number: "SR-52", total: 450.25, status: "paid" },
  ],
  "Robert Johnson": [
    { id: "4", type: "invoice", date: "2023-12-01", number: "INV-322", total: 1500.00, status: "due" },
  ]
};

// Dummy data for products in transactions - Updated with all required DocumentItem properties
const transactionItems: Record<string, DocumentItem[]> = {
  "1": [
    { id: "101", product: "Website Design", description: "Company website redesign", quantity: 1, unitPrice: 1000, taxPercent: 10, amount: 1000, serviceDate: "", category: "", unit: "", rate: undefined },
    { id: "102", product: "SEO Setup", description: "Initial SEO configuration", quantity: 5, unitPrice: 50, taxPercent: 0, amount: 250, serviceDate: "", category: "", unit: "", rate: undefined }
  ],
  "2": [
    { id: "201", product: "Content Writing", description: "Blog posts (5)", quantity: 5, unitPrice: 150, taxPercent: 8, amount: 750, serviceDate: "", category: "", unit: "", rate: undefined },
    { id: "202", product: "Image Licensing", description: "Stock photos", quantity: 25, unitPrice: 5.02, taxPercent: 0, amount: 125.50, serviceDate: "", category: "", unit: "", rate: undefined }
  ],
  "3": [
    { id: "301", product: "Hosting - Basic", description: "Monthly hosting fee", quantity: 1, unitPrice: 325.75, taxPercent: 0, amount: 325.75, serviceDate: "", category: "", unit: "", rate: undefined }
  ],
  "4": [
    { id: "401", product: "Social Media Campaign", description: "Facebook + Instagram", quantity: 1, unitPrice: 1200, taxPercent: 0, amount: 1200, serviceDate: "", category: "", unit: "", rate: undefined },
    { id: "402", product: "Analytics Setup", description: "Google Analytics", quantity: 2, unitPrice: 150, taxPercent: 0, amount: 300, serviceDate: "", category: "", unit: "", rate: undefined }
  ],
  "5": [
    { id: "501", product: "Email Marketing", description: "Newsletter campaign", quantity: 1, unitPrice: 450.25, taxPercent: 0, amount: 450.25, serviceDate: "", category: "", unit: "", rate: undefined }
  ]
};

export default function CreditNotePage() {
  const [loading, setLoading] = useState(true);
  const [selectedTransactions, setSelectedTransactions] = useState<string[]>([]);
  const [customerName, setCustomerName] = useState<string>("");
  const [processedTransactions, setProcessedTransactions] = useState<string[]>([]);
  
  const {
    creditNote,
    updateCreditNote,
    updateCustomer,
    addCreditNoteItem,
    updateCreditNoteItem,
    removeCreditNoteItem,
    clearAllItems,
    saveCreditNote,
    updateOtherFees,
    addItems
  } = useCreditNoteForm();

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  // When selected transactions change, update the items - with improved handling
  useEffect(() => {
    // Find newly selected transactions that haven't been processed yet
    const newlySelectedTransactions = selectedTransactions.filter(
      id => !processedTransactions.includes(id)
    );
    
    // Find deselected transactions
    const deselectedTransactions = processedTransactions.filter(
      id => !selectedTransactions.includes(id)
    );
    
    // Process newly selected transactions only if there are any
    if (newlySelectedTransactions.length > 0) {
      // Get items from newly selected transactions only
      const newItems = newlySelectedTransactions.flatMap(transId => 
        transactionItems[transId].map(item => ({
          ...item,
          id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`, // Create unique IDs
          category: item.category || "",
          serviceDate: item.serviceDate || "",
          unit: item.unit || "",
          rate: item.rate,
          quantity: item.quantity || 0,
          unitPrice: item.unitPrice || 0,
          taxPercent: item.taxPercent || 0,
          amount: (item.quantity || 0) * (item.unitPrice || 0)
        }))
      );
      
      // Add new items to the form (don't replace existing ones)
      if (newItems.length > 0) {
        addItems(newItems);
        toast.success(`Added ${newItems.length} items from selected transactions`);
      }
      
      // Update processed transactions list
      setProcessedTransactions(prev => [...prev, ...newlySelectedTransactions]);
    }
    
    // If any transactions were deselected, update the processed list
    // but keep the items (user may have edited them)
    if (deselectedTransactions.length > 0) {
      setProcessedTransactions(prev => 
        prev.filter(id => !deselectedTransactions.includes(id))
      );
    }
  }, [selectedTransactions, addItems]);

  const handleTransactionSelect = (transactionId: string) => {
    setSelectedTransactions(prev => {
      if (prev.includes(transactionId)) {
        // Transaction is being unselected
        return prev.filter(id => id !== transactionId);
      } else {
        // Transaction is being selected
        return [...prev, transactionId];
      }
    });
  };

  // Handler for customer selection
  const handleCustomerSelect = (name: string) => {
    // If customer name is changing, reset everything
    if (name !== customerName) {
      setCustomerName(name);
      setSelectedTransactions([]);
      setProcessedTransactions([]);
      clearAllItems();
      
      updateCustomer({
        ...creditNote.customer,
        name
      });
    }
  };
  
  // Reset form handler for "Save & New"
  const handleSaveAndNew = () => {
    saveCreditNote();
    clearAllItems();
    setCustomerName("");
    setSelectedTransactions([]);
    setProcessedTransactions([]);
    toast.success("Credit note saved and new form created");
  };

  // Get transactions for the selected customer
  const availableTransactions = customerName ? customerTransactions[customerName as keyof typeof customerTransactions] || [] : [];

  return (
    <>
      <AnimatePresence>
        {loading && <PageLoader message="Preparing credit note form..." />}
      </AnimatePresence>
    
      <div className="bg-gray-50 min-h-screen w-full">
        <div className="bg-transparent pb-20">
          <CreditNoteHeader />
          
          <CreditNoteForm
            creditNote={creditNote}
            updateCreditNote={updateCreditNote}
            updateCustomer={updateCustomer}
            addCreditNoteItem={addCreditNoteItem}
            updateCreditNoteItem={updateCreditNoteItem}
            removeCreditNoteItem={removeCreditNoteItem}
            clearAllItems={clearAllItems}
            updateOtherFees={updateOtherFees}
            onCustomerSelect={handleCustomerSelect}
          />
          
          <TransactionSelection 
            customerName={customerName}
            availableTransactions={availableTransactions}
            selectedTransactions={selectedTransactions}
            onTransactionSelect={handleTransactionSelect}
          />
          
          <div className="p-4">
            <div className="bg-white rounded-md shadow-sm p-4 mb-6">
              <ItemsTable 
                items={creditNote.items} 
                addItem={addCreditNoteItem} 
                updateItem={updateCreditNoteItem} 
                removeItem={removeCreditNoteItem}
                clearAllItems={clearAllItems}
                otherFees={creditNote.otherFees || { description: "", amount: undefined }}
                updateOtherFees={updateOtherFees}
              />
            </div>
            
            <div className="mt-8">
              <FormMessage 
                message={creditNote.messageOnInvoice}
                label="MESSAGE ON CREDIT NOTE" 
                onChange={(message) => updateCreditNote({ messageOnInvoice: message })}
                placeholder="Enter a message to be displayed on the credit note"
              />
            </div>
          </div>
          
          <FormActions 
            onSave={saveCreditNote}
            onClear={clearAllItems}
            onSaveAndNew={handleSaveAndNew}
            formType="creditNote"
          />
        </div>
      </div>
    </>
  );
}
