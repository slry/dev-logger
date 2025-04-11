import { z } from 'zod';

import { snakeToCamelCase } from '@/shared/lib/snakeToCamelCase';

export const userMetadataSchema = z.object({
  name: z.string(),
  surname: z.string(),
  email: z.string(),
});

export const userDTOSchema = z.object({
  id: z.string(),
  user_metadata: userMetadataSchema,
});

export const userSchema = userDTOSchema
  .transform(snakeToCamelCase)
  .transform(({ userMetadata, ...data }) => ({
    ...data,
    ...userMetadata,
  }));

export type UserSchema = z.infer<typeof userSchema>;
