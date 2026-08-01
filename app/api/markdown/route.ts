import { NextRequest, NextResponse } from 'next/server';
import { CITIES } from '@/lib/cities';
import { PACKAGES } from '@/lib/packages';
import { getAllArticles, getArticleBySlug } from '@/lib/mdx';

function estimateTokens(text: string): number {
  return Math.ceil(text.trim().length / 4);
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const targetPath = searchParams.get('path') || '/';

  let markdownContent = '';

  if (targetPath === '/' || targetPath === '') {
    markdownContent = `# Growth Indonesia - HR Development & Outbound Agency

> Leading HR development and outbound agency specializing in corporate, government, and educational growth solutions.

## Tentang Kami
Growth Indonesia adalah penyedia jasa HR development, outbound corporate, team building, dan leadership training terdepan. Kami membantu organisasi dan instansi meningkatkan sinergi, resiliensi, dan efisiensi tim.

## Paket Layanan Utama
${PACKAGES.map(
  (p) => `### ${p.title}
- **Harga**: ${p.price}
- **Deskripsi**: ${p.description}
- **Fitur**: ${p.features.join(', ')}`
).join('\n\n')}

## Wilayah Layanan Outbound
Kami melayani outbound & team building di berbagai wilayah:
${Object.entries(CITIES)
  .map(([slug, city]) => `- **[${city.name}](/layanan/${slug})**: ${city.description} (Venue: ${city.popularVenues.join(', ')})`)
  .join('\n')}

## Kontak & Pemesanan
- **Website**: https://growthindonesia.my.id
- **WhatsApp Direct**: https://wa.me/628123456789
- **Dokumentasi API & Agent Discovery**: [/docs/api](/docs/api)
- **Katalog API**: [/.well-known/api-catalog](/.well-known/api-catalog)
`;
  } else if (targetPath.startsWith('/layanan')) {
    const parts = targetPath.split('/').filter(Boolean);
    // parts[0] = 'layanan', parts[1] = city/category, parts[2] = category
    const citySlug = parts[1]?.toLowerCase();
    const categorySlug = parts[2]?.toLowerCase();

    if (citySlug && CITIES[citySlug]) {
      const city = CITIES[citySlug];
      markdownContent = `# Layanan Outbound & Team Building di ${city.name} - Growth Indonesia

## Overview
${city.description}

## Keunggulan Utama di ${city.name}
${city.uniqueSellingPoint}

## Rekomendasi Venue Popular
${city.popularVenues.map((v) => `- ${v}`).join('\n')}

${categorySlug ? `## Kategori Spesifik: ${categorySlug.toUpperCase()}\nProgram disesuaikan khusus untuk modul ${categorySlug} di ${city.name}.\n` : ''}

## Paket Program Tersedia
${PACKAGES.map((p) => `- **${p.title}** (${p.price}): ${p.description}`).join('\n')}

## Hubungi Kami
Siap mengadakan outbound di ${city.name}? Hubungi kami melalui WhatsApp untuk penawaran kustom.
`;
    } else {
      markdownContent = `# Layanan Outbound & HR Development - Growth Indonesia

Growth Indonesia menyediakan program outbound, leadership training, fun games, LDK OSIS, dan corporate gathering.

## Lokasi Layanan
${Object.entries(CITIES)
  .map(([slug, city]) => `- **${city.name}**: ${city.description}`)
  .join('\n')}

## Paket Program
${PACKAGES.map((p) => `- **${p.title}**: ${p.description}`).join('\n')}
`;
    }
  } else if (targetPath.startsWith('/artikel')) {
    const parts = targetPath.split('/').filter(Boolean);
    const slug = parts[1];

    if (slug) {
      const article = getArticleBySlug(slug);
      if (article) {
        markdownContent = `# ${article.frontmatter.title}

> **Penulis**: ${article.frontmatter.author} | **Tanggal**: ${article.frontmatter.date} | **Waktu Baca**: ${article.frontmatter.readTime}
> **Deskripsi**: ${article.frontmatter.description}
> **Tag**: ${article.frontmatter.tags.join(', ')}

---

${article.content}
`;
      } else {
        markdownContent = `# Artikel Tidak Ditemukan\n\nArtikel dengan slug \`${slug}\` tidak ditemukan.`;
      }
    } else {
      const articles = getAllArticles();
      markdownContent = `# Artikel & Edukasi - Growth Indonesia

Daftar panduan dan wawasan seputar outbound, team building, dan HR development:

${articles
  .map(
    (a) => `## [${a.frontmatter.title}](/artikel/${a.slug})
- **Tanggal**: ${a.frontmatter.date} | **Oleh**: ${a.frontmatter.author}
- **Ringkasan**: ${a.frontmatter.description}
`
  )
  .join('\n')}
`;
    }
  } else if (targetPath.startsWith('/docs/api')) {
    markdownContent = `# API & Agent Discovery Documentation - Growth Indonesia

> Dokumentasi standar HTTP Link Headers (RFC 8288), API Catalog (RFC 9727), DNS-AID (RFC 9460), dan Markdown for Agents.

## Standard Discovery Endpoints
- **API Catalog**: [/.well-known/api-catalog](/.well-known/api-catalog)
- **DNS-AID Config**: [/.well-known/dns-aid](/.well-known/dns-aid)
- **Sitemap XML**: [/sitemap.xml](/sitemap.xml)
- **Robots TXT**: [/robots.txt](/robots.txt)

## HTTP Link Response Headers (RFC 8288)
\`\`\`http
Link: </.well-known/api-catalog>; rel="api-catalog", </docs/api>; rel="service-doc", </sitemap.xml>; rel="sitemap"
\`\`\`

## Markdown for Agents Support
Agen otomatis yang mengirimkan header HTTP \`Accept: text/markdown\` akan menerima respon berupa format Markdown murni.

## DNS for AI Discovery (DNS-AID Records)
\`\`\`dns
_index._agents.growthindonesia.my.id. 3600 IN HTTPS 1 growthindonesia.my.id. alpn="h2,h3" port=443 path="/.well-known/api-catalog"
_a2a._agents.growthindonesia.my.id.   3600 IN HTTPS 1 growthindonesia.my.id. alpn="h2,h3" port=443 path="/docs/api"
\`\`\`
`;
  } else {
    markdownContent = `# Growth Indonesia

Permintaan untuk \`${targetPath}\`.

Kunjungi [Growth Indonesia Home](https://growthindonesia.my.id/) atau [/docs/api](/docs/api) untuk informasi selengkapnya.
`;
  }

  const tokens = estimateTokens(markdownContent);

  return new NextResponse(markdownContent, {
    status: 200,
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Vary': 'Accept',
      'x-markdown-tokens': tokens.toString(),
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': 'public, max-age=3600',
      'Link': '</.well-known/api-catalog>; rel="api-catalog", </docs/api>; rel="service-doc", </sitemap.xml>; rel="sitemap"',
    },
  });
}
