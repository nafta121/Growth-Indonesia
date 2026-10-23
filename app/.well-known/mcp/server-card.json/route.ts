import { NextResponse } from 'next/server';

export async function GET() {
  const serverCard = {
    $schema: 'https://modelcontextprotocol.io/schemas/server-card/v1.json',
    serverInfo: {
      name: 'Growth Indonesia WebMCP Discovery',
      version: '1.0.0',
      description: 'Browser WebMCP and Markdown discovery endpoints providing corporate outbound program discovery, venue coordination, and event planning services for East Java.',
    },
    transports: [
      {
        type: 'browser-webmcp',
        endpoint: 'navigator.modelContext',
      },
      {
        type: 'http-markdown',
        endpoint: 'https://growthindonesia.my.id/api/markdown',
      },
    ],
    capabilities: {
      resources: {
        subscribe: false,
        listChanged: false,
      },
      prompts: {
        listChanged: false,
      },
      tools: {
        listChanged: false,
      },
    },
    authentication: {
      type: 'none',
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
