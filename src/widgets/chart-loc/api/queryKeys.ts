import { queryOptions } from '@tanstack/react-query';

import { getLocAddedRemovedPerDay } from '.';
import { LocPerDaySchema } from '../model';

export const developerLocPerDayQueryOptions = queryOptions<LocPerDaySchema[]>({
  queryKey: ['developer_loc_per_day'],
  queryFn: getLocAddedRemovedPerDay,
});
