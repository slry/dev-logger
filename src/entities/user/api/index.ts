'use server';

import { createClient } from '@/shared/api/supabase/server';

import { userSchema } from '../model';

export const getUser = async () => {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();

  if (error) throw new Error(error.message);

  return userSchema.parse(data.user.user_metadata);
};
