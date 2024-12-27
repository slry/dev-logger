'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { createClient } from '@/shared/api/supabase/server';

import { loginSchema, LoginSchema } from '../model';

export async function login(data: LoginSchema) {
  const supabase = await createClient();

  const validData = loginSchema.parse(data);

  const { error } = await supabase.auth.signInWithPassword(validData);

  if (error) {
    redirect('/error');
  }

  revalidatePath('/', 'layout');
  redirect('/');
}

export async function signup(data: LoginSchema) {
  const supabase = await createClient();

  const validData = loginSchema.parse(data);

  const { error } = await supabase.auth.signUp(validData);

  if (error) {
    redirect('/error');
  }

  revalidatePath('/', 'layout');
  redirect('/');
}
