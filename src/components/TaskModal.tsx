
import React, { useState, useEffect } from 'react';
import { X, Calendar, Clock, User, Tag, AlertCircle } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { TaskStatus } from './TaskStatusLabel';
import { TaskPriority } from './TaskCard';
import { Badge } from '@/components/ui/badge';

interface TaskModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (task: TaskFormData) => void;
  initialData?: TaskFormData;
  mode: 'create' | 'edit';
}

export interface TaskFormData {
  id?: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate?: string;
  assigneeId?: string;
  tags: string[];
}

// Sample team members data (in a real app this would come from the backend)
const teamMembers = [
  { id: '1', name: 'Jane Doe', avatar: 'https://i.pravatar.cc/150?img=36' },
  { id: '2', name: 'John Smith', avatar: 'https://i.pravatar.cc/150?img=68' },
  { id: '3', name: 'Emma Wilson', avatar: 'https://i.pravatar.cc/150?img=47' },
  { id: '4', name: 'Michael Brown', avatar: 'https://i.pravatar.cc/150?img=12' },
];

export const TaskModal: React.FC<TaskModalProps> = ({
  open,
  onClose,
  onSave,
  initialData,
  mode
}) => {
  const [formData, setFormData] = useState<TaskFormData>({
    title: '',
    description: '',
    status: 'todo',
    priority: 'medium',
    tags: [],
  });
  
  const [newTag, setNewTag] = useState('');

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRadioChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAssigneeChange = (assigneeId: string) => {
    setFormData((prev) => ({ ...prev, assigneeId }));
  };

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && newTag.trim()) {
      e.preventDefault();
      if (!formData.tags.includes(newTag.trim())) {
        setFormData((prev) => ({
          ...prev,
          tags: [...prev.tags, newTag.trim()],
        }));
      }
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <Dialog open={open} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{mode === 'create' ? 'Create New Task' : 'Edit Task'}</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6 pt-4">
          <div className="space-y-4">
            <div>
              <Label htmlFor="title">Task Title</Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter task title"
                className="mt-1"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Enter task description"
                className="mt-1 min-h-[100px]"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Status</Label>
                <RadioGroup
                  value={formData.status}
                  onValueChange={(value) => handleRadioChange('status', value)}
                  className="flex flex-col space-y-1.5 mt-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="todo" id="status-todo" />
                    <Label htmlFor="status-todo" className="cursor-pointer">To Do</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="in-progress" id="status-progress" />
                    <Label htmlFor="status-progress" className="cursor-pointer">In Progress</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="review" id="status-review" />
                    <Label htmlFor="status-review" className="cursor-pointer">Review</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="completed" id="status-completed" />
                    <Label htmlFor="status-completed" className="cursor-pointer">Completed</Label>
                  </div>
                </RadioGroup>
              </div>
              
              <div>
                <Label>Priority</Label>
                <RadioGroup
                  value={formData.priority}
                  onValueChange={(value) => handleRadioChange('priority', value)}
                  className="flex flex-col space-y-1.5 mt-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="low" id="priority-low" />
                    <Label htmlFor="priority-low" className="cursor-pointer">Low</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="medium" id="priority-medium" />
                    <Label htmlFor="priority-medium" className="cursor-pointer">Medium</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="high" id="priority-high" />
                    <Label htmlFor="priority-high" className="cursor-pointer">High</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
            
            <div>
              <Label htmlFor="dueDate">Due Date</Label>
              <div className="relative mt-1">
                <Calendar className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  id="dueDate"
                  name="dueDate"
                  type="date"
                  value={formData.dueDate || ''}
                  onChange={handleChange}
                  className="pl-10"
                />
              </div>
            </div>
            
            <div>
              <Label>Assignee</Label>
              <div className="grid grid-cols-4 gap-2 mt-2">
                {teamMembers.map((member) => (
                  <div
                    key={member.id}
                    onClick={() => handleAssigneeChange(member.id)}
                    className={`flex flex-col items-center p-2 rounded-md cursor-pointer transition-all ${
                      formData.assigneeId === member.id
                        ? 'bg-primary/10 border border-primary/30'
                        : 'hover:bg-muted'
                    }`}
                  >
                    <Avatar>
                      <AvatarImage src={member.avatar} alt={member.name} />
                      <AvatarFallback>
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-xs font-medium mt-1 text-center">{member.name}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <Label htmlFor="tags">Tags</Label>
              <div className="relative mt-1">
                <Tag className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  id="tags"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyDown={handleAddTag}
                  placeholder="Add tags (press Enter)"
                  className="pl-10"
                />
              </div>
              {formData.tags.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {formData.tags.map((tag) => (
                    <Badge 
                      key={tag} 
                      variant="secondary"
                      className="flex items-center gap-1 py-1"
                    >
                      {tag}
                      <X 
                        className="h-3 w-3 cursor-pointer hover:text-destructive" 
                        onClick={() => handleRemoveTag(tag)}
                      />
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" type="button" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              {mode === 'create' ? 'Create Task' : 'Save Changes'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
