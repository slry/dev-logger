import { z } from 'zod';

export const userSchema = z.object({
  name: z.string(),
  surname: z.string(),
  email: z.string(),
});

export type UserSchema = z.infer<typeof userSchema>;
