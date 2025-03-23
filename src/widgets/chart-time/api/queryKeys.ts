import { queryOptions } from '@tanstack/react-query';

import { getTimeSpentPerDay } from '.';
import { TimeSpentPerDaySchema } from '../model';

export const developerTimeSpentPerDayQueryOptions = queryOptions<TimeSpentPerDaySchema[]>(
  {
    queryKey: ['developer_time_spent_per_day'],
    queryFn: getTimeSpentPerDay,
  },
);
