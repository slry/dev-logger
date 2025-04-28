import { headers } from 'next/headers';

import { getTeamMembersListQueryOptions } from '@/entities/team/api/queryKeys';
import { getReposQueryOptions } from '@/features/add-gitlab-repo/api/queryKeys';
import { isPersonalTeamQueryOptions } from '@/features/invite-team-member/api/queryKeys';
import { withHydrationBoundary } from '@/shared/hocs/withHydrationBoundary';
import { withTeamValidationGuard } from '@/shared/hocs/withTeamValidationGuard';
import { getTeamGitlabReposQueryOptions } from '@/widgets/gitlab-repo-list/api/queryKeys';
import { GitlabRepoList } from '@/widgets/gitlab-repo-list/ui';
import { TeamMembersList } from '@/widgets/team-member-list/ui';

const TeamSettings = withHydrationBoundary<{ teamId: string }>(
  async ({ teamId }) => {
    const headersList = await headers();
    const hostname = headersList.get('host');
    const protocol = headersList.get('x-forwarded-proto') ?? 'http';
    return (
      <section className="flex flex-col gap-4 px-4">
        <TeamMembersList baseUrl={`${protocol}://${hostname}`} teamId={teamId} />
        <GitlabRepoList teamId={teamId} />
      </section>
    );
  },
  [
    ({ teamId }) => isPersonalTeamQueryOptions(teamId),
    ({ teamId }) => getTeamMembersListQueryOptions(teamId),
    ({ teamId }) => getTeamGitlabReposQueryOptions(teamId),
    ({ teamId }) => getReposQueryOptions(teamId),
  ],
);

export const TeamSettingsPage = withTeamValidationGuard(TeamSettings);
