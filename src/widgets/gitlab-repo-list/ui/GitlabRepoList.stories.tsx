import { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from '@storybook/test';

import { addRepoToTeam, getRepos } from '@/features/add-gitlab-repo/api/mock';

import { GitlabRepoList } from '.';
import { getTeamGitlabRepos } from '../api/mock';

const meta: Meta<typeof GitlabRepoList> = {
  component: GitlabRepoList,
  args: {
    teamId: 'teamId',
  },
  beforeEach: () => {
    getTeamGitlabRepos.mockResolvedValue([]);
    getRepos.mockResolvedValue([
      {
        id: 1,
        team_id: 'teamId',
        name: 'repo-1',
        description: 'description',
        url: 'https://gitlab.com/repo-1',
      },
    ]);
  },
};

export default meta;

type Story = StoryObj<typeof GitlabRepoList>;

export const EmptyList: Story = {};

export const ListWithItems: Story = {
  beforeEach: () => {
    getTeamGitlabRepos.mockResolvedValue([
      {
        teamId: 'teamId',
        name: 'My Gitlab Repo',
        url: 'https://gitlab.com/my-gitlab-repo',
        description: 'My Gitlab Repo description',
      },
    ]);
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await canvas.findByText('Gitlab Repositories');
    await canvas.findByText('My Gitlab Repo');
    await canvas.findByText('My Gitlab Repo description');
  },
};

export const AddNewRepo: Story = {
  beforeEach: () => {
    getTeamGitlabRepos
      .mockResolvedValueOnce([
        {
          teamId: 'teamId',
          name: 'My Gitlab Repo',
          url: 'https://gitlab.com/my-gitlab-repo',
          description: 'My Gitlab Repo description',
        },
      ])
      .mockResolvedValueOnce([
        {
          teamId: 'teamId',
          name: 'My Gitlab Repo',
          url: 'https://gitlab.com/my-gitlab-repo',
          description: 'My Gitlab Repo description',
        },
        {
          teamId: 'teamId',
          name: 'New Gitlab Repo',
          url: 'https://gitlab.com/new-gitlab-repo',
          description: 'New Gitlab Repo description',
        },
      ]);

    getRepos.mockResolvedValue([
      {
        id: 1,
        team_id: 'teamId',
        name: 'New Gitlab Repo',
        url: 'https://gitlab.com/new-gitlab-repo',
        description: 'New Gitlab Repo description',
      },
    ]);

    addRepoToTeam.mockResolvedValue();
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Open Add Gitlab Repo dialog', async () => {
      const addRepoButton = await canvas.findByText('Add new repository');
      await userEvent.click(addRepoButton);
    });

    await step('Open select', async () => {
      const select = await canvas.findByRole('combobox');
      await userEvent.click(select);
    });

    await step('Select repo', async () => {
      const repoOption = await canvas.findByRole('option', { name: 'New Gitlab Repo' });
      await userEvent.click(repoOption);
    });

    await step('Submit form', async () => {
      const submitButton = await canvas.findByText('Add repository');
      await userEvent.click(submitButton);
    });

    await step('Check if repo was added', async () => {
      expect(getRepos).toHaveBeenCalled();
      expect(addRepoToTeam).toHaveBeenCalled();

      await canvas.findByText('New Gitlab Repo');
      await canvas.findByText('New Gitlab Repo description');
    });
  },
};
