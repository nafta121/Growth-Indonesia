import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, User, Clock, ArrowRight } from 'lucide-react';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import WhatsAppFAB from '@/components/whatsapp-fab';
import { Breadcrumb } from '@/components/breadcrumb';
import { getAllArticles } from '@/lib/mdx';
import { COMPANY_INFO } from '@/lib/constants';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'Artikel & Edukasi Outbound Terbaik',
  description: `Kumpulan artikel, tips, panduan, dan edukasi seputar program outbound, training, team building, dan pengembangan SDM perusahaan dari ${COMPANY_INFO.brand_name}.`,
  alternates: {
    canonical: 'https://growthindonesia.my.id/artikel',
  },
  openGraph: {
    title: `Artikel & Edukasi Outbound Terbaik | ${COMPANY_INFO.brand_name}`,
    description: `Kumpulan artikel, tips, panduan, dan edukasi seputar program outbound, training, team building, dan pengembangan SDM perusahaan dari ${COMPANY_INFO.brand_name}.`,
    url: 'https://growthindonesia.my.id/artikel',
    siteName: COMPANY_INFO.brand_name,
    locale: 'id_ID',
    type: 'website',
    images: [
      {
        url: 'https://nafta121.sirv.com/OUTBOUND/2022-10-22%2009-00-09.jpeg',
        width: 1200,
        height: 630,
        alt: `Artikel & Edukasi Outbound - ${COMPANY_INFO.brand_name}`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `Artikel & Edukasi Outbound Terbaik | ${COMPANY_INFO.brand_name}`,
    description: `Kumpulan artikel, tips, panduan, dan edukasi seputar program outbound, training, team building, dan pengembangan SDM perusahaan dari ${COMPANY_INFO.brand_name}.`,
    images: ['https://nafta121.sirv.com/OUTBOUND/2022-10-22%2009-00-09.jpeg'],
  },
};

export default async function ArtikelHubPage() {
  const articles = await getAllArticles();

  const schemaLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': 'https://growthindonesia.my.id/artikel#webpage',
    'name': `Artikel & Edukasi Outbound Terbaik | ${COMPANY_INFO.brand_name}`,
    'description': `Kumpulan artikel, tips, panduan, dan edukasi seputar program outbound, training, team building, dan pengembangan SDM perusahaan dari ${COMPANY_INFO.brand_name}.`,
    'url': 'https://growthindonesia.my.id/artikel',
  };

  return (
    <div className="relative min-h-screen flex flex-col bg-navy text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaLd) }}
      />
      <Navbar />
      
      <main className="flex-grow pt-[72px] md:pt-[88px]">
        {/* Hub Hero Header */}
        <section className="relative py-20 md:py-28 bg-navy overflow-hidden">
          <div className="max-w-5xl mx-auto px-6 relative z-10 text-center flex flex-col items-center">
            <div className="mb-6">
              <Breadcrumb
                items={[
                  { label: 'Beranda', href: '/' },
                  { label: 'Artikel & Edukasi' },
                ]}
                variant="dark"
                includeSchema={true}
              />
            </div>

            <h1 className="font-display text-4xl md:text-6xl font-black tracking-tight text-white mb-6 leading-tight">
              Edukasi &amp; Artikel Outbound
            </h1>
            <p className="text-base md:text-xl text-navy-muted max-w-2xl mx-auto font-medium">
              Panduan praktis pengembangan SDM, team building, dan kepanitiaan dari praktisi lapangan.
            </p>
          </div>
        </section>

        {/* Article Grid Section */}
        <section className="py-16 md:py-24 bg-paper text-ink">
          <div className="max-w-7xl mx-auto px-6">
            {articles.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-3xl border border-rule shadow-sm">
                <p className="text-lg text-muted font-medium">Belum ada artikel yang dipublikasikan.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {articles.map((article) => (
                  <Link
                    key={article.slug}
                    href={`/artikel/${article.slug}`}
                    className="group flex flex-col bg-white rounded-3xl overflow-hidden border border-rule hover:border-brand/40 hover:shadow-lg hover:-translate-y-1.5 transition-[transform,border-color,box-shadow] duration-300"
                  >
                    {/* Image */}
                    <div className="relative aspect-[16/10] overflow-hidden bg-paper-2">
                      <Image
                        src={article.frontmatter.image}
                        alt={article.frontmatter.title}
                        fill
                        className="object-cover"
                        referrerPolicy="no-referrer"
                      />
                      {article.frontmatter.tags && article.frontmatter.tags[0] && (
                        <span className="absolute top-4 left-4 bg-navy text-white text-xs font-bold px-3.5 py-1.5 rounded-full shadow-sm">
                          {article.frontmatter.tags[0]}
                        </span>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-6 md:p-8 flex flex-col flex-grow">
                      {/* Meta */}
                      <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-muted mb-4">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-4 h-4 text-brand-dark" />
                          <span>
                            {new Date(article.frontmatter.date).toLocaleDateString('id-ID', {
                              day: 'numeric',
                              month: 'short',
                              year: 'numeric'
                            })}
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-4 h-4 text-brand-dark" />
                          <span>{article.frontmatter.readTime}</span>
                        </div>
                      </div>

                      {/* Title */}
                      <h2 className="font-display font-bold text-xl md:text-2xl text-ink mb-3 group-hover:text-brand-dark transition-colors line-clamp-2 leading-tight">
                        {article.frontmatter.title}
                      </h2>

                      {/* Description */}
                      <p className="text-muted text-sm leading-relaxed mb-6 line-clamp-3 font-medium">
                        {article.frontmatter.description}
                      </p>

                      {/* Footer Link */}
                      <div className="mt-auto pt-5 border-t border-rule flex items-center justify-between">
                        <div className="flex items-center gap-2 text-xs font-bold text-ink-2">
                          <User className="w-3.5 h-3.5 text-brand-dark" />
                          <span>{article.frontmatter.author}</span>
                        </div>
                        <span className="inline-flex items-center text-xs font-bold text-brand-dark group-hover:text-brand">
                          Baca selengkapnya
                          <ArrowRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-1 transition-transform" />
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppFAB />
    </div>
  );
}
