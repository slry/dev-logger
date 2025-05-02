import { fn } from '@storybook/test';

import * as actual from './actions';

export const getPersonalTeam = fn(actual.getPersonalTeam).mockName('getPersonalTeam');
