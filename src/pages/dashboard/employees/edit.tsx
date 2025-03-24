
import React from 'react';
import { useParams } from 'react-router-dom';
import EmployeeForm from '@/components/employees/EmployeeForm';

export default function EditEmployeePage() {
  const { id } = useParams<{ id: string }>();
  
  if (!id) {
    return <div>Employee ID is required</div>;
  }
  
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">Edit Employee</h1>
      <EmployeeForm employeeId={id} />
    </div>
  );
}
