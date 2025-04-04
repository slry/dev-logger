import { z } from 'zod';

import { Database } from '@/shared/api/supabase/types';
import { snakeToCamelCase } from '@/shared/lib/snakeToCamelCase';
import { Expect, IsSameType } from '@/shared/test/types';

export const locPerFileDTOSchema = z.object({
  team_id: z.string(),
  user_id: z.string(),
  filename: z.string(),
  loc_added: z.number(),
  loc_removed: z.number(),
});

export const locPerFileSchema = locPerFileDTOSchema.transform(snakeToCamelCase);

export type LocPerFileSchema = z.infer<typeof locPerFileSchema>;
export type LocPerFileDTOSchema = z.infer<typeof locPerFileDTOSchema>;

// Type Test
type LocPerFileDTODatabase =
  Database['public']['Tables']['developer_loc_per_file']['Row'];

type _TypeTest = Expect<IsSameType<LocPerFileDTOSchema, LocPerFileDTODatabase>>;
