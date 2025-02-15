import { z } from 'zod';

export const apiTokenSchema = z.object({
  id: z.number(),
  name: z.string(),
  partialKey: z.string(),
  expiresAt: z.string(),
});

export type APITokenItem = z.infer<typeof apiTokenSchema>;
