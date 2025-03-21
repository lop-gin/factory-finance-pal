
# Data Model Documentation

This document outlines the data structures used throughout the application.

## Core Types

### Document

The base `Document` interface represents common fields shared by all document types:

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

This base interface is extended for specific document types.

### InvoiceType

The `InvoiceType` adds invoice-specific fields to the base document:

```typescript
interface InvoiceType extends Document {
  invoiceNumber: string;
  invoiceDate: Date;
  dueDate: Date;
  terms: string;
}
```

### SalesReceiptType

The `SalesReceiptType` adds receipt-specific fields to the base document:

```typescript
interface SalesReceiptType extends Document {
  receiptNumber: string;
  saleDate: Date;
}
```

### Customer

The `Customer` interface represents a customer with contact information and address:

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

The `Address` interface represents a physical address:

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

The `DocumentItem` interface represents an item in a document:

```typescript
interface DocumentItem {
  id: string;
  serviceDate?: string;
  category?: string;
  product: string;
  description: string;
  quantity: number;
  unit?: string;
  unitPrice?: number;
  rate: number;
  taxPercent?: number;
  amount: number;
}
```

### OtherFees

The `OtherFees` interface represents additional fees that can be added to a document:

```typescript
interface OtherFees {
  description: string;
  amount: number;
}
```

## Data Flow

1. **Form Initialization**:
   - Initial document state is created with default values
   - Empty customer and one empty item are added

2. **User Input**:
   - User updates form fields
   - Changes are captured and document state is updated

3. **Calculations**:
   - When items are updated, totals are recalculated
   - Tax amounts are calculated based on tax percentages
   - Due dates are calculated based on terms (for invoices)

4. **Saving**:
   - The complete document is logged to console (in production, this would be sent to a server)

## Future Enhancements

The data model could be extended in the future with:

1. **Payment Tracking**:
   - Add payment-related fields to track partial payments
   - Include payment history

2. **Customer Database**:
   - Expand customer model to include contact history
   - Add multiple contact persons per customer

3. **Item Catalog**:
   - Create a products/services catalog
   - Link document items to catalog items

4. **Tax Rules**:
   - Add support for different tax rules
   - Include tax exemptions
