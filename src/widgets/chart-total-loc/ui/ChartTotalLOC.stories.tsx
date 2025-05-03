import { Meta, StoryObj } from '@storybook/react';
import { within } from '@storybook/test';

import { getUser } from '@/entities/user/api/mock';
import { WithTeamContext } from '@/shared/test/decorators/WithTeamContext';
import { WithUserDashboardContext } from '@/shared/test/decorators/WithUserDashboardContext';

import { ChartTotalLOC } from '.';
import { getTotalLoc } from '../api/mock';

const meta: Meta<typeof ChartTotalLOC> = {
  component: ChartTotalLOC,
  decorators: [WithTeamContext, WithUserDashboardContext],
  beforeEach: () => {
    getUser.mockResolvedValue({
      id: 'userId',
      name: 'John',
      surname: 'Doe',
      email: 'john@doe.com',
    });

    getTotalLoc.mockResolvedValue({
      locAdded: 10,
      locRemoved: 5,
    });
  },
};

export default meta;

type Story = StoryObj<typeof ChartTotalLOC>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await canvas.findByText('Total LOC Changed');
    await canvas.findByText('15');
  },
};
