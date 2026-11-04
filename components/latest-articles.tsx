import React from 'react';
import { Calendar, Clock, ArrowRight } from 'lucide-react';

export interface ArticleMeta {
  slug: string;
  frontmatter: {
    title: string;
    date: string;
    description: string;
    image: string;
    tags?: string[];
    author?: string;
    readTime: string;
  };
}

export interface LatestArticlesProps {
  articles?: ArticleMeta[];
}

export default function LatestArticles({ articles = [] }: LatestArticlesProps) {
  const displayArticles = articles.slice(0, 3);

  if (displayArticles.length === 0) {
    return null;
  }

  return (
    <section className="py-20 md:py-28 bg-paper border-t border-rule">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-display text-3xl md:text-5xl font-black tracking-tight text-ink mb-4">
            Jurnal &amp; Insight Outbound
          </h2>
          <p className="text-base md:text-lg text-muted font-medium">
            Temukan insight terbaru, strategi andal, dan tips praktis seputar pengembangan SDM dan program outbound terbaik dari kami.
          </p>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {displayArticles.map((article) => (
            <a
              key={article.slug}
              href={`/artikel/${article.slug}`}
              className="group flex flex-col bg-white rounded-3xl overflow-hidden border border-rule hover:border-brand/40 hover:shadow-lg [@media(hover:hover)_and_(pointer:fine)]:hover:-translate-y-1 transition-[transform,box-shadow,border-color] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)]"
            >
              {/* Image Container */}
              <div className="relative aspect-[16/10] overflow-hidden bg-paper-2">
                <img
                  src={article.frontmatter.image}
                  alt={article.frontmatter.title}
                  decoding="async"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Card Body */}
              <div className="p-6 md:p-8 flex flex-col flex-grow">
                {/* Meta */}
                <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-muted mb-3">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-brand-dark" />
                    <span>
                      {new Date(article.frontmatter.date).toLocaleDateString('id-ID', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-brand-dark" />
                    <span>{article.frontmatter.readTime}</span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="font-display font-bold text-xl text-ink mb-2 group-hover:text-brand-dark transition-colors duration-150 line-clamp-2 leading-tight">
                  {article.frontmatter.title}
                </h3>

                {/* Description */}
                <p className="text-muted text-sm leading-relaxed mb-6 line-clamp-3 font-medium">
                  {article.frontmatter.description}
                </p>

                {/* Baca Selengkapnya Link */}
                <span className="mt-auto inline-flex items-center text-xs font-bold text-brand-dark group-hover:text-brand">
                  Baca selengkapnya
                  <ArrowRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-1 transition-transform duration-150 ease-[cubic-bezier(0.23,1,0.32,1)]" />
                </span>
              </div>
            </a>
          ))}
        </div>

        {/* Central Hub CTA */}
        <div className="text-center">
          <a
            href="/artikel"
            className="inline-flex items-center justify-center bg-navy hover:bg-navy-2 text-white font-bold px-8 py-4 rounded-2xl transition-[transform,background-color,box-shadow] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.98] hover:shadow-md text-sm md:text-base whitespace-nowrap"
          >
            Lihat Semua Artikel
            <ArrowRight className="w-4 h-4 ml-2" />
          </a>
        </div>
      </div>
    </section>
  );
}
