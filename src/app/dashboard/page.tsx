
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function DashboardPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">Sales Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
      </div>
    </div>
  );
}
