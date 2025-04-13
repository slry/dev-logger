import { queryOptions } from '@tanstack/react-query';

import { getTeamGitlabRepos } from '.';
import { GitlabRepoSchema } from '../model';

export const getTeamGitlabReposQueryOptions = (teamId: string) =>
  queryOptions<GitlabRepoSchema[]>({
    queryKey: ['team-repos-list', teamId],
    queryFn: () => getTeamGitlabRepos(teamId),
  });
