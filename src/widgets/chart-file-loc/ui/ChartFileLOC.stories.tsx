import { Meta, StoryObj } from '@storybook/react';

import { getUser } from '@/entities/user/api/mock';
import { WithTeamContext } from '@/shared/test/decorators/WithTeamContext';
import { WithUserDashboardContext } from '@/shared/test/decorators/WithUserDashboardContext';

import { ChartFileLOC } from '.';
import { getLocPerFile } from '../api/mock';

const meta: Meta<typeof ChartFileLOC> = {
  component: ChartFileLOC,
  decorators: [WithTeamContext, WithUserDashboardContext],
  beforeEach: () => {
    getUser.mockResolvedValue({
      id: '1',
      name: 'John',
      surname: 'Doe',
      email: 'john@doe.com',
    });
    getLocPerFile.mockResolvedValue([
      {
        filename: 'file-1.ts',
        locAdded: 10,
        locRemoved: 5,
        userId: '1',
        teamId: 'teamId',
        repoUrl: 'https://gitlab.com/repo-1',
      },
      {
        filename: 'file-2.ts',
        locAdded: 20,
        locRemoved: 10,
        userId: '1',
        teamId: 'teamId',
        repoUrl: 'https://gitlab.com/repo-1',
      },
      {
        filename: 'file-3.ts',
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

type Story = StoryObj<typeof ChartFileLOC>;

export const Default: Story = {};
