import { fn } from '@storybook/test';

import * as actual from './actions';

export const removeGitlabRepo = fn(actual.removeGitlabRepo).mockName('removeGitlabRepo');
