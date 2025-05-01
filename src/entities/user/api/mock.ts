import { fn } from '@storybook/test';

import * as actual from './actions';

export const getUser = fn(actual.getUser).mockName('getUser');
