import { RealtimePostgresChangesPayload } from '@supabase/supabase-js';
import { useEffect } from 'react';

import { createClient } from '../api/supabase/client';
import { Database } from '../api/supabase/types';

interface RealtimeParams<T extends object> {
  channel: string;
  table: keyof Database['public']['Tables'];
  onPostgresChanges: (payload: RealtimePostgresChangesPayload<T>) => void;
}

export const useRealtime = <T extends object>({
  channel,
  table,
  onPostgresChanges,
}: RealtimeParams<T>) => {
  useEffect(() => {
    const supabase = createClient();
    const channels = supabase
      .channel(channel)
      .on('postgres_changes', { event: '*', schema: 'public', table }, onPostgresChanges)
      .subscribe();

    return () => {
      channels.unsubscribe();
    };
  }, [onPostgresChanges, channel, table]);
};
