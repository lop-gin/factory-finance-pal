
import React from "react";
import { CustomerSection } from "@/components/forms/CustomerSection";
import { DateField } from "@/components/forms/DateFields";
import { SalesRepresentative } from "@/components/forms/SalesRepresentative";
import { DocumentTotal } from "@/components/forms/DocumentTotal";
import { ItemsTable } from "@/components/forms/ItemsTable";
import { FormMessage } from "@/components/forms/FormMessage";
import { Customer, DocumentItem, OtherFees } from "@/types/document";
import { RefundReceiptType } from "@/hooks/useRefundReceiptForm";

interface RefundReceiptFormProps {
  refundReceipt: RefundReceiptType;
  updateRefundReceipt: (updates: Partial<RefundReceiptType>) => void;
  updateCustomer: (customer: Customer) => void;
  addRefundReceiptItem: () => void;
  updateRefundReceiptItem: (itemId: string, updates: Partial<DocumentItem>) => void;
  removeRefundReceiptItem: (itemId: string) => void;
  clearAllItems: () => void;
  updateOtherFees: (updates: Partial<OtherFees>) => void;
  onCustomerSelect: (name: string) => void;
}

export const RefundReceiptForm: React.FC<RefundReceiptFormProps> = ({
  refundReceipt,
  updateRefundReceipt,
  updateCustomer,
  addRefundReceiptItem,
  updateRefundReceiptItem,
  removeRefundReceiptItem,
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
                customer={refundReceipt.customer}
                document={refundReceipt}
                updateCustomer={updateCustomer} 
                updateDocument={updateRefundReceipt}
                onCustomerSelect={onCustomerSelect}
              />
            </div>
            <div>
              <div className="space-y-3 pb-5">
                <DateField 
                  label="Refund receipt date"
                  date={refundReceipt.refundReceiptDate}
                  onDateChange={(date) => updateRefundReceipt({ refundReceiptDate: date })}
                />
                
                <SalesRepresentative 
                  value={refundReceipt.salesRep || ""}
                  onChange={(rep) => updateRefundReceipt({ salesRep: rep })}
                />
              </div>
            </div>
          </div>
        </div>
        <div>
          <DocumentTotal 
            total={refundReceipt.total}
            balanceDue={refundReceipt.balanceDue}
            otherFeesAmount={refundReceipt.otherFees?.amount}
            documentType="refundReceipt"
          />
        </div>
      </div>
    </div>
  );
};

export default RefundReceiptForm;
