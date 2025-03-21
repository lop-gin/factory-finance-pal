
import React from "react";
import { CustomerSection } from "@/components/forms/CustomerSection";
import { DateField } from "@/components/forms/DateFields";
import { SalesRepresentative } from "@/components/forms/SalesRepresentative";
import { DocumentTotal } from "@/components/forms/DocumentTotal";
import { ItemsTable } from "@/components/forms/ItemsTable";
import { FormMessage } from "@/components/forms/FormMessage";
import { Customer, CreditNoteType, DocumentItem, OtherFees } from "@/types/document";

interface CreditNoteFormProps {
  creditNote: CreditNoteType;
  updateCreditNote: (updates: Partial<CreditNoteType>) => void;
  updateCustomer: (customer: Customer) => void;
  addCreditNoteItem: () => void;
  updateCreditNoteItem: (itemId: string, updates: Partial<DocumentItem>) => void;
  removeCreditNoteItem: (itemId: string) => void;
  clearAllItems: () => void;
  updateOtherFees: (updates: Partial<OtherFees>) => void;
  onCustomerSelect: (name: string) => void;
}

export const CreditNoteForm: React.FC<CreditNoteFormProps> = ({
  creditNote,
  updateCreditNote,
  updateCustomer,
  addCreditNoteItem,
  updateCreditNoteItem,
  removeCreditNoteItem,
  clearAllItems,
  updateOtherFees,
  onCustomerSelect,
}) => {
  return (
    <div className="p-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="md:col-span-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <CustomerSection 
                customer={creditNote.customer}
                document={creditNote}
                updateCustomer={updateCustomer} 
                updateDocument={updateCreditNote}
                onCustomerSelect={onCustomerSelect}
              />
            </div>
            <div>
              <div className="space-y-3 pb-5">
                <DateField 
                  label="Credit note date"
                  date={creditNote.creditNoteDate}
                  onDateChange={(date) => updateCreditNote({ creditNoteDate: date })}
                />
                
                <SalesRepresentative 
                  value={creditNote.salesRep || ""}
                  onChange={(rep) => updateCreditNote({ salesRep: rep })}
                />
              </div>
            </div>
          </div>
        </div>
        <div>
          <DocumentTotal 
            total={creditNote.total}
            balanceDue={creditNote.balanceDue}
            otherFeesAmount={creditNote.otherFees?.amount}
          />
        </div>
      </div>
    </div>
  );
};
