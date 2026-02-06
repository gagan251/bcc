import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';

export function NewHero() {
  return (
    <section id="home" className="hero-section hero-section-particles py-20 md:py-28 overflow-hidden">
      <div className="hero-section-sun" />
      <div className="container mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Left Column: Text Content */}
          <div className="space-y-6 text-center md:text-left">
            <h1 className="text-4xl font-extrabold tracking-tight text-foreground dark:text-white sm:text-5xl md:text-6xl opacity-0 animate-fade-in-up">
              Unlock Your Potential in Typing & Stenography
            </h1>
            <p className="text-lg text-muted-foreground dark:text-white/80 opacity-0 animate-fade-in-up animation-delay-200 max-w-xl mx-auto md:mx-0">
              Master the art of speed and accuracy with our cutting-edge courses and smart practice tools.
            </p>
            <div className="opacity-0 animate-fade-in-up animation-delay-400">
              <Button size="lg" asChild className="dark:bg-white/10 dark:text-white dark:hover:bg-white/20 dark:border dark:border-white/20 transition-transform duration-300 ease-out hover:scale-105">
                <Link href="#courses">Explore Courses</Link>
              </Button>
            </div>
          </div>

          {/* Right Column: Image for Light Mode */}
          <div className="relative hidden md:block opacity-0 animate-fade-in-up animation-delay-500">
            <div className="dark:hidden">
              <Image
                src="https://i.postimg.cc/NG9Lxvw6/Whisk-a58f03d62e759c997364fadd642a333adr.png"
                alt="Vintage typewriter with modern elements"
                width={600}
                height={600}
                className="object-contain animate-float"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
