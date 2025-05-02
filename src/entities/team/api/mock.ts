import { fn } from '@storybook/test';

import * as actual from './actions';

export const getTeamMemberList = fn(actual.getTeamMemberList).mockName(
  'getTeamMemberList',
);
export const getTeamById = fn(actual.getTeamById).mockName('getTeamById');
export const getCurrentTeamById = fn(actual.getCurrentTeamById).mockName(
  'getCurrentTeamById',
);
export const getPersonalTeam = fn(actual.getPersonalTeam).mockName('getPersonalTeam');
export const validateTeamId = fn(actual.validateTeamId).mockName('validateTeamId');
export const getTeamsList = fn(actual.getTeamsList).mockName('getTeamsList');
