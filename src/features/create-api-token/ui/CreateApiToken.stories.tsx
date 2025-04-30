import { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from '@storybook/test';

import { WithTeamContext } from '@/shared/test/decorators/WithTeamContext';

import { CreateAPIToken } from '.';
import { createAPIToken } from '../api/mock';

const meta: Meta<typeof CreateAPIToken> = {
  component: CreateAPIToken,
  decorators: [WithTeamContext],
  beforeEach: () => {
    createAPIToken.mockResolvedValue('newKey');
  },
};

export default meta;

type Story = StoryObj<typeof CreateAPIToken>;

export const Default: Story = {};

export const OpenDialog: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const openButton = canvas.getByText('Create API Token');
    await userEvent.click(openButton);

    await canvas.findByRole('dialog');
  },
};

export const CreateNewAPIToken: Story = {
  play: async (context) => {
    const { step, canvasElement } = context;
    const canvas = within(canvasElement);

    await OpenDialog.play?.(context);

    await step('Fill in the form', async () => {
      const nameInput = canvas.getByLabelText('Name');
      await userEvent.type(nameInput, 'My Token');
    });

    await step('Generate token', async () => {
      const generateButton = await canvas.findByText('Generate API Token');
      await userEvent.click(generateButton);
      expect(createAPIToken).toHaveBeenCalledOnce();
    });

    await step('Close the dialog', async () => {
      const closeButton = await canvas.findByText('Close', {
        selector: 'button',
      });
      await userEvent.click(closeButton);
    });
  },
};
