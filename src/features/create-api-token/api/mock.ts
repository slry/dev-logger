import { fn } from '@storybook/test';

import * as actual from './actions';

export const createAPIToken = fn(actual.createAPIToken).mockName('createAPIToken');
