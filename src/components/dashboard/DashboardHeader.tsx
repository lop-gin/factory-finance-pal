import { useState } from "react";
import { Link } from "react-router-dom";
import { LogOut, Menu } from "lucide-react";
import { useAuth } from "@/components/auth/AuthProvider";
import { Button } from "@/components/ui/button";
import { UserRoleBadge } from "@/components/ui/user-role-badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface DashboardHeaderProps {
  sidebarOpen: boolean;
  toggleSidebar: () => void;
}

export default function DashboardHeader({ sidebarOpen, toggleSidebar }: DashboardHeaderProps) {
  const { user, userMetadata, signOut } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Determine user roles
  const userRoles = [];
  if (userMetadata?.is_admin) {
    userRoles.push('admin');
  }
  
  return (
    <header className="bg-white shadow-sm sticky top-0 z-30">
      <div className="h-16 flex items-center justify-between px-4">
        {/* Left section */}
        <div className="flex items-center">
          {!sidebarOpen && (
            <button 
              onClick={toggleSidebar}
              className="text-gray-500 hover:text-gray-700 p-2 rounded-full hover:bg-gray-100 mr-2"
            >
              <Menu className="h-5 w-5" />
            </button>
          )}
          
          {/* User and company info */}
          <div className="flex items-center space-x-4">
            {userMetadata?.company_name && (
              <div className="text-gray-700 font-medium">
                {userMetadata.company_name}
              </div>
            )}
            <div className="flex items-center">
              <span className="text-sm text-gray-600 mr-2">
                {userMetadata?.full_name || user?.email}
              </span>
              
              {/* Display role badges */}
              {userRoles.length > 0 && (
                <div className="flex">
                  {userRoles.map((role) => (
                    <UserRoleBadge 
                      key={role} 
                      role={role as any} 
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Right section - Profile dropdown only */}
        <div className="flex items-center">
          {/* User dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative p-0 h-8 w-8 rounded-full">
                <div className="flex items-center justify-center rounded-full bg-blue-500 text-white h-8 w-8 hover:bg-blue-600">
                  {userMetadata?.full_name ? userMetadata.full_name.charAt(0).toUpperCase() : user?.email?.charAt(0).toUpperCase() || 'U'}
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <div className="flex flex-col space-y-1 p-2">
                <p className="text-sm font-medium leading-none">
                  {userMetadata?.full_name || user?.email}
                </p>
                <p className="text-xs leading-none text-muted-foreground">
                  {user?.email}
                </p>

                {/* Company name if available */}
                {userMetadata?.company_name && (
                  <p className="text-xs text-muted-foreground mt-1">
                    {userMetadata.company_name}
                  </p>
                )}

                {/* Display role badges */}
                {userRoles.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-1">
                    {userRoles.map((role) => (
                      <UserRoleBadge 
                        key={role} 
                        role={role as any} 
                      />
                    ))}
                  </div>
                )}
              </div>
              
              <DropdownMenuSeparator />
              
              <DropdownMenuItem asChild>
                <Link to="/profile" className="cursor-pointer">
                  Profile
                </Link>
              </DropdownMenuItem>
              
              <DropdownMenuItem onClick={signOut} className="text-red-600 focus:text-red-700 cursor-pointer">
                <LogOut className="h-4 w-4 mr-2" /> 
                Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      
      {/* Mobile menu - only shown when needed */}
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
                <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center text-white">
                  {userMetadata?.full_name ? userMetadata.full_name.charAt(0).toUpperCase() : user?.email?.charAt(0).toUpperCase() || 'U'}
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
                  <UserRoleBadge 
                    key={role} 
                    role={role as any} 
                    className="mr-1 mb-1"
                  />
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

