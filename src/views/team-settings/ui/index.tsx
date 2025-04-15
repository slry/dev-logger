import { getTeamMembersListQueryOptions } from '@/entities/team/api/queryKeys';
import { getReposQueryOptions } from '@/features/add-gitlab-repo/api/queryKeys';
import { withHydrationBoundary } from '@/shared/hocs/withHydrationBoundary';
import { withTeamValidationGuard } from '@/shared/hocs/withTeamValidationGuard';
import { getTeamGitlabReposQueryOptions } from '@/widgets/gitlab-repo-list/api/queryKeys';
import { GitlabRepoList } from '@/widgets/gitlab-repo-list/ui';
import { TeamMembersList } from '@/widgets/team-member-list/ui';

const TeamSettings = withHydrationBoundary<{ teamId: string }>(
  ({ teamId }) => {
    return (
      <section className="flex flex-col gap-4 px-4">
        <TeamMembersList teamId={teamId} />
        <GitlabRepoList teamId={teamId} />
      </section>
    );
  },
  [
    ({ teamId }) => getTeamMembersListQueryOptions(teamId),
    ({ teamId }) => getTeamGitlabReposQueryOptions(teamId),
    ({ teamId }) => getReposQueryOptions(teamId),
  ],
);

export const TeamSettingsPage = withTeamValidationGuard(TeamSettings);
