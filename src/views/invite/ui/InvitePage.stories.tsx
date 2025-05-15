import { redirect } from '@storybook/experimental-nextjs-vite/navigation.mock';
import { Meta, StoryObj } from '@storybook/react';

import { validateTeamId } from '@/entities/team/api/mock';
import { WithSuspense } from '@/shared/test/decorators/WithSuspense';

import { InvitePage } from '.';
import { joinTeam } from '../api/mock';

const meta: Meta<typeof InvitePage> = {
  decorators: [WithSuspense],
  component: InvitePage,
  args: {
    params: Promise.resolve({ teamId: 'team-id', inviteId: 'invite-id' }),
  },
  beforeEach: () => {
    validateTeamId.mockResolvedValue({ valid: true, teamId: 'team-id' });
    joinTeam.mockResolvedValue(true);
    redirect.mockImplementation(() => {
      return null as never;
    });
  },
};

export default meta;

type Story = StoryObj<typeof InvitePage>;

export const Default: Story = {};
