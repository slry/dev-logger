'use server';

import { getUserId } from '@/shared/api/get-user-id';
import { createClient } from '@/shared/api/supabase/server';

export const createAPIToken = async () => {
  const supabase = await createClient();

  const userId = await getUserId();

  const { error } = await supabase.from('api_tokens').insert({ user_id: userId });

  if (error) throw new Error(error.message);
};
