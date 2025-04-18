import { TeamMemberSchema } from '@/entities/team/model';
import { withHydrationBoundary } from '@/shared/hocs/withHydrationBoundary';
import { UserDashboardProvider } from '@/shared/providers/user-dashboard-context';
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
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

import { UserDashboardCollapsible } from './user-dashboard-collapsible';

interface UserDashboardProps extends TeamMemberSchema {
  teamId: string;
}

export const UserDashboard = withHydrationBoundary<UserDashboardProps>(
  ({ queryClient: _qc, teamId: _ti, ...props }) => {
    return (
      <UserDashboardCollapsible {...props}>
        <UserDashboardProvider userId={props.userId}>
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
        </UserDashboardProvider>
      </UserDashboardCollapsible>
    );
  },
  [
    ({ teamId, userId }) => developerLocPerDayQueryOptions(teamId, userId),
    ({ teamId, userId }) => developerLocPerFileQueryOptions(teamId, userId),
    ({ teamId, userId }) => developerFileOperationsQueryOptions(teamId, userId),
    ({ teamId, userId }) => developerTotalLocQueryOptions(teamId, userId),
    ({ teamId, userId }) => developerTimeSpentPerDayQueryOptions(teamId, userId),
  ],
);
