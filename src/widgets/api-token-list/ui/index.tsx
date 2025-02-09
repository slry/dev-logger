'use client';
import { useQuery } from '@tanstack/react-query';

import { getAPITokensList } from '@/views/api-settings/api';

import { APITokenListItem } from './api-token-list-item';

export const APITokenList = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['api-tokens-list'],
    queryFn: getAPITokensList,
  });

  if (isLoading || error) return null;
  return (
    <div className="flex max-w-[800px] flex-col gap-1 rounded-lg border">
      {data?.map((d) => <APITokenListItem key={d.id} {...d} />)}
    </div>
  );
};
