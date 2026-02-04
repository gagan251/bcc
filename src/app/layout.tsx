import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { cn } from '@/lib/utils';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
  title: 'Bharat Learning Hub',
  description: 'Master Typing & Stenography with Daily Smart Practice',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body
        className={cn(
          'min-h-screen font-body antialiased',
          inter.variable
        )}
      >
        <div
          className="fixed inset-0 -z-10"
          style={{
            backgroundColor: "hsl(var(--background))",
            backgroundImage:
              "radial-gradient(ellipse at top left, hsla(25, 95%, 53%, 0.1) 0%, transparent 50%), " +
              "radial-gradient(ellipse at bottom right, hsla(217, 91%, 60%, 0.15) 0%, transparent 50%)",
          }}
        />

        {children}
        <Toaster />
      </body>
    </html>
  );
}
