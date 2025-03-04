
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
  Trash2,
  List,
  Grid,
  BarChart
} from 'lucide-react';
import { format } from 'date-fns';
import { ResultsFilter, FilterGroup, ViewOption } from '@/components/ui/results-filter';

export interface Exam {
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
  const [displayView, setDisplayView] = useState<'list' | 'grid' | 'stats'>('list');
  const [filteredExams, setFilteredExams] = useState<Exam[]>(exams);
  
  const handleSearch = (query: string) => {
    setSearchTerm(query);
    filterExams(query);
  };

  const filterExams = (query: string, filters?: Record<string, string[]>) => {
    let filtered = exams;
    
    // Apply search filter
    if (query) {
      filtered = filtered.filter(exam =>
        exam.name.toLowerCase().includes(query.toLowerCase()) ||
        exam.course.toLowerCase().includes(query.toLowerCase()) ||
        exam.location.toLowerCase().includes(query.toLowerCase())
      );
    }
    
    // Apply category filters if provided
    if (filters && Object.keys(filters).length > 0) {
      if (filters.status?.length) {
        filtered = filtered.filter(exam => filters.status.includes(exam.status));
      }
      
      if (filters.capacity?.length) {
        filtered = filtered.filter(exam => {
          const percentFull = (exam.enrolledCount / exam.maxCapacity) * 100;
          if (filters.capacity.includes('almost-full') && percentFull >= 90) return true;
          if (filters.capacity.includes('filling-up') && percentFull >= 60 && percentFull < 90) return true;
          if (filters.capacity.includes('available') && percentFull < 60) return true;
          return false;
        });
      }
    }
    
    setFilteredExams(filtered);
  };

  const handleFilterChange = (filters: Record<string, string[]>) => {
    filterExams(searchTerm, filters);
  };

  const isDeadlinePassed = (deadline: string) => {
    return new Date(deadline) < new Date();
  };

  const getCapacityBadge = (enrolled: number, max: number) => {
    const percentFull = (enrolled / max) * 100;
    
    if (percentFull >= 90) {
      return <Badge variant="destructive">Almost Full</Badge>;
    } else if (percentFull >= 60) {
      return <Badge variant="warning">Filling Up</Badge>;
    } else {
      return <Badge variant="success">Available</Badge>;
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

  const filterGroups: FilterGroup[] = [
    {
      id: 'status',
      label: 'Status',
      options: [
        { id: 'upcoming', label: 'Upcoming', value: 'upcoming' },
        { id: 'completed', label: 'Completed', value: 'completed' }
      ]
    },
    {
      id: 'capacity',
      label: 'Capacity',
      options: [
        { id: 'almost-full', label: 'Almost Full', value: 'almost-full' },
        { id: 'filling-up', label: 'Filling Up', value: 'filling-up' },
        { id: 'available', label: 'Available', value: 'available' }
      ]
    }
  ];

  const viewOptions: ViewOption[] = [
    { id: 'list', label: 'List', icon: <List className="h-4 w-4" /> },
    { id: 'grid', label: 'Grid', icon: <Grid className="h-4 w-4" /> },
    { id: 'stats', label: 'Stats', icon: <BarChart className="h-4 w-4" /> }
  ];

  return (
    <div className="space-y-4">
      <ResultsFilter 
        filterGroups={filterGroups}
        viewOptions={viewOptions}
        onFilterChange={handleFilterChange}
        onViewChange={(view) => setDisplayView(view as 'list' | 'grid' | 'stats')}
        searchPlaceholder="Search exams..."
        onSearch={handleSearch}
      />

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
      ) : displayView === 'list' ? (
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
      ) : displayView === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredExams.map((exam) => (
            <div key={exam.id} className="border rounded-lg p-4 hover:bg-accent transition-colors">
              <div className="font-medium text-lg">{exam.name}</div>
              <div className="text-muted-foreground text-sm mt-1">{exam.course}</div>
              <div className="grid grid-cols-2 gap-3 mt-3">
                <div>
                  <div className="text-xs text-muted-foreground">Date & Time</div>
                  <div className="flex items-center mt-1">
                    <CalendarDays className="h-3 w-3 mr-1 text-muted-foreground" />
                    <span className="text-sm">{format(new Date(exam.date), 'MMM d, yyyy')}</span>
                  </div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">Duration</div>
                  <div className="flex items-center mt-1">
                    <Clock className="h-3 w-3 mr-1 text-muted-foreground" />
                    <span className="text-sm">{formatDuration(exam.duration)}</span>
                  </div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">Location</div>
                  <div className="text-sm">{exam.location}</div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">Capacity</div>
                  <div className="flex items-center mt-1">
                    <Users className="h-3 w-3 mr-1 text-muted-foreground" />
                    <span className="text-sm">{exam.enrolledCount}/{exam.maxCapacity}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between mt-3">
                {getCapacityBadge(exam.enrolledCount, exam.maxCapacity)}
                <Badge variant={exam.status === 'upcoming' ? 'info' : 'secondary'}>
                  {exam.status === 'upcoming' ? 'Upcoming' : 'Completed'}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="border rounded-lg p-6">
          <div className="text-xl font-medium mb-4">Exam Statistics</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-accent p-4 rounded-lg">
              <div className="text-muted-foreground text-sm">Total Exams</div>
              <div className="text-2xl font-bold mt-1">{filteredExams.length}</div>
            </div>
            <div className="bg-accent p-4 rounded-lg">
              <div className="text-muted-foreground text-sm">Upcoming Exams</div>
              <div className="text-2xl font-bold mt-1">
                {filteredExams.filter(e => e.status === 'upcoming').length}
              </div>
            </div>
            <div className="bg-accent p-4 rounded-lg">
              <div className="text-muted-foreground text-sm">Completed Exams</div>
              <div className="text-2xl font-bold mt-1">
                {filteredExams.filter(e => e.status === 'completed').length}
              </div>
            </div>
            <div className="bg-accent p-4 rounded-lg">
              <div className="text-muted-foreground text-sm">Avg. Enrollment</div>
              <div className="text-2xl font-bold mt-1">
                {Math.round(filteredExams.reduce((sum, exam) => 
                  sum + (exam.enrolledCount / exam.maxCapacity * 100), 0) / 
                  (filteredExams.length || 1)
                )}%
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExamsList;
