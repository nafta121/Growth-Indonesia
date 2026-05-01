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
  title: 'Premium Corporate Outbound & HR Training Partner | Growth Indonesia',
  description: 'Transform your corporate team with Growth Indonesia\'s premium experiential learning and HR development programs. Trusted by 100+ top enterprises for team building and leadership acceleration.',
  keywords: 'Corporate Outbound, HR Training, Team Building, Leadership Development, Experiential Learning, Growth Indonesia, Outbound Madiun, Company Gathering',
  openGraph: {
    title: 'Premium Corporate Outbound & HR Training | Growth Indonesia',
    description: 'Elevate your team\'s potential with proven experiential learning, team building, and leadership development programs.',
    url: 'https://growth-indonesia.com',
    siteName: 'Growth Indonesia',
    locale: 'id_ID',
    type: 'website',
    images: [
      {
        url: 'https://nafta121.sirv.com/Screenshot_20260430_171224_Chrome.jpg',
        width: 1200,
        height: 630,
        alt: 'Growth Indonesia - Corporate Outbound & HR Development',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Premium Corporate Outbound & HR Training | Growth Indonesia',
    description: 'Transform your corporate team with our premium experiential learning and HR development programs.',
    images: ['https://nafta121.sirv.com/Screenshot_20260430_171224_Chrome.jpg'],
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
