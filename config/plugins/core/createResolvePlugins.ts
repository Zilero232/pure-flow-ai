import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

import type { Plugin } from 'rollup';
import { BUILD_FORMATS_ENUM, type BuildOptions } from '../../types';

/**
 * Creates an array of resolve plugins for Rollup configuration.
 *
 * @param {BuildOptions} options - Build configuration options.
 *
 * @returns {Plugin[]} Array of configured Rollup plugins.
 */
export const createResolvePlugins = (options: BuildOptions): Plugin[] => {
  const isCJS = options.format === BUILD_FORMATS_ENUM.CJS;

  return [
    // Resolve node modules and extensions.
    nodeResolve({
      // Prefer Node.js built-in modules.
      preferBuiltins: true,

      // File extensions to check.
      extensions: [
        '.ts',
      ],

      // Additional options.
      resolveOnly: [],
      modulesOnly: true,
    }),

    // Convert CommonJS modules to ES6.
    commonjs({
      // File extensions to process.
      extensions: [
        '.ts',
      ],

      // CommonJS specific options.
      ignoreDynamicRequires: isCJS,
      transformMixedEsModules: !isCJS,

      // Additional options
      esmExternals: true,
      requireReturnsDefault: 'auto',
    }),
  ];
};
