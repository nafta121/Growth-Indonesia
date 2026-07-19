import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, User, Clock, ArrowRight, BookOpen } from 'lucide-react';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import WhatsAppFAB from '@/components/whatsapp-fab';
import { getAllArticles } from '@/lib/mdx';
import { COMPANY_INFO } from '@/lib/constants';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: `Artikel & Edukasi Outbound Terbaik | ${COMPANY_INFO.brand_name}`,
  description: `Kumpulan artikel, tips, panduan, dan edukasi seputar program outbound, training, team building, dan pengembangan SDM perusahaan dari ${COMPANY_INFO.brand_name}.`,
  alternates: {
    canonical: 'https://growthindonesia.my.id/artikel',
  },
  openGraph: {
    title: `Artikel & Edukasi Outbound Terbaik | ${COMPANY_INFO.brand_name}`,
    description: `Kumpulan artikel, tips, panduan, dan edukasi seputar program outbound, training, team building, dan pengembangan SDM perusahaan dari ${COMPANY_INFO.brand_name}.`,
    url: 'https://growthindonesia.my.id/artikel',
    type: 'website',
  }
};

export default function ArtikelHubPage() {
  const articles = getAllArticles();

  return (
    <div className="relative min-h-screen flex flex-col bg-[#0A1628] text-white">
      <Navbar />
      
      <main className="flex-grow pt-[72px] md:pt-[88px]">
        {/* Hub Hero Header */}
        <section className="relative py-20 md:py-28 bg-[#0A1628] overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628] via-brand/10 to-[#0A1628]" />
          </div>
          
          <div className="max-w-5xl mx-auto px-6 relative z-10 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
              <BookOpen className="w-5 h-5 text-brand" />
              <span className="text-xs md:text-sm font-bold text-slate-300 tracking-wider uppercase">Blog & Edukasi</span>
            </div>
            <h1 className="font-display text-4xl md:text-6xl font-black tracking-tight text-white mb-6 leading-tight">
              Edukasi & <span className="text-brand">Artikel Outbound</span>
            </h1>
            <p className="text-base md:text-xl text-slate-300 max-w-2xl mx-auto font-medium">
              Temukan insight strategis, panduan praktis, dan tips pengembangan SDM terpercaya dari fasilitator bersertifikat kami.
            </p>
          </div>
        </section>

        {/* Article Grid Section */}
        <section className="py-16 md:py-24 bg-slate-50 text-gray-900">
          <div className="max-w-7xl mx-auto px-6">
            {articles.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-3xl border border-gray-100 shadow-sm">
                <p className="text-lg text-slate-500 font-medium">Belum ada artikel yang dipublikasikan.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {articles.map((article) => (
                  <Link
                    key={article.slug}
                    href={`/artikel/${article.slug}`}
                    className="group flex flex-col bg-white rounded-3xl overflow-hidden border border-gray-100 hover:border-brand/30 hover:shadow-2xl hover:shadow-brand/5 hover:-translate-y-1.5 transition-all duration-300"
                  >
                    {/* Image */}
                    <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                      <Image
                        src={article.frontmatter.image}
                        alt={article.frontmatter.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                      {article.frontmatter.tags && article.frontmatter.tags[0] && (
                        <span className="absolute top-4 left-4 bg-[#0A1628] text-white text-xs font-bold px-3.5 py-1.5 rounded-full shadow-sm">
                          {article.frontmatter.tags[0]}
                        </span>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-6 md:p-8 flex flex-col flex-grow">
                      {/* Meta */}
                      <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-slate-500 mb-4">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-4 h-4 text-brand" />
                          <span>
                            {new Date(article.frontmatter.date).toLocaleDateString('id-ID', {
                              day: 'numeric',
                              month: 'short',
                              year: 'numeric'
                            })}
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-4 h-4 text-brand" />
                          <span>{article.frontmatter.readTime}</span>
                        </div>
                      </div>

                      {/* Title */}
                      <h2 className="font-display font-bold text-xl md:text-2xl text-gray-900 mb-3 group-hover:text-brand transition-colors line-clamp-2 leading-tight">
                        {article.frontmatter.title}
                      </h2>

                      {/* Description */}
                      <p className="text-slate-500 text-sm leading-relaxed mb-6 line-clamp-3 font-medium">
                        {article.frontmatter.description}
                      </p>

                      {/* Footer Link */}
                      <div className="mt-auto pt-5 border-t border-gray-100 flex items-center justify-between">
                        <div className="flex items-center gap-2 text-xs font-bold text-gray-700">
                          <User className="w-3.5 h-3.5 text-brand" />
                          <span>{article.frontmatter.author}</span>
                        </div>
                        <span className="inline-flex items-center text-xs font-extrabold text-[#EF4444] group-hover:text-red-700 uppercase tracking-wider">
                          Baca Lengkap
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
