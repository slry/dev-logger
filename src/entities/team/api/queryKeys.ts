import { queryOptions } from '@tanstack/react-query';

import { getTeamMemberList } from '.';
import { TeamMemberSchema } from '../model';

export const getTeamMembersListQueryOptions = (teamId: string) =>
  queryOptions<TeamMemberSchema[]>({
    queryKey: ['team-members-list', teamId],
    queryFn: () => getTeamMemberList(teamId),
  });
