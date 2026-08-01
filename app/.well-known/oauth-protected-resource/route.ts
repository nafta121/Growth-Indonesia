import { NextResponse } from 'next/server';

export async function GET() {
  const protectedResourceMetadata = {
    resource: 'https://growthindonesia.my.id',
    authorization_servers: ['https://growthindonesia.my.id'],
    scopes_supported: ['api:read', 'api:write'],
    bearer_methods_supported: ['header'],
    resource_documentation: 'https://growthindonesia.my.id/docs/api',
  };

  return NextResponse.json(protectedResourceMetadata, {
    status: 200,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': 'public, max-age=86400, s-maxage=604800',
    },
  });
}
