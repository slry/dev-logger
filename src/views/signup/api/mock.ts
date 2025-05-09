import { fn } from '@storybook/test';

import * as actual from './actions';

export const signup = fn(actual.signup).mockName('signup');
