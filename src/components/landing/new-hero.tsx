import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';
import Link from 'next/link';
import { LoginCard } from './login-card';

export function NewHero() {
  const heroImage = PlaceHolderImages.find(img => img.id === 'hero-image');

  return (
    <section id="home" className="hero-section hero-section-particles py-20 md:py-32 overflow-hidden">
      <div className="hero-section-sun" />
      <div className="container mx-auto relative z-10">
        <div className="grid grid-cols-1 items-center gap-x-12 gap-y-16 lg:grid-cols-12">
          
          {/* Left Column: Contains text */}
          <div className="lg:col-span-7 space-y-8 text-center md:text-left">
            {/* Text block */}
            <div className="space-y-6">
              <h1 className="text-4xl font-extrabold tracking-tight text-foreground dark:text-white sm:text-5xl md:text-6xl opacity-0 animate-fade-in-up">
                Unlock Your Potential in Typing & Stenography
              </h1>
              <p className="text-lg text-muted-foreground dark:text-white/80 opacity-0 animate-fade-in-up animation-delay-200">
                Master the art of speed and accuracy with our cutting-edge courses and smart practice tools.
              </p>
              <div className="opacity-0 animate-fade-in-up animation-delay-400">
                  <Button size="lg" asChild className="dark:bg-white/10 dark:text-white dark:hover:bg-white/20 dark:border dark:border-white/20 transition-transform duration-300 ease-out hover:scale-105">
                <Link href="#courses">Explore Courses</Link>
              </Button>
              </div>
            </div>
          </div>
          
          {/* Right Column: Login Card block */}
          <div className="w-full max-w-md mx-auto lg:mx-0 lg:col-span-5 flex items-center opacity-0 animate-fade-in-up animation-delay-500">
            <LoginCard />
          </div>
        </div>
      </div>
    </section>
  );
}
