import { queryOptions } from '@tanstack/react-query';

import { isGitlabIntegrated } from '.';

export const isGitlabIntegratedQueryOptions = queryOptions<boolean>({
  queryKey: ['is-gitlab-integrated'],
  queryFn: isGitlabIntegrated,
});
