import { isGitlabIntegratedQueryOptions } from '@/features/integrate-gitlab/api/queryOptions';
import { IntegrateGitlab } from '@/features/integrate-gitlab/ui';
import { withHydrationBoundary } from '@/shared/hocs/withHydrationBoundary';

export const IntegrationsPage = withHydrationBoundary(() => {
  return (
    <div className="flex flex-col gap-4 p-4">
      <IntegrateGitlab />
    </div>
  );
}, [isGitlabIntegratedQueryOptions]);
