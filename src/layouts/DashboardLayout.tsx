
import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import DashboardHeader from "../components/dashboard/DashboardHeader";
import DashboardSidebar from "../components/dashboard/DashboardSidebar";
import { PlusIcon, MenuIcon } from "lucide-react";
import NewActionMenu from "../components/dashboard/NewActionMenu";

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [newMenuOpen, setNewMenuOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const toggleNewMenu = () => {
    setNewMenuOpen(!newMenuOpen);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <DashboardSidebar isOpen={sidebarOpen} toggle={toggleSidebar} />

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        <DashboardHeader 
          sidebarOpen={sidebarOpen} 
          toggleSidebar={toggleSidebar}
        />

        {/* New button */}
        <div className="relative z-40">
          <button 
            onClick={toggleNewMenu}
            className="fixed left-4 top-20 bg-[#21a366] hover:bg-[#1a8553] text-white flex items-center px-4 py-2 rounded-md shadow-sm transition-all"
            style={{ left: sidebarOpen ? '16rem' : '2.5rem' }}
          >
            <PlusIcon className="h-5 w-5 mr-1" /> New
          </button>
          
          {newMenuOpen && (
            <NewActionMenu 
              isOpen={newMenuOpen} 
              onClose={() => setNewMenuOpen(false)} 
              sidebarOpen={sidebarOpen}
            />
          )}
        </div>

        <main className="flex-1 p-6 transition-all" style={{ marginLeft: sidebarOpen ? '1rem' : '0' }}>
          <div className="mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
