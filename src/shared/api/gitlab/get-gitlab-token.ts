import { createClient } from '../supabase/server';

export const getGitlabToken = async (userId: string) => {
  const supabaseClient = await createClient();
  const { data } = await supabaseClient
    .from('integration_tokens')
    .select('token')
    .eq('user_id', userId)
    .eq('provider', 'GITLAB')
    .single();

  return data?.token;
};
