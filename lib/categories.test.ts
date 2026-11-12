import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { KATEGORI, CATEGORIES_SET, getLegacyServiceRedirect } from './categories';
import { getNearbyCities } from './city-proximity';
import { PACKAGES } from './packages';
import { getContentVariations } from './content-variations';
import {
  getLocalBusinessSchema,
  getCityServiceFaqs,
  getFaqSchema,
  getServiceSchema,
  HOMEPAGE_FAQS,
} from './schema';
import { INDEXNOW_KEY, MAX_INDEXNOW_BATCH_SIZE } from './indexnow';
import { getArticleBySlug } from './mdx';
import { GET as getLlmsTxt } from '../src/pages/llms.txt';
import { GET as getPricingMd } from '../src/pages/pricing.md';
import { GET as getMarkdown } from '../src/pages/api/markdown';
import { POST as postIndexNow } from '../src/pages/api/indexnow';
import { GET as getRobotsTxt } from '../src/pages/robots.txt';
import { GET as getSitemapXml } from '../src/pages/sitemap.xml';
import { GET as getAgentCard } from '../src/pages/.well-known/agent-card.json';
import { GET as getApiCatalog } from '../src/pages/.well-known/api-catalog';
import { GET as getDnsAid } from '../src/pages/.well-known/dns-aid';
import { GET as getMcpServerCard } from '../src/pages/.well-known/mcp/server-card.json';

describe('KATEGORI & CATEGORIES_SET', () => {
  it('contains all 5 canonical category slugs', () => {
    assert.deepEqual(KATEGORI, [
      'outbound',
      'training',
      'fun-games',
      'ldk-osis',
      'gathering',
    ]);
    for (const slug of KATEGORI) {
      assert.equal(CATEGORIES_SET.has(slug), true);
    }
  });

  it('rejects non-canonical category slugs', () => {
    assert.equal(CATEGORIES_SET.has('outbound-team-building'), false);
    assert.equal(CATEGORIES_SET.has('gathering-corporate'), false);
    assert.equal(CATEGORIES_SET.has('ldk-osis-sekolah'), false);
    assert.equal(CATEGORIES_SET.has('event-organizer-eo'), false);
  });
});

describe('PACKAGES pricing alignment with DESIGN.md', () => {
  it('matches DESIGN.md featured package prices', () => {
    const leaders = PACKAGES.find((p) => p.id === 'leaders');
    const generation = PACKAGES.find((p) => p.id === 'generation');
    const fun = PACKAGES.find((p) => p.id === 'fun');

    assert.equal(leaders?.price, 'Rp. 9.500.000');
    assert.equal(generation?.price, 'Rp. 7.000.000');
    assert.equal(fun?.price, 'Rp. 5.500.000');
  });
});

describe('/llms.txt AI grounding route', () => {
  it('returns status 200 and canonical /layanan/madiun/{kategori} URLs', async () => {
    const response = await getLlmsTxt({} as any);
    assert.equal(response.status, 200);
    const body = await response.text();

    assert.match(body, /https:\/\/growthindonesia\.my\.id\/layanan\/madiun\/outbound/);
    assert.match(body, /https:\/\/growthindonesia\.my\.id\/layanan\/madiun\/training/);
    assert.match(body, /https:\/\/growthindonesia\.my\.id\/layanan\/madiun\/gathering/);
    assert.match(body, /https:\/\/growthindonesia\.my\.id\/layanan\/madiun\/ldk-osis/);
    assert.match(body, /https:\/\/growthindonesia\.my\.id\/layanan\/madiun\/fun-games/);
  });
});

