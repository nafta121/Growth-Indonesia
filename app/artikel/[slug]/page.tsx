import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { ArrowLeft, Calendar, User, Clock, Tag, MessageSquare } from 'lucide-react';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import WhatsAppFAB from '@/components/whatsapp-fab';
import { Breadcrumb } from '@/components/breadcrumb';
import { getArticleBySlug, getArticleSlugs } from '@/lib/mdx';
import { COMPANY_INFO } from '@/lib/constants';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getArticleSlugs();
  return slugs.map((slug) => ({
    slug: slug.replace(/\.mdx$/, ''),
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  
  if (!article) {
    return {
      title: 'Artikel Tidak Ditemukan',
    };
  }

  const title = article.frontmatter.title;
  const fullTitle = `${title} | ${COMPANY_INFO.brand_name}`;
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
      title: fullTitle,
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
      title: fullTitle,
      description,
      images: [article.frontmatter.image],
    },
  };
}

export default async function ArtikelDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const articleDate = article.frontmatter.date || '2026-06-24';

  const blogPostingSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `https://growthindonesia.my.id/artikel/${slug}#article`,
    "headline": article.frontmatter.title,
    "description": article.frontmatter.description,
    "image": [article.frontmatter.image],
    "datePublished": articleDate,
    "dateModified": articleDate,
    "author": {
      "@type": "Person",
      "name": article.frontmatter.author && article.frontmatter.author !== 'Admin' && article.frontmatter.author !== 'Tim Growth Indonesia'
        ? article.frontmatter.author
        : "Naftalyndho Mycha Grace Mirawandi",
      "jobTitle": "Lead Facilitator & Master Trainer",
      "worksFor": {
        "@type": "Organization",
        "name": COMPANY_INFO.brand_name
      }
    },
    "publisher": {
      "@type": "Organization",
      "name": COMPANY_INFO.brand_name,
      "url": "https://growthindonesia.my.id",
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
    <div className="relative min-h-screen flex flex-col bg-navy text-white">
      <Navbar />

      {/* Structured Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingSchema) }}
      />

      <main className="flex-grow pt-[72px] md:pt-[88px]">
        {/* Editorial Top Section */}
        <section className="relative pt-20 pb-36 md:pt-28 md:pb-48 bg-navy overflow-hidden">
          <div className="max-w-4xl mx-auto px-6 relative z-10">
            {/* Breadcrumb Navigation */}
            <div className="mb-8">
              <Breadcrumb
                items={[
                  { label: 'Beranda', href: '/' },
                  { label: 'Artikel', href: '/artikel' },
                  { label: article.frontmatter.title },
                ]}
                variant="dark"
                includeSchema={true}
              />
            </div>

            {/* Back to Hub */}
            <Link
              href="/artikel"
              className="inline-flex items-center gap-2 text-sm font-bold text-navy-muted hover:text-brand transition-colors mb-10 group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Kembali ke Artikel
            </Link>

            {/* Tags */}
            {article.frontmatter.tags && article.frontmatter.tags.length > 0 && (
              <div className="flex flex-wrap gap-2.5 mb-8">
                {article.frontmatter.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-navy-2 border border-navy-border text-xs font-semibold text-white transition-colors"
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
            <div className="flex flex-wrap items-center gap-6 text-sm text-navy-muted font-medium pt-6 border-t border-navy-border">
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
        <section className="bg-paper relative pb-4">
          <div className="max-w-4xl mx-auto px-6 -mt-24 md:-mt-32 relative z-20">
            <div className="aspect-[21/10] w-full rounded-3xl overflow-hidden shadow-md relative bg-paper-2 border border-navy-border">
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
        <section className="py-16 md:py-24 bg-white text-ink">
          <div className="max-w-4xl mx-auto px-6">
            <div className="prose prose-slate prose-lg md:prose-xl max-w-none hover:prose-headings:text-brand-dark prose-headings:font-display prose-headings:font-extrabold prose-a:text-brand-dark">
              <MDXRemote source={article.content} />
            </div>

            {/* Bottom In-Article CTA Banner */}
            <div className="mt-16 p-8 md:p-12 bg-navy text-white rounded-3xl border border-navy-border relative overflow-hidden shadow-md">
              <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
                <div>
                  <h3 className="font-display font-black text-2xl md:text-3xl tracking-tight mb-3">
                    Konsultasikan Kebutuhan Tim Anda!
                  </h3>
                  <p className="text-navy-muted max-w-lg font-medium text-sm md:text-base mb-5">
                    Dapatkan rancangan proposal kustom dan penawaran draf RAB gratis dari Master Trainer &amp; fasilitator berpengalaman kami sekarang juga.
                  </p>
                  <div className="flex flex-wrap gap-2 text-xs font-bold">
                    <Link href="/layanan/madiun/outbound" className="px-3 py-1.5 rounded-full bg-navy-2 border border-navy-border hover:bg-brand-dark text-white transition-colors">
                      Outbound Madiun
                    </Link>
                    <Link href="/layanan/magetan/outbound" className="px-3 py-1.5 rounded-full bg-navy-2 border border-navy-border hover:bg-brand-dark text-white transition-colors">
                      Outbound Sarangan Magetan
                    </Link>
                    <Link href="/layanan/madiun/ldk-osis" className="px-3 py-1.5 rounded-full bg-navy-2 border border-navy-border hover:bg-brand-dark text-white transition-colors">
                      LDK OSIS &amp; Sekolah
                    </Link>
                    <Link href="/layanan/madiun/gathering" className="px-3 py-1.5 rounded-full bg-navy-2 border border-navy-border hover:bg-brand-dark text-white transition-colors">
                      Corporate Gathering
                    </Link>
                    <Link href="/pricing.md" className="px-3 py-1.5 rounded-full bg-navy-2 border border-navy-border hover:bg-brand-dark text-white transition-colors">
                      Referensi Harga (pricing.md)
                    </Link>
                  </div>
                </div>
                <div className="shrink-0">
                  <a
                    href={`https://wa.me/${COMPANY_INFO.whatsapp_number}?text=Halo%20Growth%20Indonesia%2C%20saya%20tertarik%20dengan%20layanan%20outbound%20corporate%20training%20setelah%20membaca%20artikel%20Anda.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-brand-dark hover:bg-brand text-white font-bold px-6 py-4 rounded-xl transition-colors duration-200 text-sm md:text-base whitespace-nowrap"
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
