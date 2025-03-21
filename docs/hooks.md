
# Hooks Documentation

This document explains the custom hooks used in the application.

## useDocumentForm

The base hook that provides common functionality for all document types.

### Purpose
- Manages document state
- Provides functions for updating document properties
- Handles calculations for totals
- Manages items and other fees

### Usage

```typescript
const {
  document,
  updateDocument,
  updateCustomer,
  addDocumentItem,
  updateDocumentItem,
  removeDocumentItem,
  clearAllItems,
  updateOtherFees,
  saveDocument
} = useDocumentForm<DocumentType>(initialState);
```

### Functions

- `updateDocument`: Updates any properties of the document
- `updateCustomer`: Updates customer information
- `addDocumentItem`: Adds a new item to the document
- `updateDocumentItem`: Updates an existing item
- `removeDocumentItem`: Removes an item
- `clearAllItems`: Clears all items and adds an empty one
- `updateOtherFees`: Updates the other fees section
- `saveDocument`: Handles saving the document (currently logs to console)

## useInvoiceForm

Extends `useDocumentForm` for invoice-specific functionality.

### Purpose
- Provides invoice-specific state management
- Handles terms and due date calculations

### Usage

```typescript
const {
  invoice,
  updateInvoice,
  updateCustomer,
  addInvoiceItem,
  updateInvoiceItem,
  removeInvoiceItem,
  clearAllItems,
  updateTerms,
  updateOtherFees,
  saveInvoice
} = useInvoiceForm();
```

### Additional Functions

- `updateTerms`: Updates the payment terms and recalculates the due date

## useSalesReceiptForm

Extends `useDocumentForm` for sales receipt-specific functionality.

### Usage

```typescript
const {
  salesReceipt,
  updateSalesReceipt,
  updateCustomer,
  addSalesReceiptItem,
  updateSalesReceiptItem,
  removeSalesReceiptItem,
  clearAllItems,
  updateOtherFees,
  saveSalesReceipt
} = useSalesReceiptForm();
```

## Implementation Details

All of these hooks use React's `useState` to manage state. The document state follows the structure defined in the type definitions (`document.ts`). 

The main advantage of this hook system is that it allows for specialized behavior for different document types while sharing common functionality through the base hook.
