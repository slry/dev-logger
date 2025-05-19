import { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from '@storybook/test';

import { getCurrentTeamById, getTeamsList } from '@/entities/team/api/mock';
import { CurrentTeamSchema } from '@/entities/team/model';
import { getUser } from '@/entities/user/api/mock';
import { checkExistingTeam, createTeam } from '@/features/create-team/api/mock';
import { SidebarProvider } from '@/shared/shadcn/ui/sidebar';
import { WithSuspense } from '@/shared/test/decorators/WithSuspense';

import { AppSidebar } from '.';
import { getPersonalTeam } from '../api/mock';

const meta: Meta<typeof AppSidebar> = {
  component: AppSidebar,
  decorators: [
    WithSuspense,
    (Story) => (
      <SidebarProvider>
        <Story />
      </SidebarProvider>
    ),
  ],
  args: {
    teamId: 'teamId',
  },
};

export default meta;

type Story = StoryObj<typeof AppSidebar>;

export const Default: Story = {
  beforeEach: async () => {
    getUser.mockResolvedValue({
      id: '1',
      name: 'John',
      surname: 'Doe',
      email: 'john@doe.com',
    });
    getTeamsList.mockResolvedValue([
      {
        id: 'teamId',
        name: 'Personal',
        icon: 'Person',
      },
    ]);
    getPersonalTeam.mockResolvedValue({
      id: 'teamId',
      name: 'Personal',
      icon: 'Person',
      role: 'OWNER',
    });
    getCurrentTeamById.mockResolvedValue({
      id: 'teamId',
      name: 'Personal',
      icon: 'Person',
      role: 'OWNER',
    });
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Check sidebar items', async () => {
      await canvas.findByText('Dashboard');
      await canvas.findByText('Integrations');
      await canvas.findByText('API Settings');
      await canvas.findByText('Team Settings');
    });

    await step('Check if user is loaded', async () => {
      expect(getUser).toHaveBeenCalled();
      await canvas.findByText('John Doe');
      await canvas.findByText('john@doe.com');
    });

    expect(getTeamsList).toHaveBeenCalled();
    expect(getPersonalTeam).toHaveBeenCalled();
    expect(getCurrentTeamById).toHaveBeenCalled();
  },
};

export const CreateTeam: Story = {
  beforeEach: async () => {
    getUser.mockResolvedValue({
      id: '1',
      name: 'John',
      surname: 'Doe',
      email: 'john@doe.com',
    });
    getPersonalTeam.mockResolvedValue({
      id: 'teamId',
      name: 'Personal',
      icon: 'Person',
      role: 'OWNER',
    });
    getCurrentTeamById.mockResolvedValue({
      id: 'teamId',
      name: 'Personal',
      icon: 'Person',
      role: 'OWNER',
    });
    getTeamsList
      .mockResolvedValue([
        {
          id: 'teamId',
          name: 'Personal',
          icon: 'Person',
        },
      ])
      .mockResolvedValueOnce([
        {
          id: 'teamId',
          name: 'Personal',
          icon: 'Person',
        },
        {
          id: 'newTeamId',
          name: 'My Team',
          icon: 'Person',
        },
      ]);
    createTeam.mockResolvedValue({
      id: 'newTeamId',
    });
    checkExistingTeam.mockResolvedValue(true);
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Open Add Team dialog', async () => {
      const teamSwitcher = await canvas.findByRole('button', { name: 'Switch team' });
      await userEvent.click(teamSwitcher);
      const addTeamButton = await canvas.findByText('Add team');
      await userEvent.click(addTeamButton);
    });

    await step('Fill in team name and submit', async () => {
      const teamNameInput = canvas.getByLabelText('Team Name');
      await userEvent.type(teamNameInput, 'My Team');
      const createTeamButton = canvas.getByRole('button', { name: 'Create Team' });
      await userEvent.click(createTeamButton);

      expect(createTeam).toHaveBeenCalled();
    });

    await step('Check if team was created', async () => {
      const teamName = await canvas.findByText('My Team');
      expect(teamName).toBeInTheDocument();
    });
  },
};

export const TeamSwitcherNotLoaded: Story = {
  beforeEach: async () => {
    getUser.mockResolvedValue({
      id: '1',
      name: 'John',
      surname: 'Doe',
      email: 'john@doe.com',
    });
    getTeamsList.mockResolvedValue([
      {
        id: 'teamId',
        name: 'Personal',
        icon: 'Person',
      },
    ]);
    getPersonalTeam.mockResolvedValue({
      id: 'teamId',
      name: 'Personal',
      icon: 'Person',
      role: 'OWNER',
    });
    getCurrentTeamById.mockResolvedValue(null as unknown as CurrentTeamSchema);
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Check if team switcher is not loaded', async () => {
      expect(canvas.queryByRole('button', { name: 'Switch team' })).toBeNull();
    });
  },
};
