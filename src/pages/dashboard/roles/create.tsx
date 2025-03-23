
import React from 'react';
import RoleForm from '@/components/roles/RoleForm';
import { useNavigate } from 'react-router-dom';

export default function CreateRolePage() {
  const navigate = useNavigate();
  
  return (
    <div className="container mx-auto py-4">
      <h1 className="text-2xl font-medium mb-6">Create Role</h1>
      <RoleForm onSuccess={() => navigate('/dashboard/roles')} />
    </div>
  );
}
