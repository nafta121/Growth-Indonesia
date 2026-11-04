import { Metadata } from 'next';
import { notFound, permanentRedirect } from 'next/navigation';
import Link from 'next/link';
import { MapPin, ArrowRight, CheckCircle2 } from 'lucide-react';
import { CITIES } from '@/lib/cities';
import { getCityImage } from '@/lib/city-images';
import { KATEGORI, getLegacyServiceRedirect } from '@/lib/categories';
import { COMPANY_INFO } from '@/lib/constants';
import { getContentVariations } from '@/lib/content-variations';
import { getLocalBusinessSchema } from '@/lib/schema';
import { formatSlug } from '@/lib/format';
import TrustSection from '@/components/trust-section';
import CityCta from '@/components/city-cta';
import { Breadcrumb } from '@/components/breadcrumb';

type Props = {
  params: Promise<{ kota: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { kota } = await params;
  const decodedKota = decodeURIComponent(kota).toLowerCase();
  const cityData = CITIES[decodedKota];
  
  if (!cityData) {
    const redirectUrl = getLegacyServiceRedirect(decodedKota);
    if (redirectUrl) {
      permanentRedirect(redirectUrl);
    }
    notFound();
  }

  const kotaName = formatSlug(decodedKota);
  const title = `Layanan Outbound & Event Organizer di ${kotaName}`;
  const fullTitle = `${title} | ${COMPANY_INFO.brand_name}`;
  const description = `Provider outbound & event organizer (EO) profesional di ${kotaName}. Melayani corporate gathering, team building, LDK OSIS & fun games di ${kotaName}. Konsultasi gratis!`;
  const cityImage = getCityImage(decodedKota);
  const canonicalUrl = `https://growthindonesia.my.id/layanan/${decodedKota}`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'id-ID': canonicalUrl,
      },
    },
    robots: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
    },
    openGraph: {
      title: fullTitle,
      description,
      url: canonicalUrl,
      siteName: COMPANY_INFO.brand_name,
      locale: 'id_ID',
      type: 'website',
      images: [
        {
          url: cityImage,
          width: 1200,
          height: 630,
          alt: `Layanan Outbound & Event Organizer di ${kotaName} - ${COMPANY_INFO.brand_name}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [cityImage],
    },
  };
}

export async function generateStaticParams() {
  return Object.keys(CITIES).map((kota) => ({ kota }));
}

export const revalidate = 3600;

export default async function CityHubPage({ params }: Props) {
  const { kota } = await params;
  const decodedKota = decodeURIComponent(kota).toLowerCase();
  const cityData = CITIES[decodedKota];

  if (!cityData) {
    const redirectUrl = getLegacyServiceRedirect(decodedKota);
    if (redirectUrl) {
      permanentRedirect(redirectUrl);
    }
    notFound();
  }

  const kotaName = formatSlug(decodedKota);

  const schemaLd = [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "@id": `https://growthindonesia.my.id/layanan/${decodedKota}#webpage`,
      "name": `Layanan Outbound & Event Organizer di ${kotaName}`,
      "description": cityData.description,
      "url": `https://growthindonesia.my.id/layanan/${decodedKota}`,
      "about": {
        "@type": "Place",
        "name": kotaName
      }
    },
    {
      "@context": "https://schema.org",
      ...getLocalBusinessSchema(kotaName),
      "image": getCityImage(decodedKota),
      "description": `Provider Outbound Training, Team Building, dan Event Organizer (EO) profesional di ${kotaName}. ${cityData.uniqueSellingPoint}`,
      "knowsAbout": cityData.popularVenues,
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": `Katalog Layanan Outbound & Event Organizer ${kotaName}`,
        "itemListElement": KATEGORI.map((kategori, index) => ({
          "@type": "OfferCatalog",
          "position": index + 1,
          "name": `${formatSlug(kategori)} ${kotaName}`,
          "url": `https://growthindonesia.my.id/layanan/${decodedKota}/${kategori}`
        }))
      }
    }
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaLd) }}
      />
      <main className="flex-1 w-full flex flex-col pt-[72px] md:pt-[88px]">
        <article itemScope itemType="https://schema.org/ProfessionalService">
          <meta itemProp="name" content={`Layanan Outbound & Event Organizer di ${kotaName}`} />
          <meta itemProp="description" content={`Provider outbound & event organizer (EO) profesional di ${kotaName}. ${cityData.description}`} />
          <meta itemProp="provider" content={COMPANY_INFO.brand_name} />
          <meta itemProp="areaServed" content={kotaName} />
          <meta itemProp="award" content="Fasilitator & Praktisi Experiential Learning Berpengalaman" />
          <meta itemProp="serviceType" content="Corporate Outbound, Team Building & Event Organizer" />

          {/* City Hub Hero */}
          <section className="relative pt-20 pb-20 md:pt-32 md:pb-28 bg-navy overflow-hidden">
            <div className="max-w-5xl mx-auto px-4 md:px-12 relative z-10 text-center flex flex-col items-center">
              <div className="mb-6">
                <Breadcrumb
                  items={[
                    { label: 'Beranda', href: '/' },
                    { label: 'Layanan', href: '/layanan' },
                    { label: kotaName },
                  ]}
                  variant="dark"
                  includeSchema={true}
                />
              </div>

              <h1 className="font-display text-4xl sm:text-5xl md:text-7xl font-black tracking-tight text-white mb-6 leading-tight">
                Outbound &amp; Event Organizer {kotaName}
              </h1>
              <p className="text-lg md:text-2xl text-navy-muted font-medium leading-relaxed max-w-3xl mx-auto">
                Program outbound, team building, dan event organizer profesional di wilayah {kotaName}.
              </p>
            </div>
          </section>

          {/* Kategori Layanan List */}
          <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 md:px-12">
              <div className="text-center mb-16">
                <h2 className="font-display text-3xl md:text-4xl font-black tracking-tight text-ink mb-4">
                  Pilih Kategori Program
                </h2>
                <p className="text-lg text-muted max-w-3xl mx-auto font-medium">
                  {cityData.description} Jelajahi 5 solusi pelatihan dan event organizer profesional yang tersedia di area {kotaName}.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {KATEGORI.map((kategori) => {
                  const kategoriName = formatSlug(kategori);
                  const variation = getContentVariations(kategori, kotaName);
                  return (
                    <Link
                      key={kategori}
                      href={`/layanan/${decodedKota}/${kategori}`}
                      className="group flex flex-col bg-paper rounded-3xl overflow-hidden border border-rule hover:border-brand/40 hover:shadow-lg hover:-translate-y-1 transition-[transform,border-color,box-shadow] duration-300"
                    >
                      <div className="p-8 pb-6 flex-grow">
                        <div className="w-14 h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center text-brand-dark mb-6 border border-rule group-hover:bg-brand-dark group-hover:text-white transition-colors">
                          <CheckCircle2 className="w-7 h-7" />
                        </div>
                        <h3 className="font-display font-bold text-2xl text-ink mb-3 group-hover:text-brand-dark transition-colors">
                          {kategoriName} {kotaName}
                        </h3>
                        <p className="text-ink-2 font-medium leading-relaxed mb-4">
                          {variation.bodyIntro}
                        </p>
                        <ul className="space-y-1.5 text-sm text-muted font-medium">
                          {variation.deliverables.slice(0, 2).map((item, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-brand-dark mt-2 shrink-0" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="px-8 py-5 border-t border-rule bg-white group-hover:bg-brand-tint/40 transition-colors flex items-center justify-between">
                        <span className="font-bold text-ink group-hover:text-brand-dark text-sm">Lihat Detail Program {kategoriName}</span>
                        <ArrowRight className="w-5 h-5 text-muted group-hover:text-brand-dark group-hover:translate-x-1 transition-transform" />
                      </div>
                    </Link>
                  )
                })}
              </div>
            </div>
          </section>

          {/* Local Information Context & Popular Venues */}
          <section className="py-20 bg-paper border-t border-rule">
            <div className="max-w-5xl mx-auto px-4 md:px-12">
              <div className="text-center mb-12">
                <h2 className="font-display text-3xl md:text-4xl font-black text-ink mb-6">
                  Keunggulan Lokasi &amp; Rekomendasi Venue di {kotaName}
                </h2>
                <p className="text-lg text-muted leading-relaxed font-medium max-w-3xl mx-auto">
                  {cityData.uniqueSellingPoint} Kami mengombinasikan akses ke berbagai lokasi strategis di {kotaName} dengan metode experiential learning yang teruji.
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {cityData.popularVenues.map((venue, idx) => (
                  <div
                    key={idx}
                    className="bg-white p-6 rounded-2xl border border-rule shadow-sm flex items-start gap-3"
                  >
                    <MapPin className="w-5 h-5 text-brand-dark shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-bold text-ink text-base leading-snug">
                        {venue}
                      </h3>
                      <p className="text-xs font-semibold text-muted mt-1 num">
                        Rekomendasi venue #{idx + 1}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </article>

        <TrustSection kategoriName="Program" kotaName={kotaName} />
        <CityCta kategoriName="Outbound & Training" kotaName={kotaName} />
      </main>
    </>
  );
}
