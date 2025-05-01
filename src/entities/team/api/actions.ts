'use server';

import { getUserId } from '@/shared/api/get-user-id';
import { isUserTeamOwner } from '@/shared/api/is-user-team-owner';
import { createClient as createNextClient } from '@/shared/api/supabase/next';
import { createClient as createServerClient } from '@/shared/api/supabase/server';

import { teamMemberSchema } from '../model';

export const getTeamMemberList = async (teamId: string) => {
  const userId = await getUserId();

  const isOwner = await isUserTeamOwner(teamId, userId);

  const supabase = await createServerClient();

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

export const getTeamById = async (teamId: string) => {
  const supabase = await createNextClient();

  const { data, error } = await supabase
    .from('teams')
    .select('*')
    .eq('id', teamId)
    .single();

  if (error) {
    console.error(error);
    return null;
  }

  return data;
};

export const getPersonalTeam = async () => {
  const supabase = await createServerClient();

  const { data, error } = await supabase.from('personal_teams').select('*').single();

  if (error) {
    console.error(error);
    return null;
  }

  return data;
};

export const validateTeamId = async (teamId: string) => {
  if (teamId === 'personal') {
    const personalTeam = await getPersonalTeam();
    if (!personalTeam) return { valid: false, teamId: null };

    return { valid: true, teamId: personalTeam.personal_team_id };
  }

  const team = await getTeamById(teamId);
  if (!team) return { valid: false, teamId: null };
  return { valid: true, teamId: team.id };
};
