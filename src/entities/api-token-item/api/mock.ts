import { fn } from '@storybook/test';

import * as actual from './actions';

export const getAPITokensList = fn(actual.getAPITokensList).mockName('getAPITokensList');
