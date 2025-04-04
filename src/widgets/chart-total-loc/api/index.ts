'use server';

import { createClient } from '@/shared/api/supabase/server';

import { totalLocSchema } from '../model';

export const getTotalLoc = async (teamId: string) => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('developer_loc_per_day')
    .select('loc_added, loc_removed')
    .eq('team_id', teamId);

  if (error) {
    console.error(error);
    return { locAdded: 0, locRemoved: 0 };
  }

  return totalLocSchema.parse(data);
};
