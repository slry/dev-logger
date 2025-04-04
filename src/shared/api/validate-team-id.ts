'use server';

import { createClient as createNextClient } from './supabase/next';
import { createClient } from './supabase/server';

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
  const supabase = await createClient();

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
