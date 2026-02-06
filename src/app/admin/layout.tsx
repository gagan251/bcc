'use client';

import { useEffect, useState } from 'react';
import { useUser, useFirestore } from '@/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { usePathname, useRouter } from 'next/navigation';
import PageLoader from '@/components/ui/page-loader';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isUserLoading } = useUser();
  const firestore = useFirestore();
  const router = useRouter();
  const pathname = usePathname();

  const [isAdmin, setIsAdmin] = useState(false);
  const [isCheckingRole, setIsCheckingRole] = useState(true);

  const isPublicAdminPage = ['/admin/login', '/admin/signup', '/admin/forgot-password'].includes(pathname);

  useEffect(() => {
    if (isUserLoading) {
      return; // Wait until user state is loaded
    }

    if (isPublicAdminPage) {
        setIsCheckingRole(false);
        // if a logged-in user tries to access login page, redirect them to dashboard
        if (user) {
            router.replace('/admin/dashboard');
        }
        return;
    }

    if (!user) {
      router.replace('/admin/login');
      return;
    }

    const checkAdminRole = async () => {
      const userDocRef = doc(firestore, 'users', user.uid);
      const userDoc = await getDoc(userDocRef);
      if (userDoc.exists() && userDoc.data().role === 'admin') {
        setIsAdmin(true);
      } else {
        await auth.signOut();
        router.replace('/');
      }
      setIsCheckingRole(false);
    };

    checkAdminRole();

  }, [user, isUserLoading, firestore, router, isPublicAdminPage, pathname]);

  if (isUserLoading || (!isPublicAdminPage && isCheckingRole)) {
    return <PageLoader />;
  }

  if (!isPublicAdminPage && !isAdmin) {
    return <PageLoader />;
  }
  
  return <>{children}</>;
}
