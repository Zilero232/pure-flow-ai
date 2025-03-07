import { describe, expect, it } from 'vitest';

import { maskProfaneWord } from './index';

describe('maskProfaneWord', () => {
  // Test basic masking functionality.
  it('should mask profane words with default placeholder.', () => {
    const result = maskProfaneWord({
      input: 'this is a bad word',
      blocklist: ['bad'],
    });

    expect(result).toBe('this is a *** word');
  });

  // Test with empty input.
  it('should return empty string when input is empty.', () => {
    const result = maskProfaneWord({
      input: '',
      blocklist: ['bad'],
    });

    expect(result).toBe('');
  });

  // Test with empty blocklist.
  it('should return original text when blocklist is empty.', () => {
    const input = 'this is a test';
    const result = maskProfaneWord({
      input,
      blocklist: [],
    });

    expect(result).toBe(input);
  });

  // Test with undefined input.
  it('should handle undefined input gracefully.', () => {
    const result = maskProfaneWord({
      input: undefined as unknown as string,
      blocklist: ['bad'],
    });

    expect(result).toBe('');
  });

  // Test with undefined blocklist.
  it('should handle undefined blocklist gracefully.', () => {
    const input = 'test text';
    const result = maskProfaneWord({
      input,
      blocklist: undefined as unknown as string[],
    });

    expect(result).toBe(input);
  });

  // Test with empty placeholder.
  it('should remove profane words when placeholder is empty.', () => {
    const result = maskProfaneWord({
      input: 'this is a bad word',
      blocklist: ['bad'],
      placeholder: ''
    });

    expect(result).toBe('this is a  word');
  });

  // Test with multiple occurrences.
  it('should mask multiple occurrences of profane words.', () => {
    const result = maskProfaneWord({
      input: 'bad text with another bad word',
      blocklist: ['bad'],
    });

    expect(result).toBe('*** text with another *** word');
  });

  // Test with multiple different words.
  it('should mask different profane words.', () => {
    const result = maskProfaneWord({
      input: 'bad and terrible text',
      blocklist: ['bad', 'terrible'],
    });

    expect(result).toBe('*** and ******** text');
  });

  // Test case sensitivity.
  it('should be case insensitive.', () => {
    const result = maskProfaneWord({
      input: 'BAD bad Bad bAd',
      blocklist: ['bad'],
    });

    expect(result).toBe('*** *** *** ***');
  });

  // Test with special characters.
  it('should handle special characters correctly.', () => {
    const result = maskProfaneWord({
      input: 'bad! (bad) bad, bad.',
      blocklist: ['bad'],
    });

    expect(result).toBe('***! (***) ***, ***.');
  });

  // Test with different placeholder characters.
  it('should work with different placeholder characters.', () => {
    const result = maskProfaneWord({
      input: 'this is bad',
      blocklist: ['bad'],
      placeholder: '#'
    });

    expect(result).toBe('this is ###');
  });

  // Test words within other words.
  it('should not mask parts of other words.', () => {
    const result = maskProfaneWord({
      input: 'embarrassed',
      blocklist: ['ass'],
    });

    expect(result).toBe('embarrassed');
  });

  // Test with multiple spaces.
  it('should handle multiple spaces correctly.', () => {
    const result = maskProfaneWord({
      input: 'bad    word    bad',
      blocklist: ['bad'],
    });

    expect(result).toBe('***    word    ***');
  });

  // Test with line breaks.
  it('should handle line breaks correctly.', () => {
    const result = maskProfaneWord({
      input: 'bad\nword\nbad',
      blocklist: ['bad'],
    });

    expect(result).toBe('***\nword\n***');
  });
});
