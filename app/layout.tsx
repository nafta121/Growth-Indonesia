import type { Metadata } from 'next';
import { Inter, Outfit } from 'next/font/google';
import './globals.css';

// Konfigurasi Font Sans (Inter)
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

// Konfigurasi Font Display (Outfit) untuk Heading
const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://growthindonesia.my.id'),
  title: {
    default: 'Provider Outbound Madiun & Jawa Timur | Growth Indonesia',
    template: '%s | Growth Indonesia'
  },
  description: 'Growth Indonesia: Provider outbound Madiun & Jawa Timur terpercaya. Layanan profesional untuk outbound training, HR development, LDK OSIS & team building.',
  keywords: [
    'Outbound', 
    'Training', 
    'Outbound Training', 
    'Outbound Madiun', 
    'Outbound Jawa Timur', 
    'Provider Outbound Madiun', 
    'Provider Outbound Jawa Timur', 
    'LDK OSIS', 
    'Team Building'
  ],
  authors: [{ name: 'Growth Indonesia' }],
  creator: 'Growth Indonesia',
  publisher: 'Growth Indonesia',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
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
        alt: 'Growth Indonesia - Provider Outbound & Training SDM',
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
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  // Konfigurasi Ikon Statis dari folder public/ untuk menghindari Build Error
  icons: {
    icon: [
      { url: '/icon.png', type: 'image/png' },
      { url: '/icon.png', sizes: '32x32', type: 'image/png' },
      { url: '/icon.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: [
      { url: '/icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  // Verifikasi Kepemilikan Google Search Console
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
    <html lang="id" className={`${inter.variable} ${outfit.variable}`} suppressHydrationWarning>
      <body className="font-sans antialiased bg-[#0A1628] text-white">
        {children}
      </body>
    </html>
  );
}
