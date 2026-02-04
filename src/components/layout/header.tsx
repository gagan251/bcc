'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Bell, Menu, Type } from 'lucide-react';
import { useEffect, useState } from 'react';

const navLinks = [
  { href: '#home', label: 'Home' },
  { href: '#courses', label: 'Courses' },
  { href: '#why-us', label: 'Why Choose Us' },
  { href: '#testimonials', label: 'Testimonials' },
  { href: '#contact', label: 'Contact' },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const NavLinks = () => (
    <>
      {navLinks.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className="text-sm font-medium text-foreground/80 transition-colors hover:text-primary"
        >
          {link.label}
        </Link>
      ))}
    </>
  );

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled ? 'bg-background/80 shadow-md backdrop-blur-sm' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto flex h-16 max-w-screen-xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <Type className="h-6 w-6 text-primary" />
          <span className="font-bold">Bharat Communication Center</span>
        </Link>
        <nav className="hidden items-center gap-6 md:flex">
          <NavLinks />
        </nav>
        <div className="flex items-center gap-4">
          <Button asChild className="hidden md:flex">
            <Link href="/admin/login">Admin Login</Link>
          </Button>
          <Button variant="ghost" size="icon" className="hidden md:flex">
            <Bell className="h-4 w-4" />
            <span className="sr-only">Notifications</span>
          </Button>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <Menu className="h-4 w-4" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="flex h-full flex-col p-6">
                <Link href="/" className="mb-8 flex items-center gap-2">
                  <Type className="h-6 w-6 text-primary" />
                  <span className="font-bold">Bharat Communication Center</span>
                </Link>
                <nav className="flex flex-col gap-6">
                  <NavLinks />
                </nav>
                <div className="mt-auto space-y-4">
                    <Button variant="ghost" className="w-full justify-start">
                        <Bell className="mr-2 h-4 w-4" />
                        Notifications
                    </Button>
                    <Button asChild className='w-full'>
                      <Link href="/admin/login">Admin Login</Link>
                    </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
