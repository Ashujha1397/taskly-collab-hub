
import React, { useState } from 'react';
import { Layout } from '@/components/Layout';
import { TaskCard, TaskPriority } from '@/components/TaskCard';
import { NewTaskButton } from '@/components/NewTaskButton';
import { TaskModal, TaskFormData } from '@/components/TaskModal';
import { TaskStatus } from '@/components/TaskStatusLabel';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Search, Filter, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'sonner';

interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate?: string;
  assigneeId?: string;
  tags: string[];
}

// Sample initial tasks
const initialTasks: Task[] = [
  {
    id: '1',
    title: 'Create project wireframes',
    description: 'Design initial wireframes for the new product feature',
    status: 'in-progress',
    priority: 'high',
    dueDate: '2023-07-30',
    assigneeId: '1',
    tags: ['Design', 'UX']
  },
  {
    id: '2',
    title: 'Review API documentation',
    description: 'Review and update the API documentation for the new endpoints',
    status: 'todo',
    priority: 'medium',
    dueDate: '2023-08-05',
    assigneeId: '2',
    tags: ['Backend', 'Documentation']
  },
  {
    id: '3',
    title: 'Fix homepage responsive issues',
    description: 'Address responsive design issues on the homepage for mobile devices',
    status: 'completed',
    priority: 'low',
    dueDate: '2023-07-25',
    assigneeId: '3',
    tags: ['Frontend', 'Responsive']
  },
  {
    id: '4',
    title: 'Implement authentication system',
    description: 'Implement user authentication using OAuth 2.0',
    status: 'review',
    priority: 'high',
    dueDate: '2023-08-02',
    assigneeId: '4',
    tags: ['Security', 'Backend']
  },
  {
    id: '5',
    title: 'Update user onboarding flow',
    description: 'Redesign user onboarding to improve conversion rates',
    status: 'todo',
    priority: 'medium',
    dueDate: '2023-08-10',
    assigneeId: '1',
    tags: ['UX', 'Onboarding']
  },
  {
    id: '6',
    title: 'Optimize database queries',
    description: 'Improve performance of slow database queries',
    status: 'todo',
    priority: 'medium',
    dueDate: '2023-08-15',
    assigneeId: '2',
    tags: ['Database', 'Performance']
  }
];

// Sample team members data
const teamMembers = [
  { id: '1', name: 'Jane Doe', avatar: 'https://i.pravatar.cc/150?img=36' },
  { id: '2', name: 'John Smith', avatar: 'https://i.pravatar.cc/150?img=68' },
  { id: '3', name: 'Emma Wilson', avatar: 'https://i.pravatar.cc/150?img=47' },
  { id: '4', name: 'Michael Brown', avatar: 'https://i.pravatar.cc/150?img=12' },
];

