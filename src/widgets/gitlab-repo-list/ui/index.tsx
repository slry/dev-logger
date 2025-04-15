'use client';

import { useQuery } from '@tanstack/react-query';
import { FC } from 'react';

import { AddGitlabRepo } from '@/features/add-gitlab-repo/ui';
import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/shared/ui/table';

import { GitlabRepoListItem } from './gitlab-repo-list-item';
import { getTeamGitlabReposQueryOptions } from '../api/queryKeys';

interface GitlabRepoListProps {
  teamId: string;
}

export const GitlabRepoList: FC<GitlabRepoListProps> = ({ teamId }) => {
  const qo = getTeamGitlabReposQueryOptions(teamId);
  const { data } = useQuery(qo);

  if (!data) return null;

  return (
    <section className="flex flex-col gap-6">
      <div className="flex items-center justify-between border-b pb-2">
        <h2 className="text-xl">Gitlab Repositories</h2>
        <AddGitlabRepo teamId={teamId} />
      </div>
      <div className="flex w-full items-center justify-center">
        {/* {data && data.length === 0 && <GitlabRepoListEmpty />} */}
        {data && data.length > 0 && (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Repository name</TableHead>
                <TableHead>Repository link</TableHead>
                <TableHead>Repository description</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((repo) => (
                <GitlabRepoListItem key={repo.url} {...repo} />
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </section>
  );
};
