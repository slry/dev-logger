import { queryOptions } from '@tanstack/react-query';

import { getCurrentTeamById, getTeamMemberList, getTeamsList } from './actions';
import { TeamMemberSchema, CurrentTeamSchema, TeamSchema } from '../model';

export const getTeamMembersListQueryOptions = (teamId: string) =>
  queryOptions<TeamMemberSchema[]>({
    queryKey: ['team-members-list', teamId],
    queryFn: () => getTeamMemberList(teamId),
  });

export const getTeamsListQueryOptions = queryOptions<TeamSchema[]>({
  queryKey: ['teams_list'],
  queryFn: getTeamsList,
});

export const getCurrentTeamQueryOptions = (teamId: string) =>
  queryOptions<CurrentTeamSchema>({
    queryKey: ['current_team', teamId],
    queryFn: () => getCurrentTeamById(teamId),
  });
