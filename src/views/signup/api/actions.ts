'use server';

import { createClient as createNextClient } from '@/shared/api/supabase/next';
import { createClient as createServerClient } from '@/shared/api/supabase/server';

import { signupSchema, SignupSchema } from '../model';

interface SingupResponse {
  type: 'success' | 'error';
  message: string;
}

export async function signup(data: SignupSchema): Promise<SingupResponse> {
  const supabase = await createServerClient();
  const supabaseNext = await createNextClient();

  const { email, password, name, surname } = signupSchema.parse(data);

  const { data: userData, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name,
        surname,
      },
    },
  });

  if (error) return { type: 'error', message: error.message };

  if (!userData.user) {
    return { type: 'error', message: 'User data is missing' };
  }

  const { data: teamData, error: teamError } = await supabaseNext
    .from('teams')
    .insert({ name: 'Personal Space', icon: 'Cat' })
    .select('id')
    .single();

  if (teamError) {
    return { type: 'error', message: teamError.message };
  }

  const { error: memberError } = await supabaseNext
    .from('developer_team')
    .insert({ user_id: userData.user.id, team_id: teamData.id, role: 'OWNER' });

  if (memberError) {
    return { type: 'error', message: memberError.message };
  }

  const { error: personalTeamError } = await supabaseNext
    .from('personal_teams')
    .insert({ user_id: userData.user.id, personal_team_id: teamData.id });

  if (personalTeamError) {
    return { type: 'error', message: personalTeamError.message };
  }

  return { type: 'success', message: 'Account created successfully' };
}
