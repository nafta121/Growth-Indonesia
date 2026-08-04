import { NextResponse } from 'next/server';

export async function GET() {
  const serverCard = {
    $schema: 'https://modelcontextprotocol.io/schemas/server-card/v1.json',
    serverInfo: {
      name: 'Growth Indonesia MCP Server',
      version: '1.0.0',
      description: 'Model Context Protocol (MCP) server providing corporate outbound program discovery, venue coordination, experiential team building analytics, and event planning services for East Java.',
    },
    server: {
      name: 'Growth Indonesia MCP Server',
      version: '1.0.0',
      description: 'Model Context Protocol (MCP) server providing corporate outbound program discovery, venue coordination, experiential team building analytics, and event planning services for East Java.',
    },
    transports: [
      {
        type: 'streamable-http',
        endpoint: 'https://growthindonesia.my.id/api/mcp',
      },
      {
        type: 'sse',
        endpoint: 'https://growthindonesia.my.id/api/mcp/sse',
      },
    ],
    transport: {
      type: 'streamable-http',
      endpoint: 'https://growthindonesia.my.id/api/mcp',
    },
    capabilities: {
      resources: {
        subscribe: true,
        listChanged: true,
      },
      prompts: {
        listChanged: true,
      },
      tools: {
        listChanged: true,
      },
      logging: {},
    },
    authentication: {
      type: 'oauth2',
      protected_resource: 'https://growthindonesia.my.id/.well-known/oauth-protected-resource',
      authorization_server: 'https://growthindonesia.my.id/.well-known/oauth-authorization-server',
    },
    documentationUrl: 'https://growthindonesia.my.id/docs/api',
  };

  return NextResponse.json(serverCard, {
    status: 200,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': 'public, max-age=86400, s-maxage=604800',
    },
  });
}
