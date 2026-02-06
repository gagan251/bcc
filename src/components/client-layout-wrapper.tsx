'use client';

import { useState, useEffect } from 'react';
import PageLoader from '@/components/ui/page-loader';

export default function ClientLayoutWrapper({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // This effect runs once on the client when the main app shell is ready.
    // Hiding the loader here is more reliable than waiting for the window 'load' event,
    // which can be unpredictable with Next.js's streaming.
    setLoading(false);
  }, []);

  return (
    <>
      {loading && <PageLoader />}
      {/* 
        We conditionally apply the 'overflow: hidden' style while loading.
        Once 'loading' becomes false, this entire block (including the style) is removed,
        restoring the default scroll behavior.
      */}
      {loading && (
        <style jsx global>{`
          body {
            overflow: hidden;
          }
        `}</style>
      )}
      {children}
    </>
  );
}
