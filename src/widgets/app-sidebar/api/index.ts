'use server';

import { teamSchema } from '@/entities/team-item/model';
import { getUserId } from '@/shared/api/get-user-id';
import { createClient } from '@/shared/api/supabase/server';

import { currentTeamSchema } from '../model';

export const getTeamsList = async () => {
  const supabaseClient = await createClient();

  const { data, error } = await supabaseClient.from('teams').select('id, name, icon');

  if (error) {
    throw new Error(`Error fetching teams: ${error.message}`);
  }

  return teamSchema.array().parse(data);
};

export const getTeamById = async (teamId: string) => {
  const supabaseClient = await createClient();

  const { data, error } = await supabaseClient
    .from('teams')
    .select('id, name, icon, developer_team ( user_id, role )')
    .eq('id', teamId)
    .eq('developer_team.user_id', await getUserId())
    .single();

  if (error) {
    throw new Error(`Error fetching team: ${error.message}`);
  }

  return currentTeamSchema.parse({
    ...data,
    role: data.developer_team[0].role,
  });
};

export const getPersonalTeam = async () => {
  const supabaseClient = await createClient();

  const { data, error } = await supabaseClient
    .from('personal_teams')
    .select('personal_team_id')
    .single();

  if (error) {
    throw new Error(`Error fetching personal team: ${error.message}`);
  }

  return getTeamById(data.personal_team_id);
};
