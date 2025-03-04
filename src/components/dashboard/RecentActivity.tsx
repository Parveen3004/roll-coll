
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2, XCircle, Clock, User } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Activity {
  id: string;
  type: 'check-in' | 'check-out' | 'absent' | 'late';
  student: {
    name: string;
    id: string;
  };
  class: {
    name: string;
    id: string;
  };
  timestamp: string;
}

interface RecentActivityProps {
  activities: Activity[];
}

const RecentActivity: React.FC<RecentActivityProps> = ({ activities }) => {
  const getActivityIcon = (type: Activity['type']) => {
    switch (type) {
      case 'check-in':
        return <CheckCircle2 className="text-green-500" size={16} />;
      case 'check-out':
        return <User className="text-blue-500" size={16} />;
      case 'absent':
        return <XCircle className="text-destructive" size={16} />;
      case 'late':
        return <Clock className="text-amber-500" size={16} />;
    }
  };

  const getActivityText = (activity: Activity) => {
    switch (activity.type) {
      case 'check-in':
        return <span>checked in to <span className="font-medium">{activity.class.name}</span></span>;
      case 'check-out':
        return <span>checked out from <span className="font-medium">{activity.class.name}</span></span>;
      case 'absent':
        return <span>was marked absent from <span className="font-medium">{activity.class.name}</span></span>;
      case 'late':
        return <span>arrived late to <span className="font-medium">{activity.class.name}</span></span>;
    }
  };

  return (
    <Card className="col-span-2 animate-slide-up" style={{ animationDelay: '200ms' }}>
      <CardHeader>
        <CardTitle className="text-lg font-medium">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div 
              key={activity.id}
              className="flex gap-3 pb-3 group"
            >
              <div className="flex-shrink-0 mt-1">{getActivityIcon(activity.type)}</div>
              <div className="flex-1">
                <div className="flex items-center gap-1">
                  <span className="font-medium group-hover:text-primary transition-colors">
                    {activity.student.name}
                  </span>
                  <span className="text-muted-foreground">
                    {getActivityText(activity)}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {activity.timestamp}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentActivity;
