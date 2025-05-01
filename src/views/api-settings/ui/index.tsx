import { redirect } from 'next/navigation';

import { validateTeamId } from '@/entities/team/api/actions';
import { withHydrationBoundary } from '@/shared/hocs/withHydrationBoundary';
import { APITokenList } from '@/widgets/api-token-list/ui';

import { getApiTokensListQueryOptions } from '../api/queryKeys';

interface ApiSettingsPageProps {
  params: Promise<{
    teamId: string;
  }>;
}

export const ApiSettingsPage = async (props: ApiSettingsPageProps) => {
  const { teamId } = await props.params;
  const { valid, teamId: validatedTeamId } = await validateTeamId(teamId);
  if (!valid || !validatedTeamId) redirect('/team/personal/api-settings');
  return <ApiSettings teamId={validatedTeamId} />;
};

export const ApiSettings = withHydrationBoundary<{ teamId: string }>(() => {
  return (
    <section className="px-4">
      <APITokenList />
    </section>
  );
}, [({ teamId }) => getApiTokensListQueryOptions(teamId)]);
