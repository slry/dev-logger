import path from 'path';

import type { StorybookConfig } from '@storybook/experimental-nextjs-vite';

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-onboarding',
    '@chromatic-com/storybook',
    '@storybook/experimental-addon-test',
    '@storybook/addon-coverage',
  ],
  framework: {
    name: '@storybook/experimental-nextjs-vite',
    options: {},
  },
  features: {
    experimentalRSC: true,
  },
  staticDirs: ['../public'],
  viteFinal: async (config) => {
    config.plugins = config.plugins || [];
    config.plugins.push({
      name: 'rewrite-api-to-mock',
      enforce: 'pre', // important: run early before resolve
      resolveId(source, importer) {
        // skip mock.ts
        if (importer && importer.endsWith('mock.ts')) {
          return null;
        }

        if (source.endsWith('/actions')) {
          // Turn ./some/path/actions.ts → ./some/path/mock.ts
          const newPath = source.replace(/actions$/, 'mock');
          console.log(`🔁 Rewriting import: ${source} -> ${newPath}`);
          return this.resolve(newPath, importer, { skipSelf: true });
        }
        return null;
      },
    });

    config.resolve = config.resolve || {};

    config.resolve.alias = {
      ...config.resolve.alias,
      '@/shared': path.resolve(__dirname, '../src/shared'),
      '@/app': path.resolve(__dirname, '../src/app'),
      '@/entities': path.resolve(__dirname, '../src/entities'),
      '@/features': path.resolve(__dirname, '../src/features'),
      '@/views': path.resolve(__dirname, '../src/views'),
      '@/widgets': path.resolve(__dirname, '../src/widgets'),
    };

    return config;
  },
};
export default config;
