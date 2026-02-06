import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { NewHero } from '@/components/landing/new-hero';
import { LoginCard } from '@/components/landing/login-card';
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
              <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12">
                <div className="space-y-24 lg:col-span-8">
                  <Courses />
                  <WhyChooseUs />
                  <AddReview />
                </div>
                <aside className="lg:col-span-4">
                  <div className="sticky top-28 space-y-6">
                    <LoginCard />
                  </div>
                </aside>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
