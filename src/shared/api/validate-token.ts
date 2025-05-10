import 'server-only';
import { createClient } from './supabase/next';

type ValidateTokenResponse =
  | { data: { user_id: string; team_id: string }; error: null }
  | { data: null; error: string };

export const validateToken = async (token: string): Promise<ValidateTokenResponse> => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('api_tokens')
    .select('*')
    .eq('key', token)
    .single();

  if (error) {
    return { error: 'Invalid token (error during retrieving user_id)', data: null };
  }

  if (!data) {
    return { error: 'Invalid token (token not found in db)', data: null };
  }

  const { user_id, team_id, expires_at } = data;

  if (new Date(expires_at) < new Date()) {
    return { error: 'Token expired', data: null };
  }

  return { error: null, data: { user_id, team_id } };
};
