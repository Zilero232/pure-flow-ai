import type { Plugin } from 'rollup';
import type { BuildOptions } from '../types';

import { createTypeScriptPlugin } from './core/createTypeScriptPlugin';
import { createResolvePlugins } from './core/createResolvePlugins';
import { createOptimizationPlugins } from './core/createOptimizationPlugins';
import { createAssetsPlugins } from './core/createAssetsPlugins';

import { createDevPlugins } from './modes/development';
import { createProdPlugins } from './modes/production';

import { BUILD_MODES_ENUM } from '../types';

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

     // Asset handling
     ...createAssetsPlugins(),
  ];

  // Environment plugins.
  const envPlugins = env === BUILD_MODES_ENUM.PRODUCTION ? createProdPlugins() : createDevPlugins(options);

  return [
    ...sharedPlugins,
    ...envPlugins,
  ] as Plugin[];
};
