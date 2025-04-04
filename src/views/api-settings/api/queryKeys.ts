import { queryOptions } from '@tanstack/react-query';

import { APITokenItem } from '@/entities/api-token-item/model';

import { getAPITokensList } from '.';

export const getApiTokensListQueryOptions = (teamId: string) =>
  queryOptions<APITokenItem[]>({
    queryKey: ['api-tokens-list', teamId],
    queryFn: () => getAPITokensList(teamId),
  });
