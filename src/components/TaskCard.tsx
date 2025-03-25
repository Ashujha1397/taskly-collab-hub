
import React from 'react';
import { CheckCircle2, Clock, Calendar, User, Tag } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { TaskStatusLabel, TaskStatus } from './TaskStatusLabel';

export type TaskPriority = 'low' | 'medium' | 'high';

export interface TaskCardProps {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate?: string;
  assignee?: {
    id: string;
    name: string;
    avatar?: string;
  };
  tags?: string[];
  onClick?: () => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({
  title,
  description,
  status,
  priority,
  dueDate,
  assignee,
  tags = [],
  onClick,
}) => {
  const priorityClasses = {
    low: 'priority-low',
    medium: 'priority-medium',
    high: 'priority-high',
  };

  // Format the due date if provided
  const formattedDueDate = dueDate ? new Date(dueDate).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  }) : null;

  // Calculate if task is overdue
  const isOverdue = dueDate ? new Date(dueDate) < new Date() && status !== 'completed' : false;

  return (
    <Card
      className="group cursor-pointer transition-all duration-300 hover:shadow-md hover:border-primary/20 hover:translate-y-[-2px]"
      onClick={onClick}
    >
      <CardContent className="p-5">
        <div className="space-y-3">
          <div className="flex justify-between items-start">
            <TaskStatusLabel status={status} />
            <Badge className={`${priorityClasses[priority]} border-none text-xs font-medium`}>
              {priority.charAt(0).toUpperCase() + priority.slice(1)}
            </Badge>
          </div>

          <div>
            <h3 className="font-medium text-base line-clamp-2 group-hover:text-primary transition-colors">
              {title}
            </h3>
            {description && (
              <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{description}</p>
            )}
          </div>

          <div className="pt-2 flex flex-wrap items-center gap-2">
            {formattedDueDate && (
              <div className={`flex items-center text-xs ${isOverdue ? 'text-destructive' : 'text-muted-foreground'}`}>
                <Calendar className="h-3.5 w-3.5 mr-1" />
                {formattedDueDate}
              </div>
            )}

            {assignee && (
              <div className="flex items-center text-xs text-muted-foreground">
                <Avatar className="h-5 w-5 mr-1">
                  <AvatarImage src={assignee.avatar} alt={assignee.name} />
                  <AvatarFallback className="text-[10px]">
                    {assignee.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <span className="truncate max-w-[100px]">{assignee.name}</span>
              </div>
            )}

            {tags.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-1">
                {tags.slice(0, 2).map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs px-1.5 py-0 h-5">
                    {tag}
                  </Badge>
                ))}
                {tags.length > 2 && (
                  <Badge variant="secondary" className="text-xs px-1.5 py-0 h-5">
                    +{tags.length - 2}
                  </Badge>
                )}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
