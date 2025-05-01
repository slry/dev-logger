import { fn } from '@storybook/test';

import * as actual from './actions';

export const getRepos = fn(actual.getRepos).mockName('getRepos');
export const addRepoToTeam = fn(actual.addRepoToTeam).mockName('addRepoToTeam');
