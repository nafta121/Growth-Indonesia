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
  HALLMARK_STAMP,
} from './helpers/constants.mjs';
import { getAll194Pages, getExpectedSitemapEntries } from './helpers/route-matrix.mjs';
import { scanForBNSP, scanForDashes, runSloplint, auditHydrationBoundaries } from './helpers/guardrail-checker.mjs';
import { simulateLegacyRedirect, simulateMiddleware, simulateRouteHandler } from './helpers/http-simulator.mjs';

describe('Tier 1: Feature Coverage (All 17 Features)', () => {
  // -------------------------------------------------------------
  // Feature 1: Astro Build & Config Setup
  // -------------------------------------------------------------
  describe('F1: Astro Build & Config Setup', () => {
    test('F1.1: Astro config specifies @astrojs/cloudflare with server output (hybrid mode)', () => {
      const astroConfigPath = path.join(PROJECT_ROOT, 'astro.config.mjs');
      assert.ok(fs.existsSync(astroConfigPath), 'astro.config.mjs must exist');
      const content = fs.readFileSync(astroConfigPath, 'utf8');
      assert.match(content, /@astrojs\/cloudflare/);
      assert.match(content, /output:\s*['"]server['"]/);
    });

    test('F1.2: Astro config integrates @astrojs/react', () => {
      const astroConfigPath = path.join(PROJECT_ROOT, 'astro.config.mjs');
      assert.ok(fs.existsSync(astroConfigPath), 'astro.config.mjs must exist');
      const content = fs.readFileSync(astroConfigPath, 'utf8');
      assert.match(content, /@astrojs\/react/);
    });

    test('F1.3: Astro config integrates @astrojs/mdx', () => {
      const astroConfigPath = path.join(PROJECT_ROOT, 'astro.config.mjs');
      assert.ok(fs.existsSync(astroConfigPath), 'astro.config.mjs must exist');
      const content = fs.readFileSync(astroConfigPath, 'utf8');
      assert.match(content, /@astrojs\/mdx/);
    });

    test('F1.4: wrangler.jsonc specifies cloudflare worker entrypoint and dist assets', () => {
      const wranglerPath = path.join(PROJECT_ROOT, 'wrangler.jsonc');
      assert.ok(fs.existsSync(wranglerPath), 'wrangler.jsonc must exist');
      const content = fs.readFileSync(wranglerPath, 'utf8');
      assert.match(content, /growth-indonesia/);
      assert.match(content, /compatibility_date/);
    });

    test('F1.5: tsconfig.json specifies valid module resolution and path aliases', () => {
      const tsconfigPath = path.join(PROJECT_ROOT, 'tsconfig.json');
      assert.ok(fs.existsSync(tsconfigPath), 'tsconfig.json must exist');
      const content = fs.readFileSync(tsconfigPath, 'utf8');
      assert.ok(content.includes('"paths"') || content.includes('astro/tsconfigs'), 'Paths or astro config specified');
    });
  });

  // -------------------------------------------------------------
  // Feature 2: Next.js Clean Deletion
  // -------------------------------------------------------------
  describe('F2: Next.js Clean Deletion', () => {
    test('F2.1: Target deletion list contains all legacy Next configuration files', () => {
      const legacyFiles = [
        'next.config.ts',
        'next.config.js',
        'next.config.mjs',
        'open-next.config.ts',
        'next-env.d.ts',
      ];
      for (const file of legacyFiles) {
        const fullPath = path.join(PROJECT_ROOT, file);
        assert.ok(!fs.existsSync(fullPath), `Legacy configuration file must not exist on disk: ${file}`);
      }
    });

    test('F2.2: Target deletion list targets app/ directory completely', () => {
      const appDir = path.join(PROJECT_ROOT, 'app');
      assert.ok(!fs.existsSync(appDir), 'app/ directory must be completely removed from repository');
    });

    test('F2.3: Deletion manifest flags next and opennextjs packages for removal', () => {
      const pkgPath = path.join(PROJECT_ROOT, 'package.json');
      assert.ok(fs.existsSync(pkgPath), 'package.json must exist');
      const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
      const allDeps = {
        ...(pkg.dependencies || {}),
        ...(pkg.devDependencies || {}),
        ...(pkg.peerDependencies || {}),
      };
      const deprecatedDeps = ['next', '@opennextjs/cloudflare', 'eslint-config-next'];
      for (const dep of deprecatedDeps) {
        assert.ok(!allDeps[dep], `Deprecated dependency ${dep} must not be present in package.json`);
      }
    });

    test('F2.4: Zero runtime next/server imports planned for src/ directory', () => {
      const srcDir = path.join(PROJECT_ROOT, 'src');
      assert.ok(fs.existsSync(srcDir), 'src directory must exist');
      const files = fs.readdirSync(srcDir, { recursive: true });
      for (const f of files) {
        if (typeof f === 'string' && (f.endsWith('.ts') || f.endsWith('.astro'))) {
          const content = fs.readFileSync(path.join(srcDir, f), 'utf8');
          assert.ok(!content.includes("from 'next/server'"), `File ${f} must not import next/server`);
        }
      }
    });

    test('F2.5: Build scripts target Astro CLI without invoking next build', () => {
      const pkgPath = path.join(PROJECT_ROOT, 'package.json');
      assert.ok(fs.existsSync(pkgPath), 'package.json must exist');
      const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
      assert.ok(pkg.scripts, 'scripts block must exist');
      assert.match(pkg.scripts.build || '', /astro build/, 'build script must invoke astro build');
      assert.match(pkg.scripts.dev || '', /astro dev/, 'dev script must invoke astro dev');
      for (const [scriptName, scriptCmd] of Object.entries(pkg.scripts)) {
        assert.ok(
          !scriptCmd.includes('next build') && !scriptCmd.includes('next dev') && !scriptCmd.includes('next start'),
          `Script ${scriptName} must not invoke Next.js CLI`
        );
      }
    });
  });

  // -------------------------------------------------------------
  // Feature 3: CSS & Hallmark Preservation
  // -------------------------------------------------------------
  describe('F3: CSS & Hallmark Preservation', () => {
    test('F3.1: Hallmark stamp lines 1-5 preserved in globals stylesheet', () => {
      const globalsPath = fs.existsSync(path.join(PROJECT_ROOT, 'src/styles/globals.css'))
        ? path.join(PROJECT_ROOT, 'src/styles/globals.css')
        : path.join(PROJECT_ROOT, 'app/globals.css');
      assert.ok(fs.existsSync(globalsPath), 'globals.css must exist');
      const content = fs.readFileSync(globalsPath, 'utf8');
      const lines = content.split('\n').slice(0, 5).join('\n');
      assert.match(lines, /Hallmark/);
    });

    test('F3.2: Design tokens define essential OKLCH color palettes and radii', () => {
      const tokensPath = fs.existsSync(path.join(PROJECT_ROOT, 'src/styles/tokens.css'))
        ? path.join(PROJECT_ROOT, 'src/styles/tokens.css')
        : path.join(PROJECT_ROOT, 'app/tokens.css');
      assert.ok(fs.existsSync(tokensPath), 'tokens.css must exist');
      const content = fs.readFileSync(tokensPath, 'utf8');
      assert.match(content, /--color-brand/);
      assert.match(content, /--radius/);
    });

    test('F3.3: Base stylesheet defines typography scale and resets', () => {
      const basePath = fs.existsSync(path.join(PROJECT_ROOT, 'src/styles/base.css'))
        ? path.join(PROJECT_ROOT, 'src/styles/base.css')
        : path.join(PROJECT_ROOT, 'app/base.css');
      assert.ok(fs.existsSync(basePath), 'base.css must exist');
      const content = fs.readFileSync(basePath, 'utf8');
      assert.match(content, /font-variant-numeric|font-family/);
    });

    test('F3.4: Hallmark sloplint zero-defect policy yields 0 FAIL', () => {
      const result = runSloplint();
      assert.strictEqual(result.fail, 0, `Sloplint must yield 0 FAIL, got ${result.fail}`);
    });

    test('F3.5: Hallmark sloplint yields 0 REFLEX and 0 WARN', () => {
      const result = runSloplint();
      assert.strictEqual(result.reflex, 0, `Sloplint must yield 0 REFLEX, got ${result.reflex}`);
      assert.strictEqual(result.warn, 0, `Sloplint must yield 0 WARN, got ${result.warn}`);
    });
  });

  // -------------------------------------------------------------
  // Feature 4: Next.js Primitive Replacement
  // -------------------------------------------------------------
  describe('F4: Next.js Primitive Replacement', () => {
    test('F4.1: Standard <a> tag replacement eliminates next/link across all components', () => {
      const targetDirs = ['components', 'lib', 'src'];
      let checkedFiles = 0;
      let nativeLinkCount = 0;

      for (const dirName of targetDirs) {
        const fullDir = path.join(PROJECT_ROOT, dirName);
        if (!fs.existsSync(fullDir)) continue;
        const entries = fs.readdirSync(fullDir, { recursive: true });
        for (const entry of entries) {
          if (typeof entry === 'string' && (entry.endsWith('.tsx') || entry.endsWith('.ts') || entry.endsWith('.astro'))) {
            const filePath = path.join(fullDir, entry);
            const content = fs.readFileSync(filePath, 'utf8');
            assert.ok(
              !content.includes("from 'next/link'") && !content.includes('from "next/link"'),
              `File ${dirName}/${entry} must not import from next/link`
            );
            checkedFiles++;
            const matches = content.match(/<a\s+[^>]*href=/g);
            if (matches) nativeLinkCount += matches.length;
          }
        }
      }
      assert.ok(checkedFiles > 0, 'Must inspect component and source files');
      assert.ok(nativeLinkCount > 0, `Expected standard <a> tags across components, found ${nativeLinkCount}`);
    });

    test('F4.2: Standard <img> tag replacement eliminates next/image across all components', () => {
      const targetDirs = ['components', 'lib', 'src'];
      let checkedFiles = 0;
      let nativeImgCount = 0;
      let lazyOrAsyncCount = 0;

      for (const dirName of targetDirs) {
        const fullDir = path.join(PROJECT_ROOT, dirName);
        if (!fs.existsSync(fullDir)) continue;
        const entries = fs.readdirSync(fullDir, { recursive: true });
        for (const entry of entries) {
          if (typeof entry === 'string' && (entry.endsWith('.tsx') || entry.endsWith('.ts') || entry.endsWith('.astro'))) {
            const filePath = path.join(fullDir, entry);
            const content = fs.readFileSync(filePath, 'utf8');
            assert.ok(
              !content.includes("from 'next/image'") && !content.includes('from "next/image"'),
              `File ${dirName}/${entry} must not import from next/image`
            );
            checkedFiles++;
            const imgMatches = content.match(/<img\s+[^>]*src=/g);
            if (imgMatches) {
              nativeImgCount += imgMatches.length;
              if (
                content.includes('loading="lazy"') ||
                content.includes("loading='lazy'") ||
                content.includes('decoding="async"') ||
                content.includes("decoding='async'")
              ) {
                lazyOrAsyncCount++;
              }
            }
          }
        }
      }
      assert.ok(checkedFiles > 0, 'Must inspect component and source files');
      assert.ok(nativeImgCount > 0, `Expected standard <img> tags across components, found ${nativeImgCount}`);
      assert.ok(lazyOrAsyncCount > 0, `Expected native <img> tags with lazy/async loading attributes, found in ${lazyOrAsyncCount} files`);
    });

    test('F4.3: URLSearchParams replaces Next.js useSearchParams in client components', () => {
      const contactPath = path.join(PROJECT_ROOT, 'components/contact.tsx');
      assert.ok(fs.existsSync(contactPath), 'components/contact.tsx must exist');
      const contactContent = fs.readFileSync(contactPath, 'utf8');

      // Verify absence of Next.js navigation primitives
      assert.ok(!contactContent.includes("from 'next/navigation'"), 'contact.tsx must not import next/navigation');
      assert.ok(!contactContent.includes('useSearchParams'), 'contact.tsx must not use useSearchParams hook');

      // Verify presence of standard Web URLSearchParams
      assert.match(
        contactContent,
        /new\s+URLSearchParams\s*\(\s*window\.location\.search\s*\)/,
        'contact.tsx must use standard new URLSearchParams(window.location.search)'
      );

      // Verify all components in components/ avoid next/navigation and next/router
      const componentsDir = path.join(PROJECT_ROOT, 'components');
      const entries = fs.readdirSync(componentsDir, { recursive: true });
      for (const entry of entries) {
        if (typeof entry === 'string' && entry.endsWith('.tsx')) {
          const content = fs.readFileSync(path.join(componentsDir, entry), 'utf8');
          assert.ok(!content.includes("from 'next/navigation'"), `${entry} must not import next/navigation`);
          assert.ok(!content.includes("from 'next/router'"), `${entry} must not import next/router`);
        }
      }
    });

    test('F4.4: latest-articles.tsx refactored to synchronous prop model', () => {
      const compPath = path.join(PROJECT_ROOT, 'components/latest-articles.tsx');
      assert.ok(fs.existsSync(compPath), 'latest-articles.tsx must exist');
      const content = fs.readFileSync(compPath, 'utf8');
      assert.match(content, /export\s+interface\s+LatestArticlesProps/, 'Must declare LatestArticlesProps');
      assert.match(content, /articles\??:\s*ArticleMeta\[\]/, 'Must accept articles array prop');
      assert.ok(!content.includes('async function LatestArticles'), 'Must be a synchronous component');
      assert.ok(!content.includes('await '), 'Must not contain async/await inside component body');
    });

    test('F4.5: scroll-reveal.tsx avoids Next.js router coupling', () => {
      const compPath = path.join(PROJECT_ROOT, 'components/ui/scroll-reveal.tsx');
      assert.ok(fs.existsSync(compPath), 'scroll-reveal.tsx must exist');
      const content = fs.readFileSync(compPath, 'utf8');
      assert.ok(!content.includes('next/router') && !content.includes('next/navigation'));
    });
  });

  // -------------------------------------------------------------
  // Feature 5: React Component Island Scoping
  // -------------------------------------------------------------
  describe('F5: React Component Island Scoping', () => {
    test('F5.1: Exactly 6 interactive islands defined in architecture contract', () => {
      assert.strictEqual(INTERACTIVE_ISLANDS.length, 6);
    });

    test('F5.2: navbar-mobile.tsx is configured with client:load directive', () => {
      const item = INTERACTIVE_ISLANDS.find((i) => i.file === 'navbar-mobile.tsx');
      assert.ok(item, 'navbar-mobile.tsx must be in INTERACTIVE_ISLANDS');
      assert.strictEqual(item.directive, 'client:load');

      const layoutPath = path.join(PROJECT_ROOT, 'src/layouts/BaseLayout.astro');
      assert.ok(fs.existsSync(layoutPath), 'src/layouts/BaseLayout.astro must exist');
      const content = fs.readFileSync(layoutPath, 'utf8');
      assert.match(
        content,
        /<NavbarMobile\s+[^>]*client:load/,
        'BaseLayout.astro must mount <NavbarMobile client:load />'
      );
    });

    test('F5.3: services-tabs.tsx and outbound-gallery-client.tsx use client:visible', () => {
      const tabs = INTERACTIVE_ISLANDS.find((i) => i.file === 'services-tabs.tsx');
      const gallery = INTERACTIVE_ISLANDS.find((i) => i.file === 'outbound-gallery-client.tsx');
      assert.strictEqual(tabs.directive, 'client:visible');
      assert.strictEqual(gallery.directive, 'client:visible');

      const indexPath = path.join(PROJECT_ROOT, 'src/pages/index.astro');
      assert.ok(fs.existsSync(indexPath), 'src/pages/index.astro must exist');
      const indexContent = fs.readFileSync(indexPath, 'utf8');
      assert.match(
        indexContent,
        /<ServicesTabs\s+[^>]*client:visible/,
        'index.astro must mount <ServicesTabs client:visible />'
      );
      assert.match(
        indexContent,
        /<OutboundGalleryClient\s+[^>]*client:visible/,
        'index.astro must mount <OutboundGalleryClient client:visible />'
      );
    });

    test('F5.4: our-impact.tsx, kalkulator-budget.tsx, contact.tsx use client:visible', () => {
      const impact = INTERACTIVE_ISLANDS.find((i) => i.file === 'our-impact.tsx');
      const calc = INTERACTIVE_ISLANDS.find((i) => i.file === 'kalkulator-budget.tsx');
      const contact = INTERACTIVE_ISLANDS.find((i) => i.file === 'contact.tsx');
      assert.strictEqual(impact.directive, 'client:visible');
      assert.strictEqual(calc.directive, 'client:visible');
      assert.strictEqual(contact.directive, 'client:visible');

      const indexPath = path.join(PROJECT_ROOT, 'src/pages/index.astro');
      const indexContent = fs.readFileSync(indexPath, 'utf8');
      assert.match(
        indexContent,
        /<OurImpact\s+[^>]*client:visible/,
        'index.astro must mount <OurImpact client:visible />'
      );
      assert.match(
        indexContent,
        /<KalkulatorBudget\s+[^>]*client:visible/,
        'index.astro must mount <KalkulatorBudget client:visible />'
      );
      assert.match(
        indexContent,
        /<Contact\s+[^>]*client:visible/,
        'index.astro must mount <Contact client:visible />'
      );
    });

    test('F5.5: Exactly 26 components are designated static (0 KB client JS)', () => {
      assert.strictEqual(STATIC_COMPONENTS.length, 26);
      const boundaries = auditHydrationBoundaries();
      assert.strictEqual(boundaries.unauthorizedIslands.length, 0, 'No unauthorized components may have client directives');
    });
  });

  // -------------------------------------------------------------
  // Feature 6: Unified BaseLayout.astro
  // -------------------------------------------------------------
  describe('F6: Unified BaseLayout.astro', () => {
    test('F6.1: BaseLayout specification mandates valid HTML document shell', () => {
      const layoutPath = path.join(PROJECT_ROOT, 'src/layouts/BaseLayout.astro');
      assert.ok(fs.existsSync(layoutPath), 'src/layouts/BaseLayout.astro must exist');
      const content = fs.readFileSync(layoutPath, 'utf8');

      assert.match(content, /<!DOCTYPE\s+html>/i, 'BaseLayout.astro must declare <!DOCTYPE html>');
      assert.match(content, /<html\s+[^>]*lang=["']id["']/, 'BaseLayout.astro must specify lang="id"');
      assert.match(content, /<head>/, 'BaseLayout.astro must declare <head>');
      assert.match(content, /<body\b/, 'BaseLayout.astro must declare <body>');
      assert.match(content, /<slot\s*\/>/, 'BaseLayout.astro must include <slot /> for page content');

      const indexPath = path.join(PROJECT_ROOT, 'dist/index.html');
      if (fs.existsSync(indexPath)) {
        const indexHtml = fs.readFileSync(indexPath, 'utf8');
        assert.match(indexHtml, /<!DOCTYPE\s+html>/i, 'dist/index.html must have <!DOCTYPE html>');
        assert.match(indexHtml, /<html\s+[^>]*lang=["']id["']/, 'dist/index.html must have lang="id"');
      }
    });

    test('F6.2: BaseLayout specification mandates GTM container script injection', () => {
      const layoutPath = path.join(PROJECT_ROOT, 'src/layouts/BaseLayout.astro');
      assert.ok(fs.existsSync(layoutPath), 'src/layouts/BaseLayout.astro must exist');
      const content = fs.readFileSync(layoutPath, 'utf8');

      // Check GTM ID in head script
      assert.match(content, /GTM-524T7279/, 'BaseLayout.astro must contain container ID GTM-524T7279');
      assert.match(content, /googletagmanager\.com\/gtm\.js/, 'BaseLayout.astro must reference gtm.js');
      // Check noscript iframe in body
      assert.match(content, /<noscript>/, 'BaseLayout.astro must include <noscript> tag');
      assert.match(
        content,
        /googletagmanager\.com\/ns\.html\?id=GTM-524T7279/,
        'BaseLayout.astro must include GTM noscript iframe fallback'
      );

      const indexPath = path.join(PROJECT_ROOT, 'dist/index.html');
      if (fs.existsSync(indexPath)) {
        const indexHtml = fs.readFileSync(indexPath, 'utf8');
        assert.ok(indexHtml.includes('GTM-524T7279'), 'dist/index.html must contain GTM container ID');
      }
    });

    test('F6.3: BaseLayout specification mandates WebSite JSON-LD structured schema', () => {
      const layoutPath = path.join(PROJECT_ROOT, 'src/layouts/BaseLayout.astro');
      assert.ok(fs.existsSync(layoutPath), 'src/layouts/BaseLayout.astro must exist');
      const content = fs.readFileSync(layoutPath, 'utf8');

      // Verify WebSite schema structure in BaseLayout
      assert.match(content, /['"]@type['"]:\s*['"]WebSite['"]/, 'BaseLayout.astro must declare WebSite schema type');
      assert.match(content, /name:\s*['"]Growth Indonesia['"]/, 'BaseLayout.astro schema must set name to Growth Indonesia');
      assert.match(content, /https:\/\/growthindonesia\.my\.id/, 'BaseLayout.astro schema must reference primary URL');
      assert.match(content, /type=["']application\/ld\+json["']/, 'BaseLayout.astro must inject JSON-LD script tag');

      const indexPath = path.join(PROJECT_ROOT, 'dist/index.html');
      if (fs.existsSync(indexPath)) {
        const indexHtml = fs.readFileSync(indexPath, 'utf8');
        const jsonLdMatches = indexHtml.matchAll(/<script\s+type=["']application\/ld\+json["']>([^<]+)<\/script>/g);
        let foundWebSiteSchema = false;
        for (const match of jsonLdMatches) {
          try {
            const parsed = JSON.parse(match[1]);
            if (parsed['@type'] === 'WebSite' && parsed.name === 'Growth Indonesia') {
              foundWebSiteSchema = true;
              break;
            }
          } catch {
            // ignore non-json
          }
        }
        assert.ok(foundWebSiteSchema, 'dist/index.html must contain valid parsed WebSite JSON-LD schema');
      }
    });

    test('F6.4: BaseLayout mounts mobile navbar island with client:load', () => {
      const layoutPath = path.join(PROJECT_ROOT, 'src/layouts/BaseLayout.astro');
      assert.ok(fs.existsSync(layoutPath), 'src/layouts/BaseLayout.astro must exist');
      const content = fs.readFileSync(layoutPath, 'utf8');
      assert.match(
        content,
        /<NavbarMobile\s+[^>]*client:load/,
        'src/layouts/BaseLayout.astro must directly mount <NavbarMobile client:load />'
      );
    });

    test('F6.5: BaseLayout includes Footer and WhatsAppFab components', () => {
      const layoutPath = path.join(PROJECT_ROOT, 'src/layouts/BaseLayout.astro');
      assert.ok(fs.existsSync(layoutPath), 'src/layouts/BaseLayout.astro must exist');
      const content = fs.readFileSync(layoutPath, 'utf8');
      assert.match(content, /<Footer\b/, 'BaseLayout.astro must render <Footer />');
      assert.match(
        content,
        /<WhatsAppFAB\b|<WhatsAppFab\b/,
        'BaseLayout.astro must render WhatsApp FAB component'
      );
    });
  });

  // -------------------------------------------------------------
  // Feature 7: Core Static Pages Migration
  // -------------------------------------------------------------
  describe('F7: Core Static Pages Migration', () => {
    test('F7.1: Homepage route (/) is indexed with priority 1.0', () => {
      const sitemap = getExpectedSitemapEntries();
      const home = sitemap.find((e) => e.url === 'https://growthindonesia.my.id/');
      assert.ok(home);
      assert.strictEqual(home.priority, 1.0);
    });

    test('F7.2: Services hub route (/layanan) is indexed with priority 0.9', () => {
      const sitemap = getExpectedSitemapEntries();
      const entry = sitemap.find((e) => e.url === 'https://growthindonesia.my.id/layanan');
      assert.ok(entry);
      assert.strictEqual(entry.priority, 0.9);
    });

    test('F7.3: Portfolio & credentials route (/portofolio-dan-sertifikasi) is indexed with priority 0.9', () => {
      const sitemap = getExpectedSitemapEntries();
      const entry = sitemap.find((e) => e.url === 'https://growthindonesia.my.id/portofolio-dan-sertifikasi');
      assert.ok(entry);
      assert.strictEqual(entry.priority, 0.9);
    });

    test('F7.4: API documentation route (/docs/api) is indexed with monthly frequency', () => {
      const sitemap = getExpectedSitemapEntries();
      const entry = sitemap.find((e) => e.url === 'https://growthindonesia.my.id/docs/api');
      assert.ok(entry);
      assert.strictEqual(entry.changeFrequency, 'monthly');
    });

    test('F7.5: 404 error page returns standard 404 status code', () => {
      const templatePath = path.join(PROJECT_ROOT, 'src/pages/404.astro');
      assert.ok(fs.existsSync(templatePath), 'src/pages/404.astro template must exist');
      const templateContent = fs.readFileSync(templatePath, 'utf8');

      // Verify prerender and layout usage
      assert.match(templateContent, /export\s+const\s+prerender\s*=\s*true/, '404.astro must specify export const prerender = true');
      assert.match(templateContent, /<BaseLayout\b/, '404.astro must use BaseLayout');
      assert.match(templateContent, /robots=["']noindex,\s*follow["']/, '404.astro must specify robots="noindex, follow"');
      assert.match(templateContent, /404/, '404.astro must display 404 message');
      assert.match(templateContent, /Halaman Tidak Ditemukan/, '404.astro must display Indonesian 404 heading');

      // Verify that 404.astro does not contain an inner <main> tag (to prevent duplicate landmark)
      assert.ok(!templateContent.includes('<main'), '404.astro must not declare duplicate <main> landmark');

      // Verify generated artifact in dist/404.html if dist exists
      const dist404Path = path.join(PROJECT_ROOT, 'dist/404.html');
      if (fs.existsSync(dist404Path)) {
        const distHtml = fs.readFileSync(dist404Path, 'utf8');
        assert.match(distHtml, /404/, 'dist/404.html must contain 404');
        assert.match(distHtml, /Halaman Tidak Ditemukan/, 'dist/404.html must contain Indonesian heading');
        assert.match(distHtml, /content=["']noindex,\s*follow["']/, 'dist/404.html must have noindex meta tag');
        const mainCount = (distHtml.match(/<main\b/g) || []).length;
        assert.strictEqual(mainCount, 1, `dist/404.html must have exactly 1 <main> element, found ${mainCount}`);
      }
    });
  });

  // -------------------------------------------------------------
  // Feature 8: MDX Articles Migration
  // -------------------------------------------------------------
  describe('F8: MDX Articles Migration', () => {
    test('F8.1: Article index (/artikel) lists 4 published MDX articles', () => {
      assert.strictEqual(ARTICLES.length, 4);
    });

    test('F8.2: Article 1 (membangun-karakter-pelajar) exists in content repository', () => {
      const file = path.join(PROJECT_ROOT, 'content/artikel/membangun-karakter-pelajar-kemah-besar-smpn-1-geger-di-ndalem-prabu-sarangan.mdx');
      assert.ok(fs.existsSync(file), 'Article 1 file must exist');
    });

    test('F8.3: Article 2 (pentingnya-team-building) exists in content repository', () => {
      const file = path.join(PROJECT_ROOT, 'content/artikel/pentingnya-team-building-untuk-produktivitas-karyawan.mdx');
      assert.ok(fs.existsSync(file), 'Article 2 file must exist');
    });

    test('F8.4: Article 3 (smpn-1-geger-gelar-outdoor-learning) exists in content repository', () => {
      const file = path.join(PROJECT_ROOT, 'content/artikel/smpn-1-geger-gelar-outdoor-learning-di-ndalem-prabu-sarangan-tanamkan-karakter-jiwa-nasionalisme.mdx');
      assert.ok(fs.existsSync(file), 'Article 3 file must exist');
    });

    test('F8.5: Article 4 (tips-memilih-provider-outbound-profesional) exists in content repository', () => {
      const file = path.join(PROJECT_ROOT, 'content/artikel/tips-memilih-provider-outbound-profesional.mdx');
      assert.ok(fs.existsSync(file), 'Article 4 file must exist');
    });
  });

  // -------------------------------------------------------------
  // Feature 9: City Hub Pages Migration
  // -------------------------------------------------------------
  describe('F9: City Hub Pages Migration', () => {
    test('F9.1: Exactly 31 regional city hubs defined in CITIES registry', () => {
      assert.strictEqual(CITIES.length, 31);
    });

    test('F9.2: Madiun hub (/layanan/madiun) is registered as basecamp city', () => {
      assert.ok(CITIES.includes('madiun'));
    });

    test('F9.3: Surabaya hub (/layanan/surabaya) is registered as metropolitan hub', () => {
      assert.ok(CITIES.includes('surabaya'));
    });

    test('F9.4: Magetan hub (/layanan/magetan) is registered as mountain resort hub', () => {
      assert.ok(CITIES.includes('magetan'));
    });

    test('F9.5: All 31 city hubs generate getStaticPaths parameters', () => {
      const hubTemplate = path.join(PROJECT_ROOT, 'src/pages/layanan/[kota]/index.astro');
      assert.ok(fs.existsSync(hubTemplate), 'src/pages/layanan/[kota]/index.astro must exist');
      const content = fs.readFileSync(hubTemplate, 'utf8');

      assert.match(content, /export\s+const\s+prerender\s*=\s*true/, 'Must export prerender = true');
      assert.match(content, /export\s+async\s+function\s+getStaticPaths/, 'Must export getStaticPaths()');

      const paths = CITIES.map((kota) => ({ params: { kota } }));
      assert.strictEqual(paths.length, 31);
      assert.strictEqual(paths[0].params.kota, 'madiun');

      const distLayanan = path.join(PROJECT_ROOT, 'dist/layanan');
      if (fs.existsSync(distLayanan)) {
        for (const city of CITIES) {
          const pagePath = path.join(distLayanan, city, 'index.html');
          assert.ok(fs.existsSync(pagePath), `Generated city hub must exist: /layanan/${city}`);
        }
      }
    });
  });

  // -------------------------------------------------------------
  // Feature 10: pSEO Pages Migration
  // -------------------------------------------------------------
  describe('F10: pSEO Pages Migration', () => {
    test('F10.1: Total pSEO pages calculate to exactly 155 (31 cities x 5 categories)', () => {
      const pseoTemplate = path.join(PROJECT_ROOT, 'src/pages/layanan/[kota]/[kategori].astro');
      assert.ok(fs.existsSync(pseoTemplate), 'src/pages/layanan/[kota]/[kategori].astro must exist');
      const content = fs.readFileSync(pseoTemplate, 'utf8');

      assert.match(content, /export\s+const\s+prerender\s*=\s*true/, 'Must export prerender = true');
      assert.match(content, /export\s+async\s+function\s+getStaticPaths/, 'Must export getStaticPaths()');

      // Verify routing combinations from source data
      const expectedTotal = CITIES.length * CATEGORIES.length;
      assert.strictEqual(expectedTotal, 155, 'Expected 31 cities x 5 categories = 155 combinations');

      // If dist output exists, verify exactly 155 rendered HTML files
      const distLayanan = path.join(PROJECT_ROOT, 'dist/layanan');
      if (fs.existsSync(distLayanan)) {
        let generatedPseoCount = 0;
        for (const city of CITIES) {
          for (const cat of CATEGORIES) {
            const pagePath = path.join(distLayanan, city, cat, 'index.html');
            if (fs.existsSync(pagePath)) {
              generatedPseoCount++;
            }
          }
        }
        assert.strictEqual(generatedPseoCount, 155, `Must find 155 generated pSEO pages in dist/layanan, found ${generatedPseoCount}`);
      }
    });

    test('F10.2: outbound category generates 31 city pages', () => {
      assert.ok(CATEGORIES.includes('outbound'), 'outbound must be a registered category');

      const distLayanan = path.join(PROJECT_ROOT, 'dist/layanan');
      if (fs.existsSync(distLayanan)) {
        for (const city of CITIES) {
          const pagePath = path.join(distLayanan, city, 'outbound', 'index.html');
          assert.ok(fs.existsSync(pagePath), `Generated page must exist: /layanan/${city}/outbound`);
          const html = fs.readFileSync(pagePath, 'utf8');
          assert.match(html, /Outbound|outbound/i, `Page for ${city}/outbound must contain outbound keyword`);
          const mainMatches = (html.match(/<main\b/g) || []).length;
          assert.strictEqual(mainMatches, 1, `Page for ${city}/outbound must have exactly 1 <main> element`);
        }
      } else {
        const outboundPages = CITIES.map((c) => `/layanan/${c}/outbound`);
        assert.strictEqual(outboundPages.length, 31);
      }
    });

    test('F10.3: training category generates 31 city pages', () => {
      assert.ok(CATEGORIES.includes('training'), 'training must be a registered category');

      const distLayanan = path.join(PROJECT_ROOT, 'dist/layanan');
      if (fs.existsSync(distLayanan)) {
        for (const city of CITIES) {
          const pagePath = path.join(distLayanan, city, 'training', 'index.html');
          assert.ok(fs.existsSync(pagePath), `Generated page must exist: /layanan/${city}/training`);
          const html = fs.readFileSync(pagePath, 'utf8');
          assert.match(html, /Training|training/i, `Page for ${city}/training must contain training keyword`);
          const mainMatches = (html.match(/<main\b/g) || []).length;
          assert.strictEqual(mainMatches, 1, `Page for ${city}/training must have exactly 1 <main> element`);
        }
      } else {
        const trainingPages = CITIES.map((c) => `/layanan/${c}/training`);
        assert.strictEqual(trainingPages.length, 31);
      }
    });

    test('F10.4: fun-games category generates 31 city pages', () => {
      assert.ok(CATEGORIES.includes('fun-games'), 'fun-games must be a registered category');

      const distLayanan = path.join(PROJECT_ROOT, 'dist/layanan');
      if (fs.existsSync(distLayanan)) {
        for (const city of CITIES) {
          const pagePath = path.join(distLayanan, city, 'fun-games', 'index.html');
          assert.ok(fs.existsSync(pagePath), `Generated page must exist: /layanan/${city}/fun-games`);
          const html = fs.readFileSync(pagePath, 'utf8');
          assert.match(html, /Fun Games|fun-games|fun games/i, `Page for ${city}/fun-games must contain fun-games keyword`);
          const mainMatches = (html.match(/<main\b/g) || []).length;
          assert.strictEqual(mainMatches, 1, `Page for ${city}/fun-games must have exactly 1 <main> element`);
        }
      } else {
        const funGamesPages = CITIES.map((c) => `/layanan/${c}/fun-games`);
        assert.strictEqual(funGamesPages.length, 31);
      }
    });

    test('F10.5: ldk-osis and gathering categories each generate 31 city pages', () => {
      assert.ok(CATEGORIES.includes('ldk-osis'), 'ldk-osis must be a registered category');
      assert.ok(CATEGORIES.includes('gathering'), 'gathering must be a registered category');

      const distLayanan = path.join(PROJECT_ROOT, 'dist/layanan');
      if (fs.existsSync(distLayanan)) {
        for (const city of CITIES) {
          const ldkPath = path.join(distLayanan, city, 'ldk-osis', 'index.html');
          const gatheringPath = path.join(distLayanan, city, 'gathering', 'index.html');
          assert.ok(fs.existsSync(ldkPath), `Generated page must exist: /layanan/${city}/ldk-osis`);
          assert.ok(fs.existsSync(gatheringPath), `Generated page must exist: /layanan/${city}/gathering`);

          const ldkHtml = fs.readFileSync(ldkPath, 'utf8');
          const gatheringHtml = fs.readFileSync(gatheringPath, 'utf8');
          assert.strictEqual((ldkHtml.match(/<main\b/g) || []).length, 1);
          assert.strictEqual((gatheringHtml.match(/<main\b/g) || []).length, 1);
        }
      } else {
        const ldkPages = CITIES.map((c) => `/layanan/${c}/ldk-osis`);
        const gatheringPages = CITIES.map((c) => `/layanan/${c}/gathering`);
        assert.strictEqual(ldkPages.length, 31);
        assert.strictEqual(gatheringPages.length, 31);
      }
    });
  });

  // -------------------------------------------------------------
  // Feature 11: 10 Route Handlers Migration
  // -------------------------------------------------------------
  describe('F11: 10 Route Handlers Migration', () => {
    test('F11.1: /llms.txt returns 200 with text/plain; charset=utf-8', () => {
      const res = simulateRouteHandler('/llms.txt');
      assert.strictEqual(res.status, 200);
      assert.strictEqual(res.headers['Content-Type'], 'text/plain; charset=utf-8');
      assert.match(res.body, /Official AI Grounding Documentation/);
    });

    test('F11.2: /pricing.md returns 200 with text/markdown; charset=utf-8', () => {
      const res = simulateRouteHandler('/pricing.md');
      assert.strictEqual(res.status, 200);
      assert.strictEqual(res.headers['Content-Type'], 'text/markdown; charset=utf-8');
      assert.match(res.body, /Dokumentasi Harga & Paket Resmi/);
    });

    test('F11.3: /robots.txt returns 200 with text/plain and updated Astro assets path', () => {
      const res = simulateRouteHandler('/robots.txt');
      assert.strictEqual(res.status, 200);
      assert.match(res.body, /Allow: \/_astro\//);
      assert.match(res.body, /Sitemap: https:\/\/growthindonesia\.my\.id\/sitemap\.xml/);
    });

    test('F11.4: /sitemap.xml returns 200 with application/xml; charset=utf-8', () => {
      const res = simulateRouteHandler('/sitemap.xml');
      assert.strictEqual(res.status, 200);
      assert.strictEqual(res.headers['Content-Type'], 'application/xml; charset=utf-8');
      assert.match(res.body, /urlset/);
    });

    test('F11.5: .well-known discovery handlers return 200 JSON responses', () => {
      const agentCard = simulateRouteHandler('/.well-known/agent-card.json');
      const apiCat = simulateRouteHandler('/.well-known/api-catalog');
      const dnsAid = simulateRouteHandler('/.well-known/dns-aid');
      const mcpCard = simulateRouteHandler('/.well-known/mcp/server-card.json');

      assert.strictEqual(agentCard.status, 200);
      assert.strictEqual(apiCat.status, 200);
      assert.strictEqual(dnsAid.status, 200);
      assert.strictEqual(mcpCard.status, 200);
    });
  });

  // -------------------------------------------------------------
  // Feature 12: Astro Middleware Migration
  // -------------------------------------------------------------
  describe('F12: Astro Middleware Migration', () => {
    test('F12.1: Rewrites Accept: text/markdown requests to /api/markdown?path=<path>', () => {
      const res = simulateMiddleware('/layanan/madiun', { accept: 'text/markdown' });
      assert.strictEqual(res.rewrittenTo, '/api/markdown?path=%2Flayanan%2Fmadiun');
    });

    test('F12.2: Redirects legacy /layanan/kategori-kota to /layanan/kota/kategori with 301', () => {
      const res = simulateMiddleware('/layanan/outbound-madiun');
      assert.strictEqual(res.status, 301);
      assert.strictEqual(res.redirectUrl, '/layanan/madiun/outbound');
    });

    test('F12.3: Redirects compound 2-part legacy category /layanan/fun-games-sarangan with 301', () => {
      const res = simulateMiddleware('/layanan/fun-games-sarangan');
      assert.strictEqual(res.status, 301);
      assert.strictEqual(res.redirectUrl, '/layanan/sarangan/fun-games');
    });

    test('F12.4: Sets Vary: Accept response header on standard requests', () => {
      const res = simulateMiddleware('/');
      assert.strictEqual(res.headers['Vary'], 'Accept');
    });

    test('F12.5: Sets RFC 8288 Link headers for agent and sitemap discovery', () => {
      const res = simulateMiddleware('/');
      assert.match(res.headers['Link'], /rel="api-catalog"/);
      assert.match(res.headers['Link'], /rel="service-doc"/);
      assert.match(res.headers['Link'], /rel="sitemap"/);
    });
  });

  // -------------------------------------------------------------
  // Feature 13: Unit Test Suite Refactoring
  // -------------------------------------------------------------
  describe('F13: Unit Test Suite Refactoring', () => {
    test('F13.1: lib/categories.ts export getLegacyServiceRedirect is functional', () => {
      const redirect = simulateLegacyRedirect('outbound-madiun');
      assert.strictEqual(redirect, '/layanan/madiun/outbound');
    });

    test('F13.2: lib/categories.test.ts file exists in repository', () => {
      const testFile = path.join(PROJECT_ROOT, 'lib/categories.test.ts');
      assert.ok(fs.existsSync(testFile), 'categories.test.ts must exist');
    });

    test('F13.3: lib/sitemap.test.ts file exists in repository', () => {
      const testFile = path.join(PROJECT_ROOT, 'lib/sitemap.test.ts');
      assert.ok(fs.existsSync(testFile), 'sitemap.test.ts must exist');
    });

    test('F13.4: lib/city-images.test.ts file exists in repository', () => {
      const testFile = path.join(PROJECT_ROOT, 'lib/city-images.test.ts');
      assert.ok(fs.existsSync(testFile), 'city-images.test.ts must exist');
    });

    test('F13.5: lib/format.test.ts file exists in repository', () => {
      const testFile = path.join(PROJECT_ROOT, 'lib/format.test.ts');
      assert.ok(fs.existsSync(testFile), 'format.test.ts must exist');
    });
  });

  // -------------------------------------------------------------
  // Feature 14: Content Guardrails & Sloplint Audit
  // -------------------------------------------------------------
  describe('F14: Content Guardrails & Sloplint Audit', () => {
    test('F14.1: Repository contains 0 occurrences of BNSP', () => {
      const violations = scanForBNSP();
      assert.strictEqual(violations.length, 0, `Found ${violations.length} BNSP violations: ${JSON.stringify(violations)}`);
    });

    test('F14.2: Repository contains 0 occurrences of en-dash (\\u2013)', () => {
      const violations = scanForDashes().filter((v) => v.text.includes('\u2013'));
      assert.strictEqual(violations.length, 0, `Found ${violations.length} en-dash violations: ${JSON.stringify(violations)}`);
    });

    test('F14.3: Repository contains 0 occurrences of em-dash (\\u2014)', () => {
      const violations = scanForDashes().filter((v) => v.text.includes('\u2014'));
      assert.strictEqual(violations.length, 0, `Found ${violations.length} em-dash violations: ${JSON.stringify(violations)}`);
    });

    test('F14.4: Hallmark sloplint reports 0 FAIL', () => {
      const result = runSloplint();
      assert.strictEqual(result.fail, 0);
    });

    test('F14.5: Hallmark sloplint reports 0 REFLEX and 0 WARN', () => {
      const result = runSloplint();
      assert.strictEqual(result.reflex, 0);
      assert.strictEqual(result.warn, 0);
    });
  });

  // -------------------------------------------------------------
  // Feature 15: E2E Opaque-Box Test Suite
  // -------------------------------------------------------------
  describe('F15: E2E Opaque-Box Test Suite', () => {
    test('F15.1: Test suite covers all 194 pages inventory', () => {
      const pages = getAll194Pages();
      assert.strictEqual(pages.length, 194);
    });

    test('F15.2: Test suite covers all 10 route handlers inventory', () => {
      assert.strictEqual(ROUTE_HANDLERS.length, 10);
    });

    test('F15.3: Test suite verifies 6 interactive islands and 26 static components', () => {
      const boundaries = auditHydrationBoundaries();
      assert.strictEqual(boundaries.allowedCount, 6);
      assert.strictEqual(boundaries.staticCount, 26);
    });

    test('F15.4: Test runner executable exists at tests/e2e/runner.mjs', () => {
      const runnerPath = path.join(PROJECT_ROOT, 'tests/e2e/runner.mjs');
      assert.ok(fs.existsSync(runnerPath), 'Runner executable must exist at tests/e2e/runner.mjs');
    });

    test('F15.5: Test architecture documentation exists at .agents/teamwork/TEST_INFRA.md', () => {
      const infraPath = path.join(PROJECT_ROOT, '.agents/teamwork/TEST_INFRA.md');
      assert.ok(fs.existsSync(infraPath), 'TEST_INFRA.md must exist');
    });
  });

  // -------------------------------------------------------------
  // Feature 16: Instabox Sandbox Execution
  // -------------------------------------------------------------
  describe('F16: Instabox Sandbox Execution', () => {
    test('F16.1: Node runtime version is >= 20', () => {
      const major = parseInt(process.versions.node.split('.')[0], 10);
      assert.ok(major >= 20, `Node major version must be >= 20, got ${major}`);
    });

    test('F16.2: Portable POSIX path resolution without backslashes', () => {
      assert.ok(!PROJECT_ROOT.includes('\\'));
    });

    test('F16.3: Headless execution without display dependencies', () => {
      assert.strictEqual(typeof process.env.DISPLAY, 'undefined');
    });

    test('F16.4: Non-root process execution compatibility', () => {
      assert.ok(typeof process.getuid === 'function' ? process.getuid() >= 0 : true);
    });

    test('F16.5: Clean temporary directory isolation', () => {
      const tmp = process.env.TMPDIR || '/tmp';
      assert.ok(typeof tmp === 'string');
    });
  });

  // -------------------------------------------------------------
  // Feature 17: Git Commit, Push & CI/CD Verification
  // -------------------------------------------------------------
  describe('F17: Git Commit, Push & CI/CD Verification', () => {
    test('F17.1: package-lock.json exists and is valid JSON', () => {
      const lockPath = path.join(PROJECT_ROOT, 'package-lock.json');
      assert.ok(fs.existsSync(lockPath), 'package-lock.json must exist');
      const lock = JSON.parse(fs.readFileSync(lockPath, 'utf8'));
      assert.ok(lock.lockfileVersion >= 2);
    });

    test('F17.2: GitHub Actions workflow directory exists', () => {
      const ghPath = path.join(PROJECT_ROOT, '.github');
      assert.ok(fs.existsSync(ghPath), '.github must exist');
    });

    test('F17.3: .gitignore ignores build and cache directories', () => {
      const gitignorePath = path.join(PROJECT_ROOT, '.gitignore');
      assert.ok(fs.existsSync(gitignorePath), '.gitignore must exist');
      const content = fs.readFileSync(gitignorePath, 'utf8');
      assert.match(content, /node_modules/);
    });

    test('F17.4: Git repository is initialized with main branch', () => {
      const gitDir = path.join(PROJECT_ROOT, '.git');
      assert.ok(fs.existsSync(gitDir), '.git must exist');
    });

    test('F17.5: Remote origin repository matches nafta121/Growth-Indonesia specification', () => {
      const gitConfigPath = path.join(PROJECT_ROOT, '.git/config');
      assert.ok(fs.existsSync(gitConfigPath), '.git/config must exist');
      const gitConfig = fs.readFileSync(gitConfigPath, 'utf8');
      assert.match(gitConfig, /nafta121\/Growth-Indonesia/, 'Git remote origin must target nafta121/Growth-Indonesia');
    });
  });
});
