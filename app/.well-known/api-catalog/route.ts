import { NextResponse } from 'next/server';

export async function GET() {
  const catalog = {
    linkset: [
      {
        anchor: 'https://growthindonesia.my.id/',
        'api-catalog': [
          {
            href: '/docs/api',
            type: 'text/html',
            title: 'Growth Indonesia API & Service Documentation',
          },
        ],
        sitemap: [
          {
            href: '/sitemap.xml',
            type: 'application/xml',
          },
        ],
      },
    ],
    services: [
      {
        name: 'Growth Indonesia Services & Outbound API',
        description: 'Catalog of available endpoints, sitemaps, and documentation for Growth Indonesia.',
        documentation: '/docs/api',
        endpoints: [
          {
            path: '/sitemap.xml',
            method: 'GET',
            description: 'XML Sitemap listing all active service areas, articles, and landing pages.',
          },
          {
            path: '/.well-known/http-message-signatures-directory',
            method: 'GET',
            description: 'Web Bot Auth JWKS directory for HTTP message signature verification.',
          },
          {
            path: '/.well-known/dns-aid',
            method: 'GET',
            description: 'DNS-AID SVCB/HTTPS discovery record specifications.',
          },
          {
            path: '/robots.txt',
            method: 'GET',
            description: 'Robots specification for search engines and AI crawlers.',
          },
        ],
      },
    ],
  };

  return NextResponse.json(catalog, {
    status: 200,
    headers: {
      'Content-Type': 'application/linkset+json; charset=utf-8',
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  });
}
