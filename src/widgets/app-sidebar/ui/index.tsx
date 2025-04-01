import Link from 'next/link';

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

export const AppSidebar = () => {
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <TeamSwitcher />
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
