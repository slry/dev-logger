import { NextSupabaseClient } from '@/shared/api/supabase/next';

import { FileOperationSchema } from '../model';

interface AddDeveloperFileOperationParams {
  supabaseClient: NextSupabaseClient;
  operation: FileOperationSchema;
  userId: string;
}

export const addDeveloperFileOperation = async ({
  supabaseClient,
  operation,
  userId,
}: AddDeveloperFileOperationParams) => {
  await supabaseClient.from('developer_file_operations').insert({
    user_id: userId,
    ...operation,
  });
};
