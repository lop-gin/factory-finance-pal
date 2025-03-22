
import { useState } from "react";
import { Link } from "react-router-dom";
import { LogOut, Menu, User, ChevronDown } from "lucide-react";
import { useAuth } from "@/components/auth/AuthProvider";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function DashboardHeader() {
  const { user, userMetadata, signOut } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const userRoles = [];
  if (userMetadata?.is_admin) {
    userRoles.push('Admin');
  }
  
  // More roles can be added here as the system develops

  return (
    <header className="bg-white shadow-sm">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between">
          <div className="flex">
            <div className="flex flex-shrink-0 items-center">
              <Link to="/dashboard" className="text-xl font-bold text-gray-900">
                InventoryPro
              </Link>
            </div>
            <nav className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link
                to="/dashboard"
                className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
              >
                Dashboard
              </Link>
              {/* More nav links will be added here */}
            </nav>
          </div>
          
          <div className="flex items-center">
            {/* Company info */}
            {userMetadata?.company_name && (
              <div className="hidden sm:flex sm:items-center sm:mr-4">
                <div className="text-sm text-gray-500">
                  <span className="font-medium">{userMetadata.company_name}</span>
                  <span className="ml-1">({userMetadata.company_type})</span>
                </div>
              </div>
            )}
            
            {/* Role badges */}
            {userRoles.length > 0 && (
              <div className="hidden sm:flex sm:items-center sm:mr-4">
                {userRoles.map((role) => (
                  <span 
                    key={role}
                    className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800 mr-1"
                  >
                    {role}
                  </span>
                ))}
              </div>
            )}
            
            {/* User dropdown */}
            <div className="hidden sm:ml-3 sm:flex sm:items-center">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="gap-1">
                    <User className="h-4 w-4" />
                    <span>{userMetadata?.full_name || user?.email}</span>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link to="/profile">Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem 
                    onClick={signOut}
                    className="text-red-600 focus:text-red-700"
                  >
                    <LogOut className="h-4 w-4 mr-2" /> Sign out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            
            {/* Mobile menu button */}
            <div className="flex items-center sm:hidden">
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500"
              >
                <Menu className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="sm:hidden">
          <div className="space-y-1 pt-2 pb-3">
            <Link
              to="/dashboard"
              className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700"
            >
              Dashboard
            </Link>
            {/* More mobile nav links will be added here */}
          </div>
          
          {/* Mobile company & role info */}
          <div className="border-t border-gray-200 pt-4 pb-3">
            <div className="flex items-center px-4">
              <div className="flex-shrink-0">
                <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                  <User className="h-6 w-6 text-gray-600" />
                </div>
              </div>
              <div className="ml-3">
                <div className="text-base font-medium text-gray-800">
                  {userMetadata?.full_name || user?.email}
                </div>
                <div className="text-sm font-medium text-gray-500">
                  {user?.email}
                </div>
              </div>
            </div>
            
            {/* Company info mobile */}
            {userMetadata?.company_name && (
              <div className="mt-2 px-4">
                <div className="text-sm text-gray-500">
                  <span className="font-medium">{userMetadata.company_name}</span>
                  <span className="ml-1">({userMetadata.company_type})</span>
                </div>
              </div>
            )}
            
            {/* Role badges mobile */}
            {userRoles.length > 0 && (
              <div className="mt-2 px-4 flex flex-wrap">
                {userRoles.map((role) => (
                  <span 
                    key={role}
                    className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800 mr-1 mb-1"
                  >
                    {role}
                  </span>
                ))}
              </div>
            )}
            
            <div className="mt-3 space-y-1">
              <Link
                to="/profile"
                className="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800"
              >
                Profile
              </Link>
              <button
                onClick={signOut}
                className="block w-full text-left px-4 py-2 text-base font-medium text-red-600 hover:bg-gray-100"
              >
                Sign out
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
