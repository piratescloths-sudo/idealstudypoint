'use server';
/**
 * @fileOverview An AI agent for generating compelling and concise event summaries.
 *
 * - generateEventSummary - A function that handles the event summary generation process.
 * - GenerateEventSummaryInput - The input type for the generateEventSummary function.
 * - GenerateEventSummaryOutput - The return type for the generateEventSummary function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateEventSummaryInputSchema = z.object({
  title: z.string().describe('The title of the event.'),
  date: z.string().describe('The date of the event.'),
  location: z.string().describe('The location where the event will take place.'),
  description: z
    .string()
    .describe('A detailed description of the event, including key details and agenda.'),
});
export type GenerateEventSummaryInput = z.infer<typeof GenerateEventSummaryInputSchema>;

const GenerateEventSummaryOutputSchema = z.object({
  summary: z
    .string()
    .describe(
      'A compelling and concise summary of the event, suitable for an education platform.'
    ),
});
export type GenerateEventSummaryOutput = z.infer<typeof GenerateEventSummaryOutputSchema>;

export async function generateEventSummary(
  input: GenerateEventSummaryInput
): Promise<GenerateEventSummaryOutput> {
  return generateEventSummaryFlow(input);
}

const generateEventSummaryPrompt = ai.definePrompt({
  name: 'generateEventSummaryPrompt',
  input: {schema: GenerateEventSummaryInputSchema},
  output: {schema: GenerateEventSummaryOutputSchema},
  prompt: `You are an expert marketing copywriter for an education platform. Your task is to create a compelling and concise summary for an upcoming event.

Event Title: {{{title}}}
Event Date: {{{date}}}
Event Location: {{{location}}}
Event Description: {{{description}}}

Based on the information above, generate a concise and engaging summary for the event that highlights its key benefits and attracts attendees. The summary should be approximately 2-3 sentences long.`,
});

const generateEventSummaryFlow = ai.defineFlow(
  {
    name: 'generateEventSummaryFlow',
    inputSchema: GenerateEventSummaryInputSchema,
    outputSchema: GenerateEventSummaryOutputSchema,
  },
  async input => {
    const {output} = await generateEventSummaryPrompt(input);
    return output!;
  }
);
