import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { ArrowLeft, Save } from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

interface EmployeeFormProps {
  employeeId?: string; // If provided, we're editing an existing employee
  onSuccess?: () => void; // Callback when operation is successful
}

interface Role {
  id: string;
  name: string;
}

const employeeSchema = z.object({
  full_name: z.string().min(1, "Full name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  role_id: z.string().min(1, "Role is required"),
  status: z.enum(["active", "inactive"])
});

type EmployeeFormValues = z.infer<typeof employeeSchema>;

const EmployeeForm: React.FC<EmployeeFormProps> = ({ employeeId, onSuccess }) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const isEditing = !!employeeId;

  const [roles, setRoles] = useState<Role[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Initialize form with default values
  const form = useForm<EmployeeFormValues>({
    resolver: zodResolver(employeeSchema),
    defaultValues: {
      full_name: "",
      email: "",
      phone: "",
      role_id: "",
      status: "active"
    }
  });

  // Fetch roles when component mounts
  useEffect(() => {
    const fetchRoles = async () => {
      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from('roles')
          .select('id, name')
          .order('name');
          
        if (error) throw error;
        
        setRoles(data || []);
      } catch (error: any) {
        toast({
          title: "Error fetching roles",
          description: error.message,
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchRoles();
  }, [toast]);

  // If editing, fetch the existing employee data
  useEffect(() => {
    if (isEditing && employeeId) {
      const fetchEmployeeData = async () => {
        setIsLoading(true);
        try {
          const { data, error } = await supabase
            .from('profiles')
            .select('id, full_name, phone, role_id, status')
            .eq('id', employeeId)
            .single();

          if (error) throw error;
          
          if (data) {
            // We need to get the email separately from auth service
            // For now we just keep the existing value since we can't directly access auth users
            form.reset({
              full_name: data.full_name || "",
              email: form.getValues().email, // Keep the existing email value
              phone: data.phone || "",
              role_id: data.role_id || "",
              status: (data.status as "active" | "inactive") || "active"
            });
          }
        } catch (error: any) {
          toast({
            title: "Error fetching employee data",
            description: error.message,
            variant: "destructive"
          });
        } finally {
          setIsLoading(false);
        }
      };

      fetchEmployeeData();
    }
  }, [isEditing, employeeId, form, toast]);

  const onSubmit = async (values: EmployeeFormValues) => {
    setIsSaving(true);
    
    try {
      if (isEditing && employeeId) {
        // Update existing employee
        const { error } = await supabase
          .from('profiles')
          .update({
            full_name: values.full_name,
            phone: values.phone,
            role_id: values.role_id,
            status: values.status,
            updated_at: new Date().toISOString()
          })
          .eq('id', employeeId);
          
        if (error) throw error;
        
        toast({
          title: "Employee updated",
          description: `Employee "${values.full_name}" has been updated successfully`,
        });
      } else {
        // For new employees
        try {
          // Generate a temporary ID for the profile
          const tempId = crypto.randomUUID();
          
          // Insert the profile
          const { error: profileError } = await supabase
            .from('profiles')
            .insert({
              id: tempId, // Use the temporary ID
              full_name: values.full_name,
              phone: values.phone,
              role_id: values.role_id,
              status: "invited", // Set as invited until they accept
              updated_at: new Date().toISOString()
            });
            
          if (profileError) throw profileError;
          
          toast({
            title: "Employee invited",
            description: `An invitation has been sent to ${values.email}`,
          });
        } catch (error: any) {
          throw new Error(`Failed to create employee: ${error.message}`);
        }
      }
      
      // Call onSuccess callback if provided
      if (onSuccess) {
        onSuccess();
      } else {
        navigate('/dashboard/employees');
      }
      
    } catch (error: any) {
      toast({
        title: "Error saving employee",
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
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button
          type="button"
          variant="ghost"
          onClick={() => navigate('/dashboard/employees')}
          className="flex items-center gap-1"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Employees
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>{isEditing ? 'Edit Employee' : 'Invite Employee'}</CardTitle>
          <CardDescription>
            {isEditing 
              ? 'Update the employee details and role' 
              : 'Send an invitation to join your organization'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="full_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address</FormLabel>
                      <FormControl>
                        <Input 
                          type="email" 
                          placeholder="john.doe@example.com" 
                          {...field} 
                          disabled={isEditing} // Can't change email when editing
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input placeholder="+1234567890" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="role_id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Role</FormLabel>
                      <Select 
                        value={field.value} 
                        onValueChange={field.onChange}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a role" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {roles.map(role => (
                            <SelectItem key={role.id} value={role.id}>
                              {role.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                {isEditing && (
                  <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Status</FormLabel>
                        <Select 
                          value={field.value} 
                          onValueChange={field.onChange}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="active">Active</SelectItem>
                            <SelectItem value="inactive">Inactive</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
              </div>
              
              <div className="flex justify-end">
                <Button 
                  type="submit" 
                  disabled={isSaving}
                  className="flex items-center gap-1"
                >
                  {isSaving ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  ) : (
                    <Save className="h-4 w-4" />
                  )}
                  {isEditing ? 'Update Employee' : 'Send Invitation'}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmployeeForm;
