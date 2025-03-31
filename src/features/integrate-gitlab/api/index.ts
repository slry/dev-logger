'use server';

import { getUserId } from '@/shared/api/get-user-id';
import { getGitlabToken } from '@/shared/api/gitlab/get-gitlab-token';
import { createGitlabClient } from '@/shared/api/gitlab/server';
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
  const userId = await getUserId();
  const token = await getGitlabToken(userId);

  return !!token;
};
