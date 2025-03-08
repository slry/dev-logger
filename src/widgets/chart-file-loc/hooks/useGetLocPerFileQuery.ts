import { RealtimePostgresChangesPayload } from '@supabase/supabase-js';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useCallback } from 'react';

import { useRealtime } from '@/shared/hooks/useRealtime';

import { developerLocPerFileQueryOptions } from '../api/queryKeys';
import { LocPerFileDTOSchema, locPerFileSchema } from '../model';

export const useGetLocPerFileQuery = () => {
  const queryClient = useQueryClient();

  const { data } = useQuery(developerLocPerFileQueryOptions);

  const mutateLocPerFile = useCallback(
    (payload: RealtimePostgresChangesPayload<LocPerFileDTOSchema>) => {
      try {
        const parsedData = locPerFileSchema.parse(payload.new);

        queryClient.setQueryData(developerLocPerFileQueryOptions.queryKey, (draft) => {
          if (draft) {
            const oldData = draft.find(
              (d) => d.userId === parsedData.userId && d.filename === parsedData.filename,
            );

            if (oldData) {
              return draft.map((d) =>
                d.userId === parsedData.userId && d.filename === parsedData.filename
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

  useRealtime<LocPerFileDTOSchema>({
    channel: 'loc-per-file-channel',
    table: 'developer_loc_per_day',
    onPostgresChanges: mutateLocPerFile,
  });

  return { data };
};
