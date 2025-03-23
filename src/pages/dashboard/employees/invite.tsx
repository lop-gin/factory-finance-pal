
import React from 'react';
import EmployeeForm from '@/components/employees/EmployeeForm';
import { useNavigate } from 'react-router-dom';

export default function InviteEmployeePage() {
  const navigate = useNavigate();
  
  return (
    <div className="container mx-auto py-4">
      <h1 className="text-2xl font-medium mb-6">Invite Employee</h1>
      <EmployeeForm onSuccess={() => navigate('/dashboard/employees')} />
    </div>
  );
}
