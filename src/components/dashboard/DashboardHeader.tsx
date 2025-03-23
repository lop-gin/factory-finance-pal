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
        {/* Left section - Company name */}
        {userMetadata?.company_name && (
          <div className="text-gray-700 font-medium">
            {userMetadata.company_name}
          </div>
        )}
        
        {/* Right section - User info and Profile dropdown */}
        <div className="flex items-center space-x-4">
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
    </header>
  );
}
