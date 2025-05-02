import { usePathname } from '@storybook/experimental-nextjs-vite/navigation.mock';
import { Meta, StoryObj } from '@storybook/react';
import { within } from '@storybook/test';

import { getCurrentTeamById } from '@/entities/team/api/mock';
import { SidebarProvider } from '@/shared/shadcn/ui/sidebar';

import { HeaderBreadcrumbs } from '.';

const meta: Meta<typeof HeaderBreadcrumbs> = {
  component: HeaderBreadcrumbs,
  args: {
    teamId: 'teamId',
  },
  decorators: [
    (Story) => (
      <SidebarProvider>
        <Story />
      </SidebarProvider>
    ),
  ],
  beforeEach: () => {
    usePathname.mockImplementation(() => '/team/teamId/dashboard');
    getCurrentTeamById.mockResolvedValue({
      id: 'teamId',
      name: 'Personal',
      icon: 'Person',
      role: 'OWNER',
    });
  },
};

export default meta;

type Story = StoryObj<typeof HeaderBreadcrumbs>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await canvas.findByText('Team');
    await canvas.findByText('Personal');
    await canvas.findByText('Dashboard');
  },
};
