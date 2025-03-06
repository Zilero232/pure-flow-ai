import { describe, expect, it } from 'vitest';

import { containsProfaneWords } from './index';

describe('containsProfaneWords', () => {
  // Test empty input.
  it('should return empty array when input is empty.', () => {
    const result = containsProfaneWords({
      input: '',
      blocklist: ['bad', 'words']
    });

    expect(result).toEqual([]);
  });

  // Test empty blocklist.
  it('should return empty array when blocklist is empty.', () => {
    const result = containsProfaneWords({
      input: 'some good text',
      blocklist: []
    });

    expect(result).toEqual([]);
  });

  // Test when no blocked words are present.
  it('should return empty array when no blocked words found.', () => {
    const result = containsProfaneWords({
      input: 'this is a good text',
      blocklist: ['bad', 'terrible']
    });

    expect(result).toEqual([]);
  });

  // Test finding a single blocked word.
  it('should find one blocked word.', () => {
    const result = containsProfaneWords({
      input: 'this is a bad text',
      blocklist: ['bad', 'terrible']
    });

    expect(result).toEqual(['bad']);
  });

  // Test finding multiple blocked words.
  it('should find multiple blocked words.', () => {
    const result = containsProfaneWords({
      input: 'this is bad and terrible text',
      blocklist: ['bad', 'terrible']
    });

    expect(result).toEqual(['bad', 'terrible']);
  });

  // Test case sensitivity.
  it('should be case insensitive.', () => {
    const result = containsProfaneWords({
      input: 'This is BAD and TeRrIbLe text',
      blocklist: ['bad', 'terrible']
    });

    expect(result).toEqual(['bad', 'terrible']);
  });

  // Test words within other words.
  it('should not match blocked words inside other words.', () => {
    const result = containsProfaneWords({
      input: 'embarrassed',
      blocklist: ['ass']
    });

    expect(result).toEqual([]);
  });
});
