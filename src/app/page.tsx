
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-100">
      <header className="container mx-auto px-4 py-6 flex justify-between items-center">
        <div className="text-2xl font-bold text-blue-900">InventoryPro</div>
        <div>
          <Link href="/auth/login">
            <Button variant="ghost" className="mr-2">
              Sign In
            </Button>
          </Link>
          <Link href="/auth/register">
            <Button>Sign Up</Button>
          </Link>
        </div>
      </header>

      <main>
        <section className="py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-blue-900 mb-6">
              Streamline Your Supply Chain
            </h1>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto mb-10">
              A complete solution for manufacturers and distributors to manage inventory,
              sales, and operations in one powerful platform.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/auth/register">
                <Button size="lg" className="px-8">
                  Get Started
                </Button>
              </Link>
              <Link href="/auth/login">
                <Button size="lg" variant="outline" className="px-8">
                  Sign In
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-blue-900 mb-12">
              Tailored for Your Business
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-blue-50 p-8 rounded-xl shadow-sm">
                <h3 className="text-xl font-semibold mb-4">For Manufacturers</h3>
                <p className="text-gray-700">
                  Track production, manage inventory levels, and streamline quality control
                  processes to maximize efficiency.
                </p>
              </div>
              <div className="bg-indigo-50 p-8 rounded-xl shadow-sm">
                <h3 className="text-xl font-semibold mb-4">For Distributors</h3>
                <p className="text-gray-700">
                  Optimize order fulfillment, track shipments, and manage warehousing operations
                  to improve customer satisfaction.
                </p>
              </div>
              <div className="bg-purple-50 p-8 rounded-xl shadow-sm">
                <h3 className="text-xl font-semibold mb-4">For Both</h3>
                <p className="text-gray-700">
                  Comprehensive tools for sales, procurement, and inventory management to
                  give you complete visibility across your operations.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-blue-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">InventoryPro</h3>
              <p className="text-blue-200">
                Simplifying supply chain management for businesses of all sizes.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/auth/register" className="text-blue-200 hover:text-white">
                    Create Account
                  </Link>
                </li>
                <li>
                  <Link href="/auth/login" className="text-blue-200 hover:text-white">
                    Sign In
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact</h4>
              <p className="text-blue-200">
                Have questions? Reach out to our support team for assistance.
              </p>
              <p className="text-blue-200 mt-2">support@inventorypro.com</p>
            </div>
          </div>
          <div className="border-t border-blue-800 mt-8 pt-8 text-center text-blue-200">
            &copy; {new Date().getFullYear()} InventoryPro. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
