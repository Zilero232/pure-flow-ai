import type { PackageJson as PackageJsonType } from 'type-fest';
import type { RollupOptions, OutputOptions, Plugin } from 'rollup';

export type PackageJson = PackageJsonType;

// Типы для режимов сборки
export enum BUILD_MODES_ENUM {
  DEVELOPMENT = 'development',
  PRODUCTION = 'production'
}

export enum BUILD_FORMATS_ENUM {
  CJS = 'cjs',
  ESM = 'esm',
  All = 'all'
}

// Типы для опций сборки
export interface BuildOptions {
  format: BUILD_FORMATS_ENUM;
  env: BUILD_MODES_ENUM;
}

// Типы для конфигурации сборки
export interface BuildConfig extends RollupOptions {
  output: OutputOptions;
  plugins: Plugin[];
}

// Типы для аргументов командной строки
export interface CommandLineArgs {
  environment?: BUILD_MODES_ENUM;
  format?: BUILD_FORMATS_ENUM;
  watch?: boolean;
  config?: string;
}

