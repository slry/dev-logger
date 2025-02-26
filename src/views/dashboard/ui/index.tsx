import { withHydrationBoundary } from '@/shared/hocs/withHydrationBoundary';
import { developerLocPerDayQueryOptions } from '@/widgets/chart-loc/api/queryKeys';
import { ChartLOC } from '@/widgets/chart-loc/ui';

export const DashboardPage = withHydrationBoundary(() => {
  return (
    <div className="px-4">
      <ChartLOC />
    </div>
  );
}, developerLocPerDayQueryOptions);
