'use client';
import { useQuery } from '@tanstack/react-query';
import { FC } from 'react';

import { getTeamMembersListQueryOptions } from '@/entities/team/api/queryKeys';
import { InviteTeamMember } from '@/features/invite-team-member/ui';
import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/shared/ui/table';

import { TeamMemberItemList } from './team-member-item-list';

interface TeamMemberListProps {
  baseUrl: string;
  teamId: string;
}

export const TeamMembersList: FC<TeamMemberListProps> = ({ teamId, baseUrl }) => {
  const qo = getTeamMembersListQueryOptions(teamId);
  const { data } = useQuery(qo);
  return (
    <section className="flex flex-col gap-6">
      <div className="flex items-center justify-between border-b pb-2">
        <h2 className="text-xl">Team members</h2>
        <InviteTeamMember teamId={teamId} baseUrl={baseUrl} />
      </div>
      <div className="flex w-full items-center justify-center">
        {data && data.length > 0 && (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((d) => (
                <TeamMemberItemList key={d.userId} {...d} />
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </section>
  );
};
