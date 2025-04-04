import { NextSupabaseClient } from '@/shared/api/supabase/next';

import { ChangeSchema } from '../model';

interface AddDeveloperLocPerDayParams {
  supabaseClient: NextSupabaseClient;
  changes: ChangeSchema[];
  timestamp: string;
  teamId: string;
  userId: string;
}

export const addDeveloperLocPerDay = async ({
  supabaseClient,
  changes,
  timestamp,
  userId,
  teamId,
}: AddDeveloperLocPerDayParams) => {
  const table = supabaseClient.from('developer_loc_per_day');
  const selector = table.select('*');

  const { totalAdded, totalDeleted } = changes.reduce(
    (acc, { added, deleted }) => {
      acc.totalAdded += added;
      acc.totalDeleted += deleted;
      return acc;
    },
    { totalAdded: 0, totalDeleted: 0 },
  );

  const datetime = timestamp.split('T')[0];

  const { data } = await selector.eq('datetime', datetime).eq('user_id', userId);

  await table.upsert({
    team_id: teamId,
    user_id: userId,
    datetime,
    loc_added: totalAdded + (data?.[0]?.loc_added || 0),
    loc_removed: totalDeleted + (data?.[0]?.loc_removed || 0),
  });
};
