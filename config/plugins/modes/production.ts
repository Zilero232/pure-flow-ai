import terser from '@rollup/plugin-terser';
import strip from '@rollup/plugin-strip';
import filesize from 'rollup-plugin-filesize';

import type { Plugin } from 'rollup';

export const createProdPlugins = (): Plugin[] => {
  return [
   // Strip debug statements and console logs.
   strip({
    include: ['**/*.ts'],
    // Remove development-only code.
    functions: [
      'console.log',
      'console.info',
      'console.debug',
      'debugger',
      'assert.*',
      'debug',
      'alert'
    ],
  }),

  // Minify and optimize bundle.
  terser({
    format: {
      // Preserve important comments
      comments: /^\/\*\*[^@].*\*\/$/,
      // Keep JSDoc annotations
      preserve_annotations: true,
      ecma: 2018,
    },
    compress: {
      ecma: 2018,
      drop_console: true,
      drop_debugger: true,
      pure_getters: true,
      // Remove unused code
      unused: true,
      // Convert mutative array methods
      unsafe_methods: true,
      // Remove unreachable code
      dead_code: true,
      // Multiple compression passes
      passes: 3,
      // Various optimizations
      arrows: true,
      reduce_vars: true,
      reduce_funcs: true,
    },
    mangle: {
      // Mangle private properties starting with underscore
      properties: {
        regex: /^_/,
      },
      // Keep function and class names
      keep_classnames: true,
      keep_fnames: true,
    },
  }),

  // File size reporting.
  filesize({
    showMinifiedSize: true,
    showBrotliSize: true,
    showGzippedSize: true,
  }),
  ];
};
