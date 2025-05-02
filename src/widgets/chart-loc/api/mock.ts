import { fn } from '@storybook/test';

import * as actual from './actions';

export const getLocAddedRemovedPerDay = fn(actual.getLocAddedRemovedPerDay).mockName(
  'getLocAddedRemovedPerDay',
);
