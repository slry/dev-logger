import { z } from 'zod';

import { userSchema } from '@/entities/user/model';
import { Database } from '@/shared/api/supabase/types';
import { snakeToCamelCase } from '@/shared/lib/snakeToCamelCase';
import { Expect, IsSameType } from '@/shared/test/types';

export const teamMemberDTOSchema = z.object({
  user_id: z.string(),
  role: z.enum(['OWNER', 'DEVELOPER']),
  raw_user_metadata: userSchema,
});

export const teamMemberSchema = teamMemberDTOSchema
  .transform(snakeToCamelCase)
  .transform(({ rawUserMetadata, ...data }) => ({
    ...data,
    ...rawUserMetadata,
  }));

export type TeamMemberSchema = z.infer<typeof teamMemberSchema>;
export type teamMemberDTOSchema = Omit<
  z.infer<typeof teamMemberDTOSchema>,
  'raw_user_metadata'
>;

// Type Test
type TeamMemberDTODatabase = Omit<
  Database['public']['Functions']['get_team_members']['Returns'][0],
  'raw_user_metadata'
>;

type _TypeTest = Expect<IsSameType<TeamMemberDTODatabase, teamMemberDTOSchema>>;
