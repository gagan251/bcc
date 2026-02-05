
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Bell, Menu, LogOut, LayoutDashboard } from 'lucide-react';
import { useUser } from '@/firebase';
import { signOut, getAuth } from 'firebase/auth';
import { useRouter, usePathname } from 'next/navigation';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { SiteLogo } from '../site-logo';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '#home', label: 'Home' },
  { href: '#courses', label: 'Courses' },
  { href: '#why-us', label: 'Why Choose Us' },
  { href: '#testimonials', label: 'Testimonials' },
  { href: '#contact', label: 'Contact' },
];

export function Header() {
  const { user, isUserLoading } = useUser();
  const router = useRouter();
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);

  const isHomePage = pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    // Run on mount to set initial state
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);


  const handleSignOut = async () => {
    try {
      await signOut(getAuth());
      router.push('/');
    } catch (error) {
      console.error('Error signing out: ', error);
    }
  };
  
  const getAvatarFallback = (email: string | null | undefined) => {
    if (!email) return 'U';
    return email.charAt(0).toUpperCase();
  };

  const useTransparentHeader = isHomePage && !isScrolled;

  const NavLinks = ({...props}) => (
    <>
      {navLinks.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={cn(
            "text-sm font-medium transition-colors px-3 py-2 rounded-md",
            useTransparentHeader ? "text-white/80 hover:text-white" : "text-muted-foreground hover:text-foreground"
          )}
          {...props}
        >
          {link.label}
        </Link>
      ))}
    </>
  );

  return (
    <header
      className={cn(
        `sticky top-0 z-50 w-full transition-colors duration-200`,
        useTransparentHeader ? "bg-transparent" : "bg-background/80 backdrop-blur-sm border-b"
      )}
    >
      <div className="container mx-auto flex h-16 max-w-screen-xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <SiteLogo className="h-6 w-6" />
          <span className={cn("font-bold", useTransparentHeader ? "text-white" : "text-foreground")}>Bharat Communication Center</span>
        </Link>
        <nav className="hidden items-center gap-1 md:flex">
          {isHomePage ? <NavLinks /> : null}
        </nav>
        <div className="flex items-center gap-2">
          {isUserLoading ? (
             <div className="h-9 w-[120px] animate-pulse rounded-md bg-muted/20 hidden md:flex"></div>
          ) : user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src={user.photoURL || ''} alt={user.displayName || 'user'} />
                    <AvatarFallback>{getAvatarFallback(user.email)}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 dark:bg-card/70 dark:backdrop-blur-md dark:border-white/10" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{user.displayName}</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/dashboard"><LayoutDashboard className="mr-2"/>Dashboard</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut}>
                  <LogOut className="mr-2"/>
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="hidden items-center gap-2 md:flex">
                <Button 
                    variant="outline" 
                    size="sm" 
                    asChild 
                    className={cn(
                        useTransparentHeader 
                        ? 'text-white border-white/20 hover:bg-white/10 hover:text-white' 
                        : ''
                    )}
                >
                    <Link href="/login">Login</Link>
                </Button>
                <Button 
                    size="sm" 
                    asChild 
                    className={cn(
                        useTransparentHeader 
                        ? 'bg-white/10 text-white hover:bg-white/20 border border-white/20' 
                        : ''
                    )}
                >
                    <Link href="/signup">Sign Up</Link>
                </Button>
            </div>
          )}
          
          <Button variant="ghost" size="icon" className={cn("h-9 w-9", useTransparentHeader ? 'text-white hover:bg-white/10 hover:text-white' : '')}>
            <Bell className="h-4 w-4" />
            <span className="sr-only">Notifications</span>
          </Button>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className={cn("md:hidden h-9 w-9", useTransparentHeader ? 'bg-transparent border-white/20 text-white hover:bg-white/10 hover:text-white' : '')}>
                <Menu className="h-4 w-4" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full bg-card">
              <div className="flex h-full flex-col p-6">
                <Link href="/" className="mb-8 flex items-center gap-2">
                  <SiteLogo className="h-6 w-6" />
                  <span className="font-bold">Bharat Communication Center</span>
                </Link>
                <nav className="flex flex-col gap-6">
                  {isHomePage ? <NavLinks onClick={() => (document.querySelector('[data-radix-dialog-close]') as HTMLElement)?.click()} /> : null}
                </nav>
                <div className="mt-auto space-y-2">
                  {user ? (
                    <>
                      <Button asChild className="w-full">
                        <Link href="/dashboard">Dashboard</Link>
                      </Button>
                      <Button variant="outline" onClick={handleSignOut} className="w-full">
                        Sign Out
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button asChild className='w-full'>
                        <Link href="/signup">Sign Up</Link>
                      </Button>
                      <Button variant="outline" asChild className='w-full'>
                        <Link href="/login">Login</Link>
                      </Button>
                    </>
                  )}
                   <div className="relative py-2">
                      <div className="absolute inset-0 flex items-center">
                          <span className="w-full border-t"></span>
                      </div>
                      <div className="relative flex justify-center text-xs uppercase">
                          <span className="bg-card px-2 text-muted-foreground">Or</span>
                      </div>
                  </div>
                   <Button variant="ghost" asChild className='w-full'>
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
