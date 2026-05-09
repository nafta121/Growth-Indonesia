import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const pathname = url.pathname;

  // Handle redirects for old path structure: /layanan/kategori-kota -> /layanan/kota/kategori
  if (pathname.startsWith('/layanan/')) {
    const segments = pathname.split('/').filter(Boolean);
    
    // We only want to rewrite if it closely matches the exact 2-segment pattern
    // where segment 0 is "layanan" and segment 1 includes a hyphenated category-city.
    if (segments.length === 2 && segments[0] === 'layanan') {
      const slug = segments[1];
      
      const categories = ['outbound', 'training', 'fun-games', 'ldk-osis', 'gathering'];
      
      for (const category of categories) {
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

  return NextResponse.next();
}

export const config = {
  // Only execute middleware on paths starting with /layanan to save performance overhead
  matcher: ['/layanan/:path*'],
};
