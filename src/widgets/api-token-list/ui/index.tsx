'use client';
import { useQuery } from '@tanstack/react-query';

import { CreateApiTokenButton } from '@/features/create-api-token/ui';
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
    <section className="flex flex-col gap-6">
      <header className="flex items-center justify-between border-b pb-2">
        <h2 className="text-xl">API Tokens</h2>
        <CreateApiTokenButton />
      </header>
      <div className="flex w-full items-center justify-center">
        {data && data.length === 0 && <APITokenListEmpty />}
        {data && data.length > 0 && (
          <div className="rounded-lg border">
            <table className="max-w-[800px] table-fixed border-collapse border-spacing-4">
              <tbody>
                {data.map((d) => (
                  <APITokenListItem key={d.id} {...d} />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
};
