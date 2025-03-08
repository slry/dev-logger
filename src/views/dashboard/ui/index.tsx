import { withHydrationBoundary } from '@/shared/hocs/withHydrationBoundary';
import { ChartFileLOC } from '@/widgets/chart-file-loc/ui';
import { developerLocPerDayQueryOptions } from '@/widgets/chart-loc/api/queryKeys';
import { ChartLOC } from '@/widgets/chart-loc/ui';

export const DashboardPage = withHydrationBoundary(() => {
  return (
    <div className="w-full px-4">
      <div className="flex gap-2">
        <ChartLOC />
        <ChartFileLOC />
      </div>
    </div>
  );
}, developerLocPerDayQueryOptions);
