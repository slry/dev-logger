'use server';

import { getUserId } from '@/shared/api/get-user-id';
import { createClient } from '@/shared/api/supabase/server';

export const deleteAPIToken = async (id: number) => {
  const supabase = await createClient();

  const userId = await getUserId();

  const { error } = await supabase
    .from('api_tokens')
    .delete()
    .eq('user_id', userId)
    .eq('id', id);

  if (error) throw new Error(error.message);
};
