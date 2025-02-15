import { z } from 'zod';

export const createAPITokenSchema = z.object({
  name: z.string().nonempty(),
  expiration: z.union([
    z.literal('7'),
    z.literal('30'),
    z.literal('60'),
    z.literal('90'),
  ]),
});

export type CreateAPITokenSchema = z.infer<typeof createAPITokenSchema>;
