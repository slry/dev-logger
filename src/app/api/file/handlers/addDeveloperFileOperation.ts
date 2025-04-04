import { NextSupabaseClient } from '@/shared/api/supabase/next';

import { FileOperationSchema } from '../model';

interface AddDeveloperFileOperationParams {
  supabaseClient: NextSupabaseClient;
  operation: FileOperationSchema;
  userId: string;
  teamId: string;
}

export const addDeveloperFileOperation = async ({
  supabaseClient,
  operation,
  userId,
  teamId,
}: AddDeveloperFileOperationParams) => {
  await supabaseClient.from('developer_file_operations').insert({
    team_id: teamId,
    user_id: userId,
    ...operation,
  });
};
