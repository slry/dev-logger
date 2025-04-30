import { Meta, StoryObj } from '@storybook/react';
import { within, userEvent, expect } from '@storybook/test';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/shared/shadcn/ui/dropdown-menu';

import { CreateTeamDialog } from '.';
import { checkExistingTeam, createTeam } from '../api/mock';

const meta: Meta<typeof CreateTeamDialog> = {
  parameters: {
    nextjs: {
      router: {
        pathname: '/team/[teamId]/dashboard',
        asPath: '/team/teamId/dashboard',
      },
    },
  },
  component: CreateTeamDialog,
  beforeEach: () => {
    createTeam.mockResolvedValue({
      id: 'teamId',
    });
    checkExistingTeam.mockResolvedValue(true);
  },
  decorators: [
    (Story) => (
      <DropdownMenu>
        <DropdownMenuTrigger>Trigger</DropdownMenuTrigger>
        <DropdownMenuContent>
          <Story />
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof CreateTeamDialog>;

export const Default: Story = {};

export const OpenDialog: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const dropdownTrigger = canvas.getByText('Trigger');
    await userEvent.click(dropdownTrigger);

    const openButton = await canvas.findByText('Add team');
    await userEvent.click(openButton);

    await canvas.findByRole('dialog');
  },
};

export const CreateTeam: Story = {
  play: async (context) => {
    const { step, canvasElement } = context;
    const canvas = within(canvasElement);

    await OpenDialog.play?.(context);

    await step('Fill in the form', async () => {
      const nameInput = canvas.getByLabelText('Team Name');
      await userEvent.type(nameInput, 'My Team');
    });

    await step('Create team', async () => {
      const createButton = await canvas.findByText('Create Team');
      await userEvent.click(createButton);

      expect(checkExistingTeam).toHaveBeenCalledOnce();
      expect(createTeam).toHaveBeenCalledOnce();
    });
  },
};

export const TeamExistsError: Story = {
  beforeEach: () => {
    checkExistingTeam.mockResolvedValue(false);
  },
  play: async (context) => {
    const { step, canvasElement } = context;
    const canvas = within(canvasElement);

    await OpenDialog.play?.(context);

    await step('Fill in the form', async () => {
      const nameInput = canvas.getByLabelText('Team Name');
      await userEvent.type(nameInput, 'My Team');
    });

    await step('Create team', async () => {
      const createButton = await canvas.findByText('Create Team');
      await userEvent.click(createButton);

      expect(checkExistingTeam).toHaveBeenCalledOnce();
      expect(createTeam).not.toHaveBeenCalled();
    });

    await step('Check error message', async () => {
      await canvas.findByText('Team name already exists');
    });
  },
};

export const Validation: Story = {
  play: async (context) => {
    const { step, canvasElement } = context;
    const canvas = within(canvasElement);

    await OpenDialog.play?.(context);

    await step('Click on submit without filling the form', async () => {
      const createButton = await canvas.findByText('Create Team');
      await userEvent.click(createButton);

      await canvas.findByText('Team name is required');
    });
  },
};
