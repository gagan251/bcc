'use client';

import { useUser, useAuth } from '@/firebase';
import { useRouter, usePathname } from 'next/navigation';
import {
  Book,
  CheckCircle,
  Library,
  Gauge,
  Home,
  LogOut,
  Settings,
  User as UserIcon,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { signOut } from 'firebase/auth';
import { SiteLogo } from '../site-logo';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '/dashboard', label: 'Dashboard', icon: Gauge },
  { href: '/dashboard/profile', label: 'Profile', icon: UserIcon },
  { href: '/dashboard/typing', label: 'Typing Practice', icon: SiteLogo },
  { href: '/dashboard/steno', label: 'Steno Practice', icon: Book },
  {
    href: '/dashboard/materials',
    label: 'Study Material',
    icon: Library,
  },
  {
    href: '/dashboard/tests',
    label: 'Tests & Results',
    icon: CheckCircle,
  },
  { href: '/', label: 'Back to Home', icon: Home },
];

export function Sidebar() {
  const { user } = useUser();
  const auth = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      router.push('/');
    } catch (error) {
      console.error('Error signing out: ', error);
    }
  };

  const getAvatarFallback = (email: string | null | undefined) => {
    if (!email) return 'U';
    return email.charAt(0).toUpperCase();
  };

  return (
    <div className="flex h-full flex-col gap-4">
      <Card className="border-0 bg-transparent shadow-none text-center">
        <CardHeader className="p-0 items-center">
          <Avatar className="mx-auto h-24 w-24 border-4 border-primary/20">
            <AvatarImage src={user?.photoURL ?? undefined} />
            <AvatarFallback className="text-4xl">
              {getAvatarFallback(user?.email)}
            </AvatarFallback>
          </Avatar>
        </CardHeader>
        <CardContent className="p-0 pt-4">
          <CardTitle className="text-base font-semibold">
            {user?.displayName ?? 'Student Name'}
          </CardTitle>
          <CardDescription className="text-xs">
            {user?.email ?? 'student@example.com'}
          </CardDescription>
        </CardContent>
      </Card>
      <nav className="flex flex-1 flex-col gap-1 px-2">
        {navLinks.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Button
              key={link.href}
              asChild
              variant="ghost"
              className={cn(
                "relative justify-start gap-3 px-3 py-6 text-sm h-auto transition-all duration-200",
                isActive 
                  ? "bg-primary/10 text-primary font-bold shadow-[inset_2px_0_0_hsl(var(--primary))]"
                  : "text-muted-foreground hover:bg-primary/5 hover:text-primary hover:translate-x-1"
              )}
            >
              <Link href={link.href}>
                <link.icon className="h-5 w-5 flex-shrink-0" />
                <span>{link.label}</span>
              </Link>
            </Button>
          )
        })}
      </nav>
      <div className="mt-auto flex flex-col gap-1 p-2">
        <Button asChild variant="ghost" className={cn("justify-start gap-3 px-3 text-sm h-auto transition-all duration-200 text-muted-foreground hover:bg-primary/5 hover:text-primary hover:translate-x-1", pathname === '/dashboard/settings' && "bg-primary/10 text-primary font-bold")}>
          <Link href="/dashboard/settings">
            <Settings className="h-5 w-5 flex-shrink-0" />
            <span className="font-medium">Settings</span>
          </Link>
        </Button>
        <Button
          onClick={handleSignOut}
          variant="ghost"
          className="justify-start gap-3 px-3 text-sm h-auto text-red-500 hover:bg-red-500/10 hover:text-red-500 hover:translate-x-1 transition-all duration-200"
        >
          <LogOut className="h-5 w-5 flex-shrink-0" />
          <span className="font-medium">Sign Out</span>
        </Button>
      </div>
    </div>
  );
}
