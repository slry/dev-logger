import { queryOptions } from '@tanstack/react-query';

import { getTotalLoc } from '.';
import { TotalLocSchema } from '../model';

export const developerTotalLocQueryOptions = (teamId: string, userId: string) =>
  queryOptions<TotalLocSchema>({
    queryKey: ['developer-total-loc', teamId, userId],
    queryFn: () => getTotalLoc(teamId, userId),
  });
