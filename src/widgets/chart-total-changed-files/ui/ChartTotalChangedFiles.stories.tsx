import { Meta } from '@storybook/react';

import { getUser } from '@/entities/user/api/mock';
import { WithTeamContext } from '@/shared/test/decorators/WithTeamContext';
import { WithUserDashboardContext } from '@/shared/test/decorators/WithUserDashboardContext';

import { ChartTotalChangedFiles } from '.';
import { getFileOperations } from '../api/mock';

const meta: Meta<typeof ChartTotalChangedFiles> = {
  component: ChartTotalChangedFiles,
  decorators: [WithTeamContext, WithUserDashboardContext],
  beforeEach: () => {
    getUser.mockResolvedValue({
      id: 'userId',
      name: 'John',
      surname: 'Doe',
      email: 'john@doe.com',
    });

    getFileOperations.mockResolvedValue([
      {
        repoUrl: 'https://gitlab.com/repo-1',
        teamId: 'teamId',
        userId: 'userId',
        operation: 'CREATE',
        filename: 'file-1.ts',
        timestamp: '2023-01-01',
      },
      {
        repoUrl: 'https://gitlab.com/repo-1',
        teamId: 'teamId',
        userId: 'userId',
        operation: 'CREATE',
        filename: 'file-2.ts',
        timestamp: '2023-01-02',
      },
      {
        repoUrl: 'https://gitlab.com/repo-1',
        teamId: 'teamId',
        userId: 'userId',
        operation: 'EDIT',
        filename: 'file-3.ts',
        timestamp: '2023-01-03',
      },
      {
        repoUrl: 'https://gitlab.com/repo-1',
        teamId: 'teamId',
        userId: 'userId',
        operation: 'DELETE',
        filename: 'file-4.ts',
        timestamp: '2023-01-04',
      },
      {
        repoUrl: 'https://gitlab.com/repo-1',
        teamId: 'teamId',
        userId: 'userId',
        operation: 'EDIT',
        filename: 'file-5.ts',
        timestamp: '2023-01-05',
      },
    ]);
  },
};

export default meta;

export const Default = {};
