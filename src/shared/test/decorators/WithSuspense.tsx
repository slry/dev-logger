import { Decorator } from '@storybook/react';
import { Suspense } from 'react';

export const WithSuspense: Decorator = (Story) => {
  return (
    <Suspense>
      <Story />
    </Suspense>
  );
};
