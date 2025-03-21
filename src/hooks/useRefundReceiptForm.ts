
import { Document, DocumentItem } from "@/types/document";
import { useDocumentForm } from "./useDocumentForm";
import { generateRefundReceiptNumber } from "@/lib/document-utils";

// Define the RefundReceiptType interface
export interface RefundReceiptType extends Document {
  refundReceiptNumber: string;
  refundReceiptDate: Date;
}

export function useRefundReceiptForm() {
  const initialRefundReceipt: RefundReceiptType = {
    refundReceiptNumber: generateRefundReceiptNumber(),
    refundReceiptDate: new Date(),
    customer: {
      name: "",
      email: "",
      company: "",
      billingAddress: {
        street: "",
        city: "",
        state: "",
        zipCode: "",
        country: "",
      },
    },
    items: [
      {
        id: Date.now().toString(),
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
    ],
    messageOnInvoice: "",
    messageOnStatement: "",
    salesRep: "",
    tags: [],
    subTotal: 0,
    total: 0,
    balanceDue: 0,
    otherFees: {
      description: "",
      amount: undefined
    }
  };

  const {
    document: refundReceipt,
    updateDocument: updateRefundReceipt,
    updateCustomer,
    addDocumentItem: addRefundReceiptItem,
    updateDocumentItem: updateRefundReceiptItem,
    removeDocumentItem: removeRefundReceiptItem,
    clearAllItems,
    updateOtherFees,
    saveDocument: saveRefundReceipt
  } = useDocumentForm<RefundReceiptType>(initialRefundReceipt);

  // Function to add multiple items at once
  const addItems = (items: DocumentItem[]) => {
    // Ensure each item has valid properties and unique ID
    const processedItems = items.map(item => ({
      ...item,
      id: `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      quantity: item.quantity || 0,
      unitPrice: item.unitPrice || 0,
      taxPercent: item.taxPercent || 0,
      serviceDate: item.serviceDate || "",
      category: item.category || "",
      unit: item.unit || "",
      rate: item.rate,
      amount: (item.quantity || 0) * (item.unitPrice || 0)
    }));
    
    // Add to existing items instead of replacing them
    updateRefundReceipt({
      items: [...refundReceipt.items, ...processedItems]
    } as Partial<RefundReceiptType>);
  };

  // Function to set multiple items at once (replaces all items)
  const setItems = (items: DocumentItem[]) => {
    // Ensure each item has valid properties and unique ID
    const processedItems = items.map(item => ({
      ...item,
      id: `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      quantity: item.quantity || 0,
      unitPrice: item.unitPrice || 0,
      taxPercent: item.taxPercent || 0,
      serviceDate: item.serviceDate || "",
      category: item.category || "",
      unit: item.unit || "",
      rate: item.rate,
      amount: (item.quantity || 0) * (item.unitPrice || 0)
    }));
    
    updateRefundReceipt({ items: processedItems } as Partial<RefundReceiptType>);
  };

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
    setItems,
    addItems
  };
}
