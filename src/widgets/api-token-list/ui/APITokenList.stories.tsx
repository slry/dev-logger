import { Meta, StoryObj } from '@storybook/react';

import { APITokenList } from '.';

const meta: Meta<typeof APITokenList> = {
  component: APITokenList,
};

export default meta;

type Story = StoryObj<typeof APITokenList>;

export const Default: Story = {};
