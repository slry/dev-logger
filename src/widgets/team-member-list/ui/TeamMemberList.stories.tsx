import { Meta, StoryObj } from '@storybook/react';
import { within } from '@storybook/test';

import { getTeamMemberList } from '@/entities/team/api/mock';
import { getUser } from '@/entities/user/api/mock';

import { TeamMembersList } from '.';

const meta: Meta<typeof TeamMembersList> = {
  component: TeamMembersList,
  args: {
    baseUrl: 'http://localhost:3000',
    teamId: 'teamId',
  },
};

export default meta;

type Story = StoryObj<typeof TeamMembersList>;

export const Default: Story = {
  beforeEach: () => {
    getUser.mockResolvedValue({
      id: '1',
      name: 'John',
      surname: 'Doe',
      email: 'john@doe.com',
    });
    getTeamMemberList.mockResolvedValue([
      {
        name: 'John',
        surname: 'Doe',
        email: 'john@doe.com',
        userId: '1',
        role: 'OWNER',
      },
    ]);
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await canvas.findByText('John Doe');
    await canvas.findByText('john@doe.com');
    await canvas.findByText('Owner');
    await canvas.findByText("It's You!");
  },
};
