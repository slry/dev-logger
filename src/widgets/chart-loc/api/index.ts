'use server';

import { createClient } from '@/shared/api/supabase/server';
import { snakeToCamelCase } from '@/shared/lib/snakeToCamelCase';

export const getLocAddedRemovedPerDay = async () => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('developer_loc_per_day')
    .select('*')
    .order('datetime');

  if (error) {
    console.error(error);
    return [];
  }

  return data.map(snakeToCamelCase).map((item) => ({
    ...item,
    datetime: new Date(item.datetime).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    }),
  }));
};
