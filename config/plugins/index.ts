import type { Plugin } from 'rollup';

import type { BuildOptions } from '../types';

import { BUILD_MODES_ENUM } from '../types';
import { createOptimizationPlugins } from './core/createOptimizationPlugins';
import { createResolvePlugins } from './core/createResolvePlugins';
import { createTypeScriptPlugin } from './core/createTypeScriptPlugin';
import { createDevPlugins } from './modes/development';
import { createProdPlugins } from './modes/production';

export const createPlugins = (options: BuildOptions): Plugin[] => {
  const { env } = options;

  // Base plugins.
  const sharedPlugins = [
     // TypeScript compilation
     ...createTypeScriptPlugin(options),

     // Module resolution
     ...createResolvePlugins(options),

     // Build optimization
     ...createOptimizationPlugins(),
  ];

  // Environment plugins.
  const envPlugins = env === BUILD_MODES_ENUM.PRODUCTION ? createProdPlugins() : createDevPlugins(options);

  return [
    ...sharedPlugins,
    ...envPlugins,
  ] as Plugin[];
};
