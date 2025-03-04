
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Class {
  id: string;
  name: string;
  instructor: string;
  totalStudents: number;
  attendanceRate: number;
}

interface ClassListProps {
  classes: Class[];
}

const ClassList: React.FC<ClassListProps> = ({ classes }) => {
  const navigate = useNavigate();

  return (
    <Card className="col-span-3 animate-slide-up" style={{ animationDelay: '100ms' }}>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-medium">Active Classes</CardTitle>
        <button 
          onClick={() => navigate('/classes')}
          className="text-sm text-primary font-medium flex items-center gap-1 hover:underline"
        >
          View all <ArrowRight size={14} />
        </button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {classes.map((cls) => (
            <div 
              key={cls.id}
              className="flex items-center justify-between p-3 rounded-lg border border-border/60 hover:border-border hover:bg-muted/30 transition-all cursor-pointer"
              onClick={() => navigate(`/classes/${cls.id}`)}
            >
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-md bg-primary/10 flex items-center justify-center text-primary">
                  <Users size={18} />
                </div>
                <div>
                  <h3 className="font-medium">{cls.name}</h3>
                  <p className="text-sm text-muted-foreground">{cls.instructor}</p>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Students</p>
                  <p className="font-medium">{cls.totalStudents}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Attendance</p>
                  <p className="font-medium">{cls.attendanceRate}%</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ClassList;
