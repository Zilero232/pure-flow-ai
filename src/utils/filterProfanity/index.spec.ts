import { describe, it, expect } from 'vitest';

import { filterProfanity } from './index';

describe('filterProfanity', () => {
  // Test empty input.
  it('should return empty string when input is empty.', () => {
    const result = filterProfanity({
      input: '',
      blocklist: ['bad', 'words']
    });

    expect(result).toBe('');
  });

  // Test empty blocklist.
  it('should return original text when blocklist is empty.', () => {
    const input = 'some good text';
    const result = filterProfanity({
      input,
      blocklist: []
    });
    expect(result).toBe(input);
  });

  // Test when no profane words are present.
  it('should return unchanged text when no profane words found.', () => {
    const input = 'this is a good text';
    const result = filterProfanity({
      input,
      blocklist: ['bad', 'terrible']
    });
    expect(result).toBe(input);
  });

  // Test filtering a single profane word.
  it('should filter one profane word.', () => {
    const result = filterProfanity({
      input: 'this is a bad text',
      blocklist: ['bad', 'terrible']
    });

    expect(result).toBe('this is a  text');
  });

  // Test filtering multiple profane words.
  it('should filter multiple profane words.', () => {
    const result = filterProfanity({
      input: 'this is bad and terrible text',
      blocklist: ['bad', 'terrible']
    });

    expect(result).toBe('this is  and  text');
  });

  // Test case sensitivity.
  it('should be case insensitive when filtering.', () => {
    const result = filterProfanity({
      input: 'This is BAD and TeRrIbLe text',
      blocklist: ['bad', 'terrible']
    });

    expect(result).toBe('This is  and  text');
  });

  // Test words within other words.
  it('should not filter profane words inside other words.', () => {
    const input = 'embarrassed';
    const result = filterProfanity({
      input,
      blocklist: ['ass']
    });

    expect(result).toBe(input);
  });

  // Test null or undefined input.
  it('should handle null or undefined input gracefully.', () => {
    const result = filterProfanity({
      input: undefined as unknown as string,
      blocklist: ['bad']
    });

    expect(result).toBe('');
  });

  // Test null or undefined blocklist.
  it('should handle null or undefined blocklist gracefully.', () => {
    const input = 'some text';
    const result = filterProfanity({
      input,
      blocklist: undefined as unknown as string[]
    });

    expect(result).toBe(input);
  });
});
