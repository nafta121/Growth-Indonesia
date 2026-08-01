import { NextResponse } from 'next/server';

export async function GET() {
  const dnsAidConfig = {
    $schema: 'https://datatracker.ietf.org/doc/draft-mozleywilliams-dnsop-dnsaid/',
    domain: 'growthindonesia.my.id',
    dnssec: true,
    records: [
      {
        name: '_index._agents.growthindonesia.my.id',
        type: 'HTTPS',
        priority: 1,
        target: 'growthindonesia.my.id',
        params: {
          alpn: 'h2,h3',
          port: 443,
          path: '/.well-known/api-catalog',
        },
      },
      {
        name: '_a2a._agents.growthindonesia.my.id',
        type: 'HTTPS',
        priority: 1,
        target: 'growthindonesia.my.id',
        params: {
          alpn: 'h2,h3',
          port: 443,
          path: '/docs/api',
        },
      },
    ],
    zone_file_example: `_index._agents.growthindonesia.my.id. 3600 IN HTTPS 1 growthindonesia.my.id. alpn="h2,h3" port=443 path="/.well-known/api-catalog"
_a2a._agents.growthindonesia.my.id.   3600 IN HTTPS 1 growthindonesia.my.id. alpn="h2,h3" port=443 path="/docs/api"`,
  };

  return NextResponse.json(dnsAidConfig, {
    status: 200,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
