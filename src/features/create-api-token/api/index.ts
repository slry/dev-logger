'use server';

import { getUserId } from '@/shared/api/get-user-id';
import { createClient } from '@/shared/api/supabase/server';

import { CreateAPITokenSchema } from '../model';
import { expiresAtISO } from '../utils/expiresAtISO';

export const createAPIToken = async (data: CreateAPITokenSchema) => {
  const supabase = await createClient();

  const userId = await getUserId();

  const { data: newData, error } = await supabase
    .from('api_tokens')
    .insert({
      user_id: userId,
      name: data.name,
      expires_at: expiresAtISO(Number(data.expiration)),
    })
    .select('key');

  if (error) throw new Error(error.message);

  const { key } = newData[0];

  if (!key) throw new Error('Failed to create token');

  return key;
};
