'use server';
/**
 * @fileOverview A Genkit flow for generating engaging course descriptions based on provided course details.
 *
 * - generateCourseDescription - A function that handles the course description generation process.
 * - GenerateCourseDescriptionInput - The input type for the generateCourseDescription function.
 * - GenerateCourseDescriptionOutput - The return type for the generateCourseDescription function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateCourseDescriptionInputSchema = z.object({
  title: z.string().describe('The title of the course.'),
  instructor: z.string().describe('The name of the course instructor.'),
  duration: z.string().describe('The duration of the course (e.g., "8 weeks", "40 hours").'),
  learningObjectives: z
    .array(z.string())
    .describe('A list of key learning objectives or skills students will gain.'),
  targetAudience: z.string().describe('The intended audience for the course.'),
  keywords: z.array(z.string()).optional().describe('Optional keywords related to the course content.'),
});
export type GenerateCourseDescriptionInput = z.infer<typeof GenerateCourseDescriptionInputSchema>;

const GenerateCourseDescriptionOutputSchema = z.object({
  description: z
    .string()
    .describe('An engaging and comprehensive course description in a professional education tone.'),
});
export type GenerateCourseDescriptionOutput = z.infer<typeof GenerateCourseDescriptionOutputSchema>;

export async function generateCourseDescription(
  input: GenerateCourseDescriptionInput
): Promise<GenerateCourseDescriptionOutput> {
  return generateCourseDescriptionFlow(input);
}

const generateCourseDescriptionPrompt = ai.definePrompt({
  name: 'generateCourseDescriptionPrompt',
  input: {schema: GenerateCourseDescriptionInputSchema},
  output: {schema: GenerateCourseDescriptionOutputSchema},
  prompt: `You are an AI assistant specialized in writing engaging and comprehensive course descriptions for an education website. Your goal is to create compelling descriptions that attract students and clearly outline what they will learn.

Generate a course description based on the following details. Ensure the description is professional, persuasive, and highlights the value proposition of the course. Do not include a title in the description, only the descriptive text.

Course Title: {{{title}}}
Instructor: {{{instructor}}}
Duration: {{{duration}}}
Target Audience: {{{targetAudience}}}

Learning Objectives:
{{#each learningObjectives}}- {{{this}}}
{{/each}}

{{#if keywords}}
Keywords: {{#each keywords}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}
{{/if}}

Generated Course Description:`,
});

const generateCourseDescriptionFlow = ai.defineFlow(
  {
    name: 'generateCourseDescriptionFlow',
    inputSchema: GenerateCourseDescriptionInputSchema,
    outputSchema: GenerateCourseDescriptionOutputSchema,
  },
  async input => {
    const {output} = await generateCourseDescriptionPrompt(input);
    return output!;
  }
);
