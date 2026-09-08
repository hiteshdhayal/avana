import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { Fraunces } from 'next/font/google';
import './styles.css';

const fraunces = Fraunces({ subsets: ['latin'], variable: '--font-fraunces', display: 'swap' });

export const metadata: Metadata = {
  title: 'Avana Enclave 18 — 18 villas with private pools in Karjat | Batra & Sankhe Buildcon',
  description: 'Eighteen villas on a two-acre slope in Karjat valley. 3,500 sq ft plots, private pools, clubhouse. 95 minutes from Navi Mumbai International Airport.'
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return <html lang="en"><body className={fraunces.variable}>{children}</body></html>;
}
