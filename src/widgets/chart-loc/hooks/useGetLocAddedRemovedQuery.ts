'use client';
import { RealtimePostgresChangesPayload } from '@supabase/supabase-js';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useCallback } from 'react';

import { useRealtime } from '@/shared/hooks/useRealtime';
import { useTeamContext } from '@/shared/providers/team-context';
import { useUserDashboardContext } from '@/shared/providers/user-dashboard-context';

import { developerLocPerDayQueryOptions } from '../api/queryKeys';
import { LocPerDayDTOSchema, locPerDaySchema } from '../model';

export const useGetLocAddedRemovedQuery = () => {
  const queryClient = useQueryClient();
  const currentTeamId = useTeamContext();
  const { userId: currentUserId } = useUserDashboardContext();
  const qo = developerLocPerDayQueryOptions(currentTeamId, currentUserId);

  const { data } = useQuery(qo);

  const mutateLocAddedRemoved = useCallback(
    (payload: RealtimePostgresChangesPayload<LocPerDayDTOSchema>) => {
      try {
        const parsedData = locPerDaySchema.parse(payload.new);

        queryClient.setQueryData(qo.queryKey, (draft) => {
          if (draft) {
            const oldData = draft.find(
              (d) => d.datetime === parsedData.datetime && d.userId === parsedData.userId,
            );

            if (oldData) {
              return draft.map((d) =>
                d.datetime === parsedData.datetime && d.userId === parsedData.userId
                  ? parsedData
                  : d,
              );
            } else {
              return [...draft, parsedData];
            }
          }
        });
      } catch {}
    },
    [queryClient, qo.queryKey],
  );

  useRealtime<LocPerDayDTOSchema>({
    channel: 'loc-per-day-channel',
    table: 'developer_loc_per_day',
    onPostgresChanges: mutateLocAddedRemoved,
  });

  return { data };
};
