import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { FirebaseClientProvider } from '@/firebase/client-provider';

const LOGO_URL = "https://pub-1407f82391df4ab1951418d04be76914.r2.dev/uploads/7fe55158-c51b-42c9-b70f-55f8802402b7.png";

export const metadata: Metadata = {
  title: 'Ideal Study Point | Modern Education Platform',
  description: 'Empowering students with world-class education and resources.',
  icons: {
    icon: LOGO_URL,
    apple: LOGO_URL,
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        <FirebaseClientProvider>
          {children}
          <Toaster />
        </FirebaseClientProvider>
      </body>
    </html>
  );
}
