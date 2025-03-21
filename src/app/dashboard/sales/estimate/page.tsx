
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CustomerSection } from "@/components/forms/CustomerSection";
import { ItemsTable } from "@/components/forms/ItemsTable";
import { FormMessage } from "@/components/forms/FormMessage";
import { DateField } from "@/components/forms/DateFields";
import { DocumentTotal } from "@/components/forms/DocumentTotal";
import { useEstimateForm } from "@/hooks/useEstimateForm";
import { PageLoader } from "@/components/ui/page-loader";
import { SalesRepresentative } from "@/components/forms/SalesRepresentative";
import { AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function EstimatePage() {
  const [loading, setLoading] = useState(true);
  
  const {
    estimate,
    updateEstimate,
    updateCustomer,
    addEstimateItem,
    updateEstimateItem,
    removeEstimateItem,
    clearAllItems,
    saveEstimate,
    updateOtherFees
  } = useEstimateForm();

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  const handleSave = () => {
    saveEstimate();
    toast.success("Estimate saved successfully");
  };

  const handleSaveAndNew = () => {
    saveEstimate();
    clearAllItems();
    toast.success("Estimate saved successfully. New estimate form ready.");
  };

  return (
    <>
      <AnimatePresence>
        {loading && <PageLoader message="Preparing estimate form..." />}
      </AnimatePresence>
    
      <div className="bg-gray-50 min-h-screen w-full">
        <div className="bg-transparent pb-20">
          <div className="bg-white shadow-sm border-b border-gray-200 p-4 flex justify-between items-center">
            <h1 className="text-xl font-semibold">Estimate</h1>
            <Link to="/dashboard">
              <Button variant="ghost" size="icon">
                <X className="h-5 w-5" />
              </Button>
            </Link>
          </div>
          
          <div className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="md:col-span-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <CustomerSection 
                      customer={estimate.customer}
                      document={estimate}
                      updateCustomer={updateCustomer} 
                      updateDocument={updateEstimate}
                    />
                  </div>
                  <div>
                    <div className="space-y-3 pb-5">
                      <div className="grid grid-cols-2 gap-3">
                        <DateField 
                          label="Estimate date"
                          date={estimate.estimateDate}
                          onDateChange={(date) => updateEstimate({ estimateDate: date })}
                        />
                        <DateField 
                          label="Expiration date"
                          date={estimate.expirationDate}
                          onDateChange={(date) => updateEstimate({ expirationDate: date })}
                        />
                      </div>
                      
                      <SalesRepresentative 
                        value={estimate.salesRep || ""}
                        onChange={(rep) => updateEstimate({ salesRep: rep })}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <DocumentTotal 
                  total={estimate.total}
                  balanceDue={estimate.balanceDue}
                  otherFeesAmount={estimate.otherFees?.amount}
                  documentType="estimate"
                />
              </div>
            </div>
            
            <div className="bg-white rounded-md shadow-sm p-4 mb-6">
              <ItemsTable 
                items={estimate.items} 
                addItem={addEstimateItem} 
                updateItem={updateEstimateItem} 
                removeItem={removeEstimateItem}
                clearAllItems={clearAllItems}
                otherFees={estimate.otherFees || { description: "", amount: undefined }}
                updateOtherFees={updateOtherFees}
              />
            </div>
            
            <div className="mt-8">
              <FormMessage 
                message={estimate.messageOnInvoice}
                label="MESSAGE ON ESTIMATE"
                onChange={(message) => updateEstimate({ messageOnInvoice: message })}
                placeholder="Enter a message to be displayed on the estimate"
              />
            </div>
          </div>
          
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
                onClick={clearAllItems}
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
                  <DropdownMenuItem onClick={handleSave}>
                    Save & Close
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleSaveAndNew}>
                    Save & New
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
