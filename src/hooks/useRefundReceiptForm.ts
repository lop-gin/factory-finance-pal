
import { useState, useCallback } from "react";
import { Document, DocumentItem, Customer, OtherFees, RefundReceiptType } from "@/types/document";
import { generateRefundReceiptNumber } from "@/lib/document-utils";
import { saveRefundReceipt } from "@/services/refundReceiptService";
import { toast } from "sonner";

export const useRefundReceiptForm = () => {
  const initialState: RefundReceiptType = {
    refundReceiptNumber: generateRefundReceiptNumber(),
    refundReceiptDate: new Date(),
    customer: {
      name: "",
      email: "",
      billingAddress: {
        street: "",
        city: "",
        state: "",
        zipCode: "",
        country: ""
      }
    },
    items: [],
    messageOnInvoice: "",
    messageOnStatement: "",
    salesRep: "",
    subTotal: 0,
    total: 0,
    balanceDue: 0,
    referencedTransactions: []
  };

  const [refundReceipt, setRefundReceipt] = useState<RefundReceiptType>(initialState);

  const calculateTotals = useCallback(() => {
    const itemsTotal = refundReceipt.items.reduce(
      (sum, item) => sum + (item.amount || 0),
      0
    );

    const otherFeesAmount = refundReceipt.otherFees?.amount || 0;
    const total = itemsTotal + otherFeesAmount;

    setRefundReceipt((prev) => ({
      ...prev,
      subTotal: itemsTotal,
      total,
      balanceDue: total
    }));
  }, [refundReceipt.items, refundReceipt.otherFees?.amount]);

  const updateRefundReceipt = useCallback(
    (updates: Partial<RefundReceiptType>) => {
      setRefundReceipt((prev) => ({
        ...prev,
        ...updates
      }));
    },
    []
  );

  const updateCustomer = useCallback((customer: Customer) => {
    setRefundReceipt((prev) => ({
      ...prev,
      customer
    }));
  }, []);

  const updateReferencedTransactions = useCallback((transactionIds: string[]) => {
    setRefundReceipt((prev) => ({
      ...prev,
      referencedTransactions: transactionIds
    }));
  }, []);

  const addRefundReceiptItem = useCallback(() => {
    const newItem: DocumentItem = {
      id: `item-${Date.now()}`,
      product: "",
      description: "",
      amount: 0,
      quantity: 1,
      unitPrice: 0,
      taxPercent: 0,
      serviceDate: "",
      category: "",
      unit: ""
    };

    setRefundReceipt((prev) => ({
      ...prev,
      items: [...prev.items, newItem]
    }));
  }, []);

  const addItems = useCallback((items: DocumentItem[]) => {
    setRefundReceipt((prev) => ({
      ...prev,
      items: [...prev.items, ...items]
    }));
    
    // Calculate totals after adding items
    setTimeout(() => calculateTotals(), 0);
  }, [calculateTotals]);

  const updateRefundReceiptItem = useCallback(
    (itemId: string, updates: Partial<DocumentItem>) => {
      setRefundReceipt((prev) => ({
        ...prev,
        items: prev.items.map((item) =>
          item.id === itemId ? { ...item, ...updates } : item
        )
      }));
      
      // Calculate totals after updating item
      setTimeout(() => calculateTotals(), 0);
    },
    [calculateTotals]
  );

  const removeRefundReceiptItem = useCallback(
    (itemId: string) => {
      setRefundReceipt((prev) => ({
        ...prev,
        items: prev.items.filter((item) => item.id !== itemId)
      }));
      
      // Calculate totals after removing item
      setTimeout(() => calculateTotals(), 0);
    },
    [calculateTotals]
  );

  const clearAllItems = useCallback(() => {
    setRefundReceipt((prev) => ({
      ...prev,
      items: []
    }));
    
    // Calculate totals after clearing items
    setTimeout(() => calculateTotals(), 0);
  }, [calculateTotals]);

  const updateOtherFees = useCallback(
    (updates: Partial<OtherFees>) => {
      setRefundReceipt((prev) => ({
        ...prev,
        otherFees: {
          ...(prev.otherFees || { description: "" }),
          ...updates
        }
      }));
      
      // Calculate totals after updating fees
      setTimeout(() => calculateTotals(), 0);
    },
    [calculateTotals]
  );

  const saveRefundReceiptToDatabase = useCallback(async () => {
    try {
      if (!refundReceipt.customer.name) {
        toast.error("Please enter customer information");
        return;
      }
      
      if (refundReceipt.items.length === 0) {
        toast.error("Please add at least one item");
        return;
      }
      
      // Save the refund receipt to the database
      await saveRefundReceipt(refundReceipt);
      
      // Generate a new refund receipt number for the next refund receipt
      setRefundReceipt((prev) => ({
        ...prev,
        refundReceiptNumber: generateRefundReceiptNumber()
      }));
      
      return true;
    } catch (error) {
      console.error("Error saving refund receipt:", error);
      return false;
    }
  }, [refundReceipt]);

  const saveRefundReceipt = useCallback(() => {
    // For now, just log the data
    console.log("Refund Receipt Data:", JSON.stringify(refundReceipt, null, 2));
    saveRefundReceiptToDatabase();
    toast.success("Refund Receipt saved!");
  }, [refundReceipt, saveRefundReceiptToDatabase]);

  // Return the state and functions
  return {
    refundReceipt,
    updateRefundReceipt,
    updateCustomer,
    addRefundReceiptItem,
    updateRefundReceiptItem,
    removeRefundReceiptItem,
    clearAllItems,
    updateOtherFees,
    saveRefundReceipt,
    addItems,
    updateReferencedTransactions
  };
};

export default useRefundReceiptForm;
