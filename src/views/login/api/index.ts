'use server';

import { createClient } from '@/shared/api/supabase/server';

import { loginSchema, LoginSchema } from '../model';

interface LoginResponse {
  type: 'success' | 'error';
  message: string;
}

export async function login(data: LoginSchema): Promise<LoginResponse> {
  const supabase = await createClient();

  const validData = loginSchema.parse(data);

  const { error } = await supabase.auth.signInWithPassword(validData);

  if (error) return { type: 'error', message: error.message };

  return { type: 'success', message: 'Logged in successfully' };
}
