import { redirect } from 'next/navigation';

import { createClient } from './supabase/client';

export const clientSignout = async () => {
  const supabase = createClient();

  await supabase.auth.signOut();

  redirect('/signin');
};
