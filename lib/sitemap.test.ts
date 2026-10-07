import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import sitemap from '../app/sitemap';

describe('sitemap', () => {
  test('includes /llms.txt with high priority and weekly changeFrequency', () => {
    const result = sitemap();
    const llmsEntry = result.find((entry) => entry.url.endsWith('/llms.txt'));

    assert.ok(llmsEntry, 'llms.txt entry should exist in sitemap');
    assert.strictEqual(llmsEntry.priority, 0.8);
    assert.strictEqual(llmsEntry.changeFrequency, 'weekly');
    assert.ok(llmsEntry.url.startsWith('https://'));
  });

  test('respects NEXT_PUBLIC_SITE_URL environment variable', () => {
    const originalEnv = process.env.NEXT_PUBLIC_SITE_URL;
    process.env.NEXT_PUBLIC_SITE_URL = 'https://custom-domain.com';

    try {
      const result = sitemap();
      const llmsEntry = result.find((entry) => entry.url.endsWith('/llms.txt'));
      assert.ok(llmsEntry);
      assert.strictEqual(llmsEntry.url, 'https://custom-domain.com/llms.txt');
    } finally {
      if (originalEnv !== undefined) {
        process.env.NEXT_PUBLIC_SITE_URL = originalEnv;
      } else {
        delete process.env.NEXT_PUBLIC_SITE_URL;
      }
    }
  });
});
