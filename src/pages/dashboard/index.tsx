
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function DashboardPage() {
  return (
    <div className="mt-6">
      <div className="p-6 bg-white rounded-lg border border-gray-200 mb-6">
        <h2 className="text-xl font-medium mb-2">QuickBooks Plus</h2>
        <p className="text-sm text-gray-500 mb-1">TRIAL EXPIRED</p>
        <div className="flex items-center mb-4">
          <div className="h-2 w-2 rounded-full bg-yellow-500 mr-2"></div>
          <p className="text-sm">Read only until 13/12/2025</p>
        </div>
        <p className="text-sm mb-4">
          You have read-only access to your data. Resubscribe anytime to pick up where you left off.
        </p>
        <button className="border border-gray-300 rounded-md px-4 py-2 text-sm hover:bg-gray-50 transition-colors">
          Resubscribe
        </button>
      </div>
      
      <Card className="mb-6">
        <CardHeader className="pb-3">
          <CardTitle>Welcome to InventoryPro</CardTitle>
          <CardDescription>
            Your sales and inventory management solution
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <p>
            Use the sidebar on the left to navigate the system, or the '+ New' button to create new items.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
