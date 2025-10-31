'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating suggested actions (meditation, song, blessing) based on user context.
 *
 * - generateSuggestedActions - A function that generates action suggestions.
 * - GenerateSuggestedActionsInput - The input type for the generateSuggestedActions function.
 * - GenerateSuggestedActionsOutput - The output type for the generateSuggestedActions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateSuggestedActionsInputSchema = z.object({
  userProfile: z
    .string()
    .describe('The user profile, including preferences and past activities.'),
  currentContext: z
    .string()
    .describe('The current context, such as time of day, location, and mood.'),
  scenario: z.string().describe('The specific scenario or situation.'),
});
export type GenerateSuggestedActionsInput = z.infer<
  typeof GenerateSuggestedActionsInputSchema
>;

const GenerateSuggestedActionsOutputSchema = z.object({
  suggestions: z
    .array(z.string())
    .describe('An array of suggested actions (meditation, song, blessing).'),
});
export type GenerateSuggestedActionsOutput = z.infer<
  typeof GenerateSuggestedActionsOutputSchema
>;

export async function generateSuggestedActions(
  input: GenerateSuggestedActionsInput
): Promise<GenerateSuggestedActionsOutput> {
  return generateSuggestedActionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateSuggestedActionsPrompt',
  input: {schema: GenerateSuggestedActionsInputSchema},
  output: {schema: GenerateSuggestedActionsOutputSchema},
  prompt: `Based on the user profile: {{{userProfile}}}, current context: {{{currentContext}}}, and scenario: {{{scenario}}},
  suggest three relevant actions from the options: meditation, song, and blessing.
  Return them as a JSON array of strings.
  Do not include any explanation or other text.
  The user wants to quickly engage with these activities.
  Example: ["meditation", "song", "blessing"]`,
});

const generateSuggestedActionsFlow = ai.defineFlow(
  {
    name: 'generateSuggestedActionsFlow',
    inputSchema: GenerateSuggestedActionsInputSchema,
    outputSchema: GenerateSuggestedActionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
