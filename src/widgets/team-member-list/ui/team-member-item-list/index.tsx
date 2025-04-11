'use client';

import { useQuery } from '@tanstack/react-query';
import { FC } from 'react';

import { TeamMemberSchema, teamRoleMapper } from '@/entities/team/model';
import { userQueryOptions } from '@/entities/user/api/queryKeys';
import { Badge } from '@/shared/shadcn/ui/badge';
import { TableCell, TableRow } from '@/shared/ui/table';

export const TeamMemberItemList: FC<TeamMemberSchema> = ({
  userId,
  name,
  surname,
  role,
  email,
}) => {
  const { data } = useQuery(userQueryOptions);
  if (!data) return null;
  const { id: currentUserId } = data;
  return (
    <TableRow className="last:border-b-0">
      <TableCell className="flex max-w-[300px] items-center gap-1 truncate">
        <span>
          {name} {surname}
        </span>
        {currentUserId === userId ? (
          <Badge className="ml-2" variant="outline">
            It&apos;s You!
          </Badge>
        ) : null}
      </TableCell>
      <TableCell>{email}</TableCell>
      <TableCell>{teamRoleMapper[role]}</TableCell>
    </TableRow>
  );
};
