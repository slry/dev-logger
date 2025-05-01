import { queryOptions } from '@tanstack/react-query';

import { getPersonalTeam } from '@/entities/team/api/actions';

export const isPersonalTeamQueryOptions = (teamId: string) =>
  queryOptions<boolean>({
    queryKey: ['is-personal-team', teamId],
    queryFn: async () => {
      const personalTeam = await getPersonalTeam();
      if (!personalTeam) return false;
      return personalTeam.personal_team_id === teamId;
    },
  });
