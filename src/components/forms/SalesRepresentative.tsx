
import React from "react";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { HelpCircle } from "lucide-react";

interface SalesRepresentativeProps {
  representativeType?: "sales" | "procurement";
  value: string;
  onChange: (value: string) => void;
}

export const SalesRepresentative: React.FC<SalesRepresentativeProps> = ({
  representativeType = "sales",
  value,
  onChange
}) => {
  const labelText = representativeType === "sales" ? "Sales Rep" : "Procurement Rep";
  
  return (
    <div>
      <div className="flex items-center mb-1">
        <Label htmlFor="salesRep" className="text-xs font-medium text-gray-600 mr-1">{labelText}</Label>
        <HelpCircle className="h-3 w-3 text-gray-400" />
      </div>
      <Select
        value={value}
        onValueChange={onChange}
      >
        <SelectTrigger className="w-full h-9 text-xs">
          <SelectValue placeholder={`Select ${labelText}`} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="rep1">John Doe</SelectItem>
          <SelectItem value="rep2">Jane Smith</SelectItem>
          <SelectItem value="rep3">Alex Johnson</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
