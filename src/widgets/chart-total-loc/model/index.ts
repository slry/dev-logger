import { z } from 'zod';

import { Database } from '@/shared/api/supabase/types';
import { snakeToCamelCase } from '@/shared/lib/snakeToCamelCase';
import { Expect, IsSameType } from '@/shared/test/types';

export const locAddedRemovedDTOSchema = z.object({
  loc_added: z.number(),
  loc_removed: z.number(),
});

export const locAddedRemovedSchema = locAddedRemovedDTOSchema.transform(snakeToCamelCase);

export const totalLocSchema = locAddedRemovedSchema.array().transform((data) => {
  return data.reduce(
    (acc, curr) => {
      acc.locAdded += curr.locAdded;
      acc.locRemoved += curr.locRemoved;
      return acc;
    },
    { locAdded: 0, locRemoved: 0 },
  );
});

export type TotalLocSchema = z.infer<typeof totalLocSchema>;
export type LocAddedRemovedSchema = z.infer<typeof locAddedRemovedSchema>;
export type LocAddedRemovedDTOSchema = z.infer<typeof locAddedRemovedDTOSchema>;

// Type Test
type LocAddedRemovedDTODatabase = Pick<
  Database['public']['Tables']['developer_loc_per_day']['Row'],
  'loc_added' | 'loc_removed'
>;

type _TypeTest = Expect<IsSameType<LocAddedRemovedDTOSchema, LocAddedRemovedDTODatabase>>;
