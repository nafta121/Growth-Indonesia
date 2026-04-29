import type { Metadata } from 'next';
import { Inter, Outfit } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Provider Outbound Madiun & Jawa Timur | Growth Indonesia',
  description: 'Growth Indonesia adalah jasa outbound profesional & training SDM di Madiun & Jawa Timur. Melayani outbound training, LDK OSIS, team building, dan leadership training.',
  keywords: 'Provider Outbound Madiun, Outbound Jawa Timur, Training SDM, LDK OSIS, Jasa Outbound Madiun, Outbound Madiun, Jasa Outbound Profesional',
  openGraph: {
    title: 'Provider Outbound Madiun & Jawa Timur | Growth Indonesia',
    description: 'Jasa outbound profesional & training SDM terbaik di Madiun & Jawa Timur.',
    url: 'https://growth-indonesia.com',
    siteName: 'Growth Indonesia',
    locale: 'id_ID',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
      <body suppressHydrationWarning className="font-sans antialiased bg-[#0A1628] text-white">
        {children}
      </body>
    </html>
  );
}
