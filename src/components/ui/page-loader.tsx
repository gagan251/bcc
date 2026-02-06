'use client';

const PageLoader = () => {
  return (
    <div className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-background/70 backdrop-blur-sm transition-opacity duration-300">
        <div className="animate-float text-center">
            <div className="flex items-center justify-center space-x-2">
                <div className="h-4 w-4 rounded-full bg-primary animate-pulse-slow [animation-delay:-0.4s]"></div>
                <div className="h-4 w-4 rounded-full bg-primary animate-pulse-slow [animation-delay:-0.2s]"></div>
                <div className="h-4 w-4 rounded-full bg-primary animate-pulse-slow"></div>
            </div>
            <p className="mt-4 text-center text-muted-foreground">
                Getting things ready for you... 😊
            </p>
        </div>
    </div>
  );
};

export default PageLoader;
