
import React from 'react';
import RoleForm from '@/components/roles/RoleForm';

export default function CreateRolePage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">Create Role</h1>
      <RoleForm />
    </div>
  );
}
