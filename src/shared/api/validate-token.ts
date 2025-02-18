import 'server-only';
import { createClient } from './supabase/next';

type ValidateTokenResponse =
  | { data: string; error: null }
  | { data: null; error: string };

export const validateToken = async (token: string): Promise<ValidateTokenResponse> => {
  const supabase = await createClient();

  const { data, error } = await supabase.from('api_tokens').select('*').eq('key', token);

  if (error) {
    console.log(error);
    return { error: 'Invalid token (error during retrieving user_id)', data: null };
  }

  if (!data || data.length === 0) {
    return { error: 'Invalid token (token not found in db)', data: null };
  }

  try {
    const { user_id, expires_at } = data[0];

    if (new Date(expires_at) < new Date()) {
      return { error: 'Token expired', data: null };
    }

    return { error: null, data: user_id };
  } catch {
    return { error: 'Invalid token', data: null };
  }
};
