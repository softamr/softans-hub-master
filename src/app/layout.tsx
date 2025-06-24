

import type { Metadata } from 'next';
import { Toaster } from '@/components/ui/toaster';
import './globals.css';
import { Inter, Poppins, Space_Grotesk } from 'next/font/google';
import { cn } from '@/lib/utils';

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
});

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-poppins',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Softans Hub - Your Partner in Digital Transformation',
  description: 'Softans specializes in custom software, ERP systems, professional websites, and high-quality blogs to elevate your business.',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // The `lang` attribute is automatically set by Next.js from the `[lang]` segment.
  // The `dir` attribute is set by the <SetDirection /> client component in the [lang] layout.
  return (
    <html lang="en" className={cn(inter.variable, poppins.variable, spaceGrotesk.variable)} suppressHydrationWarning>
      <body className="font-body antialiased">
        {children}
        <Toaster />
      </body>
    </html>
  );
}

