
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { GraduationCap, ClipboardCheck, CalendarDays, PlusCircle, Filter, Download } from 'lucide-react';
import ExamsList from '@/components/exams/ExamsList';
import EnrollmentForm from '@/components/exams/EnrollmentForm';
import { useToast } from '@/components/ui/use-toast';

// Mock data for exams
const examsData = [
  {
    id: '1',
    name: 'Computer Science Midterm',
    date: '2023-10-15T09:00:00',
    duration: 120,
    location: 'Hall A',
    status: 'upcoming',
    enrollmentDeadline: '2023-10-10T23:59:59',
    enrolledCount: 28,
    maxCapacity: 35,
    course: 'Computer Science 101',
  },
  {
    id: '2',
    name: 'Introduction to Physics Final',
    date: '2023-10-20T14:00:00',
    duration: 180,
    location: 'Hall B',
    status: 'upcoming',
    enrollmentDeadline: '2023-10-15T23:59:59',
    enrolledCount: 25,
    maxCapacity: 30,
    course: 'Introduction to Physics',
  },
  {
    id: '3',
    name: 'Advanced Mathematics Quiz',
    date: '2023-10-05T11:00:00',
    duration: 60,
    location: 'Room 101',
    status: 'completed',
    enrollmentDeadline: '2023-10-01T23:59:59',
    enrolledCount: 22,
    maxCapacity: 25,
    course: 'Advanced Mathematics',
  },
  {
    id: '4',
    name: 'Data Structures Midterm',
    date: '2023-10-18T10:30:00',
    duration: 150,
    location: 'Hall C',
    status: 'upcoming',
    enrollmentDeadline: '2023-10-13T23:59:59',
    enrolledCount: 24,
    maxCapacity: 30,
    course: 'Data Structures & Algorithms',
  },
  {
    id: '5',
    name: 'Web Development Project Presentation',
    date: '2023-09-30T13:00:00',
    duration: 180,
    location: 'Conference Room',
    status: 'completed',
    enrollmentDeadline: '2023-09-25T23:59:59',
    enrolledCount: 28,
    maxCapacity: 30,
    course: 'Web Development',
  },
];

const ExamEnrollment = () => {
  const [activeTab, setActiveTab] = useState('upcoming');
  const { toast } = useToast();

  const handleCreateEnrollment = (data: any) => {
    // In a real app, this would send data to a backend
    console.log('Enrollment data submitted:', data);
    toast({
      title: "Enrollment Recorded",
      description: `${data.studentName} enrolled in ${data.examName}`,
    });
    setActiveTab('upcoming');
  };

  return (
    <div className="container py-8 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Exam Enrollment</h1>
          <p className="text-muted-foreground">
            Manage exam schedules and student enrollments
          </p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            className="gap-1"
            onClick={() => window.print()}
          >
            <Download size={16} />
            Export
          </Button>
          <Button 
            className="gap-1"
            onClick={() => setActiveTab('enroll')}
          >
            <PlusCircle size={16} />
            New Enrollment
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="upcoming" className="gap-2">
            <CalendarDays size={16} />
            Upcoming Exams
          </TabsTrigger>
          <TabsTrigger value="past" className="gap-2">
            <ClipboardCheck size={16} />
            Past Exams
          </TabsTrigger>
          <TabsTrigger value="enroll" className="gap-2">
            <GraduationCap size={16} />
            Enroll Student
          </TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming">
          <Card>
            <CardContent className="p-6">
              <ExamsList 
                exams={examsData.filter(exam => exam.status === 'upcoming')} 
                showActions={true}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="past">
          <Card>
            <CardContent className="p-6">
              <ExamsList 
                exams={examsData.filter(exam => exam.status === 'completed')} 
                showActions={false}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="enroll">
          <Card>
            <CardContent className="p-6">
              <EnrollmentForm 
                exams={examsData.filter(exam => exam.status === 'upcoming')}
                onSubmit={handleCreateEnrollment} 
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ExamEnrollment;
