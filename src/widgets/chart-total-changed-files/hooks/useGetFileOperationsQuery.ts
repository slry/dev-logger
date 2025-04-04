import { RealtimePostgresChangesPayload } from '@supabase/supabase-js';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useCallback } from 'react';

import { useRealtime } from '@/shared/hooks/useRealtime';
import { useTeamContext } from '@/shared/providers/team-context';

import { developerFileOperationsQueryOptions } from '../api/queryKeys';
import { fileOperationsSchema, FileOperationsDTOSchema } from '../model';

export const useGetFileOperationsQuery = () => {
  const queryClient = useQueryClient();
  const currentTeamId = useTeamContext();
  const qo = developerFileOperationsQueryOptions(currentTeamId);

  const { data } = useQuery(qo);

  const mutateFileOperations = useCallback(
    (payload: RealtimePostgresChangesPayload<FileOperationsDTOSchema>) => {
      try {
        const parsedData = fileOperationsSchema.parse(payload.new);

        queryClient.setQueryData(qo.queryKey, (draft) => {
          if (draft) {
            const oldData = draft.find(
              (d) =>
                d.userId === parsedData.userId &&
                d.filename === parsedData.filename &&
                d.operation === parsedData.operation,
            );

            if (oldData) {
              return draft.map((d) =>
                d.userId === parsedData.userId &&
                d.filename === parsedData.filename &&
                d.operation === parsedData.operation
                  ? parsedData
                  : d,
              );
            } else {
              return [...draft, parsedData];
            }
          }
        });
      } catch {
        console.log('error');
      }
    },
    [queryClient, qo.queryKey],
  );

  useRealtime<FileOperationsDTOSchema>({
    channel: 'file-operations-channel',
    table: 'developer_file_operations',
    onPostgresChanges: mutateFileOperations,
  });

  return { data };
};
