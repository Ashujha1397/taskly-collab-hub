
import React, { useState } from 'react';
import { Layout } from '@/components/Layout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Search, Plus, MoreHorizontal, Clock, Briefcase, Calendar, ArrowRight } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { toast } from 'sonner';

interface ProjectMember {
  id: string;
  name: string;
  avatar?: string;
  role: string;
}

interface Project {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'completed' | 'on-hold';
  progress: number;
  startDate: string;
  endDate: string;
  members: ProjectMember[];
  tags: string[];
}

// Sample projects data
const initialProjects: Project[] = [
  {
    id: '1',
    name: 'Website Redesign',
    description: 'Completely revamp the company website with a modern design',
    status: 'active',
    progress: 68,
    startDate: '2023-06-15',
    endDate: '2023-08-30',
    members: [
      { id: '1', name: 'Jane Doe', avatar: 'https://i.pravatar.cc/150?img=36', role: 'Project Manager' },
      { id: '2', name: 'John Smith', avatar: 'https://i.pravatar.cc/150?img=68', role: 'UI Designer' },
      { id: '3', name: 'Emma Wilson', avatar: 'https://i.pravatar.cc/150?img=47', role: 'Full Stack Developer' }
    ],
    tags: ['Design', 'Frontend', 'UI/UX']
  },
  {
    id: '2',
    name: 'Mobile App Development',
    description: 'Build a cross-platform mobile app for customer engagement',
    status: 'active',
    progress: 42,
    startDate: '2023-07-01',
    endDate: '2023-09-30',
    members: [
      { id: '4', name: 'Michael Brown', avatar: 'https://i.pravatar.cc/150?img=12', role: 'Tech Lead' },
      { id: '3', name: 'Emma Wilson', avatar: 'https://i.pravatar.cc/150?img=47', role: 'Frontend Developer' },
      { id: '2', name: 'John Smith', avatar: 'https://i.pravatar.cc/150?img=68', role: 'UI Designer' }
    ],
    tags: ['Mobile', 'React Native', 'API']
  },
  {
    id: '3',
    name: 'Marketing Campaign',
    description: 'Launch a new marketing campaign for Q3 product release',
    status: 'on-hold',
    progress: 25,
    startDate: '2023-07-15',
    endDate: '2023-08-15',
    members: [
      { id: '1', name: 'Jane Doe', avatar: 'https://i.pravatar.cc/150?img=36', role: 'Marketing Lead' },
      { id: '5', name: 'Sarah Johnson', avatar: 'https://i.pravatar.cc/150?img=5', role: 'Content Writer' }
    ],
    tags: ['Marketing', 'Social Media', 'Content']
  },
  {
    id: '4',
    name: 'Data Analytics Platform',
    description: 'Develop an internal data analytics platform to track KPIs',
    status: 'completed',
    progress: 100,
    startDate: '2023-05-01',
    endDate: '2023-07-15',
    members: [
      { id: '4', name: 'Michael Brown', avatar: 'https://i.pravatar.cc/150?img=12', role: 'Data Scientist' },
      { id: '3', name: 'Emma Wilson', avatar: 'https://i.pravatar.cc/150?img=47', role: 'Backend Developer' }
    ],
    tags: ['Data', 'Analytics', 'Dashboard']
  }
];

