import { describe, it, expect } from 'vitest';

import { createWordRegex } from './index';

describe('createWordRegex', () => {
  // Test basic word matching.
  it('should create regex that matches exact word.', () => {
    const regex = createWordRegex('bad');

    expect('bad').toMatch(regex);
    expect('bad ').toMatch(regex);
    expect(' bad').toMatch(regex);
    expect('bad!').toMatch(regex);
  });

  // Test case insensitivity.
  it('should be case insensitive.', () => {
    const regex = createWordRegex('bad');

    expect('BAD').toMatch(regex);
    expect('Bad').toMatch(regex);
    expect('bAd').toMatch(regex);
  });

  // Test word boundaries.
  it('should not match parts of other words.', () => {
    const regex = createWordRegex('bad');

    expect('badger').not.toMatch(regex);
    expect('embad').not.toMatch(regex);
    expect('superbad').not.toMatch(regex);
  });

  // Test with special characters.
  it('should handle special characters in words.', () => {
    const regex = createWordRegex('bad-word');

    expect('bad-word').toMatch(regex);
    expect('BAD-WORD').toMatch(regex);
    expect('bad-word!').toMatch(regex);
  });

  // Test with punctuation.
  it('should match words with surrounding punctuation.', () => {
    const regex = createWordRegex('bad');

    expect('(bad)').toMatch(regex);
    expect('bad.').toMatch(regex);
    expect('bad,').toMatch(regex);
    expect('"bad"').toMatch(regex);
  });

  // Test with multiple spaces.
  it('should match words with multiple spaces around.', () => {
    const regex = createWordRegex('bad');

    expect('   bad   ').toMatch(regex);
    expect('\tbad\t').toMatch(regex);
    expect('\nbad\n').toMatch(regex);
  });

  // Test with empty input.
  it('should handle empty input.', () => {
    const regex = createWordRegex('');

    expect('').toMatch(regex);
  });

  // Test with special regex characters.
  it('should escape special regex characters.', () => {
    const regex = createWordRegex('bad.word');
    expect('bad.word').toMatch(regex);

    expect('badword').not.toMatch(regex);
  });

  // Test multiple matches in string.
  it('should match multiple occurrences with global flag.', () => {
    const regex = createWordRegex('bad');
    const text = 'bad word and bad thing';
    const matches = text.match(regex);

    expect(matches).toHaveLength(2);
  });
});
