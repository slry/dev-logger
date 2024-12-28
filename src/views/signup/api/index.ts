'use server';

import { createClient } from '@/shared/api/supabase/server';

import { signupSchema, SignupSchema } from '../model';

interface SingupResponse {
  type: 'success' | 'error';
  message: string;
}

export async function signup(data: SignupSchema): Promise<SingupResponse> {
  const supabase = await createClient();

  const { email, password, name, surname } = signupSchema.parse(data);

  const { error } = await supabase.auth.signUp({
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

  return { type: 'success', message: 'Account created successfully' };
}
