import { fn } from '@storybook/test';

import * as actual from './actions';

export const deleteAPIToken = fn(actual.deleteAPIToken).mockName('deleteAPIToken');
