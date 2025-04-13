'use server';

import { getUserId } from '@/shared/api/get-user-id';
import { createClient } from '@/shared/api/supabase/server';

import { isUserTeamOwner } from '../../../shared/api/is-user-team-owner';
import { teamMemberSchema } from '../model';

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
