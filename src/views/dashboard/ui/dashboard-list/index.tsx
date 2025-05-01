import { FC } from 'react';

import { getTeamMemberList } from '@/entities/team/api/actions';

import { UserDashboard } from '../user-dashboard';

interface DashboardListProps {
  teamId: string;
}

export const DashboardList: FC<DashboardListProps> = async ({ teamId }) => {
  const data = await getTeamMemberList(teamId);

  return (
    <div className="flex flex-col gap-4">
      {data.map((member) => (
        <UserDashboard key={`${member.userId}-${teamId}`} teamId={teamId} {...member} />
      ))}
    </div>
  );
};
