
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar } from '@/components/ui/calendar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, Calendar as CalendarIcon, Filter, ChevronLeft, ChevronRight } from 'lucide-react';
import WeeklyTimetable from '@/components/timetable/WeeklyTimetable';
import DailyTimetable from '@/components/timetable/DailyTimetable';

const Timetable = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [view, setView] = useState<'weekly' | 'daily'>('weekly');
  
  // Mock data for classes with time information
  const classSchedules = [
    {
      id: '1',
      name: 'Computer Science 101',
      instructor: 'Dr. Alan Turing',
      day: 'Monday',
      startTime: '09:00',
      endTime: '10:30',
      location: 'Building A, Room 101',
      color: 'bg-blue-500'
    },
    {
      id: '2',
      name: 'Introduction to Physics',
      instructor: 'Dr. Marie Curie',
      day: 'Tuesday',
      startTime: '10:30',
      endTime: '12:00',
      location: 'Building B, Room 205',
      color: 'bg-green-500'
    },
    {
      id: '3',
      name: 'Advanced Mathematics',
      instructor: 'Prof. Katherine Johnson',
      day: 'Monday',
      startTime: '11:00',
      endTime: '12:30',
      location: 'Building C, Room 310',
      color: 'bg-purple-500'
    },
    {
      id: '4',
      name: 'Data Structures & Algorithms',
      instructor: 'Dr. Grace Hopper',
      day: 'Wednesday',
      startTime: '14:00',
      endTime: '15:30',
      location: 'Building A, Room 203',
      color: 'bg-yellow-500'
    },
    {
      id: '5',
      name: 'Web Development',
      instructor: 'Prof. Tim Berners-Lee',
      day: 'Thursday',
      startTime: '15:30',
      endTime: '17:00',
      location: 'Building D, Room 405',
      color: 'bg-red-500'
    },
    {
      id: '6',
      name: 'Database Systems',
      instructor: 'Dr. Edgar Codd',
      day: 'Friday',
      startTime: '13:00',
      endTime: '14:30',
      location: 'Building B, Room 201',
      color: 'bg-indigo-500'
    },
    {
      id: '7',
      name: 'Computer Networks',
      instructor: 'Dr. Vint Cerf',
      day: 'Thursday',
      startTime: '09:00',
      endTime: '10:30',
      location: 'Building A, Room 105',
      color: 'bg-pink-500'
    },
    {
      id: '8',
      name: 'Artificial Intelligence',
      instructor: 'Prof. John McCarthy',
      day: 'Wednesday',
      startTime: '10:00',
      endTime: '11:30',
      location: 'Building C, Room 302',
      color: 'bg-cyan-500'
    }
  ];

  // Filter classes by day if in daily view
  const filteredClasses = view === 'daily' && date 
    ? classSchedules.filter(cls => {
        const dayOfWeek = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(date);
        return cls.day === dayOfWeek;
      })
    : classSchedules;

  // Navigate between days
  const navigateDay = (direction: 'prev' | 'next') => {
    if (date) {
      const newDate = new Date(date);
      if (direction === 'prev') {
        newDate.setDate(newDate.getDate() - 1);
      } else {
        newDate.setDate(newDate.getDate() + 1);
      }
      setDate(newDate);
    }
  };

  return (
    <div className="container py-8 max-w-7xl mx-auto">
      <div className="flex flex-col gap-2 mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Class Timetable</h1>
        <p className="text-muted-foreground">
          View and manage class schedules and timings.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2">
          <Card className="overflow-hidden">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle>Class Schedule</CardTitle>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" onClick={() => setView('daily')}>
                    Daily
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => setView('weekly')}>
                    Weekly
                  </Button>
                  <Button variant="outline" size="icon" className="h-8 w-8">
                    <Filter className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              {view === 'weekly' ? (
                <WeeklyTimetable classSchedules={classSchedules} />
              ) : (
                <>
                  <div className="flex items-center justify-between p-4 border-b">
                    <Button variant="ghost" size="icon" onClick={() => navigateDay('prev')}>
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <div className="font-medium">
                      {date && date.toLocaleDateString('en-US', { 
                        weekday: 'long', 
                        month: 'long', 
                        day: 'numeric'
                      })}
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => navigateDay('next')}>
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                  <DailyTimetable classes={filteredClasses} />
                </>
              )}
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Calendar</CardTitle>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border"
              />

              <div className="mt-6 space-y-4">
                <h3 className="font-medium">Upcoming Classes</h3>
                <div className="space-y-2">
                  {classSchedules.slice(0, 3).map((cls) => (
                    <div 
                      key={cls.id} 
                      className="flex items-center p-2 rounded-md border hover:border-primary/50 transition-colors cursor-pointer"
                    >
                      <div className={`w-3 h-10 rounded-sm mr-3 ${cls.color}`}></div>
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">{cls.name}</h4>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                          <Clock className="h-3 w-3" />
                          <span>{cls.startTime} - {cls.endTime}</span>
                          <Badge variant="outline" className="ml-auto">
                            {cls.day}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="link" className="text-xs w-full mt-2">
                  View All Classes
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Timetable;

