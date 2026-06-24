import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { ArrowLeft, Calendar, User, Clock, Tag, MessageSquare } from 'lucide-react';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import WhatsAppFAB from '@/components/whatsapp-fab';
import { getArticleBySlug, getArticleSlugs } from '@/lib/mdx';
import { COMPANY_INFO } from '@/lib/constants';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getArticleSlugs();
  return slugs.map((slug) => ({
    slug: slug.replace(/\.mdx$/, ''),
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  
  if (!article) {
    return {
      title: 'Artikel Tidak Ditemukan',
    };
  }

  const title = `${article.frontmatter.title} | ${COMPANY_INFO.brand_name}`;
  const description = article.frontmatter.description;

  return {
    title,
    description,
    alternates: {
      canonical: `https://growthindonesia.my.id/artikel/${slug}`,
    },
    robots: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
    },
    openGraph: {
      title,
      description,
      url: `https://growthindonesia.my.id/artikel/${slug}`,
      type: 'article',
      publishedTime: article.frontmatter.date,
      authors: [article.frontmatter.author],
      tags: article.frontmatter.tags,
      images: [
        {
          url: article.frontmatter.image,
          width: 1200,
          height: 630,
          alt: article.frontmatter.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [article.frontmatter.image],
    },
  };
}

export default async function ArtikelDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": article.frontmatter.title,
    "description": article.frontmatter.description,
    "image": article.frontmatter.image,
    "datePublished": article.frontmatter.date,
    "dateModified": article.frontmatter.date,
    "author": {
      "@type": "Person",
      "name": article.frontmatter.author
    },
    "publisher": {
      "@type": "Organization",
      "name": COMPANY_INFO.brand_name,
      "logo": {
        "@type": "ImageObject",
        "url": COMPANY_INFO.logo_url
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://growthindonesia.my.id/artikel/${slug}`
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col bg-[#0A1628] text-white">
      <Navbar />

      {/* Structured Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <main className="flex-grow pt-[72px] md:pt-[88px]">
        {/* Editorial Top Section */}
        <section className="relative py-16 md:py-24 bg-[#0A1628] overflow-hidden">
          <div className="absolute inset-0 z-0 opacity-20">
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628] via-brand/10 to-[#0A1628]" />
          </div>

          <div className="max-w-4xl mx-auto px-6 relative z-10">
            {/* Back to Hub */}
            <Link
              href="/artikel"
              className="inline-flex items-center gap-2 text-sm font-bold text-slate-300 hover:text-brand transition-colors mb-8 group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Kembali ke Artikel
            </Link>

            {/* Tags */}
            {article.frontmatter.tags && article.frontmatter.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {article.frontmatter.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-slate-300"
                  >
                    <Tag className="w-3 h-3 text-brand" />
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Title */}
            <h1 className="font-display text-3xl md:text-5xl font-black tracking-tight text-white mb-8 leading-tight">
              {article.frontmatter.title}
            </h1>

            {/* Meta Details */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-slate-300 font-medium">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-brand" />
                <span>
                  {new Date(article.frontmatter.date).toLocaleDateString('id-ID', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-brand" />
                <span>{article.frontmatter.readTime}</span>
              </div>
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-brand" />
                <span>{article.frontmatter.author}</span>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Image Banner */}
        <section className="bg-slate-50 relative">
          <div className="max-w-4xl mx-auto px-6 -mt-10 md:-mt-16 relative z-20">
            <div className="aspect-[21/10] w-full rounded-3xl overflow-hidden shadow-2xl relative bg-slate-100">
              <Image
                src={article.frontmatter.image}
                alt={article.frontmatter.title}
                fill
                priority
                className="object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </section>

        {/* Article Body Content */}
        <section className="py-16 md:py-24 bg-white text-gray-900">
          <div className="max-w-4xl mx-auto px-6">
            <div className="prose prose-slate prose-lg md:prose-xl max-w-none hover:prose-headings:text-brand prose-headings:font-display prose-headings:font-extrabold prose-a:text-brand">
              <MDXRemote source={article.content} />
            </div>

            {/* Bottom In-Article CTA Banner */}
            <div className="mt-16 p-8 md:p-12 bg-gradient-to-br from-[#0A1628] to-[#12243e] text-white rounded-3xl border border-white/5 relative overflow-hidden shadow-xl">
              <div className="absolute top-0 right-0 w-64 h-64 bg-brand/10 rounded-full blur-3xl" />
              <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
                <div>
                  <h3 className="font-display font-black text-2xl md:text-3xl tracking-tight mb-3">
                    Konsultasikan Kebutuhan Tim Anda!
                  </h3>
                  <p className="text-slate-300 max-w-lg font-medium text-sm md:text-base">
                    Dapatkan rancangan proposal kustom dan penawaran draf RAB gratis dari fasilitator bersertifikat kami sekarang juga.
                  </p>
                </div>
                <div className="shrink-0">
                  <a
                    href={`https://wa.me/${COMPANY_INFO.whatsapp_number}?text=Halo%20Growth%20Indonesia%2C%20saya%20tertarik%20dengan%20layanan%20outbound%20corporate%20training%20setelah%20membaca%20artikel%20Anda.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-brand hover:bg-brand-dark text-white font-extrabold px-6 py-4 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-brand/20 text-sm md:text-base uppercase tracking-wider"
                  >
                    <MessageSquare className="w-5 h-5 fill-current" />
                    Hubungi via WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppFAB />
    </div>
  );
}
