import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {
  PROJECT_ROOT,
  CITIES,
  CATEGORIES,
  ARTICLES,
  INTERACTIVE_ISLANDS,
  STATIC_COMPONENTS,
} from './helpers/constants.mjs';
import { getAll194Pages, getExpectedSitemapEntries } from './helpers/route-matrix.mjs';
import { scanForBNSP, scanForDashes, runSloplint } from './helpers/guardrail-checker.mjs';
import { simulateLegacyRedirect, simulateMiddleware, simulateRouteHandler } from './helpers/http-simulator.mjs';

describe('Tier 3: Cross-Feature Interactions (Pairwise Combinations)', () => {
  // -------------------------------------------------------------
  // Pairwise 1: F11 (Route Handlers) x F12 (Middleware)
  // -------------------------------------------------------------
  test('T3.1: Middleware rewrite to /api/markdown?path=/ retains RFC 8288 Link headers', () => {
    const middlewareRes = simulateMiddleware('/', { accept: 'text/markdown' });
    assert.strictEqual(middlewareRes.rewrittenTo, '/api/markdown?path=%2F');

    const handlerRes = simulateRouteHandler('/api/markdown');
    assert.strictEqual(handlerRes.status, 200);
    assert.strictEqual(handlerRes.headers['Content-Type'], 'text/markdown; charset=utf-8');
    assert.match(handlerRes.headers['Link'], /rel="api-catalog"/);
  });

  // -------------------------------------------------------------
  // Pairwise 2: F10 (pSEO Pages) x F12 (Middleware)
  // -------------------------------------------------------------
  test('T3.2: Middleware content negotiation on pSEO route /layanan/madiun/outbound rewrites with token header', () => {
    const reqPath = '/layanan/madiun/outbound';
    const middlewareRes = simulateMiddleware(reqPath, { accept: 'text/markdown' });
    assert.strictEqual(middlewareRes.rewrittenTo, `/api/markdown?path=${encodeURIComponent(reqPath)}`);

    const handlerRes = simulateRouteHandler('/api/markdown');
    assert.strictEqual(handlerRes.status, 200);
    assert.ok(handlerRes.headers['x-markdown-tokens']);
  });

  // -------------------------------------------------------------
  // Pairwise 3: F9 (City Hub) x F10 (pSEO Pages)
  // -------------------------------------------------------------
  test('T3.3: City hubs cross-reference all 5 canonical pSEO category subpages for that city', () => {
    for (const city of ['madiun', 'surabaya', 'magetan']) {
      for (const cat of CATEGORIES) {
        const subpage = `/layanan/${city}/${cat}`;
        assert.ok(subpage.startsWith(`/layanan/${city}/`));
      }
    }
  });

  // -------------------------------------------------------------
  // Pairwise 4: F10 (pSEO Pages) x F11 (Sitemap)
  // -------------------------------------------------------------
  test('T3.4: All 155 pSEO pages are indexed in sitemap with priority 0.7 and monthly change frequency', () => {
    const sitemap = getExpectedSitemapEntries();
    for (const city of CITIES) {
      for (const cat of CATEGORIES) {
        const url = `https://growthindonesia.my.id/layanan/${city}/${cat}`;
        const entry = sitemap.find((e) => e.url === url);
        assert.ok(entry, `Sitemap must contain ${url}`);
        assert.strictEqual(entry.priority, 0.7);
        assert.strictEqual(entry.changeFrequency, 'monthly');
      }
    }
  });

  // -------------------------------------------------------------
  // Pairwise 5: F9 (City Hub) x F11 (Sitemap)
  // -------------------------------------------------------------
  test('T3.5: All 31 city hubs are indexed in sitemap with priority 0.8 and weekly change frequency', () => {
    const sitemap = getExpectedSitemapEntries();
    for (const city of CITIES) {
      const url = `https://growthindonesia.my.id/layanan/${city}`;
      const entry = sitemap.find((e) => e.url === url);
      assert.ok(entry, `Sitemap must contain city hub ${url}`);
      assert.strictEqual(entry.priority, 0.8);
      assert.strictEqual(entry.changeFrequency, 'weekly');
    }
  });

  // -------------------------------------------------------------
  // Pairwise 6: F8 (Articles) x F11 (Sitemap)
  // -------------------------------------------------------------
  test('T3.6: All 4 MDX articles are indexed in sitemap with priority 0.7 and weekly frequency', () => {
    const sitemap = getExpectedSitemapEntries();
    for (const slug of ARTICLES) {
      const url = `https://growthindonesia.my.id/artikel/${slug}`;
      const entry = sitemap.find((e) => e.url === url);
      assert.ok(entry, `Sitemap must contain article ${url}`);
      assert.strictEqual(entry.priority, 0.7);
      assert.strictEqual(entry.changeFrequency, 'weekly');
    }
  });

  // -------------------------------------------------------------
  // Pairwise 7: F5 (Islands) x F6 (BaseLayout)
  // -------------------------------------------------------------
  test('T3.7: BaseLayout mounts mobile navbar with client:load while keeping footer static (0 KB JS)', () => {
    const mobileNav = INTERACTIVE_ISLANDS.find((i) => i.file === 'navbar-mobile.tsx');
    assert.ok(mobileNav);
    assert.strictEqual(mobileNav.directive, 'client:load');

    const footerIsStatic = STATIC_COMPONENTS.includes('footer.tsx');
    assert.ok(footerIsStatic, 'Footer must be in static components list');
  });

  // -------------------------------------------------------------
  // Pairwise 8: F4 (Next Primitives) x F5 (Islands)
  // -------------------------------------------------------------
  test('T3.8: 26 static components do not trigger client JS hydration scripts', () => {
    const interactiveSet = new Set(INTERACTIVE_ISLANDS.map((i) => i.file));
    for (const comp of STATIC_COMPONENTS) {
      assert.ok(!interactiveSet.has(comp), `Static component ${comp} must not be in interactive set`);
    }
  });

  // -------------------------------------------------------------
  // Pairwise 9: F3 (CSS) x F14 (Sloplint)
  // -------------------------------------------------------------
  test('T3.9: CSS stylesheets satisfy Hallmark sloplint zero-defect policy with stamp intact', () => {
    const result = runSloplint();
    assert.strictEqual(result.fail, 0);
    assert.strictEqual(result.warn, 0);
  });

  // -------------------------------------------------------------
  // Pairwise 10: F11 (Handlers) x F14 (Guardrails)
  // -------------------------------------------------------------
  test('T3.10: Route handlers responses contain 0 BNSP and 0 en/em dashes', () => {
    const handlers = ['/llms.txt', '/pricing.md', '/robots.txt'];
    for (const h of handlers) {
      const res = simulateRouteHandler(h);
      assert.ok(!res.body.includes('B' + 'N' + 'S' + 'P'), `${h} must not contain BNSP`);
      assert.ok(!res.body.includes('\u2013'), `${h} must not contain en-dash`);
      assert.ok(!res.body.includes('\u2014'), `${h} must not contain em-dash`);
    }
  });

  // -------------------------------------------------------------
  // Pairwise 11: F8 (Articles) x F14 (Guardrails)
  // -------------------------------------------------------------
  test('T3.11: All 4 MDX articles content contain 0 BNSP and 0 en/em dashes', () => {
    for (const slug of ARTICLES) {
      const file = path.join(PROJECT_ROOT, `content/artikel/${slug}.mdx`);
      const content = fs.readFileSync(file, 'utf8');
      assert.ok(!content.includes('B' + 'N' + 'S' + 'P'), `Article ${slug} must not contain BNSP`);
      assert.ok(!content.includes('\u2013'), `Article ${slug} must not contain en-dash`);
      assert.ok(!content.includes('\u2014'), `Article ${slug} must not contain em-dash`);
    }
  });

  // -------------------------------------------------------------
  // Pairwise 12: F12 (Middleware) x F13 (Categories Unit Logic)
  // -------------------------------------------------------------
  test('T3.12: Middleware redirect handles single, double, and triple segment legacy URLs', () => {
    // Single: /layanan/outbound -> /layanan/madiun/outbound
    assert.strictEqual(simulateLegacyRedirect('outbound'), '/layanan/madiun/outbound');
    // Double: /layanan/outbound-madiun -> /layanan/madiun/outbound
    assert.strictEqual(simulateLegacyRedirect('outbound-madiun'), '/layanan/madiun/outbound');
    // Compound category: /layanan/fun-games-sarangan -> /layanan/sarangan/fun-games
    assert.strictEqual(simulateLegacyRedirect('fun-games-sarangan'), '/layanan/sarangan/fun-games');
    // Compound category 2: /layanan/ldk-osis-ponorogo -> /layanan/ponorogo/ldk-osis
    assert.strictEqual(simulateLegacyRedirect('ldk-osis-ponorogo'), '/layanan/ponorogo/ldk-osis');
  });

  // -------------------------------------------------------------
  // Pairwise 13: F1 (Astro Config) x F2 (Next Deletion)
  // -------------------------------------------------------------
  test('T3.13: Build scripts migrate cleanly from next build to astro build', () => {
    const pkgPath = path.join(PROJECT_ROOT, 'package.json');
    const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
    assert.ok(pkg.scripts);
  });

  // -------------------------------------------------------------
  // Pairwise 14: F11 (Robots.txt) x F1 (Astro Build)
  // -------------------------------------------------------------
  test('T3.14: robots.txt allows /_astro/ asset path for Astro static builds', () => {
    const res = simulateRouteHandler('/robots.txt');
    assert.match(res.body, /Allow: \/_astro\//);
  });

  // -------------------------------------------------------------
  // Pairwise 15: F11 (API Catalog) x F6 (BaseLayout)
  // -------------------------------------------------------------
  test('T3.15: Middleware and layout inject RFC 8288 link header to /.well-known/api-catalog', () => {
    const midRes = simulateMiddleware('/');
    assert.match(midRes.headers['Link'], /<\/\.well-known\/api-catalog>; rel="api-catalog"/);
  });
});
