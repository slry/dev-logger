import { queryOptions } from '@tanstack/react-query';

import { getRepos } from './actions';
import { GitlabRepoTransformed } from '../model';

export const getReposQueryOptions = (teamId: string) =>
  queryOptions<GitlabRepoTransformed[]>({
    queryKey: ['repos'],
    queryFn: () => getRepos(teamId),
  });
