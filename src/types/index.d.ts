import type { BadWordFilterOptions } from "./modules/BadWordFilterOptions";

declare const BadWordFilter: ({ additionalBlockWords, excludedWords, placeholder, overrideBlockWords }: BadWordFilterOptions) => {
  hasProfaneWords: (input: string) => string[];
  maskProfanity: (input: string, placeholder?: string) => string;
  cleanString: (input: string) => string;
  getBlockWords: () => string[];
  getExcludedWords: () => string[];
  getBaseList: () => string[];
};

export { BadWordFilterOptions, BadWordFilter as default };
