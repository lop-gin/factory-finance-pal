
import React from "react";
import { HelpCircle } from "lucide-react";

export const TableHeader: React.FC = () => {
  return (
    <tr className="text-xs text-gray-600 border-b bg-gray-50">
      <th className="text-center w-8 py-1.5 border-r">
        <span className="text-[11px]">#</span>
      </th>
      <th className="text-left py-1.5 w-[10%] border-r">
        <span className="text-[11px]">CATEGORY</span>
      </th>
      <th className="text-left py-1.5 w-[15%] border-r">
        <div className="flex items-center">
          <span className="text-[11px]">PRODUCT/SERVICE</span>
          <HelpCircle className="h-3 w-3 text-gray-400 ml-1" />
        </div>
      </th>
      <th className="text-left py-1.5 w-[25%] border-r">
        <span className="text-[11px]">DESCRIPTION</span>
      </th>
      <th className="text-right py-1.5 w-[8%] border-r">
        <span className="text-[11px]">QTY</span>
      </th>
      <th className="text-right py-1.5 w-[10%] border-r">
        <span className="text-[11px]">UNIT</span>
      </th>
      <th className="text-right py-1.5 w-[10%] border-r">
        <span className="text-[11px]">UNIT PRICE</span>
      </th>
      <th className="text-right py-1.5 w-[8%] border-r">
        <span className="text-[11px]">TAX %</span>
      </th>
      <th className="text-right py-1.5 w-[10%] border-r">
        <span className="text-[11px]">AMOUNT</span>
      </th>
      <th className="text-center w-8 py-1.5"></th>
    </tr>
  );
};
