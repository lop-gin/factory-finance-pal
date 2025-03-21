
export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface Customer {
  id?: string;
  name: string;
  email: string;
  company?: string;
  billingAddress: Address;
}

export interface DocumentItem {
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

export interface OtherFees {
  description: string;
  amount?: number;
}

// Base document type that can be extended by specific document types
export interface Document {
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

// Invoice specific fields
export interface InvoiceType extends Document {
  invoiceNumber: string;
  invoiceDate: Date;
  dueDate: Date;
  terms: string;
}

// Sales Receipt specific fields
export interface SalesReceiptType extends Document {
  receiptNumber: string;
  saleDate: Date;
}

// Credit Note specific fields
export interface CreditNoteType extends Document {
  creditNoteNumber: string;
  creditNoteDate: Date;
}

// Payment specific types
export interface OutstandingInvoice {
  id: string;
  invoiceNumber: string;
  invoiceDate: Date;
  dueDate: Date;
  status: 'open' | 'overdue' | 'paid' | 'partial';
  originalAmount: number;
  paymentReceived: number;
  openBalance: number;
  payment?: number;
  selected: boolean;
}

export interface PaymentType {
  paymentId: string;
  paymentDate: Date;
  customer: Customer;
  amountReceived: number;
  outstandingInvoices: OutstandingInvoice[];
  message: string;
  amountToApply: number;
  amountToCredit: number;
}
