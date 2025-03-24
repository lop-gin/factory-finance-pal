
import React from "react";
import { XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface PaymentSummaryProps {
  amountToApply: number;
  amountToCredit: number;
  onClearPayment: () => void;
}

export const PaymentSummary: React.FC<PaymentSummaryProps> = ({ 
  amountToApply, 
  amountToCredit,
  onClearPayment
}) => {
  return (
    <div className="rounded-md border p-4">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-sm font-medium">Payment Summary</h3>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={onClearPayment}
          className="h-8 px-2 text-red-500 hover:text-red-700 hover:bg-red-50"
        >
          <XCircle className="h-4 w-4 mr-1" />
          <span className="text-xs">Clear</span>
        </Button>
      </div>
      
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-500">Amount to Apply:</span>
          <span>Ksh{amountToApply.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Amount to Credit:</span>
          <span>Ksh{amountToCredit.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};
