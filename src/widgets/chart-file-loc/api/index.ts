'use server';

import { createClient } from '@/shared/api/supabase/server';

import { locPerFileSchema } from '../model';

export const getLocPerFile = async () => {
  const supabase = await createClient();

  const { data, error } = await supabase.from('developer_total_loc').select('*');

  if (error) {
    console.error(error);
    return [];
  }

  return locPerFileSchema.array().parse(data);
};
