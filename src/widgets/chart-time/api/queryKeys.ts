import { queryOptions } from '@tanstack/react-query';

import { getTimeSpentPerDay } from '.';
import { TimeSpentPerDaySchema } from '../model';

export const developerTimeSpentPerDayQueryOptions = (teamId: string) =>
  queryOptions<TimeSpentPerDaySchema[]>({
    queryKey: ['developer_time_spent_per_day', teamId],
    queryFn: () => getTimeSpentPerDay(teamId),
  });
