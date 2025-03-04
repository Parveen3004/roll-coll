
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { 
  Calendar as CalendarIcon, 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  MoreHorizontal, 
  FileDown
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

// Type definitions
type AttendanceStatus = 'present' | 'absent' | 'late' | 'excused' | null;

interface Student {
  id: string;
  name: string;
  avatar?: string;
}

interface Course {
  id: string;
  name: string;
}

interface AttendanceRecord {
  date: Date;
  course: Course;
  records: {
    student: Student;
    status: AttendanceStatus;
    note?: string;
  }[];
}

interface AttendanceSheetProps {
  attendanceData: AttendanceRecord;
  courses: Course[];
}

const AttendanceSheet: React.FC<AttendanceSheetProps> = ({ attendanceData, courses }) => {
  const [date, setDate] = useState<Date>(attendanceData.date);
  const [selectedCourse, setSelectedCourse] = useState<Course>(attendanceData.course);
  const [records, setRecords] = useState(attendanceData.records);

  const handlePrevDay = () => {
    const prevDay = new Date(date);
    prevDay.setDate(prevDay.getDate() - 1);
    setDate(prevDay);
  };

  const handleNextDay = () => {
    const nextDay = new Date(date);
    nextDay.setDate(nextDay.getDate() + 1);
    setDate(nextDay);
  };

  const updateAttendance = (studentId: string, status: AttendanceStatus) => {
    setRecords(
      records.map((record) =>
        record.student.id === studentId ? { ...record, status } : record
      )
    );
  };

  const getStatusBadge = (status: AttendanceStatus) => {
    switch (status) {
      case 'present':
        return <Badge className="bg-green-500">Present</Badge>;
      case 'absent':
        return <Badge variant="destructive">Absent</Badge>;
      case 'late':
        return <Badge className="bg-amber-500">Late</Badge>;
      case 'excused':
        return <Badge variant="outline">Excused</Badge>;
      default:
        return <Badge variant="secondary">Not marked</Badge>;
    }
  };

  const getInitials = (name: string) => {
    const names = name.split(' ');
    if (names.length === 1) return names[0].charAt(0).toUpperCase();
    return (names[0].charAt(0) + names[names.length - 1].charAt(0)).toUpperCase();
  };

  return (
    <div className="space-y-6">
      {/* Header with date picker and course selector */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={handlePrevDay}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="min-w-44 justify-start text-left font-normal">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {format(date, 'PPP')}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={date}
                onSelect={(date) => date && setDate(date)}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          
          <Button variant="outline" size="icon" onClick={handleNextDay}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="min-w-40">
                {selectedCourse.name}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {courses.map((course) => (
                <DropdownMenuItem 
                  key={course.id}
                  onClick={() => setSelectedCourse(course)}
                >
                  {course.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          
          <Button variant="outline" size="icon">
            <FileDown className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      {/* Attendance Table */}
      <Card className="overflow-hidden">
        <CardHeader className="pb-0">
          <CardTitle className="text-lg">
            {selectedCourse.name} - {format(date, 'EEEE, MMMM d, yyyy')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {records.map((record) => (
                <TableRow key={record.student.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9">
                        <AvatarImage src={record.student.avatar} alt={record.student.name} />
                        <AvatarFallback className="bg-primary/10 text-primary">
                          {getInitials(record.student.name)}
                        </AvatarFallback>
                      </Avatar>
                      <span className="font-medium">{record.student.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(record.status)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className={cn(
                          "h-8 w-8",
                          record.status === 'present' && "bg-green-100 text-green-600"
                        )}
                        onClick={() => updateAttendance(record.student.id, 'present')}
                      >
                        <CheckCircle2 className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className={cn(
                          "h-8 w-8",
                          record.status === 'absent' && "bg-rose-100 text-rose-600"
                        )}
                        onClick={() => updateAttendance(record.student.id, 'absent')}
                      >
                        <XCircle className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className={cn(
                          "h-8 w-8",
                          record.status === 'late' && "bg-amber-100 text-amber-600"
                        )}
                        onClick={() => updateAttendance(record.student.id, 'late')}
                      >
                        <Clock className="h-4 w-4" />
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => updateAttendance(record.student.id, 'excused')}>
                            Mark as Excused
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => updateAttendance(record.student.id, null)}>
                            Clear Status
                          </DropdownMenuItem>
                          <DropdownMenuItem>Add Note</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default AttendanceSheet;
