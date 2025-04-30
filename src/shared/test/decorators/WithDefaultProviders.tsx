import { Decorator } from '@storybook/react';
import { QueryClient } from '@tanstack/react-query';

import Providers from '@/shared/providers/providers';

export const WithDefaultProviders = (queryClient: QueryClient): Decorator => {
  const DefaultProviders: Decorator = (Story) => {
    return (
      <Providers customQueryClient={queryClient}>
        <Story />
      </Providers>
    );
  };

  return DefaultProviders;
};
