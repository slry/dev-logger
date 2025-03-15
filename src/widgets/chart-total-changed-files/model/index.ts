import { z } from 'zod';

import { Database } from '@/shared/api/supabase/types';
import { snakeToCamelCase } from '@/shared/lib/snakeToCamelCase';
import { Expect, IsSameType } from '@/shared/test/types';

export const fileOperationsDTOSchema = z.object({
  user_id: z.string(),
  id: z.number(),
  timestamp: z.string(),
  filename: z.string(),
  operation: z.union([z.literal('CREATE'), z.literal('DELETE')]),
});

export const fileOperationsSchema = fileOperationsDTOSchema.transform(snakeToCamelCase);

export type FileOperationsSchema = z.infer<typeof fileOperationsSchema>;
export type FileOperationsDTOSchema = z.infer<typeof fileOperationsDTOSchema>;

// Type Test
type FileOperationsDTODatabase =
  Database['public']['Tables']['developer_file_operations']['Row'];

type _TypeTest = Expect<IsSameType<FileOperationsDTOSchema, FileOperationsDTODatabase>>;
