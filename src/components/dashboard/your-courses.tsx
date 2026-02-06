'use client';

import { useUser, useCollection, useDoc, useFirestore, useMemoFirebase } from '@/firebase';
import { collection, doc } from 'firebase/firestore';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { BookOpen, GraduationCap } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

function CourseCard({ courseId }: { courseId: string }) {
  const firestore = useFirestore();
  const courseRef = useMemoFirebase(() => (firestore ? doc(firestore, 'courses', courseId) : null), [firestore, courseId]);
  const { data: course, isLoading } = useDoc(courseRef);

  if (isLoading) {
    return (
        <Card>
            <CardHeader>
                <Skeleton className="h-6 w-3/4" />
            </CardHeader>
            <CardContent>
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6 mt-2" />
            </CardContent>
            <CardFooter>
                <Skeleton className="h-10 w-full" />
            </CardFooter>
        </Card>
    );
  }

  if (!course) {
    return null; // Don't render anything if course data is not found
  }

  return (
    <Card className="flex flex-col overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <CardHeader>
        <CardTitle className="flex items-center gap-3">
            <BookOpen className="h-6 w-6 text-primary flex-shrink-0" />
            <span className="truncate">{course.name}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-sm text-muted-foreground line-clamp-3">{course.description}</p>
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full">
          {/* This link is a placeholder for now */}
          <Link href={`/dashboard/courses/${course.id}`}>Start Learning</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

export function YourCourses() {
  const { user } = useUser();
  const firestore = useFirestore();
  
  const enrollmentsQuery = useMemoFirebase(() => {
      if (!user || !firestore) return null;
      return collection(firestore, 'users', user.uid, 'enrollments');
  }, [user, firestore]);

  const { data: enrollments, isLoading } = useCollection<{courseId: string}>(enrollmentsQuery);

  if (isLoading) {
    return (
        <div>
            <h2 className="text-2xl font-bold tracking-tight mb-6">Your Courses</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(3)].map((_, i) => (
                    <Card key={i}>
                        <CardHeader>
                            <Skeleton className="h-6 w-3/4" />
                        </CardHeader>
                        <CardContent>
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-5/6 mt-2" />
                        </CardContent>
                        <CardFooter>
                            <Skeleton className="h-10 w-full" />
                        </CardFooter>
                    </Card>
                ))}
            </div>
      </div>
    );
  }

  return (
    <section>
      <h2 className="text-2xl font-bold tracking-tight mb-6">Your Courses</h2>
      {enrollments && enrollments.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {enrollments.map((enrollment) => (
            <CourseCard key={enrollment.id} courseId={enrollment.courseId} />
          ))}
        </div>
      ) : (
        <Card className="text-center p-8 bg-card/80 border-dashed border-border/50">
            <CardContent className="flex flex-col items-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-primary/10 to-primary/20 mb-6 relative animate-float">
                    <GraduationCap className="h-10 w-10 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">You haven’t enrolled yet</h3>
                <p className="text-muted-foreground mt-2 mb-6 max-w-sm mx-auto">Let’s get started on your learning path 🚀</p>
                <Button asChild size="lg" className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground shadow-lg transition-all duration-300 hover:shadow-primary/40 hover:-translate-y-0.5 active:scale-95">
                    <Link href="/#courses">Explore Courses</Link>
                </Button>
            </CardContent>
        </Card>
      )}
    </section>
  );
}
