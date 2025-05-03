import { fn } from '@storybook/test';

import * as actual from './actions';

export const getTotalLoc = fn(actual.getTotalLoc).mockName('getTotalLoc');
