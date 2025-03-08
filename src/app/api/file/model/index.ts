import { z } from 'zod';

export const bodySchema = z.object({
  filename: z.string(),
  timestamp: z.string(),
  operation: z.union([z.literal('CREATE'), z.literal('DELETE')]),
});

export type FileOperationSchema = z.infer<typeof bodySchema>;
