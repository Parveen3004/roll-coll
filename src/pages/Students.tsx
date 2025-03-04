
import React from 'react';
import StudentList from '@/components/students/StudentList';

// Mock data
const students = [
  {
    id: '1',
    name: 'Alex Johnson',
    email: 'alex.johnson@example.com',
    studentId: 'S10023',
    attendanceRate: 94,
    status: 'active',
  },
  {
    id: '2',
    name: 'Emma Thompson',
    email: 'emma.thompson@example.com',
    studentId: 'S10045',
    attendanceRate: 82,
    status: 'active',
  },
  {
    id: '3',
    name: 'Michael Chen',
    email: 'michael.chen@example.com',
    studentId: 'S10067',
    attendanceRate: 76,
    status: 'active',
  },
  {
    id: '4',
    name: 'Sophia Rivera',
    email: 'sophia.rivera@example.com',
    studentId: 'S10089',
    attendanceRate: 88,
    status: 'active',
  },
  {
    id: '5',
    name: 'William Davis',
    email: 'william.davis@example.com',
    studentId: 'S10112',
    attendanceRate: 69,
    status: 'inactive',
  },
  {
    id: '6',
    name: 'Olivia Martinez',
    email: 'olivia.martinez@example.com',
    studentId: 'S10134',
    attendanceRate: 91,
    status: 'active',
  },
  {
    id: '7',
    name: 'James Wilson',
    email: 'james.wilson@example.com',
    studentId: 'S10156',
    attendanceRate: 85,
    status: 'active',
  },
  {
    id: '8',
    name: 'Ava Anderson',
    email: 'ava.anderson@example.com',
    studentId: 'S10178',
    attendanceRate: 95,
    status: 'active',
  },
  {
    id: '9',
    name: 'Ethan Thomas',
    email: 'ethan.thomas@example.com',
    studentId: 'S10201',
    attendanceRate: 64,
    status: 'inactive',
  },
] as const;

const Students = () => {
  return (
    <div className="container py-8 max-w-7xl mx-auto">
      <div className="flex flex-col gap-2 mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Students</h1>
        <p className="text-muted-foreground">
          Manage student profiles and monitor attendance records.
        </p>
      </div>

      <StudentList students={students} />
    </div>
  );
};

export default Students;
