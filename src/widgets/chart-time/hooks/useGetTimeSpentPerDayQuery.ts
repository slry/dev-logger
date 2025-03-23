'use client';
import { RealtimePostgresChangesPayload } from '@supabase/supabase-js';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useCallback } from 'react';

import { useRealtime } from '@/shared/hooks/useRealtime';

import { developerTimeSpentPerDayQueryOptions } from '../api/queryKeys';
import { TimeSpentPerDayDTOSchema, timeSpentPerDaySchema } from '../model';

export const useGetTimeSpentPerDayQuery = () => {
  const queryClient = useQueryClient();

  const { data } = useQuery(developerTimeSpentPerDayQueryOptions);

  const mutateTimeSpentPerDay = useCallback(
    (payload: RealtimePostgresChangesPayload<TimeSpentPerDayDTOSchema>) => {
      try {
        const parsedData = timeSpentPerDaySchema.parse(payload.new);

        queryClient.setQueryData(
          developerTimeSpentPerDayQueryOptions.queryKey,
          (draft) => {
            if (draft) {
              const oldData = draft.find(
                (d) => d.date === parsedData.date && d.userId === parsedData.userId,
              );

              if (oldData) {
                return draft.map((d) =>
                  d.date === parsedData.date && d.userId === parsedData.userId
                    ? parsedData
                    : d,
                );
              } else {
                return [...draft, parsedData];
              }
            }
          },
        );
      } catch {}
    },
    [queryClient],
  );

  useRealtime<TimeSpentPerDayDTOSchema>({
    channel: 'time-spent-per-day-channel',
    table: 'developer_time_spent_per_day',
    onPostgresChanges: mutateTimeSpentPerDay,
  });

  return { data };
};
