import typescript from '@rollup/plugin-typescript';
import { typescriptPaths } from 'rollup-plugin-typescript-paths';

import type { Plugin } from 'rollup';
import type { BuildOptions } from '../../types';

import { paths } from '../../core/paths';

/**
 * Creates TypeScript plugins configuration for Rollup.
 *
 * @param options Build configuration options.
 *
 * @returns Array of configured TypeScript plugins.
 */
export const createTypeScriptPlugin = (options: BuildOptions): Plugin[] => {
  const { env, format } = options;

  const isDev = env === 'development';

  return [
    // Handle TypeScript path aliases
    typescriptPaths({
      tsConfigPath: paths.config.tsconfig,
      preserveExtensions: true,
    }),

    // Main TypeScript configuration
    typescript({
      // Base configuration
      tsconfig: paths.config.tsconfig,

      // Output configuration
      declaration: true,
      declarationDir: `${paths.build}/${format}/types`,
      outDir: `${paths.build}/${format}`,

      // Compiler options override.
      compilerOptions: {
        sourceMap: isDev,
        declarationMap: true,

        // Development specific options.
        ...(isDev && {
          removeComments: false,
          pretty: true,
          noUnusedLocals: false,
          noUnusedParameters: false,
        }),

        // Production specific options.
        ...(!isDev && {
          removeComments: true,
          pretty: false,
          noUnusedLocals: true,
          noUnusedParameters: true,
        }),
      },

      // Build process options.
      noEmitOnError: !isDev,

    })
  ];
};
