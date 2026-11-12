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

  // 3. Inject standard discovery and Link headers for all other responses
  const response = await next();
  response.headers.set('Vary', 'Accept');
  response.headers.set(
    'Link',
    '</.well-known/api-catalog>; rel="api-catalog", </docs/api>; rel="service-doc", </sitemap.xml>; rel="sitemap"'
  );
  return response;
});