describe('SEO Audit & Programmatic SEO regression checks', () => {
  it('provides bespoke content variations with unique bodyIntro and 4 deliverables per category', () => {
    const seenIntros = new Set<string>();
    for (const slug of KATEGORI) {
      const variation = getContentVariations(slug, 'Madiun');
      assert.ok(variation.title.includes('Madiun'));
      assert.equal(variation.title.includes('| Growth Indonesia'), false);
      assert.ok(variation.bodyIntro.length > 40);
      assert.equal(variation.deliverables.length, 4);
      seenIntros.add(variation.bodyIntro);
    }
    assert.equal(seenIntros.size, KATEGORI.length);
  });

  it('synchronizes getCityServiceFaqs and getFaqSchema 1:1 with local venues', () => {
    const venues = ['Taman Wisata Umbul', 'Waduk Bening Widas', 'Hutan Pinus Nongko Ijo'];
    const faqs = getCityServiceFaqs('Fun Games', 'Madiun', venues);
    const schema = getFaqSchema('Fun Games', 'Madiun', venues);

    assert.equal(faqs.length, 4);
    assert.equal(schema.mainEntity.length, 4);
    assert.ok(faqs[2].answer.includes('Taman Wisata Umbul'));
    assert.equal(schema.mainEntity[2].acceptedAnswer.text, faqs[2].answer);
  });

  it('includes address, E.164 telephone, and all 5 categories in LocalBusiness schema', () => {
    const schema = getLocalBusinessSchema('Madiun');
    assert.equal(schema.telephone, '+6285704748186');
    assert.equal(schema.address.addressLocality, 'Madiun');
    assert.equal(schema.hasOfferCatalog.itemListElement.length, 5);
  });

  it('has matching IndexNow verification file in public/', () => {
    const keyFile = path.join(process.cwd(), 'public', `${INDEXNOW_KEY}.txt`);
    assert.equal(fs.existsSync(keyFile), true);
    assert.equal(fs.readFileSync(keyFile, 'utf8').trim(), INDEXNOW_KEY);
  });

  it('serves /pricing.md with status 200, official package prices, and no forbidden certification acronym', async () => {
    const response = await getPricingMd({} as any);
    assert.equal(response.status, 200);
    const body = await response.text();
    assert.match(body, /Rp\. 9\.500\.000/);
    assert.match(body, /Rp\. 7\.000\.000/);
    assert.match(body, /Rp\. 5\.500\.000/);
    const forbiddenAcronym = new RegExp(['B', 'N', 'S', 'P'].join(''), 'i');
    assert.doesNotMatch(body, forbiddenAcronym);
  });

  it('includes AggregateOffer with IDR 150000-9500000 in getServiceSchema', () => {
    const schema = getServiceSchema(
      'Outbound',
      'Madiun',
      'Layanan outbound profesional di Madiun',
      'https://growthindonesia.my.id/layanan/madiun/outbound'
    );
    assert.equal(schema.offers['@type'], 'AggregateOffer');
    assert.equal(schema.offers.priceCurrency, 'IDR');
    assert.equal(schema.offers.lowPrice, '150000');
    assert.equal(schema.offers.highPrice, '9500000');
  });

  it('includes base rate Rp 150.000/pax and /pricing.md reference in HOMEPAGE_FAQS', () => {
    const pricingFaq = HOMEPAGE_FAQS.find((faq) =>
      faq.question.toLowerCase().includes('biaya')
    );
    assert.ok(pricingFaq);
    assert.match(pricingFaq.answer, /Rp 150\.000\/pax/);
    assert.match(pricingFaq.answer, /\/pricing\.md/);
  });

  it('maintains valid content/marketing-loop-state.json with 0 em-dash/en-dash and accurate brand name', () => {
    const statePath = path.join(process.cwd(), 'content', 'marketing-loop-state.json');
    assert.equal(fs.existsSync(statePath), true);
    const raw = fs.readFileSync(statePath, 'utf8');
    assert.equal(/[\u2013\u2014]/.test(raw), false);
    assert.match(raw, /Growth Indonesia/);
    assert.doesNotMatch(raw, /Gemilang/i);
    const parsed = JSON.parse(raw);
    assert.equal(parsed.loopName, 'Weekly East Java pSEO & AI-Visibility Loop');
    assert.equal(parsed.indexNowKeyFile, `/${INDEXNOW_KEY}.txt`);
    assert.equal(parsed.lastExecutedAt, '2026-10-18T22:17:00Z');
    assert.equal(parsed.skillsUsed.length, 21);
    assert.equal(Array.isArray(parsed.aiGroundingEndpoints), true);
    assert.equal(Array.isArray(parsed.recentlyOptimizedRoutes), true);
  });

  it('redirects legacy /layanan/ slug patterns accurately', () => {
    assert.equal(getLegacyServiceRedirect('outbound'), '/layanan/madiun/outbound');
    assert.equal(getLegacyServiceRedirect('ldk-osis'), '/layanan/madiun/ldk-osis');
    assert.equal(getLegacyServiceRedirect('outbound-surabaya'), '/layanan/surabaya/outbound');
    assert.equal(getLegacyServiceRedirect('fun-games-batu'), '/layanan/batu/fun-games');
    assert.equal(getLegacyServiceRedirect('madiun'), null);
  });

  it('returns geographically nearby cities instead of wrapping around to Madiun', () => {
    const situbondoNearby = getNearbyCities('situbondo', 6);
    assert.equal(situbondoNearby.length, 6);
    assert.ok(situbondoNearby.includes('bondowoso'));
    assert.ok(situbondoNearby.includes('banyuwangi'));
    assert.equal(situbondoNearby.includes('madiun'), false);
  });

  it('registers navigator.modelContext and 4 WebMCP tools inline in BaseLayout.astro', () => {
    const layoutPath = path.join(process.cwd(), 'src', 'layouts', 'BaseLayout.astro');
    const layoutSource = fs.readFileSync(layoutPath, 'utf8');
    assert.match(layoutSource, /navigator\.modelContext/);
    assert.match(layoutSource, /calculate_outbound_budget/);
    assert.match(layoutSource, /search_services/);
    assert.match(layoutSource, /get_city_coverage/);
    assert.match(layoutSource, /contact_consultant/);
    const clientLoadMatches = layoutSource.match(/client:load/g) || [];
    assert.equal(clientLoadMatches.length, 1);
  });

  it('guards context.request.headers with context.isPrerendered and resolves article slugs without node:path', async () => {
    const middlewareSource = fs.readFileSync(path.join(process.cwd(), 'src', 'middleware.ts'), 'utf8');
    assert.match(middlewareSource, /context\.isPrerendered/);

    const mdxSource = fs.readFileSync(path.join(process.cwd(), 'lib', 'mdx.ts'), 'utf8');
    assert.doesNotMatch(mdxSource, /import\s+path\s+from/);

    const targetSlug = 'membangun-karakter-pelajar-kemah-besar-smpn-1-geger-di-ndalem-prabu-sarangan';
    const plain = await getArticleBySlug(targetSlug);
    const withExt = await getArticleBySlug(`${targetSlug}.mdx`);
    const withPath = await getArticleBySlug(`/artikel/${targetSlug}.mdx`);
    assert.ok(plain);
    assert.equal(withExt?.slug, targetSlug);
    assert.equal(withPath?.slug, targetSlug);
  });

  it('enriches /api/markdown pSEO output with corridor profile and category deliverables', async () => {
    const response = await getMarkdown({
      url: new URL('https://growthindonesia.my.id/api/markdown?path=/layanan/madiun/outbound'),
    } as any);
    assert.equal(response.status, 200);
    assert.equal(response.headers.get('Content-Type'), 'text/markdown; charset=utf-8');
    const body = await response.text();
    assert.match(body, /Koridor Mataraman/);
    assert.match(body, /Zero Accident/);
    assert.match(body, /Wana Wisata Graha/);
  });

  it('bounds and validates POST /api/indexnow payloads', async () => {
    const unauthRes = await postIndexNow({
      request: new Request('https://growthindonesia.my.id/api/indexnow', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ urls: ['https://growthindonesia.my.id/'] }),
      }),
      url: new URL('https://growthindonesia.my.id/api/indexnow'),
    } as any);
    assert.equal(unauthRes.status, 401);

    const emptyRes = await postIndexNow({
      request: new Request('https://growthindonesia.my.id/api/indexnow', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${INDEXNOW_KEY}`,
        },
        body: JSON.stringify({ urls: [] }),
      }),
      url: new URL('https://growthindonesia.my.id/api/indexnow'),
    } as any);
    assert.equal(emptyRes.status, 400);

    const oversizedUrls = Array.from(
      { length: MAX_INDEXNOW_BATCH_SIZE + 1 },
      (_, i) => `https://growthindonesia.my.id/layanan/madiun?idx=${i}`
    );
    const oversizedRes = await postIndexNow({
      request: new Request('https://growthindonesia.my.id/api/indexnow', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${INDEXNOW_KEY}`,
        },
        body: JSON.stringify({ urls: oversizedUrls }),
      }),
      url: new URL('https://growthindonesia.my.id/api/indexnow'),
    } as any);
    assert.equal(oversizedRes.status, 400);
  });

  it('serves robots.txt, sitemap.xml, and .well-known discovery endpoints via real route handlers', async () => {
    const robotsRes = await getRobotsTxt({} as any);
    assert.equal(robotsRes.status, 200);
    assert.equal(
      robotsRes.headers.get('Content-Signal'),
      'ai-train=no, search=yes, ai-input=yes'
    );
    const robotsBody = await robotsRes.text();
    assert.match(robotsBody, /OAI-SearchBot/);
    assert.match(robotsBody, /Claude-SearchBot/);
    assert.match(robotsBody, /PerplexityBot/);
    assert.match(robotsBody, /Applebot/);
    assert.match(robotsBody, /Sitemap: https:\/\/growthindonesia\.my\.id\/sitemap\.xml/);

    const sitemapRes = await getSitemapXml({} as any);
    assert.equal(sitemapRes.status, 200);
    assert.match(sitemapRes.headers.get('Content-Type') || '', /application\/xml/);
    const sitemapBody = await sitemapRes.text();
    assert.match(sitemapBody, /<lastmod>2026-11-12T00:00:00\.000Z<\/lastmod>/);

    const wellKnownHandlers = [getAgentCard, getApiCatalog, getDnsAid, getMcpServerCard];
    for (const handler of wellKnownHandlers) {
      const res = await handler({} as any);
      assert.equal(res.status, 200);
      const parsed = JSON.parse(await res.text());
      assert.equal(typeof parsed, 'object');
      assert.notEqual(parsed, null);
    }
  });
});


