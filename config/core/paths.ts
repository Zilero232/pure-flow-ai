import path from 'node:path';
import process from 'node:process';

// Get root directory.
const ROOT_DIR = path.resolve(process.cwd());

export const paths = {
  // Root paths.
  root: ROOT_DIR,
  src: path.resolve(ROOT_DIR, 'src'),
  build: path.resolve(ROOT_DIR, 'build'),

  // Config files.
  config: {
    root: path.resolve(ROOT_DIR, 'config'),
    package: path.resolve(ROOT_DIR, 'package.json'),
    tsconfig: path.resolve(ROOT_DIR, 'tsconfig.json'),
  },

  // Build.
  output: {
    cjs: path.resolve(ROOT_DIR, 'build/cjs'),
    esm: path.resolve(ROOT_DIR, 'build/esm'),
    types: path.resolve(ROOT_DIR, 'build/types'),
  },

  // Analytics and statistics.
  stats: path.resolve(ROOT_DIR, 'stats'),
  coverage: path.resolve(ROOT_DIR, 'coverage'),
} as const;
