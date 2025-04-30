import type { Preview } from '@storybook/react';

import { WithDefaultProviders } from '@/shared/test/decorators/WithDefaultProviders';
import { WithPortalContext } from '@/shared/test/decorators/WithPortalContext';

import '../src/app/globals.css';

const preview: Preview = {
  parameters: {
    nextjs: {
      appDirectory: true,
      router: {
        pathname: '/team/[teamId]/dashboard',
        asPath: '/team/teamId/dashboard',
      },
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [WithDefaultProviders, WithPortalContext],
};

export default preview;
