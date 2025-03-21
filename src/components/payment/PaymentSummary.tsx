
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface PaymentSummaryProps {
  amountToApply: number;
  amountToCredit: number;
  onClearPayment: () => void;
}

export const PaymentSummary: React.FC<PaymentSummaryProps> = ({
  amountToApply,
  amountToCredit,
  onClearPayment,
}) => {
  return (
    <Card className="mt-4 ml-auto" style={{ maxWidth: '300px' }}>
      <CardContent className="p-4">
        <div className="space-y-4">
          <div className="flex flex-col space-y-2">
            <div className="flex justify-between items-center">
              <span className="font-medium text-sm text-gray-700">Amount to Apply:</span>
              <span className="font-bold">Ksh{amountToApply.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-medium text-sm text-gray-700">Amount to Credit:</span>
              <span className="font-bold">Ksh{amountToCredit.toFixed(2)}</span>
            </div>
          </div>
          
          <Button 
            onClick={onClearPayment} 
            variant="outline" 
            size="sm" 
            className="w-full"
          >
            Clear Payment
          </Button>
          
          {amountToCredit > 0 && (
            <div className="mt-2 text-sm text-blue-600 bg-blue-50 p-3 rounded-md">
              This transaction will create an additional credit in the amount of Ksh{amountToCredit.toFixed(2)}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default PaymentSummary;
