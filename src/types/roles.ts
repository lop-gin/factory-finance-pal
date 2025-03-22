
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
