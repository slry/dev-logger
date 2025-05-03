import { Meta, StoryObj } from '@storybook/react';

import { getUser } from '@/entities/user/api/mock';
import { WithTeamContext } from '@/shared/test/decorators/WithTeamContext';
import { WithUserDashboardContext } from '@/shared/test/decorators/WithUserDashboardContext';

import { ChartTimeSpentPerDay } from '.';
import { getTimeSpentPerDay } from '../api/mock';
import { parseMsToTime } from '../lib/parseTime';

const meta: Meta<typeof ChartTimeSpentPerDay> = {
  component: ChartTimeSpentPerDay,
  decorators: [WithTeamContext, WithUserDashboardContext],
  beforeEach: () => {
    getUser.mockResolvedValue({
      id: '1',
      name: 'John',
      surname: 'Doe',
      email: 'john@doe.com',
    });
    getTimeSpentPerDay.mockResolvedValue([
      {
        date: '2023-01-01',
        timeSpent: 1000000,
        timeSpentLabel: parseMsToTime(1000000),
        userId: '1',
        teamId: 'teamId',
        repoUrl: 'https://gitlab.com/repo-1',
      },
      {
        date: '2023-01-02',
        timeSpent: 3000000,
        timeSpentLabel: parseMsToTime(3000000),
        userId: '1',
        teamId: 'teamId',
        repoUrl: 'https://gitlab.com/repo-1',
      },
      {
        date: '2023-01-03',
        timeSpent: 2000000,
        timeSpentLabel: parseMsToTime(2000000),
        userId: '1',
        teamId: 'teamId',
        repoUrl: 'https://gitlab.com/repo-1',
      },
    ]);
  },
};

export default meta;

type Story = StoryObj<typeof ChartTimeSpentPerDay>;

export const Default: Story = {};
