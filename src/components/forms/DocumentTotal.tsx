
import React from "react";

interface DocumentTotalProps {
  total: number;
  balanceDue: number;
  otherFeesAmount?: number;
}

export const DocumentTotal: React.FC<DocumentTotalProps> = ({
  total,
  balanceDue,
  otherFeesAmount
}) => {
  const calculatedTotal = total + (otherFeesAmount || 0);
  const calculatedBalanceDue = balanceDue + (otherFeesAmount || 0);

  return (
    <div className="bg-gray-50 p-4 rounded-md border border-gray-200 h-full flex flex-col justify-center">
      <div className="text-center space-y-4">
        <div>
          <div className="text-xs text-gray-500">Total Amount</div>
          <div className="text-2xl font-bold text-gray-800">
            Ksh{calculatedTotal.toFixed(2)}
          </div>
        </div>
        <div>
          <div className="text-xs text-gray-500">Balance Due</div>
          <div className="text-xl font-bold text-gray-800">
            Ksh{calculatedBalanceDue.toFixed(2)}
          </div>
        </div>
      </div>
    </div>
  );
};
