'use client';
import { useQuery } from '@tanstack/react-query';

import { getApiTokensListQueryOptions } from '@/entities/api-token-item/api/queryKeys';
import { CreateAPIToken } from '@/features/create-api-token/ui';
import { useTeamContext } from '@/shared/providers/team-context';
import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/shared/ui/table';

import { APITokenListEmpty } from './api-token-list-empty';
import { APITokenListItem } from './api-token-list-item';

export const APITokenList = () => {
  const currentTeamId = useTeamContext();
  const qo = getApiTokensListQueryOptions(currentTeamId);
  const { data, isLoading, error } = useQuery(qo);

  if (isLoading || error) return null;
  return (
    <section className="flex flex-col gap-6">
      <header className="flex items-center justify-between border-b pb-2">
        <h2 className="text-xl">API Tokens</h2>
        {data && data.length > 0 && <CreateAPIToken />}
      </header>
      <div className="flex w-full items-center justify-center">
        {data && data.length === 0 && <APITokenListEmpty />}
        {data && data.length > 0 && (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Key</TableHead>
                <TableHead>Expires At</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((d) => (
                <APITokenListItem key={d.id} {...d} />
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </section>
  );
};
