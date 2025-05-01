import { Separator } from '@radix-ui/react-separator';

import { getCurrentTeamQueryOptions } from '@/entities/team/api/queryKeys';
import { withHydrationBoundary } from '@/shared/hocs/withHydrationBoundary';
import { Breadcrumb } from '@/shared/shadcn/ui/breadcrumb';
import { SidebarTrigger } from '@/shared/shadcn/ui/sidebar';

import { BreadcrumbItemsList } from './breadcrumbs-list';

interface HeaderBreadcrumbsProps {
  teamId: string;
}

export const HeaderBreadcrumbs = withHydrationBoundary<HeaderBreadcrumbsProps>(
  ({ teamId }) => {
    return (
      <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbItemsList teamId={teamId} />
          </Breadcrumb>
        </div>
      </header>
    );
  },
  [({ teamId }) => getCurrentTeamQueryOptions(teamId)],
);
