import { fn } from '@storybook/test';

import * as actual from './actions';

export const validateGitlabToken = fn(actual.validateGitlabToken).mockName(
  'validateGitlabToken',
);
export const integrateGitlabToken = fn(actual.integrateGitlabToken).mockName(
  'integrateGitlabToken',
);
export const revokeGitlabToken = fn(actual.revokeGitlabToken).mockName(
  'revokeGitlabToken',
);
export const isGitlabIntegrated = fn(actual.isGitlabIntegrated).mockName(
  'isGitlabIntegrated',
);
