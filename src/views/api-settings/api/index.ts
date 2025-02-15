'use server';

import { ZodError } from 'zod';

import { apiTokenSchema } from '@/entities/api-token-item/model';
import { createClient } from '@/shared/api/supabase/server';

export const getAPITokensList = async () => {
  const supabase = await createClient();

  const { data: authData, error: authError } = await supabase.auth.getUser();

  if (authError) throw new Error(authError.message);

  const userId = authData.user.id;

  const { data: tokensData, error: tokensError } = await supabase
    .from('api_tokens')
    .select('id,name,key,expires_at')
    .eq('user_id', userId);

  if (tokensError) throw new Error(tokensError.message);

  const safeTokensData = tokensData.map((data) => ({
    id: data.id,
    name: data.name,
    partialKey: data.key.slice(0, 6),
    expiresAt: data.expires_at,
  }));

  try {
    return apiTokenSchema.array().parse(safeTokensData);
  } catch (error) {
    if (error instanceof ZodError) throw new Error('Failed to parse tokens data:', error);
  }
};
