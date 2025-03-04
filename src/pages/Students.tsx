
import React from 'react';
import { Button } from '@/components/ui/button';
import StudentList from '@/components/students/StudentList';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { UsersRound, Trophy, GraduationCap } from 'lucide-react';

// Define Student interface
export interface Student {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  studentId: string;
  attendanceRate: number;
  status: 'active' | 'inactive';
}

const Students = () => {
  // Mock data for student list
  const students: Student[] = [
    {
      id: '1',
      name: 'Alex Johnson',
      email: 'alex.johnson@example.com',
      studentId: 'S10023',
      attendanceRate: 94,
      status: 'active'
    },
    {
      id: '2',
      name: 'Emma Wilson',
      email: 'emma.wilson@example.com',
      studentId: 'S10024',
      attendanceRate: 88,
      status: 'active'
    },
    {
      id: '3',
      name: 'Michael Brown',
      email: 'michael.brown@example.com',
      studentId: 'S10025',
      attendanceRate: 76,
      status: 'active'
    },
    {
      id: '4',
      name: 'Sophia Martinez',
      email: 'sophia.martinez@example.com',
      studentId: 'S10026',
      attendanceRate: 91,
      status: 'active'
    },
    {
      id: '5',
      name: 'William Taylor',
      email: 'william.taylor@example.com',
      studentId: 'S10027',
      attendanceRate: 85,
      status: 'active'
    },
    {
      id: '6',
      name: 'Olivia Garcia',
      email: 'olivia.garcia@example.com',
      studentId: 'S10028',
      attendanceRate: 63,
      status: 'inactive'
    },
    {
      id: '7',
      name: 'James Davis',
      email: 'james.davis@example.com',
      studentId: 'S10029',
      attendanceRate: 79,
      status: 'active'
    },
    {
      id: '8',
      name: 'Charlotte Rodriguez',
      email: 'charlotte.rodriguez@example.com',
      studentId: 'S10030',
      attendanceRate: 92,
      status: 'active'
    },
    {
      id: '9',
      name: 'Benjamin Lee',
      email: 'benjamin.lee@example.com',
      studentId: 'S10031',
      attendanceRate: 59,
      status: 'inactive'
    },
  ];

  return (
    <div className="container py-8 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Students</h1>
          <p className="text-muted-foreground">
            View and manage student profiles and academic records
          </p>
        </div>
      </div>

      <Tabs defaultValue="all">
        <TabsList className="mb-6">
          <TabsTrigger value="all" className="gap-2">
            <UsersRound size={16} />
            All Students
          </TabsTrigger>
          <TabsTrigger value="high-achievers" className="gap-2">
            <Trophy size={16} />
            High Achievers
          </TabsTrigger>
          <TabsTrigger value="graduating" className="gap-2">
            <GraduationCap size={16} />
            Graduating
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <StudentList students={students} />
        </TabsContent>
        
        <TabsContent value="high-achievers">
          <StudentList students={students.filter(student => student.attendanceRate > 90)} />
        </TabsContent>
        
        <TabsContent value="graduating">
          <StudentList students={students.filter(student => 
            ['1', '2', '4', '8'].includes(student.id)
          )} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Students;
