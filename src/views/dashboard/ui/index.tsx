import { getTeamMembersListQueryOptions } from '@/entities/team/api/queryKeys';
import { withHydrationBoundary } from '@/shared/hocs/withHydrationBoundary';
import { withTeamValidationGuard } from '@/shared/hocs/withTeamValidationGuard';

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
