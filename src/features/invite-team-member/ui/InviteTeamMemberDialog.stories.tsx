import { Meta, StoryObj } from '@storybook/react';
import { within, userEvent, expect } from '@storybook/test';

import { InviteTeamMemberDialog } from '.';
import { createNewInviteLink } from '../api/mock';

const meta: Meta<typeof InviteTeamMemberDialog> = {
  component: InviteTeamMemberDialog,
  beforeEach: () => {
    createNewInviteLink.mockResolvedValue({
      id: 'inviteLinkId',
      expiresAfter: '2023-10-01T00:00:00.000Z',
      teamId: 'teamId',
    });
  },
};

export default meta;

type Story = StoryObj<typeof InviteTeamMemberDialog>;

export const Default: Story = {};

export const OpenDialog: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const openButton = canvas.getByText('Invite new member');
    await userEvent.click(openButton);

    await canvas.findByRole('dialog');
  },
};

export const CreateInviteLink: Story = {
  play: async (context) => {
    const { step, canvasElement } = context;
    const canvas = within(canvasElement);

    await OpenDialog.play?.(context);

    await step('Create new invite link', async () => {
      const createButton = await canvas.findByText('Create new link');
      await userEvent.click(createButton);
    });

    await step('Verify link', async () => {
      const link = await canvas.findByDisplayValue(
        'undefined/team/teamId/invite/inviteLinkId',
      );
      expect(link).toBeInTheDocument();
    });

    await step('Close the dialog', async () => {
      const closeButton = await canvas.findByText('Close', {
        selector: 'button',
      });
      await userEvent.click(closeButton);
    });
  },
};
