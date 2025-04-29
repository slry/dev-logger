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
    config.plugins.push({
      name: 'rewrite-api-to-mock',
      enforce: 'pre', // important: run early before resolve
      resolveId(source, importer) {
        if (source.endsWith('/api')) {
          // Turn ./some/path/api → ./some/path/api/mock.ts
          const newPath = source + '/mock.ts';
          console.log(`🔁 Rewriting import: ${source} -> ${newPath}`);
          return this.resolve(newPath, importer, { skipSelf: true });
        }
        return null;
      },
    });

    return config;
  },
};
export default config;

// webpackFinal: async (config) => {
//   config.plugins = config.plugins || [];
//   config.plugins.push(
//     new (require('webpack').NormalModuleReplacementPlugin)(
//       /\/api$/, // regex match imports ending in /api
//       (resource) => {
//         resource.request = resource.request + '/mock.ts';
//       },
//     ),
//   );
//   return config;
// },
