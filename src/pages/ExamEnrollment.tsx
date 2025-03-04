
// Fix 'status' type issues by ensuring status is of type "upcoming" | "completed"
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Search } from 'lucide-react';
import { EnrollmentForm } from '@/components/exams/EnrollmentForm';
import { ExamsList } from '@/components/exams/ExamsList';
import { ResultsFilter } from '@/components/ui/results-filter';

// Define exam type with proper status type
interface Exam {
  id: string;
  name: string;
  date: string;
  duration: number; // in minutes
  location: string;
  status: "upcoming" | "completed";
  enrollmentDeadline: string;
  enrolledCount: number;
  maxCapacity: number;
  course: string;
}

const ExamEnrollment = () => {
  const [selectedExam, setSelectedExam] = useState<Exam | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentView, setCurrentView] = useState('all');
  const [filterOption, setFilterOption] = useState('all');

  // Define filter options for the ResultsFilter component
  const filterOptions = [
    { value: 'all', label: 'All Exams' },
    { value: 'upcoming', label: 'Upcoming' },
    { value: 'completed', label: 'Completed' },
    { value: 'enrolled', label: 'Enrolled' }
  ];

  // Handle filter changes
  const handleFilterChange = (option: string) => {
    setFilterOption(option);
  };

  // View options for the tabs
  const viewOptions = [
    { value: 'all', label: 'All Exams' },
    { value: 'upcoming', label: 'Upcoming' },
    { value: 'completed', label: 'Completed' }
  ];

  // Example data for exams - note the status is now properly typed
  const allExams: Exam[] = [
    {
      id: '1',
      name: 'Mathematics Final Exam',
      date: '2023-12-15T09:00:00',
      duration: 180,
      location: 'Hall A',
      status: "upcoming",
      enrollmentDeadline: '2023-12-01',
      enrolledCount: 45,
      maxCapacity: 60,
      course: 'Advanced Mathematics'
    },
    {
      id: '2',
      name: 'Physics Midterm',
      date: '2023-11-05T13:30:00',
      duration: 120,
      location: 'Science Building, Room 305',
      status: "completed",
      enrollmentDeadline: '2023-10-25',
      enrolledCount: 38,
      maxCapacity: 40,
      course: 'Physics 101'
    },
    {
      id: '3',
      name: 'Computer Science Project Defense',
      date: '2023-12-20T10:00:00',
      duration: 30,
      location: 'Technology Building, Room 102',
      status: "upcoming",
      enrollmentDeadline: '2023-12-10',
      enrolledCount: 15,
      maxCapacity: 20,
      course: 'Software Engineering'
    },
    {
      id: '4',
      name: 'Biology Lab Exam',
      date: '2023-11-15T09:00:00',
      duration: 90,
      location: 'Lab Building B, Room 201',
      status: "completed",
      enrollmentDeadline: '2023-11-01',
      enrolledCount: 32,
      maxCapacity: 35,
      course: 'Biology 102'
    },
    {
      id: '5',
      name: 'English Literature Essay',
      date: '2023-12-18T14:00:00',
      duration: 120,
      location: 'Liberal Arts Building, Room 401',
      status: "upcoming",
      enrollmentDeadline: '2023-12-05',
      enrolledCount: 28,
      maxCapacity: 30,
      course: 'English Literature'
    }
  ];

  // Filter exams based on current view, search query, and filter option
  const filteredExams = allExams.filter(exam => {
    const matchesSearch = exam.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         exam.course.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (!matchesSearch) return false;
    
    if (currentView === 'upcoming' && exam.status !== 'upcoming') return false;
    if (currentView === 'completed' && exam.status !== 'completed') return false;
    
    if (filterOption === 'upcoming' && exam.status !== 'upcoming') return false;
    if (filterOption === 'completed' && exam.status !== 'completed') return false;
    // For 'enrolled' filter we would typically check if the current user is enrolled
    // This is just a placeholder logic since we don't have user authentication yet
    if (filterOption === 'enrolled') {
      return exam.enrolledCount > 0 && exam.enrolledCount < exam.maxCapacity;
    }
    
    return true;
  });

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleViewChange = (value: string) => {
    setCurrentView(value);
  };

  const handleExamSelect = (exam: Exam) => {
    setSelectedExam(exam);
  };

  return (
    <div className="container py-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Exam Enrollment</h1>
        <p className="text-muted-foreground">Manage and enroll in upcoming examinations</p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="md:col-span-2">
          <div className="mb-6 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search exams..."
                className="pl-10"
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </div>
            <ResultsFilter 
              options={filterOptions} 
              value={filterOption} 
              onChange={handleFilterChange} 
            />
          </div>

          <Tabs defaultValue="all" value={currentView} onValueChange={handleViewChange}>
            <TabsList className="mb-4">
              {viewOptions.map(option => (
                <TabsTrigger key={option.value} value={option.value}>
                  {option.label}
                </TabsTrigger>
              ))}
            </TabsList>
            
            <TabsContent value="all" className="space-y-4">
              <ExamsList exams={filteredExams} onExamSelect={handleExamSelect} />
            </TabsContent>
            
            <TabsContent value="upcoming" className="space-y-4">
              <ExamsList 
                exams={filteredExams.filter(exam => exam.status === 'upcoming')} 
                onExamSelect={handleExamSelect} 
              />
            </TabsContent>
            
            <TabsContent value="completed" className="space-y-4">
              <ExamsList 
                exams={filteredExams.filter(exam => exam.status === 'completed')} 
                onExamSelect={handleExamSelect} 
              />
            </TabsContent>
          </Tabs>
        </div>

        <div>
          {selectedExam ? (
            <Card>
              <CardHeader>
                <CardTitle>Enrollment Details</CardTitle>
                <CardDescription>
                  Review and complete your exam enrollment
                </CardDescription>
              </CardHeader>
              <CardContent>
                <EnrollmentForm exam={selectedExam} />
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>Enrollment</CardTitle>
                <CardDescription>
                  Select an exam to enroll
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Please select an exam from the list to view enrollment details and register.</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExamEnrollment;
