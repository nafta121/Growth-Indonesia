export const INDEXNOW_KEY = '2c11486128914291876d43ecd6d55580';
export const INDEXNOW_HOST = 'growthindonesia.my.id';
export const INDEXNOW_KEY_LOCATION = `https://${INDEXNOW_HOST}/${INDEXNOW_KEY}.txt`;

export const INDEXNOW_ENDPOINTS = [
  'https://api.indexnow.org/indexnow',
  'https://www.bing.com/indexnow',
  'https://search.yandex.net/indexnow',
];

export interface IndexNowPayload {
  host: string;
  key: string;
  keyLocation?: string;
  urlList: string[];
}

export async function submitToIndexNow(urls: string[]) {
  if (!urls || urls.length === 0) {
    return { success: false, message: 'No URLs provided' };
  }

  // Normalize URLs to ensure they match host
  const formattedUrls = urls.map((u) => {
    if (u.startsWith('http://') || u.startsWith('https://')) {
      return u;
    }
    return `https://${INDEXNOW_HOST}${u.startsWith('/') ? '' : '/'}${u}`;
  });

  const payload: IndexNowPayload = {
    host: INDEXNOW_HOST,
    key: INDEXNOW_KEY,
    keyLocation: INDEXNOW_KEY_LOCATION,
    urlList: formattedUrls,
  };

  const results = [];

  for (const endpoint of INDEXNOW_ENDPOINTS) {
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
        body: JSON.stringify(payload),
      });

      results.push({
        endpoint,
        status: response.status,
        ok: response.ok,
        statusText: response.statusText,
      });
    } catch (error) {
      results.push({
        endpoint,
        status: 500,
        ok: false,
        error: error instanceof Error ? error.message : 'Fetch error',
      });
    }
  }

  const anySuccess = results.some((r) => r.ok || r.status === 200 || r.status === 202);

  return {
    success: anySuccess,
    results,
    submittedCount: formattedUrls.length,
    urls: formattedUrls,
  };
}
