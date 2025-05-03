import { queryOptions } from '@tanstack/react-query';

import { getTimeSpentPerDay } from './actions';
import { TimeSpentPerDaySchema } from '../model';

export const developerTimeSpentPerDayQueryOptions = (teamId: string, userId: string) =>
  queryOptions<TimeSpentPerDaySchema[]>({
    queryKey: ['developer_time_spent_per_day', teamId, userId],
    queryFn: () => getTimeSpentPerDay(teamId, userId),
  });
