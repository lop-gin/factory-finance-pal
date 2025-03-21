
import { RefundReceiptType, DocumentItem } from "@/types/document";
import { toast } from "sonner";

/**
 * Calculate totals for a refund receipt
 */
export const calculateRefundTotals = (items: DocumentItem[], otherFeesAmount: number = 0) => {
  const itemsTotal = items.reduce(
    (sum, item) => sum + (item.amount || 0),
    0
  );

  const total = itemsTotal + otherFeesAmount;

  return {
    subTotal: itemsTotal,
    total,
    balanceDue: total
  };
};

/**
 * Validate a refund receipt before saving
 */
export const validateRefundReceipt = (refundReceipt: RefundReceiptType): boolean => {
  if (!refundReceipt.customer.name) {
    toast.error("Please enter customer information");
    return false;
  }
  
  if (refundReceipt.items.length === 0) {
    toast.error("Please add at least one item");
    return false;
  }
  
  return true;
};

/**
 * Process new items for the refund receipt
 */
export const processItems = (items: DocumentItem[]): DocumentItem[] => {
  return items.map(item => ({
    ...item,
    id: `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
    category: item.category || "",
    serviceDate: item.serviceDate || "",
    unit: item.unit || "",
    rate: item.rate,
    quantity: item.quantity || 0,
    unitPrice: item.unitPrice || 0,
    taxPercent: item.taxPercent || 0,
    amount: (item.quantity || 0) * (item.unitPrice || 0)
  }));
};
