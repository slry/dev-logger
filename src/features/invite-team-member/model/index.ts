import { z } from 'zod';

import { Database } from '@/shared/api/supabase/types';
import { snakeToCamelCase } from '@/shared/lib/snakeToCamelCase';
import { Expect, IsSameType } from '@/shared/test/types';

export const inviteLinkDTOSchema = z.object({
  id: z.string(),
  team_id: z.string(),
  expires_after: z.string(),
});

export const inviteLinkSchema = inviteLinkDTOSchema.transform(snakeToCamelCase);

export type InviteLinkDTOSchema = z.infer<typeof inviteLinkDTOSchema>;
export type InviteLinkSchema = z.infer<typeof inviteLinkSchema>;

// Type Test

type InviteLinkDTODatabase = Database['public']['Tables']['team_invites']['Row'];

type _TypeTest = Expect<IsSameType<InviteLinkDTOSchema, InviteLinkDTODatabase>>;
