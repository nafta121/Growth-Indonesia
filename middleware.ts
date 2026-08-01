import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { KATEGORI } from '@/lib/categories';

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
    
    // We only want to rewrite if it closely matches the exact 2-segment pattern
    // where segment 0 is "layanan" and segment 1 includes a hyphenated category-city.
    if (segments.length === 2 && segments[0] === 'layanan') {
      const slug = segments[1];
      
      for (const category of KATEGORI) {
        if (slug.startsWith(`${category}-`)) {
          const city = slug.replace(`${category}-`, '');
          
          if (city) {
            url.pathname = `/layanan/${city}/${category}`;
            // Return 301 Permanent Redirect to consolidate Link Juice
            return NextResponse.redirect(url, 301);
          }
        }
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
