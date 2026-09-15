import { test, describe } from 'node:test';
import assert from 'node:assert';
import { getCityImage } from './city-images';
import { CITIES } from './cities';

describe('getCityImage', () => {
  const EXPECTED_IMAGES = [
    'https://nafta121.sirv.com/OUTBOUND/2022-10-22%2009-00-09.jpeg',
    'https://nafta121.sirv.com/OUTBOUND/2022-11-05%2006-52-48.jpeg',
    'https://nafta121.sirv.com/Screenshot_20260430_171224_Chrome.jpg',
  ];

  describe('Fallback behavior (index === -1)', () => {
    test('returns first image as fallback for non-existent city key', () => {
      const result = getCityImage('non-existent-city');
      assert.strictEqual(result, EXPECTED_IMAGES[0]);
    });

    test('returns first image as fallback for empty string', () => {
      const result = getCityImage('');
      assert.strictEqual(result, EXPECTED_IMAGES[0]);
    });

    test('returns first image as fallback for incorrect case sensitivity', () => {
      const result = getCityImage('Madiun');
      assert.strictEqual(result, EXPECTED_IMAGES[0]);
    });

    test('returns first image as fallback for keys with trailing whitespace', () => {
      const result = getCityImage('madiun ');
      assert.strictEqual(result, EXPECTED_IMAGES[0]);
    });
  });

  describe('Known city key mapping and image cycling', () => {
    test('returns expected image for specific city indices', () => {
      const cityKeys = Object.keys(CITIES);
      assert.strictEqual(getCityImage(cityKeys[0]), EXPECTED_IMAGES[0]); // Index 0 -> Image 0
      assert.strictEqual(getCityImage(cityKeys[1]), EXPECTED_IMAGES[1]); // Index 1 -> Image 1
      assert.strictEqual(getCityImage(cityKeys[2]), EXPECTED_IMAGES[2]); // Index 2 -> Image 2
      assert.strictEqual(getCityImage(cityKeys[3]), EXPECTED_IMAGES[0]); // Index 3 -> Modulo 0 -> Image 0
    });

    test('correctly maps all configured cities using modulo arithmetic', () => {
      const cityKeys = Object.keys(CITIES);
      assert.ok(cityKeys.length > 0, 'CITIES should contain at least one city');

      cityKeys.forEach((key, index) => {
        const expectedImage = EXPECTED_IMAGES[index % EXPECTED_IMAGES.length];
        const actualImage = getCityImage(key);
        assert.strictEqual(
          actualImage,
          expectedImage,
          `City key "${key}" at index ${index} should return image index ${index % EXPECTED_IMAGES.length}`
        );
      });
    });

    test('always returns a valid HTTPS URL string', () => {
      const cityKeys = Object.keys(CITIES);
      cityKeys.forEach((key) => {
        const url = getCityImage(key);
        assert.ok(typeof url === 'string' && url.startsWith('https://'));
      });
    });
  });
});
