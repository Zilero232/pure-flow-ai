import type { BadWordFilterOptions } from '@src/types/modules/BadWordFilterOptions';

import { BAD_WORDS_LIST } from '@src/constants';
import { containsProfaneWords, filterProfanity, maskProfaneWord } from '@src/utils';

const BadWordFilter = ({ additionalBlockWords = [], excludedWords = [],  overrideBlockWords = false }: BadWordFilterOptions) => {
  // Normalize and deduplicate words.
  const normalizeWords = (words: string[]): string[] => {
    return [ ...new Set( words.map( word => word.toLowerCase().trim() ).filter( word => word.length > 0 ) ) ];
  };

  // Normalize all word lists.
  const baseList = normalizeWords(!overrideBlockWords ? BAD_WORDS_LIST : []);
  const additionalWords = normalizeWords(additionalBlockWords);
  const excludedWordsList = normalizeWords(excludedWords);

  // Combine and filter the final list.
  const listBadWords = [ ...new Set( [ ...baseList,...additionalWords] ) ].filter( word => !excludedWordsList.includes( word ) );

  return {
    // Method for checking if a string contains profane words.
    hasProfaneWords: (input: string): Array<string> => containsProfaneWords({ input, blocklist: listBadWords }),

    // Method for masking profane words.
    maskProfanity: (input: string, placeholder = '*',): string => maskProfaneWord({ input, placeholder, blocklist: listBadWords }),

    // Method for cleaning a string.
    cleanString: (input: string): string => filterProfanity({ input, blocklist: listBadWords }),

    // Method for getting a list of bad words.
    getBlockWords: (): string[] => listBadWords,

    // Method for getting the list of excluded words.
    getExcludedWords: (): string[] => excludedWordsList,

    // Method for getting the base list.
    getBaseList: (): string[] => baseList,
  };
};

export default BadWordFilter;
