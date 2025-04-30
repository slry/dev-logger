import { Decorator } from '@storybook/react';

import { TeamProvider } from '@/shared/providers/team-context';

export const WithTeamContext: Decorator = (Story) => {
  return (
    <TeamProvider teamId="team-id">
      <Story />
    </TeamProvider>
  );
};
