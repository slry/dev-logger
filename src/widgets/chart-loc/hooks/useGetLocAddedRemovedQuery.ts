import { RealtimePostgresChangesPayload } from '@supabase/supabase-js';
import { queryOptions, useQuery, useQueryClient } from '@tanstack/react-query';
import { useCallback } from 'react';

import { useRealtime } from '@/shared/hooks/useRealtime';

import { getLocAddedRemovedPerDay } from '../api';
import { LocPerDayDTOSchema, locPerDaySchema, LocPerDaySchema } from '../model';

const developerLocPerDayQueryOptions = queryOptions<LocPerDaySchema[]>({
  queryKey: ['developer_loc_per_day'],
  queryFn: getLocAddedRemovedPerDay,
});
export const useGetLocAddedRemovedQuery = () => {
  const queryClient = useQueryClient();

  const { data } = useQuery(developerLocPerDayQueryOptions);

  const mutateLocAddedRemoved = useCallback(
    (payload: RealtimePostgresChangesPayload<LocPerDayDTOSchema>) => {
      try {
        const parsedData = locPerDaySchema.parse(payload.new);

        queryClient.setQueryData(developerLocPerDayQueryOptions.queryKey, (draft) => {
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
    [queryClient],
  );

  useRealtime<LocPerDayDTOSchema>({
    channel: 'loc-per-day-channel',
    table: 'developer_loc_per_day',
    onPostgresChanges: mutateLocAddedRemoved,
  });

  return { data };
};
