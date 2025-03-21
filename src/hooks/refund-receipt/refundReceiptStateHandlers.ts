
import { RefundReceiptType, DocumentItem, Customer, OtherFees } from "@/types/document";
import { Dispatch, SetStateAction } from "react";
import { calculateRefundTotals } from "./refundReceiptUtils";

/**
 * Update refund receipt object state
 */
export const updateRefundReceipt = (
  setRefundReceipt: Dispatch<SetStateAction<RefundReceiptType>>,
  updates: Partial<RefundReceiptType>
) => {
  setRefundReceipt((prev) => ({
    ...prev,
    ...updates
  }));
};

/**
 * Update customer information
 */
export const updateCustomer = (
  setRefundReceipt: Dispatch<SetStateAction<RefundReceiptType>>,
  customer: Customer
) => {
  setRefundReceipt((prev) => ({
    ...prev,
    customer
  }));
};

/**
 * Update referenced transactions
 */
export const updateReferencedTransactions = (
  setRefundReceipt: Dispatch<SetStateAction<RefundReceiptType>>,
  transactionIds: string[]
) => {
  setRefundReceipt((prev) => ({
    ...prev,
    referencedTransactions: transactionIds
  }));
};

/**
 * Add a new item to the refund receipt
 */
export const addRefundReceiptItem = (
  setRefundReceipt: Dispatch<SetStateAction<RefundReceiptType>>
) => {
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
};

/**
 * Update an existing item in the refund receipt
 */
export const updateRefundReceiptItem = (
  setRefundReceipt: Dispatch<SetStateAction<RefundReceiptType>>,
  itemId: string, 
  updates: Partial<DocumentItem>
) => {
  setRefundReceipt((prev) => ({
    ...prev,
    items: prev.items.map((item) =>
      item.id === itemId ? { ...item, ...updates } : item
    )
  }));
};

/**
 * Add multiple items to the refund receipt
 */
export const addItems = (
  setRefundReceipt: Dispatch<SetStateAction<RefundReceiptType>>,
  items: DocumentItem[]
) => {
  setRefundReceipt((prev) => ({
    ...prev,
    items: [...prev.items, ...items]
  }));
};

/**
 * Remove an item from the refund receipt
 */
export const removeRefundReceiptItem = (
  setRefundReceipt: Dispatch<SetStateAction<RefundReceiptType>>,
  itemId: string
) => {
  setRefundReceipt((prev) => ({
    ...prev,
    items: prev.items.filter((item) => item.id !== itemId)
  }));
};

/**
 * Clear all items from the refund receipt
 */
export const clearAllItems = (
  setRefundReceipt: Dispatch<SetStateAction<RefundReceiptType>>
) => {
  setRefundReceipt((prev) => ({
    ...prev,
    items: []
  }));
};

/**
 * Update other fees in the refund receipt
 */
export const updateOtherFees = (
  setRefundReceipt: Dispatch<SetStateAction<RefundReceiptType>>,
  updates: Partial<OtherFees>
) => {
  setRefundReceipt((prev) => ({
    ...prev,
    otherFees: {
      ...(prev.otherFees || { description: "" }),
      ...updates
    }
  }));
};

/**
 * Calculate totals and update the refund receipt state
 */
export const recalculateTotals = (
  setRefundReceipt: Dispatch<SetStateAction<RefundReceiptType>>,
  refundReceipt: RefundReceiptType
) => {
  const otherFeesAmount = refundReceipt.otherFees?.amount || 0;
  const totals = calculateRefundTotals(refundReceipt.items, otherFeesAmount);
  
  setRefundReceipt((prev) => ({
    ...prev,
    ...totals
  }));
};
