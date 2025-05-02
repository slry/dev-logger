import { Decorator } from '@storybook/react';

import { UserDashboardProvider } from '@/shared/providers/user-dashboard-context';

export const WithUserDashboardContext: Decorator = (Story) => {
  return (
    <UserDashboardProvider userId="1">
      <Story />
    </UserDashboardProvider>
  );
};
