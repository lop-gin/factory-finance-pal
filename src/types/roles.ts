
export type ModulePermission = 'view' | 'create' | 'edit' | 'delete' | 'approve';

export interface Module {
  id: string;
  name: string;
  description?: string;
}

export interface Role {
  id: string;
  name: string;
  description?: string;
  created_at: Date;
  permissions: RolePermission[];
}

export interface RolePermission {
  id: string;
  role_id: string;
  module_id: string;
  permissions: ModulePermission[];
}

export interface Employee {
  id: string;
  email: string;
  full_name: string;
  profile_id: string;
  role_id: string;
  created_at: Date;
  updated_at: Date;
  role?: Role;
  status: 'active' | 'invited' | 'disabled';
}

export type CommonRoleType = 
  | 'Sales Supervisor'
  | 'Sales Rep'
  | 'Procurement Supervisor'
  | 'Procurement Rep'
  | 'Production Supervisor'
  | 'Machine Operator'
  | 'Packaging Supervisor'
  | 'Packaging Person'
  | 'Transport Supervisor'
  | 'Transport Person'
  | 'Store Supervisor'
  | 'Store Person'
  | 'HR Supervisor'
  | 'Admin';

export const COMMON_ROLE_TYPES: CommonRoleType[] = [
  'Sales Supervisor',
  'Sales Rep',
  'Procurement Supervisor',
  'Procurement Rep',
  'Production Supervisor',
  'Machine Operator',
  'Packaging Supervisor',
  'Packaging Person',
  'Transport Supervisor',
  'Transport Person',
  'Store Supervisor',
  'Store Person',
  'HR Supervisor',
  'Admin'
];

export const SALES_RELATED_ROLES: CommonRoleType[] = [
  'Sales Supervisor',
  'Sales Rep'
];

export const PROCUREMENT_RELATED_ROLES: CommonRoleType[] = [
  'Procurement Supervisor',
  'Procurement Rep'
];
