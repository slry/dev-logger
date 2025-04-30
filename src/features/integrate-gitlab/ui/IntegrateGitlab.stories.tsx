import { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from '@storybook/test';

import { IntegrateGitlab } from '.';
import {
  integrateGitlabToken,
  isGitlabIntegrated,
  validateGitlabToken,
  revokeGitlabToken,
} from '../api/mock';

const meta: Meta<typeof IntegrateGitlab> = {
  component: IntegrateGitlab,
  beforeEach: () => {
    isGitlabIntegrated.mockResolvedValue(false);
    validateGitlabToken.mockResolvedValue(true);
    integrateGitlabToken.mockResolvedValue();
    revokeGitlabToken.mockResolvedValue();
  },
};

export default meta;

type Story = StoryObj<typeof IntegrateGitlab>;

export const Default: Story = {};

export const IntegrateWithGitlab: Story = {
  play: async ({ step, canvasElement }) => {
    const canvas = within(canvasElement);

    await canvas.findByText('Not Integrated');
    await step('Fill in the form', async () => {
      const gitlabTokenInput = canvas.getByPlaceholderText('Gitlab Token');
      const integrateButton = canvas.getByText('Integrate');
      await userEvent.type(gitlabTokenInput, 'glpat-Fpo23mN5rZzFyysBtWv9');
      await userEvent.click(integrateButton);

      expect(validateGitlabToken).toHaveBeenCalledOnce();
      expect(integrateGitlabToken).toHaveBeenCalledOnce();
    });

    await step('Verify integration', async () => {});
  },
};

export const AlreadyIntegrated: Story = {
  beforeEach: () => {
    isGitlabIntegrated.mockResolvedValue(true);
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await canvas.findByText('Integrated');
    await canvas.findByText(
      'Congratulations! You have successfully integrated with Gitlab.',
    );
  },
};

export const RevokeGitlabToken: Story = {
  beforeEach: () => {
    isGitlabIntegrated.mockResolvedValue(true);
    revokeGitlabToken.mockResolvedValue();
  },
  play: async ({ step, canvasElement }) => {
    const canvas = within(canvasElement);

    await step('Open dropdown menu actions', async () => {
      const dropdownMenuTrigger = await canvas.findByLabelText('Gitlab Actions');
      await userEvent.click(dropdownMenuTrigger);
    });

    await step('Open revoke gitlab token dialog', async () => {
      const revokeButton = await canvas.findByText('Revoke');
      await userEvent.click(revokeButton);
    });

    await step('Revoke gitlab token', async () => {
      const dialog = await canvas.findByRole('alertdialog');
      const revokeButton = await within(dialog).findByText('Revoke');
      await userEvent.click(revokeButton);

      expect(revokeGitlabToken).toHaveBeenCalledOnce();
    });
  },
};
