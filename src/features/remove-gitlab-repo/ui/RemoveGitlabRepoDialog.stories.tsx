import { Meta, StoryObj } from '@storybook/react';
import { within, userEvent } from '@storybook/test';

import { RemoveGitlabRepoDialog } from '.';
import { removeGitlabRepo } from '../api/mock';

const meta: Meta<typeof RemoveGitlabRepoDialog> = {
  component: RemoveGitlabRepoDialog,
  beforeEach: () => {
    removeGitlabRepo.mockResolvedValue(true);
  },
};

export default meta;

type Story = StoryObj<typeof RemoveGitlabRepoDialog>;

export const Default: Story = {};

export const OpenDialog: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const triggerButton = canvas.getByLabelText('Remove repository');
    await userEvent.click(triggerButton);
    await canvas.findByRole('alertdialog');
  },
};

export const RemoveGitlabRepo: Story = {
  play: async (context) => {
    const { canvasElement, step } = context;
    const canvas = within(canvasElement);

    await OpenDialog.play?.(context);

    await step('Submit form', async () => {
      const submitButton = await canvas.findByText('Remove');
      await userEvent.click(submitButton);
    });
  },
};
