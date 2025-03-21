
import { useState } from "react";
import { Document, DocumentItem, Customer, OtherFees } from "@/types/document";

export function useDocumentForm<T extends Document>(initialState: T) {
  const [document, setDocument] = useState<T>(initialState);

  // Function to update document state
  const updateDocument = (updates: Partial<T>) => {
    setDocument((prev) => {
      const newDocument = { ...prev, ...updates };
      
      // Recalculate totals
      const subTotal = newDocument.items.reduce(
        (sum, item) => sum + ((item.quantity || 0) * ((item.unitPrice || 0) || (item.rate || 0))),
        0
      );
      
      const tax = newDocument.items.reduce((sum, item) => {
        const itemAmount = (item.quantity || 0) * ((item.unitPrice || 0) || (item.rate || 0));
        return sum + (itemAmount * (((item.taxPercent || 0)) / 100));
      }, 0);
      
      const otherFeesAmount = newDocument.otherFees?.amount || 0;
      const total = subTotal + tax + otherFeesAmount;
      const balanceDue = total;
      
      return {
        ...newDocument,
        subTotal,
        total,
        balanceDue
      } as T;
    });
  };

  // Function to update customer
  const updateCustomer = (customer: Customer) => {
    updateDocument({ customer } as Partial<T>);
  };

  // Function to update other fees
  const updateOtherFees = (updates: Partial<OtherFees>) => {
    setDocument((prev) => {
      const newOtherFees = { ...(prev.otherFees || { description: "", amount: undefined }), ...updates };
      
      // Trigger a recalculation of totals
      const updatedDoc = {
        ...prev,
        otherFees: newOtherFees
      } as T;
      
      updateDocument(updatedDoc);
      
      return updatedDoc;
    });
  };

  // Function to add a new item
  const addDocumentItem = () => {
    updateDocument({
      items: [
        ...document.items,
        {
          id: `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
          serviceDate: "",
          category: "",
          product: "",
          description: "",
          quantity: undefined,
          unit: "",
          unitPrice: undefined,
          rate: undefined,
          taxPercent: undefined,
          amount: 0,
        },
      ],
    } as Partial<T>);
  };

  // Function to update an item
  const updateDocumentItem = (itemId: string, updates: Partial<DocumentItem>) => {
    const updatedItems = document.items.map((item) => {
      if (item.id === itemId) {
        const updatedItem = { ...item, ...updates };
        // Calculate the amount
        updatedItem.amount = (updatedItem.quantity || 0) * ((updatedItem.unitPrice || 0) || (updatedItem.rate || 0));
        return updatedItem;
      }
      return item;
    });
    
    updateDocument({ items: updatedItems } as Partial<T>);
  };

  // Function to remove an item
  const removeDocumentItem = (itemId: string) => {
    // Only remove if there's more than one item
    if (document.items.length > 1) {
      updateDocument({
        items: document.items.filter((item) => item.id !== itemId),
      } as Partial<T>);
    }
  };

  // Function to clear all items but leave one empty item
  const clearAllItems = () => {
    updateDocument({
      items: [
        {
          id: `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
          serviceDate: "",
          category: "",
          product: "",
          description: "",
          quantity: undefined,
          unit: "",
          unitPrice: undefined,
          rate: undefined,
          taxPercent: undefined,
          amount: 0,
        }
      ]
    } as Partial<T>);
  };

  // Function to save document
  const saveDocument = () => {
    console.log("Saving document:", document);
    // In a real application, you would send this to your backend
  };

  return {
    document,
    updateDocument,
    updateCustomer,
    addDocumentItem,
    updateDocumentItem,
    removeDocumentItem,
    clearAllItems,
    updateOtherFees,
    saveDocument
  };
}
