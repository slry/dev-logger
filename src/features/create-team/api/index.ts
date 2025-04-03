'use server';

import { getUserId } from '@/shared/api/get-user-id';
import { createClient as createNextClient } from '@/shared/api/supabase/next';

export const checkExistingTeam = async (teamName: string) => {
  const supabaseClient = await createNextClient();

  const { data, error } = await supabaseClient
    .from('teams')
    .select('id')
    .eq('name', teamName);

  if (error) {
    throw new Error(`Error checking team name: ${error.message}`);
  }

  return data.length === 0;
};

export const createTeam = async (teamName: string, teamIcon: string) => {
  const userId = await getUserId();
  const supabaseClient = await createNextClient();

  const { data, error } = await supabaseClient
    .from('teams')
    .insert({ name: teamName, icon: teamIcon })
    .select('id')
    .single();

  if (error) {
    throw new Error(`Error creating team: ${error.message}`);
  }

  const { error: memberError } = await supabaseClient
    .from('developer_team')
    .insert({ user_id: userId, team_id: data.id, role: 'OWNER' });

  if (memberError) {
    throw new Error(`Error adding user to team: ${memberError.message}`);
  }

  return data;
};
