
import React from 'react';
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

interface WeeklyTimetableProps {
  classSchedules: ClassSchedule[];
}

const WeeklyTimetable: React.FC<WeeklyTimetableProps> = ({ classSchedules }) => {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const timeSlots = Array.from({ length: 12 }, (_, i) => {
    const hour = Math.floor(i / 2) + 8;
    const minute = i % 2 === 0 ? '00' : '30';
    return `${hour}:${minute}`;
  });

  // Divide classes into days and time slots
  const getClassForTimeSlot = (day: string, timeSlot: string) => {
    return classSchedules.filter(cls => {
      const timeSlotHour = parseInt(timeSlot.split(':')[0]);
      const timeSlotMinute = parseInt(timeSlot.split(':')[1]);
      const startHour = parseInt(cls.startTime.split(':')[0]);
      const startMinute = parseInt(cls.startTime.split(':')[1]);
      const endHour = parseInt(cls.endTime.split(':')[0]);
      const endMinute = parseInt(cls.endTime.split(':')[1]);
      
      const timeSlotValue = timeSlotHour + (timeSlotMinute / 60);
      const startValue = startHour + (startMinute / 60);
      const endValue = endHour + (endMinute / 60);
      
      return cls.day === day && timeSlotValue >= startValue && timeSlotValue < endValue;
    });
  };

  // Calculate the duration of a class in 30-minute slots
  const getClassDuration = (cls: ClassSchedule) => {
    const startHour = parseInt(cls.startTime.split(':')[0]);
    const startMinute = parseInt(cls.startTime.split(':')[1]);
    const endHour = parseInt(cls.endTime.split(':')[0]);
    const endMinute = parseInt(cls.endTime.split(':')[1]);
    
    const startValue = startHour + (startMinute / 60);
    const endValue = endHour + (endMinute / 60);
    
    return Math.ceil((endValue - startValue) * 2);
  };

  // Check if we've already rendered this class
  const renderedClasses = new Set<string>();

  return (
    <div className="overflow-x-auto">
      <div className="min-w-[800px]">
        <div className="grid grid-cols-6 border-b">
          <div className="p-3 text-center font-medium text-muted-foreground border-r"></div>
          {days.map(day => (
            <div key={day} className="p-3 text-center font-medium">{day}</div>
          ))}
        </div>
        
        {timeSlots.map((time, i) => (
          <div key={time} className="grid grid-cols-6 border-b min-h-[60px]">
            <div className="p-2 text-center text-xs text-muted-foreground border-r flex items-center justify-center">
              {time}
            </div>
            
            {days.map(day => {
              const classesInSlot = getClassForTimeSlot(day, time);
              
              return (
                <div key={`${day}-${time}`} className="relative border-r">
                  {classesInSlot.map(cls => {
                    // Only render each class once at its start time
                    const classKey = `${cls.id}-${day}-${time}`;
                    if (cls.startTime === time.padStart(5, '0') && !renderedClasses.has(classKey)) {
                      renderedClasses.add(classKey);
                      const duration = getClassDuration(cls);
                      
                      return (
                        <div 
                          key={classKey}
                          className={cn(
                            `absolute left-0 right-0 m-1 p-2 rounded-md text-white text-xs overflow-hidden cursor-pointer`,
                            cls.color
                          )}
                          style={{ height: `${Math.max(duration * 60 - 8, 52)}px` }}
                        >
                          <div className="font-medium truncate">{cls.name}</div>
                          <div className="truncate">{cls.location}</div>
                          <div className="mt-1 truncate text-white/80">{cls.startTime} - {cls.endTime}</div>
                        </div>
                      );
                    }
                    return null;
                  })}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeeklyTimetable;

