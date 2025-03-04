/**
 * Build mode enumeration.
 */
export enum BUILD_MODES_ENUM {
  /** Development mode. */
  DEVELOPMENT = 'development',

  /** Production mode. */
  PRODUCTION = 'production'
}

/**
 * Build format enumeration.
 */
export enum BUILD_FORMATS_ENUM {
  /** CommonJS format. */
  CJS = 'cjs',

  /** ES Modules format. */
  ESM = 'esm',
}

/**
 * Build configuration options interface.
 */
export interface BuildOptions {
  /** Build environment mode */
  env: BUILD_MODES_ENUM;

  /** Output format */
  format: BUILD_FORMATS_ENUM;
}
