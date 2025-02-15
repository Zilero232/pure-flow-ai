import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

import type { Plugin } from 'rollup';
import type { BuildOptions } from '../../types';

export const createResolvePlugins = (options: BuildOptions): Plugin[] => {
  const isCJS = options.format === 'cjs';

  return [
    // Resolve node modules and extensions.
    nodeResolve({
      // Prefer Node.js built-in modules.
      preferBuiltins: true,

      // File extensions to check.
      extensions: [
        '.ts',      // TypeScript
        '.js',      // JavaScript
        '.cjs',     // JavaScript CJS
      ],

      // Additional options.
      resolveOnly: [],   // Resolve all modules.
      modulesOnly: true, // Only resolve modules.
    }),

    // Convert CommonJS modules to ES6.
    commonjs({
      // File extensions to process.
      extensions: [
        '.ts',
        '.js',
        '.cjs',
      ],

      // CommonJS specific options.
      ignoreDynamicRequires: isCJS,     // Ignore requires in CJS mode.
      transformMixedEsModules: !isCJS,  // Transform mixed modules in ESM mode.

      // Additional options
      esmExternals: true,               // Treat external imports as ES modules.
      requireReturnsDefault: 'auto',    // Handle default exports.
    }),
  ];
};
