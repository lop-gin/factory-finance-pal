
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FileText, Users, UserPlus, Shield } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function DashboardPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Document Management</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link to="/dashboard/sales/invoice">
            <motion.div 
              className="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:border-blue-500 transition-all"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <h2 className="text-xl font-semibold mb-3">Create Invoice</h2>
              <p className="text-gray-600">
                Create a new invoice for your customers with itemized billing.
              </p>
            </motion.div>
          </Link>
          
          <Link to="/dashboard/sales/receipt">
            <motion.div 
              className="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:border-green-500 transition-all"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <h2 className="text-xl font-semibold mb-3">Create Sales Receipt</h2>
              <p className="text-gray-600">
                Generate a sales receipt to record completed transactions.
              </p>
            </motion.div>
          </Link>
          
          <Link to="/dashboard/sales/credit-note">
            <motion.div 
              className="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:border-red-500 transition-all"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <h2 className="text-xl font-semibold mb-3">Create Credit Note</h2>
              <p className="text-gray-600">
                Issue a credit note to correct errors or provide refunds.
              </p>
            </motion.div>
          </Link>
          
          <Link to="/dashboard/sales/payment">
            <motion.div 
              className="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:border-purple-500 transition-all"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <h2 className="text-xl font-semibold mb-3">Receive Payment</h2>
              <p className="text-gray-600">
                Record customer payments and apply them to outstanding invoices.
              </p>
            </motion.div>
          </Link>

          <Link to="/dashboard/sales/estimate">
            <motion.div 
              className="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:border-yellow-500 transition-all"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <h2 className="text-xl font-semibold mb-3">Create Estimate</h2>
              <p className="text-gray-600">
                Create estimates for potential customers with detailed pricing.
              </p>
            </motion.div>
          </Link>
          
          <Link to="/dashboard/sales/refund-receipt">
            <motion.div 
              className="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:border-orange-500 transition-all"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <h2 className="text-xl font-semibold mb-3">Refund Receipt</h2>
              <p className="text-gray-600">
                Process and record customer refunds for previous transactions.
              </p>
            </motion.div>
          </Link>
        </div>
      </div>
      
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Administration</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link to="/dashboard/employees">
            <Card className="hover:border-blue-500 transition-all cursor-pointer">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2">
                  <UserPlus className="h-5 w-5" />
                  Employee Management
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Invite new employees and manage existing team members.
                </CardDescription>
              </CardContent>
            </Card>
          </Link>
          
          <Link to="/dashboard/roles">
            <Card className="hover:border-purple-500 transition-all cursor-pointer">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Role Management
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Create and manage roles with module-based permissions.
                </CardDescription>
              </CardContent>
            </Card>
          </Link>
          
          <Link to="/dashboard/customers">
            <Card className="hover:border-green-500 transition-all cursor-pointer">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Customer Management
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Add, edit, and manage your customer information.
                </CardDescription>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  );
}
