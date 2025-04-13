import 'server-only';
import { createClient } from '@/shared/api/supabase/server';

export const isUserTeamOwner = async (teamId: string, userId: string) => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('developer_team')
    .select('role')
    .eq('team_id', teamId)
    .eq('user_id', userId)
    .single();

  if (error) {
    console.error(error);
    return false;
  }

  return data.role === 'OWNER';
};
