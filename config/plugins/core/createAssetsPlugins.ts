import image from '@rollup/plugin-image';
import copy from 'rollup-plugin-copy';

import type { Plugin } from 'rollup';

import { paths } from '../../core/paths';

export const createAssetsPlugins = (): Plugin[] => {
  return [
    // Copy static assets.
    copy({
      targets: [
        {
          src: 'public/**/*',
          dest: `${paths.build}/`
        }
      ],
      hook: 'writeBundle',
      copyOnce: true,
    }),

    // Handle images and optimize them.
    image({
      include: ['assets/**/*.png', 'assets/**/*.jpg', 'assets/**/*.jpeg', 'assets/**/*.gif'],
      exclude: 'node_modules/**',
    }),
  ]
};
