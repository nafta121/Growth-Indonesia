import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { KATEGORI, CATEGORIES_SET } from './categories';
import { PACKAGES } from './packages';
import { GET as getLlmsTxt } from '../app/llms.txt/route';

describe('KATEGORI & CATEGORIES_SET', () => {
  it('contains all 5 canonical category slugs', () => {
    assert.deepEqual(KATEGORI, [
      'outbound',
      'training',
      'fun-games',
      'ldk-osis',
      'gathering',
    ]);
    for (const slug of KATEGORI) {
      assert.equal(CATEGORIES_SET.has(slug), true);
    }
  });

  it('rejects non-canonical category slugs', () => {
    assert.equal(CATEGORIES_SET.has('outbound-team-building'), false);
    assert.equal(CATEGORIES_SET.has('gathering-corporate'), false);
    assert.equal(CATEGORIES_SET.has('ldk-osis-sekolah'), false);
    assert.equal(CATEGORIES_SET.has('event-organizer-eo'), false);
  });
});

describe('PACKAGES pricing alignment with DESIGN.md', () => {
  it('matches DESIGN.md featured package prices', () => {
    const leaders = PACKAGES.find((p) => p.id === 'leaders');
    const generation = PACKAGES.find((p) => p.id === 'generation');
    const fun = PACKAGES.find((p) => p.id === 'fun');

    assert.equal(leaders?.price, 'Rp. 9.500.000');
    assert.equal(generation?.price, 'Rp. 7.000.000');
    assert.equal(fun?.price, 'Rp. 5.500.000');
  });
});

describe('/llms.txt AI grounding route', () => {
  it('returns status 200 and canonical /layanan/madiun/{kategori} URLs', async () => {
    const response = await getLlmsTxt();
    assert.equal(response.status, 200);
    const body = await response.text();

    assert.match(body, /https:\/\/growthindonesia\.my\.id\/layanan\/madiun\/outbound/);
    assert.match(body, /https:\/\/growthindonesia\.my\.id\/layanan\/madiun\/training/);
    assert.match(body, /https:\/\/growthindonesia\.my\.id\/layanan\/madiun\/gathering/);
    assert.match(body, /https:\/\/growthindonesia\.my\.id\/layanan\/madiun\/ldk-osis/);
    assert.match(body, /https:\/\/growthindonesia\.my\.id\/layanan\/madiun\/fun-games/);
  });
});
