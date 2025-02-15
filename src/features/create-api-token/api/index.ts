'use server';

import { getUserId } from '@/shared/api/get-user-id';
import { createClient } from '@/shared/api/supabase/server';

import { CreateAPITokenSchema } from '../model';
import { expiresAt } from '../utils/expiresAt';

export const createAPIToken = async (data: CreateAPITokenSchema) => {
  const supabase = await createClient();

  const userId = await getUserId();

  const { error } = await supabase.from('api_tokens').insert({
    user_id: userId,
    name: data.name,
    expires_at: expiresAt(Number(data.expiration)),
  });

  if (error) throw new Error(error.message);
};
