import { Meta, StoryObj } from '@storybook/react';

import { getTeamMemberList, validateTeamId } from '@/entities/team/api/mock';
import { getUser } from '@/entities/user/api/mock';
import { WithSuspense } from '@/shared/test/decorators/WithSuspense';
import { WithTeamContext } from '@/shared/test/decorators/WithTeamContext';
import { getLocPerFile } from '@/widgets/chart-file-loc/api/mock';
import { getLocAddedRemovedPerDay } from '@/widgets/chart-loc/api/mock';
import { getTimeSpentPerDay } from '@/widgets/chart-time/api/mock';
import { parseMsToTime } from '@/widgets/chart-time/lib/parseTime';
import { getFileOperations } from '@/widgets/chart-total-changed-files/api/mock';
import { getTotalLoc } from '@/widgets/chart-total-loc/api/mock';

import { DashboardPage } from '.';

const meta: Meta<typeof DashboardPage> = {
  args: {
    params: Promise.resolve({
      teamId: 'teamId',
    }),
  },
  component: DashboardPage,
  decorators: [WithSuspense, WithTeamContext],
  beforeEach: () => {
    getUser.mockResolvedValue({
      id: '1',
      name: 'John',
      surname: 'Doe',
      email: 'john@doe.com',
    });
    validateTeamId.mockResolvedValue({ valid: true, teamId: 'teamId' });
    getTeamMemberList.mockResolvedValue([
      {
        userId: '1',
        role: 'OWNER',
        name: 'John',
        surname: 'Doe',
        email: 'john@doe.com',
      },
    ]);
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
    getTotalLoc.mockResolvedValue({
      locAdded: 10,
      locRemoved: 5,
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
    getFileOperations.mockResolvedValue([
      {
        repoUrl: 'https://gitlab.com/repo-1',
        teamId: 'teamId',
        userId: '1',
        operation: 'CREATE',
        filename: 'file-1.ts',
        timestamp: '2023-01-01',
      },
      {
        repoUrl: 'https://gitlab.com/repo-1',
        teamId: 'teamId',
        userId: '1',
        operation: 'CREATE',
        filename: 'file-2.ts',
        timestamp: '2023-01-02',
      },
      {
        repoUrl: 'https://gitlab.com/repo-1',
        teamId: 'teamId',
        userId: '1',
        operation: 'EDIT',
        filename: 'file-3.ts',
        timestamp: '2023-01-03',
      },
      {
        repoUrl: 'https://gitlab.com/repo-1',
        teamId: 'teamId',
        userId: '1',
        operation: 'DELETE',
        filename: 'file-4.ts',
        timestamp: '2023-01-04',
      },
      {
        repoUrl: 'https://gitlab.com/repo-1',
        teamId: 'teamId',
        userId: '1',
        operation: 'EDIT',
        filename: 'file-5.ts',
        timestamp: '2023-01-05',
      },
    ]);
  },
};

export default meta;

type Story = StoryObj<typeof DashboardPage>;

export const Default: Story = {};
