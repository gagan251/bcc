'use client'; // This must be a client component to use hooks

import { DashboardShell } from '@/components/dashboard/shell';
import { useUser } from '@/firebase';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import PageLoader from '@/components/ui/page-loader';


export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isUserLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isUserLoading) {
      return; // Wait for user state to be determined
    }

    if (!user) {
      router.replace('/login');
    } else if (!user.emailVerified) {
      router.replace('/verify-notice');
    }
  }, [user, isUserLoading, router]);

  // While loading or if user is not verified, show a loader
  if (isUserLoading || !user || (user && !user.emailVerified)) {
    return <PageLoader />;
  }
  
  // Once verified, show the dashboard
  return <DashboardShell>{children}</DashboardShell>;
}
