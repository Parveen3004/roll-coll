
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  ClipboardCheck,
  CalendarRange, 
  CreditCard,
  Menu,
  X,
  Moon,
  Sun
} from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { useTheme } from '@/hooks/use-theme';

const Navbar = () => {
  const location = useLocation();
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const links = [
    { href: '/', label: 'Dashboard', icon: <LayoutDashboard className="h-4 w-4" /> },
    { href: '/students', label: 'Students', icon: <Users className="h-4 w-4" /> },
    { href: '/classes', label: 'Classes', icon: <GraduationCap className="h-4 w-4" /> },
    { href: '/attendance', label: 'Attendance', icon: <ClipboardCheck className="h-4 w-4" /> },
    { href: '/timetable', label: 'Timetable', icon: <CalendarRange className="h-4 w-4" /> },
    { href: '/payments', label: 'Payments', icon: <CreditCard className="h-4 w-4" /> },
    { href: '/exam-enrollment', label: 'Exam Enrollment', icon: <GraduationCap className="h-4 w-4" /> },
  ];

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <Link to="/" className="mr-6 flex items-center space-x-2">
          <GraduationCap className="h-6 w-6" />
          <span className="hidden font-bold sm:inline-block">
            EduTrack
          </span>
        </Link>

        {isMobile ? (
          <>
            <Button variant="ghost" size="icon" className="ml-auto" onClick={toggleMenu}>
              {isOpen ? <X /> : <Menu />}
            </Button>

            {isOpen && (
              <div className="fixed inset-0 top-14 z-50 bg-background">
                <nav className="grid gap-2 p-4">
                  {links.map((link) => (
                    <Link
                      key={link.href}
                      to={link.href}
                      className={cn(
                        "flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors",
                        isActive(link.href)
                          ? "bg-accent text-accent-foreground"
                          : "hover:bg-accent hover:text-accent-foreground"
                      )}
                      onClick={() => setIsOpen(false)}
                    >
                      {link.icon}
                      {link.label}
                    </Link>
                  ))}
                </nav>
              </div>
            )}
          </>
        ) : (
          <nav className="flex items-center gap-2">
            {links.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={cn(
                  "flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors",
                  isActive(link.href)
                    ? "bg-accent text-accent-foreground"
                    : "hover:bg-accent hover:text-accent-foreground"
                )}
              >
                {link.icon}
                <span>{link.label}</span>
              </Link>
            ))}
          </nav>
        )}

        <div className="ml-auto flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
