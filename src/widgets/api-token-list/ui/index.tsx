'use client';
import { useQuery } from '@tanstack/react-query';

import { getAPITokensList } from '@/views/api-settings/api';

import { APITokenListEmpty } from './api-token-list-empty';
import { APITokenListItem } from './api-token-list-item';

export const APITokenList = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['api-tokens-list'],
    queryFn: getAPITokensList,
  });

  if (isLoading || error) return null;
  return (
    <section className="flex w-full items-center justify-center">
      {data && data.length === 0 && <APITokenListEmpty />}
      {data && data.length > 0 && (
        <div className="flex max-w-[800px] flex-col gap-1 rounded-lg border">
          {data.map((d) => (
            <APITokenListItem key={d.id} {...d} />
          ))}
        </div>
      )}
    </section>
  );
};
