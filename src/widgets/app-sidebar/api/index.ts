'use server';

import { teamSchema } from '@/entities/team-item/model';
import { createClient } from '@/shared/api/supabase/server';

export const getTeamsList = async () => {
  const supabaseClient = await createClient();

  const { data, error } = await supabaseClient.from('teams').select('id, name, icon');

  if (error) {
    throw new Error(`Error fetching teams: ${error.message}`);
  }

  return teamSchema.array().parse(data);
};
