import { BASE_URL, CITIES, CATEGORIES } from './constants.mjs';

/**
 * Evaluates legacy service redirects according to the canonical category logic.
 * Legacy URL: /layanan/:slug -> /layanan/:kota/:kategori
 */
export function simulateLegacyRedirect(slug) {
  const categoriesSet = new Set(CATEGORIES);
  if (categoriesSet.has(slug)) {
    return `/layanan/madiun/${slug}`;
  }
  const parts = slug.split('-');
  if (parts.length >= 3) {
    const cat2 = `${parts[0]}-${parts[1]}`;
    if (categoriesSet.has(cat2)) {
      const city = parts.slice(2).join('-');
      if (city) return `/layanan/${city}/${cat2}`;
    }
  }
  if (parts.length >= 2 && categoriesSet.has(parts[0])) {
    const city = parts.slice(1).join('-');
    if (city) return `/layanan/${city}/${parts[0]}`;
  }
  return null;
}

/**
 * Simulates middleware routing and header injection.
 */
export function simulateMiddleware(pathname, headers = {}) {
  const accept = headers['accept'] || headers['Accept'] || '';
  const result = {
    status: 200,
    headers: {
      'Vary': 'Accept',
      'Link': '</.well-known/api-catalog>; rel="api-catalog", </docs/api>; rel="service-doc", </sitemap.xml>; rel="sitemap"',
    },
    rewrittenTo: null,
    redirectUrl: null,
  };

  // 1. Content negotiation for markdown
  if (
    accept.includes('text/markdown') &&
    !pathname.startsWith('/_next') &&
    !pathname.startsWith('/_astro') &&
    !pathname.startsWith('/cdn') &&
    !pathname.startsWith('/api') &&
    !pathname.match(/\.(png|jpg|jpeg|gif|webp|svg|ico|css|js|json|xml|txt)$/)
  ) {
    result.rewrittenTo = `/api/markdown?path=${encodeURIComponent(pathname)}`;
    return result;
  }

  // 2. Redirects for legacy service paths: /layanan/kategori-kota -> /layanan/kota/kategori
  if (pathname.startsWith('/layanan/')) {
    const segments = pathname.split('/').filter(Boolean);
    if (segments.length === 2 && segments[0] === 'layanan') {
      const dest = simulateLegacyRedirect(segments[1].toLowerCase());
      if (dest) {
        result.status = 301;
        result.redirectUrl = dest;
        return result;
      }
    }
  }

  return result;
}

/**
 * Generates mock or simulated route handler responses.
 */
export function simulateRouteHandler(path, options = {}) {
  const { method = 'GET', headers = {}, body = null } = options;

  switch (path) {
    case '/llms.txt': {
      if (method !== 'GET') return { status: 405, headers: {}, body: 'Method Not Allowed' };
      return {
        status: 200,
        headers: {
          'Content-Type': 'text/plain; charset=utf-8',
          'Cache-Control': 'public, max-age=86400, s-maxage=86400',
        },
        body: '# Growth Indonesia - Official AI Grounding Documentation\n\n> Provider Outbound, Team Building, Experiential Learning...',
      };
    }
    case '/pricing.md': {
      if (method !== 'GET') return { status: 405, headers: {}, body: 'Method Not Allowed' };
      return {
        status: 200,
        headers: {
          'Content-Type': 'text/markdown; charset=utf-8',
          'Cache-Control': 'public, max-age=86400, s-maxage=86400',
        },
        body: '# Growth Indonesia - Dokumentasi Harga & Paket Resmi (Official Pricing Reference)\n\n> Dokumen referensi harga resmi...',
      };
    }
    case '/robots.txt': {
      if (method !== 'GET') return { status: 405, headers: {}, body: 'Method Not Allowed' };
      return {
        status: 200,
        headers: {
          'Content-Type': 'text/plain; charset=utf-8',
          'Content-Signal': 'ai-train=no, search=yes, ai-input=yes',
          'Cache-Control': 'public, max-age=86400',
        },
        body: 'User-agent: *\nAllow: /\nAllow: /_astro/\nAllow: /llms.txt\nAllow: /pricing.md\nDisallow: /api/\n\nSitemap: https://growthindonesia.my.id/sitemap.xml',
      };
    }
    case '/sitemap.xml': {
      if (method !== 'GET') return { status: 405, headers: {}, body: 'Method Not Allowed' };
      return {
        status: 200,
        headers: {
          'Content-Type': 'application/xml; charset=utf-8',
        },
        body: '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n</urlset>',
      };
    }
    case '/.well-known/agent-card.json': {
      return {
        status: 200,
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'Access-Control-Allow-Origin': '*',
          'Cache-Control': 'public, max-age=86400, s-maxage=604800',
        },
        body: JSON.stringify({
          $schema: 'https://a2a-protocol.org/schemas/v1/agent-card.json',
          name: 'Growth Indonesia AI Agent',
          version: '1.0.0',
        }),
      };
    }
    case '/.well-known/api-catalog': {
      return {
        status: 200,
        headers: {
          'Content-Type': 'application/linkset+json; charset=utf-8',
          'Access-Control-Allow-Origin': '*',
          'Cache-Control': 'public, max-age=3600, s-maxage=86400',
        },
        body: JSON.stringify({
          linkset: [{ anchor: 'https://growthindonesia.my.id/' }],
        }),
      };
    }
    case '/.well-known/dns-aid': {
      return {
        status: 200,
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'Access-Control-Allow-Origin': '*',
          'Cache-Control': 'public, max-age=3600',
        },
        body: JSON.stringify({
          domain: 'growthindonesia.my.id',
          dnssec: true,
        }),
      };
    }
    case '/.well-known/mcp/server-card.json': {
      return {
        status: 200,
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'Access-Control-Allow-Origin': '*',
          'Cache-Control': 'public, max-age=86400, s-maxage=604800',
        },
        body: JSON.stringify({
          $schema: 'https://modelcontextprotocol.io/schemas/server-card/v1.json',
          serverInfo: { name: 'Growth Indonesia WebMCP Discovery' },
        }),
      };
    }
    case '/api/indexnow': {
      if (method === 'POST') {
        const auth = headers['authorization'] || headers['Authorization'];
        if (!auth) return { status: 401, headers: {}, body: JSON.stringify({ error: 'Unauthorized' }) };
        if (!body || !body.urls || body.urls.length === 0) {
          return { status: 400, headers: {}, body: JSON.stringify({ error: 'No valid URLs provided in body' }) };
        }
        return {
          status: 200,
          headers: { 'Content-Type': 'application/json; charset=utf-8' },
          body: JSON.stringify({ message: 'IndexNow submission completed', success: true }),
        };
      }
      return {
        status: 200,
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
        body: JSON.stringify({ message: 'IndexNow API endpoint active' }),
      };
    }
    case '/api/markdown': {
      return {
        status: 200,
        headers: {
          'Content-Type': 'text/markdown; charset=utf-8',
          'Vary': 'Accept',
          'x-markdown-tokens': '250',
          'Access-Control-Allow-Origin': '*',
          'Cache-Control': 'public, max-age=3600',
          'Link': '</.well-known/api-catalog>; rel="api-catalog", </docs/api>; rel="service-doc", </sitemap.xml>; rel="sitemap"',
        },
        body: '# Growth Indonesia - Markdown Document\n\nContent for agents...',
      };
    }
    default:
      return { status: 404, headers: {}, body: 'Not Found' };
  }
}
