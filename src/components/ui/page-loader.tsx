'use client';

const PageLoader = () => {
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-background/80 backdrop-blur-sm">
      <div className="h-16 w-16 animate-spin rounded-full border-4 border-muted border-t-primary" />
    </div>
  );
};

export default PageLoader;
