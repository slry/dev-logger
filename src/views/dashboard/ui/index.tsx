import { getTeamMembersListQueryOptions } from '@/entities/team/api/queryKeys';
import { withTeamValidationGuard } from '@/entities/team/hocs/withTeamValidationGuard';
import { withHydrationBoundary } from '@/shared/hocs/withHydrationBoundary';

import { DashboardList } from './dashboard-list';

const Dashboard = withHydrationBoundary<{ teamId: string }>(
  ({ teamId }) => {
    return (
      <section className="flex flex-col gap-4 px-4">
        <DashboardList teamId={teamId} />
      </section>
    );
  },
  [({ teamId }) => getTeamMembersListQueryOptions(teamId)],
);

export const DashboardPage = withTeamValidationGuard(Dashboard);
