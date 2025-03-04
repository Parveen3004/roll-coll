
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, MapPin, Users, PlusCircle, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Mock data
const classes = [
  {
    id: '1',
    name: 'Computer Science 101',
    instructor: 'Dr. Alan Turing',
    description: 'Introduction to computer science and programming fundamentals',
    schedule: 'Mon, Wed, Fri',
    time: '9:00 AM - 10:30 AM',
    location: 'Building A, Room 101',
    totalStudents: 32,
    attendanceRate: 92
  },
  {
    id: '2',
    name: 'Introduction to Physics',
    instructor: 'Dr. Marie Curie',
    description: 'Basic principles of physics and mechanics',
    schedule: 'Tue, Thu',
    time: '10:30 AM - 12:00 PM',
    location: 'Building B, Room 205',
    totalStudents: 28,
    attendanceRate: 86
  },
  {
    id: '3',
    name: 'Advanced Mathematics',
    instructor: 'Prof. Katherine Johnson',
    description: 'Calculus, linear algebra and advanced mathematical concepts',
    schedule: 'Mon, Wed',
    time: '11:00 AM - 12:30 PM',
    location: 'Building C, Room 310',
    totalStudents: 24,
    attendanceRate: 79
  },
  {
    id: '4',
    name: 'Data Structures & Algorithms',
    instructor: 'Dr. Grace Hopper',
    description: 'Study of data structures, algorithms and computational complexity',
    schedule: 'Mon, Wed, Fri',
    time: '2:00 PM - 3:30 PM',
    location: 'Building A, Room 203',
    totalStudents: 26,
    attendanceRate: 88
  },
  {
    id: '5',
    name: 'Web Development',
    instructor: 'Prof. Tim Berners-Lee',
    description: 'Front-end and back-end web development technologies',
    schedule: 'Tue, Thu',
    time: '3:30 PM - 5:00 PM',
    location: 'Building D, Room 405',
    totalStudents: 30,
    attendanceRate: 90
  },
  {
    id: '6',
    name: 'Database Systems',
    instructor: 'Dr. Edgar Codd',
    description: 'Design, implementation and management of database systems',
    schedule: 'Wed, Fri',
    time: '1:00 PM - 2:30 PM',
    location: 'Building B, Room 201',
    totalStudents: 22,
    attendanceRate: 84
  },
];

const Classes = () => {
  const navigate = useNavigate();

  return (
    <div className="container py-8 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Classes</h1>
          <p className="text-muted-foreground">
            Manage classes, schedules and attendance records.
          </p>
        </div>
        <Button className="gap-1">
          <PlusCircle size={18} />
          New Class
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {classes.map((classItem, index) => (
          <Card 
            key={classItem.id} 
            className="overflow-hidden hover:shadow-soft transition-all cursor-pointer animate-fade-in"
            style={{ animationDelay: `${index * 50}ms` }}
            onClick={() => navigate(`/classes/${classItem.id}`)}
          >
            <CardContent className="p-5">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h2 className="font-semibold truncate">{classItem.name}</h2>
                  <span 
                    className={`inline-flex items-center text-xs font-medium ${
                      classItem.attendanceRate >= 90 
                        ? 'bg-green-100 text-green-800' 
                        : classItem.attendanceRate >= 80 
                          ? 'bg-blue-100 text-blue-800' 
                          : classItem.attendanceRate >= 70 
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-red-100 text-red-800'
                    } px-2.5 py-0.5 rounded-full`}
                  >
                    {classItem.attendanceRate}% Attendance
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {classItem.description}
                </p>
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{classItem.schedule}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{classItem.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm truncate">{classItem.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{classItem.totalStudents} Students</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">{classItem.instructor}</span>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-8 gap-1 hover:text-primary"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/attendance?class=${classItem.id}`);
                    }}
                  >
                    <span>Take Attendance</span>
                    <ArrowRight size={14} />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Classes;
