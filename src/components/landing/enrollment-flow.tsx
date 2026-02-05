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
    title: 'Start Learning',
    description: 'Start learning immediately!',
  },
];

export function EnrollmentFlow() {
  return (
    <section className="enrollment-bg py-16 sm:py-24">
      <div className="container mx-auto">
        <div className="mb-16 text-center">
          <h2 className="font-sans text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            Course Enrollment Flow
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
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
                <div className="z-10 flex h-20 w-20 items-center justify-center rounded-full border-2 border-primary bg-background/50 shadow-lg shadow-primary/20 backdrop-blur-sm dark:bg-blue-900/30">
                  <step.icon className="h-10 w-10 text-primary" />
                </div>
                <h3 className="mt-6 text-lg font-semibold text-foreground">{step.title}</h3>
                <p className="mx-auto mt-2 max-w-[200px] text-sm text-muted-foreground">
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
