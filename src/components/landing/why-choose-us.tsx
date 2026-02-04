import { BarChart, Goal, Sparkles, UserCheck } from 'lucide-react';

const features = [
  {
    icon: Sparkles,
    title: 'Daily Smart Practice',
    description: 'Engaging daily exercises tailored to improve your skills efficiently.',
  },
  {
    icon: UserCheck,
    title: 'Experienced Trainers',
    description: 'Learn from industry experts with years of practical experience.',
  },
  {
    icon: Goal,
    title: 'Exam-Oriented Learning',
    description: 'Curriculum designed to help you excel in competitive exams.',
  },
  {
    icon: BarChart,
    title: 'Performance Tracking',
    description: 'Monitor your progress with our advanced analytics dashboard.',
  },
];

export function WhyChooseUs() {
  return (
    <section id="why-us" className="container mx-auto">
      <div className="grid grid-cols-1 items-center gap-12">
        <div className="mx-auto max-w-3xl space-y-8">
            <div className="text-center">
                <h2 className="font-headline text-3xl font-extrabold tracking-tight sm:text-4xl">
                Why Choose Us
                </h2>
                <p className="mt-4 text-lg text-muted-foreground">
                The best choice for your career growth.
                </p>
            </div>
          {features.map((feature, index) => (
            <div key={index} className="flex items-start gap-4">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <feature.icon className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">{feature.title}</h3>
                <p className="mt-1 text-muted-foreground">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
