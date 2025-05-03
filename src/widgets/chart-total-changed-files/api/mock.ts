import { fn } from '@storybook/test';

import * as actual from './actions';

export const getFileOperations = fn(actual.getFileOperations).mockName(
  'getFileOperations',
);
