'use client';

import { useState, useEffect } from 'react';
import PageLoader from '@/components/ui/page-loader';

export default function ClientLayoutWrapper({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleLoad = () => {
      document.body.style.overflow = '';
      // Small delay to prevent flash of content
      setTimeout(() => {
        setLoading(false);
      }, 200); 
    };

    if (typeof window !== 'undefined') {
      document.body.style.overflow = 'hidden';
      if (document.readyState === 'complete') {
          handleLoad();
      } else {
          window.addEventListener('load', handleLoad);
          return () => window.removeEventListener('load', handleLoad);
      }
    }
  }, []);

  return (
    <>
      {loading && <PageLoader />}
      {children}
    </>
  );
}
