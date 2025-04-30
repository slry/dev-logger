import { Meta, StoryObj } from '@storybook/react';
import { within, userEvent, expect } from '@storybook/test';

import { WithTeamContext } from '@/shared/test/decorators/WithTeamContext';

import { DeleteApiTokenDialog } from '.';
import { deleteAPIToken } from '../api/mock';

const meta: Meta<typeof DeleteApiTokenDialog> = {
  component: DeleteApiTokenDialog,
  decorators: [WithTeamContext],
  args: {
    tokenId: 1,
    tokenName: 'Token Name',
  },
  beforeEach: () => {
    deleteAPIToken.mockResolvedValue();
  },
};

export default meta;

type Story = StoryObj<typeof DeleteApiTokenDialog>;

export const Default: Story = {};

export const OpenDialog: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const openButton = canvas.getByLabelText('Delete API Token');
    await userEvent.click(openButton);

    await canvas.findByRole('alertdialog');
  },
};

export const DeleteApiToken: Story = {
  play: async (context) => {
    const { step, canvasElement } = context;
    const canvas = within(canvasElement);

    await OpenDialog.play?.(context);

    await step('Confirm deletion', async () => {
      const confirmButton = await canvas.findByText('Delete');
      await userEvent.click(confirmButton);

      expect(deleteAPIToken).toHaveBeenCalledOnce();
    });
  },
};
