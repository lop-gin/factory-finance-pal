
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ModuleCheckbox } from "./ModuleCheckbox";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { ModulePermission, CommonRoleType, COMMON_ROLE_TYPES } from "@/types/roles";
import { ArrowLeft, Save } from "lucide-react";

interface RoleFormProps {
  roleId?: string; // If provided, we're editing an existing role
}

interface Module {
  id: string;
  name: string;
  description: string | null;
}

interface ModulePermissionState {
  [moduleId: string]: ModulePermission[];
}

const RoleForm: React.FC<RoleFormProps> = ({ roleId }) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const isEditing = !!roleId;

  const [roleName, setRoleName] = useState<CommonRoleType | "">("");
  const [customRoleName, setCustomRoleName] = useState("");
  const [description, setDescription] = useState("");
  const [modules, setModules] = useState<Module[]>([]);
  const [selectedPermissions, setSelectedPermissions] = useState<ModulePermissionState>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Fetch modules when component mounts
  useEffect(() => {
    const fetchModules = async () => {
      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from('modules')
          .select('*')
          .order('name');
          
        if (error) throw error;
        
        setModules(data || []);
        
        // Initialize permissions structure
        const initialPermissions: ModulePermissionState = {};
        data?.forEach(module => {
          initialPermissions[module.id] = [];
        });
        setSelectedPermissions(initialPermissions);
        
      } catch (error: any) {
        toast({
          title: "Error fetching modules",
          description: error.message,
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchModules();
  }, [toast]);

  // If editing, fetch the existing role data
  useEffect(() => {
    if (isEditing && roleId) {
      const fetchRoleData = async () => {
        setIsLoading(true);
        try {
          const { data, error } = await supabase
            .from('roles')
            .select(`
              *,
              role_permissions (
                id,
                module_id,
                permissions
              )
            `)
            .eq('id', roleId)
            .single();

          if (error) throw error;
          
          if (data) {
            // Check if the role name is in our common types, otherwise use custom
            const commonRoleName = COMMON_ROLE_TYPES.find(r => r === data.name);
            if (commonRoleName) {
              setRoleName(commonRoleName);
            } else {
              setRoleName("");
              setCustomRoleName(data.name);
            }
            
            setDescription(data.description || "");
            
            // Set selected permissions
            const permissionsState: ModulePermissionState = {};
            data.role_permissions?.forEach(perm => {
              // Filter permissions to only include valid ModulePermission values
              const validPermissions = perm.permissions.filter((p): p is ModulePermission => 
                ['view', 'create', 'edit', 'delete', 'approve'].includes(p)
              ) as ModulePermission[];
              
              permissionsState[perm.module_id] = validPermissions;
            });
            
            setSelectedPermissions(permissionsState);
          }
        } catch (error: any) {
          toast({
            title: "Error fetching role data",
            description: error.message,
            variant: "destructive"
          });
        } finally {
          setIsLoading(false);
        }
      };

      fetchRoleData();
    }
  }, [isEditing, roleId, toast]);

  const handlePermissionChange = (moduleId: string, permission: ModulePermission, checked: boolean) => {
    setSelectedPermissions(prevState => {
      const updatedPermissions = { ...prevState };
      const currentPermissions = [...(updatedPermissions[moduleId] || [])];
      
      if (checked) {
        // Add permission if not already present
        if (!currentPermissions.includes(permission)) {
          updatedPermissions[moduleId] = [...currentPermissions, permission];
        }
      } else {
        // Remove permission
        updatedPermissions[moduleId] = currentPermissions.filter(p => p !== permission);
      }
      
      return updatedPermissions;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    const finalRoleName = roleName || customRoleName;
    
    if (!finalRoleName.trim()) {
      toast({
        title: "Validation Error",
        description: "Role name is required",
        variant: "destructive"
      });
      setIsSaving(false);
      return;
    }
    
    try {
      // Step 1: Save or update the role
      let roleResponse;
      
      if (isEditing) {
        roleResponse = await supabase
          .from('roles')
          .update({
            name: finalRoleName,
            description,
            updated_at: new Date().toISOString()
          })
          .eq('id', roleId)
          .select()
          .single();
      } else {
        roleResponse = await supabase
          .from('roles')
          .insert({
            name: finalRoleName,
            description
          })
          .select()
          .single();
      }
      
      if (roleResponse.error) throw roleResponse.error;
      const role = roleResponse.data;
      
      // Step 2: If editing, delete existing permissions
      if (isEditing) {
        const { error: deleteError } = await supabase
          .from('role_permissions')
          .delete()
          .eq('role_id', roleId);
          
        if (deleteError) throw deleteError;
      }
      
      // Step 3: Create new permissions for each module with selected permissions
      const permissionsToInsert = Object.entries(selectedPermissions)
        .filter(([_, perms]) => perms.length > 0) // Only include modules with permissions
        .map(([moduleId, permissions]) => ({
          role_id: role.id,
          module_id: moduleId,
          permissions
        }));
      
      if (permissionsToInsert.length > 0) {
        const { error: permissionsError } = await supabase
          .from('role_permissions')
          .insert(permissionsToInsert);
          
        if (permissionsError) throw permissionsError;
      }
      
      toast({
        title: isEditing ? "Role updated" : "Role created",
        description: `Role "${finalRoleName}" has been ${isEditing ? 'updated' : 'created'} successfully`,
      });
      
      navigate('/dashboard/roles');
      
    } catch (error: any) {
      toast({
        title: "Error saving role",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex items-center justify-between">
        <Button
          type="button"
          variant="ghost"
          onClick={() => navigate('/dashboard/roles')}
          className="flex items-center gap-1"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Roles
        </Button>
        <Button type="submit" disabled={isSaving} className="flex items-center gap-1">
          {isSaving ? (
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
          ) : (
            <Save className="h-4 w-4" />
          )}
          {isEditing ? 'Update Role' : 'Create Role'}
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>{isEditing ? 'Edit Role' : 'Create New Role'}</CardTitle>
          <CardDescription>
            {isEditing 
              ? 'Update the role details and permissions' 
              : 'Define a new role with specific permissions'}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="role-type">Role Type</Label>
              <Select 
                value={roleName} 
                onValueChange={(value) => {
                  // Reset custom name if a predefined role is selected
                  if (value) {
                    setCustomRoleName("");
                  }
                  setRoleName(value as CommonRoleType);
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a role or enter custom name" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Custom Role</SelectItem>
                  {COMMON_ROLE_TYPES.map(role => (
                    <SelectItem key={role} value={role}>{role}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            {!roleName && (
              <div>
                <Label htmlFor="custom-role-name">Custom Role Name</Label>
                <Input
                  id="custom-role-name"
                  value={customRoleName}
                  onChange={(e) => setCustomRoleName(e.target.value)}
                  placeholder="Enter custom role name"
                  required={!roleName}
                />
              </div>
            )}
            
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe the role's responsibilities"
                rows={3}
              />
            </div>
          </div>
          
          <div className="space-y-4">
            <Label className="text-lg font-semibold">Module Permissions</Label>
            <div className="grid grid-cols-1 gap-4">
              {modules.map(module => (
                <ModuleCheckbox
                  key={module.id}
                  moduleId={module.id}
                  moduleName={module.name}
                  selectedPermissions={selectedPermissions[module.id] || []}
                  onChange={handlePermissionChange}
                />
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </form>
  );
};

export default RoleForm;
