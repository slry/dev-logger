import Link from 'next/link';

import { userQueryOptions } from '@/entities/user/model/queryKeys';
import { withHydrationBoundary } from '@/shared/hocs/withHydrationBoundary';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/shared/shadcn/ui/sidebar';

import { menuItems } from '../model';
import { SidebarFooterUser } from './footer-user';
import { TeamSwitcher } from './team-switcher';
import { getCurrentTeamQueryOptions, getTeamsListQueryOptions } from '../api/queryKeys';

interface AppSidebarProps {
  teamId: string;
}

export const AppSidebar = withHydrationBoundary<AppSidebarProps>(
  async ({ teamId }) => {
    return (
      <Sidebar collapsible="icon">
        <SidebarHeader>
          <TeamSwitcher teamId={teamId} />
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {menuItems.map((item) => (
              <SidebarMenuItem key={item.name} className="px-2">
                <SidebarMenuButton asChild>
                  <Link href={item.url}>
                    <item.logo />
                    <span>{item.name}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
          <SidebarFooterUser />
        </SidebarFooter>
      </Sidebar>
    );
  },
  [
    getTeamsListQueryOptions,
    userQueryOptions,
    ({ teamId }) => getCurrentTeamQueryOptions(teamId),
  ],
);
