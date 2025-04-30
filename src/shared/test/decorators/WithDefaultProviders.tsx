import { Decorator } from '@storybook/react';

import Providers from '@/shared/providers/providers';

export const WithDefaultProviders: Decorator = (Story) => {
  return (
    <Providers>
      <Story />
    </Providers>
  );
};
