import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Hero } from '@/components/landing/hero';
import { LoginCard } from '@/components/landing/login-card';
import { Courses } from '@/components/landing/courses';
import { EnrollmentFlow } from '@/components/landing/enrollment-flow';
import { WhyChooseUs } from '@/components/landing/why-choose-us';
import { AddReview } from '@/components/landing/add-review';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="relative mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-8">
              <div className="space-y-24 py-16 md:py-24">
                <Hero />
                <Courses />
                <EnrollmentFlow />
                <WhyChooseUs />
                <AddReview />
              </div>
            </div>
            <aside className="hidden lg:col-span-4 lg:block">
              <div className="sticky top-28 space-y-6">
                <LoginCard />
              </div>
            </aside>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
