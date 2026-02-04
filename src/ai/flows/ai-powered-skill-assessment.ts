'use server';

/**
 * @fileOverview An AI-powered skill assessment flow for providing personalized learning recommendations.
 *
 * - assessSkillAndRecommend - A function that assesses user performance and provides learning recommendations.
 * - SkillAssessmentInput - The input type for the assessSkillAndRecommend function.
 * - SkillAssessmentOutput - The return type for the assessSkillAndRecommend function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SkillAssessmentInputSchema = z.object({
  testData: z
    .string()
    .describe(
      'The test data representing the user performance in typing or stenography practice tests.'
    ),
  skillType: z
    .enum(['typing', 'stenography'])
    .describe('The type of skill being assessed (typing or stenography).'),
  userProfile: z
    .string()
    .optional()
    .describe(
      'Optional user profile information, including learning history and preferences.'
    ),
});
export type SkillAssessmentInput = z.infer<typeof SkillAssessmentInputSchema>;

const SkillAssessmentOutputSchema = z.object({
  assessmentSummary: z
    .string()
    .describe('A summary of the user skill assessment.'),
  recommendations: z
    .string()
    .describe(
      'Personalized learning recommendations based on the assessment, including specific areas for improvement and suggested lessons or exercises.'
    ),
});
export type SkillAssessmentOutput = z.infer<typeof SkillAssessmentOutputSchema>;

export async function assessSkillAndRecommend(
  input: SkillAssessmentInput
): Promise<SkillAssessmentOutput> {
  return assessSkillAndRecommendFlow(input);
}

const skillAssessmentPrompt = ai.definePrompt({
  name: 'skillAssessmentPrompt',
  input: {schema: SkillAssessmentInputSchema},
  output: {schema: SkillAssessmentOutputSchema},
  prompt: `You are an AI-powered skill assessment tool designed to analyze user performance data from typing and stenography practice tests.

  Based on the provided test data, skill type, and optional user profile, generate a comprehensive assessment summary and provide personalized learning recommendations.

  Consider the user's strengths and weaknesses, and suggest specific areas for improvement. Recommend relevant lessons, exercises, or resources to enhance their skills.

  Skill Type: {{{skillType}}}
  Test Data: {{{testData}}}
  User Profile: {{{userProfile}}}
  
  Output the assessment summary and learning recommendations in a clear and concise manner.
  Assessment Summary:
  
  Recommendations: `,
});

const assessSkillAndRecommendFlow = ai.defineFlow(
  {
    name: 'assessSkillAndRecommendFlow',
    inputSchema: SkillAssessmentInputSchema,
    outputSchema: SkillAssessmentOutputSchema,
  },
  async input => {
    const {output} = await skillAssessmentPrompt(input);
    return output!;
  }
);