const Projects = () => {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeTab, setActiveTab] = useState<string>('all');
  const [isNewProjectModalOpen, setIsNewProjectModalOpen] = useState<boolean>(false);
  const [newProject, setNewProject] = useState({
    name: '',
    description: '',
    startDate: '',
    endDate: '',
  });

  const handleCreateProject = () => {
    if (!newProject.name || !newProject.description || !newProject.startDate || !newProject.endDate) {
      toast.error("Please fill in all required fields");
      return;
    }

    const project: Project = {
      id: (projects.length + 1).toString(),
      name: newProject.name,
      description: newProject.description,
      status: 'active',
      progress: 0,
      startDate: newProject.startDate,
      endDate: newProject.endDate,
      members: [],
      tags: []
    };

    setProjects([...projects, project]);
    setNewProject({
      name: '',
      description: '',
      startDate: '',
      endDate: '',
    });
    setIsNewProjectModalOpen(false);
    toast.success("Project created successfully");
  };

  // Filter projects based on active tab and search query
  const filteredProjects = projects.filter((project) => {
    const matchesTab = activeTab === 'all' || project.status === activeTab;
    const matchesSearch = 
      project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesTab && matchesSearch;
  });

  // Format date to readable format
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  // Get status badge color
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300';
      case 'completed':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
      case 'on-hold':
        return 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300';
    }
  };

  return (
    <Layout>
      <div className="animate-fade-in space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
            <p className="text-muted-foreground mt-1">
              Manage and track all your ongoing projects
            </p>
          </div>
          <Button onClick={() => setIsNewProjectModalOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            New Project
          </Button>
        </div>

        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <div className="relative w-full sm:w-auto sm:min-w-[300px]">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search projects..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-4 bg-muted/50">
            <TabsTrigger value="all">All Projects</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="on-hold">On Hold</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
              {filteredProjects.length === 0 && (
                <div className="col-span-full text-center py-16 px-4 border border-dashed rounded-md bg-muted/50 text-muted-foreground">
                  No projects to display
                </div>
              )}
            </div>
          </TabsContent>

          {/* Status-specific tabs */}
          {['active', 'on-hold', 'completed'].map((status) => (
            <TabsContent key={status} value={status} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredProjects
                  .filter((project) => project.status === status)
                  .map((project) => (
                    <ProjectCard key={project.id} project={project} />
                  ))}
                {filteredProjects.filter((project) => project.status === status).length === 0 && (
                  <div className="col-span-full text-center py-16 px-4 border border-dashed rounded-md bg-muted/50 text-muted-foreground">
                    No projects to display
                  </div>
                )}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>

      {/* New Project Modal */}
      <Dialog open={isNewProjectModalOpen} onOpenChange={setIsNewProjectModalOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Create New Project</DialogTitle>
            <DialogDescription>
              Fill in the details to create a new project
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Project Name</Label>
              <Input
                id="name"
                value={newProject.name}
                onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
                placeholder="Enter project name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={newProject.description}
                onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                placeholder="Enter project description"
                className="min-h-[100px]"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="startDate">Start Date</Label>
                <Input
                  id="startDate"
                  type="date"
                  value={newProject.startDate}
                  onChange={(e) => setNewProject({ ...newProject, startDate: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="endDate">End Date</Label>
                <Input
                  id="endDate"
                  type="date"
                  value={newProject.endDate}
                  onChange={(e) => setNewProject({ ...newProject, endDate: e.target.value })}
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsNewProjectModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreateProject}>
              Create Project
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

// Project Card Component
const ProjectCard: React.FC<{ project: Project }> = ({ project }) => {
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300';
      case 'completed':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
      case 'on-hold':
        return 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300';
    }
  };

  const progressColor = project.progress >= 80 
    ? 'bg-emerald-500' 
    : project.progress >= 50 
      ? 'bg-blue-500' 
      : 'bg-amber-500';

  return (
    <Card className="hover:shadow-md transition-all duration-300 group overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <Badge variant="outline" className={getStatusColor(project.status)}>
            {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
          </Badge>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
        <CardTitle className="group-hover:text-primary transition-colors mt-2">
          {project.name}
        </CardTitle>
        <CardDescription className="line-clamp-2">
          {project.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-2 space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Progress</span>
            <span className="font-medium">{project.progress}%</span>
          </div>
          <Progress value={project.progress} className={progressColor} />
        </div>
        
        <div className="flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-1.5 text-muted-foreground" />
            <span className="text-muted-foreground">{formatDate(project.startDate)}</span>
          </div>
          <div className="flex items-center">
            <ArrowRight className="h-4 w-4 mr-1.5 text-muted-foreground" />
            <span className="text-muted-foreground">{formatDate(project.endDate)}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-2 border-t">
        <div className="flex items-center justify-between w-full">
          <div className="flex -space-x-2">
            {project.members.slice(0, 3).map((member) => (
              <Avatar key={member.id} className="border-2 border-background h-8 w-8">
                <AvatarImage src={member.avatar} alt={member.name} />
                <AvatarFallback className="text-xs">
                  {member.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
            ))}
            {project.members.length > 3 && (
              <div className="flex items-center justify-center h-8 w-8 rounded-full bg-muted text-xs font-medium">
                +{project.members.length - 3}
              </div>
            )}
          </div>
          <Button variant="ghost" size="sm" className="h-8">
            View Details
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default Projects;
