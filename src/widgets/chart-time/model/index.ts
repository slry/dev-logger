import { z } from 'zod';

import { Database } from '@/shared/api/supabase/types';
import { parseChartDate } from '@/shared/lib/parseChartDate';
import { snakeToCamelCase } from '@/shared/lib/snakeToCamelCase';
import { Expect, IsSameType } from '@/shared/test/types';

import { parseMsToTime } from '../lib/parseTime';

export const timeSpentPerDayDTOSchema = z.object({
  team_id: z.string(),
  user_id: z.string(),
  date: z.string(),
  time_spent: z.number(),
});

export const timeSpentPerDaySchema = timeSpentPerDayDTOSchema
  .transform(snakeToCamelCase)
  .transform((data) => ({
    ...data,
    date: parseChartDate(data.date),
    timeSpentLabel: parseMsToTime(data.timeSpent),
  }));

export type TimeSpentPerDaySchema = z.infer<typeof timeSpentPerDaySchema>;
export type TimeSpentPerDayDTOSchema = z.infer<typeof timeSpentPerDayDTOSchema>;

// Type Test
type TimePerDayDTODatabase =
  Database['public']['Tables']['developer_time_spent_per_day']['Row'];

type _TypeTest = Expect<IsSameType<TimeSpentPerDayDTOSchema, TimePerDayDTODatabase>>;
