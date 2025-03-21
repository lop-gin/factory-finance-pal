
import React from "react";
import { Link } from "react-router-dom";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

export const CreditNoteHeader: React.FC = () => {
  return (
    <div className="bg-white shadow-sm border-b border-gray-200 p-4 flex justify-between items-center">
      <h1 className="text-xl font-semibold">Credit Note</h1>
      <Link to="/dashboard">
        <Button variant="ghost" size="icon">
          <X className="h-5 w-5" />
        </Button>
      </Link>
    </div>
  );
};
