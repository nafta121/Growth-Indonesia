import { CITIES, CATEGORIES, ARTICLES, BASE_URL } from './constants.mjs';

/**
 * Returns all 194 content pages of the Growth Indonesia application.
 * Composition:
 * - 4 Core static content pages: /, /layanan, /portofolio-dan-sertifikasi, /docs/api
 * - 4 Article detail pages: /artikel/[slug]
 * - 31 Regional city hubs: /layanan/[kota]
 * - 155 Programmatic SEO (pSEO) pages: /layanan/[kota]/[kategori] (31 x 5)
 * Total: 4 + 4 + 31 + 155 = 194 pages.
 * Note: /artikel (article index) and /404 (error page) are supplemental hub/error pages.
 */
export function getAll194Pages() {
  const pages = [];

  // 1. Core static content pages (4)
  pages.push('/');
  pages.push('/layanan');
  pages.push('/portofolio-dan-sertifikasi');
  pages.push('/docs/api');

  // 2. Article detail pages (4)
  for (const slug of ARTICLES) {
    pages.push(`/artikel/${slug}`);
  }

  // 3. City hubs (31)
  for (const city of CITIES) {
    pages.push(`/layanan/${city}`);
  }

  // 4. pSEO pages (155)
  for (const city of CITIES) {
    for (const kategori of CATEGORIES) {
      pages.push(`/layanan/${city}/${kategori}`);
    }
  }

  return pages;
}

/**
 * Returns all pages including article index and error page (196 total routes).
 */
export function getAllPagesIncludingIndex() {
  const pages = getAll194Pages();
  pages.push('/artikel');
  pages.push('/404');
  return pages;
}

/**
 * Returns the full list of URLs expected in the sitemap.xml.
 * 194 content pages + /artikel + /llms.txt + /pricing.md = 197 entries (or 196 without /artikel).
 */
export function getExpectedSitemapEntries(baseUrl = BASE_URL) {
  const cleanBase = baseUrl.replace(/\/$/, '');
  const entries = [
    { url: `${cleanBase}/`, priority: 1.0, changeFrequency: 'weekly' },
    { url: `${cleanBase}/llms.txt`, priority: 0.8, changeFrequency: 'weekly' },
    { url: `${cleanBase}/pricing.md`, priority: 0.8, changeFrequency: 'weekly' },
    { url: `${cleanBase}/layanan`, priority: 0.9, changeFrequency: 'weekly' },
    { url: `${cleanBase}/portofolio-dan-sertifikasi`, priority: 0.9, changeFrequency: 'weekly' },
    { url: `${cleanBase}/artikel`, priority: 0.8, changeFrequency: 'weekly' },
    { url: `${cleanBase}/docs/api`, priority: 0.6, changeFrequency: 'monthly' },
  ];

  for (const city of CITIES) {
    entries.push({
      url: `${cleanBase}/layanan/${city}`,
      priority: 0.8,
      changeFrequency: 'weekly',
    });
  }

  for (const city of CITIES) {
    for (const kategori of CATEGORIES) {
      entries.push({
        url: `${cleanBase}/layanan/${city}/${kategori}`,
        priority: 0.7,
        changeFrequency: 'monthly',
      });
    }
  }

  for (const slug of ARTICLES) {
    entries.push({
      url: `${cleanBase}/artikel/${slug}`,
      priority: 0.7,
      changeFrequency: 'weekly',
    });
  }

  return entries;
}
