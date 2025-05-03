import { Meta } from '@storybook/react';

import { getAPITokensList } from '@/entities/api-token-item/api/mock';
import { validateTeamId } from '@/entities/team/api/mock';
import { WithSuspense } from '@/shared/test/decorators/WithSuspense';
import { WithTeamContext } from '@/shared/test/decorators/WithTeamContext';

import { ApiSettingsPage } from '.';

const meta: Meta<typeof ApiSettingsPage> = {
  component: ApiSettingsPage,
  decorators: [WithSuspense, WithTeamContext],
  args: {
    params: Promise.resolve({
      teamId: 'teamId',
    }),
  },
  beforeEach: () => {
    getAPITokensList.mockResolvedValue([]);
    validateTeamId.mockResolvedValue({ valid: true, teamId: 'teamId' });
  },
};

export default meta;

export const Default = {};
