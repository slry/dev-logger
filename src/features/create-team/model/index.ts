import { z } from 'zod';

import { checkExistingTeam } from '../api/actions';

export const createTeamSchema = z.object({
  name: z
    .string()
    .min(1, { message: 'Team name is required' })
    .refine(checkExistingTeam, { message: 'Team name already exists' }),
});

export type CreateTeamSchema = z.infer<typeof createTeamSchema>;
