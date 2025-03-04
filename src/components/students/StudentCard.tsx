
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';

interface Student {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  studentId: string;
  attendanceRate: number;
  status: 'active' | 'inactive';
}

interface StudentCardProps {
  student: Student;
}

const StudentCard: React.FC<StudentCardProps> = ({ student }) => {
  const navigate = useNavigate();
  
  const getInitials = (name: string) => {
    const names = name.split(' ');
    if (names.length === 1) return names[0].charAt(0).toUpperCase();
    return (names[0].charAt(0) + names[names.length - 1].charAt(0)).toUpperCase();
  };

  return (
    <Card 
      className="overflow-hidden hover:shadow-soft transition-all cursor-pointer animate-fade-in"
      onClick={() => navigate(`/students/${student.id}`)}
    >
      <CardContent className="p-5">
        <div className="flex items-center gap-4">
          <Avatar className="h-12 w-12 border-2 border-white shadow-sm">
            <AvatarImage src={student.avatar} alt={student.name} />
            <AvatarFallback className="bg-primary text-primary-foreground">
              {getInitials(student.name)}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-1">
              <h3 className="font-medium truncate">{student.name}</h3>
              <Badge variant={student.status === 'active' ? 'default' : 'secondary'}>
                {student.status === 'active' ? 'Active' : 'Inactive'}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground truncate">{student.email}</p>
            <div className="flex items-center justify-between mt-3">
              <div className="text-sm">
                <span className="text-muted-foreground">ID: </span>
                <span className="font-medium">{student.studentId}</span>
              </div>
              <div className="text-sm">
                <span className="text-muted-foreground">Attendance: </span>
                <span 
                  className={
                    student.attendanceRate >= 90 ? 'text-green-500 font-medium' : 
                    student.attendanceRate >= 70 ? 'text-amber-500 font-medium' : 
                    'text-destructive font-medium'
                  }
                >
                  {student.attendanceRate}%
                </span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StudentCard;
