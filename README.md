# Ideal Study Point

A modern, AI-powered education platform and campus management system built with Next.js, Firebase, and Genkit.

## Features

- **Dynamic Homepage**: Fully manageable content, hero slider, and statistics.
- **Course Catalog**: Filterable course listings with AI-generated descriptions.
- **Event Management**: Campus event announcements with AI-powered marketing summaries.
- **Admission Portal**: Integrated inquiry system for prospective students.
- **Admin Dashboard**: Secure role-based access control to manage courses, events, testimonials, inquiries, and site settings.
- **AI Integration**: Uses Google Gemini (via Genkit) to generate professional educational content.

## Tech Stack

- **Frontend**: Next.js 15 (App Router), React 19, Tailwind CSS.
- **UI Components**: ShadCN UI, Lucide Icons.
- **Backend/Database**: Firebase Firestore, Firebase Authentication.
- **AI/GenAI**: Genkit with Google AI plugin.
- **Deployment**: Optimized for Vercel or Firebase App Hosting.

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/piratescloths-sudo/idealstudypoint.git
   ```
2. Install dependencies: `npm install`
3. Set up your Firebase project and add the configuration to `src/firebase/config.ts`.
4. Run the development server: `npm run dev`
5. Open [http://localhost:9002](http://localhost:9002) in your browser.
