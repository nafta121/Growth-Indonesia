import { NextResponse } from 'next/server';

export async function GET() {
  const agentCard = {
    $schema: 'https://a2a-protocol.org/schemas/v1/agent-card.json',
    name: 'Growth Indonesia AI Agent',
    version: '1.0.0',
    description: 'Autonomous AI Agent for Growth Indonesia specializing in digital strategy, SEO audits, market intelligence, and business transformation consulting.',
    protocolVersion: '1.0.0',
    supportedInterfaces: [
      {
        url: 'https://growthindonesia.my.id/api/a2a',
        transport: 'HTTP-REST',
        protocol: 'A2A',
      },
      {
        url: 'https://growthindonesia.my.id/api/a2a/jsonrpc',
        transport: 'JSON-RPC',
        protocol: 'A2A',
      },
      {
        url: 'https://growthindonesia.my.id/api/mcp',
        transport: 'MCP-HTTP',
        protocol: 'MCP',
      },
    ],
    capabilities: {
      streaming: true,
      pushNotifications: false,
      asyncProcessing: true,
      interactiveMode: true,
    },
    skills: [
      {
        id: 'digital-growth-analytics',
        name: 'Digital Growth & Market Analytics',
        description: 'Provide digital market penetration strategies, growth benchmarks, and marketing performance evaluation in Indonesia.',
      },
      {
        id: 'seo-content-audit',
        name: 'SEO & AI Readability Audit',
        description: 'Audit website structure, content optimization, structured data schema, and AI agent discovery metadata.',
      },
      {
        id: 'business-consulting-discovery',
        name: 'Business Consulting & Partner Matching',
        description: 'Match corporate growth objectives with specialized digital agency solutions and service proposals.',
      },
      {
        id: 'market-intelligence-indonesia',
        name: 'Indonesian Market Intelligence',
        description: 'Deliver actionable consumer behavior insights, regulatory compliance advice, and e-commerce growth trends in South East Asia.',
      },
    ],
    authentication: {
      type: 'oauth2',
      protectedResource: 'https://growthindonesia.my.id/.well-known/oauth-protected-resource',
      authorizationServer: 'https://growthindonesia.my.id/.well-known/oauth-authorization-server',
    },
    documentationUrl: 'https://growthindonesia.my.id/docs/api',
  };

  return NextResponse.json(agentCard, {
    status: 200,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': 'public, max-age=86400, s-maxage=604800',
    },
  });
}
