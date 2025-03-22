
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { UserPlus, Edit, Trash2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Employee } from '@/types/roles';
import { UserRoleBadge } from '@/components/ui/user-role-badge';
import { useAuth } from '@/components/auth/AuthProvider';

export default function EmployeesPage() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const { user, userMetadata } = useAuth();

  useEffect(() => {
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
          status: profile.status || 'active'
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

    fetchEmployees();
  }, [toast]);

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
                    <TableRow key={employee.id}>
                      <TableCell className="font-medium">{employee.full_name}</TableCell>
                      <TableCell>{employee.email}</TableCell>
                      <TableCell>
                        {employee.role_id ? (
                          <UserRoleBadge role={employee.role_id.toLowerCase() as any} />
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
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                          </Link>
                          <Button variant="ghost" size="sm" className="text-red-500">
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
    </div>
  );
}
