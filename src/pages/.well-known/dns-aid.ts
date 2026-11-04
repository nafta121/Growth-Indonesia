import type { APIRoute } from 'astro';

export const prerender = false;

export const GET: APIRoute = async () => {
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

  return new Response(JSON.stringify(dnsAidConfig), {
    status: 200,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
