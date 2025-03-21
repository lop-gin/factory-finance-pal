
import { supabase } from "@/integrations/supabase/client";
import { DocumentItem, Document, OtherFees, RefundReceiptType } from "@/types/document";
import { transformCustomerFromDB } from "@/lib/transform-utils";

// Function to save a document to the database
export async function saveDocument(document: Document, documentType: string) {
  const { data: documentData, error: documentError } = await supabase
    .from('documents')
    .insert({
      document_type: documentType,
      document_number: getDocumentNumber(document, documentType),
      customer_id: document.customer.id,
      issue_date: getIssueDate(document, documentType),
      due_date: getDueDate(document, documentType),
      total_amount: document.total,
      balance_due: document.balanceDue,
      message_on_invoice: document.messageOnInvoice,
      message_on_statement: document.messageOnStatement,
      sales_rep: document.salesRep,
      tags: document.tags
    })
    .select()
    .maybeSingle();
  
  if (documentError) {
    console.error(`Error creating ${documentType}:`, documentError);
    throw new Error(documentError.message);
  }
  
  // Save specific document type data if needed
  if (documentType === 'refund_receipt') {
    const refundReceipt = document as RefundReceiptType;
    await saveRefundReceiptDetails(documentData.id, refundReceipt);
  }
  
  // Save document items
  if (document.items && document.items.length > 0) {
    await saveDocumentItems(documentData.id, document.items);
  }
  
  // Save other fees if they exist
  if (document.otherFees?.description && document.otherFees?.amount) {
    await saveOtherFees(documentData.id, document.otherFees);
  }
  
  return documentData.id;
}

// Helper function to save refund receipt specific details
async function saveRefundReceiptDetails(documentId: string, refundReceipt: RefundReceiptType) {
  const { error } = await supabase
    .from('refund_receipts')
    .insert({
      id: documentId,
      refund_date: refundReceipt.refundReceiptDate
    });
  
  if (error) {
    console.error('Error saving refund receipt details:', error);
    throw new Error(error.message);
  }
}

// Helper function to save document items
async function saveDocumentItems(documentId: string, items: DocumentItem[]) {
  const formattedItems = items.map(item => ({
    document_id: documentId,
    product: item.product,
    description: item.description,
    quantity: item.quantity,
    unit: item.unit,
    unit_price: item.unitPrice,
    tax_percent: item.taxPercent,
    amount: item.amount,
    service_date: item.serviceDate,
    category: item.category
  }));
  
  const { error } = await supabase
    .from('document_items')
    .insert(formattedItems);
  
  if (error) {
    console.error('Error saving document items:', error);
    throw new Error(error.message);
  }
}

// Helper function to save other fees
async function saveOtherFees(documentId: string, otherFees: OtherFees) {
  const { error } = await supabase
    .from('other_fees')
    .insert({
      document_id: documentId,
      description: otherFees.description,
      amount: otherFees.amount
    });
  
  if (error) {
    console.error('Error saving other fees:', error);
    throw new Error(error.message);
  }
}

// Helper functions to extract document-specific data
function getDocumentNumber(document: any, documentType: string): string {
  switch (documentType) {
    case 'invoice':
      return document.invoiceNumber;
    case 'receipt':
      return document.receiptNumber;
    case 'estimate':
      return document.estimateNumber;
    case 'credit_note':
      return document.creditNoteNumber;
    case 'refund_receipt':
      return document.refundReceiptNumber;
    default:
      return '';
  }
}

function getIssueDate(document: any, documentType: string): Date {
  switch (documentType) {
    case 'invoice':
      return document.invoiceDate;
    case 'receipt':
      return document.saleDate;
    case 'estimate':
      return document.estimateDate;
    case 'credit_note':
      return document.creditNoteDate;
    case 'refund_receipt':
      return document.refundReceiptDate;
    default:
      return new Date();
  }
}

function getDueDate(document: any, documentType: string): Date | null {
  switch (documentType) {
    case 'invoice':
      return document.dueDate;
    case 'estimate':
      return document.expirationDate;
    default:
      return null;
  }
}

export async function getTransactionsByCustomerId(customerId: string) {
  const { data, error } = await supabase
    .from('documents')
    .select('id, document_type, document_number, issue_date, total_amount, status')
    .eq('customer_id', customerId)
    .in('document_type', ['invoice', 'receipt'])
    .order('issue_date', { ascending: false });
  
  if (error) {
    console.error('Error fetching transactions:', error);
    throw new Error(error.message);
  }
  
  // Transform the data to match the expected format
  return data.map((doc: any) => ({
    id: doc.id,
    type: doc.document_type === 'invoice' ? 'invoice' : 'receipt',
    date: doc.issue_date,
    number: doc.document_number,
    total: doc.total_amount,
    status: doc.status
  }));
}

export async function getDocumentItems(documentId: string) {
  const { data, error } = await supabase
    .from('document_items')
    .select('*')
    .eq('document_id', documentId);
  
  if (error) {
    console.error('Error fetching document items:', error);
    throw new Error(error.message);
  }
  
  // Transform the data to match the expected DocumentItem format
  return data.map((item: any) => ({
    id: item.id,
    product: item.product,
    description: item.description,
    quantity: item.quantity,
    unit: item.unit || '',
    unitPrice: item.unit_price,
    taxPercent: item.tax_percent,
    amount: item.amount,
    serviceDate: item.service_date || '',
    category: item.category || '',
    rate: undefined // This field isn't in our database but is in the type
  }));
}
