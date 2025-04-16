import { NextSupabaseClient } from '@/shared/api/supabase/next';

interface AddDeveloperTimeSpentPerDayParams {
  supabaseClient: NextSupabaseClient;
  time: number;
  timestamp: string;
  userId: string;
  teamId: string;
  repoUrl: string | null;
}

export const addDeveloperTimeSpentPerDay = async ({
  supabaseClient,
  time,
  timestamp,
  userId,
  teamId,
  repoUrl,
}: AddDeveloperTimeSpentPerDayParams) => {
  const date = timestamp.split('T')[0];

  const table = supabaseClient.from('developer_time_spent_per_day');
  const existingData = await table
    .select('time_spent')
    .eq('date', date)
    .eq('user_id', userId);
  const currentTimeSpent = existingData.data?.[0]?.time_spent || 0;

  await table.upsert({
    repo_url: repoUrl,
    team_id: teamId,
    user_id: userId,
    date,
    time_spent: time + currentTimeSpent,
  });
};
