import { fn } from '@storybook/test';

import * as actual from '.';

export const createAPIToken = fn(actual.createAPIToken).mockName('createAPIToken');
