
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowRight, Users, Calendar, GraduationCap, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import { AttendanceOverview } from '@/components/dashboard/AttendanceOverview';
import { ClassList } from '@/components/dashboard/ClassList';
import { RecentActivity } from '@/components/dashboard/RecentActivity';

// Example data for components
const attendanceData = {
  present: 85,
  absent: 10,
  late: 5,
  total: 120,
  trend: [65, 70, 75, 72, 80, 85]
};

const classesByDay = [
  {
    id: '1',
    name: 'Mathematics 101',
    time: '09:00 - 10:30',
    teacher: 'Dr. Smith',
    room: 'A101',
    studentsCount: 28
  },
  {
    id: '2',
    name: 'Physics Fundamentals',
    time: '11:00 - 12:30',
    teacher: 'Prof. Johnson',
    room: 'B205',
    studentsCount: 24
  },
  {
    id: '3',
    name: 'Computer Science',
    time: '14:00 - 15:30',
    teacher: 'Ms. Williams',
    room: 'C310',
    studentsCount: 20
  }
];

const classesByWeek = [
  {
    id: '4',
    name: 'Biology Lab',
    time: 'Tuesday, 10:00 - 12:00',
    teacher: 'Dr. Davis',
    room: 'Lab 1',
    studentsCount: 18
  },
  {
    id: '5',
    name: 'Chemistry',
    time: 'Wednesday, 13:00 - 14:30',
    teacher: 'Prof. Brown',
    room: 'A205',
    studentsCount: 22
  },
  {
    id: '6',
    name: 'English Literature',
    time: 'Thursday, 09:00 - 10:30',
    teacher: 'Mr. Wilson',
    room: 'D102',
    studentsCount: 30
  }
];

const classesByMonth = [
  {
    id: '7',
    name: 'Art History',
    time: 'First Monday, 14:00 - 16:00',
    teacher: 'Ms. Lee',
    room: 'Gallery',
    studentsCount: 15
  },
  {
    id: '8',
    name: 'Economics',
    time: 'Second & Fourth Friday, 10:00 - 11:30',
    teacher: 'Dr. Martin',
    room: 'B101',
    studentsCount: 26
  },
  {
    id: '9',
    name: 'Psychology',
    time: 'Third Wednesday, 15:00 - 17:00',
    teacher: 'Prof. Garcia',
    room: 'C205',
    studentsCount: 32
  }
];

const recentActivities = [
  {
    id: '1',
    type: 'enrollment',
    description: 'New student enrolled in Mathematics 101',
    timestamp: '2023-11-15T13:45:00'
  },
  {
    id: '2',
    type: 'attendance',
    description: 'Attendance recorded for Physics class',
    timestamp: '2023-11-15T10:30:00'
  },
  {
    id: '3',
    type: 'payment',
    description: 'Tuition payment received from John Doe',
    timestamp: '2023-11-14T16:20:00'
  },
  {
    id: '4',
    type: 'exam',
    description: 'Biology final exam scheduled for Dec 15',
    timestamp: '2023-11-14T09:15:00'
  },
  {
    id: '5',
    type: 'class',
    description: 'New Computer Science class added to schedule',
    timestamp: '2023-11-13T14:50:00'
  }
];

const Index = () => {
  return (
    <div className="container py-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
        <p className="text-muted-foreground">Welcome to your education management dashboard</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="col-span-full md:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              <span>Attendance Overview</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <AttendanceOverview data={attendanceData} />
          </CardContent>
          <CardFooter>
            <Button asChild variant="ghost" className="w-full justify-between">
              <Link to="/attendance">
                <span>View detailed attendance</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>

        <Card className="col-span-full md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              <span>Classes Overview</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="day">
              <TabsList className="mb-4">
                <TabsTrigger value="day">Today</TabsTrigger>
                <TabsTrigger value="week">This Week</TabsTrigger>
                <TabsTrigger value="month">This Month</TabsTrigger>
              </TabsList>
              <TabsContent value="day">
                <ClassList classes={classesByDay} />
              </TabsContent>
              <TabsContent value="week">
                <ClassList classes={classesByWeek} />
              </TabsContent>
              <TabsContent value="month">
                <ClassList classes={classesByMonth} />
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter>
            <Button asChild variant="ghost" className="w-full justify-between">
              <Link to="/classes">
                <span>View all classes</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>

        <Card className="col-span-full">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              <span>Recent Activity</span>
            </CardTitle>
            <CardDescription>Latest updates from across the platform</CardDescription>
          </CardHeader>
          <CardContent>
            <RecentActivity activities={recentActivities} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
