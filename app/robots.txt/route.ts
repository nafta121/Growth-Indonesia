import { NextResponse } from 'next/server';

export async function GET() {
  const robotsTxt = `User-agent: *
Allow: /
Allow: /2c11486128914291876d43ecd6d55580.txt
Allow: /api/indexnow
Disallow: /api/
Disallow: /_next/

Content-Signal: ai-train=no, search=yes, ai-input=yes

Sitemap: https://growthindonesia.my.id/sitemap.xml
`;

  return new NextResponse(robotsTxt, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Content-Signal': 'ai-train=no, search=yes, ai-input=yes',
      'Cache-Control': 'public, max-age=86400',
    },
  });
}
