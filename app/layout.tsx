import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, Outfit } from 'next/font/google';
import Script from 'next/script';
import { GoogleTagManager } from '@next/third-parties/google';
import { WebMCPProvider } from '@/components/webmcp-provider';
import './globals.css';

const plusJakartaSans = Plus_Jakarta_Sans({
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
  metadataBase: new URL('https://growthindonesia.my.id'),
  title: {
    default: 'Corporate Outbound, Team Building & Event Organizer Madiun | Growth Indonesia',
    template: '%s | Growth Indonesia',
  },
  description: 'Provider Corporate Outbound, Team Building, dan Event Organizer (EO) profesional di Madiun & Jawa Timur bersertifikat BNSP. Melayani corporate gathering, LDK OSIS & outdoor learning.',
  keywords: [
    'Event Organizer Madiun',
    'Corporate Outbound Madiun',
    'Team Building Madiun',
    'Outbound Jawa Timur',
    'Provider Outbound Madiun',
    'Corporate Gathering Madiun',
    'LDK OSIS Madiun',
    'Growth Indonesia',
  ],
  alternates: {
    canonical: 'https://growthindonesia.my.id',
  },
  openGraph: {
    title: 'Corporate Outbound, Team Building & Event Organizer Madiun | Growth Indonesia',
    description: 'Provider Corporate Outbound, Team Building, dan Event Organizer (EO) profesional di Madiun & Jawa Timur bersertifikat BNSP. Melayani corporate gathering, LDK OSIS & outdoor learning.',
    url: 'https://growthindonesia.my.id',
    siteName: 'Growth Indonesia',
    locale: 'id_ID',
    type: 'website',
    images: [
      {
        url: 'https://nafta121.sirv.com/OUTBOUND/2022-10-22%2009-00-09.jpeg',
        width: 1200,
        height: 630,
        alt: 'Corporate Outbound & Event Organizer Madiun - Growth Indonesia',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Corporate Outbound, Team Building & Event Organizer Madiun | Growth Indonesia',
    description: 'Provider Corporate Outbound, Team Building, dan Event Organizer (EO) profesional di Madiun & Jawa Timur bersertifikat BNSP. Melayani corporate gathering, LDK OSIS & outdoor learning.',
    images: ['https://nafta121.sirv.com/OUTBOUND/2022-10-22%2009-00-09.jpeg'],
  },
  // GEO & Bing Copilot Optimization:
  // Explicitly allow indexing, following, snippet generation, and caching for full AI grounding depth.
  // Strictly avoid NOARCHIVE or NOCACHE directives.
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/icon.png', type: 'image/png' },
      { url: '/icon.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/icon.png', sizes: '512x512', type: 'image/png' },
    ],
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
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': 'https://growthindonesia.my.id/#website',
    'name': 'Growth Indonesia',
    'alternateName': [
      'Provider Outbound Madiun',
      'Growth Indonesia Madiun',
      'Event Organizer Madiun'
    ],
    'url': 'https://growthindonesia.my.id/',
  };

  return (
    <html lang="id" className={`${plusJakartaSans.variable} ${outfit.variable}`}>
      <head>
        <link rel="preconnect" href="https://nafta121.sirv.com" />
        <link rel="dns-prefetch" href="https://nafta121.sirv.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        {/* Optimization: Using lazyOnload for non-critical third-party analytics scripts to improve initial load performance and Time to Interactive (TTI) */}
        <Script
          id="microsoft-clarity"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `
              (function(c,l,a,r,i,t,y){
                  c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                  t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i+"?ref=bwt";
                  y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "xwistj0ex8");
            `,
          }}
        />
        <Script
          src="https://static.cloudflareinsights.com/beacon.min.js"
          data-cf-beacon='{"token": "c16a501011484d829b65425d7d7743f9"}'
          strategy="lazyOnload"
        />
      </head>
      <body suppressHydrationWarning className="font-sans antialiased bg-[#0A1628] text-white">
        <WebMCPProvider />
        {children}
        {process.env.NEXT_PUBLIC_GTM_ID && (
          <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM_ID} />
        )}
      </body>
    </html>
  );
}
