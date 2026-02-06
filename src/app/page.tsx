import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { NewHero } from '@/components/landing/new-hero';
import { Courses } from '@/components/landing/courses';
import { EnrollmentFlow } from '@/components/landing/enrollment-flow';
import { WhyChooseUs } from '@/components/landing/why-choose-us';
import { AddReview } from '@/components/landing/add-review';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background dark:bg-[#04031F]">
      <Header />
      <main className="flex-1">
        <NewHero />

        <EnrollmentFlow />

        <div className="bg-background">
          <div className="light-mode-bg-container">
            <div className="relative mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
              <div className="space-y-24">
                <Courses />
                <WhyChooseUs />
                <AddReview />
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
