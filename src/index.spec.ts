import { describe, expect, it } from 'vitest';

import BadWordFilter from './';

// Tests for getter methods.
describe('BadWordFilter Getters', () => {
    it('returns correct block words list.', () => {
        const { getBlockWords, getBaseList } = BadWordFilter({
            additionalBlockWords: ['test', 'mock'],
        });

        const blockWords = getBlockWords();
        const baseList = getBaseList();

        expect(blockWords).toContain('test');
        expect(blockWords).toContain('mock');
        expect(blockWords.length).toBeGreaterThan(baseList.length);
    });

    it('returns correct excluded words list.', () => {
        const { getExcludedWords } = BadWordFilter({
            excludedWords: ['hell', 'damn'],
        });

        expect(getExcludedWords()).toEqual(['hell', 'damn']);
    });

    it('returns empty base list when override is true.', () => {
        const { getBlockWords } = BadWordFilter({
            additionalBlockWords: ['custom'],
            overrideBlockWords: true,
        });

        expect(getBlockWords()).toHaveLength(1);
        expect(getBlockWords()).toEqual(['custom']);
    });

    it('normalizes words in all lists.', () => {
        const { getBlockWords, getExcludedWords } = BadWordFilter({
            additionalBlockWords: ['TEST', ' Word ', '  TRIM  '],
            excludedWords: ['EXCLUDED', ' Skip '],
        });

        expect(getBlockWords()).toContain('test');
        expect(getBlockWords()).toContain('word');
        expect(getBlockWords()).toContain('trim');

        expect(getExcludedWords()).toContain('excluded');
        expect(getExcludedWords()).toContain('skip');
    });
});

// Tests for filtering functionality.
describe('BadWordFilter Functionality', () => {
    it('detects profane words correctly.', () => {
        const { hasProfaneWords } = BadWordFilter({
            additionalBlockWords: ['test', 'mock'],
        });

        expect(hasProfaneWords('this is a test')).toEqual(['test']);
        expect(hasProfaneWords('clean text')).toEqual([]);
        expect(hasProfaneWords('test and mock')).toEqual(['test', 'mock']);
    });

    it('masks profane words with custom placeholder.', () => {
        const { maskProfanity } = BadWordFilter({
            additionalBlockWords: ['test'],
        });

        expect(maskProfanity('this is a test', '#')).toBe('this is a ####');
        expect(maskProfanity('test TEST Test', '#')).toBe('#### #### ####');
    });

    it('removes profane words from text.', () => {
        const { cleanString } = BadWordFilter({
            additionalBlockWords: ['test', 'mock'],
        });

        expect(cleanString('this is a test')).toBe('this is a ');
        expect(cleanString('test with mock')).toBe(' with ');
    });

    it('respects excluded words during filtering.', () => {
        const { hasProfaneWords, maskProfanity, cleanString } = BadWordFilter({
            additionalBlockWords: ['test', 'mock'],
            excludedWords: ['test'],
        });

        const testString = 'test and mock';

        expect(hasProfaneWords(testString)).toEqual(['mock']);
        expect(maskProfanity(testString)).toBe('test and ****');
        expect(cleanString(testString)).toBe('test and ');
    });

    it('handles case-insensitive filtering.', () => {
        const { hasProfaneWords, maskProfanity } = BadWordFilter({
            additionalBlockWords: ['test'],
        });

        expect(hasProfaneWords('TEST Test test')).toEqual(['test']);
        expect(maskProfanity('TEST Test test')).toBe('**** **** ****');
    });

    it('processes special characters correctly.', () => {
        const { hasProfaneWords } = BadWordFilter({
            additionalBlockWords: ['test'],
        });

        expect(hasProfaneWords('test! @test@ test123')).toEqual(['test']);
        expect(hasProfaneWords('testing tested')).toEqual([]);
    });

    it('handles empty input gracefully.', () => {
        const { hasProfaneWords, maskProfanity, cleanString } = BadWordFilter({});

        expect(hasProfaneWords('')).toEqual([]);
        expect(maskProfanity('')).toBe('');
        expect(cleanString('')).toBe('');
    });

    it('processes unicode characters properly.', () => {
        const { hasProfaneWords, maskProfanity } = BadWordFilter({
            additionalBlockWords: ['test', 'check'],
        });

        expect(hasProfaneWords('TEST test')).toEqual(['test']);
        expect(maskProfanity('TEST test')).toBe('**** ****');
    });
});
