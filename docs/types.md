
# Type Definitions Documentation

This document explains the TypeScript type definitions used in the application.

## Core Types

### Document (Base Type)

The base type for all document types (invoices, receipts, etc.).

```typescript
interface Document {
  customer: Customer;
  items: DocumentItem[];
  messageOnInvoice: string;
  messageOnStatement: string;
  salesRep?: string;
  tags?: string[];
  subTotal: number;
  total: number;
  balanceDue: number;
  otherFees?: OtherFees;
}
```

### InvoiceType

Extends the base Document type with invoice-specific fields.

```typescript
interface InvoiceType extends Document {
  invoiceNumber: string;
  invoiceDate: Date;
  dueDate: Date;
  terms: string;
}
```

### SalesReceiptType

Extends the base Document type with sales receipt-specific fields.

```typescript
interface SalesReceiptType extends Document {
  receiptNumber: string;
  saleDate: Date;
}
```

## Supporting Types

### Customer

Represents a customer with billing information.

```typescript
interface Customer {
  id?: string;
  name: string;
  email: string;
  company?: string;
  billingAddress: Address;
}
```

### Address

Represents a physical address.

```typescript
interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}
```

### DocumentItem

Represents an item in a document (product or service).

```typescript
interface DocumentItem {
  id: string;
  serviceDate?: string;
  category?: string;
  product: string;
  description: string;
  quantity?: number;
  unit?: string;
  unitPrice?: number;
  rate?: number;
  taxPercent?: number;
  amount: number;
}
```

### OtherFees

Represents additional fees applied to a document.

```typescript
interface OtherFees {
  description: string;
  amount?: number;
}
```

## Usage Patterns

These types are used throughout the application to:

1. Ensure type safety when handling document data
2. Define prop types for components
3. Define the shape of state in React hooks
4. Provide intellisense and autocompletion in the editor

The type definitions are structured to allow for future extension with other document types while maintaining a common base of functionality.

Many numeric fields use the optional `?` modifier to allow for undefined values, which is important for handling empty input fields and calculations without introducing NaN values.
