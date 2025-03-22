
import React from 'react';
import { useParams } from 'react-router-dom';
import RoleForm from '@/components/roles/RoleForm';

export default function EditRolePage() {
  const { id } = useParams<{ id: string }>();
  
  if (!id) {
    return <div>Role ID is required</div>;
  }
  
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">Edit Role</h1>
      <RoleForm roleId={id} />
    </div>
  );
}
