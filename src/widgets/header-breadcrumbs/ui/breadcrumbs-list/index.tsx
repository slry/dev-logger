'use client';

import { useQuery } from '@tanstack/react-query';
import { usePathname } from 'next/navigation';
import { FC, Fragment } from 'react';

import { getCurrentTeamQueryOptions } from '@/entities/team/api/queryKeys';
import {
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/shared/shadcn/ui/breadcrumb';

import { pathToBreadcrumb } from '../../model';

interface BreadcrumbItemsList {
  teamId: string;
}

const teamNameToPath = (teamName: string) => {
  return teamName.replace(/\s+/g, '-').toLowerCase();
};

export const BreadcrumbItemsList: FC<BreadcrumbItemsList> = ({ teamId }) => {
  const pathname = usePathname();
  const { data: currentTeam } = useQuery(getCurrentTeamQueryOptions(teamId));

  if (!currentTeam) return null;

  const { name: teamName } = currentTeam;

  const newPathname = pathname.replace(`/${teamId}`, `/${teamNameToPath(teamName)}`);

  const breadcrumbs = pathToBreadcrumb(newPathname);
  return (
    <BreadcrumbList>
      {breadcrumbs.map((b, i) => (
        <Fragment key={`${b.url}-${i}`}>
          <BreadcrumbItem className="hidden md:block">
            <BreadcrumbLink>{b.label}</BreadcrumbLink>
          </BreadcrumbItem>
          {i !== breadcrumbs.length - 1 && <BreadcrumbSeparator />}
        </Fragment>
      ))}
    </BreadcrumbList>
  );
};
