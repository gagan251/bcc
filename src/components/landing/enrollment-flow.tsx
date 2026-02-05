import { UserPlus, BookCheck, CreditCard, LayoutDashboard } from 'lucide-react';

const steps = [
  {
    icon: UserPlus,
    title: 'Sign Up',
    description: 'Create your account in seconds.',
  },
  {
    icon: BookCheck,
    title: 'Choose Course',
    description: 'Select the course that fits your goals.',
  },
  {
    icon: CreditCard,
    title: 'Make Payment',
    description: 'Securely complete your payment.',
  },
  {
    icon: LayoutDashboard,
    title: 'Access Dashboard',
    description: 'Start learning immediately!',
  },
];

export function EnrollmentFlow() {
  return (
    <section className="enrollment-bg py-16 sm:py-24">
      <div className="container mx-auto">
        <div className="mb-16 text-center">
          <h2 className="font-headline text-3xl font-extrabold tracking-tight sm:text-4xl text-white">
            Course Enrollment Flow
          </h2>
          <p className="mt-4 text-lg text-white/80">
            A simple and straightforward process.
          </p>
        </div>
        <div className="relative">
          {/* Desktop Connector */}
          <div className="hidden md:block step-connector"></div>
          {/* Mobile Connector */}
          <div className="md:hidden step-connector-mobile"></div>

          <div className="step-item-container">
            {steps.map((step) => (
              <div key={step.title} className="step-item">
                <div className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-primary bg-blue-900/30 backdrop-blur-sm shadow-lg shadow-primary/20 z-10">
                  <step.icon className="h-10 w-10 text-primary" />
                </div>
                <h3 className="mt-6 text-lg font-semibold text-white">{step.title}</h3>
                <p className="mt-2 text-sm text-white/70 max-w-[200px] mx-auto">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
