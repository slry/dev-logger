import { fn } from '@storybook/test';

import * as actual from './actions';

export const checkExistingTeam = fn(actual.checkExistingTeam).mockName(
  'checkExistingTeam',
);
export const createTeam = fn(actual.createTeam).mockName('createTeam');
