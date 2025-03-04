
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowRight, Calendar, ClipboardCheck, GraduationCap, Users } from 'lucide-react';
import StatCard from '@/components/ui/StatCard';
import AttendanceOverview from '@/components/dashboard/AttendanceOverview';
import ClassList from '@/components/dashboard/ClassList';
import RecentActivity from '@/components/dashboard/RecentActivity';

const Index = () => {
  const navigate = useNavigate();
  
  // Stats for the overview
  const stats = [
    {
      title: 'Total Students',
      value: '256',
      icon: <Users className="h-4 w-4" />,
      trend: { value: 12, isPositive: true },
    },
    {
      title: 'Average Attendance',
      value: '87%',
      icon: <ClipboardCheck className="h-4 w-4" />,
      trend: { value: 3, isPositive: true },
    },
    {
      title: 'Active Classes',
      value: '23',
      icon: <GraduationCap className="h-4 w-4" />,
      trend: { value: 2, isPositive: true },
    },
    {
      title: 'Upcoming Exams',
      value: '5',
      icon: <Calendar className="h-4 w-4" />,
      trend: { value: 1, isPositive: false },
    },
  ];

  return (
    <div className="container py-8 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold tracking-tight mb-1">Dashboard</h1>
      <p className="text-muted-foreground mb-8">
        Welcome to EduTrack, your student management system
      </p>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
        {stats.map((stat, index) => (
          <StatCard
            key={`stat-${index}`}
            className="animate-fade-in"
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            trend={stat.trend}
          />
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2 mb-6">
        <Card className="md:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <div>
              <CardTitle className="text-xl">Attendance Overview</CardTitle>
              <CardDescription>
                Last 30 days attendance rates by class
              </CardDescription>
            </div>
            <Button variant="outline" size="sm" onClick={() => navigate('/attendance')}>
              View All
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent className="pt-4">
            <AttendanceOverview />
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-7">
        <Tabs defaultValue="today" className="md:col-span-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl mb-2">Class Schedule</CardTitle>
            <TabsList>
              <TabsTrigger value="today">Today</TabsTrigger>
              <TabsTrigger value="tomorrow">Tomorrow</TabsTrigger>
              <TabsTrigger value="week">This Week</TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="today" className="space-y-0 p-0">
            <Card>
              <CardContent className="pt-6">
                <ClassList />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="tomorrow" className="space-y-0 p-0">
            <Card>
              <CardContent className="pt-6">
                <ClassList />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="week" className="space-y-0 p-0">
            <Card>
              <CardContent className="pt-6">
                <ClassList />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        <Card className="md:col-span-3">
          <CardHeader>
            <CardTitle className="text-xl">Recent Activity</CardTitle>
            <CardDescription>
              Latest updates across the system
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RecentActivity />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
