import { NextSupabaseClient } from '@/shared/api/supabase/next';

import { ChangeSchema } from '../model';

interface AddDeveloperTotalLocParams {
  supabaseClient: NextSupabaseClient;
  changes: ChangeSchema[];
  userId: string;
}

export const addDeveloperTotalLoc = async ({
  supabaseClient,
  changes,
  userId,
}: AddDeveloperTotalLocParams) => {
  const table = supabaseClient.from('developer_total_loc');
  const selector = table.select('*');

  changes.forEach(async ({ file, added, deleted }) => {
    const { data } = await selector.eq('filename', file).eq('user_id', userId);
    await table.upsert({
      user_id: userId,
      filename: file,
      loc_added: added + (data?.[0]?.loc_added || 0),
      loc_removed: deleted + (data?.[0]?.loc_removed || 0),
    });
  });
};
