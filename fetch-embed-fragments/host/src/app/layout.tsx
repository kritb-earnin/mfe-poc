import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Fetch & Embed SSR Fragments',
  description: 'Same-page micro-frontend composition via SSR HTML fragments',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
