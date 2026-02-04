import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';
import Link from 'next/link';

export function Hero() {
  const heroImage = PlaceHolderImages.find((img) => img.id === 'hero-image');

  return (
    <section id="home" className="container mx-auto">
      <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
        <div className="space-y-6 text-center md:text-left">
          <span className="text-sm font-bold uppercase tracking-wider text-primary">
            Design and Communication Center
          </span>
          <h1 className="font-headline text-4xl font-extrabold tracking-tight md:text-5xl lg:text-6xl">
            Master Typing & Stenography with Daily Smart Practice
          </h1>
          <p className="text-lg text-muted-foreground">
            Join Bharat Communication Center and improve speed, accuracy, and confidence.
          </p>
          <Button size="lg" asChild>
            <Link href="#courses">Explore Courses</Link>
          </Button>
        </div>
        <div className="flex items-center justify-center">
          {heroImage && (
            <Image
              src={heroImage.imageUrl}
              alt={heroImage.description}
              width={800}
              height={600}
              className="rounded-lg shadow-2xl"
              data-ai-hint={heroImage.imageHint}
              priority
            />
          )}
        </div>
      </div>
    </section>
  );
}
