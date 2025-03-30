'use server';

import { createGitlabClient } from '@/shared/api/create-gitlab-client';
import { getUserId } from '@/shared/api/get-user-id';
import { createClient } from '@/shared/api/supabase/server';

export const validateGitlabToken = async (token: string) => {
  try {
    const client = createGitlabClient(token);
    await client.Users.all();
    return true;
  } catch (error) {
    console.error('Error validating Gitlab token:', error);
    return false;
  }
};

export const integrateGitlabToken = async (token: string) => {
  const supabaseClient = await createClient();
  const userId = await getUserId();
  await supabaseClient
    .from('integration_tokens')
    .insert({ user_id: userId, token, provider: 'GITLAB' });
};

export const revokeGitlabToken = async () => {
  const supabaseClient = await createClient();
  const userId = await getUserId();
  await supabaseClient
    .from('integration_tokens')
    .delete()
    .eq('user_id', userId)
    .eq('provider', 'GITLAB');
};

export const isGitlabIntegrated = async () => {
  const supabaseClient = await createClient();
  const userId = await getUserId();
  const { data } = await supabaseClient
    .from('integration_tokens')
    .select('token')
    .eq('user_id', userId)
    .eq('provider', 'GITLAB')
    .single();

  return !!data?.token;
};
