import { fn } from '@storybook/test';

import * as actual from './actions';

export const getTeamMemberList = fn(actual.getTeamMemberList).mockName(
  'getTeamMemberList',
);
export const getTeamById = fn(actual.getTeamById).mockName('getTeamById');
export const getPersonalTeam = fn(actual.getPersonalTeam).mockName('getPersonalTeam');
export const validateTeamId = fn(actual.validateTeamId).mockName('validateTeamId');
