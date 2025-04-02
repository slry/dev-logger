import { z } from 'zod';

import { Database } from '@/shared/api/supabase/types';
import { snakeToCamelCase } from '@/shared/lib/snakeToCamelCase';
import { Expect, IsSameType } from '@/shared/test/types';

export const teamDTOSchema = z.object({
  id: z.string(),
  name: z.string(),
  icon: z.string(),
});

export const teamSchema = teamDTOSchema.transform(snakeToCamelCase);

export type TeamDTOSchema = z.infer<typeof teamDTOSchema>;
export type TeamSchema = z.infer<typeof teamSchema>;

// Type Test
type TeamDTODatabase = Database['public']['Tables']['teams']['Row'];

type _TypeTest = Expect<IsSameType<TeamDTOSchema, TeamDTODatabase>>;
