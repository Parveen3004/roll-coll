
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { LayoutDashboard, Users, BookOpen, Calendar, MenuIcon, XIcon, ClipboardList } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navbar: React.FC = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const routes = [
    { name: 'Dashboard', path: '/', icon: LayoutDashboard },
    { name: 'Students', path: '/students', icon: Users },
    { name: 'Classes', path: '/classes', icon: BookOpen },
    { name: 'Attendance', path: '/attendance', icon: Calendar },
    { name: 'Timetable', path: '/timetable', icon: ClipboardList },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-lg bg-white/80 border-b border-border/40">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/" className="font-semibold text-xl tracking-tight flex items-center gap-2">
            <span className="text-primary">Attendance</span>
          </Link>
        </div>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center space-x-1">
          {routes.map((route) => {
            const isActive = location.pathname === route.path;
            return (
              <Link
                key={route.path}
                to={route.path}
                className={cn(
                  "px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center gap-1.5",
                  isActive 
                    ? "bg-primary/10 text-primary" 
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                )}
              >
                <route.icon className="h-4 w-4" />
                {route.name}
              </Link>
            );
          })}
        </nav>

        {/* Mobile Menu Toggle */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? (
            <XIcon className="h-5 w-5" />
          ) : (
            <MenuIcon className="h-5 w-5" />
          )}
        </Button>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="absolute top-16 left-0 right-0 bg-white border-b border-border animate-fade-in md:hidden">
            <nav className="container py-4 flex flex-col space-y-1">
              {routes.map((route) => {
                const isActive = location.pathname === route.path;
                return (
                  <Link
                    key={route.path}
                    to={route.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={cn(
                      "px-4 py-3 rounded-md text-sm font-medium transition-colors duration-200 flex items-center gap-2",
                      isActive 
                        ? "bg-primary/10 text-primary" 
                        : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                    )}
                  >
                    <route.icon className="h-4 w-4" />
                    {route.name}
                  </Link>
                );
              })}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
