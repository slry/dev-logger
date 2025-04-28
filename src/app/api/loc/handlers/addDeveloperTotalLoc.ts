import { NextSupabaseClient } from '@/shared/api/supabase/next';

import { ChangeSchema } from '../model';

interface AddDeveloperTotalLocParams {
  supabaseClient: NextSupabaseClient;
  changes: ChangeSchema[];
  userId: string;
  teamId: string;
  repoUrl: string | null;
}

export const addDeveloperTotalLoc = async ({
  supabaseClient,
  changes,
  userId,
  teamId,
  repoUrl,
}: AddDeveloperTotalLocParams) => {
  const table = supabaseClient.from('developer_loc_per_file');
  const selector = table.select('*');

  changes.forEach(async ({ file, added, deleted }) => {
    const { data } = await selector.eq('filename', file).eq('user_id', userId);
    await table.upsert({
      team_id: teamId,
      user_id: userId,
      repo_url: repoUrl,
      filename: file,
      loc_added: added + (data?.[0]?.loc_added ?? 0),
      loc_removed: deleted + (data?.[0]?.loc_removed ?? 0),
    });
  });
};
