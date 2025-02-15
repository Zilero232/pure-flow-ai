import path from 'node:path';

// Get root directory.
const ROOT_DIR = path.resolve(process.cwd());

export const paths = {
  // Root paths.
  root: ROOT_DIR,
  src: path.resolve(ROOT_DIR, 'src'),
  dist: path.resolve(ROOT_DIR, 'dist'),
  build: path.resolve(ROOT_DIR, 'build'),

  // Config files.
  config: {
    root: path.resolve(ROOT_DIR, 'config'),
    package: path.resolve(ROOT_DIR, 'package.json'),
    tsconfig: path.resolve(ROOT_DIR, 'tsconfig.json'),
    eslint: path.resolve(ROOT_DIR, 'eslint.config.js'),
    license: path.resolve(ROOT_DIR, 'LICENSE'),
  },

  // Build.
  output: {
    root: path.resolve(ROOT_DIR, 'build'),
    cjs: path.resolve(ROOT_DIR, 'build/cjs'),
    esm: path.resolve(ROOT_DIR, 'build/esm'),
    types: path.resolve(ROOT_DIR, 'build/types'),
  },

  // Static.
  public: path.resolve(ROOT_DIR, 'public'),

  // Analytics and statistics.
  stats: path.resolve(ROOT_DIR, 'stats'),
  coverage: path.resolve(ROOT_DIR, 'coverage'),

  // Cache and temporary files.
  cache: path.resolve(ROOT_DIR, '.cache'),
  temp: path.resolve(ROOT_DIR, '.temp'),
} as const;

// Types for paths
export type PathsConfig = typeof paths;
