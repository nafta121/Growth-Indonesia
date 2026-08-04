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
            path: '/.well-known/x402',
            method: 'GET',
            description: 'x402 Agent-Native HTTP Payment Protocol discovery configuration metadata.',
          },
          {
            path: '/api/x402/premium',
            method: 'GET/POST',
            description: 'x402 HTTP 402 protected endpoint returning premium market intelligence for AI agents.',
          },
          {
            path: '/.well-known/agent-skills/index.json',
            method: 'GET',
            description: 'Agent Skills Discovery Index (RFC v0.2.0) listing all supported agent skills and SHA-256 digests.',
          },
          {
            path: 'navigator.modelContext',
            method: 'CLIENT-WEBMCP',
            description: 'WebMCP (W3C Web Machine Learning CG) browser client tools API provided via navigator.modelContext.provideContext().',
          },
          {
            path: '/.well-known/agent-card.json',
            method: 'GET',
            description: 'A2A Agent Card specification for agent-to-agent discovery and skill registration.',
          },
          {
            path: '/.well-known/mcp/server-card.json',
            method: 'GET',
            description: 'MCP Server Card specification (SEP-1649) for Model Context Protocol agent discovery.',
          },
          {
            path: '/auth.md',
            method: 'GET',
            description: 'Auth.md Agent Registration and Authentication Protocol specification.',
          },
          {
            path: '/.well-known/oauth-protected-resource',
            method: 'GET',
            description: 'OAuth Protected Resource Metadata specification (RFC 9728).',
          },
          {
            path: '/.well-known/openid-configuration',
            method: 'GET',
            description: 'OpenID Connect 1.0 discovery metadata specification for agent authentication.',
          },
          {
            path: '/.well-known/oauth-authorization-server',
            method: 'GET',
            description: 'OAuth 2.0 Authorization Server metadata (RFC 8414).',
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
