
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, User, Settings, LogOut, Check, Plus, Home, Briefcase, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Check if we're on the landing page
  const isLandingPage = location.pathname === '/';

  // Handle scroll events for the navbar
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Different navbar styles for the landing page vs app pages
  const navbarClasses = isLandingPage
    ? `fixed top-0 left-0 right-0 z-40 transition-all duration-300 ease-in-out ${
        scrolled ? 'backdrop-blur-md bg-background/80 shadow-sm' : 'bg-transparent'
      }`
    : 'fixed top-0 left-0 right-0 z-40 backdrop-blur-md bg-background/90 shadow-sm';

  const navLinks = !isLandingPage
    ? [
        { name: 'Dashboard', href: '/dashboard', icon: Home },
        { name: 'Projects', href: '/projects', icon: Briefcase },
        { name: 'Calendar', href: '/calendar', icon: Calendar },
      ]
    : [];

  // For demo purposes only, we'll always show the authenticated nav in dashboard views
  // and unauthenticated nav on the landing page
  const isAuthenticated = !isLandingPage;

  return (
    <nav className={navbarClasses}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
                TaskFlow
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  location.pathname === link.href
                    ? 'text-primary font-semibold'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <link.icon className="h-4 w-4" />
                <span>{link.name}</span>
              </Link>
            ))}

            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <Button variant="ghost" size="icon" className="rounded-full hover:bg-muted">
                  <Plus className="h-5 w-5" />
                  <span className="sr-only">Create New Task</span>
                </Button>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                      <Avatar className="h-8 w-8 transition-all hover:scale-110">
                        <AvatarImage src="https://i.pravatar.cc/150?img=36" alt="Profile" />
                        <AvatarFallback>JD</AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56 animate-scale-in">
                    <div className="flex items-center justify-start gap-2 p-2">
                      <div className="flex flex-col space-y-1 leading-none">
                        <p className="font-medium">Jane Doe</p>
                        <p className="text-sm text-muted-foreground">jane@example.com</p>
                      </div>
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link to="/profile" className="flex w-full items-center cursor-pointer">
                        <User className="mr-2 h-4 w-4" /> Profile
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/settings" className="flex w-full items-center cursor-pointer">
                        <Settings className="mr-2 h-4 w-4" /> Settings
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="flex items-center cursor-pointer text-destructive focus:text-destructive">
                      <LogOut className="mr-2 h-4 w-4" /> Log out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link to="/login">
                  <Button variant="ghost" className="text-foreground">
                    Log in
                  </Button>
                </Link>
                <Link to="/dashboard">
                  <Button variant="default" className="shadow-sm">
                    Get Started
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Navigation Toggle */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-foreground hover:bg-muted focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <div
        className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${
          isOpen ? 'max-h-96 border-b border-border' : 'max-h-0'
        }`}
        id="mobile-menu"
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-background/90 backdrop-blur-md">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className={`flex items-center px-3 py-2 rounded-md text-base font-medium ${
                location.pathname === link.href
                  ? 'bg-primary/10 text-primary'
                  : 'text-foreground hover:bg-muted'
              }`}
              onClick={() => setIsOpen(false)}
            >
              <link.icon className="mr-3 h-5 w-5" />
              {link.name}
            </Link>
          ))}

          {!isAuthenticated && (
            <div className="pt-4 pb-3 border-t border-border">
              <div className="flex items-center px-5">
                <Link to="/login" className="block w-full">
                  <Button variant="outline" className="w-full justify-center">
                    Log in
                  </Button>
                </Link>
              </div>
              <div className="mt-3 px-5">
                <Link to="/dashboard" className="block w-full">
                  <Button className="w-full justify-center">Get Started</Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};
