import { RealtimePostgresChangesPayload } from '@supabase/supabase-js';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useCallback } from 'react';

import { useRealtime } from '@/shared/hooks/useRealtime';

import { developerFileOperationsQueryOptions } from '../api/queryKeys';
import { fileOperationsSchema, FileOperationsDTOSchema } from '../model';

export const useGetFileOperationsQuery = () => {
  const queryClient = useQueryClient();

  const { data } = useQuery(developerFileOperationsQueryOptions);

  const mutateFileOperations = useCallback(
    (payload: RealtimePostgresChangesPayload<FileOperationsDTOSchema>) => {
      try {
        const parsedData = fileOperationsSchema.parse(payload.new);

        queryClient.setQueryData(
          developerFileOperationsQueryOptions.queryKey,
          (draft) => {
            if (draft) {
              const oldData = draft.find(
                (d) =>
                  d.timestamp === parsedData.timestamp && d.userId === parsedData.userId,
              );

              if (oldData) {
                return draft.map((d) =>
                  d.timestamp === parsedData.timestamp && d.userId === parsedData.userId
                    ? parsedData
                    : d,
                );
              } else {
                return [...draft, parsedData];
              }
            }
          },
        );
      } catch {
        console.log('error');
      }
    },
    [queryClient],
  );

  useRealtime<FileOperationsDTOSchema>({
    channel: 'file-operations-channel',
    table: 'developer_file_operations',
    onPostgresChanges: mutateFileOperations,
  });

  return { data };
};
