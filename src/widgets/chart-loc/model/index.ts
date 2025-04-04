import { z } from 'zod';

import { Database } from '@/shared/api/supabase/types';
import { parseChartDate } from '@/shared/lib/parseChartDate';
import { snakeToCamelCase } from '@/shared/lib/snakeToCamelCase';
import { Expect, IsSameType } from '@/shared/test/types';

export const locPerDayDTOSchema = z.object({
  team_id: z.string(),
  user_id: z.string(),
  datetime: z.string(),
  loc_added: z.number(),
  loc_removed: z.number(),
});

export const locPerDaySchema = locPerDayDTOSchema
  .transform(snakeToCamelCase)
  .transform((data) => ({
    ...data,
    datetime: parseChartDate(data.datetime),
  }));

export type LocPerDaySchema = z.infer<typeof locPerDaySchema>;
export type LocPerDayDTOSchema = z.infer<typeof locPerDayDTOSchema>;

// Type Test
type LocPerDayDTODatabase = Database['public']['Tables']['developer_loc_per_day']['Row'];

type _TypeTest = Expect<IsSameType<LocPerDayDTOSchema, LocPerDayDTODatabase>>;
