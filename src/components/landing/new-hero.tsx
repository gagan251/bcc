import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';
import Link from 'next/link';

export function NewHero() {
  const heroImage = PlaceHolderImages.find(img => img.id === 'glass-hero-image');

  return (
    <section id="home" className="particle-glow relative py-20 md:py-32">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <div className="space-y-6 text-center md:text-left">
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl">
              Unlock Your Potential in Typing & Stenography
            </h1>
            <p className="text-lg text-white/80">
              Master the art of speed and accuracy with our cutting-edge courses and smart practice tools.
            </p>
            <Button size="lg" asChild className="bg-white/10 text-white hover:bg-white/20 border border-white/20">
              <Link href="#courses">Explore Courses</Link>
            </Button>
          </div>
          <div className="relative flex items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl -z-10 animate-pulse-slow"></div>
            
            <div className="rounded-2xl p-4">
                {heroImage && (
                  <Image
                      src={heroImage.imageUrl}
                      alt={heroImage.description}
                      width={300}
                      height={450}
                      className="rounded-lg object-cover"
                      data-ai-hint={heroImage.imageHint}
                      priority
                  />
                )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
