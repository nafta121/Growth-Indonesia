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
        name: 'Growth Indonesia Outbound & Event Management API Services',
        description: 'Catalog of available discovery endpoints, sitemaps, and documentation for Growth Indonesia Corporate Outbound & Event Organizer.',
        documentation: '/docs/api',
        endpoints: [
          {
            path: '/sitemap.xml',
            method: 'GET',
            description: 'XML Sitemap listing all active service areas, articles, and landing pages.',
          },
          {
            path: '/llms.txt',
            method: 'GET',
            description: 'AI grounding overview document with services, venues, and contact info.',
          },
          {
            path: '/pricing.md',
            method: 'GET',
            description: 'Machine-readable pricing and corporate bundle reference in Markdown.',
          },
          {
            path: '/api/markdown',
            method: 'GET',
            description: 'Markdown content negotiation endpoint for pages and articles.',
          },
          {
            path: 'navigator.modelContext',
            method: 'CLIENT-WEBMCP',
            description: 'WebMCP browser client tools API provided via navigator.modelContext.provideContext().',
          },
          {
            path: '/.well-known/agent-card.json',
            method: 'GET',
            description: 'A2A Agent Card specification for agent discovery.',
          },
          {
            path: '/.well-known/mcp/server-card.json',
            method: 'GET',
            description: 'MCP Server Card specification for Model Context Protocol discovery.',
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
