import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const PROJECT_ROOT = path.resolve(__dirname, '../../..');

export const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL || 'https://growthindonesia.my.id';

export const CITIES = [
  'madiun',
  'ponorogo',
  'magetan',
  'ngawi',
  'nganjuk',
  'pacitan',
  'kediri',
  'surabaya',
  'malang',
  'batu',
  'blitar',
  'tulungagung',
  'trenggalek',
  'bojonegoro',
  'tuban',
  'lamongan',
  'gresik',
  'sidoarjo',
  'mojokerto',
  'jombang',
  'pasuruan',
  'probolinggo',
  'lumajang',
  'jember',
  'bondowoso',
  'situbondo',
  'banyuwangi',
  'bangkalan',
  'sampang',
  'pamekasan',
  'sumenep',
];

export const CATEGORIES = [
  'outbound',
  'training',
  'fun-games',
  'ldk-osis',
  'gathering',
];

export const ARTICLES = [
  'membangun-karakter-pelajar-kemah-besar-smpn-1-geger-di-ndalem-prabu-sarangan',
  'pentingnya-team-building-untuk-produktivitas-karyawan',
  'smpn-1-geger-gelar-outdoor-learning-di-ndalem-prabu-sarangan-tanamkan-karakter-jiwa-nasionalisme',
  'tips-memilih-provider-outbound-profesional',
];

export const CORE_PAGES = [
  '/',
  '/layanan',
  '/portofolio-dan-sertifikasi',
  '/docs/api',
  '/404',
];

export const ROUTE_HANDLERS = [
  '/llms.txt',
  '/pricing.md',
  '/robots.txt',
  '/sitemap.xml',
  '/.well-known/agent-card.json',
  '/.well-known/api-catalog',
  '/.well-known/dns-aid',
  '/.well-known/mcp/server-card.json',
  '/api/indexnow',
  '/api/markdown',
];

export const INTERACTIVE_ISLANDS = [
  { file: 'navbar-mobile.tsx', directive: 'client:load' },
  { file: 'services-tabs.tsx', directive: 'client:visible' },
  { file: 'outbound-gallery-client.tsx', directive: 'client:visible' },
  { file: 'our-impact.tsx', directive: 'client:visible' },
  { file: 'kalkulator-budget.tsx', directive: 'client:visible' },
  { file: 'contact.tsx', directive: 'client:visible' },
];

export const STATIC_COMPONENTS = [
  'about-us.tsx',
  'ai-overview.tsx',
  'approach.tsx',
  'breadcrumb.tsx',
  'city-content.tsx',
  'city-cta.tsx',
  'city-hero.tsx',
  'credibility-portfolio.tsx',
  'footer.tsx',
  'hero.tsx',
  'latest-articles.tsx',
  'navbar.tsx',
  'nearby-cities.tsx',
  'outbound-gallery.tsx',
  'pricing.tsx',
  'service-areas.tsx',
  'services.tsx',
  'trust-section.tsx',
  'trust-signals.tsx',
  'webmcp-provider.tsx',
  'whatsapp-fab.tsx',
  'badge.tsx',
  'button.tsx',
  'input.tsx',
  'scroll-reveal.tsx',
  'content-variations.tsx',
];

export const HALLMARK_STAMP = '/* HALLMARK STAMP';
