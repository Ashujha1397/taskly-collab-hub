
import React from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export const Hero: React.FC = () => {
  return (
    <div className="relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="hidden sm:block sm:absolute sm:-top-10 sm:right-1/2 sm:-z-10 sm:mr-10 sm:transform-gpu sm:blur-3xl">
        <div
          className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-primary to-accent opacity-20"
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
        />
      </div>
      <div className="hidden sm:block sm:absolute sm:-top-52 sm:left-1/2 sm:-z-10 sm:transform-gpu sm:blur-3xl">
        <div
          className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-accent to-primary opacity-20"
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
        />
      </div>

      {/* Hero content */}
      <div className="px-6 pt-24 sm:pt-32 lg:pt-40 pb-12 sm:pb-16 lg:pb-24 text-center">
        <div className="mx-auto max-w-4xl">
          <div className="mb-8 inline-flex items-center rounded-full px-4 py-1 text-sm leading-6 text-primary ring-1 ring-primary/20 backdrop-blur-sm">
            <span className="font-semibold">Introducing TaskFlow</span>
            <div className="mx-2 h-3.5 w-px bg-primary/20" aria-hidden="true" />
            <span>Simple, elegant task management</span>
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
            <span className="block">Streamline your workflow</span>
            <span className="block mt-2 bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
              with effortless precision
            </span>
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground max-w-2xl mx-auto">
            A minimalist task management platform designed for teams who value clarity, focus, and seamless collaboration.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link to="/dashboard">
              <Button size="lg" className="group">
                Get started
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link to="/login">
              <Button size="lg" variant="outline">
                Log in
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Feature highlights */}
      <div className="mx-auto max-w-7xl px-6 pb-24 sm:pb-32">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-primary">Productivity Refined</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Everything you need to manage tasks effectively
          </p>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Designed with attention to detail and a focus on the user experience, TaskFlow helps teams collaborate with clarity and purpose.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <div className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
            {features.map((feature) => (
              <div key={feature.name} className="relative pl-10">
                <div className="text-base font-semibold leading-7 text-foreground">
                  <div className="absolute left-0 top-1 flex h-7 w-7 items-center justify-center rounded-full bg-primary/10">
                    <feature.icon className="h-4 w-4 text-primary" aria-hidden="true" />
                  </div>
                  {feature.name}
                </div>
                <div className="mt-2 text-base leading-7 text-muted-foreground">{feature.description}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* App preview section */}
      <div className="bg-muted py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Beautifully intuitive interface
            </h2>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Designed for clarity and focus, with powerful features that stay out of your way until you need them.
            </p>
          </div>
          <div className="mt-16 sm:mt-20 relative">
            <div className="relative overflow-hidden rounded-xl shadow-xl">
              <div className="bg-gradient-to-br from-primary/80 to-accent/80 h-16 flex items-center px-6 text-white">
                <div className="flex space-x-2">
                  <div className="h-3 w-3 rounded-full bg-white/20"></div>
                  <div className="h-3 w-3 rounded-full bg-white/20"></div>
                  <div className="h-3 w-3 rounded-full bg-white/20"></div>
                </div>
              </div>
              <div className="bg-card w-full aspect-[16/9] relative p-4">
                <div className="absolute inset-0 flex items-center justify-center text-base text-foreground/60">
                  App preview image (TaskFlow interface preview)
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA section */}
      <div className="mx-auto max-w-7xl py-24 sm:py-32">
        <div className="relative isolate overflow-hidden bg-gradient-to-br from-primary to-accent rounded-3xl px-6 py-16 sm:px-16 md:py-20 lg:flex lg:gap-x-20 lg:px-24">
          <div className="absolute inset-0 -z-10 opacity-50 mix-blend-multiply" aria-hidden="true" />
          <div className="mx-auto max-w-md text-center lg:mx-0 lg:flex-auto lg:text-left">
            <h2 className="text-3xl font-bold tracking-tight text-white">
              Ready to transform your workflow?
            </h2>
            <p className="mt-6 text-lg leading-8 text-white/80">
              Join thousands of teams already using TaskFlow to streamline their project management.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6 lg:justify-start">
              <Link to="/dashboard">
                <Button size="lg" className="bg-white text-primary hover:bg-white/90">
                  Get started
                </Button>
              </Link>
              <Link to="/about" className="text-sm font-semibold leading-6 text-white">
                Learn more <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const features = [
  {
    name: 'Intuitive Task Management',
    description:
      "Create, assign, and track tasks with ease. Set priorities, deadlines, and detailed descriptions to keep everyone aligned.",
    icon: Check,
  },
  {
    name: 'Collaborative Workspaces',
    description:
      "Work together seamlessly with shared project spaces, real-time updates, and clear ownership of tasks and responsibilities.",
    icon: Check,
  },
  {
    name: 'Visual Progress Tracking',
    description:
      "Monitor project progress with elegant visual indicators. Instantly see what needs attention and what's on track.",
    icon: Check,
  },
  {
    name: 'Customizable Workflows',
    description:
      "Adapt TaskFlow to your team's unique processes with flexible workflows, custom labels, and personalized views.",
    icon: Check,
  },
];
