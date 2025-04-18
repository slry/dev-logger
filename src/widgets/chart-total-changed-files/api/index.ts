'use server';

import { createClient } from '@/shared/api/supabase/server';

import { fileOperationsSchema } from '../model';

export const getFileOperations = async (teamId: string, userId: string) => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('developer_file_operations')
    .select('*')
    .eq('team_id', teamId)
    .eq('user_id', userId)
    .order('timestamp');

  if (error) {
    console.error(error);
    return [];
  }

  return fileOperationsSchema.array().parse(data);
};
