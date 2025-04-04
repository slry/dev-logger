'use server';

import { apiTokenSchema } from '@/entities/api-token-item/model';
import { getUserId } from '@/shared/api/get-user-id';
import { createClient } from '@/shared/api/supabase/server';

export const getAPITokensList = async (teamId: string) => {
  const supabase = await createClient();

  const userId = await getUserId();

  const { data: tokensData, error: tokensError } = await supabase
    .from('api_tokens')
    .select('id,name,key,expires_at')
    .eq('team_id', teamId)
    .eq('user_id', userId);

  if (tokensError) throw new Error(tokensError.message);

  const safeTokensData = tokensData.map((data) => ({
    id: data.id,
    name: data.name,
    partialKey: data.key.slice(0, 6),
    expiresAt: data.expires_at,
  }));

  return apiTokenSchema.array().parse(safeTokensData);
};
