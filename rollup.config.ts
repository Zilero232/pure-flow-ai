import { readFile } from 'node:fs/promises';

import type { RollupOptions } from 'rollup';
import type { BuildOptions, PackageJson } from './config/types/index';

import { BUILD_FORMATS_ENUM, BUILD_MODES_ENUM } from './config/types/index';

import { createPlugins } from './config/plugins';
import { paths } from './config/core/paths';

/**
 * Creates Rollup configuration based on provided build options.
 *
 * @param options Build configuration options (format and environment).
 *
 * @returns Promise with Rollup configuration.
 */
const createConfig = async (options: BuildOptions): Promise<RollupOptions> => {
  // Read and parse package.json.
  const pkg: PackageJson = JSON.parse(await readFile(paths.config.package, 'utf-8'));

  // Validate package.json
  if (!pkg.name) {
    throw new Error('Package name is required in package.json');
  }

  return {
    input: 'src/index.ts',

    // Output configuration.
    output: {
      dir: `${paths.build}/${options.format}`,
      format: options.format === BUILD_FORMATS_ENUM.CJS ? 'commonjs' : 'es',
      preserveModules: true,
      exports: 'named',
      generatedCode: {
        constBindings: true,
        arrowFunctions: true,
      },

      // Add additional output options.
      compact: options.env === BUILD_MODES_ENUM.PRODUCTION,
      hoistTransitiveImports: false,
      validate: true,
    },

    // Plugins configuration.
    plugins: createPlugins(options),

    // Add additional build options
    treeshake: {
      moduleSideEffects: false,
      propertyReadSideEffects: false,
      tryCatchDeoptimization: false,
    },
  };
};

/**
 * Main configuration function that determines build format and environment.
 *
 * @returns Promise with single or multiple Rollup configurations
 */
export default async (): Promise<RollupOptions | RollupOptions[]> => {
  const format = process.env['FORMAT'] as BUILD_FORMATS_ENUM || BUILD_FORMATS_ENUM.ESM;
  const env = process.env['NODE_ENV'] as BUILD_MODES_ENUM || BUILD_MODES_ENUM.DEVELOPMENT;

  if (format === BUILD_FORMATS_ENUM.All) {
    return Promise.all([
      // Create configuration for CJS format.
      createConfig({ format: BUILD_FORMATS_ENUM.CJS, env }),

      // Create configuration for ESM format.
      createConfig({ format: BUILD_FORMATS_ENUM.ESM, env }),
    ]);
  }

  return createConfig({ format, env });
};
