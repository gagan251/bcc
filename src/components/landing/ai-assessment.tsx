'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  assessSkillAndRecommend,
  type SkillAssessmentInput,
  type SkillAssessmentOutput,
} from '@/ai/flows/ai-powered-skill-assessment';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Sparkles } from 'lucide-react';
import { Input } from '../ui/input';

const formSchema = z.object({
  skillType: z.enum(['typing', 'stenography'], {
    required_error: 'Please select a skill type.',
  }),
  testData: z
    .string()
    .min(50, 'Please provide at least 50 characters of test data.'),
  userProfile: z.string().optional(),
});

export function AiAssessment() {
  const [result, setResult] = useState<SkillAssessmentOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      skillType: 'typing',
      testData: '',
      userProfile: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await assessSkillAndRecommend(values);
      setResult(response);
    } catch (e) {
      setError(
        'An error occurred while assessing your skills. Please try again.'
      );
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section id="ai-assessment" className="container mx-auto">
      <div className="mb-12 text-center">
        <h2 className="font-headline text-3xl font-extrabold tracking-tight sm:text-4xl">
          AI-Powered Skill Assessment
        </h2>
        <p className="mt-4 text-lg text-muted-foreground">
          Get personalized feedback to supercharge your learning.
        </p>
      </div>
      <Card>
        <CardContent className="p-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="skillType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Skill Type</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a skill to assess" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="typing">Typing</SelectItem>
                          <SelectItem value="stenography">
                            Stenography
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="userProfile"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>User Profile (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., beginner, preparing for SSC exam" {...field} />
                      </FormControl>
                      <FormDescription>
                        Provide context for more tailored advice.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="testData"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Practice Test Data</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Paste your practice text, including any metrics like WPM, accuracy, and errors."
                        className="min-h-[150px]"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      The more data you provide, the better the assessment.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Sparkles className="mr-2 h-4 w-4" />
                )}
                Assess My Skills
              </Button>
            </form>
          </Form>

          {error && (
            <div className="mt-6 rounded-md border border-destructive/50 bg-destructive/10 p-4 text-sm text-destructive">
              {error}
            </div>
          )}

          {result && (
            <div className="mt-8 space-y-6">
              <Separator />
              <h3 className="text-2xl font-bold">Your Assessment Results</h3>
              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Assessment Summary</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{result.assessmentSummary}</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Learning Recommendations</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="whitespace-pre-wrap text-muted-foreground">{result.recommendations}</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </section>
  );
}

function Separator() {
    return <div className="bg-border h-[1px] w-full" />;
}
