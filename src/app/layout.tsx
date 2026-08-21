import type { Metadata } from 'next';
import { Inter, Roboto_Mono } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Kishore Brothers | Wholesale Medicines Trading Catalog',
    template: '%s | Kishore Brothers',
  },
  description:
    'Kishore Brothers is a wholesale medicines trading firm providing bulk pharmaceutical supplies, finished dosage forms, and brand formulations.',
  keywords: [
    'Kishore Brothers',
    'Wholesale Medicines',
    'Medicines Trading Firm',
    'Bulk Pharmaceutical Sourcing',
    'Pharma Wholesale Catalog',
    'Cipla Wholesale',
    'Finished Dosage Forms',
  ],
  authors: [{ name: 'Kishore Brothers Trading Firm' }],
  creator: 'Kishore Brothers',
  metadataBase: new URL('http://localhost:3000'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'http://localhost:3000',
    title: 'Kishore Brothers | Wholesale Medicines Trading Catalog',
    description: 'B2B Wholesale Medicines Trading Catalog owned by Kishore Brothers.',
    siteName: 'Kishore Brothers Catalog',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${robotoMono.variable} scroll-smooth`}>
      <body className="font-sans bg-[#F4F8FB] text-slate-900 antialiased min-h-screen flex flex-col justify-between">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
