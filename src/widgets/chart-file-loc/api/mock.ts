import { fn } from '@storybook/test';

import * as actual from './actions';

export const getLocPerFile = fn(actual.getLocPerFile).mockName('getLocPerFile');
