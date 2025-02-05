'use client';
import Link from 'next/link';

import { TeamSwitcher } from '@/shared/shadcn/components/team-switcher';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/shared/shadcn/ui/sidebar';

import { menuItems, mockTeams } from '../model';
import { SidebarFooterUser } from './footer-user';

export const AppSidebar = () => {
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <TeamSwitcher teams={mockTeams} />
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
};
