import { vitest } from '@zilero/vitest';
import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig, mergeConfig } from 'vitest/config';

export default mergeConfig(
  vitest,
  defineConfig({
	plugins: [tsconfigPaths()],
	test: {
		environment: 'node',
		include: ['./**/*.spec.ts'],
		maxConcurrency: 5,
		clearMocks: true,
		silent: false,
		logHeapUsage: true,
		mockReset: true,
		coverage: {
			provider: 'v8',
			include: ['./src/**/*'],
			thresholds: { 100: true },
			skipFull: true,
		},
	},
}));
