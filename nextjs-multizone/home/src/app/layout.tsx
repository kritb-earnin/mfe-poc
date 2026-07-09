import type { Metadata } from 'next';
import { ZoneNav } from '@/components/ZoneNav';
import './globals.css';

export const metadata: Metadata = {
  title: 'Home Zone | Next.js Multi-Zones',
  description: 'Main zone in a Next.js multi-zone micro-frontend demo',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ZoneNav />
        <main>{children}</main>
      </body>
    </html>
  );
}
