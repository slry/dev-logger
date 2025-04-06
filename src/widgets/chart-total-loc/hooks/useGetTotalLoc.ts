'use client';

import { RealtimePostgresChangesPayload } from '@supabase/supabase-js';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useCallback } from 'react';

import { useRealtime } from '@/shared/hooks/useRealtime';
import { useTeamContext } from '@/shared/providers/team-context';
import { developerLocPerDayQueryOptions } from '@/widgets/chart-loc/api/queryKeys';
import { LocPerDayDTOSchema, locPerDaySchema } from '@/widgets/chart-loc/model';

import { developerTotalLocQueryOptions } from '../api/queryKeys';

export const useGetTotalLoc = () => {
  const queryClient = useQueryClient();
  const currentTeamId = useTeamContext();
  const totalLocQueryOptions = developerTotalLocQueryOptions(currentTeamId);
  const locPerDayQueryOptions = developerLocPerDayQueryOptions(currentTeamId);

  const { data } = useQuery(totalLocQueryOptions);

  const currentLocPerDayData = queryClient.getQueryData(locPerDayQueryOptions.queryKey);

  const mutateTotalLoc = useCallback(
    (payload: RealtimePostgresChangesPayload<LocPerDayDTOSchema>) => {
      try {
        const parsedData = locPerDaySchema.parse(payload.new);

        const currentLocData = currentLocPerDayData?.find(
          (data) => data.datetime === parsedData.datetime,
        );

        const diffedData = {
          locAdded: parsedData.locAdded - (currentLocData?.locAdded ?? 0),
          locRemoved: parsedData.locRemoved - (currentLocData?.locRemoved ?? 0),
        };

        queryClient.setQueryData(totalLocQueryOptions.queryKey, (draft) => {
          if (draft) {
            return {
              locAdded: draft.locAdded + diffedData.locAdded,
              locRemoved: draft.locRemoved + diffedData.locRemoved,
            };
          }

          return {
            locAdded: diffedData.locAdded,
            locRemoved: diffedData.locRemoved,
          };
        });
      } catch {}
    },
    [queryClient, currentLocPerDayData, totalLocQueryOptions.queryKey],
  );

  useRealtime<LocPerDayDTOSchema>({
    channel: 'total-loc-channel',
    table: 'developer_loc_per_day',
    onPostgresChanges: mutateTotalLoc,
  });

  return { data };
};
