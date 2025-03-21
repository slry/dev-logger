import { queryOptions } from '@tanstack/react-query';

import { getTotalLoc } from '.';
import { TotalLocSchema } from '../model';

export const developerTotalLocQueryOptions = queryOptions<TotalLocSchema>({
  queryKey: ['developer_total_loc'],
  queryFn: getTotalLoc,
});
