import type { APIRoute } from 'astro';
import {
  submitToIndexNow,
  INDEXNOW_KEY,
  INDEXNOW_HOST,
  INDEXNOW_KEY_LOCATION,
  MAX_INDEXNOW_BATCH_SIZE,
} from '@/lib/indexnow';
import { CITIES } from '@/lib/cities';
import { KATEGORI } from '@/lib/categories';
import { getAllArticles } from '@/lib/mdx';

export const prerender = false;

function isAuthorized(request: Request, url: URL): boolean {
  const secret = process.env.INDEXNOW_SECRET || INDEXNOW_KEY;
  const authHeader = request.headers.get('authorization')?.replace(/^Bearer\s+/i, '');
  const queryKey = url.searchParams.get('key');
  return authHeader === secret || queryKey === secret;
}

export const GET: APIRoute = async ({ request, url }) => {
  const singleUrl = url.searchParams.get('url');
  const submitAll = url.searchParams.get('all');

  if (submitAll === 'true' || singleUrl) {
    if (!isAuthorized(request, url)) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
      });
    }
  }

  if (submitAll === 'true') {
    const articles = await getAllArticles();
    const allUrls: string[] = [
      `https://${INDEXNOW_HOST}/`,
      `https://${INDEXNOW_HOST}/layanan`,
      `https://${INDEXNOW_HOST}/portofolio-dan-sertifikasi`,
      `https://${INDEXNOW_HOST}/artikel`,
      `https://${INDEXNOW_HOST}/docs/api`,
      ...articles.map((a) => `https://${INDEXNOW_HOST}/artikel/${a.slug}`),
    ];

    Object.keys(CITIES).forEach((kota) => {
      allUrls.push(`https://${INDEXNOW_HOST}/layanan/${kota}`);
      KATEGORI.forEach((kat) => {
        allUrls.push(`https://${INDEXNOW_HOST}/layanan/${kota}/${kat}`);
      });
    });

    const result = await submitToIndexNow(allUrls);
    return new Response(
      JSON.stringify({
        message: 'Batch IndexNow submission completed',
        ...result,
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
      }
    );
  }

  if (singleUrl) {
    const result = await submitToIndexNow([singleUrl]);
    return new Response(
      JSON.stringify({
        message: 'Single URL IndexNow submission completed',
        ...result,
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
      }
    );
  }

  return new Response(
    JSON.stringify({
      message: 'IndexNow API endpoint active',
      keyLocation: INDEXNOW_KEY_LOCATION,
    }),
    {
      status: 200,
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
    }
  );
};

export const POST: APIRoute = async ({ request, url }) => {
  if (!isAuthorized(request, url)) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
    });
  }

  try {
    const body = await request.json();
    let urlsToSubmit: string[] = [];

    if (Array.isArray(body?.urls)) {
      urlsToSubmit = body.urls;
    } else if (Array.isArray(body?.urlList)) {
      urlsToSubmit = body.urlList;
    } else if (typeof body?.url === 'string') {
      urlsToSubmit = [body.url];
    }

    if (urlsToSubmit.length === 0) {
      return new Response(
        JSON.stringify({ error: 'No valid URLs provided in body. Pass { urls: [...] }' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json; charset=utf-8' },
        }
      );
    }

    if (urlsToSubmit.length > MAX_INDEXNOW_BATCH_SIZE) {
      return new Response(
        JSON.stringify({ error: 'Batch size exceeds maximum limit of 250 URLs' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json; charset=utf-8' },
        }
      );
    }

    const result = await submitToIndexNow(urlsToSubmit);
    return new Response(
      JSON.stringify({
        message: 'IndexNow submission completed',
        ...result,
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: 'Invalid JSON payload',
        details: error instanceof Error ? error.message : 'Unknown error',
      }),
      {
        status: 400,
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
      }
    );
  }
};
