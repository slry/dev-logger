'use server';

import { createClient } from '@/shared/api/supabase/server';

import { locPerDaySchema } from '../model';

export const getLocAddedRemovedPerDay = async (teamId: string) => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('developer_loc_per_day')
    .select('*')
    .eq('team_id', teamId)
    .order('datetime');

  if (error) {
    console.error(error);
    return [];
  }

  return locPerDaySchema.array().parse(data);
};
