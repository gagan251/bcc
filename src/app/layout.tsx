import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { cn } from '@/lib/utils';
import { PlaceHolderImages } from '@/lib/placeholder-images';

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
  const bgImage = PlaceHolderImages.find((img) => img.id === 'background-image');

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
          className="fixed inset-0 z-[-1] bg-cover bg-center"
          style={{ backgroundImage: bgImage ? `url(${bgImage.imageUrl})` : 'none' }}
        />
        <div className="fixed inset-0 z-[-1] bg-background/95" />

        {children}
        <Toaster />
      </body>
    </html>
  );
}
