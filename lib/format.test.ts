import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { formatSlug } from './format';

describe('formatSlug', () => {
  it('returns empty string when slug is empty or empty-like', () => {
    assert.equal(formatSlug(''), '');
    // @ts-expect-error testing runtime robustness with non-string falsy inputs
    assert.equal(formatSlug(null), '');
    // @ts-expect-error testing runtime robustness with non-string falsy inputs
    assert.equal(formatSlug(undefined), '');
  });

  it('capitalizes a single word slug', () => {
    assert.equal(formatSlug('outbound'), 'Outbound');
  });

  it('converts hyphenated multi-word slug to title case separated by spaces', () => {
    assert.equal(formatSlug('team-building-batu'), 'Team Building Batu');
  });

  it('handles mixed case inputs correctly by normalizing to title case', () => {
    assert.equal(formatSlug('tEaM-bUiLdInG'), 'Team Building');
  });

  it('handles slugs with numbers correctly', () => {
    assert.equal(formatSlug('paket-outbound-2025'), 'Paket Outbound 2025');
  });
});
