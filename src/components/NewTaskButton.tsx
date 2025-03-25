
import React from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface NewTaskButtonProps {
  onClick: () => void;
  variant?: 'default' | 'outline' | 'ghost' | 'fab';
  label?: string;
}

export const NewTaskButton: React.FC<NewTaskButtonProps> = ({ 
  onClick, 
  variant = 'default',
  label = 'New Task' 
}) => {
  if (variant === 'fab') {
    return (
      <Button
        onClick={onClick}
        className="fixed bottom-6 right-6 rounded-full h-14 w-14 shadow-lg"
        size="icon"
      >
        <Plus className="h-6 w-6" />
        <span className="sr-only">{label}</span>
      </Button>
    );
  }

  return (
    <Button onClick={onClick} variant={variant} className="group">
      <Plus className="h-4 w-4 mr-2 transition-transform group-hover:rotate-90" />
      {label}
    </Button>
  );
};
