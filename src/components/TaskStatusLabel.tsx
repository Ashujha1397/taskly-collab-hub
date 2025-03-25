
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Circle, CheckCircle2, Clock, AlertCircle } from 'lucide-react';

export type TaskStatus = 'todo' | 'in-progress' | 'review' | 'completed';

interface TaskStatusLabelProps {
  status: TaskStatus;
  showText?: boolean;
  className?: string;
}

export const TaskStatusLabel: React.FC<TaskStatusLabelProps> = ({ 
  status, 
  showText = true,
  className = '' 
}) => {
  const getStatusConfig = (status: TaskStatus) => {
    switch (status) {
      case 'todo':
        return {
          icon: Circle,
          text: 'To Do',
          variant: 'outline',
          className: 'border-slate-200 text-slate-600 dark:border-slate-700 dark:text-slate-400'
        };
      case 'in-progress':
        return {
          icon: Clock,
          text: 'In Progress',
          variant: 'outline',
          className: 'border-blue-200 text-blue-700 dark:border-blue-700/30 dark:text-blue-400'
        };
      case 'review':
        return {
          icon: AlertCircle,
          text: 'Review',
          variant: 'outline',
          className: 'border-amber-200 text-amber-700 dark:border-amber-700/30 dark:text-amber-400'
        };
      case 'completed':
        return {
          icon: CheckCircle2,
          text: 'Completed',
          variant: 'outline',
          className: 'border-emerald-200 text-emerald-700 dark:border-emerald-700/30 dark:text-emerald-400'
        };
      default:
        return {
          icon: Circle,
          text: 'Unknown',
          variant: 'outline',
          className: 'border-slate-200 text-slate-600 dark:border-slate-700 dark:text-slate-400'
        };
    }
  };

  const { icon: Icon, text, className: statusClassName } = getStatusConfig(status);

  return (
    <Badge variant="outline" className={`${statusClassName} ${className}`}>
      <Icon className="h-3.5 w-3.5 mr-1" />
      {showText && text}
    </Badge>
  );
};
