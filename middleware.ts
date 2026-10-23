import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getLegacyServiceRedirect } from '@/lib/categories';

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const pathname = url.pathname;
  const acceptHeader = request.headers.get('accept') || '';

  // Handle Markdown content negotiation for AI agents
  if (
    acceptHeader.includes('text/markdown') &&
    !pathname.startsWith('/_next') &&
    !pathname.startsWith('/api') &&
    !pathname.match(/\.(png|jpg|jpeg|gif|svg|ico|css|js|json|xml|txt)$/)
  ) {
    url.pathname = '/api/markdown';
    url.searchParams.set('path', pathname);
    return NextResponse.rewrite(url);
  }

  // Handle redirects for old path structure: /layanan/kategori-kota -> /layanan/kota/kategori
  if (pathname.startsWith('/layanan/')) {
    const segments = pathname.split('/').filter(Boolean);
    if (segments.length === 2 && segments[0] === 'layanan') {
      const dest = getLegacyServiceRedirect(segments[1].toLowerCase());
      if (dest) {
        url.pathname = dest;
        return NextResponse.redirect(url, 301);
      }
    }
  }

  const response = NextResponse.next();
  response.headers.set('Vary', 'Accept');
  response.headers.set(
    'Link',
    '</.well-known/api-catalog>; rel="api-catalog", </docs/api>; rel="service-doc", </sitemap.xml>; rel="sitemap"'
  );
  return response;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
