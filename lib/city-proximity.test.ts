import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { getNearbyCities } from './city-proximity';
import { CITIES } from './cities';

describe('getNearbyCities', () => {
  const allCityKeys = Object.keys(CITIES);

  it('returns the next 6 nearby cities by default for a known city key', () => {
    const result = getNearbyCities('madiun');
    assert.strictEqual(result.length, 6);
    assert.deepStrictEqual(result, [
      'ponorogo',
      'magetan',
      'ngawi',
      'nganjuk',
      'pacitan',
      'kediri',
    ]);
  });

  it('respects custom count parameter for a known city key', () => {
    const count = 3;
    const result = getNearbyCities('madiun', count);
    assert.strictEqual(result.length, count);
    assert.deepStrictEqual(result, ['ponorogo', 'magetan', 'ngawi']);
  });

  it('wraps around circularly when target city is near the end of the cities list', () => {
    const lastCityKey = allCityKeys[allCityKeys.length - 1]; // 'situbondo'
    const count = 4;
    const result = getNearbyCities(lastCityKey, count);
    assert.strictEqual(result.length, count);
    // Should wrap around to the first cities in the list
    assert.deepStrictEqual(result, [
      allCityKeys[0],
      allCityKeys[1],
      allCityKeys[2],
      allCityKeys[3],
    ]);
  });

  it('returns the first `count` cities if the target city key is invalid or not found', () => {
    const result = getNearbyCities('nonexistent-city-key', 5);
    assert.strictEqual(result.length, 5);
    assert.deepStrictEqual(result, allCityKeys.slice(0, 5));
  });

  it('returns the first 6 cities if target city key is invalid and no count is provided', () => {
    const result = getNearbyCities('unknown');
    assert.strictEqual(result.length, 6);
    assert.deepStrictEqual(result, allCityKeys.slice(0, 6));
  });

  it('returns an empty array when count is 0', () => {
    const resultKnown = getNearbyCities('madiun', 0);
    assert.deepStrictEqual(resultKnown, []);

    const resultUnknown = getNearbyCities('unknown', 0);
    assert.deepStrictEqual(resultUnknown, []);
  });
});
