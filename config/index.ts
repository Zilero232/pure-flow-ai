import type { RollupOptions } from 'rollup';

import type { BuildOptions } from './types';

import { paths } from './core/paths';
import { createPlugins } from './plugins';
import { BUILD_FORMATS_ENUM, BUILD_MODES_ENUM } from './types';

/**
 * Creates Rollup configuration based on provided build options.
 *
 * @param options Build configuration options (format and environment).
 *
 * @returns Promise with Rollup configuration.
 */
const createConfig = async (options: BuildOptions): Promise<RollupOptions> => {
  const { format, env } = options;

  const isDev = env === BUILD_MODES_ENUM.DEVELOPMENT;

  return {
    input: 'src/index.ts',

    // Output configuration.
    output: {
      // Output directory for files.
      dir: `${paths.build}/${format}`,

      // Output files format.
      format: format === BUILD_FORMATS_ENUM.CJS ? 'commonjs' : 'es',

      // Output file names.
      entryFileNames: format === BUILD_FORMATS_ENUM.CJS  ? '[name].cjs' : '[name].js',

      // Default export name.
      exports: 'named',

      // Code minification in production.
      compact: !isDev,
      hoistTransitiveImports: true,
      esModule: true,

      // Development options.
      sourcemap: isDev,
      validate: true,

      // Code generation options.
      generatedCode: {
        // Use const instead of var.
        constBindings: true,

        // Use arrow functions.
        arrowFunctions: true,

        // Use object shorthand notation.
        objectShorthand: true,

        // Disable Symbol usage.
        symbols: false,
      },
    },

    // Plugins configuration.
    plugins: createPlugins({ format, env }),
  };
};

export default createConfig;
