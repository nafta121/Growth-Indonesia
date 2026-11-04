import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {
  PROJECT_ROOT,
  CITIES,
  CATEGORIES,
  ARTICLES,
  ROUTE_HANDLERS,
  INTERACTIVE_ISLANDS,
  STATIC_COMPONENTS,
} from './helpers/constants.mjs';
import { getAll194Pages, getExpectedSitemapEntries } from './helpers/route-matrix.mjs';
import { scanForBNSP, scanForDashes, runSloplint, auditHydrationBoundaries } from './helpers/guardrail-checker.mjs';
import { simulateRouteHandler } from './helpers/http-simulator.mjs';

describe('Deep Guardrails & Compliance Audit', () => {
  // -------------------------------------------------------------
  // Audit 1: All 194 Pages Inventory & Integrity
  // -------------------------------------------------------------
  describe('Audit 1: Complete 194-Page Inventory', () => {
    const pages = getAll194Pages();

    test('Total canonical content pages equals exactly 194', () => {
      assert.strictEqual(pages.length, 194);
    });

    test('All 194 pages have valid root-relative URL paths starting with /', () => {
      for (const page of pages) {
        assert.ok(page.startsWith('/'), `Page path must start with /: ${page}`);
        assert.ok(!page.includes('//'), `Page path must not have duplicate slashes: ${page}`);
      }
    });

    test('No duplicate paths among the 194 canonical pages', () => {
      const set = new Set(pages);
      assert.strictEqual(set.size, 194, 'All 194 pages must be unique');
    });

    test('All 31 city hubs are present among 194 pages', () => {
      for (const city of CITIES) {
        assert.ok(pages.includes(`/layanan/${city}`), `Missing hub for ${city}`);
      }
    });

    test('All 155 pSEO pages are present among 194 pages', () => {
      for (const city of CITIES) {
        for (const cat of CATEGORIES) {
          assert.ok(pages.includes(`/layanan/${city}/${cat}`), `Missing pSEO for ${city}/${cat}`);
        }
      }
    });

    test('All 4 MDX articles are present among 194 pages', () => {
      for (const slug of ARTICLES) {
        assert.ok(pages.includes(`/artikel/${slug}`), `Missing article page for ${slug}`);
      }
    });
  });

  // -------------------------------------------------------------
  // Audit 2: All 10 Route Handlers Verification
  // -------------------------------------------------------------
  describe('Audit 2: 10 Route Handlers Verification', () => {
    test('Exactly 10 route handlers registered in inventory', () => {
      assert.strictEqual(ROUTE_HANDLERS.length, 10);
    });

    test('All 10 route handlers return expected HTTP status and content types', () => {
      for (const handlerPath of ROUTE_HANDLERS) {
        const res = simulateRouteHandler(handlerPath);
        assert.strictEqual(res.status, 200, `Handler ${handlerPath} must return 200`);
        assert.ok(res.headers['Content-Type'], `Handler ${handlerPath} must return Content-Type`);
      }
    });

    test('Route handlers support HEAD or GET method according to specification', () => {
      for (const handlerPath of ROUTE_HANDLERS) {
        const res = simulateRouteHandler(handlerPath, { method: 'GET' });
        assert.strictEqual(res.status, 200);
      }
    });
  });

  // -------------------------------------------------------------
  // Audit 3: Component Hydration Boundaries (6 Islands, 26 Static)
  // -------------------------------------------------------------
  describe('Audit 3: Hydration Boundaries (6 Islands, 26 Static)', () => {
    const audit = auditHydrationBoundaries();

    test('Exactly 6 interactive client islands are authorized and scanned in templates', () => {
      assert.strictEqual(audit.allowedCount, 6);
      const scannedNames = new Set(audit.scannedIslands.map((i) => i.componentName));
      const required = [
        'NavbarMobile',
        'ServicesTabs',
        'OutboundGalleryClient',
        'OurImpact',
        'KalkulatorBudget',
        'Contact',
      ];
      for (const comp of required) {
        assert.ok(
          scannedNames.has(comp),
          `Expected interactive island ${comp} to be scanned in templates with client directive`
        );
      }
    });

    test('dist/index.html contains at least 5 to 6 <astro-island> tags for client hydration', () => {
      const indexPath = path.join(PROJECT_ROOT, 'dist/index.html');
      assert.ok(fs.existsSync(indexPath), 'dist/index.html must exist (run npm run build first)');
      const html = fs.readFileSync(indexPath, 'utf8');
      const islandTags = html.match(/<astro-island\b/g) || [];
      assert.ok(
        islandTags.length >= 5,
        `Expected at least 5-6 <astro-island> tags in dist/index.html, found ${islandTags.length}`
      );
    });

    test('dist/_astro/ contains compiled JS bundles for all 6 interactive islands', () => {
      const astroDir = path.join(PROJECT_ROOT, 'dist/_astro');
      assert.ok(fs.existsSync(astroDir), 'dist/_astro/ assets directory must exist');
      const files = fs.readdirSync(astroDir);
      const expectedIslands = [
        'navbar-mobile',
        'services-tabs',
        'outbound-gallery-client',
        'our-impact',
        'kalkulator-budget',
        'contact',
      ];
      for (const island of expectedIslands) {
        const found = files.some((f) => f.startsWith(island) && f.endsWith('.js'));
        assert.ok(
          found,
          `Client JS bundle for "${island}" not found in dist/_astro/ (${files.filter((f) => f.endsWith('.js')).join(', ')})`
        );
      }
    });

    test('Zero unauthorized components have client:* directives and 26 remain static', () => {
      assert.strictEqual(audit.unauthorizedIslands.length, 0);
      assert.strictEqual(audit.staticCount, 26);
      assert.strictEqual(audit.totalComponents, 32);
    });
  });

  // -------------------------------------------------------------
  // Audit 4: Zero "BNSP" Occurrences in Repository
  // -------------------------------------------------------------
  describe('Audit 4: Zero BNSP Occurrences', () => {
    test('Zero occurrences of "BNSP" in any application or content file', () => {
      const violations = scanForBNSP();
      assert.strictEqual(violations.length, 0, `Found BNSP in: ${JSON.stringify(violations)}`);
    });
  });

  // -------------------------------------------------------------
  // Audit 5: Zero En-dash or Em-dash Occurrences
  // -------------------------------------------------------------
  describe('Audit 5: Zero En/Em Dashes Occurrences', () => {
    test('Zero occurrences of en-dash (\\u2013) or em-dash (\\u2014) in repository', () => {
      const violations = scanForDashes();
      assert.strictEqual(violations.length, 0, `Found dashes in: ${JSON.stringify(violations)}`);
    });
  });

  // -------------------------------------------------------------
  // Audit 6: Hallmark Sloplint Zero-Defect Policy
  // -------------------------------------------------------------
  describe('Audit 6: Hallmark Sloplint Zero-Defect Policy', () => {
    test('Hallmark sloplint reports 0 FAIL, 0 REFLEX, 0 WARN', () => {
      const result = runSloplint();
      assert.strictEqual(result.fail, 0, `FAIL count: ${result.fail}`);
      assert.strictEqual(result.reflex, 0, `REFLEX count: ${result.reflex}`);
      assert.strictEqual(result.warn, 0, `WARN count: ${result.warn}`);
      assert.strictEqual(result.clean, true, 'Sloplint output must indicate clean status');
    });
  });
});
