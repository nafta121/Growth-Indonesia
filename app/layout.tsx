import type { Metadata } from 'next';
import { Inter, Outfit } from 'next/font/google';
import Script from 'next/script';
import { GoogleTagManager } from '@next/third-parties/google';
import { WebMCPProvider } from '@/components/webmcp-provider';
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
  metadataBase: new URL('https://growthindonesia.my.id'),
  title: {
    default: 'Provider Outbound Madiun & Jawa Timur | Growth Indonesia',
    template: '%s | Growth Indonesia',
  },
  description: 'Growth Indonesia: Provider outbound Madiun & Jawa Timur terpercaya. Layanan profesional untuk outbound training, HR development, LDK OSIS & team building.',
  keywords: ['Outbound', 'Training', 'Outbound Training', 'Outbound Madiun', 'Outbound Jawa Timur', 'Provider Outbound Madiun', 'Provider Outbound Jawa Timur', 'LDK OSIS', 'Team Building'],
  alternates: {
    canonical: 'https://growthindonesia.my.id',
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
        url: 'https://pub-50a5fd46ec724773a854a130ecf7860c.r2.dev/LOGO/SVG%20LOGO%20GROWTH.svg',
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
    images: ['https://pub-50a5fd46ec724773a854a130ecf7860c.r2.dev/LOGO/SVG%20LOGO%20GROWTH.svg'],
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
  return (
    <html lang="id" className={`${inter.variable} ${outfit.variable}`}>
      <head>
        <link rel="preconnect" href="https://nafta121.sirv.com" />
        <link rel="dns-prefetch" href="https://nafta121.sirv.com" />
        <Script
          id="microsoft-clarity"
          strategy="afterInteractive"
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
          strategy="afterInteractive"
        />
      </head>
      <body suppressHydrationWarning className="font-sans antialiased bg-[#0A1628] text-white">
        <WebMCPProvider />
        {children}
        <GoogleTagManager gtmId="G-XXXXXXXXXX" />
      </body>
    </html>
  );
}
