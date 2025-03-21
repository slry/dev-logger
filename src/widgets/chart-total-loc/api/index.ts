'use server';

import { createClient } from '@/shared/api/supabase/server';

import { totalLocSchema } from '../model';

export const getTotalLoc = async () => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('developer_loc_per_day')
    .select('loc_added, loc_removed');

  if (error) {
    console.error(error);
    return { locAdded: 0, locRemoved: 0 };
  }

  return totalLocSchema.parse(data);
};
