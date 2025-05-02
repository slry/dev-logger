'use server';

import { createClient } from '@/shared/api/supabase/server';

import { locPerFileSchema } from '../model';

export const getLocPerFile = async (teamId: string, userId: string) => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('developer_loc_per_file')
    .select('*')
    .eq('team_id', teamId)
    .eq('user_id', userId);

  if (error) {
    console.error(error);
    return [];
  }

  return locPerFileSchema.array().parse(data);
};
