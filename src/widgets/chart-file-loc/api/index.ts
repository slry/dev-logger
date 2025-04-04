'use server';

import { createClient } from '@/shared/api/supabase/server';

import { locPerFileSchema } from '../model';

export const getLocPerFile = async (teamId: string) => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('developer_loc_per_file')
    .select('*')
    .eq('team_id', teamId);

  if (error) {
    console.error(error);
    return [];
  }

  return locPerFileSchema.array().parse(data);
};
