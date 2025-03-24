
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export interface AmountReceivedInputProps {
  amount: number;
  onChange: (amount: number) => void;
}

export const AmountReceivedInput: React.FC<AmountReceivedInputProps> = ({
  amount,
  onChange
}) => {
  return (
    <div className="mt-4">
      <Label htmlFor="amount-received" className="text-xs text-gray-500">
        Amount Received
      </Label>
      <div className="mt-1 relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <span className="text-gray-500 sm:text-sm">Ksh</span>
        </div>
        <Input
          id="amount-received"
          type="number"
          step="0.01"
          min="0"
          value={amount}
          onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
          className="pl-12 h-9 text-lg font-semibold"
        />
      </div>
    </div>
  );
};
