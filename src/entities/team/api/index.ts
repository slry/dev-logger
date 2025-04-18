'use server';

import { getUserId } from '@/shared/api/get-user-id';
import { createClient } from '@/shared/api/supabase/server';

import { isUserTeamOwner } from '../../../shared/api/is-user-team-owner';
import { teamMemberSchema } from '../model';

export const getTeamMemberList = async (teamId: string) => {
  const userId = await getUserId();

  const isOwner = await isUserTeamOwner(teamId, userId);

  const supabase = await createClient();

  if (!isOwner) {
    const { data: memberData, error: memberError } = await supabase
      .from('developer_team')
      .select()
      .eq('team_id', teamId)
      .eq('user_id', userId)
      .single();

    if (memberError) {
      console.error(`User ${userId} is not a member of team ${teamId}`);
      return [];
    }

    const { data: userData, error: getUserError } = await supabase.auth.getUser();

    if (getUserError) {
      console.error(`Error fetching user data: ${getUserError.message}`);
      return [];
    }

    return teamMemberSchema.array().parse([
      {
        ...memberData,
        raw_user_metadata: userData.user.user_metadata,
      },
    ]);
  }

  const { data, error } = await supabase.rpc('get_team_members', { team_id: teamId });

  if (error) {
    console.error(error);
    return [];
  }

  return teamMemberSchema.array().parse(data);
};
