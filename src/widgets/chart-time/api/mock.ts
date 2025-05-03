import { fn } from '@storybook/test';

import * as actual from './actions';

export const getTimeSpentPerDay = fn(actual.getTimeSpentPerDay).mockName(
  'getTimeSpentPerDay',
);
