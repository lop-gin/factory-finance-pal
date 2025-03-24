
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Edit, Trash2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Role, ModulePermission, RolePermission } from '@/types/roles';
import { useAuth } from '@/components/auth/AuthProvider';

export default function RolesPage() {
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const { userMetadata } = useAuth();

  useEffect(() => {
    const fetchRoles = async () => {
      setLoading(true);
      
      try {
        // Use a raw SQL query to ensure we're getting the right data
        const { data, error } = await supabase
          .from('roles')
          .select(`
            id,
            name,
            description,
            created_at,
            role_permissions (
              id,
              role_id,
              module_id,
              permissions
            )
          `)
          .order('created_at', { ascending: false });

        if (error) {
          throw error;
        }

        // Transform the data to match our Role type
        const transformedRoles = data.map(role => {
          // Transform permissions to match ModulePermission type
          const transformedPermissions: RolePermission[] = role.role_permissions.map(
            (permObj: { id: string; role_id: string; module_id: string; permissions: string[] }) => ({
              id: permObj.id,
              role_id: permObj.role_id,
              module_id: permObj.module_id,
              // Filter permissions to only include valid ModulePermission values
              permissions: permObj.permissions.filter((p): p is ModulePermission => 
                ['view', 'create', 'edit', 'delete', 'approve'].includes(p)
              ) as ModulePermission[]
            })
          );

          return {
            id: role.id,
            name: role.name,
            description: role.description,
            created_at: new Date(role.created_at), // Convert string to Date object
            permissions: transformedPermissions
          };
        });

        setRoles(transformedRoles);
      } catch (error: any) {
        console.error('Error fetching roles:', error);
        toast({
          title: "Error fetching roles",
          description: error.message,
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    fetchRoles();
  }, [toast]);

  const isAdmin = userMetadata?.is_admin === true;

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Role Management</h1>
        {isAdmin && (
          <Link to="/dashboard/roles/create">
            <Button>
              <Shield className="mr-2 h-4 w-4" />
              Create Role
            </Button>
          </Link>
        )}
      </div>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Roles</CardTitle>
          <CardDescription>
            Manage roles and their permissions to control access to different modules.
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
                  <TableHead>Role Name</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Permissions</TableHead>
                  <TableHead>Created</TableHead>
                  {isAdmin && <TableHead className="text-right">Actions</TableHead>}
                </TableRow>
              </TableHeader>
              <TableBody>
                {roles.length > 0 ? (
                  roles.map((role) => (
                    <TableRow key={role.id}>
                      <TableCell className="font-medium">{role.name}</TableCell>
                      <TableCell>{role.description || '-'}</TableCell>
                      <TableCell>
                        {role.permissions?.length ? (
                          <span className="text-sm">{role.permissions.length} module(s)</span>
                        ) : (
                          <span className="text-gray-400">No permissions</span>
                        )}
                      </TableCell>
                      <TableCell>{new Date(role.created_at).toLocaleDateString()}</TableCell>
                      {isAdmin && (
                        <TableCell className="text-right">
                          <Link to={`/dashboard/roles/edit/${role.id}`}>
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
                    <TableCell colSpan={isAdmin ? 5 : 4} className="text-center py-4">
                      No roles found
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
