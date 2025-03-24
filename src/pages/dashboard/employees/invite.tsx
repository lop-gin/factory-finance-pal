
import React from 'react';
import EmployeeForm from '@/components/employees/EmployeeForm';

export default function InviteEmployeePage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">Invite Employee</h1>
      <EmployeeForm />
    </div>
  );
}
