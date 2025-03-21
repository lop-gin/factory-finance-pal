
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { UserPlus, Edit, Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { supabase } from "@/integrations/supabase/client";
import { Employee } from '@/types/roles';
import { UserRoleBadge } from '@/components/ui/user-role-badge';
import { useAuth } from '@/components/auth/AuthProvider';

export default function EmployeesPage() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [employeeToDelete, setEmployeeToDelete] = useState<Employee | null>(null);
  const { toast } = useToast();
  const { user, userMetadata } = useAuth();

  const fetchEmployees = async () => {
    setLoading(true);
    
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select(`
          id,
          full_name,
          role_id,
          created_at,
          updated_at,
          status,
          roles:role_id (
            id,
            name
          ),
          user:id(email)
        `)
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      // Transform the data to match our Employee type
      const formattedEmployees = data.map((profile: any) => ({
        id: profile.id,
        email: profile.user?.email || 'No email',
        full_name: profile.full_name || 'No name',
        profile_id: profile.id,
        role_id: profile.role_id || '',
        created_at: new Date(profile.created_at),
        updated_at: new Date(profile.updated_at || profile.created_at),
        status: profile.status || 'active',
        role: profile.roles ? {
          id: profile.roles.id,
          name: profile.roles.name,
          created_at: new Date(),
          permissions: []
        } : undefined
      }));

      setEmployees(formattedEmployees);
    } catch (error: any) {
      console.error('Error fetching employees:', error);
      toast({
        title: "Error fetching employees",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, [toast]);

  const handleDeleteClick = (employee: Employee) => {
    setEmployeeToDelete(employee);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!employeeToDelete) return;
    
    try {
      // Update profile status to 'disabled' rather than deleting
      const { error } = await supabase
        .from('profiles')
        .update({ 
          status: 'disabled',
          updated_at: new Date().toISOString()
        })
        .eq('id', employeeToDelete.id);
        
      if (error) throw error;
      
      // Update the UI
      setEmployees(employees.map(emp => 
        emp.id === employeeToDelete.id 
          ? { ...emp, status: 'disabled' } 
          : emp
      ));
      
      toast({
        title: "Employee disabled",
        description: `Employee "${employeeToDelete.full_name}" has been disabled`,
      });
    } catch (error: any) {
      toast({
        title: "Error disabling employee",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setDeleteDialogOpen(false);
      setEmployeeToDelete(null);
    }
  };

  const isAdmin = userMetadata?.is_admin === true;

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Employee Management</h1>
        {isAdmin && (
          <Link to="/dashboard/employees/invite">
            <Button>
              <UserPlus className="mr-2 h-4 w-4" />
              Invite Employee
            </Button>
          </Link>
        )}
      </div>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Employees</CardTitle>
          <CardDescription>
            Manage your company employees and their roles.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center py-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Joined</TableHead>
                  {isAdmin && <TableHead className="text-right">Actions</TableHead>}
                </TableRow>
              </TableHeader>
              <TableBody>
                {employees.length > 0 ? (
                  employees.map((employee) => (
                    <TableRow key={employee.id} className={employee.status === 'disabled' ? 'opacity-50' : ''}>
                      <TableCell className="font-medium">{employee.full_name}</TableCell>
                      <TableCell>{employee.email}</TableCell>
                      <TableCell>
                        {employee.role ? (
                          <span className="text-sm">{employee.role.name}</span>
                        ) : (
                          <span className="text-gray-400">Not assigned</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          employee.status === 'active' 
                            ? 'bg-green-100 text-green-800' 
                            : employee.status === 'invited' 
                              ? 'bg-blue-100 text-blue-800' 
                              : 'bg-gray-100 text-gray-800'
                        }`}>
                          {employee.status.charAt(0).toUpperCase() + employee.status.slice(1)}
                        </span>
                      </TableCell>
                      <TableCell>{new Date(employee.created_at).toLocaleDateString()}</TableCell>
                      {isAdmin && (
                        <TableCell className="text-right">
                          <Link to={`/dashboard/employees/edit/${employee.id}`}>
                            <Button variant="ghost" size="sm" disabled={employee.status === 'disabled'}>
                              <Edit className="h-4 w-4" />
                            </Button>
                          </Link>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="text-red-500"
                            onClick={() => handleDeleteClick(employee)}
                            disabled={employee.status === 'disabled'}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      )}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={isAdmin ? 6 : 5} className="text-center py-4">
                      No employees found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Delete/Disable Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Disable this employee account?</AlertDialogTitle>
            <AlertDialogDescription>
              This will disable the account for "{employeeToDelete?.full_name}". 
              They will no longer be able to access the system.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-red-600 hover:bg-red-700">
              Disable
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
