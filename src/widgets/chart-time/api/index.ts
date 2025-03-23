'use server';

import { createClient } from '@/shared/api/supabase/server';

import { timeSpentPerDaySchema } from '../model';

export const getTimeSpentPerDay = async () => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('developer_time_spent_per_day')
    .select('*')
    .order('date');

  if (error) {
    console.error(error);
    return [];
  }

  return timeSpentPerDaySchema.array().parse(data);
};
