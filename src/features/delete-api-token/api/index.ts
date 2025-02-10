'use server';

import { createClient } from '@/shared/api/supabase/server';

export const deleteAPIToken = async (id: number) => {
  const supabase = await createClient();

  const { data: authData, error: authError } = await supabase.auth.getUser();

  if (authError) throw new Error(authError.message);

  const userId = authData.user.id;

  const { error } = await supabase
    .from('api_tokens')
    .delete()
    .eq('user_id', userId)
    .eq('id', id);

  if (error) throw new Error(error.message);
};
