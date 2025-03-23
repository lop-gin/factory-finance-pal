
import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import DashboardHeader from "../components/dashboard/DashboardHeader";
import DashboardSidebar from "../components/dashboard/DashboardSidebar";
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
      <DashboardSidebar 
        isOpen={sidebarOpen} 
        toggle={toggleSidebar} 
        toggleNewMenu={toggleNewMenu}
      />

      {/* Main content */}
      <div 
        className="flex-1 flex flex-col min-h-screen transition-all duration-300"
        style={{ marginLeft: sidebarOpen ? '16rem' : '3rem' }}
      >
        <DashboardHeader 
          sidebarOpen={sidebarOpen} 
          toggleSidebar={toggleSidebar}
        />
        
        {/* New action menu popup */}
        {newMenuOpen && (
          <NewActionMenu 
            isOpen={newMenuOpen} 
            onClose={() => setNewMenuOpen(false)} 
            sidebarOpen={sidebarOpen}
          />
        )}

        <main className="flex-1 p-6">
          <div className="mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
