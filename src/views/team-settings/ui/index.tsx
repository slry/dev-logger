import { getTeamMembersListQueryOptions } from '@/entities/team/api/queryKeys';
import { withHydrationBoundary } from '@/shared/hocs/withHydrationBoundary';
import { withTeamValidationGuard } from '@/shared/hocs/withTeamValidationGuard';
import { TeamMembersList } from '@/widgets/team-member-list/ui';

const TeamSettings = withHydrationBoundary<{ teamId: string }>(
  ({ teamId }) => {
    return (
      <section className="px-4">
        <TeamMembersList teamId={teamId} />
      </section>
    );
  },
  [({ teamId }) => getTeamMembersListQueryOptions(teamId)],
);

export const TeamSettingsPage = withTeamValidationGuard(TeamSettings);
