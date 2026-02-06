
'use client';

import { useUser, useAuth } from '@/firebase';
import { useRouter } from 'next/navigation';
import {
  Book,
  CheckCircle,
  FileText,
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

const navLinks = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/dashboard', label: 'Dashboard', icon: Gauge },
  { href: '/dashboard/profile', label: 'Profile', icon: UserIcon },
  { href: '/dashboard/typing', label: 'Typing Practice', icon: SiteLogo },
  { href: '/dashboard/steno', label: 'Steno Practice', icon: Book },
  {
    href: '/dashboard/materials',
    label: 'Study Material',
    icon: FileText,
  },
  {
    href: '/dashboard/tests',
    label: 'Tests & Results',
    icon: CheckCircle,
  },
];

export function Sidebar() {
  const { user } = useUser();
  const auth = useAuth();
  const router = useRouter();

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
      <Card className="text-center">
        <CardHeader>
          <Avatar className="mx-auto h-20 w-20 border-4 border-primary/20">
            <AvatarImage src={user?.photoURL ?? undefined} />
            <AvatarFallback className="text-3xl">
              {getAvatarFallback(user?.email)}
            </AvatarFallback>
          </Avatar>
        </CardHeader>
        <CardContent>
          <CardTitle className="text-base">
            {user?.displayName ?? 'Student Name'}
          </CardTitle>
          <CardDescription className="text-xs">
            {user?.email ?? 'student@example.com'}
          </CardDescription>
        </CardContent>
      </Card>
      <nav className="flex flex-col gap-2">
        {navLinks.map((link) => (
          <Button
            key={link.href}
            asChild
            variant="ghost"
            className="justify-start gap-2"
          >
            <Link href={link.href}>
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <link.icon className="h-4 w-4" />
              </div>
              <span className="text-xs font-semibold">{link.label}</span>
            </Link>
          </Button>
        ))}
      </nav>
      <div className="mt-auto flex flex-col gap-2">
        <Button asChild variant="ghost" className="justify-start gap-2">
          <Link href="/dashboard/settings">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted/50 text-muted-foreground">
              <Settings className="h-4 w-4" />
            </div>
            <span className="text-xs font-semibold">Settings</span>
          </Link>
        </Button>
        <Button
          onClick={handleSignOut}
          variant="ghost"
          className="justify-start gap-2 text-red-500 hover:bg-red-500/10 hover:text-red-600"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-500/10">
            <LogOut className="h-4 w-4" />
          </div>
          <span className="text-xs font-semibold">Sign Out</span>
        </Button>
      </div>
    </div>
  );
}
