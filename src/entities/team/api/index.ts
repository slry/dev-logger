'use server';

import { getUserId } from '@/shared/api/get-user-id';
import { createClient } from '@/shared/api/supabase/server';

import { teamMemberSchema } from '../model';

export const isUserTeamOwner = async (teamId: string, userId: string) => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('developer_team')
    .select('role')
    .eq('team_id', teamId)
    .eq('user_id', userId)
    .single();

  if (error) {
    console.error(error);
    return false;
  }

  return data.role === 'OWNER';
};

export const getTeamMemberList = async (teamId: string) => {
  const userId = await getUserId();

  const isOwner = await isUserTeamOwner(teamId, userId);

  if (!isOwner) {
    console.error(`User ${userId} is not an owner of team ${teamId}`);
    return [];
  }

  const supabase = await createClient();

  const { data, error } = await supabase.rpc('get_team_members', { team_id: teamId });

  if (error) {
    console.error(error);
    return [];
  }

  return teamMemberSchema.array().parse(data);
};
