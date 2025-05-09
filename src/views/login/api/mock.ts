import { fn } from '@storybook/test';

import * as actual from './actions';

export const login = fn(actual.login).mockName('login');
