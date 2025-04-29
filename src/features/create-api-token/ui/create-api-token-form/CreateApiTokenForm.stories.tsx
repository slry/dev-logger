import { Meta, StoryObj } from '@storybook/react';
import { expect, fn, userEvent, within } from '@storybook/test';

import { CreateAPITokenForm } from '.';
import { createAPIToken } from '../../api/mock';

const meta: Meta<typeof CreateAPITokenForm> = {
  component: CreateAPITokenForm,
  beforeEach: () => {
    createAPIToken.mockResolvedValue('newKey');
  },
};

export default meta;

type Story = StoryObj<typeof CreateAPITokenForm>;

export const Default: Story = {};

const onComplete = fn();

export const CreateAPIToken: Story = {
  args: {
    onComplete,
    teamId: 'teamId',
  },
  play: async ({ step, canvasElement }) => {
    const canvas = within(canvasElement);

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
      const closeButton = await canvas.findByText('Close');
      await userEvent.click(closeButton);
      expect(onComplete).toHaveBeenCalledOnce();
    });
  },
};
