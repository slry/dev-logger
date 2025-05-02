import { Meta, StoryObj } from '@storybook/react';

import { getUser } from '@/entities/user/api/mock';
import { WithTeamContext } from '@/shared/test/decorators/WithTeamContext';
import { WithUserDashboardContext } from '@/shared/test/decorators/WithUserDashboardContext';

import { ChartLOC } from '.';
import { getLocAddedRemovedPerDay } from '../api/mock';

const meta: Meta<typeof ChartLOC> = {
  component: ChartLOC,
  decorators: [WithTeamContext, WithUserDashboardContext],
  beforeEach: () => {
    getUser.mockResolvedValue({
      id: '1',
      name: 'John',
      surname: 'Doe',
      email: 'john@doe.com',
    });
    getLocAddedRemovedPerDay.mockResolvedValue([
      {
        datetime: 'Mar 1',
        locAdded: 10,
        locRemoved: 5,
        userId: '1',
        teamId: 'teamId',
        repoUrl: 'https://gitlab.com/repo-1',
      },
      {
        datetime: 'Mar 2',
        locAdded: 20,
        locRemoved: 10,
        userId: '1',
        teamId: 'teamId',
        repoUrl: 'https://gitlab.com/repo-1',
      },
      {
        datetime: 'Mar 3',
        locAdded: 30,
        locRemoved: 15,
        userId: '1',
        teamId: 'teamId',
        repoUrl: 'https://gitlab.com/repo-1',
      },
    ]);
  },
};

export default meta;

type Story = StoryObj<typeof ChartLOC>;

export const Default: Story = {};
