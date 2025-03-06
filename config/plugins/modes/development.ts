import type { Plugin } from 'rollup';

import analyze from 'rollup-plugin-analyzer';
import filesize from 'rollup-plugin-filesize';
import progress from 'rollup-plugin-progress';
import { visualizer } from 'rollup-plugin-visualizer';

import type { BuildOptions } from '../../types';

import { paths } from '../../core/paths';

/**
 * Creates an array of development plugins for bundle analysis and build progress.
 *
 * @param options Build configuration options.
 *
 * @returns Array of configured development plugins.
 */
export const createDevPlugins = (options: BuildOptions): Plugin[] => {
  const { format } = options;

  return [
    // Show build progress.
    progress({
      clearLine: true
    }) as Plugin,

    // Generate bundle visualization.
    visualizer({
      filename: `${paths.stats}/${format}/stats.html`,
      title: `Bundle Analysis (${format.toUpperCase()})`,
      projectRoot: paths.root,
      open: false,
      gzipSize: true,
      template: 'treemap',
    }),

    // Analyze bundle composition.
    analyze({
      summaryOnly: true,
      limit: 10,
      stdout: true,
      onAnalysis: (analysis) => {
        // Log additional analysis info if in development.
        console.warn('Bundle analysis:', analysis);
      }
    }),

    // Show detailed file sizes.
    filesize({
      showMinifiedSize: true,
      showBrotliSize: true,
      showGzippedSize: true,
      reporter: ['boxen']
    }),
  ];
};
