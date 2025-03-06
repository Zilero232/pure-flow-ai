import type { Plugin } from 'rollup';

import typescript from '@rollup/plugin-typescript';
import { typescriptPaths } from 'rollup-plugin-typescript-paths';

import type {BuildOptions} from '../../types';

import { paths } from '../../core/paths';
import { BUILD_MODES_ENUM  } from '../../types';

/**
 * Creates TypeScript plugins configuration for Rollup.
 *
 * @param options Build configuration options.
 *
 * @returns Array of configured TypeScript plugins.
 */
export const createTypeScriptPlugin = (options: BuildOptions): Plugin[] => {
  const { env, format } = options;

  const isDev = env === BUILD_MODES_ENUM.DEVELOPMENT;

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

      outDir: `${paths.build}/${format}`,

      // Compiler options override.
      compilerOptions: {
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

      exclude: [
        '**/__tests__/**',
        '**/*.test.ts',
        '**/*.spec.ts',
        'node_modules/**',
      ],
    }),
  ];
};
