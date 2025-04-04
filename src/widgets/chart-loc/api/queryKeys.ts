import { queryOptions } from '@tanstack/react-query';

import { getLocAddedRemovedPerDay } from '.';
import { LocPerDaySchema } from '../model';

export const developerLocPerDayQueryOptions = (teamId: string) =>
  queryOptions<LocPerDaySchema[]>({
    queryKey: ['developer_loc_per_day', teamId],
    queryFn: () => getLocAddedRemovedPerDay(teamId),
  });
