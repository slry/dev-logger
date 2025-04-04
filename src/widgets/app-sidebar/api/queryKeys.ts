import { queryOptions } from '@tanstack/react-query';

import { TeamSchema } from '@/entities/team-item/model';

import { getPersonalTeam, getTeamById, getTeamsList } from '.';
import { CurrentTeamSchema } from '../model';

export const getTeamsListQueryOptions = queryOptions<TeamSchema[]>({
  queryKey: ['teams_list'],
  queryFn: getTeamsList,
});

export const getPersonalTeamIdQueryOptions = queryOptions<string>({
  queryKey: ['personal_team_id'],
  queryFn: async () => {
    const personalTeam = await getPersonalTeam();
    return personalTeam.id;
  },
});

export const getCurrentTeamQueryOptions = (teamId: string) =>
  queryOptions<CurrentTeamSchema>({
    queryKey: ['current_team', teamId],
    queryFn: () => getTeamById(teamId),
  });
