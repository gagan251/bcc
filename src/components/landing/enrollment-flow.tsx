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
    <section className="container mx-auto">
      <div className="mb-12 text-center">
        <h2 className="font-headline text-3xl font-extrabold tracking-tight sm:text-4xl">
          Course Enrollment Flow
        </h2>
        <p className="mt-4 text-lg text-muted-foreground">
          A simple and straightforward process.
        </p>
      </div>
      <div className="relative">
        <div
          className="absolute left-0 top-1/2 hidden h-0.5 w-full -translate-y-1/2 bg-border md:block"
          aria-hidden="true"
        />
        <div className="relative grid grid-cols-1 gap-8 md:grid-cols-4">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-primary bg-background shadow-lg">
                <step.icon className="h-8 w-8 text-primary" />
              </div>
              <h3 className="mt-4 text-lg font-semibold">{step.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
