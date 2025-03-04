import autoExternal from 'rollup-plugin-auto-external';

import type { Plugin } from 'rollup';

import { paths } from '../../core/paths';

/**
 * Creates an array of optimization plugins for Rollup.
 *
 * @returns {Plugin[]} Array of configured Rollup optimization plugins
 */
export const createOptimizationPlugins = (): Plugin[] => {
  return [
    // Auto-detect external dependencies.
    autoExternal({
      packagePath: paths.config.package,
      // Don't bundle dependencies
      dependencies: true,
      // Don't bundle peer dependencies
      peerDependencies: true,
    }),
  ];
};
