// @ts-expect-error Built by `npm run build` prior to Wrangler bundling
import astroWorker from '../dist/_worker.js/index.js';
import { getLegacyServiceRedirect } from '../lib/categories';

const STATIC_EXT_RE = /\.(png|jpg|jpeg|gif|webp|svg|ico|css|js|woff2?|json|xml|txt|md)$/i;

const CSP_POLICY =
  "default-src 'self'; script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.clarity.ms https://scripts.clarity.ms https://static.cloudflareinsights.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com data:; img-src 'self' https://growthindonesia.my.id https://www.googletagmanager.com https://c.clarity.ms https://c.bing.com data: blob:; connect-src 'self' https://www.google-analytics.com https://analytics.google.com https://www.googletagmanager.com https://*.clarity.ms https://cloudflareinsights.com; frame-src 'self' https://www.googletagmanager.com; object-src 'none'; base-uri 'self'; frame-ancestors 'self'";

const DISCOVERY_LINK_HEADER =
  '</.well-known/api-catalog>; rel="api-catalog", </docs/api>; rel="service-doc", </sitemap.xml>; rel="sitemap"';

function applyResponseHeaders(response: Response, pathname: string): Response {
  const headers = new Headers(response.headers);

  // Global security & agent-discovery headers (explicitly applied even when env.ASSETS.fetch is used)
  headers.set('X-Content-Type-Options', 'nosniff');
  headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  headers.set('X-Frame-Options', 'SAMEORIGIN');
  headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  headers.set('Content-Security-Policy', CSP_POLICY);

  if (!headers.has('Vary')) {
    headers.set('Vary', 'Accept');
  } else if (!headers.get('Vary')!.toLowerCase().includes('accept')) {
    headers.set('Vary', `${headers.get('Vary')}, Accept`);
  }

  if (!headers.has('Link')) {
    headers.set('Link', DISCOVERY_LINK_HEADER);
  }

  // Endpoint-specific content & cache headers
  if (pathname === '/robots.txt') {
    headers.set('Content-Type', 'text/plain; charset=utf-8');
    headers.set('Content-Signal', 'ai-train=no, search=yes, ai-input=yes');
    headers.set('Cache-Control', 'public, max-age=86400');
  } else if (pathname === '/llms.txt' || pathname === '/llms-full.txt') {
    headers.set('Content-Type', 'text/plain; charset=utf-8');
    headers.set('Access-Control-Allow-Origin', '*');
    headers.set('Cache-Control', 'public, max-age=86400');
  } else if (pathname === '/pricing.md') {
    headers.set('Content-Type', 'text/markdown; charset=utf-8');
    headers.set('Access-Control-Allow-Origin', '*');
    headers.set('Cache-Control', 'public, max-age=86400');
  } else if (pathname === '/sitemap.xml') {
    headers.set('Content-Type', 'application/xml; charset=utf-8');
    headers.set('Cache-Control', 'public, max-age=86400');
  } else if (pathname.startsWith('/.well-known/')) {
    headers.set('Access-Control-Allow-Origin', '*');
    if (pathname === '/.well-known/api-catalog') {
      headers.set('Content-Type', 'application/linkset+json; charset=utf-8');
      headers.set('Cache-Control', 'public, max-age=3600, s-maxage=86400');
    } else if (pathname === '/.well-known/dns-aid') {
      headers.set('Content-Type', 'application/json; charset=utf-8');
      headers.set('Cache-Control', 'public, max-age=3600');
    } else {
      headers.set('Content-Type', 'application/json; charset=utf-8');
      headers.set('Cache-Control', 'public, max-age=86400, s-maxage=604800');
    }
  } else if (pathname.startsWith('/cdn/')) {
    headers.set('Cache-Control', 'public, max-age=31536000, immutable');
    headers.set('Access-Control-Allow-Origin', '*');
  } else if (pathname.startsWith('/_astro/')) {
    headers.set('Cache-Control', 'public, max-age=31536000, immutable');
  }

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

export default {
  async fetch(request: Request, env: any, ctx: any): Promise<Response> {
    const url = new URL(request.url);
    const { pathname } = url;

    // 1. Canonical non-trailing-slash 301 redirect (eliminates 307 canonical conflicts)
    if (pathname.length > 1 && pathname.endsWith('/') && !pathname.startsWith('/api/')) {
      const canonicalPath = pathname.replace(/\/+$/, '');
      const dest = new URL(`${canonicalPath}${url.search}`, url.origin).toString();
      return Response.redirect(dest, 301);
    }

    // 1b. Serve /icon.png for legacy /favicon.ico browser requests (avoids console 404)
    if (pathname === '/favicon.ico') {
      const iconRes = await env.ASSETS.fetch(new Request(new URL('/icon.png', url.origin).toString(), request));
      return applyResponseHeaders(iconRes, '/icon.png');
    }

    // 2. Fast pass-through for immutable media, JS/CSS bundles, and static text/JSON/XML files
    if (
      pathname.startsWith('/_astro/') ||
      pathname.startsWith('/cdn/') ||
      STATIC_EXT_RE.test(pathname)
    ) {
      const assetRes = await env.ASSETS.fetch(request);
      if (assetRes.status !== 404) {
        return applyResponseHeaders(assetRes, pathname);
      }
      // Fall through to Astro Worker for SSR endpoints like /.well-known/api-catalog
    }

    // 3. Markdown Content Negotiation for AI Agents (Accept: text/markdown)
    const acceptHeader = request.headers.get('accept') || '';
    if (acceptHeader.includes('text/markdown') && !pathname.startsWith('/api/')) {
      const normalizedPath = pathname === '/' ? '/' : pathname.replace(/\/+$/, '');
      const mdUrl = new URL(`/api/markdown?path=${encodeURIComponent(normalizedPath)}`, url.origin);
      const mdRequest = new Request(mdUrl.toString(), {
        method: 'GET',
        headers: request.headers,
      });
      const mdRes = await astroWorker.fetch(mdRequest, env, ctx);
      return applyResponseHeaders(mdRes, pathname);
    }

    // 4. Legacy 301 Permanent Redirects: /layanan/:slug -> /layanan/:city/:kategori
    if (pathname.startsWith('/layanan/')) {
      const segments = pathname.split('/').filter(Boolean);
      if (segments.length === 2 && segments[0] === 'layanan') {
        const dest = getLegacyServiceRedirect(segments[1].toLowerCase());
        if (dest) {
          return Response.redirect(new URL(dest, url.origin).toString(), 301);
        }
      }
    }

    // 5. Delegate HTML and SSR API requests to the Astro Cloudflare Worker
    const response = await astroWorker.fetch(request, env, ctx);
    if (response.status >= 300 && response.status < 400) {
      return response;
    }
    return applyResponseHeaders(response, pathname);
  },
};
