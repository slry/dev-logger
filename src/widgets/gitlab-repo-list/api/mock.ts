import { fn } from '@storybook/test';

import * as actual from './actions';

export const getTeamGitlabRepos = fn(actual.getTeamGitlabRepos).mockName(
  'getTeamGitlabRepos',
);
