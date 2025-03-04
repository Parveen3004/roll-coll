
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import AttendanceSheet from '@/components/attendance/AttendanceSheet';
import { Button } from '@/components/ui/button';
import { ArrowLeft, School } from 'lucide-react';
import ClassDetails from '@/components/classes/ClassDetails';

// Mock data
const students = [
  { id: '1', name: 'Alex Johnson' },
  { id: '2', name: 'Emma Thompson' },
  { id: '3', name: 'Michael Chen' },
  { id: '4', name: 'Sophia Rivera' },
  { id: '5', name: 'William Davis' },
  { id: '6', name: 'Olivia Martinez' },
  { id: '7', name: 'James Wilson' },
  { id: '8', name: 'Ava Anderson' },
  { id: '9', name: 'Ethan Thomas' },
  { id: '10', name: 'Isabella Brown' },
  { id: '11', name: 'Lucas Garcia' },
  { id: '12', name: 'Mia Lee' },
];

const courses = [
  { id: '1', name: 'Computer Science 101' },
  { id: '2', name: 'Introduction to Physics' },
  { id: '3', name: 'Advanced Mathematics' },
  { id: '4', name: 'Data Structures & Algorithms' },
  { id: '5', name: 'Web Development' },
  { id: '6', name: 'Database Systems' },
];

const classData = {
  id: '1',
  name: 'Computer Science 101',
  description: 'Introduction to computer science and programming fundamentals',
  instructor: 'Dr. Alan Turing',
  schedule: 'Mon, Wed, Fri',
  location: 'Building A, Room 101',
  time: '9:00 AM - 10:30 AM',
  totalStudents: 32,
  attendanceRate: 92,
  students: students.slice(0, 6).map(student => ({
    ...student,
    attendanceRate: Math.floor(Math.random() * 30) + 70,
  })),
  attendanceData: [
    { date: 'May 1', attendance: 96 },
    { date: 'May 3', attendance: 92 },
    { date: 'May 5', attendance: 88 },
    { date: 'May 8', attendance: 94 },
    { date: 'May 10', attendance: 90 },
    { date: 'May 12', attendance: 86 },
    { date: 'May 15', attendance: 92 },
    { date: 'May 17', attendance: 94 },
    { date: 'May 19', attendance: 90 },
    { date: 'May 22', attendance: 88 },
  ],
};

const defaultAttendanceData = {
  date: new Date(),
  course: courses[0],
  records: students.map(student => ({
    student,
    status: null,
  })),
};

const Attendance = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [view, setView] = useState<'sheet' | 'details'>('sheet');
  const [classId, setClassId] = useState<string | null>(null);
  
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const classParam = params.get('class');
    if (classParam) {
      setClassId(classParam);
      setView('details');
    } else {
      setView('sheet');
    }
  }, [location.search]);

  return (
    <div className="container py-8 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-1">
            {view === 'details' && (
              <Button 
                variant="outline" 
                size="icon"
                className="h-8 w-8"
                onClick={() => navigate('/attendance')}
              >
                <ArrowLeft size={16} />
              </Button>
            )}
            <h1 className="text-3xl font-bold tracking-tight">
              {view === 'details' ? 'Class Details' : 'Attendance'}
            </h1>
          </div>
          <p className="text-muted-foreground">
            {view === 'details' 
              ? 'View and manage class details and attendance records' 
              : 'Track and manage daily attendance for all classes'
            }
          </p>
        </div>
        {view === 'sheet' && (
          <Button 
            variant="outline" 
            className="gap-1"
            onClick={() => navigate('/classes')}
          >
            <School size={16} />
            View Classes
          </Button>
        )}
      </div>

      {view === 'details' ? (
        <ClassDetails classData={classData} />
      ) : (
        <AttendanceSheet
          attendanceData={defaultAttendanceData}
          courses={courses}
        />
      )}
    </div>
  );
};

export default Attendance;
