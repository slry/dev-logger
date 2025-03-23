import { z } from 'zod';

export const bodySchema = z.object({
  time: z.number(),
  timestamp: z.string(),
});
