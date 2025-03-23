
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import RoleForm from '@/components/roles/RoleForm';

export default function EditRolePage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  if (!id) {
    return <div>Role ID is required</div>;
  }
  
  return (
    <div className="container mx-auto py-4">
      <h1 className="text-2xl font-medium mb-6">Edit Role</h1>
      <RoleForm roleId={id} onSuccess={() => navigate('/dashboard/roles')} />
    </div>
  );
}
