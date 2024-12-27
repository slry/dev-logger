import { z } from 'zod';

export const signupSchema = z.object({
  name: z.string().min(3),
  surname: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(8),
});

export type SignupSchema = z.infer<typeof signupSchema>;
