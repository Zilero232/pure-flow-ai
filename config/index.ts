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
      // Директория для выходных файлов
      dir: `${paths.build}/${format}`,

      // Формат выходных файлов
      format: format === BUILD_FORMATS_ENUM.CJS ? 'commonjs' : 'es',

      // Название файлов
      entryFileNames: format === BUILD_FORMATS_ENUM.CJS  ? '[name].cjs' : '[name].js',

      // Имя для экспорта по умолчанию
      exports: 'named',

      // Минификация кода в production
      compact: !isDev,
      hoistTransitiveImports: true,
      esModule: true,

      // Разработка
      sourcemap: isDev,
      validate: true,

      // Генерация кода
      generatedCode: {
        // Использует const вместо var
        constBindings: true,

        // Использует стрелочные функции
        arrowFunctions: true,

        // Использует сокращенную запись объектов
        objectShorthand: true,

        // Отключает использование Symbol
        symbols: false,
      },
    },

    // Plugins configuration.
    plugins: createPlugins({ format, env }),
  };
};

export default createConfig;
