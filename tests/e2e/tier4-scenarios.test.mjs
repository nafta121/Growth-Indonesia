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
import { scanForBNSP, scanForDashes, runSloplint, auditHydrationBoundaries } from './helpers/guardrail-checker.mjs';
import { simulateLegacyRedirect, simulateMiddleware, simulateRouteHandler } from './helpers/http-simulator.mjs';

describe('Tier 4: Real-World Application Scenarios', () => {
  // -------------------------------------------------------------
  // Scenario 1: Prospective Corporate Client Journey (Madiun Outbound)
  // -------------------------------------------------------------
  test('Scenario 1: Prospective Corporate Client Journey (Madiun Outbound)', () => {
    // 1. Client loads homepage
    const homeSitemap = getExpectedSitemapEntries().find((e) => e.url.endsWith('/'));
    assert.strictEqual(homeSitemap.priority, 1.0);

    // 2. Client navigates to /layanan/madiun/outbound
    const pseoPath = '/layanan/madiun/outbound';
    assert.ok(getAll194Pages().includes(pseoPath));

    // 3. Client interacts with KalkulatorBudget (client:visible) and Contact Form (client:visible)
    const calc = INTERACTIVE_ISLANDS.find((i) => i.file === 'kalkulator-budget.tsx');
    const contact = INTERACTIVE_ISLANDS.find((i) => i.file === 'contact.tsx');
    assert.strictEqual(calc.directive, 'client:visible');
    assert.strictEqual(contact.directive, 'client:visible');
  });

  // -------------------------------------------------------------
  // Scenario 2: AI Agent Grounding & Documentation Discovery (Perplexity / Claude)
  // -------------------------------------------------------------
  test('Scenario 2: AI Agent Grounding & Documentation Discovery (Perplexity / Claude)', () => {
    // 1. Crawler inspects robots.txt
    const robots = simulateRouteHandler('/robots.txt');
    assert.strictEqual(robots.status, 200);
    assert.match(robots.headers['Content-Signal'], /ai-train=no/);
    assert.match(robots.body, /Allow: \/llms\.txt/);
    assert.match(robots.body, /Allow: \/pricing\.md/);

    // 2. Crawler reads /llms.txt for brand facts and grounding
    const llms = simulateRouteHandler('/llms.txt');
    assert.strictEqual(llms.status, 200);
    assert.strictEqual(llms.headers['Content-Type'], 'text/plain; charset=utf-8');
    assert.match(llms.body, /Official AI Grounding Documentation/);

    // 3. Crawler discovers /pricing.md machine-readable rates
    const pricing = simulateRouteHandler('/pricing.md');
    assert.strictEqual(pricing.status, 200);
    assert.strictEqual(pricing.headers['Content-Type'], 'text/markdown; charset=utf-8');
  });

  // -------------------------------------------------------------
  // Scenario 3: Search Engine Crawler Full Indexation Flow (Googlebot / Bingbot)
  // -------------------------------------------------------------
  test('Scenario 3: Search Engine Crawler Full Indexation Flow (Googlebot / Bingbot)', () => {
    // 1. Crawler finds sitemap in robots.txt
    const robots = simulateRouteHandler('/robots.txt');
    assert.match(robots.body, /Sitemap: https:\/\/growthindonesia\.my\.id\/sitemap\.xml/);

    // 2. Crawler retrieves sitemap entries and verifies all 194 pages
    const entries = getExpectedSitemapEntries();
    assert.ok(entries.length >= 196); // 194 pages + 2 route handlers (/llms.txt, /pricing.md)

    // Validate priorities
    const home = entries.find((e) => e.url.endsWith('.my.id/'));
    const city = entries.find((e) => e.url.includes('/layanan/madiun') && !e.url.includes('/outbound'));
    const pseo = entries.find((e) => e.url.includes('/layanan/madiun/outbound'));
    assert.strictEqual(home.priority, 1.0);
    assert.strictEqual(city.priority, 0.8);
    assert.strictEqual(pseo.priority, 0.7);
  });

  // -------------------------------------------------------------
  // Scenario 4: AI Agent Markdown Content Negotiation Flow
  // -------------------------------------------------------------
  test('Scenario 4: AI Agent Markdown Content Negotiation Flow', () => {
    // Agent sends Accept: text/markdown to a pSEO page
    const requestPath = '/layanan/magetan/fun-games';
    const midRes = simulateMiddleware(requestPath, { accept: 'text/markdown' });
    assert.strictEqual(midRes.rewrittenTo, `/api/markdown?path=${encodeURIComponent(requestPath)}`);

    // Endpoint serves markdown with tokens header and discovery link headers
    const apiRes = simulateRouteHandler('/api/markdown');
    assert.strictEqual(apiRes.status, 200);
    assert.strictEqual(apiRes.headers['Content-Type'], 'text/markdown; charset=utf-8');
    assert.ok(apiRes.headers['x-markdown-tokens']);
    assert.match(apiRes.headers['Link'], /rel="api-catalog"/);
  });

  // -------------------------------------------------------------
  // Scenario 5: Legacy URL Inbound Backlink Migration (SEO Preservation)
  // -------------------------------------------------------------
  test('Scenario 5: Legacy URL Inbound Backlink Migration (SEO Preservation)', () => {
    // User or backlink hits old Next.js URL
    const legacyPath = '/layanan/outbound-madiun';
    const midRes = simulateMiddleware(legacyPath);
    assert.strictEqual(midRes.status, 301);
    assert.strictEqual(midRes.redirectUrl, '/layanan/madiun/outbound');

    // Second legacy compound pattern
    const legacyCompound = '/layanan/fun-games-sarangan';
    const midRes2 = simulateMiddleware(legacyCompound);
    assert.strictEqual(midRes2.status, 301);
    assert.strictEqual(midRes2.redirectUrl, '/layanan/sarangan/fun-games');
  });

  // -------------------------------------------------------------
  // Scenario 6: Mobile User Navigation & Menu Interaction
  // -------------------------------------------------------------
  test('Scenario 6: Mobile User Navigation & Menu Interaction', () => {
    // Mobile navbar island is client:load
    const navMobile = INTERACTIVE_ISLANDS.find((i) => i.file === 'navbar-mobile.tsx');
    assert.ok(navMobile);
    assert.strictEqual(navMobile.directive, 'client:load');

    // Desktop navbar is completely static (0 KB client JS)
    assert.ok(STATIC_COMPONENTS.includes('navbar.tsx'));
    assert.ok(!INTERACTIVE_ISLANDS.some((i) => i.file === 'navbar.tsx'));
  });

  // -------------------------------------------------------------
  // Scenario 7: School Principal LDK OSIS Exploration Flow
  // -------------------------------------------------------------
  test('Scenario 7: School Principal LDK OSIS Exploration Flow', () => {
    // 1. Principal visits Ponorogo LDK OSIS page
    const ldkPath = '/layanan/ponorogo/ldk-osis';
    assert.ok(getAll194Pages().includes(ldkPath));

    // 2. Principal reads related character building article
    const articleSlug = 'membangun-karakter-pelajar-kemah-besar-smpn-1-geger-di-ndalem-prabu-sarangan';
    const articlePath = path.join(PROJECT_ROOT, `content/artikel/${articleSlug}.mdx`);
    assert.ok(fs.existsSync(articlePath));
    const content = fs.readFileSync(articlePath, 'utf8');
    assert.match(content, /SMPN 1 Geger/);
    assert.match(content, /Ndalem Prabu/);
  });

  // -------------------------------------------------------------
  // Scenario 8: Search Engine IndexNow Batch Submission Workflow
  // -------------------------------------------------------------
  test('Scenario 8: Search Engine IndexNow Batch Submission Workflow', () => {
    // 1. Unauthorized submission is rejected
    const unauthRes = simulateRouteHandler('/api/indexnow', {
      method: 'POST',
      body: { urls: ['https://growthindonesia.my.id/'] },
    });
    assert.strictEqual(unauthRes.status, 401);

    // 2. Authorized batch submission succeeds
    const authRes = simulateRouteHandler('/api/indexnow', {
      method: 'POST',
      headers: { authorization: 'Bearer test-secret' },
      body: { urls: ['https://growthindonesia.my.id/layanan/madiun/outbound'] },
    });
    assert.strictEqual(authRes.status, 200);
    assert.match(authRes.body, /IndexNow submission completed/);
  });

  // -------------------------------------------------------------
  // Scenario 9: Agent-to-Agent (A2A) & MCP Discovery Protocol Flow
  // -------------------------------------------------------------
  test('Scenario 9: Agent-to-Agent (A2A) & MCP Discovery Protocol Flow', () => {
    // 1. Agent discovers A2A agent card
    const agentCard = simulateRouteHandler('/.well-known/agent-card.json');
    assert.strictEqual(agentCard.status, 200);
    const parsedAgent = JSON.parse(agentCard.body);
    assert.match(parsedAgent.$schema, /agent-card\.json/);

    // 2. Agent discovers MCP server card
    const mcpCard = simulateRouteHandler('/.well-known/mcp/server-card.json');
    assert.strictEqual(mcpCard.status, 200);
    const parsedMcp = JSON.parse(mcpCard.body);
    assert.match(parsedMcp.$schema, /server-card/);

    // 3. Agent discovers RFC 9727 API catalog
    const apiCatalog = simulateRouteHandler('/.well-known/api-catalog');
    assert.strictEqual(apiCatalog.status, 200);
    assert.strictEqual(apiCatalog.headers['Content-Type'], 'application/linkset+json; charset=utf-8');
  });

  // -------------------------------------------------------------
  // Scenario 10: High-Performance Lightweight Client Hydration Audit
  // -------------------------------------------------------------
  test('Scenario 10: High-Performance Lightweight Client Hydration Audit', () => {
    const audit = auditHydrationBoundaries();
    assert.strictEqual(audit.allowedCount, 6);
    assert.strictEqual(audit.staticCount, 26);
    assert.strictEqual(audit.totalComponents, 32);
    assert.strictEqual(audit.unauthorizedIslands.length, 0);
  });

  // -------------------------------------------------------------
  // Scenario 11: Multi-City Regional Event Organizer Exploration Flow
  // -------------------------------------------------------------
  test('Scenario 11: Multi-City Regional Event Organizer Exploration Flow', () => {
    // 1. HR Manager examines Surabaya hub
    const sby = '/layanan/surabaya';
    assert.ok(getAll194Pages().includes(sby));

    // 2. Checks surrounding major hubs (Malang, Batu, Sidoarjo, Gresik)
    for (const city of ['malang', 'batu', 'sidoarjo', 'gresik']) {
      assert.ok(getAll194Pages().includes(`/layanan/${city}`));
    }

    // 3. Accesses official pricing documentation
    const pricing = simulateRouteHandler('/pricing.md');
    assert.match(pricing.body, /Pricing Reference|Dokumentasi Harga/i);
  });

  // -------------------------------------------------------------
  // Scenario 12: Content Integrity & Regulatory Compliance Audit
  // -------------------------------------------------------------
  test('Scenario 12: Content Integrity & Regulatory Compliance Audit', () => {
    // 1. 0 BNSP verification
    const bnspViolations = scanForBNSP();
    assert.strictEqual(bnspViolations.length, 0);

    // 2. 0 en/em dashes verification
    const dashViolations = scanForDashes();
    assert.strictEqual(dashViolations.length, 0);

    // 3. Hallmark sloplint zero-defect compliance
    const sloplint = runSloplint();
    assert.strictEqual(sloplint.fail, 0);
    assert.strictEqual(sloplint.reflex, 0);
    assert.strictEqual(sloplint.warn, 0);
  });
});
