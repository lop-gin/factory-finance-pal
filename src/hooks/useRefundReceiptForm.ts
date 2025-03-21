
import { useState, useCallback, useEffect } from "react";
import { RefundReceiptType } from "@/types/document";
import { generateRefundReceiptNumber } from "@/lib/document-utils";
import { saveRefundReceipt as saveRefundReceiptToDb } from "@/services/refundReceiptService";
import { toast } from "sonner";

// Import refactored utility functions
import { validateRefundReceipt, processItems } from "./refund-receipt/refundReceiptUtils";
import {
  updateRefundReceipt as updateRefundReceiptState,
  updateCustomer as updateCustomerState,
  updateReferencedTransactions as updateReferencedTransactionsState,
  addRefundReceiptItem as addRefundReceiptItemState,
  updateRefundReceiptItem as updateRefundReceiptItemState,
  removeRefundReceiptItem as removeRefundReceiptItemState,
  clearAllItems as clearAllItemsState,
  updateOtherFees as updateOtherFeesState,
  recalculateTotals,
  addItems as addItemsState
} from "./refund-receipt/refundReceiptStateHandlers";

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

  // Recalculate totals whenever items or fees change
  useEffect(() => {
    recalculateTotals(setRefundReceipt, refundReceipt);
  }, [refundReceipt.items, refundReceipt.otherFees?.amount]);

  // Wrapped state handlers with useCallback
  const updateRefundReceipt = useCallback(
    (updates: Partial<RefundReceiptType>) => {
      updateRefundReceiptState(setRefundReceipt, updates);
    },
    []
  );

  const updateCustomer = useCallback((customer: any) => {
    updateCustomerState(setRefundReceipt, customer);
  }, []);

  const updateReferencedTransactions = useCallback((transactionIds: string[]) => {
    updateReferencedTransactionsState(setRefundReceipt, transactionIds);
  }, []);

  const addRefundReceiptItem = useCallback(() => {
    addRefundReceiptItemState(setRefundReceipt);
  }, []);

  const addItems = useCallback((items: any[]) => {
    const processedItems = processItems(items);
    addItemsState(setRefundReceipt, processedItems);
  }, []);

  const updateRefundReceiptItem = useCallback(
    (itemId: string, updates: any) => {
      updateRefundReceiptItemState(setRefundReceipt, itemId, updates);
    },
    []
  );

  const removeRefundReceiptItem = useCallback(
    (itemId: string) => {
      removeRefundReceiptItemState(setRefundReceipt, itemId);
    },
    []
  );

  const clearAllItems = useCallback(() => {
    clearAllItemsState(setRefundReceipt);
  }, []);

  const updateOtherFees = useCallback(
    (updates: any) => {
      updateOtherFeesState(setRefundReceipt, updates);
    },
    []
  );

  const saveRefundReceiptToDatabase = useCallback(async () => {
    try {
      if (!validateRefundReceipt(refundReceipt)) {
        return false;
      }
      
      // Save the refund receipt to the database
      await saveRefundReceiptToDb(refundReceipt);
      
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
