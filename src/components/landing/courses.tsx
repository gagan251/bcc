import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Check } from 'lucide-react';
import Link from 'next/link';

const courseData = [
  {
    title: 'Typing Course',
    features: [
      'Speed Building',
      'Accuracy Training',
      'Daily Practice Lessons',
    ],
  },
  {
    title: 'Typing / Shorthand Practice',
    features: [
      'Shorthand Practice',
      'Exam-Oriented Learning',
      'Performance Tracking',
    ],
  },
  {
    title: 'Stenography Course',
    features: [
      'Shorthand Basics',
      'Dictation Practice',
      'Exam-Oriented Learning',
    ],
  },
];

export function Courses() {
  return (
    <section id="courses" className="container mx-auto">
      <div className="mb-12 text-center">
        <h2 className="font-headline text-3xl font-extrabold tracking-tight sm:text-4xl">
          Courses
        </h2>
        <p className="mt-4 text-lg text-muted-foreground">
          First Impression Matters
        </p>
      </div>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {courseData.map((course, index) => (
          <Card key={index} className="flex flex-col overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
            <CardHeader>
              <CardTitle className="text-xl">{course.title}</CardTitle>
            </CardHeader>
            <CardContent className="flex-1">
              <ul className="space-y-3">
                {course.features.map((feature, i) => (
                  <li key={i} className="flex items-start">
                    <Check className="mr-3 mt-1 h-5 w-5 flex-shrink-0 text-primary" />
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full" asChild>
                <Link href="/signup">Enroll Now</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
}
