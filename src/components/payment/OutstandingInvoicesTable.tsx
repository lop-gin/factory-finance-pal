
import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { OutstandingInvoice } from "@/types/document";
import { format } from "date-fns";

export interface OutstandingInvoicesTableProps {
  invoices: OutstandingInvoice[];
  onToggleSelection: (invoiceId: string) => void;
  onUpdatePayment: (invoiceId: string, amount: number) => void;
}

export const OutstandingInvoicesTable: React.FC<OutstandingInvoicesTableProps> = ({
  invoices,
  onToggleSelection,
  onUpdatePayment
}) => {
  if (!invoices || invoices.length === 0) {
    return (
      <div className="text-center py-4 text-gray-500">
        No outstanding invoices for this customer
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow className="bg-gray-50">
          <TableHead className="w-10"></TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Number</TableHead>
          <TableHead>Original Amount</TableHead>
          <TableHead>Open Balance</TableHead>
          <TableHead>Payment</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {invoices.map((invoice) => (
          <TableRow key={invoice.id} className={invoice.selected ? "bg-blue-50" : ""}>
            <TableCell className="p-2">
              <Checkbox 
                checked={invoice.selected}
                onCheckedChange={() => onToggleSelection(invoice.id)}
              />
            </TableCell>
            <TableCell className="p-2">
              {invoice.invoiceDate instanceof Date 
                ? format(invoice.invoiceDate, "MMM d, yyyy") 
                : "No date"}
            </TableCell>
            <TableCell className="p-2 font-medium">{invoice.invoiceNumber}</TableCell>
            <TableCell className="p-2">{invoice.originalAmount.toFixed(2)}</TableCell>
            <TableCell className="p-2">{invoice.openBalance.toFixed(2)}</TableCell>
            <TableCell className="p-2">
              <Input
                type="number"
                value={invoice.payment || 0}
                onChange={(e) => onUpdatePayment(invoice.id, parseFloat(e.target.value) || 0)}
                className="w-24 h-8 text-sm"
                disabled={!invoice.selected}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
