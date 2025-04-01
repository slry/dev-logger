import { queryOptions } from '@tanstack/react-query';

import { TeamSchema } from '@/entities/team-item/model';

import { getTeamsList } from '.';

export const getTeamsListQueryOptions = queryOptions<TeamSchema[]>({
  queryKey: ['teams_list'],
  queryFn: getTeamsList,
});
