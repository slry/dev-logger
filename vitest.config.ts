import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { storybookTest } from '@storybook/experimental-addon-test/vitest-plugin';
import { coverageConfigDefaults, defineConfig } from 'vitest/config';
const dirname =
  typeof __dirname !== 'undefined'
    ? __dirname
    : path.dirname(fileURLToPath(import.meta.url));

// More info at: https://storybook.js.org/docs/writing-tests/test-addon
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(dirname, './src'),
    },
  },
  test: {
    coverage: {
      // 👇 Add this
      exclude: [
        ...coverageConfigDefaults.exclude,
        '**/.storybook/**',
        // 👇 This pattern must align with the `stories` property of your `.storybook/main.ts` config
        '**/*.stories.*',
        // 👇 This pattern must align with the output directory of `storybook build`
        '**/storybook-static/**',
        '**/*.config.*',
        '**/app/(app)/**',
        '**/app/(auth)/**',
        '**/scripts/**',
      ],
    },
    workspace: [
      {
        extends: true,
        plugins: [
          // The plugin will run tests for the stories defined in your Storybook config
          // See options at: https://storybook.js.org/docs/writing-tests/test-addon#storybooktest
          storybookTest({
            configDir: path.join(dirname, '.storybook'),
          }),
        ],
        test: {
          name: 'storybook',
          browser: {
            enabled: true,
            headless: true,
            provider: 'playwright',
            instances: [
              {
                browser: 'chromium',
              },
            ],
          },
          setupFiles: ['.storybook/vitest.setup.ts'],
        },
      },
      {
        extends: true,
        test: {
          setupFiles: ['./src/shared/test/setup/globalMocks.ts'],
          // alias: {
          //   'server-only': path.resolve(dirname, './src/shared/test/mocks/server-only'),
          //   '@/shared/api/supabase/next': path.resolve(
          //     dirname,
          //     './src/shared/test/mocks/supabase',
          //   ),
          //   '@/shared/api/supabase/server': path.resolve(
          //     dirname,
          //     './src/shared/test/mocks/supabase',
          //   ),
          //   './supabase/next': path.resolve(dirname, './src/shared/test/mocks/supabase'),
          //   './supabase/server': path.resolve(
          //     dirname,
          //     './src/shared/test/mocks/supabase',
          //   ),
          // },
          name: 'vitest',
          environment: 'node',
        },
      },
    ],
  },
});
