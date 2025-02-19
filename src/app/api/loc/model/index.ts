import { z } from 'zod';

export const changeSchema = z.object({
  file: z.string(),
  added: z.number(),
  deleted: z.number(),
});

export const bodySchema = z.object({
  changes: changeSchema.array(),
  timestamp: z.string(),
});

export type ChangeSchema = z.infer<typeof changeSchema>;
