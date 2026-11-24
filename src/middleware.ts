import { defineMiddleware } from 'astro:middleware';
import { getLegacyServiceRedirect } from '@/lib/categories';

export const onRequest = defineMiddleware(async (context, next) => {
  const { pathname } = context.url;
  const acceptHeader = context.isPrerendered ? '' : (context.request.headers.get('accept') || '');

  // 1. Handle Markdown content negotiation rewrite for AI agents
  if (
    acceptHeader.includes('text/markdown') &&
    !pathname.startsWith('/_astro') &&
    !pathname.startsWith('/_next') &&
    !pathname.startsWith('/cdn') &&
    !pathname.startsWith('/api') &&
    !pathname.match(/\.(png|jpg|jpeg|gif|webp|svg|ico|css|js|json|xml|txt|md)$/)
  ) {
    const rewritePath = `/api/markdown?path=${encodeURIComponent(pathname)}`;
    return context.rewrite(rewritePath);
  }

  // 2. Handle 301 Permanent Redirect for legacy service URL structure:
  // /layanan/:slug -> /layanan/:city/:kategori
  if (pathname.startsWith('/layanan/')) {
    const segments = pathname.split('/').filter(Boolean);
    if (segments.length === 2 && segments[0] === 'layanan') {
      const dest = getLegacyServiceRedirect(segments[1].toLowerCase());
      if (dest) {
        return context.redirect(dest, 301);
      }
    }
  }

  // 3. Inject standard discovery, Link, and security headers for all SSR responses
  const response = await next();
  response.headers.set('Vary', 'Accept');
  response.headers.set(
    'Link',
    '</.well-known/api-catalog>; rel="api-catalog", </docs/api>; rel="service-doc", </sitemap.xml>; rel="sitemap"'
  );
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  response.headers.set('X-Frame-Options', 'SAMEORIGIN');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  response.headers.set(
    'Content-Security-Policy',
    "default-src 'self'; script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.clarity.ms https://scripts.clarity.ms https://static.cloudflareinsights.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com data:; img-src 'self' https://growthindonesia.my.id https://www.googletagmanager.com https://c.clarity.ms https://c.bing.com data: blob:; connect-src 'self' https://www.google-analytics.com https://analytics.google.com https://www.googletagmanager.com https://*.clarity.ms https://cloudflareinsights.com; frame-src 'self' https://www.googletagmanager.com; object-src 'none'; base-uri 'self'; frame-ancestors 'self'"
  );
  return response;
});
