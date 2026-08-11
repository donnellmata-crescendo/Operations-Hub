import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Crescendo Operations Hub',
  description:
    'The front door for Operations — updates, systems and processes, AI tooling, dashboards, and documentation.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="font-sans">{children}</body>
    </html>
  );
}
