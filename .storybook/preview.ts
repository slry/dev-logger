import type { Preview } from '@storybook/react';
import { isServer, QueryClient } from '@tanstack/react-query';

import { WithDefaultProviders } from '@/shared/test/decorators/WithDefaultProviders';
import { WithPortalContext } from '@/shared/test/decorators/WithPortalContext';

import '../src/app/globals.css';

function makeStorybookQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        // With SSR, we usually want to set some default staleTime
        // above 0 to avoid refetching immediately on the client
        staleTime: 60 * 1000,
      },
    },
  });
}

let browserQueryClient: QueryClient | undefined = undefined;

function getStorybookQueryClient() {
  if (isServer) {
    // Server: always make a new query client
    return makeStorybookQueryClient();
  } else {
    // Browser: make a new query client if we don't already have one
    // This is very important, so we don't re-make a new client if React
    // suspends during the initial render. This may not be needed if we
    // have a suspense boundary BELOW the creation of the query client
    if (!browserQueryClient) browserQueryClient = makeStorybookQueryClient();
    return browserQueryClient;
  }
}

const preview: Preview = {
  parameters: {
    nextjs: {
      appDirectory: true,
      router: {
        pathname: '/team/[teamId]/dashboard',
        asPath: '/team/teamId/dashboard',
        query: {
          teamId: 'teamId',
        },
      },
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [WithDefaultProviders(getStorybookQueryClient()), WithPortalContext],
  beforeEach: () => {
    // Reset the query client before each story
    const queryClient = getStorybookQueryClient();
    queryClient.clear();
  },
};

export default preview;
