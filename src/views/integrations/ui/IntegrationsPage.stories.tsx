import { Meta } from '@storybook/react';

import { isGitlabIntegrated } from '@/features/integrate-gitlab/api/mock';
import { WithSuspense } from '@/shared/test/decorators/WithSuspense';
import { WithTeamContext } from '@/shared/test/decorators/WithTeamContext';

import { IntegrationsPage } from '.';

const meta: Meta<typeof IntegrationsPage> = {
  component: IntegrationsPage,
  args: {
    params: Promise.resolve({
      teamId: 'teamId',
    }),
  },
  decorators: [WithSuspense, WithTeamContext],
  beforeEach: () => {
    isGitlabIntegrated.mockResolvedValue(true);
  },
};

export default meta;

export const Default = {};
