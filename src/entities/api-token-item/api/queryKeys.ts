import { queryOptions } from '@tanstack/react-query';

import { APITokenItem } from '../model';
import { getAPITokensList } from './actions';

export const getApiTokensListQueryOptions = (teamId: string) =>
  queryOptions<APITokenItem[]>({
    queryKey: ['api-tokens-list', teamId],
    queryFn: () => getAPITokensList(teamId),
  });
