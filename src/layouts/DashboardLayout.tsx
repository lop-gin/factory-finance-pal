
import { Outlet } from "react-router-dom";
import DashboardHeader from "../components/dashboard/DashboardHeader";

export default function DashboardLayout() {
  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader />
      <main className="py-6">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
