import { queryOptions } from '@tanstack/react-query';

import { getPersonalTeam } from '.';

export const getPersonalTeamIdQueryOptions = queryOptions<string>({
  queryKey: ['personal_team_id'],
  queryFn: async () => {
    const personalTeam = await getPersonalTeam();
    return personalTeam.id;
  },
});
