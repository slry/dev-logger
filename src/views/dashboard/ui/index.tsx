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
import { developerFileOperationsQueryOptions } from '@/widgets/chart-total-changed-files/api/queryKeys';
import { ChartTotalChangedFiles } from '@/widgets/chart-total-changed-files/ui';

export const DashboardPage = withHydrationBoundary(() => {
  return (
    <div className="w-full space-y-4 px-4">
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel defaultSize={50} minSize={25}>
          <ChartLOC />
        </ResizablePanel>

        <ResizableHandle className="w-4 bg-transparent" />

        <ResizablePanel defaultSize={50} minSize={25}>
          <ChartFileLOC />
        </ResizablePanel>
      </ResizablePanelGroup>

      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel defaultSize={50} minSize={25}>
          <ChartTotalChangedFiles />
        </ResizablePanel>

        <ResizableHandle className="w-4 bg-transparent" />

        <ResizablePanel defaultSize={50} minSize={25}>
          <ChartTotalChangedFiles />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}, [
  developerLocPerDayQueryOptions,
  developerLocPerFileQueryOptions,
  developerFileOperationsQueryOptions,
]);
