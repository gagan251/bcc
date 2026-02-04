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
          <h1 className="font-headline text-4xl font-extrabold tracking-tight text-foreground md:text-5xl">
            Master Typing & Stenography with Daily Smart Practice
          </h1>
          <p className="text-lg text-muted-foreground">
            Improve speed, accuracy, and confidence with daily practice and exam-oriented training.
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
              className="rounded-lg shadow-lg"
              data-ai-hint={heroImage.imageHint}
              priority
            />
          )}
        </div>
      </div>
    </section>
  );
}
