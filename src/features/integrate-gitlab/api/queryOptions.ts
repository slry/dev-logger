import { queryOptions } from '@tanstack/react-query';

import { isGitlabIntegrated } from './actions';

export const isGitlabIntegratedQueryOptions = queryOptions<boolean>({
  queryKey: ['is-gitlab-integrated'],
  queryFn: isGitlabIntegrated,
});
