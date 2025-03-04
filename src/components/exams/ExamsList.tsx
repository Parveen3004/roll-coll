
import React, { useState } from 'react';
import { 
  Table, 
  TableHeader, 
  TableRow, 
  TableHead, 
  TableBody, 
  TableCell 
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { 
  MoreHorizontal, 
  Search, 
  Users, 
  CalendarDays,
  Clock,
  GraduationCap,
  Pencil,
  Trash2
} from 'lucide-react';
import { format } from 'date-fns';

interface Exam {
  id: string;
  name: string;
  date: string;
  duration: number;
  location: string;
  status: 'upcoming' | 'completed';
  enrollmentDeadline: string;
  enrolledCount: number;
  maxCapacity: number;
  course: string;
}

interface ExamsListProps {
  exams: Exam[];
  showActions: boolean;
}

const ExamsList: React.FC<ExamsListProps> = ({ exams, showActions }) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Filter exams based on search term
  const filteredExams = exams.filter(exam =>
    exam.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    exam.course.toLowerCase().includes(searchTerm.toLowerCase()) ||
    exam.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const isDeadlinePassed = (deadline: string) => {
    return new Date(deadline) < new Date();
  };

  const getCapacityBadge = (enrolled: number, max: number) => {
    const percentFull = (enrolled / max) * 100;
    
    if (percentFull >= 90) {
      return <Badge variant="destructive">Almost Full</Badge>;
    } else if (percentFull >= 60) {
      return <Badge className="bg-amber-500">Filling Up</Badge>;
    } else {
      return <Badge className="bg-green-500">Available</Badge>;
    }
  };

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return `${hours}h ${mins > 0 ? `${mins}m` : ''}`;
    }
    return `${mins}m`;
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search exams..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {filteredExams.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-10 text-center">
          <div className="rounded-full bg-muted p-3">
            <GraduationCap className="h-6 w-6 text-muted-foreground" />
          </div>
          <h3 className="mt-4 text-lg font-medium">No Exams Found</h3>
          <p className="mt-2 text-sm text-muted-foreground max-w-xs">
            No exams match your search criteria. Try adjusting your search or create a new exam.
          </p>
        </div>
      ) : (
        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Exam Name</TableHead>
                <TableHead>Date & Time</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Course</TableHead>
                <TableHead>Capacity</TableHead>
                {showActions && <TableHead className="w-[70px]"></TableHead>}
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredExams.map((exam) => (
                <TableRow key={exam.id}>
                  <TableCell>
                    <div className="font-medium">{exam.name}</div>
                    {showActions && (
                      <div className="text-xs text-muted-foreground mt-1">
                        Enrollment Deadline: {format(new Date(exam.enrollmentDeadline), 'MMM d, yyyy')}
                        {isDeadlinePassed(exam.enrollmentDeadline) && 
                          <Badge variant="outline" className="ml-2 text-red-500 border-red-500">Closed</Badge>
                        }
                      </div>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <CalendarDays className="h-4 w-4 mr-1.5 text-muted-foreground" />
                      {format(new Date(exam.date), 'MMM d, yyyy, h:mm a')}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1.5 text-muted-foreground" />
                      {formatDuration(exam.duration)}
                    </div>
                  </TableCell>
                  <TableCell>{exam.location}</TableCell>
                  <TableCell>{exam.course}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1.5">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span>
                        {exam.enrolledCount}/{exam.maxCapacity}
                      </span>
                      {getCapacityBadge(exam.enrolledCount, exam.maxCapacity)}
                    </div>
                  </TableCell>
                  {showActions && (
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem className="cursor-pointer">
                            <Pencil className="mr-2 h-4 w-4" />
                            Edit Exam
                          </DropdownMenuItem>
                          <DropdownMenuItem className="cursor-pointer text-destructive">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Cancel Exam
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default ExamsList;
