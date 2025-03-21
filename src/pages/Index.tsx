
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="bg-gray-50 min-h-screen w-full p-8">
      <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6">Financial Forms</h1>
        <div className="space-y-4">
          <Link 
            to="/dashboard/sales/invoice" 
            className="block w-full p-4 bg-blue-50 border border-blue-200 rounded-md hover:bg-blue-100 transition-colors"
          >
            Create Invoice
          </Link>
          <Link 
            to="/dashboard/sales/receipt" 
            className="block w-full p-4 bg-green-50 border border-green-200 rounded-md hover:bg-green-100 transition-colors"
          >
            Create Sales Receipt
          </Link>
          <Link 
            to="/dashboard/sales/credit-note" 
            className="block w-full p-4 bg-red-50 border border-red-200 rounded-md hover:bg-red-100 transition-colors"
          >
            Create Credit Note
          </Link>
          <Link 
            to="/dashboard/sales/payment" 
            className="block w-full p-4 bg-purple-50 border border-purple-200 rounded-md hover:bg-purple-100 transition-colors"
          >
            Receive Payment
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Index;
