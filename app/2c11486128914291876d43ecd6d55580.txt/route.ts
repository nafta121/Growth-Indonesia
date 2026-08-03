import { NextResponse } from 'next/server';

export async function GET() {
  const key = '2c11486128914291876d43ecd6d55580';
  return new NextResponse(key, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, s-maxage=604800',
    },
  });
}
