import { fn } from '@storybook/test';

import * as actual from './actions';

export const createNewInviteLink = fn(actual.createNewInviteLink).mockName(
  'createNewInviteLink',
);
