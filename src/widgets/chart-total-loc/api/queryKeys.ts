import { queryOptions } from '@tanstack/react-query';

import { getTotalLoc } from '.';
import { TotalLocSchema } from '../model';

export const developerTotalLocQueryOptions = (teamId: string) =>
  queryOptions<TotalLocSchema>({
    queryKey: ['developer-total-loc', teamId],
    queryFn: () => getTotalLoc(teamId),
  });
