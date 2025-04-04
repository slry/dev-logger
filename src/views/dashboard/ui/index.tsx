import { redirect } from 'next/navigation';

import { validateTeamId } from '@/shared/api/validate-team-id';
import { withHydrationBoundary } from '@/shared/hocs/withHydrationBoundary';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/shared/shadcn/ui/resizable';
import { developerLocPerFileQueryOptions } from '@/widgets/chart-file-loc/api/queryKeys';
import { ChartFileLOC } from '@/widgets/chart-file-loc/ui';
import { developerLocPerDayQueryOptions } from '@/widgets/chart-loc/api/queryKeys';
import { ChartLOC } from '@/widgets/chart-loc/ui';
import { developerTimeSpentPerDayQueryOptions } from '@/widgets/chart-time/api/queryKeys';
import { ChartTimeSpentPerDay } from '@/widgets/chart-time/ui';
import { developerFileOperationsQueryOptions } from '@/widgets/chart-total-changed-files/api/queryKeys';
import { ChartTotalChangedFiles } from '@/widgets/chart-total-changed-files/ui';
import { developerTotalLocQueryOptions } from '@/widgets/chart-total-loc/api/queryKeys';
import { ChartTotalLOC } from '@/widgets/chart-total-loc/ui';

interface DashboardPageProps {
  params: Promise<{ teamId: string }>;
}

export const DashboardPage = async (props: DashboardPageProps) => {
  const { teamId } = await props.params;
  const { valid, teamId: validatedTeamId } = await validateTeamId(teamId);
  if (!valid || !validatedTeamId) redirect('/team/personal/dashboard');
  return <Dashboard teamId={validatedTeamId} />;
};

const Dashboard = withHydrationBoundary<{ teamId: string }>(() => {
  return (
    <div className="w-full space-y-4 px-4">
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel defaultSize={70} minSize={30}>
          <ChartLOC />
        </ResizablePanel>

        <ResizableHandle className="w-4 bg-transparent" />

        <ResizablePanel defaultSize={30} minSize={30}>
          <ChartTotalLOC />
        </ResizablePanel>
      </ResizablePanelGroup>

      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel defaultSize={30} minSize={30}>
          <ChartTotalChangedFiles />
        </ResizablePanel>

        <ResizableHandle className="w-4 bg-transparent" />

        <ResizablePanel defaultSize={70} minSize={30}>
          <ChartFileLOC />
        </ResizablePanel>
      </ResizablePanelGroup>

      <ChartTimeSpentPerDay />
    </div>
  );
}, [
  ({ teamId }) => developerLocPerDayQueryOptions(teamId),
  ({ teamId }) => developerLocPerFileQueryOptions(teamId),
  ({ teamId }) => developerFileOperationsQueryOptions(teamId),
  ({ teamId }) => developerTotalLocQueryOptions(teamId),
  ({ teamId }) => developerTimeSpentPerDayQueryOptions(teamId),
]);
