
import React from 'react';
import StatCard from '@/components/ui/StatCard';
import AttendanceOverview from '@/components/dashboard/AttendanceOverview';
import ClassList from '@/components/dashboard/ClassList';
import RecentActivity from '@/components/dashboard/RecentActivity';
import { Users, BookOpen, CalendarCheck, BarChart3 } from 'lucide-react';

// Mock data
const stats = [
  {
    title: 'Total Students',
    value: '245',
    icon: <Users size={18} />,
    trend: {
      value: 12,
      isPositive: true
    }
  },
  {
    title: 'Active Classes',
    value: '16',
    icon: <BookOpen size={18} />,
    trend: {
      value: 4,
      isPositive: true
    }
  },
  {
    title: 'Attendance Rate',
    value: '87%',
    icon: <CalendarCheck size={18} />,
    trend: {
      value: 2,
      isPositive: true
    }
  },
  {
    title: 'Absent Students',
    value: '18',
    icon: <BarChart3 size={18} />,
    trend: {
      value: 5,
      isPositive: false
    }
  },
];

const attendanceData = [
  { name: 'Present', value: 75, color: '#10b981' },
  { name: 'Absent', value: 15, color: '#ef4444' },
  { name: 'Late', value: 10, color: '#f59e0b' },
];

const classes = [
  {
    id: '1',
    name: 'Computer Science 101',
    instructor: 'Dr. Alan Turing',
    totalStudents: 32,
    attendanceRate: 92
  },
  {
    id: '2',
    name: 'Introduction to Physics',
    instructor: 'Dr. Marie Curie',
    totalStudents: 28,
    attendanceRate: 86
  },
  {
    id: '3',
    name: 'Advanced Mathematics',
    instructor: 'Prof. Katherine Johnson',
    totalStudents: 24,
    attendanceRate: 79
  },
];

const activities = [
  {
    id: '1',
    type: 'check-in',
    student: { name: 'Alex Johnson', id: 'S10023' },
    class: { name: 'Computer Science 101', id: '1' },
    timestamp: 'Today at 9:15 AM'
  },
  {
    id: '2',
    type: 'absent',
    student: { name: 'Emma Thompson', id: 'S10045' },
    class: { name: 'Introduction to Physics', id: '2' },
    timestamp: 'Today at 10:30 AM'
  },
  {
    id: '3',
    type: 'late',
    student: { name: 'Michael Chen', id: 'S10067' },
    class: { name: 'Advanced Mathematics', id: '3' },
    timestamp: 'Today at 11:10 AM'
  },
  {
    id: '4',
    type: 'check-out',
    student: { name: 'Sophia Rivera', id: 'S10089' },
    class: { name: 'Computer Science 101', id: '1' },
    timestamp: 'Today at 12:45 PM'
  },
];

const Index = () => {
  return (
    <div className="container py-8 max-w-7xl mx-auto">
      <div className="flex flex-col gap-2 mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Overview of student attendance and class performance.
        </p>
      </div>

      <div className="grid gap-6 mb-8 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <StatCard 
            key={stat.title} 
            {...stat} 
            className="animate-slide-up"
            style={{ animationDelay: `${index * 50}ms` }}
          />
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-5">
        {/* Attendance Overview */}
        <AttendanceOverview data={attendanceData} />
        
        {/* Class List */}
        <ClassList classes={classes} />
        
        {/* Recent Activity */}
        <RecentActivity activities={activities} />
      </div>
    </div>
  );
};

export default Index;
