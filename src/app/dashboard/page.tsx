'use client';

import { useUser, useAuth } from '@/firebase';
import { useRouter } from 'next/navigation';
import {
  Book,
  CheckCircle,
  FileText,
  Gauge,
  LogOut,
  Settings,
  Type,
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
import { MainContent } from '@/components/dashboard/main-content';
import { Stats } from '@/components/dashboard/stats';

export default function StudentDashboardPage() {
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
    <>
      <header className="rounded-lg border border-border/10 bg-gradient-to-r from-gray-900 to-gray-800 p-4 text-white shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold">
              Welcome, {user?.displayName ?? 'Student'}
            </h1>
            <p className="text-sm text-gray-300">
              Practice daily to improve speed and accuracy.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden rounded-full bg-white/10 px-3 py-1.5 text-xs font-medium md:block">
              Student ID: #{user?.uid.slice(0, 6) ?? 'N/A'}
            </div>
            <Avatar className="h-9 w-9 border-2 border-white/20">
              <AvatarImage src={user?.photoURL ?? undefined} />
              <AvatarFallback>{getAvatarFallback(user?.email)}</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>
      <Stats />
      <MainContent />
    </>
  );
}
