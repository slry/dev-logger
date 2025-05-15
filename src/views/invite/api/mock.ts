import { fn } from '@storybook/test';

import * as actual from './actions';

export const joinTeam = fn(actual.joinTeam).mockName('joinTeam');
