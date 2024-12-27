import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const nativeEventSchema = z.object({
  submitter: z.object({
    name: z.union([z.literal('login'), z.literal('signup')]),
  }),
});

export type LoginSchema = z.infer<typeof loginSchema>;
