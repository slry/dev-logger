import { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from '@storybook/test';

import { getAPITokensList } from '@/entities/api-token-item/api/mock';
import { createAPIToken } from '@/features/create-api-token/api/mock';
import { WithTeamContext } from '@/shared/test/decorators/WithTeamContext';

import { APITokenList } from '.';

const meta: Meta<typeof APITokenList> = {
  component: APITokenList,
  decorators: [WithTeamContext],
};

export default meta;

type Story = StoryObj<typeof APITokenList>;

export const EmptyList: Story = {
  beforeEach: () => {
    getAPITokensList.mockResolvedValue([]);
  },
};

export const ListWithItems: Story = {
  beforeEach: () => {
    getAPITokensList.mockResolvedValue([
      {
        id: 1,
        name: 'My API Token',
        partialKey: '1234567890',
        expiresAt: '2023-01-01',
      },
    ]);
  },
};

export const AddNewToken: Story = {
  beforeEach: () => {
    getAPITokensList.mockResolvedValueOnce([]).mockResolvedValueOnce([
      {
        id: 1,
        name: 'My API Token',
        partialKey: '1234567890',
        expiresAt: '2023-01-01',
      },
    ]);
    createAPIToken.mockResolvedValue('newKey');
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Open Add API Token dialog', async () => {
      const createButton = await canvas.findByText('Create API Token');
      await userEvent.click(createButton);
    });

    await step('Fill in API Token name and submit', async () => {
      const nameInput = await canvas.findByLabelText('Name');
      await userEvent.type(nameInput, 'My API Token');

      const createButton = await canvas.findByText('Generate API Token');
      await userEvent.click(createButton);

      const closeButton = await canvas.findByText('Close', { selector: 'button' });
      await userEvent.click(closeButton);

      expect(createAPIToken).toHaveBeenCalledOnce();
    });

    await step('Check if token was created', async () => {
      expect(getAPITokensList).toHaveBeenCalled();
      await canvas.findByText('My API Token');
    });
  },
};
