
import React from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

type FormType = "invoice" | "salesReceipt" | "creditNote" | "estimate" | "purchaseOrder" | "payment";

interface FormActionsProps {
  onSave: () => void;
  onClear: () => void;
  onSaveAndNew: () => void;
  formType: FormType;
}

export const FormActions: React.FC<FormActionsProps> = ({
  onSave,
  onClear,
  onSaveAndNew,
  formType
}) => {
  // Function to get the document type label
  const getDocumentTypeLabel = () => {
    switch (formType) {
      case "invoice":
        return "Invoice";
      case "salesReceipt":
        return "Sales Receipt";
      case "creditNote":
        return "Credit Note";
      case "estimate":
        return "Estimate";
      case "purchaseOrder":
        return "Purchase Order";
      case "payment":
        return "Payment";
      default:
        return "Document";
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-800 p-4 flex justify-between items-center">
      <div className="flex space-x-3">
        <Link to="/dashboard">
          <Button variant="outline" className="bg-transparent text-white border-gray-600 hover:bg-gray-700 hover:text-white">
            Cancel
          </Button>
        </Link>
        <Button 
          variant="outline"
          className="bg-transparent text-white border-gray-600 hover:bg-gray-700 hover:text-white"
          onClick={onClear}
        >
          Clear
        </Button>
      </div>
      
      <div className="flex items-center">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="bg-green-600 hover:bg-green-700 text-white flex items-center">
              Save and close
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => {
              onSave();
              toast.success(`${getDocumentTypeLabel()} saved successfully`);
            }}>
              Save & Close
            </DropdownMenuItem>
            <DropdownMenuItem onClick={onSaveAndNew}>
              Save & New
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};
