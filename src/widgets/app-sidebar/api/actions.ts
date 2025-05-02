'use server';

import { getCurrentTeamById } from '@/entities/team/api/actions';
import { createClient } from '@/shared/api/supabase/server';

export const getPersonalTeam = async () => {
  const supabaseClient = await createClient();

  const { data, error } = await supabaseClient
    .from('personal_teams')
    .select('personal_team_id')
    .single();

  if (error) {
    throw new Error(`Error fetching personal team: ${error.message}`);
  }

  return getCurrentTeamById(data.personal_team_id);
};
