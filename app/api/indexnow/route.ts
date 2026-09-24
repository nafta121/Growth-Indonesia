import { NextRequest, NextResponse } from 'next/server';
import { submitToIndexNow, INDEXNOW_KEY, INDEXNOW_HOST, INDEXNOW_KEY_LOCATION } from '@/lib/indexnow';
import { CITIES } from '@/lib/cities';

function isAuthorized(req: NextRequest) {
  const authHeader = req.headers.get('authorization');
  const secret = process.env.INDEXNOW_SUBMIT_SECRET;
  if (!secret) {
    // If secret is not configured, deny access to sensitive actions by default
    return false;
  }
  return authHeader === `Bearer ${secret}`;
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const singleUrl = searchParams.get('url');
  const submitAll = searchParams.get('all');

  if (submitAll === 'true') {
    if (!isAuthorized(req)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Generate all dynamic URLs from site
    const KATEGORI = ['outbound', 'training', 'fun-games', 'ldk-osis', 'gathering'];
    const allUrls: string[] = [
      `https://${INDEXNOW_HOST}/`,
      `https://${INDEXNOW_HOST}/layanan`,
      `https://${INDEXNOW_HOST}/artikel`,
    ];

    Object.keys(CITIES).forEach((kota) => {
      allUrls.push(`https://${INDEXNOW_HOST}/layanan/${kota}`);
      KATEGORI.forEach((kat) => {
        allUrls.push(`https://${INDEXNOW_HOST}/layanan/${kota}/${kat}`);
      });
    });

    const result = await submitToIndexNow(allUrls);
    return NextResponse.json({
      message: 'Batch IndexNow submission completed',
      ...result,
    });
  }

  if (singleUrl) {
    if (!isAuthorized(req)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const result = await submitToIndexNow([singleUrl]);
    return NextResponse.json({
      message: 'Single URL IndexNow submission completed',
      ...result,
    });
  }

  return NextResponse.json({
    message: 'IndexNow API endpoint active',
    key: INDEXNOW_KEY,
    keyLocation: INDEXNOW_KEY_LOCATION,
    usage: {
      submitSingle: `GET /api/indexnow?url=https://${INDEXNOW_HOST}/layanan/madiun/outbound`,
      submitAll: `GET /api/indexnow?all=true`,
      submitPost: `POST /api/indexnow with JSON body { "urls": ["https://${INDEXNOW_HOST}/..."] }`,
      note: 'Requires Authorization: Bearer <INDEXNOW_SUBMIT_SECRET> header for submissions.',
    },
  });
}

export async function POST(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    let urlsToSubmit: string[] = [];

    if (Array.isArray(body.urls)) {
      urlsToSubmit = body.urls;
    } else if (Array.isArray(body.urlList)) {
      urlsToSubmit = body.urlList;
    } else if (typeof body.url === 'string') {
      urlsToSubmit = [body.url];
    }

    if (urlsToSubmit.length === 0) {
      return NextResponse.json(
        { error: 'No valid URLs provided in body. Pass { urls: [...] }' },
        { status: 400 }
      );
    }

    const result = await submitToIndexNow(urlsToSubmit);
    return NextResponse.json({
      message: 'IndexNow submission completed',
      ...result,
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid JSON payload', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 400 }
    );
  }
}
