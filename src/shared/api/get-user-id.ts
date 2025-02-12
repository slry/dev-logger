import 'server-only';
import { createClient } from './supabase/server';

export const getUserId = async () => {
  const supabase = await createClient();

  const { data: authData, error: authError } = await supabase.auth.getUser();

  if (authError) throw new Error(authError.message);

  return authData.user.id;
};