const Dashboard = () => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [activeTab, setActiveTab] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [currentTask, setCurrentTask] = useState<TaskFormData | undefined>(undefined);
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');

  const handleCreateTask = () => {
    setCurrentTask(undefined);
    setModalMode('create');
    setIsModalOpen(true);
  };

  const handleEditTask = (task: Task) => {
    setCurrentTask(task);
    setModalMode('edit');
    setIsModalOpen(true);
  };

  const handleSaveTask = (taskData: TaskFormData) => {
    if (modalMode === 'create') {
      const newTask: Task = {
        ...taskData,
        id: uuidv4(),
      };
      setTasks([...tasks, newTask]);
      toast.success("Task created successfully");
    } else {
      const updatedTasks = tasks.map((task) =>
        task.id === taskData.id ? { ...taskData } : task
      );
      setTasks(updatedTasks);
      toast.success("Task updated successfully");
    }
    setIsModalOpen(false);
  };

  // Filter tasks based on active tab and search query
  const filteredTasks = tasks.filter((task) => {
    const matchesTab = activeTab === 'all' || task.status === activeTab;
    const matchesSearch = 
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesTab && matchesSearch;
  });

  // Group tasks by status
  const tasksByStatus = {
    todo: filteredTasks.filter(task => task.status === 'todo'),
    'in-progress': filteredTasks.filter(task => task.status === 'in-progress'),
    review: filteredTasks.filter(task => task.status === 'review'),
    completed: filteredTasks.filter(task => task.status === 'completed'),
  };

  // Get assigned user details
  const getAssignee = (assigneeId?: string) => {
    if (!assigneeId) return undefined;
    const assignee = teamMembers.find(member => member.id === assigneeId);
    return assignee 
      ? { id: assignee.id, name: assignee.name, avatar: assignee.avatar }
      : undefined;
  };

  return (
    <Layout>
      <div className="animate-fade-in space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground mt-1">
              Manage and track your tasks and projects
            </p>
          </div>
          <NewTaskButton onClick={handleCreateTask} />
        </div>

        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <div className="relative w-full sm:w-auto sm:min-w-[300px]">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search tasks..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" className="h-10">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Button variant="outline" size="sm" className="h-10">
              <Plus className="h-4 w-4 mr-2" />
              New Project
            </Button>
          </div>
        </div>

        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-4 bg-muted/50">
            <TabsTrigger value="all">All Tasks</TabsTrigger>
            <TabsTrigger value="todo">To Do</TabsTrigger>
            <TabsTrigger value="in-progress">In Progress</TabsTrigger>
            <TabsTrigger value="review">Review</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="space-y-4">
                <h2 className="text-lg font-medium flex items-center">
                  To Do
                  <span className="ml-2 bg-muted text-muted-foreground text-xs rounded-full px-2">
                    {tasksByStatus.todo.length}
                  </span>
                </h2>
                {tasksByStatus.todo.map((task) => (
                  <TaskCard
                    key={task.id}
                    id={task.id}
                    title={task.title}
                    description={task.description}
                    status={task.status}
                    priority={task.priority}
                    dueDate={task.dueDate}
                    assignee={getAssignee(task.assigneeId)}
                    tags={task.tags}
                    onClick={() => handleEditTask(task)}
                  />
                ))}
                {tasksByStatus.todo.length === 0 && (
                  <div className="text-center py-8 px-4 border border-dashed rounded-md bg-muted/50 text-muted-foreground">
                    No tasks to display
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <h2 className="text-lg font-medium flex items-center">
                  In Progress
                  <span className="ml-2 bg-muted text-muted-foreground text-xs rounded-full px-2">
                    {tasksByStatus['in-progress'].length}
                  </span>
                </h2>
                {tasksByStatus['in-progress'].map((task) => (
                  <TaskCard
                    key={task.id}
                    id={task.id}
                    title={task.title}
                    description={task.description}
                    status={task.status}
                    priority={task.priority}
                    dueDate={task.dueDate}
                    assignee={getAssignee(task.assigneeId)}
                    tags={task.tags}
                    onClick={() => handleEditTask(task)}
                  />
                ))}
                {tasksByStatus['in-progress'].length === 0 && (
                  <div className="text-center py-8 px-4 border border-dashed rounded-md bg-muted/50 text-muted-foreground">
                    No tasks to display
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <h2 className="text-lg font-medium flex items-center">
                  Review
                  <span className="ml-2 bg-muted text-muted-foreground text-xs rounded-full px-2">
                    {tasksByStatus.review.length}
                  </span>
                </h2>
                {tasksByStatus.review.map((task) => (
                  <TaskCard
                    key={task.id}
                    id={task.id}
                    title={task.title}
                    description={task.description}
                    status={task.status}
                    priority={task.priority}
                    dueDate={task.dueDate}
                    assignee={getAssignee(task.assigneeId)}
                    tags={task.tags}
                    onClick={() => handleEditTask(task)}
                  />
                ))}
                {tasksByStatus.review.length === 0 && (
                  <div className="text-center py-8 px-4 border border-dashed rounded-md bg-muted/50 text-muted-foreground">
                    No tasks to display
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <h2 className="text-lg font-medium flex items-center">
                  Completed
                  <span className="ml-2 bg-muted text-muted-foreground text-xs rounded-full px-2">
                    {tasksByStatus.completed.length}
                  </span>
                </h2>
                {tasksByStatus.completed.map((task) => (
                  <TaskCard
                    key={task.id}
                    id={task.id}
                    title={task.title}
                    description={task.description}
                    status={task.status}
                    priority={task.priority}
                    dueDate={task.dueDate}
                    assignee={getAssignee(task.assigneeId)}
                    tags={task.tags}
                    onClick={() => handleEditTask(task)}
                  />
                ))}
                {tasksByStatus.completed.length === 0 && (
                  <div className="text-center py-8 px-4 border border-dashed rounded-md bg-muted/50 text-muted-foreground">
                    No tasks to display
                  </div>
                )}
              </div>
            </div>
          </TabsContent>

          {/* Status-specific tabs */}
          {['todo', 'in-progress', 'review', 'completed'].map((status) => (
            <TabsContent key={status} value={status} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {tasksByStatus[status as keyof typeof tasksByStatus].map((task) => (
                  <TaskCard
                    key={task.id}
                    id={task.id}
                    title={task.title}
                    description={task.description}
                    status={task.status}
                    priority={task.priority}
                    dueDate={task.dueDate}
                    assignee={getAssignee(task.assigneeId)}
                    tags={task.tags}
                    onClick={() => handleEditTask(task)}
                  />
                ))}
                {tasksByStatus[status as keyof typeof tasksByStatus].length === 0 && (
                  <div className="col-span-full text-center py-8 px-4 border border-dashed rounded-md bg-muted/50 text-muted-foreground">
                    No tasks to display
                  </div>
                )}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>

      <TaskModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveTask}
        initialData={currentTask}
        mode={modalMode}
      />

      <NewTaskButton onClick={handleCreateTask} variant="fab" />
    </Layout>
  );
};

export default Dashboard;
