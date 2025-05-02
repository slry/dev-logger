import { queryOptions } from '@tanstack/react-query';

import { getLocAddedRemovedPerDay } from './actions';
import { LocPerDaySchema } from '../model';

export const developerLocPerDayQueryOptions = (teamId: string, userId: string) =>
  queryOptions<LocPerDaySchema[]>({
    queryKey: ['developer_loc_per_day', teamId, userId],
    queryFn: () => getLocAddedRemovedPerDay(teamId, userId),
  });
