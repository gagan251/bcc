import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const testimonials = [
  {
    name: 'Priya Sharma',
    feedback: 'The daily practice sessions have boosted my typing speed immensely. The trainers are excellent!',
    avatarId: 'testimonial-avatar-1'
  },
  {
    name: 'Amit Singh',
    feedback: 'Bharat Communication Center is the best platform for stenography preparation. The exam-oriented approach is very effective.',
    avatarId: 'testimonial-avatar-2'
  },
  {
    name: 'Sneha Reddy',
    feedback: 'I love the performance tracking feature. It helped me identify my weak areas and improve my accuracy significantly.',
    avatarId: 'testimonial-avatar-3'
  }
];

export function Testimonials() {
  return (
    <section id="testimonials" className="container mx-auto">
      <div className="mb-12 text-center">
        <h2 className="font-headline text-3xl font-extrabold tracking-tight sm:text-4xl">
          What Our Students Say
        </h2>
        <p className="mt-4 text-lg text-muted-foreground">
          Real feedback from our successful students.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((testimonial, index) => {
          const avatar = PlaceHolderImages.find(img => img.id === testimonial.avatarId);
          return (
            <Card key={index}>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <p className="text-muted-foreground">"{testimonial.feedback}"</p>
                  <div className="flex items-center gap-4">
                    <Avatar>
                      {avatar && <AvatarImage src={avatar.imageUrl} alt={testimonial.name} data-ai-hint={avatar.imageHint} />}
                      <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold">{testimonial.name}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
