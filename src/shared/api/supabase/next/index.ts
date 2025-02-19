import 'server-only';
import { createClient as createAPIClient } from '@supabase/supabase-js';

import { Database } from '../types';

export async function createClient() {
  return createAPIClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
        detectSessionInUrl: false,
      },
    },
  );
}

export type NextSupabaseClient = Awaited<ReturnType<typeof createClient>>;
