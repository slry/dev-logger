import { Meta, StoryObj } from '@storybook/react';

import {
  getPersonalTeam,
  getTeamMemberList,
  validateTeamId,
} from '@/entities/team/api/mock';
import { getUser } from '@/entities/user/api/mock';
import { getRepos } from '@/features/add-gitlab-repo/api/mock';
import { WithSuspense } from '@/shared/test/decorators/WithSuspense';
import { getTeamGitlabRepos } from '@/widgets/gitlab-repo-list/api/mock';

import { TeamSettingsPage } from '.';

const meta: Meta<typeof TeamSettingsPage> = {
  args: {
    params: Promise.resolve({
      teamId: 'teamId',
    }),
  },
  component: TeamSettingsPage,
  decorators: [WithSuspense],
  beforeEach: () => {
    validateTeamId.mockResolvedValue({ valid: true, teamId: 'teamId' });
    getUser.mockResolvedValue({
      id: 'userId',
      email: 'john.doe@example.com',
      name: 'John Doe',
      surname: 'Doe',
    });
    getPersonalTeam.mockResolvedValue({
      personal_team_id: 'teamId',
      user_id: 'userId',
    });
    getTeamMemberList.mockResolvedValue([
      {
        userId: 'userId',
        role: 'OWNER',
        name: 'John',
        surname: 'Doe',
        email: 'john.doe@example.com',
      },
    ]);
    getTeamGitlabRepos.mockResolvedValue([
      {
        name: 'repo1',
        teamId: 'teamId',
        url: 'https://gitlab.com/repo1',
        description: 'description1',
      },
    ]);
    getRepos.mockResolvedValue([
      {
        id: 2,
        name: 'repo2',
        team_id: 'teamId',
        url: 'https://gitlab.com/repo2',
        description: 'description2',
      },
    ]);
  },
};

export default meta;

type Story = StoryObj<typeof TeamSettingsPage>;

export const Default: Story = {};
