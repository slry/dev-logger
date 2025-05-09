import { NextSupabaseClient } from '@/shared/api/supabase/next';

import { ChangeSchema } from '../model';

interface AddDeveloperFileOperationsParams {
  supabaseClient: NextSupabaseClient;
  changes: ChangeSchema[];
  timestamp: string;
  userId: string;
  teamId: string;
  repoUrl: string | null;
}

export const addDeveloperFileOperations = async ({
  supabaseClient,
  changes,
  timestamp,
  userId,
  teamId,
  repoUrl,
}: AddDeveloperFileOperationsParams) => {
  const table = supabaseClient.from('developer_file_operations');

  changes.forEach(async ({ file }) => {
    await table.upsert({
      repo_url: repoUrl,
      team_id: teamId,
      user_id: userId,
      filename: file,
      timestamp,
      operation: 'EDIT',
    });
  });
};
