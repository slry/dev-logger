import { queryOptions } from '@tanstack/react-query';

import { TeamSchema } from '@/entities/team-item/model';

import { getTeamById, getTeamsList } from '.';

export const getTeamsListQueryOptions = queryOptions<TeamSchema[]>({
  queryKey: ['teams_list'],
  queryFn: getTeamsList,
});

export const getCurrentTeamQueryOptions = (teamId: string) =>
  queryOptions<TeamSchema>({
    queryKey: ['current_team', teamId],
    queryFn: () => getTeamById(teamId),
  });
