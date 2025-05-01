import 'server-only';
import { createClient } from '../supabase/server';

export const getGitlabToken = async (userId: string) => {
  const supabaseClient = await createClient();
  const { data, error } = await supabaseClient
    .from('integration_tokens')
    .select('token')
    .eq('user_id', userId)
    .eq('provider', 'GITLAB')
    .single();

  if (error) {
    console.error('Error fetching GitLab token:', error);
    return null;
  }

  return data?.token;
};
