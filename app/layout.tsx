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
  description: 'Growth Indonesia: Provider outbound Madiun & Jawa Timur terpercaya. Layanan profesional untuk outbound training, HR development, LDK OSIS & team building.',
  keywords: ['Outbound', 'Training', 'Outbound Training', 'Outbound Madiun', 'Outbound Jawa Timur', 'Provider Outbound Madiun', 'Provider Outbound Jawa Timur', 'LDK OSIS', 'Team Building'],
  openGraph: {
    title: 'Provider Outbound Madiun & Jawa Timur | Growth Indonesia',
    description: 'Growth Indonesia: Provider outbound Madiun & Jawa Timur terpercaya. Layanan profesional untuk outbound training, HR development, LDK OSIS & team building.',
    url: 'https://growthindonesia.my.id',
    siteName: 'Growth Indonesia',
    locale: 'id_ID',
    type: 'website',
    images: [
      {
        url: 'https://nafta121.sirv.com/Screenshot_20260430_171224_Chrome.jpg',
        width: 1200,
        height: 630,
        alt: 'Provider Outbound Madiun & Jawa Timur - Growth Indonesia',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Provider Outbound Madiun & Jawa Timur | Growth Indonesia',
    description: 'Growth Indonesia: Provider outbound Madiun & Jawa Timur terpercaya. Layanan profesional untuk outbound training, HR development, LDK OSIS & team building.',
    images: ['https://nafta121.sirv.com/Screenshot_20260430_171224_Chrome.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: 'https://nafta121.sirv.com/1777610357326.png',
    shortcut: 'https://nafta121.sirv.com/1777610357326.png',
    apple: 'https://nafta121.sirv.com/1777610357326.png',
  },
  verification: {
    google: '9tNB4XyeDckwcV1Iau651TCM4PfD-IW3Dnyna-_aZj8',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={`${inter.variable} ${outfit.variable}`}>
      <body suppressHydrationWarning className="font-sans antialiased bg-[#0A1628] text-white">
        {children}
      </body>
    </html>
  );
}
