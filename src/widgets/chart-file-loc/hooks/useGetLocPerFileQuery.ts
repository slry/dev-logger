import { RealtimePostgresChangesPayload } from '@supabase/supabase-js';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useCallback } from 'react';

import { useRealtime } from '@/shared/hooks/useRealtime';
import { useTeamContext } from '@/shared/providers/team-context';
import { useUserDashboardContext } from '@/shared/providers/user-dashboard-context';

import { developerLocPerFileQueryOptions } from '../api/queryKeys';
import { LocPerFileDTOSchema, locPerFileSchema } from '../model';

export const useGetLocPerFileQuery = () => {
  const queryClient = useQueryClient();
  const currentTeamId = useTeamContext();
  const { userId: currentUserId } = useUserDashboardContext();
  const qo = developerLocPerFileQueryOptions(currentTeamId, currentUserId);

  const { data } = useQuery(qo);

  const mutateLocPerFile = useCallback(
    (payload: RealtimePostgresChangesPayload<LocPerFileDTOSchema>) => {
      try {
        const parsedData = locPerFileSchema.parse(payload.new);

        queryClient.setQueryData(qo.queryKey, (draft) => {
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
    [queryClient, qo.queryKey],
  );

  useRealtime<LocPerFileDTOSchema>({
    channel: 'loc-per-file-channel',
    table: 'developer_loc_per_file',
    onPostgresChanges: mutateLocPerFile,
  });

  return { data };
};
