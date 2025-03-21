
import { supabase } from "@/integrations/supabase/client";
import { RefundReceiptType } from "@/types/document";
import { saveDocument } from "./documentsService";
import { toast } from "sonner";

export async function saveRefundReceipt(refundReceipt: RefundReceiptType) {
  try {
    // Save the refund receipt using the general document service
    const documentId = await saveDocument(refundReceipt, 'refund_receipt');
    
    // If there are selected transactions to reference, create references
    if (refundReceipt.referencedTransactions && refundReceipt.referencedTransactions.length > 0) {
      await saveDocumentReferences(documentId, refundReceipt.referencedTransactions);
    }
    
    toast.success('Refund receipt saved successfully');
    return documentId;
  } catch (error) {
    console.error('Error saving refund receipt:', error);
    toast.error('Failed to save refund receipt');
    throw error;
  }
}

async function saveDocumentReferences(sourceDocumentId: string, referencedTransactionIds: string[]) {
  // Create document references for each transaction
  const references = referencedTransactionIds.map(transactionId => ({
    source_document_id: sourceDocumentId,
    referenced_document_id: transactionId,
    reference_type: 'refund',
    amount: 0 // In a real app, you would calculate the refund amount for each transaction
  }));
  
  const { error } = await supabase
    .from('document_references')
    .insert(references);
  
  if (error) {
    console.error('Error saving document references:', error);
    throw new Error(error.message);
  }
}
