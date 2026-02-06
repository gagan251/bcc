'use client';

import { useUser, useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import { collection } from 'firebase/firestore';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Link from 'next/link';
import { Skeleton } from '../ui/skeleton';

type Course = {
  id: string;
  name: string;
  description: string;
};

export function Courses() {
  const { user } = useUser();
  const firestore = useFirestore();

  const coursesQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return collection(firestore, 'courses');
  }, [firestore]);

  const { data: courses, isLoading } = useCollection<Course>(coursesQuery);

  const renderSkeletons = () => (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
      {[...Array(3)].map((_, i) => (
        <Card key={i}>
          <CardHeader>
            <Skeleton className="h-7 w-3/4" />
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
            </div>
          </CardContent>
          <CardFooter>
            <Skeleton className="h-10 w-full" />
          </CardFooter>
        </Card>
      ))}
    </div>
  );

  return (
    <section id="courses" className="container mx-auto">
      <div className="mb-12 text-center opacity-0 animate-fade-in-up">
        <h2 className="font-sans text-3xl font-extrabold tracking-tight sm:text-4xl">
          Courses
        </h2>
        <p className="mt-4 text-lg text-muted-foreground">
          First Impression Matters
        </p>
      </div>

      {isLoading ? (
        renderSkeletons()
      ) : courses && courses.length > 0 ? (
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {courses.map((course, index) => {
            const enrollHref = user ? `/enroll/${course.id}` : '/signup';
            return (
              <Card
                key={course.id}
                className="flex flex-col overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 opacity-0 animate-fade-in-up"
                style={{ animationDelay: `${100 * index}ms` }}
              >
                <CardHeader>
                  <CardTitle className="text-xl">{course.name}</CardTitle>
                </CardHeader>
                <CardContent className="flex-1">
                  <CardDescription className="line-clamp-4">
                    {course.description}
                  </CardDescription>
                </CardContent>
                <CardFooter>
                  <Button className="w-full transition-transform duration-200 hover:scale-[1.02] active:scale-100" asChild>
                    <Link href={enrollHref}>Enroll Now</Link>
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      ) : (
        <div className="text-center text-muted-foreground py-10 border-2 border-dashed rounded-lg">
          <p>No courses available at the moment. Please check back later.</p>
        </div>
      )}
    </section>
  );
}
