
import React from 'react';
import { ClockIcon, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ClassSchedule {
  id: string;
  name: string;
  instructor: string;
  day: string;
  startTime: string;
  endTime: string;
  location: string;
  color: string;
}

interface DailyTimetableProps {
  classes: ClassSchedule[];
}

const DailyTimetable: React.FC<DailyTimetableProps> = ({ classes }) => {
  // Sort classes by start time
  const sortedClasses = [...classes].sort((a, b) => {
    return a.startTime.localeCompare(b.startTime);
  });

  return (
    <div className="p-4">
      {sortedClasses.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-10 text-center">
          <div className="rounded-full bg-muted p-3">
            <ClockIcon className="h-6 w-6 text-muted-foreground" />
          </div>
          <h3 className="mt-4 text-lg font-medium">No Classes Scheduled</h3>
          <p className="mt-2 text-sm text-muted-foreground max-w-xs">
            There are no classes scheduled for this day. Select another day or add a new class.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {sortedClasses.map(cls => (
            <div 
              key={cls.id} 
              className="flex border rounded-lg overflow-hidden hover:border-primary/40 transition-colors"
            >
              <div className={`w-2 ${cls.color}`}></div>
              <div className="flex-1 p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-medium">{cls.name}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{cls.instructor}</p>
                  </div>
                  <div className="text-sm font-medium">
                    {cls.startTime} - {cls.endTime}
                  </div>
                </div>
                <div className="flex items-center mt-3 text-sm text-muted-foreground">
                  <MapPin className="h-3.5 w-3.5 mr-1" />
                  {cls.location}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DailyTimetable;

