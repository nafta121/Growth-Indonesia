import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { KATEGORI, CATEGORIES_SET } from './categories';
import { PACKAGES } from './packages';
import { getContentVariations } from './content-variations';
import { getLocalBusinessSchema, getCityServiceFaqs, getFaqSchema } from './schema';
import { INDEXNOW_KEY } from './indexnow';
import { GET as getLlmsTxt } from '../app/llms.txt/route';
import { GET as getPricingMd } from '../app/pricing.md/route';

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

describe('SEO Audit & Programmatic SEO regression checks', () => {
  it('provides bespoke content variations with unique bodyIntro and 4 deliverables per category', () => {
    const seenIntros = new Set<string>();
    for (const slug of KATEGORI) {
      const variation = getContentVariations(slug, 'Madiun');
      assert.ok(variation.title.includes('Madiun'));
      assert.equal(variation.title.includes('| Growth Indonesia'), false);
      assert.ok(variation.bodyIntro.length > 40);
      assert.equal(variation.deliverables.length, 4);
      seenIntros.add(variation.bodyIntro);
    }
    assert.equal(seenIntros.size, KATEGORI.length);
  });

  it('synchronizes getCityServiceFaqs and getFaqSchema 1:1 with local venues', () => {
    const venues = ['Taman Wisata Umbul', 'Waduk Bening Widas', 'Hutan Pinus Nongko Ijo'];
    const faqs = getCityServiceFaqs('Fun Games', 'Madiun', venues);
    const schema = getFaqSchema('Fun Games', 'Madiun', venues);

    assert.equal(faqs.length, 4);
    assert.equal(schema.mainEntity.length, 4);
    assert.ok(faqs[2].answer.includes('Taman Wisata Umbul'));
    assert.equal(schema.mainEntity[2].acceptedAnswer.text, faqs[2].answer);
  });

  it('includes address, E.164 telephone, and all 5 categories in LocalBusiness schema', () => {
    const schema = getLocalBusinessSchema('Madiun');
    assert.equal(schema.telephone, '+6285704748186');
    assert.equal(schema.address.addressLocality, 'Madiun');
    assert.equal(schema.hasOfferCatalog.itemListElement.length, 5);
  });

  it('has matching IndexNow verification file in public/', () => {
    const keyFile = path.join(process.cwd(), 'public', `${INDEXNOW_KEY}.txt`);
    assert.equal(fs.existsSync(keyFile), true);
    assert.equal(fs.readFileSync(keyFile, 'utf8').trim(), INDEXNOW_KEY);
  });

  it('serves /pricing.md with status 200, official package prices, and no direct BNSP mention', async () => {
    const response = await getPricingMd();
    assert.equal(response.status, 200);
    const body = await response.text();
    assert.match(body, /Rp\. 9\.500\.000/);
    assert.match(body, /Rp\. 7\.000\.000/);
    assert.match(body, /Rp\. 5\.500\.000/);
    assert.doesNotMatch(body, /BNSP/i);
  });

  it('maintains valid content/marketing-loop-state.json with 0 em-dash/en-dash and accurate brand name', () => {
    const statePath = path.join(process.cwd(), 'content', 'marketing-loop-state.json');
    assert.equal(fs.existsSync(statePath), true);
    const raw = fs.readFileSync(statePath, 'utf8');
    assert.equal(/[\u2013\u2014]/.test(raw), false);
    assert.match(raw, /Growth Indonesia/);
    assert.doesNotMatch(raw, /Gemilang/i);
    const parsed = JSON.parse(raw);
    assert.equal(parsed.loopName, 'Weekly East Java pSEO & AI-Visibility Loop');
    assert.equal(parsed.indexNowKeyFile, '/e368c11258e94b86a9bc1a862c3042da.txt');
    assert.equal(Array.isArray(parsed.aiGroundingEndpoints), true);
    assert.equal(Array.isArray(parsed.recentlyOptimizedRoutes), true);
  });
});


