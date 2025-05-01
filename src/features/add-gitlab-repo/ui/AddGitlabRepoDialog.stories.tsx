import { Meta, StoryObj } from '@storybook/react';
import { within, userEvent } from '@storybook/test';

import { AddGitlabRepoDialog } from '.';
import { addRepoToTeam, getRepos } from '../api/mock';

const meta: Meta<typeof AddGitlabRepoDialog> = {
  component: AddGitlabRepoDialog,
  beforeEach: () => {
    getRepos.mockResolvedValue([
      {
        id: 1,
        team_id: 'teamId',
        name: 'repo-1',
        description: 'description',
        url: 'https://gitlab.com/repo-1',
      },
    ]);
    addRepoToTeam.mockResolvedValue();
  },
};

export default meta;

type Story = StoryObj<typeof AddGitlabRepoDialog>;

export const Default: Story = {};

export const OpenDialog: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const triggerButton = canvas.getByRole('button', { name: 'Add new repository' });
    await userEvent.click(triggerButton);
    await canvas.findByRole('dialog');
  },
};

export const AddGitlabRepo: Story = {
  play: async (context) => {
    const { canvasElement, step } = context;
    const canvas = within(canvasElement);

    await OpenDialog.play?.(context);

    await step('Open select', async () => {
      const select = await canvas.findByRole('combobox');
      await userEvent.click(select);
    });

    await step('Select repo', async () => {
      const repoOption = await canvas.findByRole('option', { name: 'repo-1' });
      await userEvent.click(repoOption);
    });

    await step('Submit form', async () => {
      const submitButton = await canvas.findByText('Add repository');
      await userEvent.click(submitButton);
    });
  },
};
