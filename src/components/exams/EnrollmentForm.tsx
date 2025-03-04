
import React, { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { format } from 'date-fns';
import { GraduationCap, User, CalendarDays, Clock, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

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

// Define the form schema
const formSchema = z.object({
  studentName: z.string().min(2, {
    message: "Student name must be at least 2 characters.",
  }),
  studentId: z.string().min(3, {
    message: "Student ID is required.",
  }),
  examId: z.string({
    required_error: "Please select an exam.",
  }),
  accommodations: z.string().optional(),
  requiresSpecialArrangements: z.enum(["yes", "no"]),
});

type FormValues = z.infer<typeof formSchema>;

interface EnrollmentFormProps {
  exams: Exam[];
  onSubmit: (data: FormValues & { examName: string }) => void;
}

const EnrollmentForm: React.FC<EnrollmentFormProps> = ({ exams, onSubmit }) => {
  const [selectedExam, setSelectedExam] = useState<Exam | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      studentName: "",
      studentId: "",
      examId: "",
      accommodations: "",
      requiresSpecialArrangements: "no",
    },
  });

  const handleSubmit = (values: FormValues) => {
    if (selectedExam) {
      onSubmit({
        ...values,
        examName: selectedExam.name
      });
      form.reset();
      setSelectedExam(null);
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

  const getCapacityLabel = (enrolled: number, max: number) => {
    const percentFull = (enrolled / max) * 100;
    
    if (percentFull >= 90) {
      return "Almost Full";
    } else if (percentFull >= 60) {
      return "Filling Up";
    } else {
      return "Available";
    }
  };

  const getCapacityColor = (enrolled: number, max: number) => {
    const percentFull = (enrolled / max) * 100;
    
    if (percentFull >= 90) {
      return "text-red-500";
    } else if (percentFull >= 60) {
      return "text-amber-500";
    } else {
      return "text-green-500";
    }
  };

  const handleExamChange = (examId: string) => {
    const exam = exams.find(e => e.id === examId) || null;
    setSelectedExam(exam);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="studentName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Student Name</FormLabel>
                <FormControl>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input className="pl-9" placeholder="Enter student name" {...field} />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="studentId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Student ID</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. S10023" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="examId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Select Exam</FormLabel>
              <Select 
                onValueChange={(value) => {
                  field.onChange(value);
                  handleExamChange(value);
                }} 
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <GraduationCap className="mr-2 h-4 w-4 text-muted-foreground" />
                    <SelectValue placeholder="Select an exam" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {exams.map((exam) => (
                    <SelectItem key={exam.id} value={exam.id}>
                      {exam.name} - {format(new Date(exam.date), 'MMM d, yyyy')}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {selectedExam && (
          <Card className="bg-muted/50">
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium">{selectedExam.name}</h3>
                  <p className="text-sm text-muted-foreground">{selectedExam.course}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-start gap-2">
                    <CalendarDays className="h-4 w-4 mt-0.5 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Date & Time</p>
                      <p className="text-sm text-muted-foreground">
                        {format(new Date(selectedExam.date), 'MMMM d, yyyy')}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {format(new Date(selectedExam.date), 'h:mm a')}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-2">
                    <Clock className="h-4 w-4 mt-0.5 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Duration</p>
                      <p className="text-sm text-muted-foreground">
                        {formatDuration(selectedExam.duration)}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-2">
                    <MapPin className="h-4 w-4 mt-0.5 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Location</p>
                      <p className="text-sm text-muted-foreground">
                        {selectedExam.location}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-2">
                    <User className="h-4 w-4 mt-0.5 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Capacity</p>
                      <p className={`text-sm font-medium ${getCapacityColor(selectedExam.enrolledCount, selectedExam.maxCapacity)}`}>
                        {selectedExam.enrolledCount}/{selectedExam.maxCapacity} - {getCapacityLabel(selectedExam.enrolledCount, selectedExam.maxCapacity)}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <p className="text-sm font-medium">Enrollment Deadline</p>
                  <p className="text-sm text-muted-foreground">
                    {format(new Date(selectedExam.enrollmentDeadline), 'MMMM d, yyyy, h:mm a')}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <FormField
          control={form.control}
          name="requiresSpecialArrangements"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Special Arrangements Required?</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-row gap-4"
                >
                  <FormItem className="flex items-center space-x-2 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="no" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      No
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-2 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="yes" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      Yes
                    </FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {form.watch("requiresSpecialArrangements") === "yes" && (
          <FormField
            control={form.control}
            name="accommodations"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Accommodations Needed</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Please describe any special accommodations or arrangements needed"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  This information will be shared with exam administrators only.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <div className="flex justify-end gap-3">
          <Button 
            type="button" 
            variant="outline" 
            onClick={() => {
              form.reset();
              setSelectedExam(null);
            }}
          >
            Cancel
          </Button>
          <Button type="submit">
            Enroll Student
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default EnrollmentForm;
