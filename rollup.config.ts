import type { RollupOptions } from 'rollup';

import process from 'node:process';
import { dts } from "rollup-plugin-dts";

import createConfig from './config';
import { paths } from './config/core/paths';
import { BUILD_FORMATS_ENUM, BUILD_MODES_ENUM } from './config/types';

/**
 * Main configuration function that determines build format and environment.
 *
 * @returns Promise with single or multiple Rollup configurations
 */
export default async (): Promise<RollupOptions[]> => {
  const env = process.env.NODE_ENV as BUILD_MODES_ENUM || BUILD_MODES_ENUM.DEVELOPMENT;

  return Promise.all([
    // Create configuration for CJS format.
    createConfig({ format: BUILD_FORMATS_ENUM.CJS, env }),

    // Create configuration for ESM format.
    createConfig({ format: BUILD_FORMATS_ENUM.ESM, env }),

    // Create declaration file for types.
    {
      input: 'src/index.ts',
      output: {
        file: `${paths.output.types}/index.d.ts`,
        format: 'es',
        exports: 'named'
      },
      plugins: [dts({
        tsconfig: paths.config.tsconfig,
      })],
    } as RollupOptions,
  ]);
};
