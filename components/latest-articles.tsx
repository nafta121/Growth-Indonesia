import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Clock, ArrowRight, BookOpen } from 'lucide-react';
import { getAllArticles } from '@/lib/mdx';

export default function LatestArticles() {
  const articles = getAllArticles().slice(0, 3);

  if (articles.length === 0) {
    return null;
  }

  return (
    <section className="py-20 md:py-28 bg-gray-50 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/5 border border-red-500/10 mb-4">
            <BookOpen className="w-4 h-4 text-[#EF4444]" />
            <span className="text-xs font-bold text-slate-600 tracking-wider uppercase">Resource Center</span>
          </div>
          <h2 className="font-display text-3xl md:text-5xl font-black tracking-tight text-gray-900 mb-4">
            Growth <span className="text-[#EF4444]">Insight</span>
          </h2>
          <p className="text-base md:text-lg text-slate-500 font-medium">
            Temukan insight terbaru, strategi andal, dan tips praktis seputar pengembangan SDM dan program outbound terbaik dari kami.
          </p>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {articles.map((article) => (
            <Link
              key={article.slug}
              href={`/artikel/${article.slug}`}
              className="group flex flex-col bg-white rounded-3xl overflow-hidden border border-gray-100 hover:border-red-500/20 hover:shadow-2xl hover:shadow-red-500/5 hover:-translate-y-1.5 transition-all duration-300"
            >
              {/* Image Container */}
              <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                <Image
                  src={article.frontmatter.image}
                  alt={article.frontmatter.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Card Body */}
              <div className="p-6 md:p-8 flex flex-col flex-grow">
                {/* Meta */}
                <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-slate-500 mb-3">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-[#EF4444]" />
                    <span>
                      {new Date(article.frontmatter.date).toLocaleDateString('id-ID', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric'
                      })}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-[#EF4444]" />
                    <span>{article.frontmatter.readTime}</span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="font-display font-bold text-xl text-gray-900 mb-2 group-hover:text-[#EF4444] transition-colors line-clamp-2 leading-tight">
                  {article.frontmatter.title}
                </h3>

                {/* Description */}
                <p className="text-slate-500 text-sm leading-relaxed mb-6 line-clamp-3 font-medium">
                  {article.frontmatter.description}
                </p>

                {/* Baca Selengkapnya Link */}
                <span className="mt-auto inline-flex items-center text-xs font-extrabold text-[#EF4444] group-hover:text-red-700 uppercase tracking-wider">
                  Baca Selengkapnya
                  <ArrowRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Central Hub CTA */}
        <div className="text-center">
          <Link
            href="/artikel"
            className="inline-flex items-center justify-center bg-[#0A1628] hover:bg-slate-800 text-white font-extrabold px-8 py-4 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-red-500/5 text-sm md:text-base uppercase tracking-wider"
          >
            Lihat Semua Artikel
            <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </div>

      </div>
    </section>
  );
}
